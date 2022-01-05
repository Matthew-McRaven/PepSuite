var Module = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;

  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return function (Module) {
    Module = Module || {}; // The Module object: Our interface to the outside world. We import
    // and export values on it. There are various ways Module can be used:
    // 1. Not defined. We create it here
    // 2. A function parameter, function(Module) { ..generated code.. }
    // 3. pre-run appended it, var Module = {}; ..generated code..
    // 4. External script tag defines var Module.
    // We need to check if Module already exists (e.g. case 3 above).
    // Substitution will be replaced with actual code on later stage of the build,
    // this way Closure Compiler will not mangle it (e.g. case 4. above).
    // Note that if you want to run closure, and also to use Module
    // after the generated code, you will need to define   var Module = {};
    // before the code. Then that object will be used in the code, and you
    // can continue to use Module afterwards as well.

    var Module = typeof Module !== 'undefined' ? Module : {}; // See https://caniuse.com/mdn-javascript_builtins_object_assign

    var objAssign = Object.assign; // Set up the promise that indicates the Module is initialized

    var readyPromiseResolve, readyPromiseReject;
    Module['ready'] = new Promise(function (resolve, reject) {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    }); // --pre-jses are emitted after the Module integration code, so that they can
    // refer to Module (if they choose; they can also define Module)
    // {{PRE_JSES}}
    // Sometimes an existing Module object exists with properties
    // meant to overwrite the default module functionality. Here
    // we collect those properties and reapply _after_ we configure
    // the current environment's defaults to avoid having to be so
    // defensive during initialization.

    var moduleOverrides = objAssign({}, Module);
    var arguments_ = [];
    var thisProgram = './this.program';

    var quit_ = (status, toThrow) => {
      throw toThrow;
    }; // Determine the runtime environment we are in. You can customize this by
    // setting the ENVIRONMENT setting at compile time (see settings.js).
    // Attempt to auto-detect the environment


    var ENVIRONMENT_IS_WEB = typeof window === 'object';
    var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function'; // N.b. Electron.js environment is simultaneously a NODE-environment, but
    // also a web environment.

    var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string';
    var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER; // `/` should be present at the end if `scriptDirectory` is not empty

    var scriptDirectory = '';

    function locateFile(path) {
      if (Module['locateFile']) {
        return Module['locateFile'](path, scriptDirectory);
      }

      return scriptDirectory + path;
    } // Hooks that are implemented differently in different runtime environments.


    var read_, readAsync, readBinary, setWindowTitle; // Normally we don't log exceptions but instead let them bubble out the top
    // level where the embedding environment (e.g. the browser) can handle
    // them.
    // However under v8 and node we sometimes exit the process direcly in which case
    // its up to use us to log the exception before exiting.
    // If we fix https://github.com/emscripten-core/emscripten/issues/15080
    // this may no longer be needed under node.

    function logExceptionOnExit(e) {
      if (e instanceof ExitStatus) return;
      let toLog = e;
      err('exiting due to exception: ' + toLog);
    }

    var fs;
    var nodePath;
    var requireNodeFS;

    if (ENVIRONMENT_IS_NODE) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = require('path').dirname(scriptDirectory) + '/';
      } else {
        scriptDirectory = __dirname + '/';
      } // include: node_shell_read.js


      requireNodeFS = function () {
        // Use nodePath as the indicator for these not being initialized,
        // since in some environments a global fs may have already been
        // created.
        if (!nodePath) {
          fs = require('fs');
          nodePath = require('path');
        }
      };

      read_ = function shell_read(filename, binary) {
        requireNodeFS();
        filename = nodePath['normalize'](filename);
        return fs.readFileSync(filename, binary ? null : 'utf8');
      };

      readBinary = function readBinary(filename) {
        var ret = read_(filename, true);

        if (!ret.buffer) {
          ret = new Uint8Array(ret);
        }

        return ret;
      };

      readAsync = function readAsync(filename, onload, onerror) {
        requireNodeFS();
        filename = nodePath['normalize'](filename);
        fs.readFile(filename, function (err, data) {
          if (err) onerror(err);else onload(data.buffer);
        });
      }; // end include: node_shell_read.js


      if (process['argv'].length > 1) {
        thisProgram = process['argv'][1].replace(/\\/g, '/');
      }

      arguments_ = process['argv'].slice(2); // MODULARIZE will export the module in the proper place outside, we don't need to export here

      process['on']('uncaughtException', function (ex) {
        // suppress ExitStatus exceptions from showing an error
        if (!(ex instanceof ExitStatus)) {
          throw ex;
        }
      }); // Without this older versions of node (< v15) will log unhandled rejections
      // but return 0, which is not normally the desired behaviour.  This is
      // not be needed with node v15 and about because it is now the default
      // behaviour:
      // See https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode

      process['on']('unhandledRejection', function (reason) {
        throw reason;
      });

      quit_ = (status, toThrow) => {
        if (keepRuntimeAlive()) {
          process['exitCode'] = status;
          throw toThrow;
        }

        logExceptionOnExit(toThrow);
        process['exit'](status);
      };

      Module['inspect'] = function () {
        return '[Emscripten Module object]';
      };
    } else // Note that this includes Node.js workers when relevant (pthreads is enabled).
      // Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
      // ENVIRONMENT_IS_NODE.
      if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WORKER) {
          // Check worker, not web, since window could be polyfilled
          scriptDirectory = self.location.href;
        } else if (typeof document !== 'undefined' && document.currentScript) {
          // web
          scriptDirectory = document.currentScript.src;
        } // When MODULARIZE, this JS may be executed later, after document.currentScript
        // is gone, so we saved it, and we use it here instead of any other info.


        if (_scriptDir) {
          scriptDirectory = _scriptDir;
        } // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
        // otherwise, slice off the final part of the url to find the script directory.
        // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
        // and scriptDirectory will correctly be replaced with an empty string.
        // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
        // they are removed because they could contain a slash.


        if (scriptDirectory.indexOf('blob:') !== 0) {
          scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf('/') + 1);
        } else {
          scriptDirectory = '';
        } // Differentiate the Web Worker from the Node Worker case, as reading must
        // be done differently.


        {
          // include: web_or_worker_shell_read.js
          read_ = function (url) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send(null);
            return xhr.responseText;
          };

          if (ENVIRONMENT_IS_WORKER) {
            readBinary = function (url) {
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, false);
              xhr.responseType = 'arraybuffer';
              xhr.send(null);
              return new Uint8Array(
              /** @type{!ArrayBuffer} */
              xhr.response);
            };
          }

          readAsync = function (url, onload, onerror) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';

            xhr.onload = function () {
              if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                // file URLs can return 0
                onload(xhr.response);
                return;
              }

              onerror();
            };

            xhr.onerror = onerror;
            xhr.send(null);
          }; // end include: web_or_worker_shell_read.js

        }

        setWindowTitle = title => document.title = title;
      } else {}

    var out = Module['print'] || console.log.bind(console);
    var err = Module['printErr'] || console.warn.bind(console); // Merge back in the overrides

    objAssign(Module, moduleOverrides); // Free the object hierarchy contained in the overrides, this lets the GC
    // reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.

    moduleOverrides = null; // Emit code to handle expected values on the Module object. This applies Module.x
    // to the proper local x. This has two benefits: first, we only emit it if it is
    // expected to arrive, and second, by using a local everywhere else that can be
    // minified.

    if (Module['arguments']) arguments_ = Module['arguments'];
    if (Module['thisProgram']) thisProgram = Module['thisProgram'];
    if (Module['quit']) quit_ = Module['quit']; // perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message

    var STACK_ALIGN = 16;
    var POINTER_SIZE = 4;

    function getNativeTypeSize(type) {
      switch (type) {
        case 'i1':
        case 'i8':
          return 1;

        case 'i16':
          return 2;

        case 'i32':
          return 4;

        case 'i64':
          return 8;

        case 'float':
          return 4;

        case 'double':
          return 8;

        default:
          {
            if (type[type.length - 1] === '*') {
              return POINTER_SIZE;
            } else if (type[0] === 'i') {
              var bits = Number(type.substr(1));
              assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type);
              return bits / 8;
            } else {
              return 0;
            }
          }
      }
    }

    function warnOnce(text) {
      if (!warnOnce.shown) warnOnce.shown = {};

      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        err(text);
      }
    } // include: runtime_functions.js
    // Wraps a JS function as a wasm function with a given signature.


    function convertJsFunctionToWasm(func, sig) {
      // If the type reflection proposal is available, use the new
      // "WebAssembly.Function" constructor.
      // Otherwise, construct a minimal wasm module importing the JS function and
      // re-exporting it.
      if (typeof WebAssembly.Function === "function") {
        var typeNames = {
          'i': 'i32',
          'j': 'i64',
          'f': 'f32',
          'd': 'f64'
        };
        var type = {
          parameters: [],
          results: sig[0] == 'v' ? [] : [typeNames[sig[0]]]
        };

        for (var i = 1; i < sig.length; ++i) {
          type.parameters.push(typeNames[sig[i]]);
        }

        return new WebAssembly.Function(type, func);
      } // The module is static, with the exception of the type section, which is
      // generated based on the signature passed in.


      var typeSection = [0x01, // id: section,
      0x00, // length: 0 (placeholder)
      0x01, // count: 1
      0x60 // form: func
      ];
      var sigRet = sig.slice(0, 1);
      var sigParam = sig.slice(1);
      var typeCodes = {
        'i': 0x7f,
        // i32
        'j': 0x7e,
        // i64
        'f': 0x7d,
        // f32
        'd': 0x7c // f64

      }; // Parameters, length + signatures

      typeSection.push(sigParam.length);

      for (var i = 0; i < sigParam.length; ++i) {
        typeSection.push(typeCodes[sigParam[i]]);
      } // Return values, length + signatures
      // With no multi-return in MVP, either 0 (void) or 1 (anything else)


      if (sigRet == 'v') {
        typeSection.push(0x00);
      } else {
        typeSection = typeSection.concat([0x01, typeCodes[sigRet]]);
      } // Write the overall length of the type section back into the section header
      // (excepting the 2 bytes for the section id and length)


      typeSection[1] = typeSection.length - 2; // Rest of the module is static

      var bytes = new Uint8Array([0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
      0x01, 0x00, 0x00, 0x00 // version: 1
      ].concat(typeSection, [0x02, 0x07, // import section
      // (import "e" "f" (func 0 (type 0)))
      0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00, 0x07, 0x05, // export section
      // (export "f" (func 0 (type 0)))
      0x01, 0x01, 0x66, 0x00, 0x00])); // We can compile this wasm module synchronously because it is very small.
      // This accepts an import (at "e.f"), that it reroutes to an export (at "f")

      var module = new WebAssembly.Module(bytes);
      var instance = new WebAssembly.Instance(module, {
        'e': {
          'f': func
        }
      });
      var wrappedFunc = instance.exports['f'];
      return wrappedFunc;
    }

    var freeTableIndexes = []; // Weak map of functions in the table to their indexes, created on first use.

    var functionsInTableMap;

    function getEmptyTableSlot() {
      // Reuse a free index if there is one, otherwise grow.
      if (freeTableIndexes.length) {
        return freeTableIndexes.pop();
      } // Grow the table


      try {
        wasmTable.grow(1);
      } catch (err) {
        if (!(err instanceof RangeError)) {
          throw err;
        }

        throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.';
      }

      return wasmTable.length - 1;
    }

    function updateTableMap(offset, count) {
      for (var i = offset; i < offset + count; i++) {
        var item = getWasmTableEntry(i); // Ignore null values.

        if (item) {
          functionsInTableMap.set(item, i);
        }
      }
    } // Add a function to the table.
    // 'sig' parameter is required if the function being added is a JS function.


    function addFunction(func, sig) {
      // Check if the function is already in the table, to ensure each function
      // gets a unique index. First, create the map if this is the first use.
      if (!functionsInTableMap) {
        functionsInTableMap = new WeakMap();
        updateTableMap(0, wasmTable.length);
      }

      if (functionsInTableMap.has(func)) {
        return functionsInTableMap.get(func);
      } // It's not in the table, add it now.


      var ret = getEmptyTableSlot(); // Set the new value.

      try {
        // Attempting to call this with JS function will cause of table.set() to fail
        setWasmTableEntry(ret, func);
      } catch (err) {
        if (!(err instanceof TypeError)) {
          throw err;
        }

        var wrapped = convertJsFunctionToWasm(func, sig);
        setWasmTableEntry(ret, wrapped);
      }

      functionsInTableMap.set(func, ret);
      return ret;
    }

    function removeFunction(index) {
      functionsInTableMap.delete(getWasmTableEntry(index));
      freeTableIndexes.push(index);
    } // end include: runtime_functions.js
    // include: runtime_debug.js
    // end include: runtime_debug.js


    var tempRet0 = 0;

    var setTempRet0 = function (value) {
      tempRet0 = value;
    };

    var getTempRet0 = function () {
      return tempRet0;
    }; // === Preamble library stuff ===
    // Documentation for the public APIs defined in this file must be updated in:
    //    site/source/docs/api_reference/preamble.js.rst
    // A prebuilt local version of the documentation is available at:
    //    site/build/text/docs/api_reference/preamble.js.txt
    // You can also build docs locally as HTML or other formats in site/
    // An online HTML version (which may be of a different version of Emscripten)
    //    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html


    var wasmBinary;
    if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];
    var noExitRuntime = Module['noExitRuntime'] || true;

    if (typeof WebAssembly !== 'object') {
      abort('no native wasm support detected');
    } // include: runtime_safe_heap.js
    // In MINIMAL_RUNTIME, setValue() and getValue() are only available when building with safe heap enabled, for heap safety checking.
    // In traditional runtime, setValue() and getValue() are always available (although their use is highly discouraged due to perf penalties)

    /** @param {number} ptr
        @param {number} value
        @param {string} type
        @param {number|boolean=} noSafe */


    function setValue(ptr, value, type, noSafe) {
      type = type || 'i8';
      if (type.charAt(type.length - 1) === '*') type = 'i32';

      switch (type) {
        case 'i1':
          HEAP8[ptr >> 0] = value;
          break;

        case 'i8':
          HEAP8[ptr >> 0] = value;
          break;

        case 'i16':
          HEAP16[ptr >> 1] = value;
          break;

        case 'i32':
          HEAP32[ptr >> 2] = value;
          break;

        case 'i64':
          tempI64 = [value >>> 0, (tempDouble = value, +Math.abs(tempDouble) >= 1.0 ? tempDouble > 0.0 ? (Math.min(+Math.floor(tempDouble / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Math.ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296.0) >>> 0 : 0)], HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];
          break;

        case 'float':
          HEAPF32[ptr >> 2] = value;
          break;

        case 'double':
          HEAPF64[ptr >> 3] = value;
          break;

        default:
          abort('invalid type for setValue: ' + type);
      }
    }
    /** @param {number} ptr
        @param {string} type
        @param {number|boolean=} noSafe */


    function getValue(ptr, type, noSafe) {
      type = type || 'i8';
      if (type.charAt(type.length - 1) === '*') type = 'i32';

      switch (type) {
        case 'i1':
          return HEAP8[ptr >> 0];

        case 'i8':
          return HEAP8[ptr >> 0];

        case 'i16':
          return HEAP16[ptr >> 1];

        case 'i32':
          return HEAP32[ptr >> 2];

        case 'i64':
          return HEAP32[ptr >> 2];

        case 'float':
          return HEAPF32[ptr >> 2];

        case 'double':
          return Number(HEAPF64[ptr >> 3]);

        default:
          abort('invalid type for getValue: ' + type);
      }

      return null;
    } // end include: runtime_safe_heap.js
    // Wasm globals


    var wasmMemory; //========================================
    // Runtime essentials
    //========================================
    // whether we are quitting the application. no code should run after this.
    // set in exit() and abort()

    var ABORT = false; // set by exit() and abort().  Passed to 'onExit' handler.
    // NOTE: This is also used as the process return code code in shell environments
    // but only when noExitRuntime is false.

    var EXITSTATUS;
    /** @type {function(*, string=)} */

    function assert(condition, text) {
      if (!condition) {
        // This build was created without ASSERTIONS defined.  `assert()` should not
        // ever be called in this configuration but in case there are callers in
        // the wild leave this simple abort() implemenation here for now.
        abort(text);
      }
    } // Returns the C function with a specified identifier (for C++, you need to do manual name mangling)


    function getCFunc(ident) {
      var func = Module['_' + ident]; // closure exported function

      return func;
    } // C calling interface.

    /** @param {string|null=} returnType
        @param {Array=} argTypes
        @param {Arguments|Array=} args
        @param {Object=} opts */


    function ccall(ident, returnType, argTypes, args, opts) {
      // For fast lookup of conversion functions
      var toC = {
        'string': function (str) {
          var ret = 0;

          if (str !== null && str !== undefined && str !== 0) {
            // null string
            // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
            var len = (str.length << 2) + 1;
            ret = stackAlloc(len);
            stringToUTF8(str, ret, len);
          }

          return ret;
        },
        'array': function (arr) {
          var ret = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret);
          return ret;
        }
      };

      function convertReturnValue(ret) {
        if (returnType === 'string') return UTF8ToString(ret);
        if (returnType === 'boolean') return Boolean(ret);
        return ret;
      }

      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;

      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];

          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }

      var ret = func.apply(null, cArgs);

      function onDone(ret) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
      }

      ret = onDone(ret);
      return ret;
    }
    /** @param {string=} returnType
        @param {Array=} argTypes
        @param {Object=} opts */


    function cwrap(ident, returnType, argTypes, opts) {
      argTypes = argTypes || []; // When the function takes numbers and returns a number, we can just return
      // the original function

      var numericArgs = argTypes.every(function (type) {
        return type === 'number';
      });
      var numericRet = returnType !== 'string';

      if (numericRet && numericArgs && !opts) {
        return getCFunc(ident);
      }

      return function () {
        return ccall(ident, returnType, argTypes, arguments, opts);
      };
    }

    var ALLOC_NORMAL = 0; // Tries to use _malloc()

    var ALLOC_STACK = 1; // Lives for the duration of the current function call
    // allocate(): This is for internal use. You can use it yourself as well, but the interface
    //             is a little tricky (see docs right below). The reason is that it is optimized
    //             for multiple syntaxes to save space in generated code. So you should
    //             normally not use allocate(), and instead allocate memory using _malloc(),
    //             initialize it with setValue(), and so forth.
    // @slab: An array of data.
    // @allocator: How to allocate memory, see ALLOC_*

    /** @type {function((Uint8Array|Array<number>), number)} */

    function allocate(slab, allocator) {
      var ret;

      if (allocator == ALLOC_STACK) {
        ret = stackAlloc(slab.length);
      } else {
        ret = _malloc(slab.length);
      }

      if (slab.subarray || slab.slice) {
        HEAPU8.set(
        /** @type {!Uint8Array} */
        slab, ret);
      } else {
        HEAPU8.set(new Uint8Array(slab), ret);
      }

      return ret;
    } // include: runtime_strings.js
    // runtime_strings.js: Strings related runtime functions that are part of both MINIMAL_RUNTIME and regular runtime.
    // Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
    // a copy of that string as a Javascript String object.


    var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;
    /**
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */

    function UTF8ArrayToString(heap, idx, maxBytesToRead) {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx; // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
      // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)

      while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;

      if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
        return UTF8Decoder.decode(heap.subarray(idx, endPtr));
      } else {
        var str = ''; // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that

        while (idx < endPtr) {
          // For UTF8 byte structure, see:
          // http://en.wikipedia.org/wiki/UTF-8#Description
          // https://www.ietf.org/rfc/rfc2279.txt
          // https://tools.ietf.org/html/rfc3629
          var u0 = heap[idx++];

          if (!(u0 & 0x80)) {
            str += String.fromCharCode(u0);
            continue;
          }

          var u1 = heap[idx++] & 63;

          if ((u0 & 0xE0) == 0xC0) {
            str += String.fromCharCode((u0 & 31) << 6 | u1);
            continue;
          }

          var u2 = heap[idx++] & 63;

          if ((u0 & 0xF0) == 0xE0) {
            u0 = (u0 & 15) << 12 | u1 << 6 | u2;
          } else {
            u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heap[idx++] & 63;
          }

          if (u0 < 0x10000) {
            str += String.fromCharCode(u0);
          } else {
            var ch = u0 - 0x10000;
            str += String.fromCharCode(0xD800 | ch >> 10, 0xDC00 | ch & 0x3FF);
          }
        }
      }

      return str;
    } // Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
    // copy of that string as a Javascript String object.
    // maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
    //                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
    //                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
    //                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
    //                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
    //                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
    //                 throw JS JIT optimizations off, so it is worth to consider consistently using one
    //                 style or the other.

    /**
     * @param {number} ptr
     * @param {number=} maxBytesToRead
     * @return {string}
     */


    function UTF8ToString(ptr, maxBytesToRead) {
      ;
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    } // Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
    // encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
    // Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
    // Parameters:
    //   str: the Javascript string to copy.
    //   heap: the array to copy to. Each index in this array is assumed to be one 8-byte element.
    //   outIdx: The starting offset in the array to begin the copying.
    //   maxBytesToWrite: The maximum number of bytes this function can write to the array.
    //                    This count should include the null terminator,
    //                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
    //                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
    // Returns the number of bytes written, EXCLUDING the null terminator.


    function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
        return 0;
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.

      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate

        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | u1 & 0x3FF;
        }

        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | u >> 6;
          heap[outIdx++] = 0x80 | u & 63;
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | u >> 12;
          heap[outIdx++] = 0x80 | u >> 6 & 63;
          heap[outIdx++] = 0x80 | u & 63;
        } else {
          if (outIdx + 3 >= endIdx) break;
          heap[outIdx++] = 0xF0 | u >> 18;
          heap[outIdx++] = 0x80 | u >> 12 & 63;
          heap[outIdx++] = 0x80 | u >> 6 & 63;
          heap[outIdx++] = 0x80 | u & 63;
        }
      } // Null-terminate the pointer to the buffer.


      heap[outIdx] = 0;
      return outIdx - startIdx;
    } // Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
    // null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
    // Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
    // Returns the number of bytes written, EXCLUDING the null terminator.


    function stringToUTF8(str, outPtr, maxBytesToWrite) {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    } // Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.


    function lengthBytesUTF8(str) {
      var len = 0;

      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var u = str.charCodeAt(i); // possibly a lead surrogate

        if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | str.charCodeAt(++i) & 0x3FF;
        if (u <= 0x7F) ++len;else if (u <= 0x7FF) len += 2;else if (u <= 0xFFFF) len += 3;else len += 4;
      }

      return len;
    } // end include: runtime_strings.js
    // include: runtime_strings_extra.js
    // runtime_strings_extra.js: Strings related runtime functions that are available only in regular runtime.
    // Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
    // a copy of that string as a Javascript String object.


    function AsciiToString(ptr) {
      var str = '';

      while (1) {
        var ch = HEAPU8[ptr++ >> 0];
        if (!ch) return str;
        str += String.fromCharCode(ch);
      }
    } // Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
    // null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.


    function stringToAscii(str, outPtr) {
      return writeAsciiToMemory(str, outPtr, false);
    } // Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
    // a copy of that string as a Javascript String object.


    var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;

    function UTF16ToString(ptr, maxBytesToRead) {
      var endPtr = ptr; // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
      // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.

      var idx = endPtr >> 1;
      var maxIdx = idx + maxBytesToRead / 2; // If maxBytesToRead is not passed explicitly, it will be undefined, and this
      // will always evaluate to true. This saves on code size.

      while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;

      endPtr = idx << 1;

      if (endPtr - ptr > 32 && UTF16Decoder) {
        return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
      } else {
        var str = ''; // If maxBytesToRead is not passed explicitly, it will be undefined, and the for-loop's condition
        // will always evaluate to true. The loop is then terminated on the first null char.

        for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
          var codeUnit = HEAP16[ptr + i * 2 >> 1];
          if (codeUnit == 0) break; // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.

          str += String.fromCharCode(codeUnit);
        }

        return str;
      }
    } // Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
    // null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
    // Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
    // Parameters:
    //   str: the Javascript string to copy.
    //   outPtr: Byte address in Emscripten HEAP where to write the string to.
    //   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
    //                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
    //                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
    // Returns the number of bytes written, EXCLUDING the null terminator.


    function stringToUTF16(str, outPtr, maxBytesToWrite) {
      // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
      if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 0x7FFFFFFF;
      }

      if (maxBytesToWrite < 2) return 0;
      maxBytesToWrite -= 2; // Null terminator.

      var startPtr = outPtr;
      var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;

      for (var i = 0; i < numCharsToWrite; ++i) {
        // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
        var codeUnit = str.charCodeAt(i); // possibly a lead surrogate

        HEAP16[outPtr >> 1] = codeUnit;
        outPtr += 2;
      } // Null-terminate the pointer to the HEAP.


      HEAP16[outPtr >> 1] = 0;
      return outPtr - startPtr;
    } // Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.


    function lengthBytesUTF16(str) {
      return str.length * 2;
    }

    function UTF32ToString(ptr, maxBytesToRead) {
      var i = 0;
      var str = ''; // If maxBytesToRead is not passed explicitly, it will be undefined, and this
      // will always evaluate to true. This saves on code size.

      while (!(i >= maxBytesToRead / 4)) {
        var utf32 = HEAP32[ptr + i * 4 >> 2];
        if (utf32 == 0) break;
        ++i; // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
        // See http://unicode.org/faq/utf_bom.html#utf16-3

        if (utf32 >= 0x10000) {
          var ch = utf32 - 0x10000;
          str += String.fromCharCode(0xD800 | ch >> 10, 0xDC00 | ch & 0x3FF);
        } else {
          str += String.fromCharCode(utf32);
        }
      }

      return str;
    } // Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
    // null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
    // Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
    // Parameters:
    //   str: the Javascript string to copy.
    //   outPtr: Byte address in Emscripten HEAP where to write the string to.
    //   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
    //                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
    //                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
    // Returns the number of bytes written, EXCLUDING the null terminator.


    function stringToUTF32(str, outPtr, maxBytesToWrite) {
      // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
      if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 0x7FFFFFFF;
      }

      if (maxBytesToWrite < 4) return 0;
      var startPtr = outPtr;
      var endPtr = startPtr + maxBytesToWrite - 4;

      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var codeUnit = str.charCodeAt(i); // possibly a lead surrogate

        if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
          var trailSurrogate = str.charCodeAt(++i);
          codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | trailSurrogate & 0x3FF;
        }

        HEAP32[outPtr >> 2] = codeUnit;
        outPtr += 4;
        if (outPtr + 4 > endPtr) break;
      } // Null-terminate the pointer to the HEAP.


      HEAP32[outPtr >> 2] = 0;
      return outPtr - startPtr;
    } // Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.


    function lengthBytesUTF32(str) {
      var len = 0;

      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.

        len += 4;
      }

      return len;
    } // Allocate heap space for a JS string, and write it there.
    // It is the responsibility of the caller to free() that memory.


    function allocateUTF8(str) {
      var size = lengthBytesUTF8(str) + 1;

      var ret = _malloc(size);

      if (ret) stringToUTF8Array(str, HEAP8, ret, size);
      return ret;
    } // Allocate stack space for a JS string, and write it there.


    function allocateUTF8OnStack(str) {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8Array(str, HEAP8, ret, size);
      return ret;
    } // Deprecated: This function should not be called because it is unsafe and does not provide
    // a maximum length limit of how many bytes it is allowed to write. Prefer calling the
    // function stringToUTF8Array() instead, which takes in a maximum length that can be used
    // to be secure from out of bounds writes.

    /** @deprecated
        @param {boolean=} dontAddNull */


    function writeStringToMemory(string, buffer, dontAddNull) {
      warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');
      var
      /** @type {number} */
      lastChar,
      /** @type {number} */
      end;

      if (dontAddNull) {
        // stringToUTF8Array always appends null. If we don't want to do that, remember the
        // character that existed at the location where the null will be placed, and restore
        // that after the write (below).
        end = buffer + lengthBytesUTF8(string);
        lastChar = HEAP8[end];
      }

      stringToUTF8(string, buffer, Infinity);
      if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
    }

    function writeArrayToMemory(array, buffer) {
      HEAP8.set(array, buffer);
    }
    /** @param {boolean=} dontAddNull */


    function writeAsciiToMemory(str, buffer, dontAddNull) {
      for (var i = 0; i < str.length; ++i) {
        HEAP8[buffer++ >> 0] = str.charCodeAt(i);
      } // Null-terminate the pointer to the HEAP.


      if (!dontAddNull) HEAP8[buffer >> 0] = 0;
    } // end include: runtime_strings_extra.js
    // Memory management


    function alignUp(x, multiple) {
      if (x % multiple > 0) {
        x += multiple - x % multiple;
      }

      return x;
    }

    var HEAP,
    /** @type {ArrayBuffer} */
    buffer,
    /** @type {Int8Array} */
    HEAP8,
    /** @type {Uint8Array} */
    HEAPU8,
    /** @type {Int16Array} */
    HEAP16,
    /** @type {Uint16Array} */
    HEAPU16,
    /** @type {Int32Array} */
    HEAP32,
    /** @type {Uint32Array} */
    HEAPU32,
    /** @type {Float32Array} */
    HEAPF32,
    /** @type {Float64Array} */
    HEAPF64;

    function updateGlobalBufferAndViews(buf) {
      buffer = buf;
      Module['HEAP8'] = HEAP8 = new Int8Array(buf);
      Module['HEAP16'] = HEAP16 = new Int16Array(buf);
      Module['HEAP32'] = HEAP32 = new Int32Array(buf);
      Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf);
      Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf);
      Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf);
      Module['HEAPF32'] = HEAPF32 = new Float32Array(buf);
      Module['HEAPF64'] = HEAPF64 = new Float64Array(buf);
    }

    var TOTAL_STACK = 5242880;
    var INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 16777216; // include: runtime_init_table.js
    // In regular non-RELOCATABLE mode the table is exported
    // from the wasm module and this will be assigned once
    // the exports are available.

    var wasmTable; // end include: runtime_init_table.js
    // include: runtime_stack_check.js
    // end include: runtime_stack_check.js
    // include: runtime_assertions.js
    // end include: runtime_assertions.js

    var __ATPRERUN__ = []; // functions called before the runtime is initialized

    var __ATINIT__ = []; // functions called during startup

    var __ATEXIT__ = []; // functions called during shutdown

    var __ATPOSTRUN__ = []; // functions called after the main() is called

    var runtimeInitialized = false;
    var runtimeExited = false;
    var runtimeKeepaliveCounter = 0;

    function keepRuntimeAlive() {
      return noExitRuntime || runtimeKeepaliveCounter > 0;
    }

    function preRun() {
      if (Module['preRun']) {
        if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];

        while (Module['preRun'].length) {
          addOnPreRun(Module['preRun'].shift());
        }
      }

      callRuntimeCallbacks(__ATPRERUN__);
    }

    function initRuntime() {
      runtimeInitialized = true;
      callRuntimeCallbacks(__ATINIT__);
    }

    function exitRuntime() {
      runtimeExited = true;
    }

    function postRun() {
      if (Module['postRun']) {
        if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];

        while (Module['postRun'].length) {
          addOnPostRun(Module['postRun'].shift());
        }
      }

      callRuntimeCallbacks(__ATPOSTRUN__);
    }

    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }

    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }

    function addOnExit(cb) {}

    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    } // include: runtime_math.js
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
    // end include: runtime_math.js
    // A counter of dependencies for calling run(). If we need to
    // do asynchronous work before running, increment this and
    // decrement it. Incrementing must happen in a place like
    // Module.preRun (used by emcc to add file preloading).
    // Note that you can add dependencies in preRun, even though
    // it happens right before run - run will be postponed until
    // the dependencies are met.


    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

    function getUniqueRunDependency(id) {
      return id;
    }

    function addRunDependency(id) {
      runDependencies++;

      if (Module['monitorRunDependencies']) {
        Module['monitorRunDependencies'](runDependencies);
      }
    }

    function removeRunDependency(id) {
      runDependencies--;

      if (Module['monitorRunDependencies']) {
        Module['monitorRunDependencies'](runDependencies);
      }

      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
        }

        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback(); // can add another dependenciesFulfilled
        }
      }
    }

    Module["preloadedImages"] = {}; // maps url to image data

    Module["preloadedAudios"] = {}; // maps url to audio data

    /** @param {string|number=} what */

    function abort(what) {
      {
        if (Module['onAbort']) {
          Module['onAbort'](what);
        }
      }
      what = 'Aborted(' + what + ')'; // TODO(sbc): Should we remove printing and leave it up to whoever
      // catches the exception?

      err(what);
      ABORT = true;
      EXITSTATUS = 1;
      what += '. Build with -s ASSERTIONS=1 for more info.'; // Use a wasm runtime error, because a JS error might be seen as a foreign
      // exception, which means we'd run destructors on it. We need the error to
      // simply make the program stop.

      var e = new WebAssembly.RuntimeError(what);
      readyPromiseReject(e); // Throw the error whether or not MODULARIZE is set because abort is used
      // in code paths apart from instantiation where an exception is expected
      // to be thrown when abort is called.

      throw e;
    } // {{MEM_INITIALIZER}}
    // include: memoryprofiler.js
    // end include: memoryprofiler.js
    // include: URIUtils.js
    // Prefix of data URIs emitted by SINGLE_FILE and related options.


    var dataURIPrefix = 'data:application/octet-stream;base64,'; // Indicates whether filename is a base64 data URI.

    function isDataURI(filename) {
      // Prefix of data URIs emitted by SINGLE_FILE and related options.
      return filename.startsWith(dataURIPrefix);
    } // Indicates whether filename is delivered via file protocol (as opposed to http/https)


    function isFileURI(filename) {
      return filename.startsWith('file://');
    } // end include: URIUtils.js


    var wasmBinaryFile;
    wasmBinaryFile = 'sim.wasm';

    if (!isDataURI(wasmBinaryFile)) {
      wasmBinaryFile = locateFile(wasmBinaryFile);
    }

    function getBinary(file) {
      try {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary);
        }

        if (readBinary) {
          return readBinary(file);
        } else {
          throw "both async and sync fetching of the wasm failed";
        }
      } catch (err) {
        abort(err);
      }
    }

    function getBinaryPromise() {
      // If we don't have the binary yet, try to to load it asynchronously.
      // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
      // See https://github.com/github/fetch/pull/92#issuecomment-140665932
      // Cordova or Electron apps are typically loaded from a file:// url.
      // So use fetch if it is available and the url is not a file, otherwise fall back to XHR.
      if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
        if (typeof fetch === 'function' && !isFileURI(wasmBinaryFile)) {
          return fetch(wasmBinaryFile, {
            credentials: 'same-origin'
          }).then(function (response) {
            if (!response['ok']) {
              throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
            }

            return response['arrayBuffer']();
          }).catch(function () {
            return getBinary(wasmBinaryFile);
          });
        } else {
          if (readAsync) {
            // fetch is not available or url is file => try XHR (readAsync uses XHR internally)
            return new Promise(function (resolve, reject) {
              readAsync(wasmBinaryFile, function (response) {
                resolve(new Uint8Array(
                /** @type{!ArrayBuffer} */
                response));
              }, reject);
            });
          }
        }
      } // Otherwise, getBinary should be able to get it synchronously


      return Promise.resolve().then(function () {
        return getBinary(wasmBinaryFile);
      });
    } // Create the wasm instance.
    // Receives the wasm imports, returns the exports.


    function createWasm() {
      // prepare imports
      var info = {
        'env': asmLibraryArg,
        'wasi_snapshot_preview1': asmLibraryArg
      }; // Load the wasm module and create an instance of using native support in the JS engine.
      // handle a generated wasm instance, receiving its exports and
      // performing other necessary setup

      /** @param {WebAssembly.Module=} module*/

      function receiveInstance(instance, module) {
        var exports = instance.exports;
        Module['asm'] = exports;
        wasmMemory = Module['asm']['memory'];
        updateGlobalBufferAndViews(wasmMemory.buffer);
        wasmTable = Module['asm']['__indirect_function_table'];
        addOnInit(Module['asm']['__wasm_call_ctors']);
        removeRunDependency('wasm-instantiate');
      } // we can't run yet (except in a pthread, where we have a custom sync instantiator)


      addRunDependency('wasm-instantiate'); // Prefer streaming instantiation if available.

      function receiveInstantiationResult(result) {
        // 'result' is a ResultObject object which has both the module and instance.
        // receiveInstance() will swap in the exports (to Module.asm) so they can be called
        // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
        // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
        receiveInstance(result['instance']);
      }

      function instantiateArrayBuffer(receiver) {
        return getBinaryPromise().then(function (binary) {
          return WebAssembly.instantiate(binary, info);
        }).then(function (instance) {
          return instance;
        }).then(receiver, function (reason) {
          err('failed to asynchronously prepare wasm: ' + reason);
          abort(reason);
        });
      }

      function instantiateAsync() {
        if (!wasmBinary && typeof WebAssembly.instantiateStreaming === 'function' && !isDataURI(wasmBinaryFile) && // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
        !isFileURI(wasmBinaryFile) && typeof fetch === 'function') {
          return fetch(wasmBinaryFile, {
            credentials: 'same-origin'
          }).then(function (response) {
            var result = WebAssembly.instantiateStreaming(response, info);
            return result.then(receiveInstantiationResult, function (reason) {
              // We expect the most common failure cause to be a bad MIME type for the binary,
              // in which case falling back to ArrayBuffer instantiation should work.
              err('wasm streaming compile failed: ' + reason);
              err('falling back to ArrayBuffer instantiation');
              return instantiateArrayBuffer(receiveInstantiationResult);
            });
          });
        } else {
          return instantiateArrayBuffer(receiveInstantiationResult);
        }
      } // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
      // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
      // to any other async startup actions they are performing.


      if (Module['instantiateWasm']) {
        try {
          var exports = Module['instantiateWasm'](info, receiveInstance);
          return exports;
        } catch (e) {
          err('Module.instantiateWasm callback failed with error: ' + e);
          return false;
        }
      } // If instantiation fails, reject the module ready promise.


      instantiateAsync().catch(readyPromiseReject);
      return {}; // no exports yet; we'll fill them in later
    } // Globals used by JS i64 conversions (see makeSetValue)


    var tempDouble;
    var tempI64; // === Body ===

    var ASM_CONSTS = {};

    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        var callback = callbacks.shift();

        if (typeof callback == 'function') {
          callback(Module); // Pass the module as the first argument.

          continue;
        }

        var func = callback.func;

        if (typeof func === 'number') {
          if (callback.arg === undefined) {
            getWasmTableEntry(func)();
          } else {
            getWasmTableEntry(func)(callback.arg);
          }
        } else {
          func(callback.arg === undefined ? null : callback.arg);
        }
      }
    }

    function withStackSave(f) {
      var stack = stackSave();
      var ret = f();
      stackRestore(stack);
      return ret;
    }

    function demangle(func) {
      // If demangle has failed before, stop demangling any further function names
      // This avoids an infinite recursion with malloc()->abort()->stackTrace()->demangle()->malloc()->...
      demangle.recursionGuard = (demangle.recursionGuard | 0) + 1;
      if (demangle.recursionGuard > 1) return func;

      var __cxa_demangle_func = Module['___cxa_demangle'] || Module['__cxa_demangle'];

      assert(__cxa_demangle_func);
      return withStackSave(function () {
        try {
          var s = func;
          if (s.startsWith('__Z')) s = s.substr(1);
          var len = lengthBytesUTF8(s) + 1;
          var buf = stackAlloc(len);
          stringToUTF8(s, buf, len);
          var status = stackAlloc(4);

          var ret = __cxa_demangle_func(buf, 0, 0, status);

          if (HEAP32[status >> 2] === 0 && ret) {
            return UTF8ToString(ret);
          } // otherwise, libcxxabi failed

        } catch (e) {} finally {
          _free(ret);

          if (demangle.recursionGuard < 2) --demangle.recursionGuard;
        } // failure when using libcxxabi, don't demangle


        return func;
      });
    }

    function demangleAll(text) {
      var regex = /\b_Z[\w\d_]+/g;
      return text.replace(regex, function (x) {
        var y = demangle(x);
        return x === y ? x : y + ' [' + x + ']';
      });
    }

    var wasmTableMirror = [];

    function getWasmTableEntry(funcPtr) {
      var func = wasmTableMirror[funcPtr];

      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }

      return func;
    }

    function handleException(e) {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }

      quit_(1, e);
    }

    function jsStackTrace() {
      var error = new Error();

      if (!error.stack) {
        // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
        // so try that as a special-case.
        try {
          throw new Error();
        } catch (e) {
          error = e;
        }

        if (!error.stack) {
          return '(no stack trace available)';
        }
      }

      return error.stack.toString();
    }

    function setWasmTableEntry(idx, func) {
      wasmTable.set(idx, func);
      wasmTableMirror[idx] = func;
    }

    function stackTrace() {
      var js = jsStackTrace();
      if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
      return demangleAll(js);
    }

    function ExceptionInfo(excPtr) {
      this.excPtr = excPtr;
      this.ptr = excPtr - 16;

      this.set_type = function (type) {
        HEAP32[this.ptr + 4 >> 2] = type;
      };

      this.get_type = function () {
        return HEAP32[this.ptr + 4 >> 2];
      };

      this.set_destructor = function (destructor) {
        HEAP32[this.ptr + 8 >> 2] = destructor;
      };

      this.get_destructor = function () {
        return HEAP32[this.ptr + 8 >> 2];
      };

      this.set_refcount = function (refcount) {
        HEAP32[this.ptr >> 2] = refcount;
      };

      this.set_caught = function (caught) {
        caught = caught ? 1 : 0;
        HEAP8[this.ptr + 12 >> 0] = caught;
      };

      this.get_caught = function () {
        return HEAP8[this.ptr + 12 >> 0] != 0;
      };

      this.set_rethrown = function (rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[this.ptr + 13 >> 0] = rethrown;
      };

      this.get_rethrown = function () {
        return HEAP8[this.ptr + 13 >> 0] != 0;
      }; // Initialize native structure fields. Should be called once after allocated.


      this.init = function (type, destructor) {
        this.set_type(type);
        this.set_destructor(destructor);
        this.set_refcount(0);
        this.set_caught(false);
        this.set_rethrown(false);
      };

      this.add_ref = function () {
        var value = HEAP32[this.ptr >> 2];
        HEAP32[this.ptr >> 2] = value + 1;
      }; // Returns true if last reference released.


      this.release_ref = function () {
        var prev = HEAP32[this.ptr >> 2];
        HEAP32[this.ptr >> 2] = prev - 1;
        return prev === 1;
      };
    }

    function CatchInfo(ptr) {
      this.free = function () {
        _free(this.ptr);

        this.ptr = 0;
      };

      this.set_base_ptr = function (basePtr) {
        HEAP32[this.ptr >> 2] = basePtr;
      };

      this.get_base_ptr = function () {
        return HEAP32[this.ptr >> 2];
      };

      this.set_adjusted_ptr = function (adjustedPtr) {
        HEAP32[this.ptr + 4 >> 2] = adjustedPtr;
      };

      this.get_adjusted_ptr_addr = function () {
        return this.ptr + 4;
      };

      this.get_adjusted_ptr = function () {
        return HEAP32[this.ptr + 4 >> 2];
      }; // Get pointer which is expected to be received by catch clause in C++ code. It may be adjusted
      // when the pointer is casted to some of the exception object base classes (e.g. when virtual
      // inheritance is used). When a pointer is thrown this method should return the thrown pointer
      // itself.


      this.get_exception_ptr = function () {
        // Work around a fastcomp bug, this code is still included for some reason in a build without
        // exceptions support.
        var isPointer = ___cxa_is_pointer_type(this.get_exception_info().get_type());

        if (isPointer) {
          return HEAP32[this.get_base_ptr() >> 2];
        }

        var adjusted = this.get_adjusted_ptr();
        if (adjusted !== 0) return adjusted;
        return this.get_base_ptr();
      };

      this.get_exception_info = function () {
        return new ExceptionInfo(this.get_base_ptr());
      };

      if (ptr === undefined) {
        this.ptr = _malloc(8);
        this.set_adjusted_ptr(0);
      } else {
        this.ptr = ptr;
      }
    }

    var exceptionCaught = [];

    function exception_addRef(info) {
      info.add_ref();
    }

    var uncaughtExceptionCount = 0;

    function ___cxa_begin_catch(ptr) {
      var catchInfo = new CatchInfo(ptr);
      var info = catchInfo.get_exception_info();

      if (!info.get_caught()) {
        info.set_caught(true);
        uncaughtExceptionCount--;
      }

      info.set_rethrown(false);
      exceptionCaught.push(catchInfo);
      exception_addRef(info);
      return catchInfo.get_exception_ptr();
    }

    var exceptionLast = 0;

    function ___cxa_free_exception(ptr) {
      try {
        return _free(new ExceptionInfo(ptr).ptr);
      } catch (e) {}
    }

    function exception_decRef(info) {
      // A rethrown exception can reach refcount 0; it must not be discarded
      // Its next handler will clear the rethrown flag and addRef it, prior to
      // final decRef and destruction here
      if (info.release_ref() && !info.get_rethrown()) {
        var destructor = info.get_destructor();

        if (destructor) {
          // In Wasm, destructors return 'this' as in ARM
          getWasmTableEntry(destructor)(info.excPtr);
        }

        ___cxa_free_exception(info.excPtr);
      }
    }

    function ___cxa_end_catch() {
      // Clear state flag.
      _setThrew(0); // Call destructor if one is registered then clear it.


      var catchInfo = exceptionCaught.pop();
      exception_decRef(catchInfo.get_exception_info());
      catchInfo.free();
      exceptionLast = 0; // XXX in decRef?
    }

    function ___resumeException(catchInfoPtr) {
      var catchInfo = new CatchInfo(catchInfoPtr);
      var ptr = catchInfo.get_base_ptr();

      if (!exceptionLast) {
        exceptionLast = ptr;
      }

      catchInfo.free();
      throw ptr;
    }

    function ___cxa_find_matching_catch_2() {
      var thrown = exceptionLast;

      if (!thrown) {
        // just pass through the null ptr
        setTempRet0(0);
        return 0 | 0;
      }

      var info = new ExceptionInfo(thrown);
      var thrownType = info.get_type();
      var catchInfo = new CatchInfo();
      catchInfo.set_base_ptr(thrown);
      catchInfo.set_adjusted_ptr(thrown);

      if (!thrownType) {
        // just pass through the thrown ptr
        setTempRet0(0);
        return catchInfo.ptr | 0;
      }

      var typeArray = Array.prototype.slice.call(arguments); // can_catch receives a **, add indirection
      // The different catch blocks are denoted by different types.
      // Due to inheritance, those types may not precisely match the
      // type of the thrown object. Find one which matches, and
      // return the type of the catch block which should be called.

      for (var i = 0; i < typeArray.length; i++) {
        var caughtType = typeArray[i];

        if (caughtType === 0 || caughtType === thrownType) {
          // Catch all clause matched or exactly the same type is caught
          break;
        }

        if (___cxa_can_catch(caughtType, thrownType, catchInfo.get_adjusted_ptr_addr())) {
          setTempRet0(caughtType);
          return catchInfo.ptr | 0;
        }
      }

      setTempRet0(thrownType);
      return catchInfo.ptr | 0;
    }

    function ___cxa_find_matching_catch_3() {
      var thrown = exceptionLast;

      if (!thrown) {
        // just pass through the null ptr
        setTempRet0(0);
        return 0 | 0;
      }

      var info = new ExceptionInfo(thrown);
      var thrownType = info.get_type();
      var catchInfo = new CatchInfo();
      catchInfo.set_base_ptr(thrown);
      catchInfo.set_adjusted_ptr(thrown);

      if (!thrownType) {
        // just pass through the thrown ptr
        setTempRet0(0);
        return catchInfo.ptr | 0;
      }

      var typeArray = Array.prototype.slice.call(arguments); // can_catch receives a **, add indirection
      // The different catch blocks are denoted by different types.
      // Due to inheritance, those types may not precisely match the
      // type of the thrown object. Find one which matches, and
      // return the type of the catch block which should be called.

      for (var i = 0; i < typeArray.length; i++) {
        var caughtType = typeArray[i];

        if (caughtType === 0 || caughtType === thrownType) {
          // Catch all clause matched or exactly the same type is caught
          break;
        }

        if (___cxa_can_catch(caughtType, thrownType, catchInfo.get_adjusted_ptr_addr())) {
          setTempRet0(caughtType);
          return catchInfo.ptr | 0;
        }
      }

      setTempRet0(thrownType);
      return catchInfo.ptr | 0;
    }

    function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {}

    function getShiftFromSize(size) {
      switch (size) {
        case 1:
          return 0;

        case 2:
          return 1;

        case 4:
          return 2;

        case 8:
          return 3;

        default:
          throw new TypeError('Unknown type size: ' + size);
      }
    }

    function embind_init_charCodes() {
      var codes = new Array(256);

      for (var i = 0; i < 256; ++i) {
        codes[i] = String.fromCharCode(i);
      }

      embind_charCodes = codes;
    }

    var embind_charCodes = undefined;

    function readLatin1String(ptr) {
      var ret = "";
      var c = ptr;

      while (HEAPU8[c]) {
        ret += embind_charCodes[HEAPU8[c++]];
      }

      return ret;
    }

    var awaitingDependencies = {};
    var registeredTypes = {};
    var typeDependencies = {};
    var char_0 = 48;
    var char_9 = 57;

    function makeLegalFunctionName(name) {
      if (undefined === name) {
        return '_unknown';
      }

      name = name.replace(/[^a-zA-Z0-9_]/g, '$');
      var f = name.charCodeAt(0);

      if (f >= char_0 && f <= char_9) {
        return '_' + name;
      } else {
        return name;
      }
    }

    function createNamedFunction(name, body) {
      name = makeLegalFunctionName(name);
      /*jshint evil:true*/

      return new Function("body", "return function " + name + "() {\n" + "    \"use strict\";" + "    return body.apply(this, arguments);\n" + "};\n")(body);
    }

    function extendError(baseErrorType, errorName) {
      var errorClass = createNamedFunction(errorName, function (message) {
        this.name = errorName;
        this.message = message;
        var stack = new Error(message).stack;

        if (stack !== undefined) {
          this.stack = this.toString() + '\n' + stack.replace(/^Error(:[^\n]*)?\n/, '');
        }
      });
      errorClass.prototype = Object.create(baseErrorType.prototype);
      errorClass.prototype.constructor = errorClass;

      errorClass.prototype.toString = function () {
        if (this.message === undefined) {
          return this.name;
        } else {
          return this.name + ': ' + this.message;
        }
      };

      return errorClass;
    }

    var BindingError = undefined;

    function throwBindingError(message) {
      throw new BindingError(message);
    }

    var InternalError = undefined;

    function throwInternalError(message) {
      throw new InternalError(message);
    }

    function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
      myTypes.forEach(function (type) {
        typeDependencies[type] = dependentTypes;
      });

      function onComplete(typeConverters) {
        var myTypeConverters = getTypeConverters(typeConverters);

        if (myTypeConverters.length !== myTypes.length) {
          throwInternalError('Mismatched type converter count');
        }

        for (var i = 0; i < myTypes.length; ++i) {
          registerType(myTypes[i], myTypeConverters[i]);
        }
      }

      var typeConverters = new Array(dependentTypes.length);
      var unregisteredTypes = [];
      var registered = 0;
      dependentTypes.forEach(function (dt, i) {
        if (registeredTypes.hasOwnProperty(dt)) {
          typeConverters[i] = registeredTypes[dt];
        } else {
          unregisteredTypes.push(dt);

          if (!awaitingDependencies.hasOwnProperty(dt)) {
            awaitingDependencies[dt] = [];
          }

          awaitingDependencies[dt].push(function () {
            typeConverters[i] = registeredTypes[dt];
            ++registered;

            if (registered === unregisteredTypes.length) {
              onComplete(typeConverters);
            }
          });
        }
      });

      if (0 === unregisteredTypes.length) {
        onComplete(typeConverters);
      }
    }
    /** @param {Object=} options */


    function registerType(rawType, registeredInstance, options) {
      options = options || {};

      if (!('argPackAdvance' in registeredInstance)) {
        throw new TypeError('registerType registeredInstance requires argPackAdvance');
      }

      var name = registeredInstance.name;

      if (!rawType) {
        throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
      }

      if (registeredTypes.hasOwnProperty(rawType)) {
        if (options.ignoreDuplicateRegistrations) {
          return;
        } else {
          throwBindingError("Cannot register type '" + name + "' twice");
        }
      }

      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];

      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach(function (cb) {
          cb();
        });
      }
    }

    function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
      var shift = getShiftFromSize(size);
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        'fromWireType': function (wt) {
          // ambiguous emscripten ABI: sometimes return values are
          // true or false, and sometimes integers (0 or 1)
          return !!wt;
        },
        'toWireType': function (destructors, o) {
          return o ? trueValue : falseValue;
        },
        'argPackAdvance': 8,
        'readValueFromPointer': function (pointer) {
          // TODO: if heap is fixed (like in asm.js) this could be executed outside
          var heap;

          if (size === 1) {
            heap = HEAP8;
          } else if (size === 2) {
            heap = HEAP16;
          } else if (size === 4) {
            heap = HEAP32;
          } else {
            throw new TypeError("Unknown boolean type size: " + name);
          }

          return this['fromWireType'](heap[pointer >> shift]);
        },
        destructorFunction: null // This type does not need a destructor

      });
    }

    var emval_free_list = [];
    var emval_handle_array = [{}, {
      value: undefined
    }, {
      value: null
    }, {
      value: true
    }, {
      value: false
    }];

    function __emval_decref(handle) {
      if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
        emval_handle_array[handle] = undefined;
        emval_free_list.push(handle);
      }
    }

    function count_emval_handles() {
      var count = 0;

      for (var i = 5; i < emval_handle_array.length; ++i) {
        if (emval_handle_array[i] !== undefined) {
          ++count;
        }
      }

      return count;
    }

    function get_first_emval() {
      for (var i = 5; i < emval_handle_array.length; ++i) {
        if (emval_handle_array[i] !== undefined) {
          return emval_handle_array[i];
        }
      }

      return null;
    }

    function init_emval() {
      Module['count_emval_handles'] = count_emval_handles;
      Module['get_first_emval'] = get_first_emval;
    }

    var Emval = {
      toValue: function (handle) {
        if (!handle) {
          throwBindingError('Cannot use deleted val. handle = ' + handle);
        }

        return emval_handle_array[handle].value;
      },
      toHandle: function (value) {
        switch (value) {
          case undefined:
            {
              return 1;
            }

          case null:
            {
              return 2;
            }

          case true:
            {
              return 3;
            }

          case false:
            {
              return 4;
            }

          default:
            {
              var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
              emval_handle_array[handle] = {
                refcount: 1,
                value: value
              };
              return handle;
            }
        }
      }
    };

    function simpleReadValueFromPointer(pointer) {
      return this['fromWireType'](HEAPU32[pointer >> 2]);
    }

    function __embind_register_emval(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        'fromWireType': function (handle) {
          var rv = Emval.toValue(handle);

          __emval_decref(handle);

          return rv;
        },
        'toWireType': function (destructors, value) {
          return Emval.toHandle(value);
        },
        'argPackAdvance': 8,
        'readValueFromPointer': simpleReadValueFromPointer,
        destructorFunction: null // This type does not need a destructor
        // TODO: do we need a deleteObject here?  write a test where
        // emval is passed into JS via an interface

      });
    }

    function _embind_repr(v) {
      if (v === null) {
        return 'null';
      }

      var t = typeof v;

      if (t === 'object' || t === 'array' || t === 'function') {
        return v.toString();
      } else {
        return '' + v;
      }
    }

    function floatReadValueFromPointer(name, shift) {
      switch (shift) {
        case 2:
          return function (pointer) {
            return this['fromWireType'](HEAPF32[pointer >> 2]);
          };

        case 3:
          return function (pointer) {
            return this['fromWireType'](HEAPF64[pointer >> 3]);
          };

        default:
          throw new TypeError("Unknown float type: " + name);
      }
    }

    function __embind_register_float(rawType, name, size) {
      var shift = getShiftFromSize(size);
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        'fromWireType': function (value) {
          return value;
        },
        'toWireType': function (destructors, value) {
          // The VM will perform JS to Wasm value conversion, according to the spec:
          // https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
          return value;
        },
        'argPackAdvance': 8,
        'readValueFromPointer': floatReadValueFromPointer(name, shift),
        destructorFunction: null // This type does not need a destructor

      });
    }

    function integerReadValueFromPointer(name, shift, signed) {
      // integers are quite common, so generate very specialized functions
      switch (shift) {
        case 0:
          return signed ? function readS8FromPointer(pointer) {
            return HEAP8[pointer];
          } : function readU8FromPointer(pointer) {
            return HEAPU8[pointer];
          };

        case 1:
          return signed ? function readS16FromPointer(pointer) {
            return HEAP16[pointer >> 1];
          } : function readU16FromPointer(pointer) {
            return HEAPU16[pointer >> 1];
          };

        case 2:
          return signed ? function readS32FromPointer(pointer) {
            return HEAP32[pointer >> 2];
          } : function readU32FromPointer(pointer) {
            return HEAPU32[pointer >> 2];
          };

        default:
          throw new TypeError("Unknown integer type: " + name);
      }
    }

    function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
      name = readLatin1String(name);

      if (maxRange === -1) {
        // LLVM doesn't have signed and unsigned 32-bit types, so u32 literals come out as 'i32 -1'. Always treat those as max u32.
        maxRange = 4294967295;
      }

      var shift = getShiftFromSize(size);

      var fromWireType = function (value) {
        return value;
      };

      if (minRange === 0) {
        var bitshift = 32 - 8 * size;

        fromWireType = function (value) {
          return value << bitshift >>> bitshift;
        };
      }

      var isUnsignedType = name.includes('unsigned');

      var checkAssertions = function (value, toTypeName) {};

      var toWireType;

      if (isUnsignedType) {
        toWireType = function (destructors, value) {
          checkAssertions(value, this.name);
          return value >>> 0;
        };
      } else {
        toWireType = function (destructors, value) {
          checkAssertions(value, this.name); // The VM will perform JS to Wasm value conversion, according to the spec:
          // https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue

          return value;
        };
      }

      registerType(primitiveType, {
        name: name,
        'fromWireType': fromWireType,
        'toWireType': toWireType,
        'argPackAdvance': 8,
        'readValueFromPointer': integerReadValueFromPointer(name, shift, minRange !== 0),
        destructorFunction: null // This type does not need a destructor

      });
    }

    function __embind_register_memory_view(rawType, dataTypeIndex, name) {
      var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
      var TA = typeMapping[dataTypeIndex];

      function decodeMemoryView(handle) {
        handle = handle >> 2;
        var heap = HEAPU32;
        var size = heap[handle]; // in elements

        var data = heap[handle + 1]; // byte offset into emscripten heap

        return new TA(buffer, data, size);
      }

      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        'fromWireType': decodeMemoryView,
        'argPackAdvance': 8,
        'readValueFromPointer': decodeMemoryView
      }, {
        ignoreDuplicateRegistrations: true
      });
    }

    function __embind_register_std_string(rawType, name) {
      name = readLatin1String(name);
      var stdStringIsUTF8 //process only std::string bindings with UTF8 support, in contrast to e.g. std::basic_string<unsigned char>
      = name === "std::string";
      registerType(rawType, {
        name: name,
        'fromWireType': function (value) {
          var length = HEAPU32[value >> 2];
          var str;

          if (stdStringIsUTF8) {
            var decodeStartPtr = value + 4; // Looping here to support possible embedded '0' bytes

            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = value + 4 + i;

              if (i == length || HEAPU8[currentBytePtr] == 0) {
                var maxRead = currentBytePtr - decodeStartPtr;
                var stringSegment = UTF8ToString(decodeStartPtr, maxRead);

                if (str === undefined) {
                  str = stringSegment;
                } else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }

                decodeStartPtr = currentBytePtr + 1;
              }
            }
          } else {
            var a = new Array(length);

            for (var i = 0; i < length; ++i) {
              a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
            }

            str = a.join('');
          }

          _free(value);

          return str;
        },
        'toWireType': function (destructors, value) {
          if (value instanceof ArrayBuffer) {
            value = new Uint8Array(value);
          }

          var getLength;
          var valueIsOfTypeString = typeof value === 'string';

          if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
            throwBindingError('Cannot pass non-string to std::string');
          }

          if (stdStringIsUTF8 && valueIsOfTypeString) {
            getLength = function () {
              return lengthBytesUTF8(value);
            };
          } else {
            getLength = function () {
              return value.length;
            };
          } // assumes 4-byte alignment


          var length = getLength();

          var ptr = _malloc(4 + length + 1);

          HEAPU32[ptr >> 2] = length;

          if (stdStringIsUTF8 && valueIsOfTypeString) {
            stringToUTF8(value, ptr + 4, length + 1);
          } else {
            if (valueIsOfTypeString) {
              for (var i = 0; i < length; ++i) {
                var charCode = value.charCodeAt(i);

                if (charCode > 255) {
                  _free(ptr);

                  throwBindingError('String has UTF-16 code units that do not fit in 8 bits');
                }

                HEAPU8[ptr + 4 + i] = charCode;
              }
            } else {
              for (var i = 0; i < length; ++i) {
                HEAPU8[ptr + 4 + i] = value[i];
              }
            }
          }

          if (destructors !== null) {
            destructors.push(_free, ptr);
          }

          return ptr;
        },
        'argPackAdvance': 8,
        'readValueFromPointer': simpleReadValueFromPointer,
        destructorFunction: function (ptr) {
          _free(ptr);
        }
      });
    }

    function __embind_register_std_wstring(rawType, charSize, name) {
      name = readLatin1String(name);
      var decodeString, encodeString, getHeap, lengthBytesUTF, shift;

      if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;

        getHeap = function () {
          return HEAPU16;
        };

        shift = 1;
      } else if (charSize === 4) {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;

        getHeap = function () {
          return HEAPU32;
        };

        shift = 2;
      }

      registerType(rawType, {
        name: name,
        'fromWireType': function (value) {
          // Code mostly taken from _embind_register_std_string fromWireType
          var length = HEAPU32[value >> 2];
          var HEAP = getHeap();
          var str;
          var decodeStartPtr = value + 4; // Looping here to support possible embedded '0' bytes

          for (var i = 0; i <= length; ++i) {
            var currentBytePtr = value + 4 + i * charSize;

            if (i == length || HEAP[currentBytePtr >> shift] == 0) {
              var maxReadBytes = currentBytePtr - decodeStartPtr;
              var stringSegment = decodeString(decodeStartPtr, maxReadBytes);

              if (str === undefined) {
                str = stringSegment;
              } else {
                str += String.fromCharCode(0);
                str += stringSegment;
              }

              decodeStartPtr = currentBytePtr + charSize;
            }
          }

          _free(value);

          return str;
        },
        'toWireType': function (destructors, value) {
          if (!(typeof value === 'string')) {
            throwBindingError('Cannot pass non-string to C++ string type ' + name);
          } // assumes 4-byte alignment


          var length = lengthBytesUTF(value);

          var ptr = _malloc(4 + length + charSize);

          HEAPU32[ptr >> 2] = length >> shift;
          encodeString(value, ptr + 4, length + charSize);

          if (destructors !== null) {
            destructors.push(_free, ptr);
          }

          return ptr;
        },
        'argPackAdvance': 8,
        'readValueFromPointer': simpleReadValueFromPointer,
        destructorFunction: function (ptr) {
          _free(ptr);
        }
      });
    }

    function __embind_register_void(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, {
        isVoid: true,
        // void return values can be optimized out sometimes
        name: name,
        'argPackAdvance': 0,
        'fromWireType': function () {
          return undefined;
        },
        'toWireType': function (destructors, o) {
          // TODO: assert if anything else is given?
          return undefined;
        }
      });
    }

    function _abort() {
      abort('');
    }

    function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }

    function abortOnCannotGrowMemory(requestedSize) {
      abort('OOM');
    }

    function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      abortOnCannotGrowMemory(requestedSize);
    }

    function _getTempRet0() {
      return getTempRet0();
    }

    embind_init_charCodes();
    BindingError = Module['BindingError'] = extendError(Error, 'BindingError');
    ;
    InternalError = Module['InternalError'] = extendError(Error, 'InternalError');
    ;
    init_emval();
    ;
    var ASSERTIONS = false;
    /** @type {function(string, boolean=, number=)} */

    function intArrayFromString(stringy, dontAddNull, length) {
      var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
      if (dontAddNull) u8array.length = numBytesWritten;
      return u8array;
    }

    function intArrayToString(array) {
      var ret = [];

      for (var i = 0; i < array.length; i++) {
        var chr = array[i];

        if (chr > 0xFF) {
          if (ASSERTIONS) {
            assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
          }

          chr &= 0xFF;
        }

        ret.push(String.fromCharCode(chr));
      }

      return ret.join('');
    }

    var asmLibraryArg = {
      "__cxa_begin_catch": ___cxa_begin_catch,
      "__cxa_end_catch": ___cxa_end_catch,
      "__cxa_find_matching_catch_2": ___cxa_find_matching_catch_2,
      "__cxa_find_matching_catch_3": ___cxa_find_matching_catch_3,
      "__resumeException": ___resumeException,
      "_embind_register_bigint": __embind_register_bigint,
      "_embind_register_bool": __embind_register_bool,
      "_embind_register_emval": __embind_register_emval,
      "_embind_register_float": __embind_register_float,
      "_embind_register_integer": __embind_register_integer,
      "_embind_register_memory_view": __embind_register_memory_view,
      "_embind_register_std_string": __embind_register_std_string,
      "_embind_register_std_wstring": __embind_register_std_wstring,
      "_embind_register_void": __embind_register_void,
      "abort": _abort,
      "emscripten_memcpy_big": _emscripten_memcpy_big,
      "emscripten_resize_heap": _emscripten_resize_heap,
      "getTempRet0": _getTempRet0,
      "invoke_ii": invoke_ii,
      "invoke_iii": invoke_iii,
      "invoke_v": invoke_v,
      "invoke_vii": invoke_vii,
      "invoke_viii": invoke_viii
    };
    var asm = createWasm();
    /** @type {function(...*):?} */

    var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function () {
      return (___wasm_call_ctors = Module["___wasm_call_ctors"] = Module["asm"]["__wasm_call_ctors"]).apply(null, arguments);
    };
    /** @type {function(...*):?} */


    var ___getTypeName = Module["___getTypeName"] = function () {
      return (___getTypeName = Module["___getTypeName"] = Module["asm"]["__getTypeName"]).apply(null, arguments);
    };
    /** @type {function(...*):?} */


    var ___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = function () {
      return (___embind_register_native_and_builtin_types = Module["___embind_register_native_and_builtin_types"] = Module["asm"]["__embind_register_native_and_builtin_types"]).apply(null, arguments);
    };
    /** @type {function(...*):?} */


    var ___errno_location = Module["___errno_location"] = function () {
      return (___errno_location = Module["___errno_location"] = Module["asm"]["__errno_location"]).apply(null, arguments);
    };
    /** @type {function(...*):?} */


    var _malloc = Module["_malloc"] = function () {
      return (_malloc = Module["_malloc"] = Module["asm"]["malloc"]).apply(null, arguments);
    };
    /** @type {function(...*):?} */


    var _setThrew = Module["_setThrew"] = function () {
      return (_setThrew = Module["_setThrew"] = Module["asm"]["setThrew"]).apply(null, arguments);
    };
    /** @type {function(...*):?} */


    var stackSave = Module["stackSave"] = function () {
      return (stackSave = Module["stackSave"] = Module["asm"]["stackSave"]).apply(null, arguments);
    };
    /** @type {function(...*):?} */


    var stackRestore = Module["stackRestore"] = function () {
      return (stackRestore = Module["stackRestore"] = Module["asm"]["stackRestore"]).apply(null, arguments);
    };
    /** @type {function(...*):?} */


    var stackAlloc = Module["stackAlloc"] = function () {
      return (stackAlloc = Module["stackAlloc"] = Module["asm"]["stackAlloc"]).apply(null, arguments);
    };
    /** @type {function(...*):?} */


    var ___cxa_demangle = Module["___cxa_demangle"] = function () {
      return (___cxa_demangle = Module["___cxa_demangle"] = Module["asm"]["__cxa_demangle"]).apply(null, arguments);
    };
    /** @type {function(...*):?} */


    var _free = Module["_free"] = function () {
      return (_free = Module["_free"] = Module["asm"]["free"]).apply(null, arguments);
    };
    /** @type {function(...*):?} */


    var ___cxa_can_catch = Module["___cxa_can_catch"] = function () {
      return (___cxa_can_catch = Module["___cxa_can_catch"] = Module["asm"]["__cxa_can_catch"]).apply(null, arguments);
    };
    /** @type {function(...*):?} */


    var ___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = function () {
      return (___cxa_is_pointer_type = Module["___cxa_is_pointer_type"] = Module["asm"]["__cxa_is_pointer_type"]).apply(null, arguments);
    };

    function invoke_v(index) {
      var sp = stackSave();

      try {
        getWasmTableEntry(index)();
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== 'longjmp') throw e;

        _setThrew(1, 0);
      }
    }

    function invoke_vii(index, a1, a2) {
      var sp = stackSave();

      try {
        getWasmTableEntry(index)(a1, a2);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== 'longjmp') throw e;

        _setThrew(1, 0);
      }
    }

    function invoke_ii(index, a1) {
      var sp = stackSave();

      try {
        return getWasmTableEntry(index)(a1);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== 'longjmp') throw e;

        _setThrew(1, 0);
      }
    }

    function invoke_iii(index, a1, a2) {
      var sp = stackSave();

      try {
        return getWasmTableEntry(index)(a1, a2);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== 'longjmp') throw e;

        _setThrew(1, 0);
      }
    }

    function invoke_viii(index, a1, a2, a3) {
      var sp = stackSave();

      try {
        getWasmTableEntry(index)(a1, a2, a3);
      } catch (e) {
        stackRestore(sp);
        if (e !== e + 0 && e !== 'longjmp') throw e;

        _setThrew(1, 0);
      }
    } // === Auto-generated postamble setup entry stuff ===


    var calledRun;
    /**
     * @constructor
     * @this {ExitStatus}
     */

    function ExitStatus(status) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + status + ")";
      this.status = status;
    }

    var calledMain = false;

    dependenciesFulfilled = function runCaller() {
      // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
      if (!calledRun) run();
      if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
    };
    /** @type {function(Array=)} */


    function run(args) {
      args = args || arguments_;

      if (runDependencies > 0) {
        return;
      }

      preRun(); // a preRun added a dependency, run will be called later

      if (runDependencies > 0) {
        return;
      }

      function doRun() {
        // run may have just been called through dependencies being fulfilled just in this very frame,
        // or while the async setStatus time below was happening
        if (calledRun) return;
        calledRun = true;
        Module['calledRun'] = true;
        if (ABORT) return;
        initRuntime();
        readyPromiseResolve(Module);
        if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();
        postRun();
      }

      if (Module['setStatus']) {
        Module['setStatus']('Running...');
        setTimeout(function () {
          setTimeout(function () {
            Module['setStatus']('');
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
    }

    Module['run'] = run;
    /** @param {boolean|number=} implicit */

    function exit(status, implicit) {
      EXITSTATUS = status;

      if (keepRuntimeAlive()) {} else {
        exitRuntime();
      }

      procExit(status);
    }

    function procExit(code) {
      EXITSTATUS = code;

      if (!keepRuntimeAlive()) {
        if (Module['onExit']) Module['onExit'](code);
        ABORT = true;
      }

      quit_(code, new ExitStatus(code));
    }

    if (Module['preInit']) {
      if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];

      while (Module['preInit'].length > 0) {
        Module['preInit'].pop()();
      }
    }

    run();
    return Module.ready;
  };
})();

if (typeof exports === 'object' && typeof module === 'object') module.exports = Module;else if (typeof define === 'function' && define['amd']) define([], function () {
  return Module;
});else if (typeof exports === 'object') exports["Module"] = Module;