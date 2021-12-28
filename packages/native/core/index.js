"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pep9 = exports.pep10 = void 0;

var _pep = _interopRequireDefault(require("./dist/pep10.js"));

var _pep2 = _interopRequireDefault(require("./dist/pep9.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import the default export (the module) and rename.
// Renaming is necessary because each emscripten module has its own `Module`.
const pep10 = (0, _pep.default)();
exports.pep10 = pep10;
const pep9 = (0, _pep2.default)();
exports.pep9 = pep9;
