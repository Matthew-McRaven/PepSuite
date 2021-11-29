// Import the default export (the module) and rename.
// Renaming is necessary because each emscripten module has its own `Module`.
import { default as _pep10 } from "./dist/pep10.js"
const pep10 = _pep10()

export default pep10