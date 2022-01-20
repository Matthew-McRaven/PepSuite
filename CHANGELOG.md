# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.2.0 (2022-01-20)


### Bug Fixes

* **ui:** allow external updates to UnicodeConverter ([28d4f6a](https://github.com/eclipse-theia/theia-blueprint/commit/28d4f6a9ae74d92b37b71058561e1fe2f3774183))
* **ui:** display converters in horizontal row ([abc2873](https://github.com/eclipse-theia/theia-blueprint/commit/abc2873b108c72e6fddd06d897e76d91ce4b91bf))
* **ui:** fix bash dummy command in ui-core ([48a28ea](https://github.com/eclipse-theia/theia-blueprint/commit/48a28ea0211c205defa362ee318a70456ca9cc87))
* **ui:** fix broken export in help package ([c8f6a09](https://github.com/eclipse-theia/theia-blueprint/commit/c8f6a099c746f23b0eae3fd640edbd6747669b0a))
* **ui:** fix default case for parser ([6b20730](https://github.com/eclipse-theia/theia-blueprint/commit/6b207300ca8013706cb54ffd0625985904ab6da5)), closes [#296](https://github.com/eclipse-theia/theia-blueprint/issues/296)
* **ui:** fix ESLint complaints in ui-cpu ([695673f](https://github.com/eclipse-theia/theia-blueprint/commit/695673f246879c5ae065f961488c8d287f0a9790))
* **ui:** fix mispelled type ([fee6641](https://github.com/eclipse-theia/theia-blueprint/commit/fee6641b3205c1d55a7651d037a6c0712b78a4ed))
* **ui:** fix mispelled typename ([cea459f](https://github.com/eclipse-theia/theia-blueprint/commit/cea459f6f41776afb0a264a31caca44062316486))
* **ui:** fix ui/help package name ([e48235a](https://github.com/eclipse-theia/theia-blueprint/commit/e48235a51de2a9014b6ecf035db01bc95538f10b))
* **ui:** inject TextEncoder into globals for testing ([a60c5a6](https://github.com/eclipse-theia/theia-blueprint/commit/a60c5a6297dbf9bb1d32c4185b0230ded0761243))
* **ui:** re-export AsciiMapConverter ([83a11a6](https://github.com/eclipse-theia/theia-blueprint/commit/83a11a65660bcf422beb00aa959f29e12c71fc0a))
* **ui:** respect isReadOnly in UnicodeConverter ([bac34c0](https://github.com/eclipse-theia/theia-blueprint/commit/bac34c0843d79400664a7637b606150c8441ff3e))
* **ui:** scale RegistersPane's flags to div width ([36dc56b](https://github.com/eclipse-theia/theia-blueprint/commit/36dc56b43099e03fa1e982357a6d9989a6bcd3b4))


* build!: remove `prepare` lifecycle script ([9aea3d9](https://github.com/eclipse-theia/theia-blueprint/commit/9aea3d90ddb5154c78e56cfc6e11e977a7fd18f3))


### Features

* **ui:** add placeholder for ConveterContainer ([b817a17](https://github.com/eclipse-theia/theia-blueprint/commit/b817a176a3240cb7ae82dcd993c201f8b1c31944))
* **ui:** add stubs for Integral, Map converters ([6b3d8bc](https://github.com/eclipse-theia/theia-blueprint/commit/6b3d8bc076b8e29046486c55770cc0ffaf068194))
* **ui:** implement AsciiMapConverter ([98e1030](https://github.com/eclipse-theia/theia-blueprint/commit/98e10305fb982fbcc849288a4dfc2245bd7c48fd))
* **ui:** implement container of converters ([104ad3e](https://github.com/eclipse-theia/theia-blueprint/commit/104ad3e089886fb37dcae4b9a1cc470aa5677fe5))
* **ui:** implement generic RegistersPane ([c4a0bf2](https://github.com/eclipse-theia/theia-blueprint/commit/c4a0bf2e23566a047d7ac47b1dd14ca9d472c53a))
* **ui:** implement integral byte converter ([eb3f811](https://github.com/eclipse-theia/theia-blueprint/commit/eb3f811004a3253d8be333eac2280ac2d1916966))
* **ui:** implement MapConverter ([97ecc79](https://github.com/eclipse-theia/theia-blueprint/commit/97ecc79790c043d38005b813fa74c6b7a268b270))
* **ui:** implement Unicode converter ([ccc4ca6](https://github.com/eclipse-theia/theia-blueprint/commit/ccc4ca67c022b7fe7770286439285e7fcba275a2))
* **ui:** limit IntegralConverter width ([1bdb632](https://github.com/eclipse-theia/theia-blueprint/commit/1bdb6325ac70221482c5a5f129990c88db855e80))


### BREAKING CHANGES

* To build js packages, must now `yarn clean && yarn build`.
Must explicitly rebuild after package change, as packages are no longer rebuilt on `add`.
