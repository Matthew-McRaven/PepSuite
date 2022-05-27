/* eslint-disable no-multi-str */
import type { Section, OptionDefinition } from 'command-line-usage';

interface Command {
  name: string
  oneLine: string
  detailed: string
  commands: OptionDefinition[]
  auxCommands?: OptionDefinition[]
  sampleInvoke?: string,
  usage: Section[]
}

export const headerSection = {
  header: 'PepTerm',
  content: 'Any body text we would like to have describing the application',
};

const helpCommand = {
  name: 'help',
  alias: 'h',
  type: Boolean,
  description: 'Display this help message',
};

const synopsis = (detailed: string, sampleInvoke?: string) => ({
  header: 'Synopsis',
  content: sampleInvoke !== undefined
    ? [detailed, '\n\nSample Invocation:\n', sampleInvoke].join('')
    : detailed,
});

/** *************
* `asm` Section *
***************** */
export const asm: Command = {
  name: 'asm',
  oneLine: 'Assemble a Pep/10 assembler source code program to object code.',
  detailed: 'The source_file must be a .pep file.\n\
If there are assembly errors, an error log file named <source_file>_errLog.txt is created with the error messages.\
If there are no errors, the error log file is not created.',
  commands: [{
    name: 'positionals',
    defaultOption: true,
    description: 'Arguments that must be passed',
  }, helpCommand,
  {
    name: 'obj',
    alias: 'o',
    description: 'Output object code generated from source.',
  },
  {
    name: 'error-file',
    alias: 'e',
    description: 'Override the name of the default error log file.',
  },
  {
    name: 'enable-pepb',
    type: Boolean,
    description: 'Enable outputting pep object code as formatted binary'
  },
  {
    name: 'enable-peph',
    type: Boolean,
    description: 'Enable outputting pep object code as formatted hex'
  },
  {
    name: 'os',
    description: 'Input Pep/10 operating system for assembler. If not present, will default to textbook\'s OS.',
  },
  {
    name: 'enable-elf',
    type: Boolean,
    description: 'In addition to a .pepo objetc code file, dump the object code as an ELF file.',
  },
  ],
  sampleInvoke: '$ pepterm asm -s <{underline source_file}> -o <{underline object_file}> <options>',
  usage: [],
};
asm.usage = [
  synopsis(asm.detailed, asm.sampleInvoke),
  {
    header: 'Options',
    hide: ['positionals'],
    optionList: asm.commands,
  },
];

/** ***************
* `run` Section *
******************* */
export const run: Command = {
  name: 'run',
  oneLine: 'Run a Pep/10 object code program.',
  commands: [{
    name: 'positionals',
    defaultOption: true,
    description: 'File containg object code to be executed',
  }, helpCommand,
  {
    name: 'force-obj',
    description: 'Force interpretation of input file as pep object code. Mutually exclusive with --force-elf.',
  },
  {
    name: 'force-elf',
    description: 'orce interpretation of input file as a pep ELF file. Mutually exclusive with --force-obj.',
  },
  {
    name: 'max-steps',
    alias: 'm',
    type: Number,
    description: 'Override the default value of max_steps.',
  },
  ],
  sampleInvoke: '$ pepterm run {underline object_file}  <options>',
  detailed: 'The object_file must be a .pepo or .elf file.\n\
File type will be inferred from extension, and will default to pep object code.\n\
Interpretation of object code can be force with the --force-* flags.\n\
Character input is read from stdin (if present) and character output is written to stdout.\n\
Runtime errors are written to stderr.\n\
As a guard against endless loops the program will abort after max_steps assembly instructions execute.\n\
The default value of max_steps is 100,000',
  usage: [],
};

run.usage = [
  headerSection,
  synopsis(run.detailed, run.sampleInvoke),
  {
    header: 'Options',
    hide: ['positionals'],
    optionList: run.commands,
  },
];

