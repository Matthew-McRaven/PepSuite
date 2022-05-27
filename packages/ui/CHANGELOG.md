# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.4.0](https://gitlab.com/pep10/pepsuite/compare/v0.2.1...v0.4.0) (2022-05-27)


### Bug Fixes

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


### Features

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
* **ui:** implement first pass of ObjectCodePane ([06787d8](https://gitlab.com/pep10/pepsuite/commit/06787d82035097ad9f087e28c75b725c4165074c)), closes [#342](https://gitlab.com/pep10/pepsuite/issues/342)
* **ui:** implement object code utilities ([59af91f](https://gitlab.com/pep10/pepsuite/commit/59af91fd2f5c6b0597cee43c7ded8ef951d92d53)), closes [#342](https://gitlab.com/pep10/pepsuite/issues/342)
* **ui:** prototype FlatMemoryView in story ([4a12cb3](https://gitlab.com/pep10/pepsuite/commit/4a12cb3716c9f7635923b1d66e7ce2cfa8cc5c3f))
* **ui:** render ExportViewer value with IntegralConverter ([5d87d86](https://gitlab.com/pep10/pepsuite/commit/5d87d86caf06be28cef6e7430ead5f951dd1dc25)), closes [#333](https://gitlab.com/pep10/pepsuite/issues/333)





# [0.3.0](https://gitlab.com/pep10/pepsuite/compare/v0.2.1...v0.3.0) (2022-05-14)


### Bug Fixes

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


### Features

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
* **ui:** implement first pass of ObjectCodePane ([06787d8](https://gitlab.com/pep10/pepsuite/commit/06787d82035097ad9f087e28c75b725c4165074c)), closes [#342](https://gitlab.com/pep10/pepsuite/issues/342)
* **ui:** implement object code utilities ([59af91f](https://gitlab.com/pep10/pepsuite/commit/59af91fd2f5c6b0597cee43c7ded8ef951d92d53)), closes [#342](https://gitlab.com/pep10/pepsuite/issues/342)
* **ui:** prototype FlatMemoryView in story ([4a12cb3](https://gitlab.com/pep10/pepsuite/commit/4a12cb3716c9f7635923b1d66e7ce2cfa8cc5c3f))
* **ui:** render ExportViewer value with IntegralConverter ([5d87d86](https://gitlab.com/pep10/pepsuite/commit/5d87d86caf06be28cef6e7430ead5f951dd1dc25)), closes [#333](https://gitlab.com/pep10/pepsuite/issues/333)





## [0.2.1](https://gitlab.com/pep10/pepsuite/compare/v0.2.0...v0.2.1) (2022-01-20)

**Note:** Version bump only for package ui





# 0.2.0 (2022-01-20)


### Bug Fixes

* **ui:** allow external updates to UnicodeConverter ([28d4f6a](https://gitlab.com/pep10/pepsuite/commit/28d4f6a9ae74d92b37b71058561e1fe2f3774183))
* **ui:** fix default case for parser ([6b20730](https://gitlab.com/pep10/pepsuite/commit/6b207300ca8013706cb54ffd0625985904ab6da5)), closes [#296](https://gitlab.com/pep10/pepsuite/issues/296)
* **ui:** fix ESLint complaints in ui-cpu ([695673f](https://gitlab.com/pep10/pepsuite/commit/695673f246879c5ae065f961488c8d287f0a9790))
* **ui:** fix mispelled type ([fee6641](https://gitlab.com/pep10/pepsuite/commit/fee6641b3205c1d55a7651d037a6c0712b78a4ed))
* **ui:** fix mispelled typename ([cea459f](https://gitlab.com/pep10/pepsuite/commit/cea459f6f41776afb0a264a31caca44062316486))
* **ui:** inject TextEncoder into globals for testing ([a60c5a6](https://gitlab.com/pep10/pepsuite/commit/a60c5a6297dbf9bb1d32c4185b0230ded0761243))
* **ui:** respect isReadOnly in UnicodeConverter ([bac34c0](https://gitlab.com/pep10/pepsuite/commit/bac34c0843d79400664a7637b606150c8441ff3e))
* **ui:** scale RegistersPane's flags to div width ([36dc56b](https://gitlab.com/pep10/pepsuite/commit/36dc56b43099e03fa1e982357a6d9989a6bcd3b4))


### Features

* **ui:** implement generic RegistersPane ([c4a0bf2](https://gitlab.com/pep10/pepsuite/commit/c4a0bf2e23566a047d7ac47b1dd14ca9d472c53a))
* **ui:** implement Unicode converter ([ccc4ca6](https://gitlab.com/pep10/pepsuite/commit/ccc4ca67c022b7fe7770286439285e7fcba275a2))
* **ui:** limit IntegralConverter width ([1bdb632](https://gitlab.com/pep10/pepsuite/commit/1bdb6325ac70221482c5a5f129990c88db855e80))
