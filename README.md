# Relation to Pep9Suite
This project is a continuation of the Pep/9 computer's associated software suite, [Pep9Suite](https://github.com/StanWarford/pep9suite).
Whille Pep9Suite is still maintained, we are interested in taking advantage of a new software stack.
This software stack has reduced turn around time for new features, and improved reliability through increased automated testing.

Using our experience from previous iterations, we hope to deliver an increasingly professional IDE for users.

# What is PepSuite?
The Pep project consists of many iterations of a 16-bit complex instruction set computer (CISC) computer.
Within this repository, the Pep/9 and Pep/10 versions are represented across multiple levels of abstractuon

# PepSuite
PepSuite is a suite of software for the Pep/9 and Pep/10 virtual machines.
It consists of two applications:

* [PepIDE](#pepide)
* [PepTerm](#pepterm)

## PepIDE
PepAsm is a simulator allowing users to interact with the Pep/10 virtual machine at the assembly, operating system, ISA levels, and microcode levels.


### Assembly
PepIDE features an integrated text editor, error messages in red type that are inserted within the source code at the place where the error is detected, student-friendly machine language object code in hexadecimal format, the ability to code directly in machine language, bypassing the assembler.

The Pep/9 computer features the ability to redefine the mnemonics for the unimplemented opcodes that trigger synchronous traps.

The Pep/10 computer features the ability to define custom macros.

### ISA
The simulator features simulated ROM that is not altered by store instructions, a small operating system burned into simulated ROM that includes a loader and a trap handler system, an integrated debugger that allows for break points, single and multi step execution, CPU tracing, and memory tracing, the option to trace an application, the loader, or the operating system, the ability to recover from endless loops, and the ability to modify the operating system by designing new trap handlers for the unimplemented opcodes.

### Microcode
The CPU mode is a simulator allowing users to interact with the data sections of the Pep/9 and Pep/10 CPUs.

It contains two versions of the Pep/9 CPU data section &ndash; one with a one-byte wide data bus and another with a two-byte wide data bus. Using a GUI, students are able to set the control signals to direct the flow of data and change the state of the CPU. Alternatively, the Microcode IDE allows students to write microprogram code fragments to perform useful computations. An integrated unit test facility allows users to write pre- and post-conditions to verify correct behavior of arbitrary microprograms.

While debugging a microprogram fragment, the CPU simulator performs graphical tracing of data paths through the CPU. Using breakpoints, students may skip over previously debugged microstatments and resume debugging at a later point in the program.


### ISA / Microcode Interface
Contained within PepIDE is a fully microcoded implementation of the Pep/9 and Pep/10 virtual machines.
These extensions to their repsective textbooks is dubber *PepMicro*
PepMicro adds a control section, missing in Pep9CPU, and extends the microcode language to allow conditional microcode branches.
It integrates all the programming features of Pep9 and the graphical CPU interaction of Pep9CPU to simulate the complete execution of assembly language programs.

* Extebd the assembler and CPU simulator so that complete assembly language programs can be executed at the microcode level spanning four levels of system abstraction &ndash; the assembly level, the operating system level, the ISA level, and the microcode level.
* Runs both memory aligned and nonaligned programs. Assembly language programs that do not use optimal .ALIGN directives still execute correctly but slower.
* Provides performance statistics in the form of statement execution counts at the microcode level and the ISA level. Students can measure the performance differences between aligned and nonaligned programs.
* Retains the unit tests of the original Pep/9 CPU IDE so that students can write microcode fragments with the extended microinstruction format.
* Supports new debugging features like step-into, step-out, and step-over so students can trace assembly programs more efficiently.


## PepTerm
PepTerm is a command-line version of the Pep/9 and Pep/10 virtual machine.s
It uses the assembler from the PepIDE application to create a .pepo file, and the simulator to execute the .pepo file.
Teachers can script PepTerm to batch test assembly language homework submissions.

# What are Pep/9 and Pep/10
## Pep/9
The Pep/9 computer is a 16-bit complex instruction set computer (CISC).
It is designed to teach computer architecture, assembly language programming, and computer organization principles as described in the text [_Computer Systems_, J. Stanley Warford, 5th edition](http://computersystemsbook.com/5th-edition/).
Pep/9 instructions are based on an expanding opcode and are either unary (one byte) or nonunary (three bytes).
The eight addressing modes and eight dot commands are designed for straightforward translation from C to assembly language.

## Pep/10
The Pep/10 computer is a 16-bit complex instruction set computer (CISC). 
It is designed to teach computer architecture, assembly language programming, and computer organization principles as described in a future book. 
Pep/10 instructions are based on an expanding opcode and are either unary (one byte) or nonunary (three bytes). 
The eight addressing modes and eight dot commands are designed for straightforward translation from C to assembly language.
The inclusion of macros facilities ease this translation,

# Contributing
Please see [our Contribution Guidelines](CONTRIBUTING.md) before contributing to this project.


# Building from Sources
It is recommended to build the application from within a development container in visual studio code.
From visual studio code, various tasks compile different segments of the project, as will be documented here in the future.

# Help Documentation
The programs come packaged with help documentation to describe the nature and function of the Pep virtual machines including walkthroughs on Pep assembly languages programming and debugging tools/tips.
They also have collections of sample assembly programs from their respective textbooks

# Executable Downloads
For analytic reasons, we prefer that you download executables from the above book web site instead of GitHub.

# Developers

Contribute to Pep/9 and Pep/10 development. Join the Discord chat at [https://discord.gg/Qza7QH8](https://discord.gg/Qza7QH8).


# License

We license this project under the GPLv2 License with a classpath exception
