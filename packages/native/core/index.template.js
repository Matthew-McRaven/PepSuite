// Import the default export (the module) and rename.
// Renaming is necessary because each emscripten module has its own `Module`.
import { default as _pep10 } from "./dist/pep10.js"
//import { default as _pep9 } from "./dist/pep9.js"
const pep10 = _pep10()
//const pep9 = _pep9()
export { pep10 }