const { spawn } = require('child_process');
const fs = require('fs');

const commands = [];
switch (process.platform) {
  case 'win32':
    process.exit(1);
    break;
  case 'darwin':
    process.exit(1);
    break;
  case 'linux':
    commands.push('source /emsdk/emsdk_env.sh');
    break;
  default: process.exit(1);
}

switch (process.argv[2]) {
  case 'docs':
    fs.mkdir('build/js', () => { });
    commands.push('(cd docs && doxygen)');
    commands.push('cd build/docs/');
    commands.push('npx moxygen xml');
    break;
  case 'wasm':
    fs.mkdir('build/js', () => { });
    commands.push('cd build/js');
    commands.push('emcmake cmake -DBoost_INCLUDE_DIR=/usr/local/include ../.. -DCMAKE_BUILD_TYPE=RelWithDebInfo -DENABLE_TESTING=1');
    commands.push('emmake make -j$(nproc)');
    commands.push('emmake make test -j$(nproc)');
    break;
  // Implies native!
  case 'coverage':
    fs.mkdir('build/coverage', () => { });
    commands.push('cd build/coverage');
    commands.push('cmake ../.. -DCMAKE_C_COMPILER=$(which clang) -DCMAKE_CXX_COMPILER=$(which clang++) -DCMAKE_BUILD_TYPE=Debug -Dcode_coverage=1 -DENABLE_TESTING=1');
    commands.push('make -j$(nproc)');
    commands.push('make test -j$(nproc)');
    commands.push('cd ../../');
    commands.push('python3 llvm-cov-helper.py build');
    commands.push('python3 lcov_cobertura.py coverage.lcov');
    commands.push('lcov --summary coverage.lcov');

    break;
  // Must check if we are dbg or release
  case 'native':
    fs.mkdir('build/native', () => { });
    commands.push('cd build/native');
    switch (process.argv[3]) {
      case 'debug':
        commands.push('cmake ../.. -DCMAKE_C_COMPILER=$(which clang) -DCMAKE_CXX_COMPILER=$(which clang++) -DCMAKE_BUILD_TYPE=Debug -Dcode_coverage=1 -DENABLE_TESTING=1');
        break;
      case 'release':
        commands.push('cmake ../.. -DCMAKE_C_COMPILER=$(which clang) -DCMAKE_CXX_COMPILER=$(which clang++) -DCMAKE_BUILD_TYPE=RelWithDebInfo -DENABLE_TESTING=1');
        break;
      default: process.exit(1);
    }
    commands.push('make -j$(nproc)');
    commands.push('make test -j$(nproc)');
    break;
  default: process.exit(1);
}

process.stdout.write(commands.join(' && '));

// Probably doesn't work on Windows, but I'll cross that bridge later
spawn(`bash -c "${commands.join(' && ')}"`, { shell: true, stdio: 'inherit' });
