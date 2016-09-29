/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var iteratorSymbol =
	    typeof Symbol === "function" && Symbol.iterator || "@@iterator";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    // This invoke function is written in a style that assumes some
	    // calling function (or Promise) will handle exceptions.
	    function invoke(method, arg) {
	      var result = generator[method](arg);
	      var value = result.value;
	      return value instanceof AwaitArgument
	        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
	        : Promise.resolve(value).then(function(unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration. If the Promise is rejected, however, the
	            // result for this iteration will be rejected with the same
	            // reason. Note that rejections of yielded Promises are not
	            // thrown back into the generator function, as is the case
	            // when an awaited Promise is rejected. This difference in
	            // behavior between yield and await is important, because it
	            // allows the consumer to decide what to do with the yielded
	            // rejection (swallow it and continue, manually .throw it back
	            // into the generator, abandon iteration, whatever). With
	            // await, by contrast, there is no opportunity to examine the
	            // rejection reason outside the generator function, so the
	            // only option is to throw it from the await expression, and
	            // let the generator function handle the exception.
	            result.value = unwrapped;
	            return result;
	          });
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var invokeNext = invoke.bind(generator, "next");
	    var invokeThrow = invoke.bind(generator, "throw");
	    var invokeReturn = invoke.bind(generator, "return");
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return invoke(method, arg);
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : new Promise(function (resolve) {
	          resolve(callInvokeWithMethodAndArg());
	        });
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          context._sent = arg;
	
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _constsJs = __webpack_require__(4);
	
	var _constsJs2 = _interopRequireDefault(_constsJs);
	
	var _playerJs = __webpack_require__(5);
	
	var _playerJs2 = _interopRequireDefault(_playerJs);
	
	var _platformJs = __webpack_require__(6);
	
	var _platformJs2 = _interopRequireDefault(_platformJs);
	
	var _logicJs = __webpack_require__(7);
	
	var _logicJs2 = _interopRequireDefault(_logicJs);
	
	var _graphicsJs = __webpack_require__(8);
	
	var _graphicsJs2 = _interopRequireDefault(_graphicsJs);
	
	// requestAnimFramew polifill
	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	})();
	
	// Anonymous function autocall
	(function () {
		// Game initialization
		var keypressed = undefined,
		    moveLeft = undefined,
		    moveRight = undefined,
		    canvas = document.getElementById("game"),
		    logic = new _logicJs2["default"](),
		    context = canvas.getContext("2d"),
		    graphics = new _graphicsJs2["default"](logic, context);
	
		canvas.width = _constsJs2["default"].CANVAS_WIDTH;
		canvas.height = _constsJs2["default"].CANVAS_HEIGHT;
	
		// User actions
		document.onkeydown = function (ev) {
			keypressed = ev.keyCode;
		};
		document.onkeyup = function (ev) {
	
			if (ev.keyCode == keypressed) keypressed = 0;
		};
	
		function onTouch(evt) {
			evt.preventDefault();
	
			var touch = evt.changedTouches[0];
			if (touch) {
				switch (evt.type) {
					case "touchstart":
						moveLeft = touch.pageX <= _constsJs2["default"].CANVAS_WIDTH / 2;
						moveRight = touch.pageY > _constsJs2["default"].CANVAS_WIDTH / 2;
						break;
					case "touchend":
						moveLeft = moveRight = false;
						break;
				}
			}
		}
	
		canvas.addEventListener("touchstart", onTouch, false);
		canvas.addEventListener("touchend", onTouch, false);
	
		// Game loop using requestAnimFrame
		function mainStep() {
			var events = {
				direction: keypressed === 65 || moveLeft ? _constsJs2["default"].MOVE_EVTS.LEFT : keypressed === 68 || moveRight ? _constsJs2["default"].MOVE_EVTS.RIGHT : null
			};
	
			logic.step(events);
			graphics.draw();
	
			window.requestAnimFrame(mainStep);
		}
	
		mainStep();
	})();

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var s = (Math.random() * 4 + 1).toFixed(0);
	var PLEFT_IMG = new Image();
	PLEFT_IMG.src = "resources/sprites" + s + "/pleft.png";
	
	var PRIGHT_IMG = new Image();
	PRIGHT_IMG.src = "resources/sprites" + s + "/pright.png";
	
	var BRICK_IMG = new Image();
	BRICK_IMG.src = "resources/sprites" + s + "/brick.png";
	
	var consts = {
	  CANVAS_WIDTH: 640,
	  CANVAS_HEIGHT: 1024,
	  GRAVITY: 1.10,
	  V_JUMP: -24,
	  VX: 6,
	  PLAYER_WITH: 55,
	  PLAYER_HEIGHT: 124,
	  PLATFORM_HEIGHT: 34,
	  PLATFORM_WIDTH: 116,
	  PLAYER_BOTTOM: 1024,
	  PLAYER_COLLISION_PADDING: 34,
	  VY_MAX: 26,
	  SKYLINE: 450,
	  MOVE_EVTS: { LEFT: Symbol("move left"), RIGHT: Symbol("move right") },
	  FIRST_PLATFORM_Y: 1000,
	  PLATFORM_MARGIN_Y: 200,
	  PLATFORM_RANGE_X: 500,
	
	  // ES6 Feature: Autoresolves creates a property with the same name and value than the consts declared at the top
	  PLEFT_IMG: PLEFT_IMG,
	  PRIGHT_IMG: PRIGHT_IMG,
	  BRICK_IMG: BRICK_IMG
	};
	
	exports["default"] = consts;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _constsJs = __webpack_require__(4);
	
	var _constsJs2 = _interopRequireDefault(_constsJs);
	
	var Player = (function () {
		function Player(posX, posY) {
			_classCallCheck(this, Player);
	
			this.x = posX;
			this.y = posY;
			this.vy = 0;
		}
	
		_createClass(Player, [{
			key: "step",
			value: function step(events) {
				// Actualizo posición X según teclado
				if (events.direction === _constsJs2["default"].MOVE_EVTS.LEFT) {
					this.lastDirection = _constsJs2["default"].MOVE_EVTS.LEFT;
					this.x -= _constsJs2["default"].VX;
				} else if (events.direction === _constsJs2["default"].MOVE_EVTS.RIGHT) {
					this.lastDirection = _constsJs2["default"].MOVE_EVTS.RIGHT;
					this.x += _constsJs2["default"].VX;
				}
	
				// Actualizo velocidad según gravedad
				if (this.vy < _constsJs2["default"].VY_MAX) this.vy += _constsJs2["default"].GRAVITY;
	
				// Actualizo posición Y según velocidad
				this.y += this.vy;
			}
		}]);
	
		return Player;
	})();
	
	exports["default"] = Player;
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var marked0$0 = [generatePlatform].map(regeneratorRuntime.mark);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _constsJs = __webpack_require__(4);
	
	var _constsJs2 = _interopRequireDefault(_constsJs);
	
	var Platform = function Platform(posX, posY, width, heigth) {
		_classCallCheck(this, Platform);
	
		this.x = posX;
		this.y = posY;
		this.width = width;
		this.heigth = heigth;
	};
	
	function generatePlatform() {
		var fy, x;
		return regeneratorRuntime.wrap(function generatePlatform$(context$1$0) {
			while (1) switch (context$1$0.prev = context$1$0.next) {
				case 0:
					fy = _constsJs2["default"].FIRST_PLATFORM_Y;
	
				case 1:
					if (false) {
						context$1$0.next = 8;
						break;
					}
	
					x = Math.random() * _constsJs2["default"].PLATFORM_RANGE_X;
	
					fy -= Math.random() * _constsJs2["default"].PLATFORM_MARGIN_Y;
					context$1$0.next = 6;
					return new Platform(x, fy, _constsJs2["default"].PLATFORM_WIDTH, _constsJs2["default"].PLATFORM_HEIGHT);
	
				case 6:
					context$1$0.next = 1;
					break;
	
				case 8:
				case "end":
					return context$1$0.stop();
			}
		}, marked0$0[0], this);
	}
	
	Platform.generatePlatform = generatePlatform;
	
	exports["default"] = Platform;
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _constsJs = __webpack_require__(4);
	
	var _constsJs2 = _interopRequireDefault(_constsJs);
	
	var _playerJs = __webpack_require__(5);
	
	var _playerJs2 = _interopRequireDefault(_playerJs);
	
	var _platformJs = __webpack_require__(6);
	
	var _platformJs2 = _interopRequireDefault(_platformJs);
	
	var Logic = (function () {
		function Logic() {
			_classCallCheck(this, Logic);
	
			this.maxScore = 0;
			this.player = new _playerJs2["default"](_constsJs2["default"].CANVAS_WIDTH / 2 - _constsJs2["default"].PLAYER_WITH / 2, _constsJs2["default"].CANVAS_HEIGHT - _constsJs2["default"].PLAYER_HEIGHT);
			this.platforms = [];
			this.platformGenerator = _platformJs2["default"].generatePlatform();
		}
	
		_createClass(Logic, [{
			key: "createPlatforms",
			value: function createPlatforms() {
				if (this.platforms.length === 0 || this.platforms.slice(-1)[0].y > this.player.y - _constsJs2["default"].CANVAS_HEIGHT) {
					var platform = this.platformGenerator.next().value;
					console.debug(platform);
					this.platforms.push(platform);
				}
			}
		}, {
			key: "checkJumpCollision",
			value: function checkJumpCollision() {
				if (this.player.vy > 0) {
					// Colisiona suelo salta
					if (this.player.y + _constsJs2["default"].PLAYER_HEIGHT >= _constsJs2["default"].PLAYER_BOTTOM) {
						return true;
					}
	
					// Colisiona plataforma salta
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;
	
					try {
						for (var _iterator = this.platforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var platform = _step.value;
	
							if (this.checkCollisionPlayerWithPlatform(this.player, platform)) {
								return true;
							}
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				}
	
				return false;
			}
		}, {
			key: "checkCollisionPlayerWithPlatform",
			value: function checkCollisionPlayerWithPlatform(player, platform) {
				return (player.x >= platform.x && player.x <= platform.x + _constsJs2["default"].PLATFORM_WIDTH || player.x + _constsJs2["default"].PLAYER_WITH >= platform.x && player.x + _constsJs2["default"].PLAYER_WITH <= platform.x + _constsJs2["default"].PLATFORM_WIDTH) && player.y + _constsJs2["default"].PLAYER_HEIGHT >= platform.y && player.y + _constsJs2["default"].PLAYER_HEIGHT <= platform.y + _constsJs2["default"].PLATFORM_HEIGHT;
			}
		}, {
			key: "updateScore",
			value: function updateScore() {
				this.maxScore = Math.min(this.maxScore, this.player.y - _constsJs2["default"].CANVAS_HEIGHT);
			}
		}, {
			key: "step",
			value: function step(events) {
				this.createPlatforms();
	
				if (this.checkJumpCollision(this.player)) {
					this.player.vy = _constsJs2["default"].V_JUMP;
				}
	
				this.player.step(events);
				this.updateScore();
			}
		}]);
	
		return Logic;
	})();
	
	exports["default"] = Logic;
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _constsJs = __webpack_require__(4);
	
	var _constsJs2 = _interopRequireDefault(_constsJs);
	
	var Graphics = (function () {
		function Graphics(logic, graphicContext) {
			_classCallCheck(this, Graphics);
	
			this.camera = 0;
			this.logic = logic;
			this.graphicContext = graphicContext;
		}
	
		_createClass(Graphics, [{
			key: "clear",
			value: function clear() {
				this.graphicContext.clearRect(0, 0, _constsJs2["default"].CANVAS_WIDTH, _constsJs2["default"].CANVAS_HEIGHT);
			}
		}, {
			key: "draw",
			value: function draw() {
				this.clear();
				this.updateCamera();
	
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = this.logic.platforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var platform = _step.value;
	
						this.drawPlatform(platform);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				this.drawPlayer(this.logic.player);
				this.drawScore();
			}
		}, {
			key: "updateCamera",
			value: function updateCamera() {
				if (this.logic.player.y < _constsJs2["default"].SKYLINE + this.camera) {
					this.camera = this.logic.player.y - _constsJs2["default"].SKYLINE;
				}
	
				if (this.logic.player.y + _constsJs2["default"].PLAYER_HEIGHT > _constsJs2["default"].CANVAS_HEIGHT + this.camera) {
					this.camera = this.logic.player.y + _constsJs2["default"].PLAYER_HEIGHT - _constsJs2["default"].CANVAS_HEIGHT;
				}
			}
		}, {
			key: "drawScore",
			value: function drawScore() {
				this.graphicContext.font = "30px Verdana";
	
				// Create gradient
				var gradient = this.graphicContext.createLinearGradient(0, 0, 300, 0);
				gradient.addColorStop("0", "magenta");
				gradient.addColorStop("0.5", "blue");
				gradient.addColorStop("1.0", "red");
	
				// Fill with gradient
				this.graphicContext.fillStyle = gradient;
				this.graphicContext.fillText("Max Height! " + -this.logic.maxScore.toFixed(0), 10, 40);
			}
		}, {
			key: "drawPlatform",
			value: function drawPlatform(plataforma) {
				this.graphicContext.drawImage(_constsJs2["default"].BRICK_IMG, plataforma.x, plataforma.y - this.camera);
			}
		}, {
			key: "drawPlayer",
			value: function drawPlayer(player) {
				var img = player.lastDirection === _constsJs2["default"].MOVE_EVTS.LEFT ? _constsJs2["default"].PLEFT_IMG : _constsJs2["default"].PRIGHT_IMG;
				this.graphicContext.drawImage(img, player.x - _constsJs2["default"].PLAYER_COLLISION_PADDING, player.y - this.camera);
			}
		}, {
			key: "drawRectangle",
			value: function drawRectangle(x, y, width, height, color) {
				this.graphicContext.beginPath();
				this.graphicContext.fillStyle = color;
				this.graphicContext.rect(x, y, width, height);
				this.graphicContext.fillRect(x, y, width, height);
				this.graphicContext.stroke();
			}
		}]);
	
		return Graphics;
	})();
	
	exports["default"] = Graphics;
	module.exports = exports["default"];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDYzNjg4MmNiNzExZWJjZmVmN2EiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL2dhbWUvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9nYW1lL2NvbnN0cy5qcyIsIndlYnBhY2s6Ly8vLi9nYW1lL3BsYXllci5qcyIsIndlYnBhY2s6Ly8vLi9nYW1lL3BsYXRmb3JtLmpzIiwid2VicGFjazovLy8uL2dhbWUvbG9naWMuanMiLCJ3ZWJwYWNrOi8vLy4vZ2FtZS9ncmFwaGljcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZCxNQUFLO0FBQ0wsZUFBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQyxXQUFXO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTs7QUFFQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQSxhQUFZO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0NBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBOztBQUVBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsWUFBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0EsK0NBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQSwrQ0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQSwrQ0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaHBCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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LENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdEMsUUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDOUMsUUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEQsUUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3Qjs7O1NBM0VJLFFBQVE7OztzQkE4RUMsUUFBUSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQ2MzY4ODJjYjcxMWViY2ZlZjdhXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9tYXN0ZXIvTElDRU5TRSBmaWxlLiBBblxuICogYWRkaXRpb25hbCBncmFudCBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluXG4gKiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgaXRlcmF0b3JTeW1ib2wgPVxuICAgIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZSgob3V0ZXJGbiB8fCBHZW5lcmF0b3IpLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID0gR2VuZXJhdG9yLnByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgdmFsdWUgaW5zdGFuY2VvZiBBd2FpdEFyZ3VtZW50YCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC4gU29tZSBtYXkgY29uc2lkZXIgdGhlIG5hbWUgb2YgdGhpcyBtZXRob2QgdG9vXG4gIC8vIGN1dGVzeSwgYnV0IHRoZXkgYXJlIGN1cm11ZGdlb25zLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIG5ldyBBd2FpdEFyZ3VtZW50KGFyZyk7XG4gIH07XG5cbiAgZnVuY3Rpb24gQXdhaXRBcmd1bWVudChhcmcpIHtcbiAgICB0aGlzLmFyZyA9IGFyZztcbiAgfVxuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgLy8gVGhpcyBpbnZva2UgZnVuY3Rpb24gaXMgd3JpdHRlbiBpbiBhIHN0eWxlIHRoYXQgYXNzdW1lcyBzb21lXG4gICAgLy8gY2FsbGluZyBmdW5jdGlvbiAob3IgUHJvbWlzZSkgd2lsbCBoYW5kbGUgZXhjZXB0aW9ucy5cbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbbWV0aG9kXShhcmcpO1xuICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgQXdhaXRBcmd1bWVudFxuICAgICAgICA/IFByb21pc2UucmVzb2x2ZSh2YWx1ZS5hcmcpLnRoZW4oaW52b2tlTmV4dCwgaW52b2tlVGhyb3cpXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBob3dldmVyLCB0aGVcbiAgICAgICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgICAgICAvLyByZWFzb24uIE5vdGUgdGhhdCByZWplY3Rpb25zIG9mIHlpZWxkZWQgUHJvbWlzZXMgYXJlIG5vdFxuICAgICAgICAgICAgLy8gdGhyb3duIGJhY2sgaW50byB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBhcyBpcyB0aGUgY2FzZVxuICAgICAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAgICAgLy8gYmVoYXZpb3IgYmV0d2VlbiB5aWVsZCBhbmQgYXdhaXQgaXMgaW1wb3J0YW50LCBiZWNhdXNlIGl0XG4gICAgICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbnN1bWVyIHRvIGRlY2lkZSB3aGF0IHRvIGRvIHdpdGggdGhlIHlpZWxkZWRcbiAgICAgICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBnZW5lcmF0b3IsIGFiYW5kb24gaXRlcmF0aW9uLCB3aGF0ZXZlcikuIFdpdGhcbiAgICAgICAgICAgIC8vIGF3YWl0LCBieSBjb250cmFzdCwgdGhlcmUgaXMgbm8gb3Bwb3J0dW5pdHkgdG8gZXhhbWluZSB0aGVcbiAgICAgICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgICAgIC8vIG9ubHkgb3B0aW9uIGlzIHRvIHRocm93IGl0IGZyb20gdGhlIGF3YWl0IGV4cHJlc3Npb24sIGFuZFxuICAgICAgICAgICAgLy8gbGV0IHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24gaGFuZGxlIHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiBwcm9jZXNzLmRvbWFpbikge1xuICAgICAgaW52b2tlID0gcHJvY2Vzcy5kb21haW4uYmluZChpbnZva2UpO1xuICAgIH1cblxuICAgIHZhciBpbnZva2VOZXh0ID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcIm5leHRcIik7XG4gICAgdmFyIGludm9rZVRocm93ID0gaW52b2tlLmJpbmQoZ2VuZXJhdG9yLCBcInRocm93XCIpO1xuICAgIHZhciBpbnZva2VSZXR1cm4gPSBpbnZva2UuYmluZChnZW5lcmF0b3IsIFwicmV0dXJuXCIpO1xuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIGludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgcmVzb2x2ZShjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICBpZiAobWV0aG9kID09PSBcInJldHVyblwiIHx8XG4gICAgICAgICAgICAgIChtZXRob2QgPT09IFwidGhyb3dcIiAmJiBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdID09PSB1bmRlZmluZWQpKSB7XG4gICAgICAgICAgICAvLyBBIHJldHVybiBvciB0aHJvdyAod2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIHRocm93XG4gICAgICAgICAgICAvLyBtZXRob2QpIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgICB2YXIgcmV0dXJuTWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl07XG4gICAgICAgICAgICBpZiAocmV0dXJuTWV0aG9kKSB7XG4gICAgICAgICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChyZXR1cm5NZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBhcmcpO1xuICAgICAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSByZXR1cm4gbWV0aG9kIHRocmV3IGFuIGV4Y2VwdGlvbiwgbGV0IHRoYXRcbiAgICAgICAgICAgICAgICAvLyBleGNlcHRpb24gcHJldmFpbCBvdmVyIHRoZSBvcmlnaW5hbCByZXR1cm4gb3IgdGhyb3cuXG4gICAgICAgICAgICAgICAgbWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgICAgICAgIGFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgICAgICAvLyBDb250aW51ZSB3aXRoIHRoZSBvdXRlciByZXR1cm4sIG5vdyB0aGF0IHRoZSBkZWxlZ2F0ZVxuICAgICAgICAgICAgICAvLyBpdGVyYXRvciBoYXMgYmVlbiB0ZXJtaW5hdGVkLlxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goXG4gICAgICAgICAgICBkZWxlZ2F0ZS5pdGVyYXRvclttZXRob2RdLFxuICAgICAgICAgICAgZGVsZWdhdGUuaXRlcmF0b3IsXG4gICAgICAgICAgICBhcmdcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBMaWtlIHJldHVybmluZyBnZW5lcmF0b3IudGhyb3codW5jYXVnaHQpLCBidXQgd2l0aG91dCB0aGVcbiAgICAgICAgICAgIC8vIG92ZXJoZWFkIG9mIGFuIGV4dHJhIGZ1bmN0aW9uIGNhbGwuXG4gICAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgICBhcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGVsZWdhdGUgZ2VuZXJhdG9yIHJhbiBhbmQgaGFuZGxlZCBpdHMgb3duIGV4Y2VwdGlvbnMgc29cbiAgICAgICAgICAvLyByZWdhcmRsZXNzIG9mIHdoYXQgdGhlIG1ldGhvZCB3YXMsIHdlIGNvbnRpbnVlIGFzIGlmIGl0IGlzXG4gICAgICAgICAgLy8gXCJuZXh0XCIgd2l0aCBhbiB1bmRlZmluZWQgYXJnLlxuICAgICAgICAgIG1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcbiAgICAgICAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAgICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcbiAgICAgICAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICBjb250ZXh0Ll9zZW50ID0gYXJnO1xuXG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNlbnQgPSBhcmc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oYXJnKSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgICBtZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICAgIGFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBhcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIHZhciBpbmZvID0ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGlmIChjb250ZXh0LmRlbGVnYXRlICYmIG1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICAgICAgICBhcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpbmZvO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBtZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgdGhpcy5zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuICAgICAgICByZXR1cm4gISFjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEFtb25nIHRoZSB2YXJpb3VzIHRyaWNrcyBmb3Igb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWxcbiAgLy8gb2JqZWN0LCB0aGlzIHNlZW1zIHRvIGJlIHRoZSBtb3N0IHJlbGlhYmxlIHRlY2huaXF1ZSB0aGF0IGRvZXMgbm90XG4gIC8vIHVzZSBpbmRpcmVjdCBldmFsICh3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeSkuXG4gIHR5cGVvZiBnbG9iYWwgPT09IFwib2JqZWN0XCIgPyBnbG9iYWwgOlxuICB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiID8gd2luZG93IDpcbiAgdHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgPyBzZWxmIDogdGhpc1xuKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgY29uc3RzIGZyb20gXCIuL2NvbnN0cy5qc1wiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllci5qc1wiO1xyXG5pbXBvcnQgUGxhdGZvcm0gZnJvbSBcIi4vcGxhdGZvcm0uanNcIjtcclxuaW1wb3J0IExvZ2ljIGZyb20gXCIuL2xvZ2ljLmpzXCI7XHJcbmltcG9ydCBHcmFwaGljcyBmcm9tIFwiLi9ncmFwaGljcy5qc1wiO1xyXG5cclxuLy8gcmVxdWVzdEFuaW1GcmFtZXcgcG9saWZpbGxcclxud2luZG93LnJlcXVlc3RBbmltRnJhbWUgPSAoZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuXHRcdHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuXHRcdGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblx0XHR3aW5kb3cuc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcclxuXHRcdH07XHJcblx0fSkoKTtcclxuXHJcbi8vIEFub255bW91cyBmdW5jdGlvbiBhdXRvY2FsbFxyXG4oZnVuY3Rpb24gKClcclxue1x0XHJcblx0Ly8gR2FtZSBpbml0aWFsaXphdGlvblxyXG5cdGxldCBrZXlwcmVzc2VkLCBcclxuXHRcdG1vdmVMZWZ0LFxyXG5cdFx0bW92ZVJpZ2h0LFxyXG5cdFx0Y2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lXCIpLCBcclxuXHRcdGxvZ2ljID0gbmV3IExvZ2ljKCksIFxyXG5cdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksXHJcblx0XHRncmFwaGljcyA9IG5ldyBHcmFwaGljcyhsb2dpYywgY29udGV4dCk7XHJcblx0XHRcclxuXHRjYW52YXMud2lkdGggPSBjb25zdHMuQ0FOVkFTX1dJRFRIO1xyXG5cdGNhbnZhcy5oZWlnaHQgPSBjb25zdHMuQ0FOVkFTX0hFSUdIVDtcclxuXHRcclxuXHQvLyBVc2VyIGFjdGlvbnNcclxuXHRkb2N1bWVudC5vbmtleWRvd24gPSAoZXYpID0+IHsga2V5cHJlc3NlZCA9IGV2LmtleUNvZGU7IH07XHJcblx0ZG9jdW1lbnQub25rZXl1cCA9IChldikgPT4ge1xyXG5cdFx0XHJcblx0XHRpZiAoZXYua2V5Q29kZSA9PSBrZXlwcmVzc2VkKVxyXG5cdFx0XHRrZXlwcmVzc2VkID0gMDtcclxuXHR9O1xyXG5cdFxyXG5cdGZ1bmN0aW9uIG9uVG91Y2goZXZ0KSB7XHJcblx0XHRldnQucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFxyXG5cdFx0dmFyIHRvdWNoID0gZXZ0LmNoYW5nZWRUb3VjaGVzWzBdO1xyXG5cdFx0aWYgKHRvdWNoKVxyXG5cdFx0e1xyXG5cdFx0XHRzd2l0Y2ggKGV2dC50eXBlKSB7XHJcblx0XHRcdFx0Y2FzZSBcInRvdWNoc3RhcnRcIjogXHJcblx0XHRcdFx0XHRtb3ZlTGVmdCA9IHRvdWNoLnBhZ2VYIDw9IGNvbnN0cy5DQU5WQVNfV0lEVEgvMjtcclxuXHRcdFx0XHRcdG1vdmVSaWdodCA9IHRvdWNoLnBhZ2VZID4gY29uc3RzLkNBTlZBU19XSURUSC8yO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0Y2FzZSBcInRvdWNoZW5kXCI6ICAgICAgICBcclxuXHRcdFx0XHRcdG1vdmVMZWZ0ID0gbW92ZVJpZ2h0ID0gZmFsc2U7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Ub3VjaCwgZmFsc2UpO1xyXG5cdGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgb25Ub3VjaCwgZmFsc2UpO1xyXG5cdFxyXG5cclxuXHQvLyBHYW1lIGxvb3AgdXNpbmcgcmVxdWVzdEFuaW1GcmFtZVxyXG5cdGZ1bmN0aW9uIG1haW5TdGVwKClcclxuXHR7XHJcblx0XHRsZXQgZXZlbnRzID0ge1xyXG5cdFx0XHRkaXJlY3Rpb246IChrZXlwcmVzc2VkID09PSA2NSB8fCBtb3ZlTGVmdCkgPyBjb25zdHMuTU9WRV9FVlRTLkxFRlQgOiBcclxuXHRcdFx0XHRcdChrZXlwcmVzc2VkID09PSA2OCB8fCBtb3ZlUmlnaHQpID8gY29uc3RzLk1PVkVfRVZUUy5SSUdIVCA6IFxyXG5cdFx0XHRcdFx0bnVsbFxyXG5cdFx0fTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0bG9naWMuc3RlcChldmVudHMpO1xyXG5cdFx0Z3JhcGhpY3MuZHJhdygpO1xyXG5cdFxyXG5cdFx0d2luZG93LnJlcXVlc3RBbmltRnJhbWUobWFpblN0ZXApO1xyXG5cdH1cclxuXHRcclxuXHRtYWluU3RlcCgpO1xyXG5cdFxyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZ2FtZS9pbml0LmpzXG4gKiovIiwiY29uc3QgcyA9ICgoTWF0aC5yYW5kb20oKSo0ICsgMSkudG9GaXhlZCgwKSk7XHJcbmNvbnN0IFBMRUZUX0lNRyA9IG5ldyBJbWFnZSgpO1xyXG5QTEVGVF9JTUcuc3JjID0gYHJlc291cmNlcy9zcHJpdGVzJHtzfS9wbGVmdC5wbmdgO1xyXG5cclxuY29uc3QgUFJJR0hUX0lNRyA9IG5ldyBJbWFnZSgpO1xyXG5QUklHSFRfSU1HLnNyYyA9IGByZXNvdXJjZXMvc3ByaXRlcyR7c30vcHJpZ2h0LnBuZ2A7XHJcblxyXG5jb25zdCBCUklDS19JTUcgPSBuZXcgSW1hZ2UoKTtcclxuQlJJQ0tfSU1HLnNyYyA9IGByZXNvdXJjZXMvc3ByaXRlcyR7c30vYnJpY2sucG5nYDtcclxuXHJcbmNvbnN0IGNvbnN0cyA9IHtcclxuIENBTlZBU19XSURUSDogNjQwLFxyXG4gQ0FOVkFTX0hFSUdIVDogMTAyNCxcclxuIEdSQVZJVFk6IDEuMTAsXHJcbiBWX0pVTVA6IC0yNCxcclxuIFZYOiA2LFxyXG4gUExBWUVSX1dJVEg6IDU1LFxyXG4gUExBWUVSX0hFSUdIVDogMTI0LFxyXG4gUExBVEZPUk1fSEVJR0hUOiAzNCxcclxuIFBMQVRGT1JNX1dJRFRIOiAxMTYsXHJcbiBQTEFZRVJfQk9UVE9NOiAxMDI0LFxyXG4gUExBWUVSX0NPTExJU0lPTl9QQURESU5HOiAzNCxcclxuIFZZX01BWDogMjYsXHJcbiBTS1lMSU5FOiA0NTAsXHJcbiBNT1ZFX0VWVFM6IHsgTEVGVDogU3ltYm9sKFwibW92ZSBsZWZ0XCIpLCBSSUdIVDogU3ltYm9sKFwibW92ZSByaWdodFwiKSAgfSxcclxuIEZJUlNUX1BMQVRGT1JNX1k6IDEwMDAsXHJcbiBQTEFURk9STV9NQVJHSU5fWTogMjAwLFxyXG4gUExBVEZPUk1fUkFOR0VfWDogNTAwLFxyXG4gXHJcbiAvLyBFUzYgRmVhdHVyZTogQXV0b3Jlc29sdmVzIGNyZWF0ZXMgYSBwcm9wZXJ0eSB3aXRoIHRoZSBzYW1lIG5hbWUgYW5kIHZhbHVlIHRoYW4gdGhlIGNvbnN0cyBkZWNsYXJlZCBhdCB0aGUgdG9wXHJcbiBQTEVGVF9JTUcsXHJcbiBQUklHSFRfSU1HLFxyXG4gQlJJQ0tfSU1HXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25zdHM7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2dhbWUvY29uc3RzLmpzXG4gKiovIiwiaW1wb3J0IGNvbnN0cyAgZnJvbSBcIi4vY29uc3RzLmpzXCJcclxuXHJcbmNsYXNzIFBsYXllclxyXG57XHJcblx0Y29uc3RydWN0b3IocG9zWCwgcG9zWSlcclxuXHR7XHJcblx0XHR0aGlzLnggPSBwb3NYO1xyXG5cdFx0dGhpcy55ID0gcG9zWTtcclxuXHRcdHRoaXMudnkgPSAwO1xyXG5cdH1cclxuXHRcclxuXHRzdGVwKGV2ZW50cylcclxuXHR7XHJcblx0XHQvLyBBY3R1YWxpem8gcG9zaWNpw7NuIFggc2Vnw7puIHRlY2xhZG9cclxuXHRcdGlmIChldmVudHMuZGlyZWN0aW9uID09PSBjb25zdHMuTU9WRV9FVlRTLkxFRlQpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMubGFzdERpcmVjdGlvbiA9IGNvbnN0cy5NT1ZFX0VWVFMuTEVGVDtcclxuXHRcdFx0dGhpcy54IC09IGNvbnN0cy5WWDtcclxuXHRcdH0gZWxzZSBpZiAoZXZlbnRzLmRpcmVjdGlvbiA9PT0gY29uc3RzLk1PVkVfRVZUUy5SSUdIVClcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5sYXN0RGlyZWN0aW9uID0gY29uc3RzLk1PVkVfRVZUUy5SSUdIVDtcclxuXHRcdFx0dGhpcy54ICs9IGNvbnN0cy5WWDtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0XHJcblx0XHQvLyBBY3R1YWxpem8gdmVsb2NpZGFkIHNlZ8O6biBncmF2ZWRhZFxyXG5cdFx0aWYgKHRoaXMudnkgPCBjb25zdHMuVllfTUFYKVxyXG5cdFx0XHR0aGlzLnZ5ICs9IGNvbnN0cy5HUkFWSVRZO1xyXG5cdFx0XHJcblx0XHQvLyBBY3R1YWxpem8gcG9zaWNpw7NuIFkgc2Vnw7puIHZlbG9jaWRhZFxyXG5cdFx0dGhpcy55ICs9IHRoaXMudnk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9nYW1lL3BsYXllci5qc1xuICoqLyIsImltcG9ydCBjb25zdHMgZnJvbSBcIi4vY29uc3RzLmpzXCJcclxuXHJcbmNsYXNzIFBsYXRmb3JtXHJcbntcclxuXHRjb25zdHJ1Y3Rvcihwb3NYLCBwb3NZLCB3aWR0aCwgaGVpZ3RoKVxyXG5cdHtcclxuXHRcdHRoaXMueCA9IHBvc1g7XHJcblx0XHR0aGlzLnkgPSBwb3NZO1xyXG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xyXG5cdFx0dGhpcy5oZWlndGggPSBoZWlndGg7XHJcblx0XHRcclxuXHRcdFxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gKiBnZW5lcmF0ZVBsYXRmb3JtKClcclxue1xyXG5cdHZhciBmeSA9IGNvbnN0cy5GSVJTVF9QTEFURk9STV9ZO1xyXG5cdHdoaWxlKHRydWUpXHJcblx0e1xyXG5cdFx0dmFyIHggPSBNYXRoLnJhbmRvbSgpICogY29uc3RzLlBMQVRGT1JNX1JBTkdFX1g7XHJcblx0XHRmeSAtPSBNYXRoLnJhbmRvbSgpICogY29uc3RzLlBMQVRGT1JNX01BUkdJTl9ZO1xyXG5cdFx0eWllbGQgbmV3IFBsYXRmb3JtKHgsIGZ5LCBjb25zdHMuUExBVEZPUk1fV0lEVEgsIGNvbnN0cy5QTEFURk9STV9IRUlHSFQpO1xyXG5cdH1cclxufVxyXG5cclxuUGxhdGZvcm0uZ2VuZXJhdGVQbGF0Zm9ybSA9IGdlbmVyYXRlUGxhdGZvcm07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF0Zm9ybVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZ2FtZS9wbGF0Zm9ybS5qc1xuICoqLyIsImltcG9ydCBjb25zdHMgZnJvbSBcIi4vY29uc3RzLmpzXCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyLmpzXCI7XHJcbmltcG9ydCBQbGF0Zm9ybSBmcm9tIFwiLi9wbGF0Zm9ybS5qc1wiO1xyXG5cclxuY2xhc3MgTG9naWNcclxue1xyXG5cdGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHR0aGlzLm1heFNjb3JlID0gMDtcclxuXHRcdHRoaXMucGxheWVyID0gbmV3IFBsYXllcihjb25zdHMuQ0FOVkFTX1dJRFRILzIgLSBjb25zdHMuUExBWUVSX1dJVEgvMiwgY29uc3RzLkNBTlZBU19IRUlHSFQgLSBjb25zdHMuUExBWUVSX0hFSUdIVCk7XHJcblx0XHR0aGlzLnBsYXRmb3JtcyA9IFtdO1xyXG5cdFx0dGhpcy5wbGF0Zm9ybUdlbmVyYXRvciA9IFBsYXRmb3JtLmdlbmVyYXRlUGxhdGZvcm0oKTtcclxuXHR9XHJcblx0XHJcblx0Y3JlYXRlUGxhdGZvcm1zKClcclxuXHR7XHJcblx0XHRpZih0aGlzLnBsYXRmb3Jtcy5sZW5ndGggPT09IDAgfHwgdGhpcy5wbGF0Zm9ybXMuc2xpY2UoLTEpWzBdLnkgPiAodGhpcy5wbGF5ZXIueSAtIGNvbnN0cy5DQU5WQVNfSEVJR0hUKSlcclxuXHRcdHtcclxuXHRcdFx0dmFyIHBsYXRmb3JtID0gdGhpcy5wbGF0Zm9ybUdlbmVyYXRvci5uZXh0KCkudmFsdWU7XHJcblx0XHRcdGNvbnNvbGUuZGVidWcocGxhdGZvcm0pO1xyXG5cdFx0XHR0aGlzLnBsYXRmb3Jtcy5wdXNoKHBsYXRmb3JtKTtcclxuXHRcdH0gXHJcblx0fVxyXG5cdFxyXG5cclxuXHRjaGVja0p1bXBDb2xsaXNpb24oKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLnBsYXllci52eSA+IDApXHJcblx0XHR7XHJcblx0XHRcdC8vIENvbGlzaW9uYSBzdWVsbyBzYWx0YVxyXG5cdFx0XHRpZiAodGhpcy5wbGF5ZXIueSArIGNvbnN0cy5QTEFZRVJfSEVJR0hUID49IGNvbnN0cy5QTEFZRVJfQk9UVE9NKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdC8vIENvbGlzaW9uYSBwbGF0YWZvcm1hIHNhbHRhXHJcblx0XHRcdGZvciAobGV0IHBsYXRmb3JtIG9mIHRoaXMucGxhdGZvcm1zKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aWYgKHRoaXMuY2hlY2tDb2xsaXNpb25QbGF5ZXJXaXRoUGxhdGZvcm0odGhpcy5wbGF5ZXIsIHBsYXRmb3JtKSlcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH1cclxuXHRcclxuXHRjaGVja0NvbGxpc2lvblBsYXllcldpdGhQbGF0Zm9ybShwbGF5ZXIsIHBsYXRmb3JtKVxyXG5cdHtcclxuXHRcdHJldHVybiAoKChwbGF5ZXIueCAgPj0gcGxhdGZvcm0ueCBcclxuXHRcdFx0XHRcdCYmIHBsYXllci54IDw9IHBsYXRmb3JtLnggKyBjb25zdHMuUExBVEZPUk1fV0lEVEgpIHx8XHJcblx0XHRcdFx0XHQocGxheWVyLnggKyBjb25zdHMuUExBWUVSX1dJVEggPj0gcGxhdGZvcm0ueCBcclxuXHRcdFx0XHRcdCYmIHBsYXllci54ICsgY29uc3RzLlBMQVlFUl9XSVRIIDw9IHBsYXRmb3JtLnggKyBjb25zdHMuUExBVEZPUk1fV0lEVEgpKVxyXG5cdFx0XHRcdFx0JiYgcGxheWVyLnkgKyBjb25zdHMuUExBWUVSX0hFSUdIVCA+PSBwbGF0Zm9ybS55XHJcblx0XHRcdFx0XHQmJiBwbGF5ZXIueSArIGNvbnN0cy5QTEFZRVJfSEVJR0hUIDw9IHBsYXRmb3JtLnkgKyBjb25zdHMuUExBVEZPUk1fSEVJR0hUKTtcclxuXHR9XHJcblx0XHJcblx0XHJcblx0dXBkYXRlU2NvcmUoKVxyXG5cdHtcclxuXHRcdHRoaXMubWF4U2NvcmUgPSBNYXRoLm1pbih0aGlzLm1heFNjb3JlLCB0aGlzLnBsYXllci55IC0gY29uc3RzLkNBTlZBU19IRUlHSFQpO1xyXG5cdH1cclxuXHRcclxuXHRzdGVwKGV2ZW50cylcclxuXHR7XHJcblx0XHR0aGlzLmNyZWF0ZVBsYXRmb3JtcygpO1xyXG5cdFx0XHJcblx0XHRpZiAodGhpcy5jaGVja0p1bXBDb2xsaXNpb24odGhpcy5wbGF5ZXIpKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLnBsYXllci52eSA9IGNvbnN0cy5WX0pVTVA7XHJcblx0XHR9XHJcblx0XHJcblx0XHR0aGlzLnBsYXllci5zdGVwKGV2ZW50cyk7XHJcblx0XHR0aGlzLnVwZGF0ZVNjb3JlKCk7XHJcblx0fVx0XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExvZ2ljXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9nYW1lL2xvZ2ljLmpzXG4gKiovIiwiaW1wb3J0IGNvbnN0cyBmcm9tIFwiLi9jb25zdHMuanNcIjtcclxuIFxyXG5jbGFzcyBHcmFwaGljc1xyXG57XHJcblx0Y29uc3RydWN0b3IobG9naWMsIGdyYXBoaWNDb250ZXh0KVxyXG5cdHtcclxuXHRcdHRoaXMuY2FtZXJhID0gMDtcclxuXHRcdHRoaXMubG9naWMgPSBsb2dpYztcclxuXHRcdHRoaXMuZ3JhcGhpY0NvbnRleHQgPSBncmFwaGljQ29udGV4dDtcclxuXHR9XHJcblx0XHJcblx0Y2xlYXIoKSBcclxuXHR7XHJcblx0XHR0aGlzLmdyYXBoaWNDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBjb25zdHMuQ0FOVkFTX1dJRFRILCBjb25zdHMuQ0FOVkFTX0hFSUdIVCk7XHJcblx0fVxyXG5cdFxyXG5cdGRyYXcoKVxyXG5cdHtcclxuXHRcdHRoaXMuY2xlYXIoKTtcclxuXHRcdHRoaXMudXBkYXRlQ2FtZXJhKCk7XHJcblx0XHRcclxuXHRcdGZvciAodmFyIHBsYXRmb3JtIG9mIHRoaXMubG9naWMucGxhdGZvcm1zKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmRyYXdQbGF0Zm9ybShwbGF0Zm9ybSk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHRoaXMuZHJhd1BsYXllcih0aGlzLmxvZ2ljLnBsYXllcik7XHJcblx0XHR0aGlzLmRyYXdTY29yZSgpO1xyXG5cdH1cclxuXHRcclxuXHR1cGRhdGVDYW1lcmEoKVxyXG5cdHtcclxuXHRcdGlmICh0aGlzLmxvZ2ljLnBsYXllci55IDwgY29uc3RzLlNLWUxJTkUgKyB0aGlzLmNhbWVyYSlcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5jYW1lcmEgPSB0aGlzLmxvZ2ljLnBsYXllci55IC0gY29uc3RzLlNLWUxJTkU7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmxvZ2ljLnBsYXllci55ICsgY29uc3RzLlBMQVlFUl9IRUlHSFQgPiBjb25zdHMuQ0FOVkFTX0hFSUdIVCArIHRoaXMuY2FtZXJhKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNhbWVyYSA9IHRoaXMubG9naWMucGxheWVyLnkgKyAgY29uc3RzLlBMQVlFUl9IRUlHSFQgLSBjb25zdHMuQ0FOVkFTX0hFSUdIVDtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0XHJcblx0ZHJhd1Njb3JlKClcclxuXHR7XHJcblx0XHR0aGlzLmdyYXBoaWNDb250ZXh0LmZvbnQgPSBcIjMwcHggVmVyZGFuYVwiO1xyXG5cdFx0XHJcblx0XHQvLyBDcmVhdGUgZ3JhZGllbnRcclxuXHRcdHZhciBncmFkaWVudD0gdGhpcy5ncmFwaGljQ29udGV4dC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAzMDAsIDApO1xyXG5cdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKFwiMFwiLCBcIm1hZ2VudGFcIik7XHJcblx0XHRncmFkaWVudC5hZGRDb2xvclN0b3AoXCIwLjVcIiwgXCJibHVlXCIpO1xyXG5cdFx0Z3JhZGllbnQuYWRkQ29sb3JTdG9wKFwiMS4wXCIsIFwicmVkXCIpO1xyXG5cdFx0XHJcblx0XHQvLyBGaWxsIHdpdGggZ3JhZGllbnRcclxuXHRcdHRoaXMuZ3JhcGhpY0NvbnRleHQuZmlsbFN0eWxlPWdyYWRpZW50O1xyXG5cdFx0dGhpcy5ncmFwaGljQ29udGV4dC5maWxsVGV4dChgTWF4IEhlaWdodCEgJHstdGhpcy5sb2dpYy5tYXhTY29yZS50b0ZpeGVkKDApfWAgLCAxMCwgNDApO1xyXG5cdH1cclxuXHRcclxuXHRkcmF3UGxhdGZvcm0ocGxhdGFmb3JtYSlcclxuXHR7XHJcblx0XHR0aGlzLmdyYXBoaWNDb250ZXh0LmRyYXdJbWFnZShjb25zdHMuQlJJQ0tfSU1HLCBwbGF0YWZvcm1hLngsIHBsYXRhZm9ybWEueSAtIHRoaXMuY2FtZXJhKTtcclxuXHR9XHJcblx0XHJcblx0ZHJhd1BsYXllcihwbGF5ZXIpXHJcblx0e1xyXG5cdFx0bGV0IGltZyA9IHBsYXllci5sYXN0RGlyZWN0aW9uID09PSBjb25zdHMuTU9WRV9FVlRTLkxFRlQgPyBjb25zdHMuUExFRlRfSU1HIDogY29uc3RzLlBSSUdIVF9JTUc7XHJcblx0XHR0aGlzLmdyYXBoaWNDb250ZXh0LmRyYXdJbWFnZShpbWcsIHBsYXllci54IC0gY29uc3RzLlBMQVlFUl9DT0xMSVNJT05fUEFERElORywgcGxheWVyLnkgLSB0aGlzLmNhbWVyYSk7XHJcblx0fVxyXG5cdFxyXG5cdGRyYXdSZWN0YW5nbGUoeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IpXHJcblx0e1xyXG5cdFx0dGhpcy5ncmFwaGljQ29udGV4dC5iZWdpblBhdGgoKTtcclxuXHRcdHRoaXMuZ3JhcGhpY0NvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcblx0XHR0aGlzLmdyYXBoaWNDb250ZXh0LnJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcblx0XHR0aGlzLmdyYXBoaWNDb250ZXh0LmZpbGxSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG5cdFx0dGhpcy5ncmFwaGljQ29udGV4dC5zdHJva2UoKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdyYXBoaWNzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZ2FtZS9ncmFwaGljcy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=