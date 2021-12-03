# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## <small>1.0.5 (2021-12-03)</small>

* chore: Release 1.0.3 [skip ci] ([bc708e3](https://gitlab.com/pep10/pepsuite/commit/bc708e3))
* chore: Release 1.0.4 [skip ci] ([ddd22d4](https://gitlab.com/pep10/pepsuite/commit/ddd22d4))
* fix: unsafePerm due to container ownership issues ([bb1314b](https://gitlab.com/pep10/pepsuite/commit/bb1314b))
* fix(term): Rename main to avoid name clashes ([87286dd](https://gitlab.com/pep10/pepsuite/commit/87286dd))
* build: Disable nested tests ([567f0ed](https://gitlab.com/pep10/pepsuite/commit/567f0ed))
* build(3rd-party): Add include guard for 3rd-party libs ([87810a0](https://gitlab.com/pep10/pepsuite/commit/87810a0))
* build(3rd-party): Fix include guard for libs ([02bea48](https://gitlab.com/pep10/pepsuite/commit/02bea48))
* build(core): Add babel as dev dependency ([9d6a335](https://gitlab.com/pep10/pepsuite/commit/9d6a335))
* build(core): Don't rebuild core on publish ([6c84ed8](https://gitlab.com/pep10/pepsuite/commit/6c84ed8))
* build(core): Skip JUnit report for isa validation ([0e2cc58](https://gitlab.com/pep10/pepsuite/commit/0e2cc58))
* ci(core): Reliably generate dummy package.json ([a652e84](https://gitlab.com/pep10/pepsuite/commit/a652e84))
* ci(core): Upload JUnit reports from core ([fddc0ae](https://gitlab.com/pep10/pepsuite/commit/fddc0ae))
* feat(core): Wrap WASM code in NPM package ([8a60eca](https://gitlab.com/pep10/pepsuite/commit/8a60eca))





## <small>1.0.4 (2021-11-30)</small>

* Fix: unsafePerm due to container ownership issues ([87d4384](https://gitlab.com/pep10/pepsuite/commit/87d4384))





## <small>1.0.3 (2021-11-30)</small>

* Build: Add babel core dev dep. ([cf23c04](https://gitlab.com/pep10/pepsuite/commit/cf23c04))
* Build: Add include guard for 3rd-party libs ([a862854](https://gitlab.com/pep10/pepsuite/commit/a862854))
* Build: Copy compiled library files into core package ([4c921d0](https://gitlab.com/pep10/pepsuite/commit/4c921d0))
* Build: Disable nested tests ([bda1979](https://gitlab.com/pep10/pepsuite/commit/bda1979))
* Build: Don't rebuild core on publish (DEV-7) ([4ec0d57](https://gitlab.com/pep10/pepsuite/commit/4ec0d57))
* Build: Don't run core build on `lerna link` ([09e5ed8](https://gitlab.com/pep10/pepsuite/commit/09e5ed8))
* Build: Fix code coverage ([f98fa9d](https://gitlab.com/pep10/pepsuite/commit/f98fa9d))
* Build: Fix coverage globbing / ignore `sh` files ([5cb57e4](https://gitlab.com/pep10/pepsuite/commit/5cb57e4))
* Build: Fix include guard for 3rd-party libs ([6ed6d11](https://gitlab.com/pep10/pepsuite/commit/6ed6d11))
* Build: Fix lcov=>cobertura conversion. ([578a024](https://gitlab.com/pep10/pepsuite/commit/578a024))
* Build: Fix project links for core ([52b4ff2](https://gitlab.com/pep10/pepsuite/commit/52b4ff2))
* Build: Properly generate dummy package.json ([e24e60f](https://gitlab.com/pep10/pepsuite/commit/e24e60f))
* Build: Skip JUnit report for isa validation (DEV-5) ([23bc8a6](https://gitlab.com/pep10/pepsuite/commit/23bc8a6))
* Build: Upload JUnit reports from core (DEV-5) ([890c6d5](https://gitlab.com/pep10/pepsuite/commit/890c6d5))
* New: Add functions to bijectively map lines<=>addresses (BAC-232) ([f5ab15e](https://gitlab.com/pep10/pepsuite/commit/f5ab15e))
* New: Assign section indices, types, sizes to symbols in ELF images (BAC-121) ([110a927](https://gitlab.com/pep10/pepsuite/commit/110a927))
* New: Wrap WASM code in NPM package ([7fdff53](https://gitlab.com/pep10/pepsuite/commit/7fdff53))
* Docs: Fix broken docs generation ([be4e082](https://gitlab.com/pep10/pepsuite/commit/be4e082))
* Docs: Fix docs directory for lib/core ([7422d3f](https://gitlab.com/pep10/pepsuite/commit/7422d3f))
* Chore: Format core using clang-format and LLVM style guide ([7a945d4](https://gitlab.com/pep10/pepsuite/commit/7a945d4))
* Chore: Move dev container to `/docker/develop` ([2d4ff9c](https://gitlab.com/pep10/pepsuite/commit/2d4ff9c))
* Chore: Remove old pipeline files ([c61dc77](https://gitlab.com/pep10/pepsuite/commit/c61dc77))
* Chore: Unify development container configs ([7657673](https://gitlab.com/pep10/pepsuite/commit/7657673))
* Fix: Accommodate step() returning enum, not bool (BUGS-6) ([7fc1609](https://gitlab.com/pep10/pepsuite/commit/7fc1609))
* Fix: Broken format strings ([d4aaa32](https://gitlab.com/pep10/pepsuite/commit/d4aaa32))
* Fix: Constant symbols being reported as NOTYPE (BUGS-7) ([ef3b3dd](https://gitlab.com/pep10/pepsuite/commit/ef3b3dd))
* Fix: Misnamed member variable ([d0b6ced](https://gitlab.com/pep10/pepsuite/commit/d0b6ced))
* Fix: Properly add cereal as dependency ([ada53a0](https://gitlab.com/pep10/pepsuite/commit/ada53a0))
* Breaking: Migrate consumed libraries to `3rd-party` ([7d952e7](https://gitlab.com/pep10/pepsuite/commit/7d952e7))
* Update: Check that EQUATE symbols are non-empty ([598a179](https://gitlab.com/pep10/pepsuite/commit/598a179))
* Update: Clear delta on clearing Output device (BAC-185) ([bda1a34](https://gitlab.com/pep10/pepsuite/commit/bda1a34))
* Update: Stop returning raw ELFIO::elfio objects ([2653568](https://gitlab.com/pep10/pepsuite/commit/2653568))
* WIP: Fix broken coverage tests ([f138faa](https://gitlab.com/pep10/pepsuite/commit/f138faa))
