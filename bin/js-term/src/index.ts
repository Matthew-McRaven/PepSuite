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
import aboutText from './about.js';
import * as commands from './commands.js';
import { gitSHA, version } from './version.js';

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
  } else if (!args.positionals) {
    error('must pass source code as a positional argument (e.g., pepterm asm myFile.pep');
  } else {
    const mod = await pep10;
    const project = new mod.AssemblyProject();
    try {
      // Attempt to load OS if passed (fixes #400).
      if (args.os) project.setOS(fs.readFileSync(args.os, 'ascii'));
      project.setUserProgram(fs.readFileSync(args.positionals, 'ascii'));
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

      // If there are errors or warning, output them to --err or <source_file>_errLog.txt.
      if (errors) {
        // Select default error file, and override if --err is present.
        const defaultErrorPath = path.parse(args.positionals);
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

      const sourcePath = path.parse(args.positionals);
      const defaultObjectCodeFileName = path.join(sourcePath.dir, `${sourcePath.name}.pepo`);
      const objectCodeFileName = args.obj || defaultObjectCodeFileName;
      // Clear object file if it exists, and dump formatted object code to it.
      const objectFile = fs.openSync(objectCodeFileName, 'w');
      fs.ftruncateSync(objectFile);
      fs.writeFileSync(objectFile, project.formattedObjectCode());
      fs.closeSync(objectFile);

      // Helper to replace the extension on the object file.
      const changeObjectFileExtension = (newExt: string) => {
        const objectPath = path.parse(objectCodeFileName);
        return path.join(objectPath.dir, `${objectPath.name}.${newExt}`);
      };

      // Clear listing file if it exists, and dump a formatted listing of the user program to it.
      const listingFile = fs.openSync(changeObjectFileExtension('pepl'), 'w');
      fs.ftruncateSync(listingFile);
      fs.writeFileSync(listingFile, project.formattedUserListing());
      fs.closeSync(listingFile);

      // If --enable-peph, output as .peph
      if (args['enable-peph']) {
        const pephFile = fs.openSync(changeObjectFileExtension('peph'), 'w');
        fs.ftruncateSync(pephFile);
        fs.writeFileSync(pephFile, project.formattedPeph());
        fs.closeSync(pephFile);
      }

      // If --enable-pepb, output as .pepb
      if (args['enable-pepb']) {
        const pepbFile = fs.openSync(changeObjectFileExtension('pepb'), 'w');
        fs.ftruncateSync(pepbFile);
        fs.writeFileSync(pepbFile, project.formattedPepb());
        fs.closeSync(pepbFile);
      }

      // If --enable-elf, output as .elf
      if (args['enable-elf']) {
        const elfFile = fs.openSync(changeObjectFileExtension('elf'), 'w');
        fs.ftruncateSync(elfFile);
        const arrayBytes = project.rawBytesELF();
        const bytes = new Uint8Array(arrayBytes);
        fs.writeFileSync(elfFile, bytes);
        fs.closeSync(elfFile);
      }
    } catch (except) {
      return error(except);
    } finally {
      project.delete();
    }
  }
};

