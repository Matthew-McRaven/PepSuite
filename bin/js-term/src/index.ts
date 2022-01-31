// We're a console app... we need logging ability.
/* eslint-disable no-console */
// command-line-args has a var named _unknown, so the following rule is invalid.
/* eslint-disable no-underscore-dangle */

import commandLineArgs, { OptionDefinition } from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import chalk from 'chalk';
import leven from 'leven';
import { pep10 } from '@pep10/core';
import path from 'path';
import fs from 'fs';
import aboutText from './about';
import * as commands from './commands';
import { gitSHA, version } from './version';

const versionString = `${commands.toplevel.name} version ${version}\nBased on commit: ${gitSHA}`;

const error = (message: string, exitCode?: number) => {
  console.error(chalk.red(message));
  process.exitCode = exitCode || 1;
};

const handleAsm = async (args: commandLineArgs.CommandLineOptions) => {
  if (args.help) {
    console.log(commandLineUsage(commands.asm.usage));
  } else if (args._unknown) {
    return error(`Unexpected option ${args._unknown[0]}`);
  } else if (!args['source-file']) {
    return error('--source-file (or -s) is required.');
  } else if (!args['object-file']) {
    return error('--object-file (or -o) is required.');
  } else {
    const mod = await pep10;
    const project = new mod.AssemblyProject();
    try {
      const sourceFileText = fs.readFileSync(args['source-file']).toString('ascii');
      project.setUserProgram(sourceFileText);
      const errorCode = project.assemble();

      if (errorCode !== mod.AssemblyErrorCode.Complete) {
        return error(`Assembly failed to execute code ${mod.errorName(errorCode)}`);
      }

      // Determine if there are warnings or errors.
      const errors = project.errors();
      // Determine max severity of message, with error blocking any forward progress
      const maxSeverity = (errors || []).reduce(
        (prev: typeof mod.MessageLevel, cur: typeof mod.ErrorMessage) => {
          console.log(prev, cur);
          return mod.maxSeverity(prev, cur.type);
        },
        mod.MessageLevel.Status,
      );

      // If there are errors or warning, output them to --error-file or <source_file>_errLog.txt.
      if (errors) {
        // Select default error file, and override if --error-file is present.
        const defaultErrorPath = path.parse(args['source-file']);
        let errorFileName = path.join(defaultErrorPath.dir, `${defaultErrorPath.name}_errLog.txt`);
        if (args['error-file']) errorFileName = args['error-file'];
        // Remove any text from the error log
        const errorFile = fs.openSync(errorFileName, 'w');
        fs.ftruncateSync(errorFile, 0);
        // And write all error messages in a ###: <message> format
        errors.forEach((element: any) => {
          const message = `${element.line}: ${element.message}\n`;
          fs.writeFileSync(errorFile, message);
        });
        fs.closeSync(errorFile);
      }

      // If at least one message was an Error, no object code was generated, abort.
      if (mod.MessageLevel.Error === maxSeverity) {
        return error('Assembly failed due to errors in the supplied program.');
      }

      // Clear object file if it exists, and dump formatted object code to it.
      const objectFile = fs.openSync(args['object-file'], 'w');
      fs.ftruncateSync(objectFile);
      fs.writeFileSync(objectFile, project.formattedObjectCode());
      fs.close(objectFile);

      // Helper to replace the extension on the object file.
      const changeObjectFileExtension = (newExt: string) => {
        const objectPath = path.parse(args['object-file']);
        return path.join(objectPath.dir, `${objectPath.name}.${newExt}`);
      };

      // Clear listing file if it exists, and dump a formatted listing of the user program to it.
      const listingFile = fs.openSync(changeObjectFileExtension('pepl'), 'w');
      fs.ftruncateSync(listingFile);
      fs.writeFileSync(listingFile, project.formattedUserListing());
      fs.close(listingFile);

      //    If --elf, output as .elf
      if (args['enable-elf']) {
        const elfFile = fs.openSync(changeObjectFileExtension('elf'), 'w');
        fs.ftruncateSync(elfFile);
        const arrayBytes = project.rawBytesELF();
        const bytes = new Uint8Array(arrayBytes);
        fs.writeFileSync(elfFile, bytes);
        fs.close(elfFile);
      }
    } catch (except) {
      return error(except);
    } finally {
      project.delete();
    }
  }
};

