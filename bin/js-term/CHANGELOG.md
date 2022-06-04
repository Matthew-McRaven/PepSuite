# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.5.0](https://gitlab.com/pep10/pepsuite/compare/v0.4.1...v0.5.0) (2022-06-04)


### Bug Fixes

* **term:** spelling fixes in `asm` flags ([0a115e8](https://gitlab.com/pep10/pepsuite/commit/0a115e8eb89ef515156c78579123a60363d6b5e3))
* **term:** stop ignoring `asm`'s --os flag ([355a743](https://gitlab.com/pep10/pepsuite/commit/355a743da613cb131e0f74828076757c8da18d88)), closes [#400](https://gitlab.com/pep10/pepsuite/issues/400)


### Features

* **term:** add ability to assemble only OS ([6bf172b](https://gitlab.com/pep10/pepsuite/commit/6bf172b9ce8c68f2d4dbd8898c6a5cbf187cec09)), closes [#401](https://gitlab.com/pep10/pepsuite/issues/401)





## [0.4.1](https://gitlab.com/pep10/pepsuite/compare/v0.4.0...v0.4.1) (2022-06-03)


### Bug Fixes

* **term:** check for passed positional arguments ([773416f](https://gitlab.com/pep10/pepsuite/commit/773416f082057373fef9a266126d9cc52cb457ac)), closes [#389](https://gitlab.com/pep10/pepsuite/issues/389)
* **term:** prevent crashed when stdin is empty ([ded76a2](https://gitlab.com/pep10/pepsuite/commit/ded76a212b87bff65b9972c0080011b7468ad5f8)), closes [#396](https://gitlab.com/pep10/pepsuite/issues/396)





# [0.4.0](https://gitlab.com/pep10/pepsuite/compare/v0.2.1...v0.4.0) (2022-05-27)


### Bug Fixes

* **term:** add dummy outputs to all commands ([8682c62](https://gitlab.com/pep10/pepsuite/commit/8682c625ad5701febdf9aed0799d54a833035556)), closes [#345](https://gitlab.com/pep10/pepsuite/issues/345)
* **term:** fix broken flags, erroneous prints ([fd0997a](https://gitlab.com/pep10/pepsuite/commit/fd0997aef5590e28b47a8511e285d20e459d6491))
* **term:** fix broken ls-figures implementation ([5ca8ec5](https://gitlab.com/pep10/pepsuite/commit/5ca8ec5034df8948f3d247a0cd25e0110aba9c1a)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** fix broken package dependency ([4173273](https://gitlab.com/pep10/pepsuite/commit/417327326459659fe65f6d7dcb373e7f05b4b780))
* **term:** fix crash on bad figure, macro ([cb24ceb](https://gitlab.com/pep10/pepsuite/commit/cb24ceb5ba3235878acc1da9eaee3414db86c236))
* **term:** handle file errors in `asm` ([5b3f4ea](https://gitlab.com/pep10/pepsuite/commit/5b3f4ea2c5684470f75c50afe4912ec7d831c790)), closes [#357](https://gitlab.com/pep10/pepsuite/issues/357)
* **term:** hide positionals flag in `run` ([d1bebde](https://gitlab.com/pep10/pepsuite/commit/d1bebde4a6f20081d7c23d69add132a2cd42158e))
* **term:** prevent memory leaks on C++ objects ([56599ca](https://gitlab.com/pep10/pepsuite/commit/56599ca57d1c2fb7d61652e650036dbfbe4de48a))
* **term:** properly end simulation ([01bf522](https://gitlab.com/pep10/pepsuite/commit/01bf522a6c8141b018c429a1ca324efc684c8ff9))
* **term:** switch to fs.closeSync ([d69fd3c](https://gitlab.com/pep10/pepsuite/commit/d69fd3cf46b692e3642937af86846a9666f76023))


* feat!(term): rename asm's `--object-file` to `--obj` ([7ecbac7](https://gitlab.com/pep10/pepsuite/commit/7ecbac78e53e02182ca03613fa33f222f48fc341)), closes [#377](https://gitlab.com/pep10/pepsuite/issues/377)
* feat!(term): read `asm` input from positional argument ([2cfac57](https://gitlab.com/pep10/pepsuite/commit/2cfac57c0511a53c2c0e6f29761aff9029ba3778)), closes [#377](https://gitlab.com/pep10/pepsuite/issues/377)
* feat!(term): make `run`'s object file positional ([0de92f0](https://gitlab.com/pep10/pepsuite/commit/0de92f013cd5723e716d41174163f32f356c9f58)), closes [#377](https://gitlab.com/pep10/pepsuite/issues/377)
* feat!(term): read charIn from stdin ([72e4cba](https://gitlab.com/pep10/pepsuite/commit/72e4cba2cd8619df777b7144dcd1a85b82da2dac)), closes [#377](https://gitlab.com/pep10/pepsuite/issues/377)


### Features

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
* **ui:** implement argument checking for PepTerm ([3a3f941](https://gitlab.com/pep10/pepsuite/commit/3a3f9416c055c08b682d3e55fac3e1eeb17af7ef))


### BREAKING CHANGES

* --object-file is removed, use --obj ot -o.
* -s is removed, pass source as a positional
* Object code is now positional, not passed by --obj or --elf.
* -i is removed, charIn must come from stdin.





# [0.3.0](https://gitlab.com/pep10/pepsuite/compare/v0.2.1...v0.3.0) (2022-05-14)


### Bug Fixes

* **term:** add dummy outputs to all commands ([8682c62](https://gitlab.com/pep10/pepsuite/commit/8682c625ad5701febdf9aed0799d54a833035556)), closes [#345](https://gitlab.com/pep10/pepsuite/issues/345)
* **term:** fix broken flags, erroneous prints ([fd0997a](https://gitlab.com/pep10/pepsuite/commit/fd0997aef5590e28b47a8511e285d20e459d6491))
* **term:** fix broken ls-figures implementation ([5ca8ec5](https://gitlab.com/pep10/pepsuite/commit/5ca8ec5034df8948f3d247a0cd25e0110aba9c1a)), closes [#351](https://gitlab.com/pep10/pepsuite/issues/351)
* **term:** fix broken package dependency ([4173273](https://gitlab.com/pep10/pepsuite/commit/417327326459659fe65f6d7dcb373e7f05b4b780))
* **term:** fix crash on bad figure, macro ([cb24ceb](https://gitlab.com/pep10/pepsuite/commit/cb24ceb5ba3235878acc1da9eaee3414db86c236))
* **term:** handle file errors in `asm` ([5b3f4ea](https://gitlab.com/pep10/pepsuite/commit/5b3f4ea2c5684470f75c50afe4912ec7d831c790)), closes [#357](https://gitlab.com/pep10/pepsuite/issues/357)
* **term:** prevent memory leaks on C++ objects ([56599ca](https://gitlab.com/pep10/pepsuite/commit/56599ca57d1c2fb7d61652e650036dbfbe4de48a))
* **term:** properly end simulation ([01bf522](https://gitlab.com/pep10/pepsuite/commit/01bf522a6c8141b018c429a1ca324efc684c8ff9))
* **term:** switch to fs.closeSync ([d69fd3c](https://gitlab.com/pep10/pepsuite/commit/d69fd3cf46b692e3642937af86846a9666f76023))


### Features

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
* **ui:** implement argument checking for PepTerm ([3a3f941](https://gitlab.com/pep10/pepsuite/commit/3a3f9416c055c08b682d3e55fac3e1eeb17af7ef))
