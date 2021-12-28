const fs = require("fs")
const exit_code = fs.existsSync("build/packages/core") ? 0 : 1;
process.exit(exit_code)