const handleRun = async (args: commandLineArgs.CommandLineOptions) => {
  if (args.help) {
    console.log(commandLineUsage(commands.run.usage));
  } else if (args._unknown) {
    error(`Unexpected option ${args._unknown[0]}`);
  } else if (!(args.elf || args.obj)) {
    error('Exactly one of --elf or --obj is required.');
  } else if (args.elf && args.obj) {
    error('--elf and --obj are mutually exclusive.');
  } else {
    const mod = await pep10;
    let image;
    const simulator = new mod.Pep10Simulator();
    try {
      if (args.obj) {
        const objectText = fs.readFileSync(args.obj).toString('ascii');
        image = mod.objectCodeToImage(objectText);
      } else if (args.elf) {
        const elfText = fs.readFileSync(args.elf);
        const elfBytes = new Uint8Array(elfText.buffer);
        const buf = mod._malloc(elfBytes.length * elfBytes.BYTES_PER_ELEMENT);
        mod.HEAPU8.set(elfBytes, buf);
        image = mod.rawBytesToImage(buf, elfBytes.length);
        mod._free(buf);
      }

      if (!image) return error('Provided object file was invalid.');
      simulator.setImage(image);

      // Load charIn if it exists.
      if (args.charIn) {
        const charIn = fs.readFileSync(args.charIn).toString('ascii');
        simulator.setCharIn(charIn);
      }
      // Check and set max-steps.
      if (args['max-steps']) {
        const maxSteps = args['max-steps'];
        if (typeof maxSteps !== 'number') return error('--max-steps must be a number.');
        if (maxSteps < 0) return error('--max-steps must be a positive number.');
        simulator.setMaxSteps(maxSteps);
      }

      // Must start simulator before run, otherwise MMIOs won't register properly.
      simulator.beginSimulation();
      const retCode = simulator.run();
      // Handle endless loops or processor errors.
      switch (retCode) {
        case mod.StepResult.NeedsMMI: return error('Program requested more input than available.');
        case mod.StepResult.Errored: return error('Processor crashed.');
        case mod.StepResult.Nominal: return error('Possible endless loop detected.');
        default: break;
      }

      if (args['echo-output']) console.log(simulator.getCharOut());

      // Clear object file if it exists, and dump formatted object code to it.
      const charOutFile = fs.openSync(args.charOut, 'w');
      fs.ftruncateSync(charOutFile);
      fs.writeFileSync(charOutFile, simulator.getCharOut());
      fs.close(charOutFile);
    } catch (except) {
      error(except);
    } finally {
      simulator.delete();
      // If image failed to load, it may not be an object. Only delete if exists.
      if (image) image.delete();
    }
  }
};

const handleMacro = async (args: commandLineArgs.CommandLineOptions) => {
  if (args.help) {
    console.log(commandLineUsage(commands.macro.usage));
  } else if (args._unknown) {
    error(`Unexpected option ${args._unknown[0]}`);
  } else if (!args.macro) {
    error('<macro> is required');
  } else {
    const mod = await pep10;
    const reg = new mod.Registry();
    const macro = reg.findMacro(args.macro);
    if (!macro) error(`${args.macro} is not a valid macro.`);
    else console.log(macro.text);
    macro.delete();
    reg.delete();
  }
};

const handleLSMacros = async (args: commandLineArgs.CommandLineOptions) => {
  if (args.help) {
    console.log(commandLineUsage(commands.lsmacros.usage));
  } else if (args._unknown) {
    error(`Unexpected option ${args._unknown[0]}`);
  } else {
    const mod = await pep10;
    const macros = new mod.Registry().macros();
    console.log('Computer Systems, 6th edition macros:');
    for (let i = 0; i < macros.size(); i += 1) {
      const macroI = macros.get(i);
      console.log(`\t${macroI.name}`);
      macroI.delete();
    }
    macros.delete();
  }
};