/** ***************
* `macro` Section *
******************* */
export const macro: Command = {
  name: 'macro',
  oneLine: 'Echo the text of a builtin macro to stdout.',
  commands: [{
    name: 'macro',
    defaultOption: true,
    description: 'Name of macro',
  }, helpCommand,
  ],
  sampleInvoke: '$ pepterm macro {underline macro_name}',
  detailed: 'TODO',
  usage: [],
};

macro.usage = [
  headerSection,
  synopsis(macro.detailed, macro.sampleInvoke),
  {
    header: 'Options',
    hide: ['positionals'],
    optionList: macro.commands,
  },
];

/** ***************
* `ls-macro` Section *
******************* */
export const lsmacros: Command = {
  name: 'ls-macros',
  oneLine: 'Echo the list of builtin figures to stdout.',
  commands: [{
    name: 'positionals',
    defaultOption: true,
    description: 'Arguments that must be passed',
  }, helpCommand,
  ],
  sampleInvoke: '$ pepterm ls-macros',
  detailed: 'TODO',
  usage: [],
};

lsmacros.usage = [
  headerSection,
  synopsis(lsmacros.detailed, lsmacros.sampleInvoke),
  {
    header: 'Options',
    hide: ['positionals'],
    optionList: lsmacros.commands,
  },
];

/** ***************
* `figure` Section *
******************* */
export const figure: Command = {
  name: 'figure',
  oneLine: 'Echo the text of a builtin figure to stdout.',
  commands: [{
    name: 'positionals',
    defaultOption: true,
    description: 'Arguments that must be passed',
  }, helpCommand,
  {
    name: 'ch',
    description: 'Chapter number for figure',
    type: String,
  },
  {
    name: 'fig',
    description: 'Figure name for figure',
    type: String,
  },
  ],
  sampleInvoke: '$ pepterm figure --ch {underline chapter-number} --fig {underline figure-name}',
  detailed: 'TODO',
  usage: [],
};

figure.usage = [
  headerSection,
  synopsis(figure.detailed, figure.sampleInvoke),
  {
    header: 'Options',
    hide: ['positionals'],
    optionList: figure.commands,
  },
];

/** ***************
* `ls-macro` Section *
******************* */
export const lsfigures: Command = {
  name: 'ls-figures',
  oneLine: 'Echo the list of builtin macros to stdout.',
  commands: [{
    name: 'positionals',
    defaultOption: true,
    description: 'Arguments that must be passed',
  }, helpCommand,
  ],
  sampleInvoke: '$ pepterm ls-figures',
  detailed: 'TODO',
  usage: [],
};

lsfigures.usage = [
  headerSection,
  synopsis(lsfigures.detailed, lsfigures.sampleInvoke),
  {
    header: 'Options',
    hide: ['positionals'],
    optionList: lsfigures.commands,
  },
];
/** *****************
* Top Level Section *
********************* */

export const toplevel: Command = {
  name: 'pepterm',
  oneLine: 'Translate and run Pep/10 assembly language and microcode programs.',
  commands: [{
    name: 'command',
    defaultOption: true,
    typeLabel: '{underline command}',
    description: 'The sub-command to be run.',
  }],
  auxCommands: [
    helpCommand,
    {
      name: 'version',
      alias: 'v',
      type: Boolean,
      description: 'Display this application\'s verion number and sha',
    }, {
      name: 'about',
      type: Boolean,
      description: 'Display information about support, developers, and licensing.',
    },
  ],
  detailed: 'Detailed instructions here',
  sampleInvoke: '$ pepterm <options> {bold subcommand}',
  usage: [],
};

toplevel.usage = [
  headerSection,
  synopsis(toplevel.detailed, toplevel.sampleInvoke),
  {
    header: 'Valid Subcommands',
    content: [asm, run, macro, lsmacros, figure, lsfigures].map(
      (element) => `${element.name.padEnd(15, ' ')}${element.oneLine}`,
    ),
  },
  {
    header: 'Options',
    hide: ['command'],
    optionList: [...toplevel.commands, ...toplevel.auxCommands || []],
  },
];
