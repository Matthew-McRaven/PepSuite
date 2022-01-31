"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pep10 = void 0;

var _pep = _interopRequireDefault(require("./dist/pep10.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Import the default export (the module) and rename.
// Renaming is necessary because each emscripten module has its own `Module`.
//import { default as _pep9 } from "./dist/pep9.js"
const pep10 = (0, _pep.default)(); //const pep9 = _pep9()

exports.pep10 = pep10;
