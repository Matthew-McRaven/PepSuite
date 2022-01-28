// We're a console app... we need logging ability.
/* eslint-disable no-console */
// command-line-args has a var named _unknown, so the following rule is invalid.
/* eslint-disable no-underscore-dangle */

import commandLineArgs, { OptionDefinition } from 'command-line-args';
import commandLineUsage from 'command-line-usage';
import chalk from 'chalk';
import leven from 'leven';
import { pep10 } from '@pep10/core';
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
    error(`Unexpected option ${args._unknown[0]}`);
  } else if (!args['source-file']) {
    error('--source-file (or -s) is required.');
  } else if (!args['object-file']) {
    error('--object-file (or -o) is required.');
  } else {
    console.log('Handling ASM');
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
    console.log('Handling run');
  }
};

const handleMacro = async (args: commandLineArgs.CommandLineOptions) => {
  if (args.help) {
    console.log(commandLineUsage(commands.macro.usage));
  } else if (args._unknown) {
    error(`Unexpected option ${args._unknown[0]}`);
  } else if (!args.macro) {
    error('--macro is required');
  } else {
    console.log(`Looking for macro ${args.macro}`);
  }
};

const handleLSMacros = async (args: commandLineArgs.CommandLineOptions) => {
  if (args.help) {
    console.log(commandLineUsage(commands.lsmacros.usage));
  } else if (args._unknown) {
    error(`Unexpected option ${args._unknown[0]}`);
  } else {
    const mod = await pep10;
    const figures = new mod.Registry().figures();
    console.log("Computer Systems, 6th edition figures:")
    for (let i = 0; i < figures.size(); i += 1) {
      if(figures.get(i).processor !== "pep10") continue
      console.log(`\tFigure ${figures.get(i).chapter}.${figures.get(i).figure}`);
    }
  }
};

const handleFigure = async (args: commandLineArgs.CommandLineOptions) => {
  if (args.help) {
    console.log(commandLineUsage(commands.figure.usage));
  } else if (args._unknown) {
    console.error(`Unexpected option ${args._unknown[0]}`);
    process.exitCode = 1;
  } else if (!args.ch) {
    error('--ch is a required argument.');
  } else if (!args.fig) {
    error('--fig is a required argument.');
  } else {
    const { fig, ch } = args;
    console.log(`Looking for Figure ${ch}.${fig}`);
  }
};

const handleLSFigures = async (args: commandLineArgs.CommandLineOptions) => {
  if (args.help) {
    console.log(commandLineUsage(commands.lsfigures.usage));
  } else if (args._unknown) {
    error(`Unexpected option ${args._unknown[0]}`);
  } else {
    // Print out list of figures to console.
    // Would be nice if it was organized by chapter.
    console.log('Echo\'ing figure list');
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
