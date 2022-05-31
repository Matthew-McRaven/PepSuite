# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.4.0](https://github.com/eclipse-theia/theia-blueprint/compare/v0.2.1...v0.4.0) (2022-05-27)

**Note:** Version bump only for package @pep10/ext-start-page





# [0.3.0](https://github.com/eclipse-theia/theia-blueprint/compare/v0.2.1...v0.3.0) (2022-05-14)

**Note:** Version bump only for package @pep10/ext-start-page





## [0.2.1](https://github.com/eclipse-theia/theia-blueprint/compare/v0.2.0...v0.2.1) (2022-01-20)

**Note:** Version bump only for package @pep10/start-page





# 0.2.0 (2022-01-20)


* build!: remove `prepare` lifecycle script ([9aea3d9](https://github.com/eclipse-theia/theia-blueprint/commit/9aea3d90ddb5154c78e56cfc6e11e977a7fd18f3))


### BREAKING CHANGES

* To build js packages, must now `yarn clean && yarn build`.
Must explicitly rebuild after package change, as packages are no longer rebuilt on `add`.