const handleAsmOS = async (args: commandLineArgs.CommandLineOptions) => {
  if (args.help) {
    console.log(commandLineUsage(commands.asm.usage));
  } else if (args._unknown) {
    return error(`Unexpected option ${args._unknown[0]}`);
  } else if (!args.positionals) {
    error('must pass OS source code as a positional argument (e.g., pepterm asm-os myOS.pep');
  } else {
    const mod = await pep10;
    const project = new mod.AssemblyProject();
    // try {
    project.setOS(fs.readFileSync(args.positionals, 'ascii'));
    const errorCode = project.assemble();

    if (errorCode !== mod.AssemblyErrorCode.Complete) {
      return error(`OS Assembly failed to execute code ${mod.errorName(errorCode)}`);
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

    // If there are errors or warning, output them to --err or <source_file>_errLog.txt.
    if (errors) {
      // Select default error file, and override if --err is present.
      const defaultErrorPath = path.parse(args.positionals);
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
      return error('Assembly failed due to errors in the supplied OS.');
    }

    // Unlike user program, don't generate object code, because it is meaningless for OS.

    const sourcePath = path.parse(args.positionals);
    const defaultListingName = path.join(sourcePath.dir, `${sourcePath.name}.pepl`);
    const listingFileName = args.listing || defaultListingName;

    // Clear listing file if it exists, and dump formatted OS listing to it.
    const listingFile = fs.openSync(listingFileName, 'w');
    fs.ftruncateSync(listingFile);
    fs.writeFileSync(listingFile, project.formattedOSListing());
    fs.closeSync(listingFile);

    // Helper to replace the extension on the listing file.
    const changeListingFileExtension = (newExt: string) => {
      const listingPath = path.parse(listingFileName);
      return path.join(listingPath.dir, `${listingPath.name}.${newExt}`);
    };

    // If --enable-elf, output as .elf
    if (args['enable-elf']) {
      const elfFile = fs.openSync(changeListingFileExtension('elf'), 'w');
      fs.ftruncateSync(elfFile);
      const arrayBytes = project.rawBytesELF();
      const bytes = new Uint8Array(arrayBytes);
      fs.writeFileSync(elfFile, bytes);
      fs.closeSync(elfFile);
    }
    /* } catch (except) {
      return error(except);
    } finally {
      project.delete();
    } */
  }
};

const handleRun = async (args: commandLineArgs.CommandLineOptions) => {
  if (args.help) {
    console.log(commandLineUsage(commands.run.usage));
  } else if (args._unknown) {
    error(`Unexpected option ${args._unknown[0]}`);
  } else if (!args.positionals) {
    error('must pass object code as a positional argument (e.g., pepterm run myFile.pepo');
  } else if (args['force-elf'] && args['force-obj']) {
    error('--force-elf and --force-obj are mutually exclusive.');
  } else {
    const mod = await pep10;
    let image;
    const simulator = new mod.Pep10Simulator();
    try {
      const pepo = !(args['force-elf'] || args.positionals.endsWith('elf'));
      if (pepo) {
        const objectText = fs.readFileSync(args.positionals).toString('ascii');
        image = mod.objectCodeToImage(objectText);
      } else if (!pepo) {
        const elfText = fs.readFileSync(args.positionals);
        const elfBytes = new Uint8Array(elfText.buffer);
        // Hack to pass raw bytes from JS to WASM
        const buf = mod._malloc(elfBytes.length * elfBytes.BYTES_PER_ELEMENT);
        mod.HEAPU8.set(elfBytes, buf);
        image = mod.rawBytesToImage(buf, elfBytes.length);
        mod._free(buf);
      }

      if (!image) return error('Provided object file was invalid.');
      simulator.setImage(image);

      // Load charIn from stdIn, which is fd==0
      let charIn = '';
      // Mac OS crashes with EAGAIN if STDIN has nothing buffered.
      try {
        charIn = fs.readFileSync(process.stdin.fd, 'ascii');
      } catch (e) {
        if (e.code !== 'EAGAIN') throw e;
      }
      simulator.setCharIn(charIn);

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
      simulator.endSimulation();

      // Handle endless loops or processor errors.
      switch (retCode) {
        case mod.StepResult.NeedsMMI: return error('Program requested more input than available.');
        case mod.StepResult.Errored: return error('Processor crashed.');
        case mod.StepResult.Nominal: return error('Possible endless loop detected.');
        default: break;
      }

      // Dump charOut to stdOut, and add \n to prevent ugly % char
      // See: https://www.geeksforgeeks.org/difference-between-process-stdout-write-and-console-log-in-node-js/
      process.stdout.write(simulator.getCharOut());
      process.stdout.write('\n');
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
    if (macro) macro.delete();
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
    if (figure) figure.delete();
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
    case 'asm-os':
      await handleAsmOS(commandLineArgs(commands.asm.commands, { partial: true, argv }));
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
