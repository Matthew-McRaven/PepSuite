# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.4.1](https://gitlab.com/pep10/pepsuite/compare/v0.4.0...v0.4.1) (2022-06-03)


### Bug Fixes

* **core:** add newline between asmb listing, symtab ([0fbfd29](https://gitlab.com/pep10/pepsuite/commit/0fbfd29db3d6968d0cdccfc66b7109688f3610c5)), closes [#395](https://gitlab.com/pep10/pepsuite/issues/395)
* **core:** capitalize hex strings in symtab ([b6cb036](https://gitlab.com/pep10/pepsuite/commit/b6cb0364713ae92d685d5ea1f1fd041455bdabca)), closes [#395](https://gitlab.com/pep10/pepsuite/issues/395)
* **core:** fix crashing assert ([c6cb7de](https://gitlab.com/pep10/pepsuite/commit/c6cb7de625bfb79607edda12c273e822e2b179e6))
* **core:** fix peph/b macro lines ([d8bd652](https://gitlab.com/pep10/pepsuite/commit/d8bd652edeb7da77396c1e6ceba28d66a9b6afc5)), closes [#384](https://gitlab.com/pep10/pepsuite/issues/384)
* **core:** increase spacing between symtab columns ([6a54bd1](https://gitlab.com/pep10/pepsuite/commit/6a54bd19439fb717d75206075edd641a96369bf9)), closes [#395](https://gitlab.com/pep10/pepsuite/issues/395)
* **core:** make addressing mode string lower case ([bcc4c99](https://gitlab.com/pep10/pepsuite/commit/bcc4c996614088332e49277661a128980702fd59)), closes [#395](https://gitlab.com/pep10/pepsuite/issues/395)
* **core:** silence [[nodiscard]] warning ([b8ae516](https://gitlab.com/pep10/pepsuite/commit/b8ae516092605fb8598baff70410a8a271c69112))
* **core:** silence non-void missing return value ([035e83f](https://gitlab.com/pep10/pepsuite/commit/035e83fb65e5321389fdc7bdaa3aff3cfde1eeec))
* **core:** silence unhandled cases warning ([2c207df](https://gitlab.com/pep10/pepsuite/commit/2c207df22b784b9731b8402afd354e4cc6ec42e4))





# [0.4.0](https://gitlab.com/pep10/pepsuite/compare/v0.2.1...v0.4.0) (2022-05-27)


### Bug Fixes

* **builtins:** loop forever on power off ([8aef2f6](https://gitlab.com/pep10/pepsuite/commit/8aef2f63d55488f5e36e2c541e564c6974225e4e))
* **core:** add missing `;` to comment lines ([1150a75](https://gitlab.com/pep10/pepsuite/commit/1150a75241bb329ea6dd6417df447547822c9283))
* **core:** add missing includes ([438a626](https://gitlab.com/pep10/pepsuite/commit/438a626405a815722d149c11f72afaed8c6d0813))
* **core:** add space between object code, labels ([b2dd357](https://gitlab.com/pep10/pepsuite/commit/b2dd357f68feb0fadb39f5c0956ee117decc858f)), closes [#138](https://gitlab.com/pep10/pepsuite/issues/138) [#355](https://gitlab.com/pep10/pepsuite/issues/355)
* **core:** fix broken fmt::vformat call ([c5c1e4d](https://gitlab.com/pep10/pepsuite/commit/c5c1e4d5a25f93768d573e2a76c5a911cdb44571))
* **core:** fix endless loop .BLOCK listing ([721f26d](https://gitlab.com/pep10/pepsuite/commit/721f26d9da74f8f748e985dd485efb1c6d6b2645))
* **core:** fix misaligned comment spacing in pepb/h ([8d73ed8](https://gitlab.com/pep10/pepsuite/commit/8d73ed827901190e4a0a838a6d1c1ca0c369edd3))
* **core:** fix missing include ([0924cc6](https://gitlab.com/pep10/pepsuite/commit/0924cc6babf52c35233ee355f989cb07e3c93083))
* **core:** fix spacing on macro listing ([b52ca57](https://gitlab.com/pep10/pepsuite/commit/b52ca578b311f137bbf78b46817a703d237314df)), closes [#355](https://gitlab.com/pep10/pepsuite/issues/355)
* **core:** handle optional addressing modes ([afd5ff2](https://gitlab.com/pep10/pepsuite/commit/afd5ff2dc75223e886f9a25474ed9a804be41296))
* **core:** remove 0x from listing address field ([f5666a7](https://gitlab.com/pep10/pepsuite/commit/f5666a76e58d9ecb576ffa4e7c2693fee7624aa7)), closes [#375](https://gitlab.com/pep10/pepsuite/issues/375)
* **core:** stop echo'ing symbol info to cout ([de04548](https://gitlab.com/pep10/pepsuite/commit/de04548eb9ec3e983aeb1851f2842065205c7f6b))
* **term:** fix cascading comments in peph ([d097311](https://gitlab.com/pep10/pepsuite/commit/d0973112493055b0ed9295ca0efa9932a8eaf066)), closes [#382](https://gitlab.com/pep10/pepsuite/issues/382)
* **term:** fix sorting on symbol table ([78f141a](https://gitlab.com/pep10/pepsuite/commit/78f141aef219ea0f2caec3873ed10fa45a1c5f37)), closes [#59](https://gitlab.com/pep10/pepsuite/issues/59)


### Features

* **core:** add ability to init machine's registers ([406d61e](https://gitlab.com/pep10/pepsuite/commit/406d61e4b6cff0f6ff6f95f12d6964560606ed98))
* **core:** add ability to read Output devices ([d7e1236](https://gitlab.com/pep10/pepsuite/commit/d7e1236084fdebbfd139f1b3343593a3cc6bc39a))
* **core:** add ability to snoop on status bits ([36c46be](https://gitlab.com/pep10/pepsuite/commit/36c46be41b524307ddea3988f52fc031fe0c4442))
* **core:** add backened bindings for term `asm` ([0725fd9](https://gitlab.com/pep10/pepsuite/commit/0725fd96ca092e912d7acd2416aefe21f2bb43e4)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **core:** add bindings to enable term's `run` ([6630c85](https://gitlab.com/pep10/pepsuite/commit/6630c852c55596a0ec938d3e10f66613694db51b)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **core:** add function to get bytes of elf image ([4132690](https://gitlab.com/pep10/pepsuite/commit/4132690a1cef77152365faaccdc51e34ca0a9e52))
* **core:** add helper to convert hex string to bytes ([d215111](https://gitlab.com/pep10/pepsuite/commit/d2151116bbcf5499d09927629f10d6986c4096fe))
* **core:** implement symbol table listing ([58d4977](https://gitlab.com/pep10/pepsuite/commit/58d49774c8f769679c3513221354b556e8d19a37)), closes [#59](https://gitlab.com/pep10/pepsuite/issues/59)
* **core:** implment peph,pepb output ([f14904b](https://gitlab.com/pep10/pepsuite/commit/f14904b0b904575dd8dddd59460dd6928d41d5f2)), closes [#382](https://gitlab.com/pep10/pepsuite/issues/382) [#378](https://gitlab.com/pep10/pepsuite/issues/378) [#212](https://gitlab.com/pep10/pepsuite/issues/212)
* **term:** add ability to force file type of run ([715569a](https://gitlab.com/pep10/pepsuite/commit/715569aed8835ca440ffee1c53223175be59602d)), closes [#377](https://gitlab.com/pep10/pepsuite/issues/377)
* **term:** implement `figure` subcommand ([221e9e0](https://gitlab.com/pep10/pepsuite/commit/221e9e0232c94841458ea68ca4e89ea1e2d5bf60)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** implement `ls-macros` ([a6bb299](https://gitlab.com/pep10/pepsuite/commit/a6bb299ba4e4bc65b226f7ecefdf6ba9f98faf3d)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** implement `macro` subcommand ([defa6aa](https://gitlab.com/pep10/pepsuite/commit/defa6aafac9122c9f352bdcc73cdbc8831df4034)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)





# [0.3.0](https://gitlab.com/pep10/pepsuite/compare/v0.2.1...v0.3.0) (2022-05-14)


### Bug Fixes

* **builtins:** loop forever on power off ([8aef2f6](https://gitlab.com/pep10/pepsuite/commit/8aef2f63d55488f5e36e2c541e564c6974225e4e))
* **core:** add missing `;` to comment lines ([1150a75](https://gitlab.com/pep10/pepsuite/commit/1150a75241bb329ea6dd6417df447547822c9283))
* **core:** add missing includes ([438a626](https://gitlab.com/pep10/pepsuite/commit/438a626405a815722d149c11f72afaed8c6d0813))
* **core:** add space between object code, labels ([b2dd357](https://gitlab.com/pep10/pepsuite/commit/b2dd357f68feb0fadb39f5c0956ee117decc858f)), closes [#138](https://gitlab.com/pep10/pepsuite/issues/138) [#355](https://gitlab.com/pep10/pepsuite/issues/355)
* **core:** fix broken fmt::vformat call ([c5c1e4d](https://gitlab.com/pep10/pepsuite/commit/c5c1e4d5a25f93768d573e2a76c5a911cdb44571))
* **core:** fix endless loop .BLOCK listing ([721f26d](https://gitlab.com/pep10/pepsuite/commit/721f26d9da74f8f748e985dd485efb1c6d6b2645))
* **core:** fix missing include ([0924cc6](https://gitlab.com/pep10/pepsuite/commit/0924cc6babf52c35233ee355f989cb07e3c93083))
* **core:** fix spacing on macro listing ([b52ca57](https://gitlab.com/pep10/pepsuite/commit/b52ca578b311f137bbf78b46817a703d237314df)), closes [#355](https://gitlab.com/pep10/pepsuite/issues/355)
* **core:** handle optional addressing modes ([afd5ff2](https://gitlab.com/pep10/pepsuite/commit/afd5ff2dc75223e886f9a25474ed9a804be41296))
* **core:** stop echo'ing symbol info to cout ([de04548](https://gitlab.com/pep10/pepsuite/commit/de04548eb9ec3e983aeb1851f2842065205c7f6b))
* **term:** fix sorting on symbol table ([78f141a](https://gitlab.com/pep10/pepsuite/commit/78f141aef219ea0f2caec3873ed10fa45a1c5f37)), closes [#59](https://gitlab.com/pep10/pepsuite/issues/59)


### Features

* **core:** add ability to init machine's registers ([406d61e](https://gitlab.com/pep10/pepsuite/commit/406d61e4b6cff0f6ff6f95f12d6964560606ed98))
* **core:** add ability to read Output devices ([d7e1236](https://gitlab.com/pep10/pepsuite/commit/d7e1236084fdebbfd139f1b3343593a3cc6bc39a))
* **core:** add ability to snoop on status bits ([36c46be](https://gitlab.com/pep10/pepsuite/commit/36c46be41b524307ddea3988f52fc031fe0c4442))
* **core:** add backened bindings for term `asm` ([0725fd9](https://gitlab.com/pep10/pepsuite/commit/0725fd96ca092e912d7acd2416aefe21f2bb43e4)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **core:** add bindings to enable term's `run` ([6630c85](https://gitlab.com/pep10/pepsuite/commit/6630c852c55596a0ec938d3e10f66613694db51b)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **core:** add function to get bytes of elf image ([4132690](https://gitlab.com/pep10/pepsuite/commit/4132690a1cef77152365faaccdc51e34ca0a9e52))
* **core:** add helper to convert hex string to bytes ([d215111](https://gitlab.com/pep10/pepsuite/commit/d2151116bbcf5499d09927629f10d6986c4096fe))
* **core:** implement symbol table listing ([58d4977](https://gitlab.com/pep10/pepsuite/commit/58d49774c8f769679c3513221354b556e8d19a37)), closes [#59](https://gitlab.com/pep10/pepsuite/issues/59)
* **term:** implement `figure` subcommand ([221e9e0](https://gitlab.com/pep10/pepsuite/commit/221e9e0232c94841458ea68ca4e89ea1e2d5bf60)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** implement `ls-macros` ([a6bb299](https://gitlab.com/pep10/pepsuite/commit/a6bb299ba4e4bc65b226f7ecefdf6ba9f98faf3d)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** implement `macro` subcommand ([defa6aa](https://gitlab.com/pep10/pepsuite/commit/defa6aafac9122c9f352bdcc73cdbc8831df4034)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)





## [0.2.1](https://gitlab.com/pep10/pepsuite/compare/v0.2.0...v0.2.1) (2022-01-20)

**Note:** Version bump only for package @pep10/core





# 0.2.0 (2022-01-20)


### Bug Fixes

* **ui:** fix ESLint complaints in ui-cpu ([695673f](https://gitlab.com/pep10/pepsuite/commit/695673f246879c5ae065f961488c8d287f0a9790))