const handleFigure = async (args: commandLineArgs.CommandLineOptions) => {
  if (args.help) {
    console.log(commandLineUsage(commands.figure.usage));
  } else if (args._unknown) {
    console.error(`Unexpected option ${args._unknown[0]}`);
  } else if (!args.ch) {
    error('--ch is a required argument.');
  } else if (!args.fig) {
    error('--fig is a required argument.');
  } else {
    const { fig, ch } = args;
    const mod = await pep10;
    const reg = new mod.Registry();
    const figure = reg.findFigure('pep10', ch, fig);
    if (!figure) error(`${ch}.${fig} is not a valid figure.`);
    else {
      const text = figure.elements.get(mod.ElementType.Pep);
      if (!text) error(`${ch}.${fig} has no assembly source code.`);
      else console.log(text);
    }
    figure.delete();
    reg.delete();
  }
};

const handleLSFigures = async (args: commandLineArgs.CommandLineOptions) => {
  if (args.help) {
    console.log(commandLineUsage(commands.lsfigures.usage));
  } else if (args._unknown) {
    error(`Unexpected option ${args._unknown[0]}`);
  } else {
    const mod = await pep10;
    const figures = new mod.Registry().figures();
    console.log('Computer Systems, 6th edition figures:');
    for (let i = 0; i < figures.size(); i += 1) {
      if (figures.get(i).processor === 'pep10') {
        const figureI = figures.get(i);
        console.log(`\tFigure ${figureI.chapter}.${figureI.figure}`);
        figureI.delete();
      }
    }
    // Must clean up C++ memory after initializing
    figures.delete();
  }
};

(async () => {
  const mode = commandLineArgs(commands.toplevel.commands, { stopAtFirstUnknown: true });
  const argv = mode._unknown || [];
  let auxFlags: commandLineArgs.CommandLineOptions = {};
  switch (mode.command) {
    case 'asm':
      await handleAsm(commandLineArgs(commands.asm.commands, { partial: true, argv }));
      break;
    case 'run':
      await handleRun(commandLineArgs(commands.run.commands, { partial: true, argv }));
      break;
    case 'macro':
      await handleMacro(commandLineArgs(commands.macro.commands, { argv }));
      break;
    case 'ls-macros':
      await handleLSMacros(commandLineArgs(commands.lsmacros.commands, { partial: true, argv }));
      break;
    case 'figure':
      await handleFigure(commandLineArgs(commands.figure.commands, { partial: true, argv }));
      break;
    case 'ls-figures':
      await handleLSFigures(commandLineArgs(commands.lsfigures.commands, { partial: true, argv }));
      break;
    default:
      // I know auxcommands is defined on toplevel, bypass type system here.
      auxFlags = commandLineArgs(commands.toplevel.auxCommands as OptionDefinition[], { partial: true, argv });
      if (mode.command) {
        let closest = [commands.asm, commands.run, commands.macro, commands.lsmacros, commands.figure,
        // eslint-disable-next-line indent
        commands.lsfigures].map((element) => [element.name, leven(element.name, mode.command)]);
        closest = closest.sort((lhs, rhs) => {
          if (lhs[1] === rhs[1]) return 0;
          if (lhs[1] > rhs[1]) return 1;
          return -1;
        });
        error(`No subcommand named '${mode.command}', did you mean '${closest[0][0]}'?`);
        error('Otherwise rerun with --help to view valid subcommands.');
      } else if (auxFlags.help) {
        console.log(commandLineUsage(commands.toplevel.usage));
      } else if (auxFlags.about) {
        console.log([versionString, aboutText].join('\n\n'));
      } else if (auxFlags.version) {
        console.log(versionString);
      } else if (auxFlags._unknown) {
        error(`Unexpected option ${auxFlags._unknown[0]}.`);
      } else {
        error('Expected a subcommand or option. Rerun with --help to view valid subcommands and options.');
      }
  }
})();
