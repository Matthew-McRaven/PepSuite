# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.4.0](https://gitlab.com/pep10/pepsuite/compare/v0.2.1...v0.4.0) (2022-05-27)


### Bug Fixes

* **builtins:** add missing header ([e3e6c7b](https://gitlab.com/pep10/pepsuite/commit/e3e6c7b69552bae6ac3d27f1fe1384dde75faf6e))
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
* **term:** add dummy outputs to all commands ([8682c62](https://gitlab.com/pep10/pepsuite/commit/8682c625ad5701febdf9aed0799d54a833035556)), closes [#345](https://gitlab.com/pep10/pepsuite/issues/345)
* **term:** fix broken flags, erroneous prints ([fd0997a](https://gitlab.com/pep10/pepsuite/commit/fd0997aef5590e28b47a8511e285d20e459d6491))
* **term:** fix broken ls-figures implementation ([5ca8ec5](https://gitlab.com/pep10/pepsuite/commit/5ca8ec5034df8948f3d247a0cd25e0110aba9c1a)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** fix broken package dependency ([4173273](https://gitlab.com/pep10/pepsuite/commit/417327326459659fe65f6d7dcb373e7f05b4b780))
* **term:** fix cascading comments in peph ([d097311](https://gitlab.com/pep10/pepsuite/commit/d0973112493055b0ed9295ca0efa9932a8eaf066)), closes [#382](https://gitlab.com/pep10/pepsuite/issues/382)
* **term:** fix crash on bad figure, macro ([cb24ceb](https://gitlab.com/pep10/pepsuite/commit/cb24ceb5ba3235878acc1da9eaee3414db86c236))
* **term:** fix sorting on symbol table ([78f141a](https://gitlab.com/pep10/pepsuite/commit/78f141aef219ea0f2caec3873ed10fa45a1c5f37)), closes [#59](https://gitlab.com/pep10/pepsuite/issues/59)
* **term:** handle file errors in `asm` ([5b3f4ea](https://gitlab.com/pep10/pepsuite/commit/5b3f4ea2c5684470f75c50afe4912ec7d831c790)), closes [#357](https://gitlab.com/pep10/pepsuite/issues/357)
* **term:** hide positionals flag in `run` ([d1bebde](https://gitlab.com/pep10/pepsuite/commit/d1bebde4a6f20081d7c23d69add132a2cd42158e))
* **term:** prevent memory leaks on C++ objects ([56599ca](https://gitlab.com/pep10/pepsuite/commit/56599ca57d1c2fb7d61652e650036dbfbe4de48a))
* **term:** properly end simulation ([01bf522](https://gitlab.com/pep10/pepsuite/commit/01bf522a6c8141b018c429a1ca324efc684c8ff9))
* **term:** switch to fs.closeSync ([d69fd3c](https://gitlab.com/pep10/pepsuite/commit/d69fd3cf46b692e3642937af86846a9666f76023))
* **ui:** accept empty strings in UnicodeConverter ([fb00806](https://gitlab.com/pep10/pepsuite/commit/fb0080632ef377eba991d0cc11ad322367fe78df))
* **ui:** don't reset on invallid character entry ([5cac8e6](https://gitlab.com/pep10/pepsuite/commit/5cac8e657e4c2f22007c4e5bdde241e796c772c3)), closes [#313](https://gitlab.com/pep10/pepsuite/issues/313) [#316](https://gitlab.com/pep10/pepsuite/issues/316)
* **ui:** expose HexEditorHandle, MemoryLike ([1afaf7e](https://gitlab.com/pep10/pepsuite/commit/1afaf7e375792dd176ee2c019d54a6ce0ad2445b))
* **ui:** fix broken link to converters ([2890b89](https://gitlab.com/pep10/pepsuite/commit/2890b89e00301c61190b62f0282727bfd89c549f))
* **ui:** fix broken MapConverter test  ([5490fe7](https://gitlab.com/pep10/pepsuite/commit/5490fe7149bb91e640803f2323db0bd2b6db62e3))
* **ui:** fix broken reference to IntegralConverter ([dd1596b](https://gitlab.com/pep10/pepsuite/commit/dd1596bdae757a54b9d86f7e6ad94d412b828e73)), closes [#349](https://gitlab.com/pep10/pepsuite/issues/349)
* **ui:** fix broken storybook tests ([d348212](https://gitlab.com/pep10/pepsuite/commit/d348212518a8f32c89d056767ec1be3420c93452)), closes [#349](https://gitlab.com/pep10/pepsuite/issues/349)
* **ui:** fix broken unit test for MapConverter ([074ec50](https://gitlab.com/pep10/pepsuite/commit/074ec50455b4c63551b7a8c283347cd3b8c7d453)), closes [#331](https://gitlab.com/pep10/pepsuite/issues/331)
* **ui:** fix MapConverter style regression on RO ([d749dc4](https://gitlab.com/pep10/pepsuite/commit/d749dc40998dea011f9348fe457d9b850e3e6f3a)), closes [#330](https://gitlab.com/pep10/pepsuite/issues/330)
* **ui:** fix misspelled import for integral converter ([3d67a08](https://gitlab.com/pep10/pepsuite/commit/3d67a0892a831d4451a10dcb1b80f2d83a745853))
* **ui:** fix unclearable signed IntegralConverter ([fef9bc0](https://gitlab.com/pep10/pepsuite/commit/fef9bc00b52e672058f19d9a7dfa08874fffc8b3)), closes [#322](https://gitlab.com/pep10/pepsuite/issues/322)
* **ui:** improve `-` handling for signed decimals ([1f87525](https://gitlab.com/pep10/pepsuite/commit/1f87525c04bb62af1b3805d9d1d48a9261214bd7)), closes [#353](https://gitlab.com/pep10/pepsuite/issues/353) [#321](https://gitlab.com/pep10/pepsuite/issues/321)
* **ui:** limit length of UnicodeConverter input ([b0cc762](https://gitlab.com/pep10/pepsuite/commit/b0cc762e13307da8a95f7e1c8e7dc4d17593752b)), closes [#323](https://gitlab.com/pep10/pepsuite/issues/323)
* **ui:** must strip base prefix in IntegralConverter ([772775e](https://gitlab.com/pep10/pepsuite/commit/772775e846d2d78bfcc766cc55dfce1ac7c818c5))
* **ui:** prevent text movement on switch to RO ([9cfaaa2](https://gitlab.com/pep10/pepsuite/commit/9cfaaa249264e09d3215f93b0261d9b03a8c33fd)), closes [#330](https://gitlab.com/pep10/pepsuite/issues/330)
* **ui:** stop clearing SignedDecimal on invalid input ([2b2566a](https://gitlab.com/pep10/pepsuite/commit/2b2566a5aebc635c2d956e257ecb1cd342521757)), closes [#368](https://gitlab.com/pep10/pepsuite/issues/368)
* **ui:** stop using BigInt literals ([0f90e2c](https://gitlab.com/pep10/pepsuite/commit/0f90e2c773ae82fe8b31cf1a5d63dbb3562b3094))
* **ui:** typescript workaround ([b621e01](https://gitlab.com/pep10/pepsuite/commit/b621e01c8475bb270796c0b877920d803abca1bf))


* feat!(term): rename asm's `--object-file` to `--obj` ([7ecbac7](https://gitlab.com/pep10/pepsuite/commit/7ecbac78e53e02182ca03613fa33f222f48fc341)), closes [#377](https://gitlab.com/pep10/pepsuite/issues/377)
* feat!(term): read `asm` input from positional argument ([2cfac57](https://gitlab.com/pep10/pepsuite/commit/2cfac57c0511a53c2c0e6f29761aff9029ba3778)), closes [#377](https://gitlab.com/pep10/pepsuite/issues/377)
* feat!(term): make `run`'s object file positional ([0de92f0](https://gitlab.com/pep10/pepsuite/commit/0de92f013cd5723e716d41174163f32f356c9f58)), closes [#377](https://gitlab.com/pep10/pepsuite/issues/377)
* feat!(term): read charIn from stdin ([72e4cba](https://gitlab.com/pep10/pepsuite/commit/72e4cba2cd8619df777b7144dcd1a85b82da2dac)), closes [#377](https://gitlab.com/pep10/pepsuite/issues/377)
* build!: update dockerfile to allow multi-arch builds ([8fb39e9](https://gitlab.com/pep10/pepsuite/commit/8fb39e99abaed44170daa3636639faec68fe00d4))


### Features

* add playground as workspace ([7d3c2c3](https://gitlab.com/pep10/pepsuite/commit/7d3c2c3fab5ddae7000cd0a56a85636b664dbca2))
* add playground to test DI/IoC ([58d4416](https://gitlab.com/pep10/pepsuite/commit/58d4416fc2e23aad78de83c9b17673566eee92fd))
* add sample code for CPU interface ([5b3027f](https://gitlab.com/pep10/pepsuite/commit/5b3027fcd85353715d71c5d65300ce8a769f77b7))
* **core:** add ability to init machine's registers ([406d61e](https://gitlab.com/pep10/pepsuite/commit/406d61e4b6cff0f6ff6f95f12d6964560606ed98))
* **core:** add ability to read Output devices ([d7e1236](https://gitlab.com/pep10/pepsuite/commit/d7e1236084fdebbfd139f1b3343593a3cc6bc39a))
* **core:** add ability to snoop on status bits ([36c46be](https://gitlab.com/pep10/pepsuite/commit/36c46be41b524307ddea3988f52fc031fe0c4442))
* **core:** add backened bindings for term `asm` ([0725fd9](https://gitlab.com/pep10/pepsuite/commit/0725fd96ca092e912d7acd2416aefe21f2bb43e4)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **core:** add bindings to enable term's `run` ([6630c85](https://gitlab.com/pep10/pepsuite/commit/6630c852c55596a0ec938d3e10f66613694db51b)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **core:** add function to get bytes of elf image ([4132690](https://gitlab.com/pep10/pepsuite/commit/4132690a1cef77152365faaccdc51e34ca0a9e52))
* **core:** add helper to convert hex string to bytes ([d215111](https://gitlab.com/pep10/pepsuite/commit/d2151116bbcf5499d09927629f10d6986c4096fe))
* **core:** implement symbol table listing ([58d4977](https://gitlab.com/pep10/pepsuite/commit/58d49774c8f769679c3513221354b556e8d19a37)), closes [#59](https://gitlab.com/pep10/pepsuite/issues/59)
* **core:** implment peph,pepb output ([f14904b](https://gitlab.com/pep10/pepsuite/commit/f14904b0b904575dd8dddd59460dd6928d41d5f2)), closes [#382](https://gitlab.com/pep10/pepsuite/issues/382) [#378](https://gitlab.com/pep10/pepsuite/issues/378) [#212](https://gitlab.com/pep10/pepsuite/issues/212)
* migrate playground sample code to subdirectory ([6b7a0eb](https://gitlab.com/pep10/pepsuite/commit/6b7a0eb2c9f0eb3fcd3259ac1e92f7da4ed30409))
* **term:** add ability to force file type of run ([715569a](https://gitlab.com/pep10/pepsuite/commit/715569aed8835ca440ffee1c53223175be59602d)), closes [#377](https://gitlab.com/pep10/pepsuite/issues/377)
* **term:** add colored error messages ([995c421](https://gitlab.com/pep10/pepsuite/commit/995c421e0449dbcf919ab6054e827f6b9e3bdb3f))
* **term:** add JSON description of TUI ([833f2e9](https://gitlab.com/pep10/pepsuite/commit/833f2e9ec5d38703002db16406f452867f4e6811))
* **term:** add stub for js-based terminal app ([d747d92](https://gitlab.com/pep10/pepsuite/commit/d747d92ca91817f275fa56ae69d2b72ce2a03e0a))
* **term:** always dump charOut to stdOut ([16bd961](https://gitlab.com/pep10/pepsuite/commit/16bd9613b3d5aae5c86d9edf7550f2dff6af4db0)), closes [#376](https://gitlab.com/pep10/pepsuite/issues/376) [#377](https://gitlab.com/pep10/pepsuite/issues/377)
* **term:** copy about text for pep9term ([f3b4585](https://gitlab.com/pep10/pepsuite/commit/f3b45853820ad40e9ac95e69e0465e9e925d52e9))
* **term:** enable peph/b output ([d7cb580](https://gitlab.com/pep10/pepsuite/commit/d7cb580e5a42aa6005da15403db74940695082f7)), closes [#382](https://gitlab.com/pep10/pepsuite/issues/382) [#378](https://gitlab.com/pep10/pepsuite/issues/378) [#212](https://gitlab.com/pep10/pepsuite/issues/212)
* **term:** implement `asm` subcommand ([6f96ffc](https://gitlab.com/pep10/pepsuite/commit/6f96ffc59d9bfbf73e164468285aec79b7fd38f3)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** implement `figure` subcommand ([221e9e0](https://gitlab.com/pep10/pepsuite/commit/221e9e0232c94841458ea68ca4e89ea1e2d5bf60)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** implement `ls-macros` ([a6bb299](https://gitlab.com/pep10/pepsuite/commit/a6bb299ba4e4bc65b226f7ecefdf6ba9f98faf3d)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** implement `macro` subcommand ([defa6aa](https://gitlab.com/pep10/pepsuite/commit/defa6aafac9122c9f352bdcc73cdbc8831df4034)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** implement `run` subcommand ([34d7d89](https://gitlab.com/pep10/pepsuite/commit/34d7d895e278f2dfe6d04ff4b530fd73101ab212)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** rename asm's `--error-file` to `--err` ([8a67d4b](https://gitlab.com/pep10/pepsuite/commit/8a67d4b71bf57c04df53d9b4bb7e2cf2a5bcc4ff)), closes [#377](https://gitlab.com/pep10/pepsuite/issues/377)
* **term:** suggest closest subcommand when given typo ([6bb3cb0](https://gitlab.com/pep10/pepsuite/commit/6bb3cb0e33834fbbd0c8dce0955cf6ad80d9682b)), closes [#345](https://gitlab.com/pep10/pepsuite/issues/345)
* **ui:** `-` toggles sign on SignedDecimalConverter ([53015ea](https://gitlab.com/pep10/pepsuite/commit/53015eae2977653efe5143c2501a585ce0189804)), closes [#321](https://gitlab.com/pep10/pepsuite/issues/321)
* **ui:** add basic implementation for ExportsViewer ([4c7fb53](https://gitlab.com/pep10/pepsuite/commit/4c7fb5342a3d22a16b5132cfbf4bec49b1b13c73)), closes [#333](https://gitlab.com/pep10/pepsuite/issues/333)
* **ui:** add HexEditor width to imperative API ([4a21234](https://gitlab.com/pep10/pepsuite/commit/4a21234398c044953d08cc29ecc76714a2a44065))
* **ui:** add package for memory components ([ba93afb](https://gitlab.com/pep10/pepsuite/commit/ba93afb8ec5f9ae82e6aac49176943386d280fc2))
* **ui:** add placeholder for FlatMemoryView ([f94e3a6](https://gitlab.com/pep10/pepsuite/commit/f94e3a6b5511ab10c8b17a6d098e3f10455ec3af)), closes [#363](https://gitlab.com/pep10/pepsuite/issues/363)
* **ui:** add stub for ExportsViewer ([80cae48](https://gitlab.com/pep10/pepsuite/commit/80cae48c0ee36322dd547d88b60086d1de1be765)), closes [#333](https://gitlab.com/pep10/pepsuite/issues/333)
* **ui:** add stub for ObjectCodePane ([8ef5364](https://gitlab.com/pep10/pepsuite/commit/8ef53640f53c7cc507813ef4331568eaeafeb2df)), closes [#342](https://gitlab.com/pep10/pepsuite/issues/342)
* **ui:** add stub package for editors ([ef6e64a](https://gitlab.com/pep10/pepsuite/commit/ef6e64aaa8968f3e90ebce771b065ab114661ece))
* **ui:** allow converter to have no prefix ([f733ec8](https://gitlab.com/pep10/pepsuite/commit/f733ec8e40a88feab6071ac6faab9dd0d45c3670)), closes [#350](https://gitlab.com/pep10/pepsuite/issues/350)
* **ui:** allow editable registers in RegistersPane ([0ac6280](https://gitlab.com/pep10/pepsuite/commit/0ac628043293b2be1f23bc65accc38d5bcd86e05)), closes [#294](https://gitlab.com/pep10/pepsuite/issues/294)
* **ui:** allow multiple bases in ExportsViewer ([fd96012](https://gitlab.com/pep10/pepsuite/commit/fd96012bc8e58b012bd9c6b494f626001053ed39)), closes [#333](https://gitlab.com/pep10/pepsuite/issues/333)
* **ui:** allow numpad keys in HexEditor ([26b4f7e](https://gitlab.com/pep10/pepsuite/commit/26b4f7e3cff9bf36feb9e61cc1bb3d2fefff8f1c))
* **ui:** explicitly enumerate supported bases ([be6685c](https://gitlab.com/pep10/pepsuite/commit/be6685c5ea71d9dca16085907d2a1559d987c8b3))
* **ui:** implement argument checking for PepTerm ([3a3f941](https://gitlab.com/pep10/pepsuite/commit/3a3f9416c055c08b682d3e55fac3e1eeb17af7ef))
* **ui:** implement first pass of ObjectCodePane ([06787d8](https://gitlab.com/pep10/pepsuite/commit/06787d82035097ad9f087e28c75b725c4165074c)), closes [#342](https://gitlab.com/pep10/pepsuite/issues/342)
* **ui:** implement object code utilities ([59af91f](https://gitlab.com/pep10/pepsuite/commit/59af91fd2f5c6b0597cee43c7ded8ef951d92d53)), closes [#342](https://gitlab.com/pep10/pepsuite/issues/342)
* **ui:** prototype FlatMemoryView in story ([4a12cb3](https://gitlab.com/pep10/pepsuite/commit/4a12cb3716c9f7635923b1d66e7ce2cfa8cc5c3f))
* **ui:** render ExportViewer value with IntegralConverter ([5d87d86](https://gitlab.com/pep10/pepsuite/commit/5d87d86caf06be28cef6e7430ead5f951dd1dc25)), closes [#333](https://gitlab.com/pep10/pepsuite/issues/333)


### BREAKING CHANGES

* --object-file is removed, use --obj ot -o.
* -s is removed, pass source as a positional
* Object code is now positional, not passed by --obj or --elf.
* -i is removed, charIn must come from stdin.
* llvm-14 is no longer in the path, and default OS is 22.04





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
* **term:** add dummy outputs to all commands ([8682c62](https://gitlab.com/pep10/pepsuite/commit/8682c625ad5701febdf9aed0799d54a833035556)), closes [#345](https://gitlab.com/pep10/pepsuite/issues/345)
* **term:** fix broken flags, erroneous prints ([fd0997a](https://gitlab.com/pep10/pepsuite/commit/fd0997aef5590e28b47a8511e285d20e459d6491))
* **term:** fix broken ls-figures implementation ([5ca8ec5](https://gitlab.com/pep10/pepsuite/commit/5ca8ec5034df8948f3d247a0cd25e0110aba9c1a)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** fix broken package dependency ([4173273](https://gitlab.com/pep10/pepsuite/commit/417327326459659fe65f6d7dcb373e7f05b4b780))
* **term:** fix crash on bad figure, macro ([cb24ceb](https://gitlab.com/pep10/pepsuite/commit/cb24ceb5ba3235878acc1da9eaee3414db86c236))
* **term:** fix sorting on symbol table ([78f141a](https://gitlab.com/pep10/pepsuite/commit/78f141aef219ea0f2caec3873ed10fa45a1c5f37)), closes [#59](https://gitlab.com/pep10/pepsuite/issues/59)
* **term:** handle file errors in `asm` ([5b3f4ea](https://gitlab.com/pep10/pepsuite/commit/5b3f4ea2c5684470f75c50afe4912ec7d831c790)), closes [#357](https://gitlab.com/pep10/pepsuite/issues/357)
* **term:** prevent memory leaks on C++ objects ([56599ca](https://gitlab.com/pep10/pepsuite/commit/56599ca57d1c2fb7d61652e650036dbfbe4de48a))
* **term:** properly end simulation ([01bf522](https://gitlab.com/pep10/pepsuite/commit/01bf522a6c8141b018c429a1ca324efc684c8ff9))
* **term:** switch to fs.closeSync ([d69fd3c](https://gitlab.com/pep10/pepsuite/commit/d69fd3cf46b692e3642937af86846a9666f76023))
* **ui:** accept empty strings in UnicodeConverter ([fb00806](https://gitlab.com/pep10/pepsuite/commit/fb0080632ef377eba991d0cc11ad322367fe78df))
* **ui:** don't reset on invallid character entry ([5cac8e6](https://gitlab.com/pep10/pepsuite/commit/5cac8e657e4c2f22007c4e5bdde241e796c772c3)), closes [#313](https://gitlab.com/pep10/pepsuite/issues/313) [#316](https://gitlab.com/pep10/pepsuite/issues/316)
* **ui:** expose HexEditorHandle, MemoryLike ([1afaf7e](https://gitlab.com/pep10/pepsuite/commit/1afaf7e375792dd176ee2c019d54a6ce0ad2445b))
* **ui:** fix broken link to converters ([2890b89](https://gitlab.com/pep10/pepsuite/commit/2890b89e00301c61190b62f0282727bfd89c549f))
* **ui:** fix broken MapConverter test  ([5490fe7](https://gitlab.com/pep10/pepsuite/commit/5490fe7149bb91e640803f2323db0bd2b6db62e3))
* **ui:** fix broken reference to IntegralConverter ([dd1596b](https://gitlab.com/pep10/pepsuite/commit/dd1596bdae757a54b9d86f7e6ad94d412b828e73)), closes [#349](https://gitlab.com/pep10/pepsuite/issues/349)
* **ui:** fix broken storybook tests ([d348212](https://gitlab.com/pep10/pepsuite/commit/d348212518a8f32c89d056767ec1be3420c93452)), closes [#349](https://gitlab.com/pep10/pepsuite/issues/349)
* **ui:** fix broken unit test for MapConverter ([074ec50](https://gitlab.com/pep10/pepsuite/commit/074ec50455b4c63551b7a8c283347cd3b8c7d453)), closes [#331](https://gitlab.com/pep10/pepsuite/issues/331)
* **ui:** fix MapConverter style regression on RO ([d749dc4](https://gitlab.com/pep10/pepsuite/commit/d749dc40998dea011f9348fe457d9b850e3e6f3a)), closes [#330](https://gitlab.com/pep10/pepsuite/issues/330)
* **ui:** fix misspelled import for integral converter ([3d67a08](https://gitlab.com/pep10/pepsuite/commit/3d67a0892a831d4451a10dcb1b80f2d83a745853))
* **ui:** fix unclearable signed IntegralConverter ([fef9bc0](https://gitlab.com/pep10/pepsuite/commit/fef9bc00b52e672058f19d9a7dfa08874fffc8b3)), closes [#322](https://gitlab.com/pep10/pepsuite/issues/322)
* **ui:** improve `-` handling for signed decimals ([1f87525](https://gitlab.com/pep10/pepsuite/commit/1f87525c04bb62af1b3805d9d1d48a9261214bd7)), closes [#353](https://gitlab.com/pep10/pepsuite/issues/353) [#321](https://gitlab.com/pep10/pepsuite/issues/321)
* **ui:** limit length of UnicodeConverter input ([b0cc762](https://gitlab.com/pep10/pepsuite/commit/b0cc762e13307da8a95f7e1c8e7dc4d17593752b)), closes [#323](https://gitlab.com/pep10/pepsuite/issues/323)
* **ui:** must strip base prefix in IntegralConverter ([772775e](https://gitlab.com/pep10/pepsuite/commit/772775e846d2d78bfcc766cc55dfce1ac7c818c5))
* **ui:** prevent text movement on switch to RO ([9cfaaa2](https://gitlab.com/pep10/pepsuite/commit/9cfaaa249264e09d3215f93b0261d9b03a8c33fd)), closes [#330](https://gitlab.com/pep10/pepsuite/issues/330)
* **ui:** stop clearing SignedDecimal on invalid input ([2b2566a](https://gitlab.com/pep10/pepsuite/commit/2b2566a5aebc635c2d956e257ecb1cd342521757)), closes [#368](https://gitlab.com/pep10/pepsuite/issues/368)
* **ui:** stop using BigInt literals ([0f90e2c](https://gitlab.com/pep10/pepsuite/commit/0f90e2c773ae82fe8b31cf1a5d63dbb3562b3094))


* build!: update dockerfile to allow multi-arch builds ([8fb39e9](https://gitlab.com/pep10/pepsuite/commit/8fb39e99abaed44170daa3636639faec68fe00d4))


### Features

* add playground as workspace ([7d3c2c3](https://gitlab.com/pep10/pepsuite/commit/7d3c2c3fab5ddae7000cd0a56a85636b664dbca2))
* add playground to test DI/IoC ([58d4416](https://gitlab.com/pep10/pepsuite/commit/58d4416fc2e23aad78de83c9b17673566eee92fd))
* add sample code for CPU interface ([5b3027f](https://gitlab.com/pep10/pepsuite/commit/5b3027fcd85353715d71c5d65300ce8a769f77b7))
* **core:** add ability to init machine's registers ([406d61e](https://gitlab.com/pep10/pepsuite/commit/406d61e4b6cff0f6ff6f95f12d6964560606ed98))
* **core:** add ability to read Output devices ([d7e1236](https://gitlab.com/pep10/pepsuite/commit/d7e1236084fdebbfd139f1b3343593a3cc6bc39a))
* **core:** add ability to snoop on status bits ([36c46be](https://gitlab.com/pep10/pepsuite/commit/36c46be41b524307ddea3988f52fc031fe0c4442))
* **core:** add backened bindings for term `asm` ([0725fd9](https://gitlab.com/pep10/pepsuite/commit/0725fd96ca092e912d7acd2416aefe21f2bb43e4)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **core:** add bindings to enable term's `run` ([6630c85](https://gitlab.com/pep10/pepsuite/commit/6630c852c55596a0ec938d3e10f66613694db51b)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **core:** add function to get bytes of elf image ([4132690](https://gitlab.com/pep10/pepsuite/commit/4132690a1cef77152365faaccdc51e34ca0a9e52))
* **core:** add helper to convert hex string to bytes ([d215111](https://gitlab.com/pep10/pepsuite/commit/d2151116bbcf5499d09927629f10d6986c4096fe))
* **core:** implement symbol table listing ([58d4977](https://gitlab.com/pep10/pepsuite/commit/58d49774c8f769679c3513221354b556e8d19a37)), closes [#59](https://gitlab.com/pep10/pepsuite/issues/59)
* migrate playground sample code to subdirectory ([6b7a0eb](https://gitlab.com/pep10/pepsuite/commit/6b7a0eb2c9f0eb3fcd3259ac1e92f7da4ed30409))
* **term:** add colored error messages ([995c421](https://gitlab.com/pep10/pepsuite/commit/995c421e0449dbcf919ab6054e827f6b9e3bdb3f))
* **term:** add JSON description of TUI ([833f2e9](https://gitlab.com/pep10/pepsuite/commit/833f2e9ec5d38703002db16406f452867f4e6811))
* **term:** add stub for js-based terminal app ([d747d92](https://gitlab.com/pep10/pepsuite/commit/d747d92ca91817f275fa56ae69d2b72ce2a03e0a))
* **term:** copy about text for pep9term ([f3b4585](https://gitlab.com/pep10/pepsuite/commit/f3b45853820ad40e9ac95e69e0465e9e925d52e9))
* **term:** implement `asm` subcommand ([6f96ffc](https://gitlab.com/pep10/pepsuite/commit/6f96ffc59d9bfbf73e164468285aec79b7fd38f3)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** implement `figure` subcommand ([221e9e0](https://gitlab.com/pep10/pepsuite/commit/221e9e0232c94841458ea68ca4e89ea1e2d5bf60)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** implement `ls-macros` ([a6bb299](https://gitlab.com/pep10/pepsuite/commit/a6bb299ba4e4bc65b226f7ecefdf6ba9f98faf3d)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** implement `macro` subcommand ([defa6aa](https://gitlab.com/pep10/pepsuite/commit/defa6aafac9122c9f352bdcc73cdbc8831df4034)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** implement `run` subcommand ([34d7d89](https://gitlab.com/pep10/pepsuite/commit/34d7d895e278f2dfe6d04ff4b530fd73101ab212)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** suggest closest subcommand when given typo ([6bb3cb0](https://gitlab.com/pep10/pepsuite/commit/6bb3cb0e33834fbbd0c8dce0955cf6ad80d9682b)), closes [#345](https://gitlab.com/pep10/pepsuite/issues/345)
* **ui:** `-` toggles sign on SignedDecimalConverter ([53015ea](https://gitlab.com/pep10/pepsuite/commit/53015eae2977653efe5143c2501a585ce0189804)), closes [#321](https://gitlab.com/pep10/pepsuite/issues/321)
* **ui:** add basic implementation for ExportsViewer ([4c7fb53](https://gitlab.com/pep10/pepsuite/commit/4c7fb5342a3d22a16b5132cfbf4bec49b1b13c73)), closes [#333](https://gitlab.com/pep10/pepsuite/issues/333)
* **ui:** add HexEditor width to imperative API ([4a21234](https://gitlab.com/pep10/pepsuite/commit/4a21234398c044953d08cc29ecc76714a2a44065))
* **ui:** add package for memory components ([ba93afb](https://gitlab.com/pep10/pepsuite/commit/ba93afb8ec5f9ae82e6aac49176943386d280fc2))
* **ui:** add placeholder for FlatMemoryView ([f94e3a6](https://gitlab.com/pep10/pepsuite/commit/f94e3a6b5511ab10c8b17a6d098e3f10455ec3af)), closes [#363](https://gitlab.com/pep10/pepsuite/issues/363)
* **ui:** add stub for ExportsViewer ([80cae48](https://gitlab.com/pep10/pepsuite/commit/80cae48c0ee36322dd547d88b60086d1de1be765)), closes [#333](https://gitlab.com/pep10/pepsuite/issues/333)
* **ui:** add stub for ObjectCodePane ([8ef5364](https://gitlab.com/pep10/pepsuite/commit/8ef53640f53c7cc507813ef4331568eaeafeb2df)), closes [#342](https://gitlab.com/pep10/pepsuite/issues/342)
* **ui:** add stub package for editors ([ef6e64a](https://gitlab.com/pep10/pepsuite/commit/ef6e64aaa8968f3e90ebce771b065ab114661ece))
* **ui:** allow converter to have no prefix ([f733ec8](https://gitlab.com/pep10/pepsuite/commit/f733ec8e40a88feab6071ac6faab9dd0d45c3670)), closes [#350](https://gitlab.com/pep10/pepsuite/issues/350)
* **ui:** allow editable registers in RegistersPane ([0ac6280](https://gitlab.com/pep10/pepsuite/commit/0ac628043293b2be1f23bc65accc38d5bcd86e05)), closes [#294](https://gitlab.com/pep10/pepsuite/issues/294)
* **ui:** allow multiple bases in ExportsViewer ([fd96012](https://gitlab.com/pep10/pepsuite/commit/fd96012bc8e58b012bd9c6b494f626001053ed39)), closes [#333](https://gitlab.com/pep10/pepsuite/issues/333)
* **ui:** allow numpad keys in HexEditor ([26b4f7e](https://gitlab.com/pep10/pepsuite/commit/26b4f7e3cff9bf36feb9e61cc1bb3d2fefff8f1c))
* **ui:** explicitly enumerate supported bases ([be6685c](https://gitlab.com/pep10/pepsuite/commit/be6685c5ea71d9dca16085907d2a1559d987c8b3))
* **ui:** implement argument checking for PepTerm ([3a3f941](https://gitlab.com/pep10/pepsuite/commit/3a3f9416c055c08b682d3e55fac3e1eeb17af7ef))
* **ui:** implement first pass of ObjectCodePane ([06787d8](https://gitlab.com/pep10/pepsuite/commit/06787d82035097ad9f087e28c75b725c4165074c)), closes [#342](https://gitlab.com/pep10/pepsuite/issues/342)
* **ui:** implement object code utilities ([59af91f](https://gitlab.com/pep10/pepsuite/commit/59af91fd2f5c6b0597cee43c7ded8ef951d92d53)), closes [#342](https://gitlab.com/pep10/pepsuite/issues/342)
* **ui:** prototype FlatMemoryView in story ([4a12cb3](https://gitlab.com/pep10/pepsuite/commit/4a12cb3716c9f7635923b1d66e7ce2cfa8cc5c3f))
* **ui:** render ExportViewer value with IntegralConverter ([5d87d86](https://gitlab.com/pep10/pepsuite/commit/5d87d86caf06be28cef6e7430ead5f951dd1dc25)), closes [#333](https://gitlab.com/pep10/pepsuite/issues/333)


### BREAKING CHANGES

* llvm-14 is no longer in the path, and default OS is 22.04





## [0.2.1](https://gitlab.com/pep10/pepsuite/compare/v0.2.0...v0.2.1) (2022-01-20)

**Note:** Version bump only for package pepsuite





# 0.2.0 (2022-01-20)


### Bug Fixes

* **ui:** allow external updates to UnicodeConverter ([28d4f6a](https://gitlab.com/pep10/pepsuite/commit/28d4f6a9ae74d92b37b71058561e1fe2f3774183))
* **ui:** display converters in horizontal row ([abc2873](https://gitlab.com/pep10/pepsuite/commit/abc2873b108c72e6fddd06d897e76d91ce4b91bf))
* **ui:** fix bash dummy command in ui-core ([48a28ea](https://gitlab.com/pep10/pepsuite/commit/48a28ea0211c205defa362ee318a70456ca9cc87))
* **ui:** fix broken export in help package ([c8f6a09](https://gitlab.com/pep10/pepsuite/commit/c8f6a099c746f23b0eae3fd640edbd6747669b0a))
* **ui:** fix default case for parser ([6b20730](https://gitlab.com/pep10/pepsuite/commit/6b207300ca8013706cb54ffd0625985904ab6da5)), closes [#296](https://gitlab.com/pep10/pepsuite/issues/296)
* **ui:** fix ESLint complaints in ui-cpu ([695673f](https://gitlab.com/pep10/pepsuite/commit/695673f246879c5ae065f961488c8d287f0a9790))
* **ui:** fix mispelled type ([fee6641](https://gitlab.com/pep10/pepsuite/commit/fee6641b3205c1d55a7651d037a6c0712b78a4ed))
* **ui:** fix mispelled typename ([cea459f](https://gitlab.com/pep10/pepsuite/commit/cea459f6f41776afb0a264a31caca44062316486))
* **ui:** fix ui/help package name ([e48235a](https://gitlab.com/pep10/pepsuite/commit/e48235a51de2a9014b6ecf035db01bc95538f10b))
* **ui:** inject TextEncoder into globals for testing ([a60c5a6](https://gitlab.com/pep10/pepsuite/commit/a60c5a6297dbf9bb1d32c4185b0230ded0761243))
* **ui:** re-export AsciiMapConverter ([83a11a6](https://gitlab.com/pep10/pepsuite/commit/83a11a65660bcf422beb00aa959f29e12c71fc0a))
* **ui:** respect isReadOnly in UnicodeConverter ([bac34c0](https://gitlab.com/pep10/pepsuite/commit/bac34c0843d79400664a7637b606150c8441ff3e))
* **ui:** scale RegistersPane's flags to div width ([36dc56b](https://gitlab.com/pep10/pepsuite/commit/36dc56b43099e03fa1e982357a6d9989a6bcd3b4))


* build!: remove `prepare` lifecycle script ([9aea3d9](https://gitlab.com/pep10/pepsuite/commit/9aea3d90ddb5154c78e56cfc6e11e977a7fd18f3))


### Features

* **ui:** add placeholder for ConveterContainer ([b817a17](https://gitlab.com/pep10/pepsuite/commit/b817a176a3240cb7ae82dcd993c201f8b1c31944))
* **ui:** add stubs for Integral, Map converters ([6b3d8bc](https://gitlab.com/pep10/pepsuite/commit/6b3d8bc076b8e29046486c55770cc0ffaf068194))
* **ui:** implement AsciiMapConverter ([98e1030](https://gitlab.com/pep10/pepsuite/commit/98e10305fb982fbcc849288a4dfc2245bd7c48fd))
* **ui:** implement container of converters ([104ad3e](https://gitlab.com/pep10/pepsuite/commit/104ad3e089886fb37dcae4b9a1cc470aa5677fe5))
* **ui:** implement generic RegistersPane ([c4a0bf2](https://gitlab.com/pep10/pepsuite/commit/c4a0bf2e23566a047d7ac47b1dd14ca9d472c53a))
* **ui:** implement integral byte converter ([eb3f811](https://gitlab.com/pep10/pepsuite/commit/eb3f811004a3253d8be333eac2280ac2d1916966))
* **ui:** implement MapConverter ([97ecc79](https://gitlab.com/pep10/pepsuite/commit/97ecc79790c043d38005b813fa74c6b7a268b270))
* **ui:** implement Unicode converter ([ccc4ca6](https://gitlab.com/pep10/pepsuite/commit/ccc4ca67c022b7fe7770286439285e7fcba275a2))
* **ui:** limit IntegralConverter width ([1bdb632](https://gitlab.com/pep10/pepsuite/commit/1bdb6325ac70221482c5a5f129990c88db855e80))


### BREAKING CHANGES

* To build js packages, must now `yarn clean && yarn build`.
Must explicitly rebuild after package change, as packages are no longer rebuilt on `add`.
