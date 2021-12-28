var spawn = require('child_process').spawn;
var os = require('os');

// Run command depending on the OS
if (os.type() === 'Linux') spawn('/bin/bash', ['./build-linux-rel.sh'], { stdio: 'inherit' });
else if (os.type() === 'Darwin') spawn('exit', ['1'], { stdio: 'inherit' });
else if (os.type() === 'Windows_NT') spawn('exit', ['1'], { stdio: 'inherit' });
else throw new Error("Unsupported OS found: " + os.type());
