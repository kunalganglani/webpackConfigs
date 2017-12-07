/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
function defaultClearTimeout() {
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
})();
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
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
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
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
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
    while (len) {
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(15);
} else {
  module.exports = __webpack_require__(16);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(1);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(5);
  var warning = __webpack_require__(6);
  var ReactPropTypesSecret = __webpack_require__(17);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var emptyFunction = __webpack_require__(1);

/**
 * Upstream version of event listener. Does not take into account specific
 * nature of platform.
 */
var EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  listen: function listen(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove: function remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    }
  },

  /**
   * Listen to DOM events during the capture phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @return {object} Object with a `remove` method.
   */
  capture: function capture(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, true);
      return {
        remove: function remove() {
          target.removeEventListener(eventType, callback, true);
        }
      };
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
      }
      return {
        remove: emptyFunction
      };
    }
  },

  registerDefault: function registerDefault() {}
};

module.exports = EventListener;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */

function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(20);

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * @param {DOMElement} node input/textarea to focus
 */

function focusNode(node) {
  // IE8 can throw "Can't move focus to the control because it is invisible,
  // not enabled, or of a type that does not accept the focus." for all kinds of
  // reasons that are too expensive and fragile to test.
  try {
    node.focus();
  } catch (e) {}
}

module.exports = focusNode;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(18);

var _reactDom2 = _interopRequireDefault(_reactDom);

__webpack_require__(27);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Message = function (_React$Component) {
	_inherits(Message, _React$Component);

	function Message() {
		_classCallCheck(this, Message);

		return _possibleConstructorReturn(this, (Message.__proto__ || Object.getPrototypeOf(Message)).apply(this, arguments));
	}

	_createClass(Message, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h1',
					null,
					this.props.title
				),
				_react2.default.createElement(
					'p',
					null,
					this.props.message
				),
				_react2.default.createElement('div', { id: 'image' })
			);
		}
	}]);

	return Message;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(Message, { title: 'Email Alex', message: 'Can you email him?' }), document.getElementById('react-container'));

// import React from 'react'
// import ReactDOM from 'react-dom'

// const MyComponent = () => <h1>Webpack &amp; React</h1>

// ReactDOM.render(<MyComponent />, document.getElementById('react-container'));

// const arr = ['Javascript', 'Node', 'webpack', 'angular'];
// console.log(arr);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var m = __webpack_require__(2),
    n = __webpack_require__(3),
    p = __webpack_require__(1),
    q = "function" === typeof Symbol && Symbol["for"],
    r = q ? Symbol["for"]("react.element") : 60103,
    t = q ? Symbol["for"]("react.call") : 60104,
    u = q ? Symbol["for"]("react.return") : 60105,
    v = q ? Symbol["for"]("react.portal") : 60106,
    w = q ? Symbol["for"]("react.fragment") : 60107,
    x = "function" === typeof Symbol && Symbol.iterator;
function y(a) {
  for (var b = arguments.length - 1, e = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, c = 0; c < b; c++) {
    e += "\x26args[]\x3d" + encodeURIComponent(arguments[c + 1]);
  }b = Error(e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name = "Invariant Violation";b.framesToPop = 1;throw b;
}
var z = { isMounted: function isMounted() {
    return !1;
  }, enqueueForceUpdate: function enqueueForceUpdate() {}, enqueueReplaceState: function enqueueReplaceState() {}, enqueueSetState: function enqueueSetState() {} };function A(a, b, e) {
  this.props = a;this.context = b;this.refs = n;this.updater = e || z;
}A.prototype.isReactComponent = {};A.prototype.setState = function (a, b) {
  "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a)) && "function" !== typeof a && null != a ? y("85") : void 0;this.updater.enqueueSetState(this, a, b, "setState");
};A.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function B(a, b, e) {
  this.props = a;this.context = b;this.refs = n;this.updater = e || z;
}function C() {}C.prototype = A.prototype;var D = B.prototype = new C();D.constructor = B;m(D, A.prototype);D.isPureReactComponent = !0;function E(a, b, e) {
  this.props = a;this.context = b;this.refs = n;this.updater = e || z;
}var F = E.prototype = new C();F.constructor = E;m(F, A.prototype);F.unstable_isAsyncReactComponent = !0;F.render = function () {
  return this.props.children;
};var G = { current: null },
    H = Object.prototype.hasOwnProperty,
    I = { key: !0, ref: !0, __self: !0, __source: !0 };
function J(a, b, e) {
  var c,
      d = {},
      g = null,
      k = null;if (null != b) for (c in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    H.call(b, c) && !I.hasOwnProperty(c) && (d[c] = b[c]);
  }var f = arguments.length - 2;if (1 === f) d.children = e;else if (1 < f) {
    for (var h = Array(f), l = 0; l < f; l++) {
      h[l] = arguments[l + 2];
    }d.children = h;
  }if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
    void 0 === d[c] && (d[c] = f[c]);
  }return { $$typeof: r, type: a, key: g, ref: k, props: d, _owner: G.current };
}function K(a) {
  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && a.$$typeof === r;
}
function escape(a) {
  var b = { "\x3d": "\x3d0", ":": "\x3d2" };return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}var L = /\/+/g,
    M = [];function N(a, b, e, c) {
  if (M.length) {
    var d = M.pop();d.result = a;d.keyPrefix = b;d.func = e;d.context = c;d.count = 0;return d;
  }return { result: a, keyPrefix: b, func: e, context: c, count: 0 };
}function O(a) {
  a.result = null;a.keyPrefix = null;a.func = null;a.context = null;a.count = 0;10 > M.length && M.push(a);
}
function P(a, b, e, c) {
  var d = typeof a === "undefined" ? "undefined" : _typeof(a);if ("undefined" === d || "boolean" === d) a = null;var g = !1;if (null === a) g = !0;else switch (d) {case "string":case "number":
      g = !0;break;case "object":
      switch (a.$$typeof) {case r:case t:case u:case v:
          g = !0;}}if (g) return e(c, a, "" === b ? "." + Q(a, 0) : b), 1;g = 0;b = "" === b ? "." : b + ":";if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];var f = b + Q(d, k);g += P(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = x && a[x] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) {
    d = d.value, f = b + Q(d, k++), g += P(d, f, e, c);
  } else "object" === d && (e = "" + a, y("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));return g;
}function Q(a, b) {
  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}function R(a, b) {
  a.func.call(a.context, b, a.count++);
}
function S(a, b, e) {
  var c = a.result,
      d = a.keyPrefix;a = a.func.call(a.context, b, a.count++);Array.isArray(a) ? T(a, c, e, p.thatReturnsArgument) : null != a && (K(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(L, "$\x26/") + "/") + e, a = { $$typeof: r, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner }), c.push(a));
}function T(a, b, e, c, d) {
  var g = "";null != e && (g = ("" + e).replace(L, "$\x26/") + "/");b = N(b, g, c, d);null == a || P(a, "", S, b);O(b);
}
var U = { Children: { map: function map(a, b, e) {
      if (null == a) return a;var c = [];T(a, c, null, b, e);return c;
    }, forEach: function forEach(a, b, e) {
      if (null == a) return a;b = N(null, null, b, e);null == a || P(a, "", R, b);O(b);
    }, count: function count(a) {
      return null == a ? 0 : P(a, "", p.thatReturnsNull, null);
    }, toArray: function toArray(a) {
      var b = [];T(a, b, null, p.thatReturnsArgument);return b;
    }, only: function only(a) {
      K(a) ? void 0 : y("143");return a;
    } }, Component: A, PureComponent: B, unstable_AsyncComponent: E, Fragment: w, createElement: J, cloneElement: function cloneElement(a, b, e) {
    var c = m({}, a.props),
        d = a.key,
        g = a.ref,
        k = a._owner;if (null != b) {
      void 0 !== b.ref && (g = b.ref, k = G.current);void 0 !== b.key && (d = "" + b.key);if (a.type && a.type.defaultProps) var f = a.type.defaultProps;for (h in b) {
        H.call(b, h) && !I.hasOwnProperty(h) && (c[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
      }
    }var h = arguments.length - 2;if (1 === h) c.children = e;else if (1 < h) {
      f = Array(h);for (var l = 0; l < h; l++) {
        f[l] = arguments[l + 2];
      }c.children = f;
    }return { $$typeof: r, type: a.type, key: d, ref: g, props: c, _owner: k };
  }, createFactory: function createFactory(a) {
    var b = J.bind(null, a);b.type = a;return b;
  },
  isValidElement: K, version: "16.2.0", __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentOwner: G, assign: m } },
    V = Object.freeze({ default: U }),
    W = V && U || V;module.exports = W["default"] ? W["default"] : W;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.2.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== "production") {
  (function () {
    'use strict';

    var _assign = __webpack_require__(2);
    var emptyObject = __webpack_require__(3);
    var invariant = __webpack_require__(5);
    var warning = __webpack_require__(6);
    var emptyFunction = __webpack_require__(1);
    var checkPropTypes = __webpack_require__(7);

    // TODO: this is special because it gets imported during build.

    var ReactVersion = '16.2.0';

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
    var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
    var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }
      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }
      return null;
    }

    /**
     * WARNING: DO NOT manually require this module.
     * This is a replacement for `invariant(...)` used by the error code system
     * and will _only_ be required by the corresponding babel pass.
     * It always throws.
     */

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var lowPriorityWarning = function lowPriorityWarning() {};

    {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.warn(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function lowPriorityWarning(condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }

    var lowPriorityWarning$1 = lowPriorityWarning;

    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var constructor = publicInstance.constructor;
        var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
        var warningKey = componentName + '.' + callerName;
        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }
        warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }

    /**
     * This is the abstract API for an update queue.
     */
    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function isMounted(publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };

    /**
     * Base class helpers for the updating state of a component.
     */
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};

    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */
    Component.prototype.setState = function (partialState, callback) {
      !((typeof partialState === 'undefined' ? 'undefined' : _typeof(partialState)) === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */
    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };

    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */
    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };
      var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function get() {
            lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };
      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    /**
     * Base class helpers for the updating state of a component.
     */
    function PureComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    function ComponentDummy() {}
    ComponentDummy.prototype = Component.prototype;
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    // Avoid an extra prototype jump for these methods.
    _assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;

    function AsyncComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
    asyncComponentPrototype.constructor = AsyncComponent;
    // Avoid an extra prototype jump for these methods.
    _assign(asyncComponentPrototype, Component.prototype);
    asyncComponentPrototype.unstable_isAsyncReactComponent = true;
    asyncComponentPrototype.render = function () {
      return this.props.children;
    };

    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */
    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };

    var specialPropKeyWarningShown;
    var specialPropRefWarningShown;

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function warnAboutAccessingKey() {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function warnAboutAccessingRef() {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }

    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */
    var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allow us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,

        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,

        // Record the component responsible for creating this element.
        _owner: owner
      };

      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {};

        // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.
        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        });
        // self and source are DEV only properties.
        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        });
        // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.
        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });
        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }

      return element;
    };

    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */
    function createElement(type, config, children) {
      var propName;

      // Reserved names are extracted
      var props = {};

      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;
        // Remaining properties are added to a new props object
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      }

      // Resolve default props
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }
      {
        if (key || ref) {
          if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }

    /**
     * Return a function that produces ReactElements of a given type.
     * See https://reactjs.org/docs/react-api.html#createfactory
     */

    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

      return newElement;
    }

    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */
    function cloneElement(element, config, children) {
      var propName;

      // Original props are copied
      var props = _assign({}, element.props);

      // Reserved names are extracted
      var key = element.key;
      var ref = element.ref;
      // Self is preserved since the owner is preserved.
      var self = element._self;
      // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.
      var source = element._source;

      // Owner will be preserved, unless ref is overridden
      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        // Remaining properties override existing props
        var defaultProps;
        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    }

    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a valid component.
     * @final
     */
    function isValidElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var ReactDebugCurrentFrame = {};

    {
      // Component that is being worked on
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var impl = ReactDebugCurrentFrame.getCurrentStack;
        if (impl) {
          return impl();
        }
        return null;
      };
    }

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';

    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */
    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });

      return '$' + escapedString;
    }

    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */

    var didWarnAboutMaps = false;

    var userProvidedKeyEscapeRegex = /\/+/g;
    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];
    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;
      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }

    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children === 'undefined' ? 'undefined' : _typeof(children);

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;
          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_CALL_TYPE:
              case REACT_RETURN_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }
        }
      }

      if (invokeCallback) {
        callback(traverseContext, children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.
      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);
        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
              didWarnAboutMaps = true;
            }
          }

          var iterator = iteratorFn.call(children);
          var step;
          var ii = 0;
          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }

      return subtreeCount;
    }

    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }

    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */
    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if ((typeof component === 'undefined' ? 'undefined' : _typeof(component)) === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      }
      // Implicit key determined by the index in the set
      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;

      func.call(context, child, bookKeeping.count++);
    }

    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.foreach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */
    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }
      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;

      var mappedChild = func.call(context, child, bookKeeping.count++);
      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }
        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';
      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }
      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.map
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */
    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }

    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.count
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */
    function countChildren(children, context) {
      return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
    }

    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.toarray
     */
    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
      return result;
    }

    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.only
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */
    function onlyChild(children) {
      !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }

    var describeComponentFrame = function describeComponentFrame(name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    function getComponentName(fiber) {
      var type = fiber.type;

      if (typeof type === 'string') {
        return type;
      }
      if (typeof type === 'function') {
        return type.displayName || type.name;
      }
      return null;
    }

    /**
     * ReactElementValidator provides a wrapper around a element factory
     * which validates the props passed to the element. This is intended to be
     * used only in DEV and could be replaced by a static type checker for languages
     * that support it.
     */

    {
      var currentlyValidatingElement = null;

      var propTypesMisspellWarningShown = false;

      var getDisplayName = function getDisplayName(element) {
        if (element == null) {
          return '#empty';
        } else if (typeof element === 'string' || typeof element === 'number') {
          return '#text';
        } else if (typeof element.type === 'string') {
          return element.type;
        } else if (element.type === REACT_FRAGMENT_TYPE) {
          return 'React.Fragment';
        } else {
          return element.type.displayName || element.type.name || 'Unknown';
        }
      };

      var getStackAddendum = function getStackAddendum() {
        var stack = '';
        if (currentlyValidatingElement) {
          var name = getDisplayName(currentlyValidatingElement);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
        }
        stack += ReactDebugCurrentFrame.getStackAddendum() || '';
        return stack;
      };

      var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current);
        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }
      return '';
    }

    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }
      return '';
    }

    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */
    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
        if (parentName) {
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
        }
      }
      return info;
    }

    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */
    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }
      element._store.validated = true;

      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }
      ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

      // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.
      var childOwner = '';
      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
      }

      currentlyValidatingElement = element;
      {
        warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
      }
      currentlyValidatingElement = null;
    }

    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */
    function validateChildKeys(node, parentType) {
      if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') {
        return;
      }
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];
          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);
        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;
            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }

    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */
    function validatePropTypes(element) {
      var componentClass = element.type;
      if (typeof componentClass !== 'function') {
        return;
      }
      var name = componentClass.displayName || componentClass.name;
      var propTypes = componentClass.propTypes;
      if (propTypes) {
        currentlyValidatingElement = element;
        checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
        currentlyValidatingElement = null;
      } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }
      if (typeof componentClass.getDefaultProps === 'function') {
        warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }

    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */
    function validateFragmentProps(fragment) {
      currentlyValidatingElement = fragment;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (!VALID_FRAGMENT_PROPS.has(key)) {
            warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (fragment.ref !== null) {
        warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
      }

      currentlyValidatingElement = null;
    }

    function createElementWithValidation(type, props, children) {
      var validType = typeof type === 'string' || typeof type === 'function' || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'symbol' || typeof type === 'number';
      // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.
      if (!validType) {
        var info = '';
        if (type === undefined || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += getStackAddendum() || '';

        warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type === 'undefined' ? 'undefined' : _typeof(type), info);
      }

      var element = createElement.apply(this, arguments);

      // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.
      if (element == null) {
        return element;
      }

      // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)
      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'symbol' && type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      // Legacy hook TODO: Warn if this is accessed
      validatedFactory.type = type;

      {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function get() {
            lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }

      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }
      validatePropTypes(newElement);
      return newElement;
    }

    var React = {
      Children: {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      },

      Component: Component,
      PureComponent: PureComponent,
      unstable_AsyncComponent: AsyncComponent,

      Fragment: REACT_FRAGMENT_TYPE,

      createElement: createElementWithValidation,
      cloneElement: cloneElementWithValidation,
      createFactory: createFactoryWithValidation,
      isValidElement: isValidElement,

      version: ReactVersion,

      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentOwner: ReactCurrentOwner,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
      }
    };

    {
      _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    }

    var React$2 = Object.freeze({
      default: React
    });

    var React$3 = React$2 && React || React$2;

    // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.
    var react = React$3['default'] ? React$3['default'] : React$3;

    module.exports = react;
  })();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }
  if (process.env.NODE_ENV !== 'production') {
    // This branch is unreachable because this function is only called
    // in production, but the condition is true only in development.
    // Therefore if the branch is still here, dead code elimination wasn't
    // properly applied.
    // Don't change the message. React DevTools relies on it. Also make sure
    // this message doesn't occur elsewhere in this function, or it will cause
    // a false positive.
    throw new Error('^_^');
  }
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (process.env.NODE_ENV === 'production') {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(19);
} else {
  module.exports = __webpack_require__(22);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react-dom.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var aa = __webpack_require__(4),
    l = __webpack_require__(8),
    B = __webpack_require__(2),
    C = __webpack_require__(1),
    ba = __webpack_require__(9),
    da = __webpack_require__(10),
    ea = __webpack_require__(11),
    fa = __webpack_require__(12),
    ia = __webpack_require__(13),
    D = __webpack_require__(3);
function E(a) {
  for (var b = arguments.length - 1, c = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, d = 0; d < b; d++) {
    c += "\x26args[]\x3d" + encodeURIComponent(arguments[d + 1]);
  }b = Error(c + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name = "Invariant Violation";b.framesToPop = 1;throw b;
}aa ? void 0 : E("227");
var oa = { children: !0, dangerouslySetInnerHTML: !0, defaultValue: !0, defaultChecked: !0, innerHTML: !0, suppressContentEditableWarning: !0, suppressHydrationWarning: !0, style: !0 };function pa(a, b) {
  return (a & b) === b;
}
var ta = { MUST_USE_PROPERTY: 1, HAS_BOOLEAN_VALUE: 4, HAS_NUMERIC_VALUE: 8, HAS_POSITIVE_NUMERIC_VALUE: 24, HAS_OVERLOADED_BOOLEAN_VALUE: 32, HAS_STRING_BOOLEAN_VALUE: 64, injectDOMPropertyConfig: function injectDOMPropertyConfig(a) {
    var b = ta,
        c = a.Properties || {},
        d = a.DOMAttributeNamespaces || {},
        e = a.DOMAttributeNames || {};a = a.DOMMutationMethods || {};for (var f in c) {
      ua.hasOwnProperty(f) ? E("48", f) : void 0;var g = f.toLowerCase(),
          h = c[f];g = { attributeName: g, attributeNamespace: null, propertyName: f, mutationMethod: null, mustUseProperty: pa(h, b.MUST_USE_PROPERTY),
        hasBooleanValue: pa(h, b.HAS_BOOLEAN_VALUE), hasNumericValue: pa(h, b.HAS_NUMERIC_VALUE), hasPositiveNumericValue: pa(h, b.HAS_POSITIVE_NUMERIC_VALUE), hasOverloadedBooleanValue: pa(h, b.HAS_OVERLOADED_BOOLEAN_VALUE), hasStringBooleanValue: pa(h, b.HAS_STRING_BOOLEAN_VALUE) };1 >= g.hasBooleanValue + g.hasNumericValue + g.hasOverloadedBooleanValue ? void 0 : E("50", f);e.hasOwnProperty(f) && (g.attributeName = e[f]);d.hasOwnProperty(f) && (g.attributeNamespace = d[f]);a.hasOwnProperty(f) && (g.mutationMethod = a[f]);ua[f] = g;
    }
  } },
    ua = {};
function va(a, b) {
  if (oa.hasOwnProperty(a) || 2 < a.length && ("o" === a[0] || "O" === a[0]) && ("n" === a[1] || "N" === a[1])) return !1;if (null === b) return !0;switch (typeof b === "undefined" ? "undefined" : _typeof(b)) {case "boolean":
      return oa.hasOwnProperty(a) ? a = !0 : (b = wa(a)) ? a = b.hasBooleanValue || b.hasStringBooleanValue || b.hasOverloadedBooleanValue : (a = a.toLowerCase().slice(0, 5), a = "data-" === a || "aria-" === a), a;case "undefined":case "number":case "string":case "object":
      return !0;default:
      return !1;}
}function wa(a) {
  return ua.hasOwnProperty(a) ? ua[a] : null;
}
var xa = ta,
    ya = xa.MUST_USE_PROPERTY,
    K = xa.HAS_BOOLEAN_VALUE,
    za = xa.HAS_NUMERIC_VALUE,
    Aa = xa.HAS_POSITIVE_NUMERIC_VALUE,
    Ba = xa.HAS_OVERLOADED_BOOLEAN_VALUE,
    Ca = xa.HAS_STRING_BOOLEAN_VALUE,
    Da = { Properties: { allowFullScreen: K, async: K, autoFocus: K, autoPlay: K, capture: Ba, checked: ya | K, cols: Aa, contentEditable: Ca, controls: K, "default": K, defer: K, disabled: K, download: Ba, draggable: Ca, formNoValidate: K, hidden: K, loop: K, multiple: ya | K, muted: ya | K, noValidate: K, open: K, playsInline: K, readOnly: K, required: K, reversed: K, rows: Aa, rowSpan: za,
    scoped: K, seamless: K, selected: ya | K, size: Aa, start: za, span: Aa, spellCheck: Ca, style: 0, tabIndex: 0, itemScope: K, acceptCharset: 0, className: 0, htmlFor: 0, httpEquiv: 0, value: Ca }, DOMAttributeNames: { acceptCharset: "accept-charset", className: "class", htmlFor: "for", httpEquiv: "http-equiv" }, DOMMutationMethods: { value: function value(a, b) {
      if (null == b) return a.removeAttribute("value");"number" !== a.type || !1 === a.hasAttribute("value") ? a.setAttribute("value", "" + b) : a.validity && !a.validity.badInput && a.ownerDocument.activeElement !== a && a.setAttribute("value", "" + b);
    } } },
    Ea = xa.HAS_STRING_BOOLEAN_VALUE,
    M = { xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace" },
    Ga = { Properties: { autoReverse: Ea, externalResourcesRequired: Ea, preserveAlpha: Ea }, DOMAttributeNames: { autoReverse: "autoReverse", externalResourcesRequired: "externalResourcesRequired", preserveAlpha: "preserveAlpha" }, DOMAttributeNamespaces: { xlinkActuate: M.xlink, xlinkArcrole: M.xlink, xlinkHref: M.xlink, xlinkRole: M.xlink, xlinkShow: M.xlink, xlinkTitle: M.xlink, xlinkType: M.xlink,
    xmlBase: M.xml, xmlLang: M.xml, xmlSpace: M.xml } },
    Ha = /[\-\:]([a-z])/g;function Ia(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode x-height xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type xml:base xmlns:xlink xml:lang xml:space".split(" ").forEach(function (a) {
  var b = a.replace(Ha, Ia);Ga.Properties[b] = 0;Ga.DOMAttributeNames[b] = a;
});xa.injectDOMPropertyConfig(Da);xa.injectDOMPropertyConfig(Ga);
var P = { _caughtError: null, _hasCaughtError: !1, _rethrowError: null, _hasRethrowError: !1, injection: { injectErrorUtils: function injectErrorUtils(a) {
      "function" !== typeof a.invokeGuardedCallback ? E("197") : void 0;Ja = a.invokeGuardedCallback;
    } }, invokeGuardedCallback: function invokeGuardedCallback(a, b, c, d, e, f, g, h, k) {
    Ja.apply(P, arguments);
  }, invokeGuardedCallbackAndCatchFirstError: function invokeGuardedCallbackAndCatchFirstError(a, b, c, d, e, f, g, h, k) {
    P.invokeGuardedCallback.apply(this, arguments);if (P.hasCaughtError()) {
      var q = P.clearCaughtError();P._hasRethrowError || (P._hasRethrowError = !0, P._rethrowError = q);
    }
  }, rethrowCaughtError: function rethrowCaughtError() {
    return Ka.apply(P, arguments);
  }, hasCaughtError: function hasCaughtError() {
    return P._hasCaughtError;
  }, clearCaughtError: function clearCaughtError() {
    if (P._hasCaughtError) {
      var a = P._caughtError;P._caughtError = null;P._hasCaughtError = !1;return a;
    }E("198");
  } };function Ja(a, b, c, d, e, f, g, h, k) {
  P._hasCaughtError = !1;P._caughtError = null;var q = Array.prototype.slice.call(arguments, 3);try {
    b.apply(c, q);
  } catch (v) {
    P._caughtError = v, P._hasCaughtError = !0;
  }
}
function Ka() {
  if (P._hasRethrowError) {
    var a = P._rethrowError;P._rethrowError = null;P._hasRethrowError = !1;throw a;
  }
}var La = null,
    Ma = {};
function Na() {
  if (La) for (var a in Ma) {
    var b = Ma[a],
        c = La.indexOf(a);-1 < c ? void 0 : E("96", a);if (!Oa[c]) {
      b.extractEvents ? void 0 : E("97", a);Oa[c] = b;c = b.eventTypes;for (var d in c) {
        var e = void 0;var f = c[d],
            g = b,
            h = d;Pa.hasOwnProperty(h) ? E("99", h) : void 0;Pa[h] = f;var k = f.phasedRegistrationNames;if (k) {
          for (e in k) {
            k.hasOwnProperty(e) && Qa(k[e], g, h);
          }e = !0;
        } else f.registrationName ? (Qa(f.registrationName, g, h), e = !0) : e = !1;e ? void 0 : E("98", d, a);
      }
    }
  }
}
function Qa(a, b, c) {
  Ra[a] ? E("100", a) : void 0;Ra[a] = b;Sa[a] = b.eventTypes[c].dependencies;
}var Oa = [],
    Pa = {},
    Ra = {},
    Sa = {};function Ta(a) {
  La ? E("101") : void 0;La = Array.prototype.slice.call(a);Na();
}function Ua(a) {
  var b = !1,
      c;for (c in a) {
    if (a.hasOwnProperty(c)) {
      var d = a[c];Ma.hasOwnProperty(c) && Ma[c] === d || (Ma[c] ? E("102", c) : void 0, Ma[c] = d, b = !0);
    }
  }b && Na();
}
var Va = Object.freeze({ plugins: Oa, eventNameDispatchConfigs: Pa, registrationNameModules: Ra, registrationNameDependencies: Sa, possibleRegistrationNames: null, injectEventPluginOrder: Ta, injectEventPluginsByName: Ua }),
    Wa = null,
    Xa = null,
    Ya = null;function Za(a, b, c, d) {
  b = a.type || "unknown-event";a.currentTarget = Ya(d);P.invokeGuardedCallbackAndCatchFirstError(b, c, void 0, a);a.currentTarget = null;
}
function $a(a, b) {
  null == b ? E("30") : void 0;if (null == a) return b;if (Array.isArray(a)) {
    if (Array.isArray(b)) return a.push.apply(a, b), a;a.push(b);return a;
  }return Array.isArray(b) ? [a].concat(b) : [a, b];
}function ab(a, b, c) {
  Array.isArray(a) ? a.forEach(b, c) : a && b.call(c, a);
}var bb = null;
function cb(a, b) {
  if (a) {
    var c = a._dispatchListeners,
        d = a._dispatchInstances;if (Array.isArray(c)) for (var e = 0; e < c.length && !a.isPropagationStopped(); e++) {
      Za(a, b, c[e], d[e]);
    } else c && Za(a, b, c, d);a._dispatchListeners = null;a._dispatchInstances = null;a.isPersistent() || a.constructor.release(a);
  }
}function db(a) {
  return cb(a, !0);
}function gb(a) {
  return cb(a, !1);
}var hb = { injectEventPluginOrder: Ta, injectEventPluginsByName: Ua };
function ib(a, b) {
  var c = a.stateNode;if (!c) return null;var d = Wa(c);if (!d) return null;c = d[b];a: switch (b) {case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));a = !d;break a;default:
      a = !1;}if (a) return null;c && "function" !== typeof c ? E("231", b, typeof c === "undefined" ? "undefined" : _typeof(c)) : void 0;
  return c;
}function jb(a, b, c, d) {
  for (var e, f = 0; f < Oa.length; f++) {
    var g = Oa[f];g && (g = g.extractEvents(a, b, c, d)) && (e = $a(e, g));
  }return e;
}function kb(a) {
  a && (bb = $a(bb, a));
}function lb(a) {
  var b = bb;bb = null;b && (a ? ab(b, db) : ab(b, gb), bb ? E("95") : void 0, P.rethrowCaughtError());
}var mb = Object.freeze({ injection: hb, getListener: ib, extractEvents: jb, enqueueEvents: kb, processEventQueue: lb }),
    nb = Math.random().toString(36).slice(2),
    Q = "__reactInternalInstance$" + nb,
    ob = "__reactEventHandlers$" + nb;
function pb(a) {
  if (a[Q]) return a[Q];for (var b = []; !a[Q];) {
    if (b.push(a), a.parentNode) a = a.parentNode;else return null;
  }var c = void 0,
      d = a[Q];if (5 === d.tag || 6 === d.tag) return d;for (; a && (d = a[Q]); a = b.pop()) {
    c = d;
  }return c;
}function qb(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;E("33");
}function rb(a) {
  return a[ob] || null;
}
var sb = Object.freeze({ precacheFiberNode: function precacheFiberNode(a, b) {
    b[Q] = a;
  }, getClosestInstanceFromNode: pb, getInstanceFromNode: function getInstanceFromNode(a) {
    a = a[Q];return !a || 5 !== a.tag && 6 !== a.tag ? null : a;
  }, getNodeFromInstance: qb, getFiberCurrentPropsFromNode: rb, updateFiberProps: function updateFiberProps(a, b) {
    a[ob] = b;
  } });function tb(a) {
  do {
    a = a["return"];
  } while (a && 5 !== a.tag);return a ? a : null;
}function ub(a, b, c) {
  for (var d = []; a;) {
    d.push(a), a = tb(a);
  }for (a = d.length; 0 < a--;) {
    b(d[a], "captured", c);
  }for (a = 0; a < d.length; a++) {
    b(d[a], "bubbled", c);
  }
}
function vb(a, b, c) {
  if (b = ib(a, c.dispatchConfig.phasedRegistrationNames[b])) c._dispatchListeners = $a(c._dispatchListeners, b), c._dispatchInstances = $a(c._dispatchInstances, a);
}function wb(a) {
  a && a.dispatchConfig.phasedRegistrationNames && ub(a._targetInst, vb, a);
}function xb(a) {
  if (a && a.dispatchConfig.phasedRegistrationNames) {
    var b = a._targetInst;b = b ? tb(b) : null;ub(b, vb, a);
  }
}
function yb(a, b, c) {
  a && c && c.dispatchConfig.registrationName && (b = ib(a, c.dispatchConfig.registrationName)) && (c._dispatchListeners = $a(c._dispatchListeners, b), c._dispatchInstances = $a(c._dispatchInstances, a));
}function zb(a) {
  a && a.dispatchConfig.registrationName && yb(a._targetInst, null, a);
}function Ab(a) {
  ab(a, wb);
}
function Bb(a, b, c, d) {
  if (c && d) a: {
    var e = c;for (var f = d, g = 0, h = e; h; h = tb(h)) {
      g++;
    }h = 0;for (var k = f; k; k = tb(k)) {
      h++;
    }for (; 0 < g - h;) {
      e = tb(e), g--;
    }for (; 0 < h - g;) {
      f = tb(f), h--;
    }for (; g--;) {
      if (e === f || e === f.alternate) break a;e = tb(e);f = tb(f);
    }e = null;
  } else e = null;f = e;for (e = []; c && c !== f;) {
    g = c.alternate;if (null !== g && g === f) break;e.push(c);c = tb(c);
  }for (c = []; d && d !== f;) {
    g = d.alternate;if (null !== g && g === f) break;c.push(d);d = tb(d);
  }for (d = 0; d < e.length; d++) {
    yb(e[d], "bubbled", a);
  }for (a = c.length; 0 < a--;) {
    yb(c[a], "captured", b);
  }
}
var Cb = Object.freeze({ accumulateTwoPhaseDispatches: Ab, accumulateTwoPhaseDispatchesSkipTarget: function accumulateTwoPhaseDispatchesSkipTarget(a) {
    ab(a, xb);
  }, accumulateEnterLeaveDispatches: Bb, accumulateDirectDispatches: function accumulateDirectDispatches(a) {
    ab(a, zb);
  } }),
    Db = null;function Eb() {
  !Db && l.canUseDOM && (Db = "textContent" in document.documentElement ? "textContent" : "innerText");return Db;
}var S = { _root: null, _startText: null, _fallbackText: null };
function Fb() {
  if (S._fallbackText) return S._fallbackText;var a,
      b = S._startText,
      c = b.length,
      d,
      e = Gb(),
      f = e.length;for (a = 0; a < c && b[a] === e[a]; a++) {}var g = c - a;for (d = 1; d <= g && b[c - d] === e[f - d]; d++) {}S._fallbackText = e.slice(a, 1 < d ? 1 - d : void 0);return S._fallbackText;
}function Gb() {
  return "value" in S._root ? S._root.value : S._root[Eb()];
}
var Hb = "dispatchConfig _targetInst nativeEvent isDefaultPrevented isPropagationStopped _dispatchListeners _dispatchInstances".split(" "),
    Ib = { type: null, target: null, currentTarget: C.thatReturnsNull, eventPhase: null, bubbles: null, cancelable: null, timeStamp: function timeStamp(a) {
    return a.timeStamp || Date.now();
  }, defaultPrevented: null, isTrusted: null };
function T(a, b, c, d) {
  this.dispatchConfig = a;this._targetInst = b;this.nativeEvent = c;a = this.constructor.Interface;for (var e in a) {
    a.hasOwnProperty(e) && ((b = a[e]) ? this[e] = b(c) : "target" === e ? this.target = d : this[e] = c[e]);
  }this.isDefaultPrevented = (null != c.defaultPrevented ? c.defaultPrevented : !1 === c.returnValue) ? C.thatReturnsTrue : C.thatReturnsFalse;this.isPropagationStopped = C.thatReturnsFalse;return this;
}
B(T.prototype, { preventDefault: function preventDefault() {
    this.defaultPrevented = !0;var a = this.nativeEvent;a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = C.thatReturnsTrue);
  }, stopPropagation: function stopPropagation() {
    var a = this.nativeEvent;a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = C.thatReturnsTrue);
  }, persist: function persist() {
    this.isPersistent = C.thatReturnsTrue;
  }, isPersistent: C.thatReturnsFalse,
  destructor: function destructor() {
    var a = this.constructor.Interface,
        b;for (b in a) {
      this[b] = null;
    }for (a = 0; a < Hb.length; a++) {
      this[Hb[a]] = null;
    }
  } });T.Interface = Ib;T.augmentClass = function (a, b) {
  function c() {}c.prototype = this.prototype;var d = new c();B(d, a.prototype);a.prototype = d;a.prototype.constructor = a;a.Interface = B({}, this.Interface, b);a.augmentClass = this.augmentClass;Jb(a);
};Jb(T);function Kb(a, b, c, d) {
  if (this.eventPool.length) {
    var e = this.eventPool.pop();this.call(e, a, b, c, d);return e;
  }return new this(a, b, c, d);
}
function Lb(a) {
  a instanceof this ? void 0 : E("223");a.destructor();10 > this.eventPool.length && this.eventPool.push(a);
}function Jb(a) {
  a.eventPool = [];a.getPooled = Kb;a.release = Lb;
}function Mb(a, b, c, d) {
  return T.call(this, a, b, c, d);
}T.augmentClass(Mb, { data: null });function Nb(a, b, c, d) {
  return T.call(this, a, b, c, d);
}T.augmentClass(Nb, { data: null });var Pb = [9, 13, 27, 32],
    Vb = l.canUseDOM && "CompositionEvent" in window,
    Wb = null;l.canUseDOM && "documentMode" in document && (Wb = document.documentMode);var Xb;
if (Xb = l.canUseDOM && "TextEvent" in window && !Wb) {
  var Yb = window.opera;Xb = !("object" === (typeof Yb === "undefined" ? "undefined" : _typeof(Yb)) && "function" === typeof Yb.version && 12 >= parseInt(Yb.version(), 10));
}
var Zb = Xb,
    $b = l.canUseDOM && (!Vb || Wb && 8 < Wb && 11 >= Wb),
    ac = String.fromCharCode(32),
    bc = { beforeInput: { phasedRegistrationNames: { bubbled: "onBeforeInput", captured: "onBeforeInputCapture" }, dependencies: ["topCompositionEnd", "topKeyPress", "topTextInput", "topPaste"] }, compositionEnd: { phasedRegistrationNames: { bubbled: "onCompositionEnd", captured: "onCompositionEndCapture" }, dependencies: "topBlur topCompositionEnd topKeyDown topKeyPress topKeyUp topMouseDown".split(" ") }, compositionStart: { phasedRegistrationNames: { bubbled: "onCompositionStart",
      captured: "onCompositionStartCapture" }, dependencies: "topBlur topCompositionStart topKeyDown topKeyPress topKeyUp topMouseDown".split(" ") }, compositionUpdate: { phasedRegistrationNames: { bubbled: "onCompositionUpdate", captured: "onCompositionUpdateCapture" }, dependencies: "topBlur topCompositionUpdate topKeyDown topKeyPress topKeyUp topMouseDown".split(" ") } },
    cc = !1;
function dc(a, b) {
  switch (a) {case "topKeyUp":
      return -1 !== Pb.indexOf(b.keyCode);case "topKeyDown":
      return 229 !== b.keyCode;case "topKeyPress":case "topMouseDown":case "topBlur":
      return !0;default:
      return !1;}
}function ec(a) {
  a = a.detail;return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && "data" in a ? a.data : null;
}var fc = !1;function gc(a, b) {
  switch (a) {case "topCompositionEnd":
      return ec(b);case "topKeyPress":
      if (32 !== b.which) return null;cc = !0;return ac;case "topTextInput":
      return a = b.data, a === ac && cc ? null : a;default:
      return null;}
}
function hc(a, b) {
  if (fc) return "topCompositionEnd" === a || !Vb && dc(a, b) ? (a = Fb(), S._root = null, S._startText = null, S._fallbackText = null, fc = !1, a) : null;switch (a) {case "topPaste":
      return null;case "topKeyPress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;if (b.which) return String.fromCharCode(b.which);
      }return null;case "topCompositionEnd":
      return $b ? null : b.data;default:
      return null;}
}
var ic = { eventTypes: bc, extractEvents: function extractEvents(a, b, c, d) {
    var e;if (Vb) b: {
      switch (a) {case "topCompositionStart":
          var f = bc.compositionStart;break b;case "topCompositionEnd":
          f = bc.compositionEnd;break b;case "topCompositionUpdate":
          f = bc.compositionUpdate;break b;}f = void 0;
    } else fc ? dc(a, c) && (f = bc.compositionEnd) : "topKeyDown" === a && 229 === c.keyCode && (f = bc.compositionStart);f ? ($b && (fc || f !== bc.compositionStart ? f === bc.compositionEnd && fc && (e = Fb()) : (S._root = d, S._startText = Gb(), fc = !0)), f = Mb.getPooled(f, b, c, d), e ? f.data = e : (e = ec(c), null !== e && (f.data = e)), Ab(f), e = f) : e = null;(a = Zb ? gc(a, c) : hc(a, c)) ? (b = Nb.getPooled(bc.beforeInput, b, c, d), b.data = a, Ab(b)) : b = null;return [e, b];
  } },
    jc = null,
    kc = null,
    lc = null;function mc(a) {
  if (a = Xa(a)) {
    jc && "function" === typeof jc.restoreControlledState ? void 0 : E("194");var b = Wa(a.stateNode);jc.restoreControlledState(a.stateNode, a.type, b);
  }
}var nc = { injectFiberControlledHostComponent: function injectFiberControlledHostComponent(a) {
    jc = a;
  } };function oc(a) {
  kc ? lc ? lc.push(a) : lc = [a] : kc = a;
}
function pc() {
  if (kc) {
    var a = kc,
        b = lc;lc = kc = null;mc(a);if (b) for (a = 0; a < b.length; a++) {
      mc(b[a]);
    }
  }
}var qc = Object.freeze({ injection: nc, enqueueStateRestore: oc, restoreStateIfNeeded: pc });function rc(a, b) {
  return a(b);
}var sc = !1;function tc(a, b) {
  if (sc) return rc(a, b);sc = !0;try {
    return rc(a, b);
  } finally {
    sc = !1, pc();
  }
}var uc = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function vc(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();return "input" === b ? !!uc[a.type] : "textarea" === b ? !0 : !1;
}function wc(a) {
  a = a.target || a.srcElement || window;a.correspondingUseElement && (a = a.correspondingUseElement);return 3 === a.nodeType ? a.parentNode : a;
}var xc;l.canUseDOM && (xc = document.implementation && document.implementation.hasFeature && !0 !== document.implementation.hasFeature("", ""));
function yc(a, b) {
  if (!l.canUseDOM || b && !("addEventListener" in document)) return !1;b = "on" + a;var c = b in document;c || (c = document.createElement("div"), c.setAttribute(b, "return;"), c = "function" === typeof c[b]);!c && xc && "wheel" === a && (c = document.implementation.hasFeature("Events.wheel", "3.0"));return c;
}function zc(a) {
  var b = a.type;return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ac(a) {
  var b = zc(a) ? "checked" : "value",
      c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
      d = "" + a[b];if (!a.hasOwnProperty(b) && "function" === typeof c.get && "function" === typeof c.set) return Object.defineProperty(a, b, { enumerable: c.enumerable, configurable: !0, get: function get() {
      return c.get.call(this);
    }, set: function set(a) {
      d = "" + a;c.set.call(this, a);
    } }), { getValue: function getValue() {
      return d;
    }, setValue: function setValue(a) {
      d = "" + a;
    }, stopTracking: function stopTracking() {
      a._valueTracker = null;delete a[b];
    } };
}
function Bc(a) {
  a._valueTracker || (a._valueTracker = Ac(a));
}function Cc(a) {
  if (!a) return !1;var b = a._valueTracker;if (!b) return !0;var c = b.getValue();var d = "";a && (d = zc(a) ? a.checked ? "true" : "false" : a.value);a = d;return a !== c ? (b.setValue(a), !0) : !1;
}var Dc = { change: { phasedRegistrationNames: { bubbled: "onChange", captured: "onChangeCapture" }, dependencies: "topBlur topChange topClick topFocus topInput topKeyDown topKeyUp topSelectionChange".split(" ") } };
function Ec(a, b, c) {
  a = T.getPooled(Dc.change, a, b, c);a.type = "change";oc(c);Ab(a);return a;
}var Fc = null,
    Gc = null;function Hc(a) {
  kb(a);lb(!1);
}function Ic(a) {
  var b = qb(a);if (Cc(b)) return a;
}function Jc(a, b) {
  if ("topChange" === a) return b;
}var Kc = !1;l.canUseDOM && (Kc = yc("input") && (!document.documentMode || 9 < document.documentMode));function Lc() {
  Fc && (Fc.detachEvent("onpropertychange", Mc), Gc = Fc = null);
}function Mc(a) {
  "value" === a.propertyName && Ic(Gc) && (a = Ec(Gc, a, wc(a)), tc(Hc, a));
}
function Nc(a, b, c) {
  "topFocus" === a ? (Lc(), Fc = b, Gc = c, Fc.attachEvent("onpropertychange", Mc)) : "topBlur" === a && Lc();
}function Oc(a) {
  if ("topSelectionChange" === a || "topKeyUp" === a || "topKeyDown" === a) return Ic(Gc);
}function Pc(a, b) {
  if ("topClick" === a) return Ic(b);
}function $c(a, b) {
  if ("topInput" === a || "topChange" === a) return Ic(b);
}
var ad = { eventTypes: Dc, _isInputEventSupported: Kc, extractEvents: function extractEvents(a, b, c, d) {
    var e = b ? qb(b) : window,
        f = e.nodeName && e.nodeName.toLowerCase();if ("select" === f || "input" === f && "file" === e.type) var g = Jc;else if (vc(e)) {
      if (Kc) g = $c;else {
        g = Oc;var h = Nc;
      }
    } else f = e.nodeName, !f || "input" !== f.toLowerCase() || "checkbox" !== e.type && "radio" !== e.type || (g = Pc);if (g && (g = g(a, b))) return Ec(g, c, d);h && h(a, e, b);"topBlur" === a && null != b && (a = b._wrapperState || e._wrapperState) && a.controlled && "number" === e.type && (a = "" + e.value, e.getAttribute("value") !== a && e.setAttribute("value", a));
  } };function bd(a, b, c, d) {
  return T.call(this, a, b, c, d);
}T.augmentClass(bd, { view: null, detail: null });var cd = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };function dd(a) {
  var b = this.nativeEvent;return b.getModifierState ? b.getModifierState(a) : (a = cd[a]) ? !!b[a] : !1;
}function ed() {
  return dd;
}function fd(a, b, c, d) {
  return T.call(this, a, b, c, d);
}
bd.augmentClass(fd, { screenX: null, screenY: null, clientX: null, clientY: null, pageX: null, pageY: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, getModifierState: ed, button: null, buttons: null, relatedTarget: function relatedTarget(a) {
    return a.relatedTarget || (a.fromElement === a.srcElement ? a.toElement : a.fromElement);
  } });
var gd = { mouseEnter: { registrationName: "onMouseEnter", dependencies: ["topMouseOut", "topMouseOver"] }, mouseLeave: { registrationName: "onMouseLeave", dependencies: ["topMouseOut", "topMouseOver"] } },
    hd = { eventTypes: gd, extractEvents: function extractEvents(a, b, c, d) {
    if ("topMouseOver" === a && (c.relatedTarget || c.fromElement) || "topMouseOut" !== a && "topMouseOver" !== a) return null;var e = d.window === d ? d : (e = d.ownerDocument) ? e.defaultView || e.parentWindow : window;"topMouseOut" === a ? (a = b, b = (b = c.relatedTarget || c.toElement) ? pb(b) : null) : a = null;if (a === b) return null;var f = null == a ? e : qb(a);e = null == b ? e : qb(b);var g = fd.getPooled(gd.mouseLeave, a, c, d);g.type = "mouseleave";g.target = f;g.relatedTarget = e;c = fd.getPooled(gd.mouseEnter, b, c, d);c.type = "mouseenter";c.target = e;c.relatedTarget = f;Bb(g, c, a, b);return [g, c];
  } },
    id = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;function jd(a) {
  a = a.type;return "string" === typeof a ? a : "function" === typeof a ? a.displayName || a.name : null;
}
function kd(a) {
  var b = a;if (a.alternate) for (; b["return"];) {
    b = b["return"];
  } else {
    if (0 !== (b.effectTag & 2)) return 1;for (; b["return"];) {
      if (b = b["return"], 0 !== (b.effectTag & 2)) return 1;
    }
  }return 3 === b.tag ? 2 : 3;
}function ld(a) {
  return (a = a._reactInternalFiber) ? 2 === kd(a) : !1;
}function md(a) {
  2 !== kd(a) ? E("188") : void 0;
}
function nd(a) {
  var b = a.alternate;if (!b) return b = kd(a), 3 === b ? E("188") : void 0, 1 === b ? null : a;for (var c = a, d = b;;) {
    var e = c["return"],
        f = e ? e.alternate : null;if (!e || !f) break;if (e.child === f.child) {
      for (var g = e.child; g;) {
        if (g === c) return md(e), a;if (g === d) return md(e), b;g = g.sibling;
      }E("188");
    }if (c["return"] !== d["return"]) c = e, d = f;else {
      g = !1;for (var h = e.child; h;) {
        if (h === c) {
          g = !0;c = e;d = f;break;
        }if (h === d) {
          g = !0;d = e;c = f;break;
        }h = h.sibling;
      }if (!g) {
        for (h = f.child; h;) {
          if (h === c) {
            g = !0;c = f;d = e;break;
          }if (h === d) {
            g = !0;d = f;c = e;break;
          }h = h.sibling;
        }g ? void 0 : E("189");
      }
    }c.alternate !== d ? E("190") : void 0;
  }3 !== c.tag ? E("188") : void 0;return c.stateNode.current === c ? a : b;
}function od(a) {
  a = nd(a);if (!a) return null;for (var b = a;;) {
    if (5 === b.tag || 6 === b.tag) return b;if (b.child) b.child["return"] = b, b = b.child;else {
      if (b === a) break;for (; !b.sibling;) {
        if (!b["return"] || b["return"] === a) return null;b = b["return"];
      }b.sibling["return"] = b["return"];b = b.sibling;
    }
  }return null;
}
function pd(a) {
  a = nd(a);if (!a) return null;for (var b = a;;) {
    if (5 === b.tag || 6 === b.tag) return b;if (b.child && 4 !== b.tag) b.child["return"] = b, b = b.child;else {
      if (b === a) break;for (; !b.sibling;) {
        if (!b["return"] || b["return"] === a) return null;b = b["return"];
      }b.sibling["return"] = b["return"];b = b.sibling;
    }
  }return null;
}var qd = [];
function rd(a) {
  var b = a.targetInst;do {
    if (!b) {
      a.ancestors.push(b);break;
    }var c;for (c = b; c["return"];) {
      c = c["return"];
    }c = 3 !== c.tag ? null : c.stateNode.containerInfo;if (!c) break;a.ancestors.push(b);b = pb(c);
  } while (b);for (c = 0; c < a.ancestors.length; c++) {
    b = a.ancestors[c], sd(a.topLevelType, b, a.nativeEvent, wc(a.nativeEvent));
  }
}var td = !0,
    sd = void 0;function ud(a) {
  td = !!a;
}function U(a, b, c) {
  return c ? ba.listen(c, b, vd.bind(null, a)) : null;
}function wd(a, b, c) {
  return c ? ba.capture(c, b, vd.bind(null, a)) : null;
}
function vd(a, b) {
  if (td) {
    var c = wc(b);c = pb(c);null === c || "number" !== typeof c.tag || 2 === kd(c) || (c = null);if (qd.length) {
      var d = qd.pop();d.topLevelType = a;d.nativeEvent = b;d.targetInst = c;a = d;
    } else a = { topLevelType: a, nativeEvent: b, targetInst: c, ancestors: [] };try {
      tc(rd, a);
    } finally {
      a.topLevelType = null, a.nativeEvent = null, a.targetInst = null, a.ancestors.length = 0, 10 > qd.length && qd.push(a);
    }
  }
}
var xd = Object.freeze({ get _enabled() {
    return td;
  }, get _handleTopLevel() {
    return sd;
  }, setHandleTopLevel: function setHandleTopLevel(a) {
    sd = a;
  }, setEnabled: ud, isEnabled: function isEnabled() {
    return td;
  }, trapBubbledEvent: U, trapCapturedEvent: wd, dispatchEvent: vd });function yd(a, b) {
  var c = {};c[a.toLowerCase()] = b.toLowerCase();c["Webkit" + a] = "webkit" + b;c["Moz" + a] = "moz" + b;c["ms" + a] = "MS" + b;c["O" + a] = "o" + b.toLowerCase();return c;
}
var zd = { animationend: yd("Animation", "AnimationEnd"), animationiteration: yd("Animation", "AnimationIteration"), animationstart: yd("Animation", "AnimationStart"), transitionend: yd("Transition", "TransitionEnd") },
    Ad = {},
    Bd = {};l.canUseDOM && (Bd = document.createElement("div").style, "AnimationEvent" in window || (delete zd.animationend.animation, delete zd.animationiteration.animation, delete zd.animationstart.animation), "TransitionEvent" in window || delete zd.transitionend.transition);
function Cd(a) {
  if (Ad[a]) return Ad[a];if (!zd[a]) return a;var b = zd[a],
      c;for (c in b) {
    if (b.hasOwnProperty(c) && c in Bd) return Ad[a] = b[c];
  }return "";
}
var Dd = { topAbort: "abort", topAnimationEnd: Cd("animationend") || "animationend", topAnimationIteration: Cd("animationiteration") || "animationiteration", topAnimationStart: Cd("animationstart") || "animationstart", topBlur: "blur", topCancel: "cancel", topCanPlay: "canplay", topCanPlayThrough: "canplaythrough", topChange: "change", topClick: "click", topClose: "close", topCompositionEnd: "compositionend", topCompositionStart: "compositionstart", topCompositionUpdate: "compositionupdate", topContextMenu: "contextmenu", topCopy: "copy",
  topCut: "cut", topDoubleClick: "dblclick", topDrag: "drag", topDragEnd: "dragend", topDragEnter: "dragenter", topDragExit: "dragexit", topDragLeave: "dragleave", topDragOver: "dragover", topDragStart: "dragstart", topDrop: "drop", topDurationChange: "durationchange", topEmptied: "emptied", topEncrypted: "encrypted", topEnded: "ended", topError: "error", topFocus: "focus", topInput: "input", topKeyDown: "keydown", topKeyPress: "keypress", topKeyUp: "keyup", topLoadedData: "loadeddata", topLoad: "load", topLoadedMetadata: "loadedmetadata", topLoadStart: "loadstart",
  topMouseDown: "mousedown", topMouseMove: "mousemove", topMouseOut: "mouseout", topMouseOver: "mouseover", topMouseUp: "mouseup", topPaste: "paste", topPause: "pause", topPlay: "play", topPlaying: "playing", topProgress: "progress", topRateChange: "ratechange", topScroll: "scroll", topSeeked: "seeked", topSeeking: "seeking", topSelectionChange: "selectionchange", topStalled: "stalled", topSuspend: "suspend", topTextInput: "textInput", topTimeUpdate: "timeupdate", topToggle: "toggle", topTouchCancel: "touchcancel", topTouchEnd: "touchend", topTouchMove: "touchmove",
  topTouchStart: "touchstart", topTransitionEnd: Cd("transitionend") || "transitionend", topVolumeChange: "volumechange", topWaiting: "waiting", topWheel: "wheel" },
    Ed = {},
    Fd = 0,
    Gd = "_reactListenersID" + ("" + Math.random()).slice(2);function Hd(a) {
  Object.prototype.hasOwnProperty.call(a, Gd) || (a[Gd] = Fd++, Ed[a[Gd]] = {});return Ed[a[Gd]];
}function Id(a) {
  for (; a && a.firstChild;) {
    a = a.firstChild;
  }return a;
}
function Jd(a, b) {
  var c = Id(a);a = 0;for (var d; c;) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;if (a <= b && d >= b) return { node: c, offset: b - a };a = d;
    }a: {
      for (; c;) {
        if (c.nextSibling) {
          c = c.nextSibling;break a;
        }c = c.parentNode;
      }c = void 0;
    }c = Id(c);
  }
}function Kd(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();return b && ("input" === b && "text" === a.type || "textarea" === b || "true" === a.contentEditable);
}
var Ld = l.canUseDOM && "documentMode" in document && 11 >= document.documentMode,
    Md = { select: { phasedRegistrationNames: { bubbled: "onSelect", captured: "onSelectCapture" }, dependencies: "topBlur topContextMenu topFocus topKeyDown topKeyUp topMouseDown topMouseUp topSelectionChange".split(" ") } },
    Nd = null,
    Od = null,
    Pd = null,
    Qd = !1;
function Rd(a, b) {
  if (Qd || null == Nd || Nd !== da()) return null;var c = Nd;"selectionStart" in c && Kd(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : window.getSelection ? (c = window.getSelection(), c = { anchorNode: c.anchorNode, anchorOffset: c.anchorOffset, focusNode: c.focusNode, focusOffset: c.focusOffset }) : c = void 0;return Pd && ea(Pd, c) ? null : (Pd = c, a = T.getPooled(Md.select, Od, a, b), a.type = "select", a.target = Nd, Ab(a), a);
}
var Sd = { eventTypes: Md, extractEvents: function extractEvents(a, b, c, d) {
    var e = d.window === d ? d.document : 9 === d.nodeType ? d : d.ownerDocument,
        f;if (!(f = !e)) {
      a: {
        e = Hd(e);f = Sa.onSelect;for (var g = 0; g < f.length; g++) {
          var h = f[g];if (!e.hasOwnProperty(h) || !e[h]) {
            e = !1;break a;
          }
        }e = !0;
      }f = !e;
    }if (f) return null;e = b ? qb(b) : window;switch (a) {case "topFocus":
        if (vc(e) || "true" === e.contentEditable) Nd = e, Od = b, Pd = null;break;case "topBlur":
        Pd = Od = Nd = null;break;case "topMouseDown":
        Qd = !0;break;case "topContextMenu":case "topMouseUp":
        return Qd = !1, Rd(c, d);case "topSelectionChange":
        if (Ld) break;
      case "topKeyDown":case "topKeyUp":
        return Rd(c, d);}return null;
  } };function Td(a, b, c, d) {
  return T.call(this, a, b, c, d);
}T.augmentClass(Td, { animationName: null, elapsedTime: null, pseudoElement: null });function Ud(a, b, c, d) {
  return T.call(this, a, b, c, d);
}T.augmentClass(Ud, { clipboardData: function clipboardData(a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  } });function Vd(a, b, c, d) {
  return T.call(this, a, b, c, d);
}bd.augmentClass(Vd, { relatedTarget: null });
function Wd(a) {
  var b = a.keyCode;"charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;return 32 <= a || 13 === a ? a : 0;
}
var Xd = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" },
    Yd = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4",
  116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" };function Zd(a, b, c, d) {
  return T.call(this, a, b, c, d);
}
bd.augmentClass(Zd, { key: function key(a) {
    if (a.key) {
      var b = Xd[a.key] || a.key;if ("Unidentified" !== b) return b;
    }return "keypress" === a.type ? (a = Wd(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Yd[a.keyCode] || "Unidentified" : "";
  }, location: null, ctrlKey: null, shiftKey: null, altKey: null, metaKey: null, repeat: null, locale: null, getModifierState: ed, charCode: function charCode(a) {
    return "keypress" === a.type ? Wd(a) : 0;
  }, keyCode: function keyCode(a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }, which: function which(a) {
    return "keypress" === a.type ? Wd(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  } });function $d(a, b, c, d) {
  return T.call(this, a, b, c, d);
}fd.augmentClass($d, { dataTransfer: null });function ae(a, b, c, d) {
  return T.call(this, a, b, c, d);
}bd.augmentClass(ae, { touches: null, targetTouches: null, changedTouches: null, altKey: null, metaKey: null, ctrlKey: null, shiftKey: null, getModifierState: ed });function be(a, b, c, d) {
  return T.call(this, a, b, c, d);
}T.augmentClass(be, { propertyName: null, elapsedTime: null, pseudoElement: null });
function ce(a, b, c, d) {
  return T.call(this, a, b, c, d);
}fd.augmentClass(ce, { deltaX: function deltaX(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  }, deltaY: function deltaY(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  }, deltaZ: null, deltaMode: null });var de = {},
    ee = {};
"abort animationEnd animationIteration animationStart blur cancel canPlay canPlayThrough click close contextMenu copy cut doubleClick drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error focus input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing progress rateChange reset scroll seeked seeking stalled submit suspend timeUpdate toggle touchCancel touchEnd touchMove touchStart transitionEnd volumeChange waiting wheel".split(" ").forEach(function (a) {
  var b = a[0].toUpperCase() + a.slice(1),
      c = "on" + b;b = "top" + b;c = { phasedRegistrationNames: { bubbled: c, captured: c + "Capture" }, dependencies: [b] };de[a] = c;ee[b] = c;
});
var fe = { eventTypes: de, extractEvents: function extractEvents(a, b, c, d) {
    var e = ee[a];if (!e) return null;switch (a) {case "topKeyPress":
        if (0 === Wd(c)) return null;case "topKeyDown":case "topKeyUp":
        a = Zd;break;case "topBlur":case "topFocus":
        a = Vd;break;case "topClick":
        if (2 === c.button) return null;case "topDoubleClick":case "topMouseDown":case "topMouseMove":case "topMouseUp":case "topMouseOut":case "topMouseOver":case "topContextMenu":
        a = fd;break;case "topDrag":case "topDragEnd":case "topDragEnter":case "topDragExit":case "topDragLeave":case "topDragOver":case "topDragStart":case "topDrop":
        a = $d;break;case "topTouchCancel":case "topTouchEnd":case "topTouchMove":case "topTouchStart":
        a = ae;break;case "topAnimationEnd":case "topAnimationIteration":case "topAnimationStart":
        a = Td;break;case "topTransitionEnd":
        a = be;break;case "topScroll":
        a = bd;break;case "topWheel":
        a = ce;break;case "topCopy":case "topCut":case "topPaste":
        a = Ud;break;default:
        a = T;}b = a.getPooled(e, b, c, d);Ab(b);return b;
  } };sd = function sd(a, b, c, d) {
  a = jb(a, b, c, d);kb(a);lb(!1);
};hb.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin TapEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));
Wa = sb.getFiberCurrentPropsFromNode;Xa = sb.getInstanceFromNode;Ya = sb.getNodeFromInstance;hb.injectEventPluginsByName({ SimpleEventPlugin: fe, EnterLeaveEventPlugin: hd, ChangeEventPlugin: ad, SelectEventPlugin: Sd, BeforeInputEventPlugin: ic });var ge = [],
    he = -1;function V(a) {
  0 > he || (a.current = ge[he], ge[he] = null, he--);
}function W(a, b) {
  he++;ge[he] = a.current;a.current = b;
}new Set();var ie = { current: D },
    X = { current: !1 },
    je = D;function ke(a) {
  return le(a) ? je : ie.current;
}
function me(a, b) {
  var c = a.type.contextTypes;if (!c) return D;var d = a.stateNode;if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;var e = {},
      f;for (f in c) {
    e[f] = b[f];
  }d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);return e;
}function le(a) {
  return 2 === a.tag && null != a.type.childContextTypes;
}function ne(a) {
  le(a) && (V(X, a), V(ie, a));
}
function oe(a, b, c) {
  null != ie.cursor ? E("168") : void 0;W(ie, b, a);W(X, c, a);
}function pe(a, b) {
  var c = a.stateNode,
      d = a.type.childContextTypes;if ("function" !== typeof c.getChildContext) return b;c = c.getChildContext();for (var e in c) {
    e in d ? void 0 : E("108", jd(a) || "Unknown", e);
  }return B({}, b, c);
}function qe(a) {
  if (!le(a)) return !1;var b = a.stateNode;b = b && b.__reactInternalMemoizedMergedChildContext || D;je = ie.current;W(ie, b, a);W(X, X.current, a);return !0;
}
function re(a, b) {
  var c = a.stateNode;c ? void 0 : E("169");if (b) {
    var d = pe(a, je);c.__reactInternalMemoizedMergedChildContext = d;V(X, a);V(ie, a);W(ie, d, a);
  } else V(X, a);W(X, b, a);
}
function Y(a, b, c) {
  this.tag = a;this.key = b;this.stateNode = this.type = null;this.sibling = this.child = this["return"] = null;this.index = 0;this.memoizedState = this.updateQueue = this.memoizedProps = this.pendingProps = this.ref = null;this.internalContextTag = c;this.effectTag = 0;this.lastEffect = this.firstEffect = this.nextEffect = null;this.expirationTime = 0;this.alternate = null;
}
function se(a, b, c) {
  var d = a.alternate;null === d ? (d = new Y(a.tag, a.key, a.internalContextTag), d.type = a.type, d.stateNode = a.stateNode, d.alternate = a, a.alternate = d) : (d.effectTag = 0, d.nextEffect = null, d.firstEffect = null, d.lastEffect = null);d.expirationTime = c;d.pendingProps = b;d.child = a.child;d.memoizedProps = a.memoizedProps;d.memoizedState = a.memoizedState;d.updateQueue = a.updateQueue;d.sibling = a.sibling;d.index = a.index;d.ref = a.ref;return d;
}
function te(a, b, c) {
  var d = void 0,
      e = a.type,
      f = a.key;"function" === typeof e ? (d = e.prototype && e.prototype.isReactComponent ? new Y(2, f, b) : new Y(0, f, b), d.type = e, d.pendingProps = a.props) : "string" === typeof e ? (d = new Y(5, f, b), d.type = e, d.pendingProps = a.props) : "object" === (typeof e === "undefined" ? "undefined" : _typeof(e)) && null !== e && "number" === typeof e.tag ? (d = e, d.pendingProps = a.props) : E("130", null == e ? e : typeof e === "undefined" ? "undefined" : _typeof(e), "");d.expirationTime = c;return d;
}function ue(a, b, c, d) {
  b = new Y(10, d, b);b.pendingProps = a;b.expirationTime = c;return b;
}
function ve(a, b, c) {
  b = new Y(6, null, b);b.pendingProps = a;b.expirationTime = c;return b;
}function we(a, b, c) {
  b = new Y(7, a.key, b);b.type = a.handler;b.pendingProps = a;b.expirationTime = c;return b;
}function xe(a, b, c) {
  a = new Y(9, null, b);a.expirationTime = c;return a;
}function ye(a, b, c) {
  b = new Y(4, a.key, b);b.pendingProps = a.children || [];b.expirationTime = c;b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };return b;
}var ze = null,
    Ae = null;
function Be(a) {
  return function (b) {
    try {
      return a(b);
    } catch (c) {}
  };
}function Ce(a) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;var b = __REACT_DEVTOOLS_GLOBAL_HOOK__;if (b.isDisabled || !b.supportsFiber) return !0;try {
    var c = b.inject(a);ze = Be(function (a) {
      return b.onCommitFiberRoot(c, a);
    });Ae = Be(function (a) {
      return b.onCommitFiberUnmount(c, a);
    });
  } catch (d) {}return !0;
}function De(a) {
  "function" === typeof ze && ze(a);
}function Ee(a) {
  "function" === typeof Ae && Ae(a);
}
function Fe(a) {
  return { baseState: a, expirationTime: 0, first: null, last: null, callbackList: null, hasForceUpdate: !1, isInitialized: !1 };
}function Ge(a, b) {
  null === a.last ? a.first = a.last = b : (a.last.next = b, a.last = b);if (0 === a.expirationTime || a.expirationTime > b.expirationTime) a.expirationTime = b.expirationTime;
}
function He(a, b) {
  var c = a.alternate,
      d = a.updateQueue;null === d && (d = a.updateQueue = Fe(null));null !== c ? (a = c.updateQueue, null === a && (a = c.updateQueue = Fe(null))) : a = null;a = a !== d ? a : null;null === a ? Ge(d, b) : null === d.last || null === a.last ? (Ge(d, b), Ge(a, b)) : (Ge(d, b), a.last = b);
}function Ie(a, b, c, d) {
  a = a.partialState;return "function" === typeof a ? a.call(b, c, d) : a;
}
function Je(a, b, c, d, e, f) {
  null !== a && a.updateQueue === c && (c = b.updateQueue = { baseState: c.baseState, expirationTime: c.expirationTime, first: c.first, last: c.last, isInitialized: c.isInitialized, callbackList: null, hasForceUpdate: !1 });c.expirationTime = 0;c.isInitialized ? a = c.baseState : (a = c.baseState = b.memoizedState, c.isInitialized = !0);for (var g = !0, h = c.first, k = !1; null !== h;) {
    var q = h.expirationTime;if (q > f) {
      var v = c.expirationTime;if (0 === v || v > q) c.expirationTime = q;k || (k = !0, c.baseState = a);
    } else {
      k || (c.first = h.next, null === c.first && (c.last = null));if (h.isReplace) a = Ie(h, d, a, e), g = !0;else if (q = Ie(h, d, a, e)) a = g ? B({}, a, q) : B(a, q), g = !1;h.isForced && (c.hasForceUpdate = !0);null !== h.callback && (q = c.callbackList, null === q && (q = c.callbackList = []), q.push(h));
    }h = h.next;
  }null !== c.callbackList ? b.effectTag |= 32 : null !== c.first || c.hasForceUpdate || (b.updateQueue = null);k || (c.baseState = a);return a;
}
function Ke(a, b) {
  var c = a.callbackList;if (null !== c) for (a.callbackList = null, a = 0; a < c.length; a++) {
    var d = c[a],
        e = d.callback;d.callback = null;"function" !== typeof e ? E("191", e) : void 0;e.call(b);
  }
}
function Le(a, b, c, d) {
  function e(a, b) {
    b.updater = f;a.stateNode = b;b._reactInternalFiber = a;
  }var f = { isMounted: ld, enqueueSetState: function enqueueSetState(c, d, e) {
      c = c._reactInternalFiber;e = void 0 === e ? null : e;var g = b(c);He(c, { expirationTime: g, partialState: d, callback: e, isReplace: !1, isForced: !1, nextCallback: null, next: null });a(c, g);
    }, enqueueReplaceState: function enqueueReplaceState(c, d, e) {
      c = c._reactInternalFiber;e = void 0 === e ? null : e;var g = b(c);He(c, { expirationTime: g, partialState: d, callback: e, isReplace: !0, isForced: !1, nextCallback: null, next: null });
      a(c, g);
    }, enqueueForceUpdate: function enqueueForceUpdate(c, d) {
      c = c._reactInternalFiber;d = void 0 === d ? null : d;var e = b(c);He(c, { expirationTime: e, partialState: null, callback: d, isReplace: !1, isForced: !0, nextCallback: null, next: null });a(c, e);
    } };return { adoptClassInstance: e, constructClassInstance: function constructClassInstance(a, b) {
      var c = a.type,
          d = ke(a),
          f = 2 === a.tag && null != a.type.contextTypes,
          g = f ? me(a, d) : D;b = new c(b, g);e(a, b);f && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = d, a.__reactInternalMemoizedMaskedChildContext = g);return b;
    }, mountClassInstance: function mountClassInstance(a, b) {
      var c = a.alternate,
          d = a.stateNode,
          e = d.state || null,
          g = a.pendingProps;g ? void 0 : E("158");var h = ke(a);d.props = g;d.state = a.memoizedState = e;d.refs = D;d.context = me(a, h);null != a.type && null != a.type.prototype && !0 === a.type.prototype.unstable_isAsyncReactComponent && (a.internalContextTag |= 1);"function" === typeof d.componentWillMount && (e = d.state, d.componentWillMount(), e !== d.state && f.enqueueReplaceState(d, d.state, null), e = a.updateQueue, null !== e && (d.state = Je(c, a, e, d, g, b)));"function" === typeof d.componentDidMount && (a.effectTag |= 4);
    }, updateClassInstance: function updateClassInstance(a, b, e) {
      var g = b.stateNode;g.props = b.memoizedProps;g.state = b.memoizedState;var h = b.memoizedProps,
          k = b.pendingProps;k || (k = h, null == k ? E("159") : void 0);var u = g.context,
          z = ke(b);z = me(b, z);"function" !== typeof g.componentWillReceiveProps || h === k && u === z || (u = g.state, g.componentWillReceiveProps(k, z), g.state !== u && f.enqueueReplaceState(g, g.state, null));u = b.memoizedState;e = null !== b.updateQueue ? Je(a, b, b.updateQueue, g, k, e) : u;if (!(h !== k || u !== e || X.current || null !== b.updateQueue && b.updateQueue.hasForceUpdate)) return "function" !== typeof g.componentDidUpdate || h === a.memoizedProps && u === a.memoizedState || (b.effectTag |= 4), !1;var G = k;if (null === h || null !== b.updateQueue && b.updateQueue.hasForceUpdate) G = !0;else {
        var I = b.stateNode,
            L = b.type;G = "function" === typeof I.shouldComponentUpdate ? I.shouldComponentUpdate(G, e, z) : L.prototype && L.prototype.isPureReactComponent ? !ea(h, G) || !ea(u, e) : !0;
      }G ? ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(k, e, z), "function" === typeof g.componentDidUpdate && (b.effectTag |= 4)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && u === a.memoizedState || (b.effectTag |= 4), c(b, k), d(b, e));g.props = k;g.state = e;g.context = z;return G;
    } };
}var Qe = "function" === typeof Symbol && Symbol["for"],
    Re = Qe ? Symbol["for"]("react.element") : 60103,
    Se = Qe ? Symbol["for"]("react.call") : 60104,
    Te = Qe ? Symbol["for"]("react.return") : 60105,
    Ue = Qe ? Symbol["for"]("react.portal") : 60106,
    Ve = Qe ? Symbol["for"]("react.fragment") : 60107,
    We = "function" === typeof Symbol && Symbol.iterator;
function Xe(a) {
  if (null === a || "undefined" === typeof a) return null;a = We && a[We] || a["@@iterator"];return "function" === typeof a ? a : null;
}var Ye = Array.isArray;
function Ze(a, b) {
  var c = b.ref;if (null !== c && "function" !== typeof c) {
    if (b._owner) {
      b = b._owner;var d = void 0;b && (2 !== b.tag ? E("110") : void 0, d = b.stateNode);d ? void 0 : E("147", c);var e = "" + c;if (null !== a && null !== a.ref && a.ref._stringRef === e) return a.ref;a = function a(_a) {
        var b = d.refs === D ? d.refs = {} : d.refs;null === _a ? delete b[e] : b[e] = _a;
      };a._stringRef = e;return a;
    }"string" !== typeof c ? E("148") : void 0;b._owner ? void 0 : E("149", c);
  }return c;
}
function $e(a, b) {
  "textarea" !== a.type && E("31", "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b, "");
}
function af(a) {
  function b(b, c) {
    if (a) {
      var d = b.lastEffect;null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;c.nextEffect = null;c.effectTag = 8;
    }
  }function c(c, d) {
    if (!a) return null;for (; null !== d;) {
      b(c, d), d = d.sibling;
    }return null;
  }function d(a, b) {
    for (a = new Map(); null !== b;) {
      null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;
    }return a;
  }function e(a, b, c) {
    a = se(a, b, c);a.index = 0;a.sibling = null;return a;
  }function f(b, c, d) {
    b.index = d;if (!a) return c;d = b.alternate;if (null !== d) return d = d.index, d < c ? (b.effectTag = 2, c) : d;b.effectTag = 2;return c;
  }function g(b) {
    a && null === b.alternate && (b.effectTag = 2);return b;
  }function h(a, b, c, d) {
    if (null === b || 6 !== b.tag) return b = ve(c, a.internalContextTag, d), b["return"] = a, b;b = e(b, c, d);b["return"] = a;return b;
  }function k(a, b, c, d) {
    if (null !== b && b.type === c.type) return d = e(b, c.props, d), d.ref = Ze(b, c), d["return"] = a, d;d = te(c, a.internalContextTag, d);d.ref = Ze(b, c);d["return"] = a;return d;
  }function q(a, b, c, d) {
    if (null === b || 7 !== b.tag) return b = we(c, a.internalContextTag, d), b["return"] = a, b;b = e(b, c, d);
    b["return"] = a;return b;
  }function v(a, b, c, d) {
    if (null === b || 9 !== b.tag) return b = xe(c, a.internalContextTag, d), b.type = c.value, b["return"] = a, b;b = e(b, null, d);b.type = c.value;b["return"] = a;return b;
  }function y(a, b, c, d) {
    if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = ye(c, a.internalContextTag, d), b["return"] = a, b;b = e(b, c.children || [], d);b["return"] = a;return b;
  }function u(a, b, c, d, f) {
    if (null === b || 10 !== b.tag) return b = ue(c, a.internalContextTag, d, f), b["return"] = a, b;b = e(b, c, d);b["return"] = a;return b;
  }function z(a, b, c) {
    if ("string" === typeof b || "number" === typeof b) return b = ve("" + b, a.internalContextTag, c), b["return"] = a, b;if ("object" === (typeof b === "undefined" ? "undefined" : _typeof(b)) && null !== b) {
      switch (b.$$typeof) {case Re:
          if (b.type === Ve) return b = ue(b.props.children, a.internalContextTag, c, b.key), b["return"] = a, b;c = te(b, a.internalContextTag, c);c.ref = Ze(null, b);c["return"] = a;return c;case Se:
          return b = we(b, a.internalContextTag, c), b["return"] = a, b;case Te:
          return c = xe(b, a.internalContextTag, c), c.type = b.value, c["return"] = a, c;case Ue:
          return b = ye(b, a.internalContextTag, c), b["return"] = a, b;}if (Ye(b) || Xe(b)) return b = ue(b, a.internalContextTag, c, null), b["return"] = a, b;$e(a, b);
    }return null;
  }function G(a, b, c, d) {
    var e = null !== b ? b.key : null;if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);if ("object" === (typeof c === "undefined" ? "undefined" : _typeof(c)) && null !== c) {
      switch (c.$$typeof) {case Re:
          return c.key === e ? c.type === Ve ? u(a, b, c.props.children, d, e) : k(a, b, c, d) : null;case Se:
          return c.key === e ? q(a, b, c, d) : null;case Te:
          return null === e ? v(a, b, c, d) : null;case Ue:
          return c.key === e ? y(a, b, c, d) : null;}if (Ye(c) || Xe(c)) return null !== e ? null : u(a, b, c, d, null);$e(a, c);
    }return null;
  }function I(a, b, c, d, e) {
    if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);if ("object" === (typeof d === "undefined" ? "undefined" : _typeof(d)) && null !== d) {
      switch (d.$$typeof) {case Re:
          return a = a.get(null === d.key ? c : d.key) || null, d.type === Ve ? u(b, a, d.props.children, e, d.key) : k(b, a, d, e);case Se:
          return a = a.get(null === d.key ? c : d.key) || null, q(b, a, d, e);case Te:
          return a = a.get(c) || null, v(b, a, d, e);case Ue:
          return a = a.get(null === d.key ? c : d.key) || null, y(b, a, d, e);}if (Ye(d) || Xe(d)) return a = a.get(c) || null, u(b, a, d, e, null);$e(b, d);
    }return null;
  }function L(e, g, m, A) {
    for (var h = null, r = null, n = g, w = g = 0, k = null; null !== n && w < m.length; w++) {
      n.index > w ? (k = n, n = null) : k = n.sibling;var x = G(e, n, m[w], A);if (null === x) {
        null === n && (n = k);break;
      }a && n && null === x.alternate && b(e, n);g = f(x, g, w);null === r ? h = x : r.sibling = x;r = x;n = k;
    }if (w === m.length) return c(e, n), h;if (null === n) {
      for (; w < m.length; w++) {
        if (n = z(e, m[w], A)) g = f(n, g, w), null === r ? h = n : r.sibling = n, r = n;
      }return h;
    }for (n = d(e, n); w < m.length; w++) {
      if (k = I(n, e, w, m[w], A)) {
        if (a && null !== k.alternate) n["delete"](null === k.key ? w : k.key);g = f(k, g, w);null === r ? h = k : r.sibling = k;r = k;
      }
    }a && n.forEach(function (a) {
      return b(e, a);
    });return h;
  }function N(e, g, m, A) {
    var h = Xe(m);"function" !== typeof h ? E("150") : void 0;m = h.call(m);null == m ? E("151") : void 0;for (var r = h = null, n = g, w = g = 0, k = null, x = m.next(); null !== n && !x.done; w++, x = m.next()) {
      n.index > w ? (k = n, n = null) : k = n.sibling;var J = G(e, n, x.value, A);if (null === J) {
        n || (n = k);break;
      }a && n && null === J.alternate && b(e, n);g = f(J, g, w);null === r ? h = J : r.sibling = J;r = J;n = k;
    }if (x.done) return c(e, n), h;if (null === n) {
      for (; !x.done; w++, x = m.next()) {
        x = z(e, x.value, A), null !== x && (g = f(x, g, w), null === r ? h = x : r.sibling = x, r = x);
      }return h;
    }for (n = d(e, n); !x.done; w++, x = m.next()) {
      if (x = I(n, e, w, x.value, A), null !== x) {
        if (a && null !== x.alternate) n["delete"](null === x.key ? w : x.key);g = f(x, g, w);null === r ? h = x : r.sibling = x;r = x;
      }
    }a && n.forEach(function (a) {
      return b(e, a);
    });return h;
  }return function (a, d, f, h) {
    "object" === (typeof f === "undefined" ? "undefined" : _typeof(f)) && null !== f && f.type === Ve && null === f.key && (f = f.props.children);
    var m = "object" === (typeof f === "undefined" ? "undefined" : _typeof(f)) && null !== f;if (m) switch (f.$$typeof) {case Re:
        a: {
          var r = f.key;for (m = d; null !== m;) {
            if (m.key === r) {
              if (10 === m.tag ? f.type === Ve : m.type === f.type) {
                c(a, m.sibling);d = e(m, f.type === Ve ? f.props.children : f.props, h);d.ref = Ze(m, f);d["return"] = a;a = d;break a;
              } else {
                c(a, m);break;
              }
            } else b(a, m);m = m.sibling;
          }f.type === Ve ? (d = ue(f.props.children, a.internalContextTag, h, f.key), d["return"] = a, a = d) : (h = te(f, a.internalContextTag, h), h.ref = Ze(d, f), h["return"] = a, a = h);
        }return g(a);case Se:
        a: {
          for (m = f.key; null !== d;) {
            if (d.key === m) {
              if (7 === d.tag) {
                c(a, d.sibling);d = e(d, f, h);d["return"] = a;a = d;break a;
              } else {
                c(a, d);break;
              }
            } else b(a, d);d = d.sibling;
          }d = we(f, a.internalContextTag, h);d["return"] = a;a = d;
        }return g(a);case Te:
        a: {
          if (null !== d) if (9 === d.tag) {
            c(a, d.sibling);d = e(d, null, h);d.type = f.value;d["return"] = a;a = d;break a;
          } else c(a, d);d = xe(f, a.internalContextTag, h);d.type = f.value;d["return"] = a;a = d;
        }return g(a);case Ue:
        a: {
          for (m = f.key; null !== d;) {
            if (d.key === m) {
              if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                c(a, d.sibling);d = e(d, f.children || [], h);d["return"] = a;a = d;break a;
              } else {
                c(a, d);break;
              }
            } else b(a, d);d = d.sibling;
          }d = ye(f, a.internalContextTag, h);d["return"] = a;a = d;
        }return g(a);}if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f, h)) : (c(a, d), d = ve(f, a.internalContextTag, h)), d["return"] = a, a = d, g(a);if (Ye(f)) return L(a, d, f, h);if (Xe(f)) return N(a, d, f, h);m && $e(a, f);if ("undefined" === typeof f) switch (a.tag) {case 2:case 1:
        h = a.type, E("152", h.displayName || h.name || "Component");}return c(a, d);
  };
}var bf = af(!0),
    cf = af(!1);
function df(a, b, c, d, e) {
  function f(a, b, c) {
    var d = b.expirationTime;b.child = null === a ? cf(b, null, c, d) : bf(b, a.child, c, d);
  }function g(a, b) {
    var c = b.ref;null === c || a && a.ref === c || (b.effectTag |= 128);
  }function h(a, b, c, d) {
    g(a, b);if (!c) return d && re(b, !1), q(a, b);c = b.stateNode;id.current = b;var e = c.render();b.effectTag |= 1;f(a, b, e);b.memoizedState = c.state;b.memoizedProps = c.props;d && re(b, !0);return b.child;
  }function k(a) {
    var b = a.stateNode;b.pendingContext ? oe(a, b.pendingContext, b.pendingContext !== b.context) : b.context && oe(a, b.context, !1);I(a, b.containerInfo);
  }function q(a, b) {
    null !== a && b.child !== a.child ? E("153") : void 0;if (null !== b.child) {
      a = b.child;var c = se(a, a.pendingProps, a.expirationTime);b.child = c;for (c["return"] = b; null !== a.sibling;) {
        a = a.sibling, c = c.sibling = se(a, a.pendingProps, a.expirationTime), c["return"] = b;
      }c.sibling = null;
    }return b.child;
  }function v(a, b) {
    switch (b.tag) {case 3:
        k(b);break;case 2:
        qe(b);break;case 4:
        I(b, b.stateNode.containerInfo);}return null;
  }var y = a.shouldSetTextContent,
      u = a.useSyncScheduling,
      z = a.shouldDeprioritizeSubtree,
      G = b.pushHostContext,
      I = b.pushHostContainer,
      L = c.enterHydrationState,
      N = c.resetHydrationState,
      J = c.tryToClaimNextHydratableInstance;a = Le(d, e, function (a, b) {
    a.memoizedProps = b;
  }, function (a, b) {
    a.memoizedState = b;
  });var w = a.adoptClassInstance,
      m = a.constructClassInstance,
      A = a.mountClassInstance,
      Ob = a.updateClassInstance;return { beginWork: function beginWork(a, b, c) {
      if (0 === b.expirationTime || b.expirationTime > c) return v(a, b);switch (b.tag) {case 0:
          null !== a ? E("155") : void 0;var d = b.type,
              e = b.pendingProps,
              r = ke(b);r = me(b, r);d = d(e, r);b.effectTag |= 1;"object" === (typeof d === "undefined" ? "undefined" : _typeof(d)) && null !== d && "function" === typeof d.render ? (b.tag = 2, e = qe(b), w(b, d), A(b, c), b = h(a, b, !0, e)) : (b.tag = 1, f(a, b, d), b.memoizedProps = e, b = b.child);return b;case 1:
          a: {
            e = b.type;c = b.pendingProps;d = b.memoizedProps;if (X.current) null === c && (c = d);else if (null === c || d === c) {
              b = q(a, b);break a;
            }d = ke(b);d = me(b, d);e = e(c, d);b.effectTag |= 1;f(a, b, e);b.memoizedProps = c;b = b.child;
          }return b;case 2:
          return e = qe(b), d = void 0, null === a ? b.stateNode ? E("153") : (m(b, b.pendingProps), A(b, c), d = !0) : d = Ob(a, b, c), h(a, b, d, e);case 3:
          return k(b), e = b.updateQueue, null !== e ? (d = b.memoizedState, e = Je(a, b, e, null, null, c), d === e ? (N(), b = q(a, b)) : (d = e.element, r = b.stateNode, (null === a || null === a.child) && r.hydrate && L(b) ? (b.effectTag |= 2, b.child = cf(b, null, d, c)) : (N(), f(a, b, d)), b.memoizedState = e, b = b.child)) : (N(), b = q(a, b)), b;case 5:
          G(b);null === a && J(b);e = b.type;var n = b.memoizedProps;d = b.pendingProps;null === d && (d = n, null === d ? E("154") : void 0);r = null !== a ? a.memoizedProps : null;X.current || null !== d && n !== d ? (n = d.children, y(e, d) ? n = null : r && y(e, r) && (b.effectTag |= 16), g(a, b), 2147483647 !== c && !u && z(e, d) ? (b.expirationTime = 2147483647, b = null) : (f(a, b, n), b.memoizedProps = d, b = b.child)) : b = q(a, b);return b;case 6:
          return null === a && J(b), a = b.pendingProps, null === a && (a = b.memoizedProps), b.memoizedProps = a, null;case 8:
          b.tag = 7;case 7:
          e = b.pendingProps;if (X.current) null === e && (e = a && a.memoizedProps, null === e ? E("154") : void 0);else if (null === e || b.memoizedProps === e) e = b.memoizedProps;d = e.children;b.stateNode = null === a ? cf(b, b.stateNode, d, c) : bf(b, b.stateNode, d, c);b.memoizedProps = e;return b.stateNode;
        case 9:
          return null;case 4:
          a: {
            I(b, b.stateNode.containerInfo);e = b.pendingProps;if (X.current) null === e && (e = a && a.memoizedProps, null == e ? E("154") : void 0);else if (null === e || b.memoizedProps === e) {
              b = q(a, b);break a;
            }null === a ? b.child = bf(b, null, e, c) : f(a, b, e);b.memoizedProps = e;b = b.child;
          }return b;case 10:
          a: {
            c = b.pendingProps;if (X.current) null === c && (c = b.memoizedProps);else if (null === c || b.memoizedProps === c) {
              b = q(a, b);break a;
            }f(a, b, c);b.memoizedProps = c;b = b.child;
          }return b;default:
          E("156");}
    }, beginFailedWork: function beginFailedWork(a, b, c) {
      switch (b.tag) {case 2:
          qe(b);break;case 3:
          k(b);break;default:
          E("157");}b.effectTag |= 64;null === a ? b.child = null : b.child !== a.child && (b.child = a.child);if (0 === b.expirationTime || b.expirationTime > c) return v(a, b);b.firstEffect = null;b.lastEffect = null;b.child = null === a ? cf(b, null, null, c) : bf(b, a.child, null, c);2 === b.tag && (a = b.stateNode, b.memoizedProps = a.props, b.memoizedState = a.state);return b.child;
    } };
}
function ef(a, b, c) {
  function d(a) {
    a.effectTag |= 4;
  }var e = a.createInstance,
      f = a.createTextInstance,
      g = a.appendInitialChild,
      h = a.finalizeInitialChildren,
      k = a.prepareUpdate,
      q = a.persistence,
      v = b.getRootHostContainer,
      y = b.popHostContext,
      u = b.getHostContext,
      z = b.popHostContainer,
      G = c.prepareToHydrateHostInstance,
      I = c.prepareToHydrateHostTextInstance,
      L = c.popHydrationState,
      N = void 0,
      J = void 0,
      w = void 0;a.mutation ? (N = function N() {}, J = function J(a, b, c) {
    (b.updateQueue = c) && d(b);
  }, w = function w(a, b, c, e) {
    c !== e && d(b);
  }) : q ? E("235") : E("236");
  return { completeWork: function completeWork(a, b, c) {
      var m = b.pendingProps;if (null === m) m = b.memoizedProps;else if (2147483647 !== b.expirationTime || 2147483647 === c) b.pendingProps = null;switch (b.tag) {case 1:
          return null;case 2:
          return ne(b), null;case 3:
          z(b);V(X, b);V(ie, b);m = b.stateNode;m.pendingContext && (m.context = m.pendingContext, m.pendingContext = null);if (null === a || null === a.child) L(b), b.effectTag &= -3;N(b);return null;case 5:
          y(b);c = v();var A = b.type;if (null !== a && null != b.stateNode) {
            var p = a.memoizedProps,
                q = b.stateNode,
                x = u();q = k(q, A, p, m, c, x);J(a, b, q, A, p, m, c);a.ref !== b.ref && (b.effectTag |= 128);
          } else {
            if (!m) return null === b.stateNode ? E("166") : void 0, null;a = u();if (L(b)) G(b, c, a) && d(b);else {
              a = e(A, m, c, a, b);a: for (p = b.child; null !== p;) {
                if (5 === p.tag || 6 === p.tag) g(a, p.stateNode);else if (4 !== p.tag && null !== p.child) {
                  p.child["return"] = p;p = p.child;continue;
                }if (p === b) break;for (; null === p.sibling;) {
                  if (null === p["return"] || p["return"] === b) break a;p = p["return"];
                }p.sibling["return"] = p["return"];p = p.sibling;
              }h(a, A, m, c) && d(b);b.stateNode = a;
            }null !== b.ref && (b.effectTag |= 128);
          }return null;case 6:
          if (a && null != b.stateNode) w(a, b, a.memoizedProps, m);else {
            if ("string" !== typeof m) return null === b.stateNode ? E("166") : void 0, null;a = v();c = u();L(b) ? I(b) && d(b) : b.stateNode = f(m, a, c, b);
          }return null;case 7:
          (m = b.memoizedProps) ? void 0 : E("165");b.tag = 8;A = [];a: for ((p = b.stateNode) && (p["return"] = b); null !== p;) {
            if (5 === p.tag || 6 === p.tag || 4 === p.tag) E("247");else if (9 === p.tag) A.push(p.type);else if (null !== p.child) {
              p.child["return"] = p;p = p.child;continue;
            }for (; null === p.sibling;) {
              if (null === p["return"] || p["return"] === b) break a;p = p["return"];
            }p.sibling["return"] = p["return"];p = p.sibling;
          }p = m.handler;m = p(m.props, A);b.child = bf(b, null !== a ? a.child : null, m, c);return b.child;case 8:
          return b.tag = 7, null;case 9:
          return null;case 10:
          return null;case 4:
          return z(b), N(b), null;case 0:
          E("167");default:
          E("156");}
    } };
}
function ff(a, b) {
  function c(a) {
    var c = a.ref;if (null !== c) try {
      c(null);
    } catch (A) {
      b(a, A);
    }
  }function d(a) {
    "function" === typeof Ee && Ee(a);switch (a.tag) {case 2:
        c(a);var d = a.stateNode;if ("function" === typeof d.componentWillUnmount) try {
          d.props = a.memoizedProps, d.state = a.memoizedState, d.componentWillUnmount();
        } catch (A) {
          b(a, A);
        }break;case 5:
        c(a);break;case 7:
        e(a.stateNode);break;case 4:
        k && g(a);}
  }function e(a) {
    for (var b = a;;) {
      if (d(b), null === b.child || k && 4 === b.tag) {
        if (b === a) break;for (; null === b.sibling;) {
          if (null === b["return"] || b["return"] === a) return;b = b["return"];
        }b.sibling["return"] = b["return"];b = b.sibling;
      } else b.child["return"] = b, b = b.child;
    }
  }function f(a) {
    return 5 === a.tag || 3 === a.tag || 4 === a.tag;
  }function g(a) {
    for (var b = a, c = !1, f = void 0, g = void 0;;) {
      if (!c) {
        c = b["return"];a: for (;;) {
          null === c ? E("160") : void 0;switch (c.tag) {case 5:
              f = c.stateNode;g = !1;break a;case 3:
              f = c.stateNode.containerInfo;g = !0;break a;case 4:
              f = c.stateNode.containerInfo;g = !0;break a;}c = c["return"];
        }c = !0;
      }if (5 === b.tag || 6 === b.tag) e(b), g ? J(f, b.stateNode) : N(f, b.stateNode);else if (4 === b.tag ? f = b.stateNode.containerInfo : d(b), null !== b.child) {
        b.child["return"] = b;b = b.child;continue;
      }if (b === a) break;for (; null === b.sibling;) {
        if (null === b["return"] || b["return"] === a) return;b = b["return"];4 === b.tag && (c = !1);
      }b.sibling["return"] = b["return"];b = b.sibling;
    }
  }var h = a.getPublicInstance,
      k = a.mutation;a = a.persistence;k || (a ? E("235") : E("236"));var q = k.commitMount,
      v = k.commitUpdate,
      y = k.resetTextContent,
      u = k.commitTextUpdate,
      z = k.appendChild,
      G = k.appendChildToContainer,
      I = k.insertBefore,
      L = k.insertInContainerBefore,
      N = k.removeChild,
      J = k.removeChildFromContainer;return { commitResetTextContent: function commitResetTextContent(a) {
      y(a.stateNode);
    }, commitPlacement: function commitPlacement(a) {
      a: {
        for (var b = a["return"]; null !== b;) {
          if (f(b)) {
            var c = b;break a;
          }b = b["return"];
        }E("160");c = void 0;
      }var d = b = void 0;switch (c.tag) {case 5:
          b = c.stateNode;d = !1;break;case 3:
          b = c.stateNode.containerInfo;d = !0;break;case 4:
          b = c.stateNode.containerInfo;d = !0;break;default:
          E("161");}c.effectTag & 16 && (y(b), c.effectTag &= -17);a: b: for (c = a;;) {
        for (; null === c.sibling;) {
          if (null === c["return"] || f(c["return"])) {
            c = null;break a;
          }c = c["return"];
        }c.sibling["return"] = c["return"];for (c = c.sibling; 5 !== c.tag && 6 !== c.tag;) {
          if (c.effectTag & 2) continue b;if (null === c.child || 4 === c.tag) continue b;else c.child["return"] = c, c = c.child;
        }if (!(c.effectTag & 2)) {
          c = c.stateNode;break a;
        }
      }for (var e = a;;) {
        if (5 === e.tag || 6 === e.tag) c ? d ? L(b, e.stateNode, c) : I(b, e.stateNode, c) : d ? G(b, e.stateNode) : z(b, e.stateNode);else if (4 !== e.tag && null !== e.child) {
          e.child["return"] = e;e = e.child;continue;
        }if (e === a) break;for (; null === e.sibling;) {
          if (null === e["return"] || e["return"] === a) return;e = e["return"];
        }e.sibling["return"] = e["return"];e = e.sibling;
      }
    }, commitDeletion: function commitDeletion(a) {
      g(a);a["return"] = null;a.child = null;a.alternate && (a.alternate.child = null, a.alternate["return"] = null);
    }, commitWork: function commitWork(a, b) {
      switch (b.tag) {case 2:
          break;case 5:
          var c = b.stateNode;if (null != c) {
            var d = b.memoizedProps;a = null !== a ? a.memoizedProps : d;var e = b.type,
                f = b.updateQueue;b.updateQueue = null;null !== f && v(c, f, e, a, d, b);
          }break;case 6:
          null === b.stateNode ? E("162") : void 0;c = b.memoizedProps;u(b.stateNode, null !== a ? a.memoizedProps : c, c);break;case 3:
          break;default:
          E("163");}
    }, commitLifeCycles: function commitLifeCycles(a, b) {
      switch (b.tag) {case 2:
          var c = b.stateNode;if (b.effectTag & 4) if (null === a) c.props = b.memoizedProps, c.state = b.memoizedState, c.componentDidMount();else {
            var d = a.memoizedProps;a = a.memoizedState;c.props = b.memoizedProps;c.state = b.memoizedState;c.componentDidUpdate(d, a);
          }b = b.updateQueue;null !== b && Ke(b, c);break;case 3:
          c = b.updateQueue;null !== c && Ke(c, null !== b.child ? b.child.stateNode : null);break;case 5:
          c = b.stateNode;null === a && b.effectTag & 4 && q(c, b.type, b.memoizedProps, b);break;case 6:
          break;case 4:
          break;default:
          E("163");}
    }, commitAttachRef: function commitAttachRef(a) {
      var b = a.ref;if (null !== b) {
        var c = a.stateNode;switch (a.tag) {case 5:
            b(h(c));break;default:
            b(c);}
      }
    }, commitDetachRef: function commitDetachRef(a) {
      a = a.ref;null !== a && a(null);
    } };
}var gf = {};
function hf(a) {
  function b(a) {
    a === gf ? E("174") : void 0;return a;
  }var c = a.getChildHostContext,
      d = a.getRootHostContext,
      e = { current: gf },
      f = { current: gf },
      g = { current: gf };return { getHostContext: function getHostContext() {
      return b(e.current);
    }, getRootHostContainer: function getRootHostContainer() {
      return b(g.current);
    }, popHostContainer: function popHostContainer(a) {
      V(e, a);V(f, a);V(g, a);
    }, popHostContext: function popHostContext(a) {
      f.current === a && (V(e, a), V(f, a));
    }, pushHostContainer: function pushHostContainer(a, b) {
      W(g, b, a);b = d(b);W(f, a, a);W(e, b, a);
    }, pushHostContext: function pushHostContext(a) {
      var d = b(g.current),
          h = b(e.current);
      d = c(h, a.type, d);h !== d && (W(f, a, a), W(e, d, a));
    }, resetHostContainer: function resetHostContainer() {
      e.current = gf;g.current = gf;
    } };
}
function jf(a) {
  function b(a, b) {
    var c = new Y(5, null, 0);c.type = "DELETED";c.stateNode = b;c["return"] = a;c.effectTag = 8;null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
  }function c(a, b) {
    switch (a.tag) {case 5:
        return b = f(b, a.type, a.pendingProps), null !== b ? (a.stateNode = b, !0) : !1;case 6:
        return b = g(b, a.pendingProps), null !== b ? (a.stateNode = b, !0) : !1;default:
        return !1;}
  }function d(a) {
    for (a = a["return"]; null !== a && 5 !== a.tag && 3 !== a.tag;) {
      a = a["return"];
    }y = a;
  }var e = a.shouldSetTextContent;
  a = a.hydration;if (!a) return { enterHydrationState: function enterHydrationState() {
      return !1;
    }, resetHydrationState: function resetHydrationState() {}, tryToClaimNextHydratableInstance: function tryToClaimNextHydratableInstance() {}, prepareToHydrateHostInstance: function prepareToHydrateHostInstance() {
      E("175");
    }, prepareToHydrateHostTextInstance: function prepareToHydrateHostTextInstance() {
      E("176");
    }, popHydrationState: function popHydrationState() {
      return !1;
    } };var f = a.canHydrateInstance,
      g = a.canHydrateTextInstance,
      h = a.getNextHydratableSibling,
      k = a.getFirstHydratableChild,
      q = a.hydrateInstance,
      v = a.hydrateTextInstance,
      y = null,
      u = null,
      z = !1;return { enterHydrationState: function enterHydrationState(a) {
      u = k(a.stateNode.containerInfo);y = a;return z = !0;
    }, resetHydrationState: function resetHydrationState() {
      u = y = null;z = !1;
    }, tryToClaimNextHydratableInstance: function tryToClaimNextHydratableInstance(a) {
      if (z) {
        var d = u;if (d) {
          if (!c(a, d)) {
            d = h(d);if (!d || !c(a, d)) {
              a.effectTag |= 2;z = !1;y = a;return;
            }b(y, u);
          }y = a;u = k(d);
        } else a.effectTag |= 2, z = !1, y = a;
      }
    }, prepareToHydrateHostInstance: function prepareToHydrateHostInstance(a, b, c) {
      b = q(a.stateNode, a.type, a.memoizedProps, b, c, a);a.updateQueue = b;return null !== b ? !0 : !1;
    }, prepareToHydrateHostTextInstance: function prepareToHydrateHostTextInstance(a) {
      return v(a.stateNode, a.memoizedProps, a);
    }, popHydrationState: function popHydrationState(a) {
      if (a !== y) return !1;if (!z) return d(a), z = !0, !1;var c = a.type;if (5 !== a.tag || "head" !== c && "body" !== c && !e(c, a.memoizedProps)) for (c = u; c;) {
        b(a, c), c = h(c);
      }d(a);u = y ? h(a.stateNode) : null;return !0;
    } };
}
function kf(a) {
  function b(a) {
    Qb = ja = !0;var b = a.stateNode;b.current === a ? E("177") : void 0;b.isReadyForCommit = !1;id.current = null;if (1 < a.effectTag) {
      if (null !== a.lastEffect) {
        a.lastEffect.nextEffect = a;var c = a.firstEffect;
      } else c = a;
    } else c = a.firstEffect;yg();for (t = c; null !== t;) {
      var d = !1,
          e = void 0;try {
        for (; null !== t;) {
          var f = t.effectTag;f & 16 && zg(t);if (f & 128) {
            var g = t.alternate;null !== g && Ag(g);
          }switch (f & -242) {case 2:
              Ne(t);t.effectTag &= -3;break;case 6:
              Ne(t);t.effectTag &= -3;Oe(t.alternate, t);break;case 4:
              Oe(t.alternate, t);break;case 8:
              Sc = !0, Bg(t), Sc = !1;}t = t.nextEffect;
        }
      } catch (Tc) {
        d = !0, e = Tc;
      }d && (null === t ? E("178") : void 0, h(t, e), null !== t && (t = t.nextEffect));
    }Cg();b.current = a;for (t = c; null !== t;) {
      c = !1;d = void 0;try {
        for (; null !== t;) {
          var k = t.effectTag;k & 36 && Dg(t.alternate, t);k & 128 && Eg(t);if (k & 64) switch (e = t, f = void 0, null !== R && (f = R.get(e), R["delete"](e), null == f && null !== e.alternate && (e = e.alternate, f = R.get(e), R["delete"](e))), null == f ? E("184") : void 0, e.tag) {case 2:
              e.stateNode.componentDidCatch(f.error, { componentStack: f.componentStack });
              break;case 3:
              null === ca && (ca = f.error);break;default:
              E("157");}var Qc = t.nextEffect;t.nextEffect = null;t = Qc;
        }
      } catch (Tc) {
        c = !0, d = Tc;
      }c && (null === t ? E("178") : void 0, h(t, d), null !== t && (t = t.nextEffect));
    }ja = Qb = !1;"function" === typeof De && De(a.stateNode);ha && (ha.forEach(G), ha = null);null !== ca && (a = ca, ca = null, Ob(a));b = b.current.expirationTime;0 === b && (qa = R = null);return b;
  }function c(a) {
    for (;;) {
      var b = Fg(a.alternate, a, H),
          c = a["return"],
          d = a.sibling;var e = a;if (2147483647 === H || 2147483647 !== e.expirationTime) {
        if (2 !== e.tag && 3 !== e.tag) var f = 0;else f = e.updateQueue, f = null === f ? 0 : f.expirationTime;for (var g = e.child; null !== g;) {
          0 !== g.expirationTime && (0 === f || f > g.expirationTime) && (f = g.expirationTime), g = g.sibling;
        }e.expirationTime = f;
      }if (null !== b) return b;null !== c && (null === c.firstEffect && (c.firstEffect = a.firstEffect), null !== a.lastEffect && (null !== c.lastEffect && (c.lastEffect.nextEffect = a.firstEffect), c.lastEffect = a.lastEffect), 1 < a.effectTag && (null !== c.lastEffect ? c.lastEffect.nextEffect = a : c.firstEffect = a, c.lastEffect = a));if (null !== d) return d;
      if (null !== c) a = c;else {
        a.stateNode.isReadyForCommit = !0;break;
      }
    }return null;
  }function d(a) {
    var b = rg(a.alternate, a, H);null === b && (b = c(a));id.current = null;return b;
  }function e(a) {
    var b = Gg(a.alternate, a, H);null === b && (b = c(a));id.current = null;return b;
  }function f(a) {
    if (null !== R) {
      if (!(0 === H || H > a)) if (H <= Uc) for (; null !== F;) {
        F = k(F) ? e(F) : d(F);
      } else for (; null !== F && !A();) {
        F = k(F) ? e(F) : d(F);
      }
    } else if (!(0 === H || H > a)) if (H <= Uc) for (; null !== F;) {
      F = d(F);
    } else for (; null !== F && !A();) {
      F = d(F);
    }
  }function g(a, b) {
    ja ? E("243") : void 0;ja = !0;a.isReadyForCommit = !1;if (a !== ra || b !== H || null === F) {
      for (; -1 < he;) {
        ge[he] = null, he--;
      }je = D;ie.current = D;X.current = !1;x();ra = a;H = b;F = se(ra.current, null, b);
    }var c = !1,
        d = null;try {
      f(b);
    } catch (Rc) {
      c = !0, d = Rc;
    }for (; c;) {
      if (eb) {
        ca = d;break;
      }var g = F;if (null === g) eb = !0;else {
        var k = h(g, d);null === k ? E("183") : void 0;if (!eb) {
          try {
            c = k;d = b;for (k = c; null !== g;) {
              switch (g.tag) {case 2:
                  ne(g);break;case 5:
                  qg(g);break;case 3:
                  p(g);break;case 4:
                  p(g);}if (g === k || g.alternate === k) break;g = g["return"];
            }F = e(c);f(d);
          } catch (Rc) {
            c = !0;d = Rc;continue;
          }break;
        }
      }
    }b = ca;eb = ja = !1;ca = null;null !== b && Ob(b);return a.isReadyForCommit ? a.current.alternate : null;
  }function h(a, b) {
    var c = id.current = null,
        d = !1,
        e = !1,
        f = null;if (3 === a.tag) c = a, q(a) && (eb = !0);else for (var g = a["return"]; null !== g && null === c;) {
      2 === g.tag ? "function" === typeof g.stateNode.componentDidCatch && (d = !0, f = jd(g), c = g, e = !0) : 3 === g.tag && (c = g);if (q(g)) {
        if (Sc || null !== ha && (ha.has(g) || null !== g.alternate && ha.has(g.alternate))) return null;c = null;e = !1;
      }g = g["return"];
    }if (null !== c) {
      null === qa && (qa = new Set());qa.add(c);var h = "";g = a;do {
        a: switch (g.tag) {case 0:case 1:case 2:case 5:
            var k = g._debugOwner,
                Qc = g._debugSource;var m = jd(g);var n = null;k && (n = jd(k));k = Qc;m = "\n    in " + (m || "Unknown") + (k ? " (at " + k.fileName.replace(/^.*[\\\/]/, "") + ":" + k.lineNumber + ")" : n ? " (created by " + n + ")" : "");break a;default:
            m = "";}h += m;g = g["return"];
      } while (g);g = h;a = jd(a);null === R && (R = new Map());b = { componentName: a, componentStack: g, error: b, errorBoundary: d ? c.stateNode : null, errorBoundaryFound: d, errorBoundaryName: f, willRetry: e };R.set(c, b);try {
        var p = b.error;p && p.suppressReactErrorLogging || console.error(p);
      } catch (Vc) {
        Vc && Vc.suppressReactErrorLogging || console.error(Vc);
      }Qb ? (null === ha && (ha = new Set()), ha.add(c)) : G(c);return c;
    }null === ca && (ca = b);return null;
  }function k(a) {
    return null !== R && (R.has(a) || null !== a.alternate && R.has(a.alternate));
  }function q(a) {
    return null !== qa && (qa.has(a) || null !== a.alternate && qa.has(a.alternate));
  }function v() {
    return 20 * (((I() + 100) / 20 | 0) + 1);
  }function y(a) {
    return 0 !== ka ? ka : ja ? Qb ? 1 : H : !Hg || a.internalContextTag & 1 ? v() : 1;
  }function u(a, b) {
    return z(a, b, !1);
  }function z(a, b) {
    for (; null !== a;) {
      if (0 === a.expirationTime || a.expirationTime > b) a.expirationTime = b;null !== a.alternate && (0 === a.alternate.expirationTime || a.alternate.expirationTime > b) && (a.alternate.expirationTime = b);if (null === a["return"]) if (3 === a.tag) {
        var c = a.stateNode;!ja && c === ra && b < H && (F = ra = null, H = 0);var d = c,
            e = b;Rb > Ig && E("185");if (null === d.nextScheduledRoot) d.remainingExpirationTime = e, null === O ? (sa = O = d, d.nextScheduledRoot = d) : (O = O.nextScheduledRoot = d, O.nextScheduledRoot = sa);else {
          var f = d.remainingExpirationTime;if (0 === f || e < f) d.remainingExpirationTime = e;
        }Fa || (la ? Sb && (ma = d, na = 1, m(ma, na)) : 1 === e ? w(1, null) : L(e));!ja && c === ra && b < H && (F = ra = null, H = 0);
      } else break;a = a["return"];
    }
  }function G(a) {
    z(a, 1, !0);
  }function I() {
    return Uc = ((Wc() - Pe) / 10 | 0) + 2;
  }function L(a) {
    if (0 !== Tb) {
      if (a > Tb) return;Jg(Xc);
    }var b = Wc() - Pe;Tb = a;Xc = Kg(J, { timeout: 10 * (a - 2) - b });
  }function N() {
    var a = 0,
        b = null;if (null !== O) for (var c = O, d = sa; null !== d;) {
      var e = d.remainingExpirationTime;if (0 === e) {
        null === c || null === O ? E("244") : void 0;if (d === d.nextScheduledRoot) {
          sa = O = d.nextScheduledRoot = null;break;
        } else if (d === sa) sa = e = d.nextScheduledRoot, O.nextScheduledRoot = e, d.nextScheduledRoot = null;else if (d === O) {
          O = c;O.nextScheduledRoot = sa;d.nextScheduledRoot = null;break;
        } else c.nextScheduledRoot = d.nextScheduledRoot, d.nextScheduledRoot = null;d = c.nextScheduledRoot;
      } else {
        if (0 === a || e < a) a = e, b = d;if (d === O) break;c = d;d = d.nextScheduledRoot;
      }
    }c = ma;null !== c && c === b ? Rb++ : Rb = 0;ma = b;na = a;
  }function J(a) {
    w(0, a);
  }function w(a, b) {
    fb = b;for (N(); null !== ma && 0 !== na && (0 === a || na <= a) && !Yc;) {
      m(ma, na), N();
    }null !== fb && (Tb = 0, Xc = -1);0 !== na && L(na);fb = null;Yc = !1;Rb = 0;if (Ub) throw a = Zc, Zc = null, Ub = !1, a;
  }function m(a, c) {
    Fa ? E("245") : void 0;Fa = !0;if (c <= I()) {
      var d = a.finishedWork;null !== d ? (a.finishedWork = null, a.remainingExpirationTime = b(d)) : (a.finishedWork = null, d = g(a, c), null !== d && (a.remainingExpirationTime = b(d)));
    } else d = a.finishedWork, null !== d ? (a.finishedWork = null, a.remainingExpirationTime = b(d)) : (a.finishedWork = null, d = g(a, c), null !== d && (A() ? a.finishedWork = d : a.remainingExpirationTime = b(d)));Fa = !1;
  }function A() {
    return null === fb || fb.timeRemaining() > Lg ? !1 : Yc = !0;
  }function Ob(a) {
    null === ma ? E("246") : void 0;ma.remainingExpirationTime = 0;Ub || (Ub = !0, Zc = a);
  }var r = hf(a),
      n = jf(a),
      p = r.popHostContainer,
      qg = r.popHostContext,
      x = r.resetHostContainer,
      Me = df(a, r, n, u, y),
      rg = Me.beginWork,
      Gg = Me.beginFailedWork,
      Fg = ef(a, r, n).completeWork;r = ff(a, h);var zg = r.commitResetTextContent,
      Ne = r.commitPlacement,
      Bg = r.commitDeletion,
      Oe = r.commitWork,
      Dg = r.commitLifeCycles,
      Eg = r.commitAttachRef,
      Ag = r.commitDetachRef,
      Wc = a.now,
      Kg = a.scheduleDeferredCallback,
      Jg = a.cancelDeferredCallback,
      Hg = a.useSyncScheduling,
      yg = a.prepareForCommit,
      Cg = a.resetAfterCommit,
      Pe = Wc(),
      Uc = 2,
      ka = 0,
      ja = !1,
      F = null,
      ra = null,
      H = 0,
      t = null,
      R = null,
      qa = null,
      ha = null,
      ca = null,
      eb = !1,
      Qb = !1,
      Sc = !1,
      sa = null,
      O = null,
      Tb = 0,
      Xc = -1,
      Fa = !1,
      ma = null,
      na = 0,
      Yc = !1,
      Ub = !1,
      Zc = null,
      fb = null,
      la = !1,
      Sb = !1,
      Ig = 1E3,
      Rb = 0,
      Lg = 1;return { computeAsyncExpiration: v, computeExpirationForFiber: y, scheduleWork: u, batchedUpdates: function batchedUpdates(a, b) {
      var c = la;la = !0;try {
        return a(b);
      } finally {
        (la = c) || Fa || w(1, null);
      }
    }, unbatchedUpdates: function unbatchedUpdates(a) {
      if (la && !Sb) {
        Sb = !0;try {
          return a();
        } finally {
          Sb = !1;
        }
      }return a();
    }, flushSync: function flushSync(a) {
      var b = la;la = !0;try {
        a: {
          var c = ka;ka = 1;try {
            var d = a();break a;
          } finally {
            ka = c;
          }d = void 0;
        }return d;
      } finally {
        la = b, Fa ? E("187") : void 0, w(1, null);
      }
    }, deferredUpdates: function deferredUpdates(a) {
      var b = ka;ka = v();try {
        return a();
      } finally {
        ka = b;
      }
    } };
}
function lf(a) {
  function b(a) {
    a = od(a);return null === a ? null : a.stateNode;
  }var c = a.getPublicInstance;a = kf(a);var d = a.computeAsyncExpiration,
      e = a.computeExpirationForFiber,
      f = a.scheduleWork;return { createContainer: function createContainer(a, b) {
      var c = new Y(3, null, 0);a = { current: c, containerInfo: a, pendingChildren: null, remainingExpirationTime: 0, isReadyForCommit: !1, finishedWork: null, context: null, pendingContext: null, hydrate: b, nextScheduledRoot: null };return c.stateNode = a;
    }, updateContainer: function updateContainer(a, b, c, q) {
      var g = b.current;if (c) {
        c = c._reactInternalFiber;var h;b: {
          2 === kd(c) && 2 === c.tag ? void 0 : E("170");for (h = c; 3 !== h.tag;) {
            if (le(h)) {
              h = h.stateNode.__reactInternalMemoizedMergedChildContext;break b;
            }(h = h["return"]) ? void 0 : E("171");
          }h = h.stateNode.context;
        }c = le(c) ? pe(c, h) : h;
      } else c = D;null === b.context ? b.context = c : b.pendingContext = c;b = q;b = void 0 === b ? null : b;q = null != a && null != a.type && null != a.type.prototype && !0 === a.type.prototype.unstable_isAsyncReactComponent ? d() : e(g);He(g, { expirationTime: q, partialState: { element: a }, callback: b, isReplace: !1, isForced: !1,
        nextCallback: null, next: null });f(g, q);
    }, batchedUpdates: a.batchedUpdates, unbatchedUpdates: a.unbatchedUpdates, deferredUpdates: a.deferredUpdates, flushSync: a.flushSync, getPublicRootInstance: function getPublicRootInstance(a) {
      a = a.current;if (!a.child) return null;switch (a.child.tag) {case 5:
          return c(a.child.stateNode);default:
          return a.child.stateNode;}
    }, findHostInstance: b, findHostInstanceWithNoPortals: function findHostInstanceWithNoPortals(a) {
      a = pd(a);return null === a ? null : a.stateNode;
    }, injectIntoDevTools: function injectIntoDevTools(a) {
      var c = a.findFiberByHostInstance;return Ce(B({}, a, { findHostInstanceByFiber: function findHostInstanceByFiber(a) {
          return b(a);
        }, findFiberByHostInstance: function findFiberByHostInstance(a) {
          return c ? c(a) : null;
        } }));
    } };
}var mf = Object.freeze({ default: lf }),
    nf = mf && lf || mf,
    of = nf["default"] ? nf["default"] : nf;function pf(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;return { $$typeof: Ue, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}var qf = "object" === (typeof performance === "undefined" ? "undefined" : _typeof(performance)) && "function" === typeof performance.now,
    rf = void 0;rf = qf ? function () {
  return performance.now();
} : function () {
  return Date.now();
};
var sf = void 0,
    tf = void 0;
if (l.canUseDOM) {
  if ("function" !== typeof requestIdleCallback || "function" !== typeof cancelIdleCallback) {
    var uf = null,
        vf = !1,
        wf = -1,
        xf = !1,
        yf = 0,
        zf = 33,
        Af = 33,
        Bf;Bf = qf ? { didTimeout: !1, timeRemaining: function timeRemaining() {
        var a = yf - performance.now();return 0 < a ? a : 0;
      } } : { didTimeout: !1, timeRemaining: function timeRemaining() {
        var a = yf - Date.now();return 0 < a ? a : 0;
      } };var Cf = "__reactIdleCallback$" + Math.random().toString(36).slice(2);window.addEventListener("message", function (a) {
      if (a.source === window && a.data === Cf) {
        vf = !1;a = rf();if (0 >= yf - a) {
          if (-1 !== wf && wf <= a) Bf.didTimeout = !0;else {
            xf || (xf = !0, requestAnimationFrame(Df));return;
          }
        } else Bf.didTimeout = !1;wf = -1;a = uf;uf = null;null !== a && a(Bf);
      }
    }, !1);var Df = function Df(a) {
      xf = !1;var b = a - yf + Af;b < Af && zf < Af ? (8 > b && (b = 8), Af = b < zf ? zf : b) : zf = b;yf = a + Af;vf || (vf = !0, window.postMessage(Cf, "*"));
    };sf = function sf(a, b) {
      uf = a;null != b && "number" === typeof b.timeout && (wf = rf() + b.timeout);xf || (xf = !0, requestAnimationFrame(Df));return 0;
    };tf = function tf() {
      uf = null;vf = !1;wf = -1;
    };
  } else sf = window.requestIdleCallback, tf = window.cancelIdleCallback;
} else sf = function sf(a) {
  return setTimeout(function () {
    a({ timeRemaining: function timeRemaining() {
        return Infinity;
      } });
  });
}, tf = function tf(a) {
  clearTimeout(a);
};var Ef = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Ff = {},
    Gf = {};
function Hf(a) {
  if (Gf.hasOwnProperty(a)) return !0;if (Ff.hasOwnProperty(a)) return !1;if (Ef.test(a)) return Gf[a] = !0;Ff[a] = !0;return !1;
}
function If(a, b, c) {
  var d = wa(b);if (d && va(b, c)) {
    var e = d.mutationMethod;e ? e(a, c) : null == c || d.hasBooleanValue && !c || d.hasNumericValue && isNaN(c) || d.hasPositiveNumericValue && 1 > c || d.hasOverloadedBooleanValue && !1 === c ? Jf(a, b) : d.mustUseProperty ? a[d.propertyName] = c : (b = d.attributeName, (e = d.attributeNamespace) ? a.setAttributeNS(e, b, "" + c) : d.hasBooleanValue || d.hasOverloadedBooleanValue && !0 === c ? a.setAttribute(b, "") : a.setAttribute(b, "" + c));
  } else Kf(a, b, va(b, c) ? c : null);
}
function Kf(a, b, c) {
  Hf(b) && (null == c ? a.removeAttribute(b) : a.setAttribute(b, "" + c));
}function Jf(a, b) {
  var c = wa(b);c ? (b = c.mutationMethod) ? b(a, void 0) : c.mustUseProperty ? a[c.propertyName] = c.hasBooleanValue ? !1 : "" : a.removeAttribute(c.attributeName) : a.removeAttribute(b);
}
function Lf(a, b) {
  var c = b.value,
      d = b.checked;return B({ type: void 0, step: void 0, min: void 0, max: void 0 }, b, { defaultChecked: void 0, defaultValue: void 0, value: null != c ? c : a._wrapperState.initialValue, checked: null != d ? d : a._wrapperState.initialChecked });
}function Mf(a, b) {
  var c = b.defaultValue;a._wrapperState = { initialChecked: null != b.checked ? b.checked : b.defaultChecked, initialValue: null != b.value ? b.value : c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function Nf(a, b) {
  b = b.checked;null != b && If(a, "checked", b);
}function Of(a, b) {
  Nf(a, b);var c = b.value;if (null != c) {
    if (0 === c && "" === a.value) a.value = "0";else if ("number" === b.type) {
      if (b = parseFloat(a.value) || 0, c != b || c == b && a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
  } else null == b.value && null != b.defaultValue && a.defaultValue !== "" + b.defaultValue && (a.defaultValue = "" + b.defaultValue), null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function Pf(a, b) {
  switch (b.type) {case "submit":case "reset":
      break;case "color":case "date":case "datetime":case "datetime-local":case "month":case "time":case "week":
      a.value = "";a.value = a.defaultValue;break;default:
      a.value = a.value;}b = a.name;"" !== b && (a.name = "");a.defaultChecked = !a.defaultChecked;a.defaultChecked = !a.defaultChecked;"" !== b && (a.name = b);
}function Qf(a) {
  var b = "";aa.Children.forEach(a, function (a) {
    null == a || "string" !== typeof a && "number" !== typeof a || (b += a);
  });return b;
}
function Rf(a, b) {
  a = B({ children: void 0 }, b);if (b = Qf(b.children)) a.children = b;return a;
}function Sf(a, b, c, d) {
  a = a.options;if (b) {
    b = {};for (var e = 0; e < c.length; e++) {
      b["$" + c[e]] = !0;
    }for (c = 0; c < a.length; c++) {
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
    }
  } else {
    c = "" + c;b = null;for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = !0;d && (a[e].defaultSelected = !0);return;
      }null !== b || a[e].disabled || (b = a[e]);
    }null !== b && (b.selected = !0);
  }
}
function Tf(a, b) {
  var c = b.value;a._wrapperState = { initialValue: null != c ? c : b.defaultValue, wasMultiple: !!b.multiple };
}function Uf(a, b) {
  null != b.dangerouslySetInnerHTML ? E("91") : void 0;return B({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}function Vf(a, b) {
  var c = b.value;null == c && (c = b.defaultValue, b = b.children, null != b && (null != c ? E("92") : void 0, Array.isArray(b) && (1 >= b.length ? void 0 : E("93"), b = b[0]), c = "" + b), null == c && (c = ""));a._wrapperState = { initialValue: "" + c };
}
function Wf(a, b) {
  var c = b.value;null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && (a.defaultValue = c));null != b.defaultValue && (a.defaultValue = b.defaultValue);
}function Xf(a) {
  var b = a.textContent;b === a._wrapperState.initialValue && (a.value = b);
}var Yf = { html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg" };
function Zf(a) {
  switch (a) {case "svg":
      return "http://www.w3.org/2000/svg";case "math":
      return "http://www.w3.org/1998/Math/MathML";default:
      return "http://www.w3.org/1999/xhtml";}
}function $f(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? Zf(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var ag = void 0,
    bg = function (a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function () {
      return a(b, c, d, e);
    });
  } : a;
}(function (a, b) {
  if (a.namespaceURI !== Yf.svg || "innerHTML" in a) a.innerHTML = b;else {
    ag = ag || document.createElement("div");ag.innerHTML = "\x3csvg\x3e" + b + "\x3c/svg\x3e";for (b = ag.firstChild; a.firstChild;) {
      a.removeChild(a.firstChild);
    }for (; b.firstChild;) {
      a.appendChild(b.firstChild);
    }
  }
});
function cg(a, b) {
  if (b) {
    var c = a.firstChild;if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;return;
    }
  }a.textContent = b;
}
var dg = { animationIterationCount: !0, borderImageOutset: !0, borderImageSlice: !0, borderImageWidth: !0, boxFlex: !0, boxFlexGroup: !0, boxOrdinalGroup: !0, columnCount: !0, columns: !0, flex: !0, flexGrow: !0, flexPositive: !0, flexShrink: !0, flexNegative: !0, flexOrder: !0, gridRow: !0, gridRowEnd: !0, gridRowSpan: !0, gridRowStart: !0, gridColumn: !0, gridColumnEnd: !0, gridColumnSpan: !0, gridColumnStart: !0, fontWeight: !0, lineClamp: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, tabSize: !0, widows: !0, zIndex: !0, zoom: !0, fillOpacity: !0, floodOpacity: !0,
  stopOpacity: !0, strokeDasharray: !0, strokeDashoffset: !0, strokeMiterlimit: !0, strokeOpacity: !0, strokeWidth: !0 },
    eg = ["Webkit", "ms", "Moz", "O"];Object.keys(dg).forEach(function (a) {
  eg.forEach(function (b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);dg[b] = dg[a];
  });
});
function fg(a, b) {
  a = a.style;for (var c in b) {
    if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--");var e = c;var f = b[c];e = null == f || "boolean" === typeof f || "" === f ? "" : d || "number" !== typeof f || 0 === f || dg.hasOwnProperty(e) && dg[e] ? ("" + f).trim() : f + "px";"float" === c && (c = "cssFloat");d ? a.setProperty(c, e) : a[c] = e;
    }
  }
}var gg = B({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function hg(a, b, c) {
  b && (gg[a] && (null != b.children || null != b.dangerouslySetInnerHTML ? E("137", a, c()) : void 0), null != b.dangerouslySetInnerHTML && (null != b.children ? E("60") : void 0, "object" === _typeof(b.dangerouslySetInnerHTML) && "__html" in b.dangerouslySetInnerHTML ? void 0 : E("61")), null != b.style && "object" !== _typeof(b.style) ? E("62", c()) : void 0);
}
function ig(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;switch (a) {case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":
      return !1;default:
      return !0;}
}var jg = Yf.html,
    kg = C.thatReturns("");
function lg(a, b) {
  a = 9 === a.nodeType || 11 === a.nodeType ? a : a.ownerDocument;var c = Hd(a);b = Sa[b];for (var d = 0; d < b.length; d++) {
    var e = b[d];c.hasOwnProperty(e) && c[e] || ("topScroll" === e ? wd("topScroll", "scroll", a) : "topFocus" === e || "topBlur" === e ? (wd("topFocus", "focus", a), wd("topBlur", "blur", a), c.topBlur = !0, c.topFocus = !0) : "topCancel" === e ? (yc("cancel", !0) && wd("topCancel", "cancel", a), c.topCancel = !0) : "topClose" === e ? (yc("close", !0) && wd("topClose", "close", a), c.topClose = !0) : Dd.hasOwnProperty(e) && U(e, Dd[e], a), c[e] = !0);
  }
}
var mg = { topAbort: "abort", topCanPlay: "canplay", topCanPlayThrough: "canplaythrough", topDurationChange: "durationchange", topEmptied: "emptied", topEncrypted: "encrypted", topEnded: "ended", topError: "error", topLoadedData: "loadeddata", topLoadedMetadata: "loadedmetadata", topLoadStart: "loadstart", topPause: "pause", topPlay: "play", topPlaying: "playing", topProgress: "progress", topRateChange: "ratechange", topSeeked: "seeked", topSeeking: "seeking", topStalled: "stalled", topSuspend: "suspend", topTimeUpdate: "timeupdate", topVolumeChange: "volumechange",
  topWaiting: "waiting" };function ng(a, b, c, d) {
  c = 9 === c.nodeType ? c : c.ownerDocument;d === jg && (d = Zf(a));d === jg ? "script" === a ? (a = c.createElement("div"), a.innerHTML = "\x3cscript\x3e\x3c/script\x3e", a = a.removeChild(a.firstChild)) : a = "string" === typeof b.is ? c.createElement(a, { is: b.is }) : c.createElement(a) : a = c.createElementNS(d, a);return a;
}function og(a, b) {
  return (9 === b.nodeType ? b : b.ownerDocument).createTextNode(a);
}
function pg(a, b, c, d) {
  var e = ig(b, c);switch (b) {case "iframe":case "object":
      U("topLoad", "load", a);var f = c;break;case "video":case "audio":
      for (f in mg) {
        mg.hasOwnProperty(f) && U(f, mg[f], a);
      }f = c;break;case "source":
      U("topError", "error", a);f = c;break;case "img":case "image":
      U("topError", "error", a);U("topLoad", "load", a);f = c;break;case "form":
      U("topReset", "reset", a);U("topSubmit", "submit", a);f = c;break;case "details":
      U("topToggle", "toggle", a);f = c;break;case "input":
      Mf(a, c);f = Lf(a, c);U("topInvalid", "invalid", a);
      lg(d, "onChange");break;case "option":
      f = Rf(a, c);break;case "select":
      Tf(a, c);f = B({}, c, { value: void 0 });U("topInvalid", "invalid", a);lg(d, "onChange");break;case "textarea":
      Vf(a, c);f = Uf(a, c);U("topInvalid", "invalid", a);lg(d, "onChange");break;default:
      f = c;}hg(b, f, kg);var g = f,
      h;for (h in g) {
    if (g.hasOwnProperty(h)) {
      var k = g[h];"style" === h ? fg(a, k, kg) : "dangerouslySetInnerHTML" === h ? (k = k ? k.__html : void 0, null != k && bg(a, k)) : "children" === h ? "string" === typeof k ? ("textarea" !== b || "" !== k) && cg(a, k) : "number" === typeof k && cg(a, "" + k) : "suppressContentEditableWarning" !== h && "suppressHydrationWarning" !== h && "autoFocus" !== h && (Ra.hasOwnProperty(h) ? null != k && lg(d, h) : e ? Kf(a, h, k) : null != k && If(a, h, k));
    }
  }switch (b) {case "input":
      Bc(a);Pf(a, c);break;case "textarea":
      Bc(a);Xf(a, c);break;case "option":
      null != c.value && a.setAttribute("value", c.value);break;case "select":
      a.multiple = !!c.multiple;b = c.value;null != b ? Sf(a, !!c.multiple, b, !1) : null != c.defaultValue && Sf(a, !!c.multiple, c.defaultValue, !0);break;default:
      "function" === typeof f.onClick && (a.onclick = C);}
}
function sg(a, b, c, d, e) {
  var f = null;switch (b) {case "input":
      c = Lf(a, c);d = Lf(a, d);f = [];break;case "option":
      c = Rf(a, c);d = Rf(a, d);f = [];break;case "select":
      c = B({}, c, { value: void 0 });d = B({}, d, { value: void 0 });f = [];break;case "textarea":
      c = Uf(a, c);d = Uf(a, d);f = [];break;default:
      "function" !== typeof c.onClick && "function" === typeof d.onClick && (a.onclick = C);}hg(b, d, kg);var g, h;a = null;for (g in c) {
    if (!d.hasOwnProperty(g) && c.hasOwnProperty(g) && null != c[g]) if ("style" === g) for (h in b = c[g], b) {
      b.hasOwnProperty(h) && (a || (a = {}), a[h] = "");
    } else "dangerouslySetInnerHTML" !== g && "children" !== g && "suppressContentEditableWarning" !== g && "suppressHydrationWarning" !== g && "autoFocus" !== g && (Ra.hasOwnProperty(g) ? f || (f = []) : (f = f || []).push(g, null));
  }for (g in d) {
    var k = d[g];b = null != c ? c[g] : void 0;if (d.hasOwnProperty(g) && k !== b && (null != k || null != b)) if ("style" === g) {
      if (b) {
        for (h in b) {
          !b.hasOwnProperty(h) || k && k.hasOwnProperty(h) || (a || (a = {}), a[h] = "");
        }for (h in k) {
          k.hasOwnProperty(h) && b[h] !== k[h] && (a || (a = {}), a[h] = k[h]);
        }
      } else a || (f || (f = []), f.push(g, a)), a = k;
    } else "dangerouslySetInnerHTML" === g ? (k = k ? k.__html : void 0, b = b ? b.__html : void 0, null != k && b !== k && (f = f || []).push(g, "" + k)) : "children" === g ? b === k || "string" !== typeof k && "number" !== typeof k || (f = f || []).push(g, "" + k) : "suppressContentEditableWarning" !== g && "suppressHydrationWarning" !== g && (Ra.hasOwnProperty(g) ? (null != k && lg(e, g), f || b === k || (f = [])) : (f = f || []).push(g, k));
  }a && (f = f || []).push("style", a);return f;
}
function tg(a, b, c, d, e) {
  "input" === c && "radio" === e.type && null != e.name && Nf(a, e);ig(c, d);d = ig(c, e);for (var f = 0; f < b.length; f += 2) {
    var g = b[f],
        h = b[f + 1];"style" === g ? fg(a, h, kg) : "dangerouslySetInnerHTML" === g ? bg(a, h) : "children" === g ? cg(a, h) : d ? null != h ? Kf(a, g, h) : a.removeAttribute(g) : null != h ? If(a, g, h) : Jf(a, g);
  }switch (c) {case "input":
      Of(a, e);break;case "textarea":
      Wf(a, e);break;case "select":
      a._wrapperState.initialValue = void 0, b = a._wrapperState.wasMultiple, a._wrapperState.wasMultiple = !!e.multiple, c = e.value, null != c ? Sf(a, !!e.multiple, c, !1) : b !== !!e.multiple && (null != e.defaultValue ? Sf(a, !!e.multiple, e.defaultValue, !0) : Sf(a, !!e.multiple, e.multiple ? [] : "", !1));}
}
function ug(a, b, c, d, e) {
  switch (b) {case "iframe":case "object":
      U("topLoad", "load", a);break;case "video":case "audio":
      for (var f in mg) {
        mg.hasOwnProperty(f) && U(f, mg[f], a);
      }break;case "source":
      U("topError", "error", a);break;case "img":case "image":
      U("topError", "error", a);U("topLoad", "load", a);break;case "form":
      U("topReset", "reset", a);U("topSubmit", "submit", a);break;case "details":
      U("topToggle", "toggle", a);break;case "input":
      Mf(a, c);U("topInvalid", "invalid", a);lg(e, "onChange");break;case "select":
      Tf(a, c);
      U("topInvalid", "invalid", a);lg(e, "onChange");break;case "textarea":
      Vf(a, c), U("topInvalid", "invalid", a), lg(e, "onChange");}hg(b, c, kg);d = null;for (var g in c) {
    c.hasOwnProperty(g) && (f = c[g], "children" === g ? "string" === typeof f ? a.textContent !== f && (d = ["children", f]) : "number" === typeof f && a.textContent !== "" + f && (d = ["children", "" + f]) : Ra.hasOwnProperty(g) && null != f && lg(e, g));
  }switch (b) {case "input":
      Bc(a);Pf(a, c);break;case "textarea":
      Bc(a);Xf(a, c);break;case "select":case "option":
      break;default:
      "function" === typeof c.onClick && (a.onclick = C);}return d;
}function vg(a, b) {
  return a.nodeValue !== b;
}
var wg = Object.freeze({ createElement: ng, createTextNode: og, setInitialProperties: pg, diffProperties: sg, updateProperties: tg, diffHydratedProperties: ug, diffHydratedText: vg, warnForUnmatchedText: function warnForUnmatchedText() {}, warnForDeletedHydratableElement: function warnForDeletedHydratableElement() {}, warnForDeletedHydratableText: function warnForDeletedHydratableText() {}, warnForInsertedHydratedElement: function warnForInsertedHydratedElement() {}, warnForInsertedHydratedText: function warnForInsertedHydratedText() {}, restoreControlledState: function restoreControlledState(a, b, c) {
    switch (b) {case "input":
        Of(a, c);b = c.name;if ("radio" === c.type && null != b) {
          for (c = a; c.parentNode;) {
            c = c.parentNode;
          }c = c.querySelectorAll("input[name\x3d" + JSON.stringify("" + b) + '][type\x3d"radio"]');for (b = 0; b < c.length; b++) {
            var d = c[b];if (d !== a && d.form === a.form) {
              var e = rb(d);e ? void 0 : E("90");Cc(d);Of(d, e);
            }
          }
        }break;case "textarea":
        Wf(a, c);break;case "select":
        b = c.value, null != b && Sf(a, !!c.multiple, b, !1);}
  } });nc.injectFiberControlledHostComponent(wg);var xg = null,
    Mg = null;function Ng(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function Og(a) {
  a = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null;return !(!a || 1 !== a.nodeType || !a.hasAttribute("data-reactroot"));
}
var Z = of({ getRootHostContext: function getRootHostContext(a) {
    var b = a.nodeType;switch (b) {case 9:case 11:
        a = (a = a.documentElement) ? a.namespaceURI : $f(null, "");break;default:
        b = 8 === b ? a.parentNode : a, a = b.namespaceURI || null, b = b.tagName, a = $f(a, b);}return a;
  }, getChildHostContext: function getChildHostContext(a, b) {
    return $f(a, b);
  }, getPublicInstance: function getPublicInstance(a) {
    return a;
  }, prepareForCommit: function prepareForCommit() {
    xg = td;var a = da();if (Kd(a)) {
      if ("selectionStart" in a) var b = { start: a.selectionStart, end: a.selectionEnd };else a: {
        var c = window.getSelection && window.getSelection();
        if (c && 0 !== c.rangeCount) {
          b = c.anchorNode;var d = c.anchorOffset,
              e = c.focusNode;c = c.focusOffset;try {
            b.nodeType, e.nodeType;
          } catch (z) {
            b = null;break a;
          }var f = 0,
              g = -1,
              h = -1,
              k = 0,
              q = 0,
              v = a,
              y = null;b: for (;;) {
            for (var u;;) {
              v !== b || 0 !== d && 3 !== v.nodeType || (g = f + d);v !== e || 0 !== c && 3 !== v.nodeType || (h = f + c);3 === v.nodeType && (f += v.nodeValue.length);if (null === (u = v.firstChild)) break;y = v;v = u;
            }for (;;) {
              if (v === a) break b;y === b && ++k === d && (g = f);y === e && ++q === c && (h = f);if (null !== (u = v.nextSibling)) break;v = y;y = v.parentNode;
            }v = u;
          }b = -1 === g || -1 === h ? null : { start: g, end: h };
        } else b = null;
      }b = b || { start: 0, end: 0 };
    } else b = null;Mg = { focusedElem: a, selectionRange: b };ud(!1);
  }, resetAfterCommit: function resetAfterCommit() {
    var a = Mg,
        b = da(),
        c = a.focusedElem,
        d = a.selectionRange;if (b !== c && fa(document.documentElement, c)) {
      if (Kd(c)) if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);else if (window.getSelection) {
        b = window.getSelection();var e = c[Eb()].length;a = Math.min(d.start, e);d = void 0 === d.end ? a : Math.min(d.end, e);!b.extend && a > d && (e = d, d = a, a = e);e = Jd(c, a);var f = Jd(c, d);if (e && f && (1 !== b.rangeCount || b.anchorNode !== e.node || b.anchorOffset !== e.offset || b.focusNode !== f.node || b.focusOffset !== f.offset)) {
          var g = document.createRange();g.setStart(e.node, e.offset);b.removeAllRanges();a > d ? (b.addRange(g), b.extend(f.node, f.offset)) : (g.setEnd(f.node, f.offset), b.addRange(g));
        }
      }b = [];for (a = c; a = a.parentNode;) {
        1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
      }ia(c);for (c = 0; c < b.length; c++) {
        a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
      }
    }Mg = null;ud(xg);xg = null;
  }, createInstance: function createInstance(a, b, c, d, e) {
    a = ng(a, b, c, d);a[Q] = e;a[ob] = b;return a;
  }, appendInitialChild: function appendInitialChild(a, b) {
    a.appendChild(b);
  }, finalizeInitialChildren: function finalizeInitialChildren(a, b, c, d) {
    pg(a, b, c, d);a: {
      switch (b) {case "button":case "input":case "select":case "textarea":
          a = !!c.autoFocus;break a;}a = !1;
    }return a;
  }, prepareUpdate: function prepareUpdate(a, b, c, d, e) {
    return sg(a, b, c, d, e);
  }, shouldSetTextContent: function shouldSetTextContent(a, b) {
    return "textarea" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === _typeof(b.dangerouslySetInnerHTML) && null !== b.dangerouslySetInnerHTML && "string" === typeof b.dangerouslySetInnerHTML.__html;
  }, shouldDeprioritizeSubtree: function shouldDeprioritizeSubtree(a, b) {
    return !!b.hidden;
  }, createTextInstance: function createTextInstance(a, b, c, d) {
    a = og(a, b);a[Q] = d;return a;
  }, now: rf, mutation: { commitMount: function commitMount(a) {
      a.focus();
    }, commitUpdate: function commitUpdate(a, b, c, d, e) {
      a[ob] = e;tg(a, b, c, d, e);
    }, resetTextContent: function resetTextContent(a) {
      a.textContent = "";
    }, commitTextUpdate: function commitTextUpdate(a, b, c) {
      a.nodeValue = c;
    }, appendChild: function appendChild(a, b) {
      a.appendChild(b);
    }, appendChildToContainer: function appendChildToContainer(a, b) {
      8 === a.nodeType ? a.parentNode.insertBefore(b, a) : a.appendChild(b);
    }, insertBefore: function insertBefore(a, b, c) {
      a.insertBefore(b, c);
    }, insertInContainerBefore: function insertInContainerBefore(a, b, c) {
      8 === a.nodeType ? a.parentNode.insertBefore(b, c) : a.insertBefore(b, c);
    }, removeChild: function removeChild(a, b) {
      a.removeChild(b);
    }, removeChildFromContainer: function removeChildFromContainer(a, b) {
      8 === a.nodeType ? a.parentNode.removeChild(b) : a.removeChild(b);
    } }, hydration: { canHydrateInstance: function canHydrateInstance(a, b) {
      return 1 !== a.nodeType || b.toLowerCase() !== a.nodeName.toLowerCase() ? null : a;
    }, canHydrateTextInstance: function canHydrateTextInstance(a, b) {
      return "" === b || 3 !== a.nodeType ? null : a;
    }, getNextHydratableSibling: function getNextHydratableSibling(a) {
      for (a = a.nextSibling; a && 1 !== a.nodeType && 3 !== a.nodeType;) {
        a = a.nextSibling;
      }return a;
    }, getFirstHydratableChild: function getFirstHydratableChild(a) {
      for (a = a.firstChild; a && 1 !== a.nodeType && 3 !== a.nodeType;) {
        a = a.nextSibling;
      }return a;
    }, hydrateInstance: function hydrateInstance(a, b, c, d, e, f) {
      a[Q] = f;a[ob] = c;return ug(a, b, c, e, d);
    }, hydrateTextInstance: function hydrateTextInstance(a, b, c) {
      a[Q] = c;return vg(a, b);
    }, didNotMatchHydratedContainerTextInstance: function didNotMatchHydratedContainerTextInstance() {}, didNotMatchHydratedTextInstance: function didNotMatchHydratedTextInstance() {},
    didNotHydrateContainerInstance: function didNotHydrateContainerInstance() {}, didNotHydrateInstance: function didNotHydrateInstance() {}, didNotFindHydratableContainerInstance: function didNotFindHydratableContainerInstance() {}, didNotFindHydratableContainerTextInstance: function didNotFindHydratableContainerTextInstance() {}, didNotFindHydratableInstance: function didNotFindHydratableInstance() {}, didNotFindHydratableTextInstance: function didNotFindHydratableTextInstance() {} }, scheduleDeferredCallback: sf, cancelDeferredCallback: tf, useSyncScheduling: !0 });rc = Z.batchedUpdates;
function Pg(a, b, c, d, e) {
  Ng(c) ? void 0 : E("200");var f = c._reactRootContainer;if (f) Z.updateContainer(b, f, a, e);else {
    d = d || Og(c);if (!d) for (f = void 0; f = c.lastChild;) {
      c.removeChild(f);
    }var g = Z.createContainer(c, d);f = c._reactRootContainer = g;Z.unbatchedUpdates(function () {
      Z.updateContainer(b, g, a, e);
    });
  }return Z.getPublicRootInstance(f);
}function Qg(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;Ng(b) ? void 0 : E("200");return pf(a, b, null, c);
}
function Rg(a, b) {
  this._reactRootContainer = Z.createContainer(a, b);
}Rg.prototype.render = function (a, b) {
  Z.updateContainer(a, this._reactRootContainer, null, b);
};Rg.prototype.unmount = function (a) {
  Z.updateContainer(null, this._reactRootContainer, null, a);
};
var Sg = { createPortal: Qg, findDOMNode: function findDOMNode(a) {
    if (null == a) return null;if (1 === a.nodeType) return a;var b = a._reactInternalFiber;if (b) return Z.findHostInstance(b);"function" === typeof a.render ? E("188") : E("213", Object.keys(a));
  }, hydrate: function hydrate(a, b, c) {
    return Pg(null, a, b, !0, c);
  }, render: function render(a, b, c) {
    return Pg(null, a, b, !1, c);
  }, unstable_renderSubtreeIntoContainer: function unstable_renderSubtreeIntoContainer(a, b, c, d) {
    null == a || void 0 === a._reactInternalFiber ? E("38") : void 0;return Pg(a, b, c, !1, d);
  }, unmountComponentAtNode: function unmountComponentAtNode(a) {
    Ng(a) ? void 0 : E("40");return a._reactRootContainer ? (Z.unbatchedUpdates(function () {
      Pg(null, null, a, !1, function () {
        a._reactRootContainer = null;
      });
    }), !0) : !1;
  }, unstable_createPortal: Qg, unstable_batchedUpdates: tc, unstable_deferredUpdates: Z.deferredUpdates, flushSync: Z.flushSync, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { EventPluginHub: mb, EventPluginRegistry: Va, EventPropagators: Cb, ReactControlledComponent: qc, ReactDOMComponentTree: sb, ReactDOMEventListener: xd } };
Z.injectIntoDevTools({ findFiberByHostInstance: pb, bundleType: 0, version: "16.2.0", rendererPackageName: "react-dom" });var Tg = Object.freeze({ default: Sg }),
    Ug = Tg && Sg || Tg;module.exports = Ug["default"] ? Ug["default"] : Ug;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(21);

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.2.0
 * react-dom.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};if(process.env.NODE_ENV!=="production"){(function(){'use strict';var React=__webpack_require__(4);var invariant=__webpack_require__(5);var warning=__webpack_require__(6);var ExecutionEnvironment=__webpack_require__(8);var _assign=__webpack_require__(2);var emptyFunction=__webpack_require__(1);var EventListener=__webpack_require__(9);var getActiveElement=__webpack_require__(10);var shallowEqual=__webpack_require__(11);var containsNode=__webpack_require__(12);var focusNode=__webpack_require__(13);var emptyObject=__webpack_require__(3);var checkPropTypes=__webpack_require__(7);var hyphenateStyleName=__webpack_require__(23);var camelizeStyleName=__webpack_require__(25);/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */!React?invariant(false,'ReactDOM was loaded before React. Make sure you load the React package before loading ReactDOM.'):void 0;// These attributes should be all lowercase to allow for
// case insensitive checks
var RESERVED_PROPS={children:true,dangerouslySetInnerHTML:true,defaultValue:true,defaultChecked:true,innerHTML:true,suppressContentEditableWarning:true,suppressHydrationWarning:true,style:true};function checkMask(value,bitmask){return(value&bitmask)===bitmask;}var DOMPropertyInjection={/**
   * Mapping from normalized, camelcased property names to a configuration that
   * specifies how the associated DOM property should be accessed or rendered.
   */MUST_USE_PROPERTY:0x1,HAS_BOOLEAN_VALUE:0x4,HAS_NUMERIC_VALUE:0x8,HAS_POSITIVE_NUMERIC_VALUE:0x10|0x8,HAS_OVERLOADED_BOOLEAN_VALUE:0x20,HAS_STRING_BOOLEAN_VALUE:0x40,/**
   * Inject some specialized knowledge about the DOM. This takes a config object
   * with the following properties:
   *
   * Properties: object mapping DOM property name to one of the
   * DOMPropertyInjection constants or null. If your attribute isn't in here,
   * it won't get written to the DOM.
   *
   * DOMAttributeNames: object mapping React attribute name to the DOM
   * attribute name. Attribute names not specified use the **lowercase**
   * normalized name.
   *
   * DOMAttributeNamespaces: object mapping React attribute name to the DOM
   * attribute namespace URL. (Attribute names not specified use no namespace.)
   *
   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
   * Property names not specified use the normalized name.
   *
   * DOMMutationMethods: Properties that require special mutation methods. If
   * `value` is undefined, the mutation method should unset the property.
   *
   * @param {object} domPropertyConfig the config as described above.
   */injectDOMPropertyConfig:function injectDOMPropertyConfig(domPropertyConfig){var Injection=DOMPropertyInjection;var Properties=domPropertyConfig.Properties||{};var DOMAttributeNamespaces=domPropertyConfig.DOMAttributeNamespaces||{};var DOMAttributeNames=domPropertyConfig.DOMAttributeNames||{};var DOMMutationMethods=domPropertyConfig.DOMMutationMethods||{};for(var propName in Properties){!!properties.hasOwnProperty(propName)?invariant(false,"injectDOMPropertyConfig(...): You're trying to inject DOM property '%s' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.",propName):void 0;var lowerCased=propName.toLowerCase();var propConfig=Properties[propName];var propertyInfo={attributeName:lowerCased,attributeNamespace:null,propertyName:propName,mutationMethod:null,mustUseProperty:checkMask(propConfig,Injection.MUST_USE_PROPERTY),hasBooleanValue:checkMask(propConfig,Injection.HAS_BOOLEAN_VALUE),hasNumericValue:checkMask(propConfig,Injection.HAS_NUMERIC_VALUE),hasPositiveNumericValue:checkMask(propConfig,Injection.HAS_POSITIVE_NUMERIC_VALUE),hasOverloadedBooleanValue:checkMask(propConfig,Injection.HAS_OVERLOADED_BOOLEAN_VALUE),hasStringBooleanValue:checkMask(propConfig,Injection.HAS_STRING_BOOLEAN_VALUE)};!(propertyInfo.hasBooleanValue+propertyInfo.hasNumericValue+propertyInfo.hasOverloadedBooleanValue<=1)?invariant(false,"DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s",propName):void 0;if(DOMAttributeNames.hasOwnProperty(propName)){var attributeName=DOMAttributeNames[propName];propertyInfo.attributeName=attributeName;}if(DOMAttributeNamespaces.hasOwnProperty(propName)){propertyInfo.attributeNamespace=DOMAttributeNamespaces[propName];}if(DOMMutationMethods.hasOwnProperty(propName)){propertyInfo.mutationMethod=DOMMutationMethods[propName];}// Downcase references to whitelist properties to check for membership
// without case-sensitivity. This allows the whitelist to pick up
// `allowfullscreen`, which should be written using the property configuration
// for `allowFullscreen`
properties[propName]=propertyInfo;}}};/* eslint-disable max-len */var ATTRIBUTE_NAME_START_CHAR=':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';/* eslint-enable max-len */var ATTRIBUTE_NAME_CHAR=ATTRIBUTE_NAME_START_CHAR+'\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040';var ROOT_ATTRIBUTE_NAME='data-reactroot';/**
 * Map from property "standard name" to an object with info about how to set
 * the property in the DOM. Each object contains:
 *
 * attributeName:
 *   Used when rendering markup or with `*Attribute()`.
 * attributeNamespace
 * propertyName:
 *   Used on DOM node instances. (This includes properties that mutate due to
 *   external factors.)
 * mutationMethod:
 *   If non-null, used instead of the property or `setAttribute()` after
 *   initial render.
 * mustUseProperty:
 *   Whether the property must be accessed and mutated as an object property.
 * hasBooleanValue:
 *   Whether the property should be removed when set to a falsey value.
 * hasNumericValue:
 *   Whether the property must be numeric or parse as a numeric and should be
 *   removed when set to a falsey value.
 * hasPositiveNumericValue:
 *   Whether the property must be positive numeric or parse as a positive
 *   numeric and should be removed when set to a falsey value.
 * hasOverloadedBooleanValue:
 *   Whether the property can be used as a flag as well as with a value.
 *   Removed when strictly equal to false; present without a value when
 *   strictly equal to true; present with a value otherwise.
 */var properties={};/**
 * Checks whether a property name is a writeable attribute.
 * @method
 */function shouldSetAttribute(name,value){if(isReservedProp(name)){return false;}if(name.length>2&&(name[0]==='o'||name[0]==='O')&&(name[1]==='n'||name[1]==='N')){return false;}if(value===null){return true;}switch(typeof value==='undefined'?'undefined':_typeof(value)){case'boolean':return shouldAttributeAcceptBooleanValue(name);case'undefined':case'number':case'string':case'object':return true;default:// function, symbol
return false;}}function getPropertyInfo(name){return properties.hasOwnProperty(name)?properties[name]:null;}function shouldAttributeAcceptBooleanValue(name){if(isReservedProp(name)){return true;}var propertyInfo=getPropertyInfo(name);if(propertyInfo){return propertyInfo.hasBooleanValue||propertyInfo.hasStringBooleanValue||propertyInfo.hasOverloadedBooleanValue;}var prefix=name.toLowerCase().slice(0,5);return prefix==='data-'||prefix==='aria-';}/**
 * Checks to see if a property name is within the list of properties
 * reserved for internal React operations. These properties should
 * not be set on an HTML element.
 *
 * @private
 * @param {string} name
 * @return {boolean} If the name is within reserved props
 */function isReservedProp(name){return RESERVED_PROPS.hasOwnProperty(name);}var injection=DOMPropertyInjection;var MUST_USE_PROPERTY=injection.MUST_USE_PROPERTY;var HAS_BOOLEAN_VALUE=injection.HAS_BOOLEAN_VALUE;var HAS_NUMERIC_VALUE=injection.HAS_NUMERIC_VALUE;var HAS_POSITIVE_NUMERIC_VALUE=injection.HAS_POSITIVE_NUMERIC_VALUE;var HAS_OVERLOADED_BOOLEAN_VALUE=injection.HAS_OVERLOADED_BOOLEAN_VALUE;var HAS_STRING_BOOLEAN_VALUE=injection.HAS_STRING_BOOLEAN_VALUE;var HTMLDOMPropertyConfig={// When adding attributes to this list, be sure to also add them to
// the `possibleStandardNames` module to ensure casing and incorrect
// name warnings.
Properties:{allowFullScreen:HAS_BOOLEAN_VALUE,// specifies target context for links with `preload` type
async:HAS_BOOLEAN_VALUE,// Note: there is a special case that prevents it from being written to the DOM
// on the client side because the browsers are inconsistent. Instead we call focus().
autoFocus:HAS_BOOLEAN_VALUE,autoPlay:HAS_BOOLEAN_VALUE,capture:HAS_OVERLOADED_BOOLEAN_VALUE,checked:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,cols:HAS_POSITIVE_NUMERIC_VALUE,contentEditable:HAS_STRING_BOOLEAN_VALUE,controls:HAS_BOOLEAN_VALUE,'default':HAS_BOOLEAN_VALUE,defer:HAS_BOOLEAN_VALUE,disabled:HAS_BOOLEAN_VALUE,download:HAS_OVERLOADED_BOOLEAN_VALUE,draggable:HAS_STRING_BOOLEAN_VALUE,formNoValidate:HAS_BOOLEAN_VALUE,hidden:HAS_BOOLEAN_VALUE,loop:HAS_BOOLEAN_VALUE,// Caution; `option.selected` is not updated if `select.multiple` is
// disabled with `removeAttribute`.
multiple:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,muted:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,noValidate:HAS_BOOLEAN_VALUE,open:HAS_BOOLEAN_VALUE,playsInline:HAS_BOOLEAN_VALUE,readOnly:HAS_BOOLEAN_VALUE,required:HAS_BOOLEAN_VALUE,reversed:HAS_BOOLEAN_VALUE,rows:HAS_POSITIVE_NUMERIC_VALUE,rowSpan:HAS_NUMERIC_VALUE,scoped:HAS_BOOLEAN_VALUE,seamless:HAS_BOOLEAN_VALUE,selected:MUST_USE_PROPERTY|HAS_BOOLEAN_VALUE,size:HAS_POSITIVE_NUMERIC_VALUE,start:HAS_NUMERIC_VALUE,// support for projecting regular DOM Elements via V1 named slots ( shadow dom )
span:HAS_POSITIVE_NUMERIC_VALUE,spellCheck:HAS_STRING_BOOLEAN_VALUE,// Style must be explicitly set in the attribute list. React components
// expect a style object
style:0,// Keep it in the whitelist because it is case-sensitive for SVG.
tabIndex:0,// itemScope is for for Microdata support.
// See http://schema.org/docs/gs.html
itemScope:HAS_BOOLEAN_VALUE,// These attributes must stay in the white-list because they have
// different attribute names (see DOMAttributeNames below)
acceptCharset:0,className:0,htmlFor:0,httpEquiv:0,// Attributes with mutation methods must be specified in the whitelist
// Set the string boolean flag to allow the behavior
value:HAS_STRING_BOOLEAN_VALUE},DOMAttributeNames:{acceptCharset:'accept-charset',className:'class',htmlFor:'for',httpEquiv:'http-equiv'},DOMMutationMethods:{value:function value(node,_value){if(_value==null){return node.removeAttribute('value');}// Number inputs get special treatment due to some edge cases in
// Chrome. Let everything else assign the value attribute as normal.
// https://github.com/facebook/react/issues/7253#issuecomment-236074326
if(node.type!=='number'||node.hasAttribute('value')===false){node.setAttribute('value',''+_value);}else if(node.validity&&!node.validity.badInput&&node.ownerDocument.activeElement!==node){// Don't assign an attribute if validation reports bad
// input. Chrome will clear the value. Additionally, don't
// operate on inputs that have focus, otherwise Chrome might
// strip off trailing decimal places and cause the user's
// cursor position to jump to the beginning of the input.
//
// In ReactDOMInput, we have an onBlur event that will trigger
// this function again when focus is lost.
node.setAttribute('value',''+_value);}}}};var HAS_STRING_BOOLEAN_VALUE$1=injection.HAS_STRING_BOOLEAN_VALUE;var NS={xlink:'http://www.w3.org/1999/xlink',xml:'http://www.w3.org/XML/1998/namespace'};/**
 * This is a list of all SVG attributes that need special casing,
 * namespacing, or boolean value assignment.
 *
 * When adding attributes to this list, be sure to also add them to
 * the `possibleStandardNames` module to ensure casing and incorrect
 * name warnings.
 *
 * SVG Attributes List:
 * https://www.w3.org/TR/SVG/attindex.html
 * SMIL Spec:
 * https://www.w3.org/TR/smil
 */var ATTRS=['accent-height','alignment-baseline','arabic-form','baseline-shift','cap-height','clip-path','clip-rule','color-interpolation','color-interpolation-filters','color-profile','color-rendering','dominant-baseline','enable-background','fill-opacity','fill-rule','flood-color','flood-opacity','font-family','font-size','font-size-adjust','font-stretch','font-style','font-variant','font-weight','glyph-name','glyph-orientation-horizontal','glyph-orientation-vertical','horiz-adv-x','horiz-origin-x','image-rendering','letter-spacing','lighting-color','marker-end','marker-mid','marker-start','overline-position','overline-thickness','paint-order','panose-1','pointer-events','rendering-intent','shape-rendering','stop-color','stop-opacity','strikethrough-position','strikethrough-thickness','stroke-dasharray','stroke-dashoffset','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-opacity','stroke-width','text-anchor','text-decoration','text-rendering','underline-position','underline-thickness','unicode-bidi','unicode-range','units-per-em','v-alphabetic','v-hanging','v-ideographic','v-mathematical','vector-effect','vert-adv-y','vert-origin-x','vert-origin-y','word-spacing','writing-mode','x-height','xlink:actuate','xlink:arcrole','xlink:href','xlink:role','xlink:show','xlink:title','xlink:type','xml:base','xmlns:xlink','xml:lang','xml:space'];var SVGDOMPropertyConfig={Properties:{autoReverse:HAS_STRING_BOOLEAN_VALUE$1,externalResourcesRequired:HAS_STRING_BOOLEAN_VALUE$1,preserveAlpha:HAS_STRING_BOOLEAN_VALUE$1},DOMAttributeNames:{autoReverse:'autoReverse',externalResourcesRequired:'externalResourcesRequired',preserveAlpha:'preserveAlpha'},DOMAttributeNamespaces:{xlinkActuate:NS.xlink,xlinkArcrole:NS.xlink,xlinkHref:NS.xlink,xlinkRole:NS.xlink,xlinkShow:NS.xlink,xlinkTitle:NS.xlink,xlinkType:NS.xlink,xmlBase:NS.xml,xmlLang:NS.xml,xmlSpace:NS.xml}};var CAMELIZE=/[\-\:]([a-z])/g;var capitalize=function capitalize(token){return token[1].toUpperCase();};ATTRS.forEach(function(original){var reactName=original.replace(CAMELIZE,capitalize);SVGDOMPropertyConfig.Properties[reactName]=0;SVGDOMPropertyConfig.DOMAttributeNames[reactName]=original;});injection.injectDOMPropertyConfig(HTMLDOMPropertyConfig);injection.injectDOMPropertyConfig(SVGDOMPropertyConfig);var ReactErrorUtils={// Used by Fiber to simulate a try-catch.
_caughtError:null,_hasCaughtError:false,// Used by event system to capture/rethrow the first error.
_rethrowError:null,_hasRethrowError:false,injection:{injectErrorUtils:function injectErrorUtils(injectedErrorUtils){!(typeof injectedErrorUtils.invokeGuardedCallback==='function')?invariant(false,'Injected invokeGuardedCallback() must be a function.'):void 0;_invokeGuardedCallback=injectedErrorUtils.invokeGuardedCallback;}},/**
   * Call a function while guarding against errors that happens within it.
   * Returns an error if it throws, otherwise null.
   *
   * In production, this is implemented using a try-catch. The reason we don't
   * use a try-catch directly is so that we can swap out a different
   * implementation in DEV mode.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */invokeGuardedCallback:function invokeGuardedCallback(name,func,context,a,b,c,d,e,f){_invokeGuardedCallback.apply(ReactErrorUtils,arguments);},/**
   * Same as invokeGuardedCallback, but instead of returning an error, it stores
   * it in a global so it can be rethrown by `rethrowCaughtError` later.
   * TODO: See if _caughtError and _rethrowError can be unified.
   *
   * @param {String} name of the guard to use for logging or debugging
   * @param {Function} func The function to invoke
   * @param {*} context The context to use when calling the function
   * @param {...*} args Arguments for function
   */invokeGuardedCallbackAndCatchFirstError:function invokeGuardedCallbackAndCatchFirstError(name,func,context,a,b,c,d,e,f){ReactErrorUtils.invokeGuardedCallback.apply(this,arguments);if(ReactErrorUtils.hasCaughtError()){var error=ReactErrorUtils.clearCaughtError();if(!ReactErrorUtils._hasRethrowError){ReactErrorUtils._hasRethrowError=true;ReactErrorUtils._rethrowError=error;}}},/**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */rethrowCaughtError:function rethrowCaughtError(){return _rethrowCaughtError.apply(ReactErrorUtils,arguments);},hasCaughtError:function hasCaughtError(){return ReactErrorUtils._hasCaughtError;},clearCaughtError:function clearCaughtError(){if(ReactErrorUtils._hasCaughtError){var error=ReactErrorUtils._caughtError;ReactErrorUtils._caughtError=null;ReactErrorUtils._hasCaughtError=false;return error;}else{invariant(false,'clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.');}}};var _invokeGuardedCallback=function _invokeGuardedCallback(name,func,context,a,b,c,d,e,f){ReactErrorUtils._hasCaughtError=false;ReactErrorUtils._caughtError=null;var funcArgs=Array.prototype.slice.call(arguments,3);try{func.apply(context,funcArgs);}catch(error){ReactErrorUtils._caughtError=error;ReactErrorUtils._hasCaughtError=true;}};{// In DEV mode, we swap out invokeGuardedCallback for a special version
// that plays more nicely with the browser's DevTools. The idea is to preserve
// "Pause on exceptions" behavior. Because React wraps all user-provided
// functions in invokeGuardedCallback, and the production version of
// invokeGuardedCallback uses a try-catch, all user exceptions are treated
// like caught exceptions, and the DevTools won't pause unless the developer
// takes the extra step of enabling pause on caught exceptions. This is
// untintuitive, though, because even though React has caught the error, from
// the developer's perspective, the error is uncaught.
//
// To preserve the expected "Pause on exceptions" behavior, we don't use a
// try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
// DOM node, and call the user-provided callback from inside an event handler
// for that fake event. If the callback throws, the error is "captured" using
// a global event handler. But because the error happens in a different
// event loop context, it does not interrupt the normal program flow.
// Effectively, this gives us try-catch behavior without actually using
// try-catch. Neat!
// Check that the browser supports the APIs we need to implement our special
// DEV version of invokeGuardedCallback
if(typeof window!=='undefined'&&typeof window.dispatchEvent==='function'&&typeof document!=='undefined'&&typeof document.createEvent==='function'){var fakeNode=document.createElement('react');var invokeGuardedCallbackDev=function invokeGuardedCallbackDev(name,func,context,a,b,c,d,e,f){// Keeps track of whether the user-provided callback threw an error. We
// set this to true at the beginning, then set it to false right after
// calling the function. If the function errors, `didError` will never be
// set to false. This strategy works even if the browser is flaky and
// fails to call our global error handler, because it doesn't rely on
// the error event at all.
var didError=true;// Create an event handler for our fake event. We will synchronously
// dispatch our fake event using `dispatchEvent`. Inside the handler, we
// call the user-provided callback.
var funcArgs=Array.prototype.slice.call(arguments,3);function callCallback(){// We immediately remove the callback from event listeners so that
// nested `invokeGuardedCallback` calls do not clash. Otherwise, a
// nested call would trigger the fake event handlers of any call higher
// in the stack.
fakeNode.removeEventListener(evtType,callCallback,false);func.apply(context,funcArgs);didError=false;}// Create a global error event handler. We use this to capture the value
// that was thrown. It's possible that this error handler will fire more
// than once; for example, if non-React code also calls `dispatchEvent`
// and a handler for that event throws. We should be resilient to most of
// those cases. Even if our error event handler fires more than once, the
// last error event is always used. If the callback actually does error,
// we know that the last error event is the correct one, because it's not
// possible for anything else to have happened in between our callback
// erroring and the code that follows the `dispatchEvent` call below. If
// the callback doesn't error, but the error event was fired, we know to
// ignore it because `didError` will be false, as described above.
var error=void 0;// Use this to track whether the error event is ever called.
var didSetError=false;var isCrossOriginError=false;function onError(event){error=event.error;didSetError=true;if(error===null&&event.colno===0&&event.lineno===0){isCrossOriginError=true;}}// Create a fake event type.
var evtType='react-'+(name?name:'invokeguardedcallback');// Attach our event handlers
window.addEventListener('error',onError);fakeNode.addEventListener(evtType,callCallback,false);// Synchronously dispatch our fake event. If the user-provided function
// errors, it will trigger our global error handler.
var evt=document.createEvent('Event');evt.initEvent(evtType,false,false);fakeNode.dispatchEvent(evt);if(didError){if(!didSetError){// The callback errored, but the error event never fired.
error=new Error('An error was thrown inside one of your components, but React '+"doesn't know what it was. This is likely due to browser "+'flakiness. React does its best to preserve the "Pause on '+'exceptions" behavior of the DevTools, which requires some '+"DEV-mode only tricks. It's possible that these don't work in "+'your browser. Try triggering the error in production mode, '+'or switching to a modern browser. If you suspect that this is '+'actually an issue with React, please file an issue.');}else if(isCrossOriginError){error=new Error("A cross-origin error was thrown. React doesn't have access to "+'the actual error object in development. '+'See https://fb.me/react-crossorigin-error for more information.');}ReactErrorUtils._hasCaughtError=true;ReactErrorUtils._caughtError=error;}else{ReactErrorUtils._hasCaughtError=false;ReactErrorUtils._caughtError=null;}// Remove our event listeners
window.removeEventListener('error',onError);};_invokeGuardedCallback=invokeGuardedCallbackDev;}}var _rethrowCaughtError=function _rethrowCaughtError(){if(ReactErrorUtils._hasRethrowError){var error=ReactErrorUtils._rethrowError;ReactErrorUtils._rethrowError=null;ReactErrorUtils._hasRethrowError=false;throw error;}};/**
 * Injectable ordering of event plugins.
 */var eventPluginOrder=null;/**
 * Injectable mapping from names to event plugin modules.
 */var namesToPlugins={};/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */function recomputePluginOrdering(){if(!eventPluginOrder){// Wait until an `eventPluginOrder` is injected.
return;}for(var pluginName in namesToPlugins){var pluginModule=namesToPlugins[pluginName];var pluginIndex=eventPluginOrder.indexOf(pluginName);!(pluginIndex>-1)?invariant(false,'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.',pluginName):void 0;if(plugins[pluginIndex]){continue;}!pluginModule.extractEvents?invariant(false,'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.',pluginName):void 0;plugins[pluginIndex]=pluginModule;var publishedEvents=pluginModule.eventTypes;for(var eventName in publishedEvents){!publishEventForPlugin(publishedEvents[eventName],pluginModule,eventName)?invariant(false,'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',eventName,pluginName):void 0;}}}/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */function publishEventForPlugin(dispatchConfig,pluginModule,eventName){!!eventNameDispatchConfigs.hasOwnProperty(eventName)?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.',eventName):void 0;eventNameDispatchConfigs[eventName]=dispatchConfig;var phasedRegistrationNames=dispatchConfig.phasedRegistrationNames;if(phasedRegistrationNames){for(var phaseName in phasedRegistrationNames){if(phasedRegistrationNames.hasOwnProperty(phaseName)){var phasedRegistrationName=phasedRegistrationNames[phaseName];publishRegistrationName(phasedRegistrationName,pluginModule,eventName);}}return true;}else if(dispatchConfig.registrationName){publishRegistrationName(dispatchConfig.registrationName,pluginModule,eventName);return true;}return false;}/**
 * Publishes a registration name that is used to identify dispatched events.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */function publishRegistrationName(registrationName,pluginModule,eventName){!!registrationNameModules[registrationName]?invariant(false,'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.',registrationName):void 0;registrationNameModules[registrationName]=pluginModule;registrationNameDependencies[registrationName]=pluginModule.eventTypes[eventName].dependencies;{var lowerCasedName=registrationName.toLowerCase();possibleRegistrationNames[lowerCasedName]=registrationName;if(registrationName==='onDoubleClick'){possibleRegistrationNames.ondblclick=registrationName;}}}/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 *//**
 * Ordered list of injected plugins.
 */var plugins=[];/**
 * Mapping from event name to dispatch config
 */var eventNameDispatchConfigs={};/**
 * Mapping from registration name to plugin module
 */var registrationNameModules={};/**
 * Mapping from registration name to event name
 */var registrationNameDependencies={};/**
 * Mapping from lowercase registration names to the properly cased version,
 * used to warn in the case of missing event handlers. Available
 * only in true.
 * @type {Object}
 */var possibleRegistrationNames={};// Trust the developer to only use possibleRegistrationNames in true
/**
 * Injects an ordering of plugins (by plugin name). This allows the ordering
 * to be decoupled from injection of the actual plugins so that ordering is
 * always deterministic regardless of packaging, on-the-fly injection, etc.
 *
 * @param {array} InjectedEventPluginOrder
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginOrder}
 */function injectEventPluginOrder(injectedEventPluginOrder){!!eventPluginOrder?invariant(false,'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.'):void 0;// Clone the ordering so it cannot be dynamically mutated.
eventPluginOrder=Array.prototype.slice.call(injectedEventPluginOrder);recomputePluginOrdering();}/**
 * Injects plugins to be used by `EventPluginHub`. The plugin names must be
 * in the ordering injected by `injectEventPluginOrder`.
 *
 * Plugins can be injected as part of page initialization or on-the-fly.
 *
 * @param {object} injectedNamesToPlugins Map from names to plugin modules.
 * @internal
 * @see {EventPluginHub.injection.injectEventPluginsByName}
 */function injectEventPluginsByName(injectedNamesToPlugins){var isOrderingDirty=false;for(var pluginName in injectedNamesToPlugins){if(!injectedNamesToPlugins.hasOwnProperty(pluginName)){continue;}var pluginModule=injectedNamesToPlugins[pluginName];if(!namesToPlugins.hasOwnProperty(pluginName)||namesToPlugins[pluginName]!==pluginModule){!!namesToPlugins[pluginName]?invariant(false,'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.',pluginName):void 0;namesToPlugins[pluginName]=pluginModule;isOrderingDirty=true;}}if(isOrderingDirty){recomputePluginOrdering();}}var EventPluginRegistry=Object.freeze({plugins:plugins,eventNameDispatchConfigs:eventNameDispatchConfigs,registrationNameModules:registrationNameModules,registrationNameDependencies:registrationNameDependencies,possibleRegistrationNames:possibleRegistrationNames,injectEventPluginOrder:injectEventPluginOrder,injectEventPluginsByName:injectEventPluginsByName});var getFiberCurrentPropsFromNode=null;var getInstanceFromNode=null;var getNodeFromInstance=null;var injection$2={injectComponentTree:function injectComponentTree(Injected){getFiberCurrentPropsFromNode=Injected.getFiberCurrentPropsFromNode;getInstanceFromNode=Injected.getInstanceFromNode;getNodeFromInstance=Injected.getNodeFromInstance;{warning(getNodeFromInstance&&getInstanceFromNode,'EventPluginUtils.injection.injectComponentTree(...): Injected '+'module is missing getNodeFromInstance or getInstanceFromNode.');}}};var validateEventDispatches;{validateEventDispatches=function validateEventDispatches(event){var dispatchListeners=event._dispatchListeners;var dispatchInstances=event._dispatchInstances;var listenersIsArr=Array.isArray(dispatchListeners);var listenersLen=listenersIsArr?dispatchListeners.length:dispatchListeners?1:0;var instancesIsArr=Array.isArray(dispatchInstances);var instancesLen=instancesIsArr?dispatchInstances.length:dispatchInstances?1:0;warning(instancesIsArr===listenersIsArr&&instancesLen===listenersLen,'EventPluginUtils: Invalid `event`.');};}/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */function executeDispatch(event,simulated,listener,inst){var type=event.type||'unknown-event';event.currentTarget=getNodeFromInstance(inst);ReactErrorUtils.invokeGuardedCallbackAndCatchFirstError(type,listener,undefined,event);event.currentTarget=null;}/**
 * Standard/simple iteration through an event's collected dispatches.
 */function executeDispatchesInOrder(event,simulated){var dispatchListeners=event._dispatchListeners;var dispatchInstances=event._dispatchInstances;{validateEventDispatches(event);}if(Array.isArray(dispatchListeners)){for(var i=0;i<dispatchListeners.length;i++){if(event.isPropagationStopped()){break;}// Listeners and Instances are two parallel arrays that are always in sync.
executeDispatch(event,simulated,dispatchListeners[i],dispatchInstances[i]);}}else if(dispatchListeners){executeDispatch(event,simulated,dispatchListeners,dispatchInstances);}event._dispatchListeners=null;event._dispatchInstances=null;}/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 *//**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 *//**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 *//**
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */function accumulateInto(current,next){!(next!=null)?invariant(false,'accumulateInto(...): Accumulated items must not be null or undefined.'):void 0;if(current==null){return next;}// Both are not empty. Warning: Never call x.concat(y) when you are not
// certain that x is an Array (x could be a string with concat method).
if(Array.isArray(current)){if(Array.isArray(next)){current.push.apply(current,next);return current;}current.push(next);return current;}if(Array.isArray(next)){// A bit too dangerous to mutate `next`.
return[current].concat(next);}return[current,next];}/**
 * @param {array} arr an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 * @param {function} cb Callback invoked with each element or a collection.
 * @param {?} [scope] Scope used as `this` in a callback.
 */function forEachAccumulated(arr,cb,scope){if(Array.isArray(arr)){arr.forEach(cb,scope);}else if(arr){cb.call(scope,arr);}}/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */var eventQueue=null;/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */var executeDispatchesAndRelease=function executeDispatchesAndRelease(event,simulated){if(event){executeDispatchesInOrder(event,simulated);if(!event.isPersistent()){event.constructor.release(event);}}};var executeDispatchesAndReleaseSimulated=function executeDispatchesAndReleaseSimulated(e){return executeDispatchesAndRelease(e,true);};var executeDispatchesAndReleaseTopLevel=function executeDispatchesAndReleaseTopLevel(e){return executeDispatchesAndRelease(e,false);};function isInteractive(tag){return tag==='button'||tag==='input'||tag==='select'||tag==='textarea';}function shouldPreventMouseEvent(name,type,props){switch(name){case'onClick':case'onClickCapture':case'onDoubleClick':case'onDoubleClickCapture':case'onMouseDown':case'onMouseDownCapture':case'onMouseMove':case'onMouseMoveCapture':case'onMouseUp':case'onMouseUpCapture':return!!(props.disabled&&isInteractive(type));default:return false;}}/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 *//**
 * Methods for injecting dependencies.
 */var injection$1={/**
   * @param {array} InjectedEventPluginOrder
   * @public
   */injectEventPluginOrder:injectEventPluginOrder,/**
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   */injectEventPluginsByName:injectEventPluginsByName};/**
 * @param {object} inst The instance, which is the source of events.
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @return {?function} The stored callback.
 */function getListener(inst,registrationName){var listener;// TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
// live here; needs to be moved to a better place soon
var stateNode=inst.stateNode;if(!stateNode){// Work in progress (ex: onload events in incremental mode).
return null;}var props=getFiberCurrentPropsFromNode(stateNode);if(!props){// Work in progress.
return null;}listener=props[registrationName];if(shouldPreventMouseEvent(registrationName,inst.type,props)){return null;}!(!listener||typeof listener==='function')?invariant(false,'Expected `%s` listener to be a function, instead got a value of `%s` type.',registrationName,typeof listener==='undefined'?'undefined':_typeof(listener)):void 0;return listener;}/**
 * Allows registered plugins an opportunity to extract events from top-level
 * native browser events.
 *
 * @return {*} An accumulation of synthetic events.
 * @internal
 */function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var events;for(var i=0;i<plugins.length;i++){// Not every plugin in the ordering may be loaded at runtime.
var possiblePlugin=plugins[i];if(possiblePlugin){var extractedEvents=possiblePlugin.extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget);if(extractedEvents){events=accumulateInto(events,extractedEvents);}}}return events;}/**
 * Enqueues a synthetic event that should be dispatched when
 * `processEventQueue` is invoked.
 *
 * @param {*} events An accumulation of synthetic events.
 * @internal
 */function enqueueEvents(events){if(events){eventQueue=accumulateInto(eventQueue,events);}}/**
 * Dispatches all synthetic events on the event queue.
 *
 * @internal
 */function processEventQueue(simulated){// Set `eventQueue` to null before processing it so that we can tell if more
// events get enqueued while processing.
var processingEventQueue=eventQueue;eventQueue=null;if(!processingEventQueue){return;}if(simulated){forEachAccumulated(processingEventQueue,executeDispatchesAndReleaseSimulated);}else{forEachAccumulated(processingEventQueue,executeDispatchesAndReleaseTopLevel);}!!eventQueue?invariant(false,'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.'):void 0;// This would be a good time to rethrow if any of the event handlers threw.
ReactErrorUtils.rethrowCaughtError();}var EventPluginHub=Object.freeze({injection:injection$1,getListener:getListener,extractEvents:extractEvents,enqueueEvents:enqueueEvents,processEventQueue:processEventQueue});var IndeterminateComponent=0;// Before we know whether it is functional or class
var FunctionalComponent=1;var ClassComponent=2;var HostRoot=3;// Root of a host tree. Could be nested inside another node.
var HostPortal=4;// A subtree. Could be an entry point to a different renderer.
var HostComponent=5;var HostText=6;var CallComponent=7;var CallHandlerPhase=8;var ReturnComponent=9;var Fragment=10;var randomKey=Math.random().toString(36).slice(2);var internalInstanceKey='__reactInternalInstance$'+randomKey;var internalEventHandlersKey='__reactEventHandlers$'+randomKey;function precacheFiberNode$1(hostInst,node){node[internalInstanceKey]=hostInst;}/**
 * Given a DOM node, return the closest ReactDOMComponent or
 * ReactDOMTextComponent instance ancestor.
 */function getClosestInstanceFromNode(node){if(node[internalInstanceKey]){return node[internalInstanceKey];}// Walk up the tree until we find an ancestor whose instance we have cached.
var parents=[];while(!node[internalInstanceKey]){parents.push(node);if(node.parentNode){node=node.parentNode;}else{// Top of the tree. This node must not be part of a React tree (or is
// unmounted, potentially).
return null;}}var closest=void 0;var inst=node[internalInstanceKey];if(inst.tag===HostComponent||inst.tag===HostText){// In Fiber, this will always be the deepest root.
return inst;}for(;node&&(inst=node[internalInstanceKey]);node=parents.pop()){closest=inst;}return closest;}/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */function getInstanceFromNode$1(node){var inst=node[internalInstanceKey];if(inst){if(inst.tag===HostComponent||inst.tag===HostText){return inst;}else{return null;}}return null;}/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */function getNodeFromInstance$1(inst){if(inst.tag===HostComponent||inst.tag===HostText){// In Fiber this, is just the state node right now. We assume it will be
// a host component or host text.
return inst.stateNode;}// Without this first invariant, passing a non-DOM-component triggers the next
// invariant for a missing parent, which is super confusing.
invariant(false,'getNodeFromInstance: Invalid argument.');}function getFiberCurrentPropsFromNode$1(node){return node[internalEventHandlersKey]||null;}function updateFiberProps$1(node,props){node[internalEventHandlersKey]=props;}var ReactDOMComponentTree=Object.freeze({precacheFiberNode:precacheFiberNode$1,getClosestInstanceFromNode:getClosestInstanceFromNode,getInstanceFromNode:getInstanceFromNode$1,getNodeFromInstance:getNodeFromInstance$1,getFiberCurrentPropsFromNode:getFiberCurrentPropsFromNode$1,updateFiberProps:updateFiberProps$1});function getParent(inst){do{inst=inst['return'];// TODO: If this is a HostRoot we might want to bail out.
// That is depending on if we want nested subtrees (layers) to bubble
// events to their parent. We could also go through parentNode on the
// host node but that wouldn't work for React Native and doesn't let us
// do the portal feature.
}while(inst&&inst.tag!==HostComponent);if(inst){return inst;}return null;}/**
 * Return the lowest common ancestor of A and B, or null if they are in
 * different trees.
 */function getLowestCommonAncestor(instA,instB){var depthA=0;for(var tempA=instA;tempA;tempA=getParent(tempA)){depthA++;}var depthB=0;for(var tempB=instB;tempB;tempB=getParent(tempB)){depthB++;}// If A is deeper, crawl up.
while(depthA-depthB>0){instA=getParent(instA);depthA--;}// If B is deeper, crawl up.
while(depthB-depthA>0){instB=getParent(instB);depthB--;}// Walk in lockstep until we find a match.
var depth=depthA;while(depth--){if(instA===instB||instA===instB.alternate){return instA;}instA=getParent(instA);instB=getParent(instB);}return null;}/**
 * Return if A is an ancestor of B.
 *//**
 * Return the parent instance of the passed-in instance.
 */function getParentInstance(inst){return getParent(inst);}/**
 * Simulates the traversal of a two-phase, capture/bubble event dispatch.
 */function traverseTwoPhase(inst,fn,arg){var path=[];while(inst){path.push(inst);inst=getParent(inst);}var i;for(i=path.length;i-->0;){fn(path[i],'captured',arg);}for(i=0;i<path.length;i++){fn(path[i],'bubbled',arg);}}/**
 * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
 * should would receive a `mouseEnter` or `mouseLeave` event.
 *
 * Does not invoke the callback on the nearest common ancestor because nothing
 * "entered" or "left" that element.
 */function traverseEnterLeave(from,to,fn,argFrom,argTo){var common=from&&to?getLowestCommonAncestor(from,to):null;var pathFrom=[];while(true){if(!from){break;}if(from===common){break;}var alternate=from.alternate;if(alternate!==null&&alternate===common){break;}pathFrom.push(from);from=getParent(from);}var pathTo=[];while(true){if(!to){break;}if(to===common){break;}var _alternate=to.alternate;if(_alternate!==null&&_alternate===common){break;}pathTo.push(to);to=getParent(to);}for(var i=0;i<pathFrom.length;i++){fn(pathFrom[i],'bubbled',argFrom);}for(var _i=pathTo.length;_i-->0;){fn(pathTo[_i],'captured',argTo);}}/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */function listenerAtPhase(inst,event,propagationPhase){var registrationName=event.dispatchConfig.phasedRegistrationNames[propagationPhase];return getListener(inst,registrationName);}/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing even a
 * single one.
 *//**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */function accumulateDirectionalDispatches(inst,phase,event){{warning(inst,'Dispatching inst must not be null');}var listener=listenerAtPhase(inst,event,phase);if(listener){event._dispatchListeners=accumulateInto(event._dispatchListeners,listener);event._dispatchInstances=accumulateInto(event._dispatchInstances,inst);}}/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We cannot perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */function accumulateTwoPhaseDispatchesSingle(event){if(event&&event.dispatchConfig.phasedRegistrationNames){traverseTwoPhase(event._targetInst,accumulateDirectionalDispatches,event);}}/**
 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
 */function accumulateTwoPhaseDispatchesSingleSkipTarget(event){if(event&&event.dispatchConfig.phasedRegistrationNames){var targetInst=event._targetInst;var parentInst=targetInst?getParentInstance(targetInst):null;traverseTwoPhase(parentInst,accumulateDirectionalDispatches,event);}}/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */function accumulateDispatches(inst,ignoredDirection,event){if(inst&&event&&event.dispatchConfig.registrationName){var registrationName=event.dispatchConfig.registrationName;var listener=getListener(inst,registrationName);if(listener){event._dispatchListeners=accumulateInto(event._dispatchListeners,listener);event._dispatchInstances=accumulateInto(event._dispatchInstances,inst);}}}/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */function accumulateDirectDispatchesSingle(event){if(event&&event.dispatchConfig.registrationName){accumulateDispatches(event._targetInst,null,event);}}function accumulateTwoPhaseDispatches(events){forEachAccumulated(events,accumulateTwoPhaseDispatchesSingle);}function accumulateTwoPhaseDispatchesSkipTarget(events){forEachAccumulated(events,accumulateTwoPhaseDispatchesSingleSkipTarget);}function accumulateEnterLeaveDispatches(leave,enter,from,to){traverseEnterLeave(from,to,accumulateDispatches,leave,enter);}function accumulateDirectDispatches(events){forEachAccumulated(events,accumulateDirectDispatchesSingle);}var EventPropagators=Object.freeze({accumulateTwoPhaseDispatches:accumulateTwoPhaseDispatches,accumulateTwoPhaseDispatchesSkipTarget:accumulateTwoPhaseDispatchesSkipTarget,accumulateEnterLeaveDispatches:accumulateEnterLeaveDispatches,accumulateDirectDispatches:accumulateDirectDispatches});var contentKey=null;/**
 * Gets the key used to access text content on a DOM node.
 *
 * @return {?string} Key used to access text content.
 * @internal
 */function getTextContentAccessor(){if(!contentKey&&ExecutionEnvironment.canUseDOM){// Prefer textContent to innerText because many browsers support both but
// SVG <text> elements don't support innerText even when <div> does.
contentKey='textContent'in document.documentElement?'textContent':'innerText';}return contentKey;}/**
 * This helper object stores information about text content of a target node,
 * allowing comparison of content before and after a given event.
 *
 * Identify the node where selection currently begins, then observe
 * both its text content and its current position in the DOM. Since the
 * browser may natively replace the target node during composition, we can
 * use its position to find its replacement.
 *
 *
 */var compositionState={_root:null,_startText:null,_fallbackText:null};function initialize(nativeEventTarget){compositionState._root=nativeEventTarget;compositionState._startText=getText();return true;}function reset(){compositionState._root=null;compositionState._startText=null;compositionState._fallbackText=null;}function getData(){if(compositionState._fallbackText){return compositionState._fallbackText;}var start;var startValue=compositionState._startText;var startLength=startValue.length;var end;var endValue=getText();var endLength=endValue.length;for(start=0;start<startLength;start++){if(startValue[start]!==endValue[start]){break;}}var minEnd=startLength-start;for(end=1;end<=minEnd;end++){if(startValue[startLength-end]!==endValue[endLength-end]){break;}}var sliceTail=end>1?1-end:undefined;compositionState._fallbackText=endValue.slice(start,sliceTail);return compositionState._fallbackText;}function getText(){if('value'in compositionState._root){return compositionState._root.value;}return compositionState._root[getTextContentAccessor()];}/* eslint valid-typeof: 0 */var didWarnForAddedNewProperty=false;var isProxySupported=typeof Proxy==='function';var EVENT_POOL_SIZE=10;var shouldBeReleasedProperties=['dispatchConfig','_targetInst','nativeEvent','isDefaultPrevented','isPropagationStopped','_dispatchListeners','_dispatchInstances'];/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var EventInterface={type:null,target:null,// currentTarget is set when dispatching; no use in copying it here
currentTarget:emptyFunction.thatReturnsNull,eventPhase:null,bubbles:null,cancelable:null,timeStamp:function timeStamp(event){return event.timeStamp||Date.now();},defaultPrevented:null,isTrusted:null};/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */function SyntheticEvent(dispatchConfig,targetInst,nativeEvent,nativeEventTarget){{// these have a getter/setter for warnings
delete this.nativeEvent;delete this.preventDefault;delete this.stopPropagation;}this.dispatchConfig=dispatchConfig;this._targetInst=targetInst;this.nativeEvent=nativeEvent;var Interface=this.constructor.Interface;for(var propName in Interface){if(!Interface.hasOwnProperty(propName)){continue;}{delete this[propName];// this has a getter/setter for warnings
}var normalize=Interface[propName];if(normalize){this[propName]=normalize(nativeEvent);}else{if(propName==='target'){this.target=nativeEventTarget;}else{this[propName]=nativeEvent[propName];}}}var defaultPrevented=nativeEvent.defaultPrevented!=null?nativeEvent.defaultPrevented:nativeEvent.returnValue===false;if(defaultPrevented){this.isDefaultPrevented=emptyFunction.thatReturnsTrue;}else{this.isDefaultPrevented=emptyFunction.thatReturnsFalse;}this.isPropagationStopped=emptyFunction.thatReturnsFalse;return this;}_assign(SyntheticEvent.prototype,{preventDefault:function preventDefault(){this.defaultPrevented=true;var event=this.nativeEvent;if(!event){return;}if(event.preventDefault){event.preventDefault();}else if(typeof event.returnValue!=='unknown'){event.returnValue=false;}this.isDefaultPrevented=emptyFunction.thatReturnsTrue;},stopPropagation:function stopPropagation(){var event=this.nativeEvent;if(!event){return;}if(event.stopPropagation){event.stopPropagation();}else if(typeof event.cancelBubble!=='unknown'){// The ChangeEventPlugin registers a "propertychange" event for
// IE. This event does not support bubbling or cancelling, and
// any references to cancelBubble throw "Member not found".  A
// typeof check of "unknown" circumvents this issue (and is also
// IE specific).
event.cancelBubble=true;}this.isPropagationStopped=emptyFunction.thatReturnsTrue;},/**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */persist:function persist(){this.isPersistent=emptyFunction.thatReturnsTrue;},/**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */isPersistent:emptyFunction.thatReturnsFalse,/**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */destructor:function destructor(){var Interface=this.constructor.Interface;for(var propName in Interface){{Object.defineProperty(this,propName,getPooledWarningPropertyDefinition(propName,Interface[propName]));}}for(var i=0;i<shouldBeReleasedProperties.length;i++){this[shouldBeReleasedProperties[i]]=null;}{Object.defineProperty(this,'nativeEvent',getPooledWarningPropertyDefinition('nativeEvent',null));Object.defineProperty(this,'preventDefault',getPooledWarningPropertyDefinition('preventDefault',emptyFunction));Object.defineProperty(this,'stopPropagation',getPooledWarningPropertyDefinition('stopPropagation',emptyFunction));}}});SyntheticEvent.Interface=EventInterface;/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */SyntheticEvent.augmentClass=function(Class,Interface){var Super=this;var E=function E(){};E.prototype=Super.prototype;var prototype=new E();_assign(prototype,Class.prototype);Class.prototype=prototype;Class.prototype.constructor=Class;Class.Interface=_assign({},Super.Interface,Interface);Class.augmentClass=Super.augmentClass;addEventPoolingTo(Class);};/** Proxying after everything set on SyntheticEvent
 * to resolve Proxy issue on some WebKit browsers
 * in which some Event properties are set to undefined (GH#10010)
 */{if(isProxySupported){/*eslint-disable no-func-assign */SyntheticEvent=new Proxy(SyntheticEvent,{construct:function construct(target,args){return this.apply(target,Object.create(target.prototype),args);},apply:function apply(constructor,that,args){return new Proxy(constructor.apply(that,args),{set:function set(target,prop,value){if(prop!=='isPersistent'&&!target.constructor.Interface.hasOwnProperty(prop)&&shouldBeReleasedProperties.indexOf(prop)===-1){warning(didWarnForAddedNewProperty||target.isPersistent(),"This synthetic event is reused for performance reasons. If you're "+"seeing this, you're adding a new property in the synthetic event object. "+'The property is never released. See '+'https://fb.me/react-event-pooling for more information.');didWarnForAddedNewProperty=true;}target[prop]=value;return true;}});}});/*eslint-enable no-func-assign */}}addEventPoolingTo(SyntheticEvent);/**
 * Helper to nullify syntheticEvent instance properties when destructing
 *
 * @param {String} propName
 * @param {?object} getVal
 * @return {object} defineProperty object
 */function getPooledWarningPropertyDefinition(propName,getVal){var isFunction=typeof getVal==='function';return{configurable:true,set:set,get:get};function set(val){var action=isFunction?'setting the method':'setting the property';warn(action,'This is effectively a no-op');return val;}function get(){var action=isFunction?'accessing the method':'accessing the property';var result=isFunction?'This is a no-op function':'This is set to null';warn(action,result);return getVal;}function warn(action,result){var warningCondition=false;warning(warningCondition,"This synthetic event is reused for performance reasons. If you're seeing this, "+"you're %s `%s` on a released/nullified synthetic event. %s. "+'If you must keep the original synthetic event around, use event.persist(). '+'See https://fb.me/react-event-pooling for more information.',action,propName,result);}}function getPooledEvent(dispatchConfig,targetInst,nativeEvent,nativeInst){var EventConstructor=this;if(EventConstructor.eventPool.length){var instance=EventConstructor.eventPool.pop();EventConstructor.call(instance,dispatchConfig,targetInst,nativeEvent,nativeInst);return instance;}return new EventConstructor(dispatchConfig,targetInst,nativeEvent,nativeInst);}function releasePooledEvent(event){var EventConstructor=this;!(event instanceof EventConstructor)?invariant(false,'Trying to release an event instance  into a pool of a different type.'):void 0;event.destructor();if(EventConstructor.eventPool.length<EVENT_POOL_SIZE){EventConstructor.eventPool.push(event);}}function addEventPoolingTo(EventConstructor){EventConstructor.eventPool=[];EventConstructor.getPooled=getPooledEvent;EventConstructor.release=releasePooledEvent;}var SyntheticEvent$1=SyntheticEvent;/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
 */var CompositionEventInterface={data:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */function SyntheticCompositionEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticEvent$1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticEvent$1.augmentClass(SyntheticCompositionEvent,CompositionEventInterface);/**
 * @interface Event
 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
 *      /#events-inputevents
 */var InputEventInterface={data:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */function SyntheticInputEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticEvent$1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticEvent$1.augmentClass(SyntheticInputEvent,InputEventInterface);var END_KEYCODES=[9,13,27,32];// Tab, Return, Esc, Space
var START_KEYCODE=229;var canUseCompositionEvent=ExecutionEnvironment.canUseDOM&&'CompositionEvent'in window;var documentMode=null;if(ExecutionEnvironment.canUseDOM&&'documentMode'in document){documentMode=document.documentMode;}// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var canUseTextInputEvent=ExecutionEnvironment.canUseDOM&&'TextEvent'in window&&!documentMode&&!isPresto();// In IE9+, we have access to composition events, but the data supplied
// by the native compositionend event may be incorrect. Japanese ideographic
// spaces, for instance (\u3000) are not recorded correctly.
var useFallbackCompositionData=ExecutionEnvironment.canUseDOM&&(!canUseCompositionEvent||documentMode&&documentMode>8&&documentMode<=11);/**
 * Opera <= 12 includes TextEvent in window, but does not fire
 * text input events. Rely on keypress instead.
 */function isPresto(){var opera=window.opera;return(typeof opera==='undefined'?'undefined':_typeof(opera))==='object'&&typeof opera.version==='function'&&parseInt(opera.version(),10)<=12;}var SPACEBAR_CODE=32;var SPACEBAR_CHAR=String.fromCharCode(SPACEBAR_CODE);// Events and their corresponding property names.
var eventTypes={beforeInput:{phasedRegistrationNames:{bubbled:'onBeforeInput',captured:'onBeforeInputCapture'},dependencies:['topCompositionEnd','topKeyPress','topTextInput','topPaste']},compositionEnd:{phasedRegistrationNames:{bubbled:'onCompositionEnd',captured:'onCompositionEndCapture'},dependencies:['topBlur','topCompositionEnd','topKeyDown','topKeyPress','topKeyUp','topMouseDown']},compositionStart:{phasedRegistrationNames:{bubbled:'onCompositionStart',captured:'onCompositionStartCapture'},dependencies:['topBlur','topCompositionStart','topKeyDown','topKeyPress','topKeyUp','topMouseDown']},compositionUpdate:{phasedRegistrationNames:{bubbled:'onCompositionUpdate',captured:'onCompositionUpdateCapture'},dependencies:['topBlur','topCompositionUpdate','topKeyDown','topKeyPress','topKeyUp','topMouseDown']}};// Track whether we've ever handled a keypress on the space key.
var hasSpaceKeypress=false;/**
 * Return whether a native keypress event is assumed to be a command.
 * This is required because Firefox fires `keypress` events for key commands
 * (cut, copy, select-all, etc.) even though no character is inserted.
 */function isKeypressCommand(nativeEvent){return(nativeEvent.ctrlKey||nativeEvent.altKey||nativeEvent.metaKey)&&// ctrlKey && altKey is equivalent to AltGr, and is not a command.
!(nativeEvent.ctrlKey&&nativeEvent.altKey);}/**
 * Translate native top level events into event types.
 *
 * @param {string} topLevelType
 * @return {object}
 */function getCompositionEventType(topLevelType){switch(topLevelType){case'topCompositionStart':return eventTypes.compositionStart;case'topCompositionEnd':return eventTypes.compositionEnd;case'topCompositionUpdate':return eventTypes.compositionUpdate;}}/**
 * Does our fallback best-guess model think this event signifies that
 * composition has begun?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */function isFallbackCompositionStart(topLevelType,nativeEvent){return topLevelType==='topKeyDown'&&nativeEvent.keyCode===START_KEYCODE;}/**
 * Does our fallback mode think that this event is the end of composition?
 *
 * @param {string} topLevelType
 * @param {object} nativeEvent
 * @return {boolean}
 */function isFallbackCompositionEnd(topLevelType,nativeEvent){switch(topLevelType){case'topKeyUp':// Command keys insert or clear IME input.
return END_KEYCODES.indexOf(nativeEvent.keyCode)!==-1;case'topKeyDown':// Expect IME keyCode on each keydown. If we get any other
// code we must have exited earlier.
return nativeEvent.keyCode!==START_KEYCODE;case'topKeyPress':case'topMouseDown':case'topBlur':// Events are not possible without cancelling IME.
return true;default:return false;}}/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */function getDataFromCustomEvent(nativeEvent){var detail=nativeEvent.detail;if((typeof detail==='undefined'?'undefined':_typeof(detail))==='object'&&'data'in detail){return detail.data;}return null;}// Track the current IME composition status, if any.
var isComposing=false;/**
 * @return {?object} A SyntheticCompositionEvent.
 */function extractCompositionEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget){var eventType;var fallbackData;if(canUseCompositionEvent){eventType=getCompositionEventType(topLevelType);}else if(!isComposing){if(isFallbackCompositionStart(topLevelType,nativeEvent)){eventType=eventTypes.compositionStart;}}else if(isFallbackCompositionEnd(topLevelType,nativeEvent)){eventType=eventTypes.compositionEnd;}if(!eventType){return null;}if(useFallbackCompositionData){// The current composition is stored statically and must not be
// overwritten while composition continues.
if(!isComposing&&eventType===eventTypes.compositionStart){isComposing=initialize(nativeEventTarget);}else if(eventType===eventTypes.compositionEnd){if(isComposing){fallbackData=getData();}}}var event=SyntheticCompositionEvent.getPooled(eventType,targetInst,nativeEvent,nativeEventTarget);if(fallbackData){// Inject data generated from fallback path into the synthetic event.
// This matches the property of native CompositionEventInterface.
event.data=fallbackData;}else{var customData=getDataFromCustomEvent(nativeEvent);if(customData!==null){event.data=customData;}}accumulateTwoPhaseDispatches(event);return event;}/**
 * @param {TopLevelTypes} topLevelType Record from `BrowserEventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The string corresponding to this `beforeInput` event.
 */function getNativeBeforeInputChars(topLevelType,nativeEvent){switch(topLevelType){case'topCompositionEnd':return getDataFromCustomEvent(nativeEvent);case'topKeyPress':/**
       * If native `textInput` events are available, our goal is to make
       * use of them. However, there is a special case: the spacebar key.
       * In Webkit, preventing default on a spacebar `textInput` event
       * cancels character insertion, but it *also* causes the browser
       * to fall back to its default spacebar behavior of scrolling the
       * page.
       *
       * Tracking at:
       * https://code.google.com/p/chromium/issues/detail?id=355103
       *
       * To avoid this issue, use the keypress event as if no `textInput`
       * event is available.
       */var which=nativeEvent.which;if(which!==SPACEBAR_CODE){return null;}hasSpaceKeypress=true;return SPACEBAR_CHAR;case'topTextInput':// Record the characters to be added to the DOM.
var chars=nativeEvent.data;// If it's a spacebar character, assume that we have already handled
// it at the keypress level and bail immediately. Android Chrome
// doesn't give us keycodes, so we need to blacklist it.
if(chars===SPACEBAR_CHAR&&hasSpaceKeypress){return null;}return chars;default:// For other native event types, do nothing.
return null;}}/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 *
 * @param {string} topLevelType Record from `BrowserEventConstants`.
 * @param {object} nativeEvent Native browser event.
 * @return {?string} The fallback string for this `beforeInput` event.
 */function getFallbackBeforeInputChars(topLevelType,nativeEvent){// If we are currently composing (IME) and using a fallback to do so,
// try to extract the composed characters from the fallback object.
// If composition event is available, we extract a string only at
// compositionevent, otherwise extract it at fallback events.
if(isComposing){if(topLevelType==='topCompositionEnd'||!canUseCompositionEvent&&isFallbackCompositionEnd(topLevelType,nativeEvent)){var chars=getData();reset();isComposing=false;return chars;}return null;}switch(topLevelType){case'topPaste':// If a paste event occurs after a keypress, throw out the input
// chars. Paste events should not lead to BeforeInput events.
return null;case'topKeyPress':/**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */if(!isKeypressCommand(nativeEvent)){// IE fires the `keypress` event when a user types an emoji via
// Touch keyboard of Windows.  In such a case, the `char` property
// holds an emoji character like `\uD83D\uDE0A`.  Because its length
// is 2, the property `which` does not represent an emoji correctly.
// In such a case, we directly return the `char` property instead of
// using `which`.
if(nativeEvent.char&&nativeEvent.char.length>1){return nativeEvent.char;}else if(nativeEvent.which){return String.fromCharCode(nativeEvent.which);}}return null;case'topCompositionEnd':return useFallbackCompositionData?null:nativeEvent.data;default:return null;}}/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */function extractBeforeInputEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget){var chars;if(canUseTextInputEvent){chars=getNativeBeforeInputChars(topLevelType,nativeEvent);}else{chars=getFallbackBeforeInputChars(topLevelType,nativeEvent);}// If no characters are being inserted, no BeforeInput event should
// be fired.
if(!chars){return null;}var event=SyntheticInputEvent.getPooled(eventTypes.beforeInput,targetInst,nativeEvent,nativeEventTarget);event.data=chars;accumulateTwoPhaseDispatches(event);return event;}/**
 * Create an `onBeforeInput` event to match
 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
 *
 * This event plugin is based on the native `textInput` event
 * available in Chrome, Safari, Opera, and IE. This event fires after
 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
 *
 * `beforeInput` is spec'd but not implemented in any browsers, and
 * the `input` event does not provide any useful information about what has
 * actually been added, contrary to the spec. Thus, `textInput` is the best
 * available event to identify the characters that have actually been inserted
 * into the target node.
 *
 * This plugin is also responsible for emitting `composition` events, thus
 * allowing us to share composition fallback code for both `beforeInput` and
 * `composition` event types.
 */var BeforeInputEventPlugin={eventTypes:eventTypes,extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){return[extractCompositionEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget),extractBeforeInputEvent(topLevelType,targetInst,nativeEvent,nativeEventTarget)];}};// Use to restore controlled state after a change event has fired.
var fiberHostComponent=null;var ReactControlledComponentInjection={injectFiberControlledHostComponent:function injectFiberControlledHostComponent(hostComponentImpl){// The fiber implementation doesn't use dynamic dispatch so we need to
// inject the implementation.
fiberHostComponent=hostComponentImpl;}};var restoreTarget=null;var restoreQueue=null;function restoreStateOfTarget(target){// We perform this translation at the end of the event loop so that we
// always receive the correct fiber here
var internalInstance=getInstanceFromNode(target);if(!internalInstance){// Unmounted
return;}!(fiberHostComponent&&typeof fiberHostComponent.restoreControlledState==='function')?invariant(false,'Fiber needs to be injected to handle a fiber target for controlled events. This error is likely caused by a bug in React. Please file an issue.'):void 0;var props=getFiberCurrentPropsFromNode(internalInstance.stateNode);fiberHostComponent.restoreControlledState(internalInstance.stateNode,internalInstance.type,props);}var injection$3=ReactControlledComponentInjection;function enqueueStateRestore(target){if(restoreTarget){if(restoreQueue){restoreQueue.push(target);}else{restoreQueue=[target];}}else{restoreTarget=target;}}function restoreStateIfNeeded(){if(!restoreTarget){return;}var target=restoreTarget;var queuedTargets=restoreQueue;restoreTarget=null;restoreQueue=null;restoreStateOfTarget(target);if(queuedTargets){for(var i=0;i<queuedTargets.length;i++){restoreStateOfTarget(queuedTargets[i]);}}}var ReactControlledComponent=Object.freeze({injection:injection$3,enqueueStateRestore:enqueueStateRestore,restoreStateIfNeeded:restoreStateIfNeeded});// Used as a way to call batchedUpdates when we don't have a reference to
// the renderer. Such as when we're dispatching events or if third party
// libraries need to call batchedUpdates. Eventually, this API will go away when
// everything is batched by default. We'll then have a similar API to opt-out of
// scheduled work and instead do synchronous work.
// Defaults
var fiberBatchedUpdates=function fiberBatchedUpdates(fn,bookkeeping){return fn(bookkeeping);};var isNestingBatched=false;function batchedUpdates(fn,bookkeeping){if(isNestingBatched){// If we are currently inside another batch, we need to wait until it
// fully completes before restoring state. Therefore, we add the target to
// a queue of work.
return fiberBatchedUpdates(fn,bookkeeping);}isNestingBatched=true;try{return fiberBatchedUpdates(fn,bookkeeping);}finally{// Here we wait until all updates have propagated, which is important
// when using controlled components within layers:
// https://github.com/facebook/react/issues/1698
// Then we restore state of any controlled component.
isNestingBatched=false;restoreStateIfNeeded();}}var ReactGenericBatchingInjection={injectFiberBatchedUpdates:function injectFiberBatchedUpdates(_batchedUpdates){fiberBatchedUpdates=_batchedUpdates;}};var injection$4=ReactGenericBatchingInjection;/**
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
 */var supportedInputTypes={color:true,date:true,datetime:true,'datetime-local':true,email:true,month:true,number:true,password:true,range:true,search:true,tel:true,text:true,time:true,url:true,week:true};function isTextInputElement(elem){var nodeName=elem&&elem.nodeName&&elem.nodeName.toLowerCase();if(nodeName==='input'){return!!supportedInputTypes[elem.type];}if(nodeName==='textarea'){return true;}return false;}/**
 * HTML nodeType values that represent the type of the node
 */var ELEMENT_NODE=1;var TEXT_NODE=3;var COMMENT_NODE=8;var DOCUMENT_NODE=9;var DOCUMENT_FRAGMENT_NODE=11;/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */function getEventTarget(nativeEvent){var target=nativeEvent.target||nativeEvent.srcElement||window;// Normalize SVG <use> element events #4963
if(target.correspondingUseElement){target=target.correspondingUseElement;}// Safari may fire events on text nodes (Node.TEXT_NODE is 3).
// @see http://www.quirksmode.org/js/events_properties.html
return target.nodeType===TEXT_NODE?target.parentNode:target;}var useHasFeature;if(ExecutionEnvironment.canUseDOM){useHasFeature=document.implementation&&document.implementation.hasFeature&&// always returns true in newer browsers as per the standard.
// @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
document.implementation.hasFeature('','')!==true;}/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @param {?boolean} capture Check if the capture phase is supported.
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */function isEventSupported(eventNameSuffix,capture){if(!ExecutionEnvironment.canUseDOM||capture&&!('addEventListener'in document)){return false;}var eventName='on'+eventNameSuffix;var isSupported=eventName in document;if(!isSupported){var element=document.createElement('div');element.setAttribute(eventName,'return;');isSupported=typeof element[eventName]==='function';}if(!isSupported&&useHasFeature&&eventNameSuffix==='wheel'){// This is the only way to test support for the `wheel` event in IE9+.
isSupported=document.implementation.hasFeature('Events.wheel','3.0');}return isSupported;}function isCheckable(elem){var type=elem.type;var nodeName=elem.nodeName;return nodeName&&nodeName.toLowerCase()==='input'&&(type==='checkbox'||type==='radio');}function getTracker(node){return node._valueTracker;}function detachTracker(node){node._valueTracker=null;}function getValueFromNode(node){var value='';if(!node){return value;}if(isCheckable(node)){value=node.checked?'true':'false';}else{value=node.value;}return value;}function trackValueOnNode(node){var valueField=isCheckable(node)?'checked':'value';var descriptor=Object.getOwnPropertyDescriptor(node.constructor.prototype,valueField);var currentValue=''+node[valueField];// if someone has already defined a value or Safari, then bail
// and don't track value will cause over reporting of changes,
// but it's better then a hard failure
// (needed for certain tests that spyOn input values and Safari)
if(node.hasOwnProperty(valueField)||typeof descriptor.get!=='function'||typeof descriptor.set!=='function'){return;}Object.defineProperty(node,valueField,{enumerable:descriptor.enumerable,configurable:true,get:function get(){return descriptor.get.call(this);},set:function set(value){currentValue=''+value;descriptor.set.call(this,value);}});var tracker={getValue:function getValue(){return currentValue;},setValue:function setValue(value){currentValue=''+value;},stopTracking:function stopTracking(){detachTracker(node);delete node[valueField];}};return tracker;}function track(node){if(getTracker(node)){return;}// TODO: Once it's just Fiber we can move this to node._wrapperState
node._valueTracker=trackValueOnNode(node);}function updateValueIfChanged(node){if(!node){return false;}var tracker=getTracker(node);// if there is no tracker at this point it's unlikely
// that trying again will succeed
if(!tracker){return true;}var lastValue=tracker.getValue();var nextValue=getValueFromNode(node);if(nextValue!==lastValue){tracker.setValue(nextValue);return true;}return false;}var eventTypes$1={change:{phasedRegistrationNames:{bubbled:'onChange',captured:'onChangeCapture'},dependencies:['topBlur','topChange','topClick','topFocus','topInput','topKeyDown','topKeyUp','topSelectionChange']}};function createAndAccumulateChangeEvent(inst,nativeEvent,target){var event=SyntheticEvent$1.getPooled(eventTypes$1.change,inst,nativeEvent,target);event.type='change';// Flag this event loop as needing state restore.
enqueueStateRestore(target);accumulateTwoPhaseDispatches(event);return event;}/**
 * For IE shims
 */var activeElement=null;var activeElementInst=null;/**
 * SECTION: handle `change` event
 */function shouldUseChangeEvent(elem){var nodeName=elem.nodeName&&elem.nodeName.toLowerCase();return nodeName==='select'||nodeName==='input'&&elem.type==='file';}function manualDispatchChangeEvent(nativeEvent){var event=createAndAccumulateChangeEvent(activeElementInst,nativeEvent,getEventTarget(nativeEvent));// If change and propertychange bubbled, we'd just bind to it like all the
// other events and have it go through ReactBrowserEventEmitter. Since it
// doesn't, we manually listen for the events and so we have to enqueue and
// process the abstract event manually.
//
// Batching is necessary here in order to ensure that all event handlers run
// before the next rerender (including event handlers attached to ancestor
// elements instead of directly on the input). Without this, controlled
// components don't work properly in conjunction with event bubbling because
// the component is rerendered and the value reverted before all the event
// handlers can run. See https://github.com/facebook/react/issues/708.
batchedUpdates(runEventInBatch,event);}function runEventInBatch(event){enqueueEvents(event);processEventQueue(false);}function getInstIfValueChanged(targetInst){var targetNode=getNodeFromInstance$1(targetInst);if(updateValueIfChanged(targetNode)){return targetInst;}}function getTargetInstForChangeEvent(topLevelType,targetInst){if(topLevelType==='topChange'){return targetInst;}}/**
 * SECTION: handle `input` event
 */var isInputEventSupported=false;if(ExecutionEnvironment.canUseDOM){// IE9 claims to support the input event but fails to trigger it when
// deleting text, so we ignore its input events.
isInputEventSupported=isEventSupported('input')&&(!document.documentMode||document.documentMode>9);}/**
 * (For IE <=9) Starts tracking propertychange events on the passed-in element
 * and override the value property so that we can distinguish user events from
 * value changes in JS.
 */function startWatchingForValueChange(target,targetInst){activeElement=target;activeElementInst=targetInst;activeElement.attachEvent('onpropertychange',handlePropertyChange);}/**
 * (For IE <=9) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */function stopWatchingForValueChange(){if(!activeElement){return;}activeElement.detachEvent('onpropertychange',handlePropertyChange);activeElement=null;activeElementInst=null;}/**
 * (For IE <=9) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */function handlePropertyChange(nativeEvent){if(nativeEvent.propertyName!=='value'){return;}if(getInstIfValueChanged(activeElementInst)){manualDispatchChangeEvent(nativeEvent);}}function handleEventsForInputEventPolyfill(topLevelType,target,targetInst){if(topLevelType==='topFocus'){// In IE9, propertychange fires for most input events but is buggy and
// doesn't fire when text is deleted, but conveniently, selectionchange
// appears to fire in all of the remaining cases so we catch those and
// forward the event if the value has changed
// In either case, we don't want to call the event handler if the value
// is changed from JS so we redefine a setter for `.value` that updates
// our activeElementValue variable, allowing us to ignore those changes
//
// stopWatching() should be a noop here but we call it just in case we
// missed a blur event somehow.
stopWatchingForValueChange();startWatchingForValueChange(target,targetInst);}else if(topLevelType==='topBlur'){stopWatchingForValueChange();}}// For IE8 and IE9.
function getTargetInstForInputEventPolyfill(topLevelType,targetInst){if(topLevelType==='topSelectionChange'||topLevelType==='topKeyUp'||topLevelType==='topKeyDown'){// On the selectionchange event, the target is just document which isn't
// helpful for us so just check activeElement instead.
//
// 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
// propertychange on the first input event after setting `value` from a
// script and fires only keydown, keypress, keyup. Catching keyup usually
// gets it and catching keydown lets us fire an event for the first
// keystroke if user does a key repeat (it'll be a little delayed: right
// before the second keystroke). Other input methods (e.g., paste) seem to
// fire selectionchange normally.
return getInstIfValueChanged(activeElementInst);}}/**
 * SECTION: handle `click` event
 */function shouldUseClickEvent(elem){// Use the `click` event to detect changes to checkbox and radio inputs.
// This approach works across all browsers, whereas `change` does not fire
// until `blur` in IE8.
var nodeName=elem.nodeName;return nodeName&&nodeName.toLowerCase()==='input'&&(elem.type==='checkbox'||elem.type==='radio');}function getTargetInstForClickEvent(topLevelType,targetInst){if(topLevelType==='topClick'){return getInstIfValueChanged(targetInst);}}function getTargetInstForInputOrChangeEvent(topLevelType,targetInst){if(topLevelType==='topInput'||topLevelType==='topChange'){return getInstIfValueChanged(targetInst);}}function handleControlledInputBlur(inst,node){// TODO: In IE, inst is occasionally null. Why?
if(inst==null){return;}// Fiber and ReactDOM keep wrapper state in separate places
var state=inst._wrapperState||node._wrapperState;if(!state||!state.controlled||node.type!=='number'){return;}// If controlled, assign the value attribute to the current value on blur
var value=''+node.value;if(node.getAttribute('value')!==value){node.setAttribute('value',value);}}/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */var ChangeEventPlugin={eventTypes:eventTypes$1,_isInputEventSupported:isInputEventSupported,extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var targetNode=targetInst?getNodeFromInstance$1(targetInst):window;var getTargetInstFunc,handleEventFunc;if(shouldUseChangeEvent(targetNode)){getTargetInstFunc=getTargetInstForChangeEvent;}else if(isTextInputElement(targetNode)){if(isInputEventSupported){getTargetInstFunc=getTargetInstForInputOrChangeEvent;}else{getTargetInstFunc=getTargetInstForInputEventPolyfill;handleEventFunc=handleEventsForInputEventPolyfill;}}else if(shouldUseClickEvent(targetNode)){getTargetInstFunc=getTargetInstForClickEvent;}if(getTargetInstFunc){var inst=getTargetInstFunc(topLevelType,targetInst);if(inst){var event=createAndAccumulateChangeEvent(inst,nativeEvent,nativeEventTarget);return event;}}if(handleEventFunc){handleEventFunc(topLevelType,targetNode,targetInst);}// When blurring, set the value attribute for number inputs
if(topLevelType==='topBlur'){handleControlledInputBlur(targetInst,targetNode);}}};/**
 * Module that is injectable into `EventPluginHub`, that specifies a
 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
 * plugins, without having to package every one of them. This is better than
 * having plugins be ordered in the same order that they are injected because
 * that ordering would be influenced by the packaging order.
 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
 */var DOMEventPluginOrder=['ResponderEventPlugin','SimpleEventPlugin','TapEventPlugin','EnterLeaveEventPlugin','ChangeEventPlugin','SelectEventPlugin','BeforeInputEventPlugin'];/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var UIEventInterface={view:null,detail:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */function SyntheticUIEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticEvent$1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticEvent$1.augmentClass(SyntheticUIEvent,UIEventInterface);/**
 * Translation from modifier key to the associated property in the event.
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
 */var modifierKeyToProp={Alt:'altKey',Control:'ctrlKey',Meta:'metaKey',Shift:'shiftKey'};// IE8 does not implement getModifierState so we simply map it to the only
// modifier keys exposed by the event itself, does not support Lock-keys.
// Currently, all major browsers except Chrome seems to support Lock-keys.
function modifierStateGetter(keyArg){var syntheticEvent=this;var nativeEvent=syntheticEvent.nativeEvent;if(nativeEvent.getModifierState){return nativeEvent.getModifierState(keyArg);}var keyProp=modifierKeyToProp[keyArg];return keyProp?!!nativeEvent[keyProp]:false;}function getEventModifierState(nativeEvent){return modifierStateGetter;}/**
 * @interface MouseEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var MouseEventInterface={screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:getEventModifierState,button:null,buttons:null,relatedTarget:function relatedTarget(event){return event.relatedTarget||(event.fromElement===event.srcElement?event.toElement:event.fromElement);}};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticMouseEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticUIEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticUIEvent.augmentClass(SyntheticMouseEvent,MouseEventInterface);var eventTypes$2={mouseEnter:{registrationName:'onMouseEnter',dependencies:['topMouseOut','topMouseOver']},mouseLeave:{registrationName:'onMouseLeave',dependencies:['topMouseOut','topMouseOver']}};var EnterLeaveEventPlugin={eventTypes:eventTypes$2,/**
   * For almost every interaction we care about, there will be both a top-level
   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
   * we do not extract duplicate events. However, moving the mouse into the
   * browser from outside will not fire a `mouseout` event. In this case, we use
   * the `mouseover` top-level event.
   */extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){if(topLevelType==='topMouseOver'&&(nativeEvent.relatedTarget||nativeEvent.fromElement)){return null;}if(topLevelType!=='topMouseOut'&&topLevelType!=='topMouseOver'){// Must not be a mouse in or mouse out - ignoring.
return null;}var win;if(nativeEventTarget.window===nativeEventTarget){// `nativeEventTarget` is probably a window object.
win=nativeEventTarget;}else{// TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
var doc=nativeEventTarget.ownerDocument;if(doc){win=doc.defaultView||doc.parentWindow;}else{win=window;}}var from;var to;if(topLevelType==='topMouseOut'){from=targetInst;var related=nativeEvent.relatedTarget||nativeEvent.toElement;to=related?getClosestInstanceFromNode(related):null;}else{// Moving to a node from outside the window.
from=null;to=targetInst;}if(from===to){// Nothing pertains to our managed components.
return null;}var fromNode=from==null?win:getNodeFromInstance$1(from);var toNode=to==null?win:getNodeFromInstance$1(to);var leave=SyntheticMouseEvent.getPooled(eventTypes$2.mouseLeave,from,nativeEvent,nativeEventTarget);leave.type='mouseleave';leave.target=fromNode;leave.relatedTarget=toNode;var enter=SyntheticMouseEvent.getPooled(eventTypes$2.mouseEnter,to,nativeEvent,nativeEventTarget);enter.type='mouseenter';enter.target=toNode;enter.relatedTarget=fromNode;accumulateEnterLeaveDispatches(leave,enter,from,to);return[leave,enter];}};/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 *
 * Note that this module is currently shared and assumed to be stateless.
 * If this becomes an actual Map, that will break.
 *//**
 * This API should be called `delete` but we'd have to make sure to always
 * transform these to strings for IE support. When this transform is fully
 * supported we can rename it.
 */function get(key){return key._reactInternalFiber;}function has(key){return key._reactInternalFiber!==undefined;}function set(key,value){key._reactInternalFiber=value;}var ReactInternals=React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;var ReactCurrentOwner=ReactInternals.ReactCurrentOwner;var ReactDebugCurrentFrame=ReactInternals.ReactDebugCurrentFrame;function getComponentName(fiber){var type=fiber.type;if(typeof type==='string'){return type;}if(typeof type==='function'){return type.displayName||type.name;}return null;}// Don't change these two values:
var NoEffect=0;//           0b00000000
var PerformedWork=1;//      0b00000001
// You can change the rest (and add more).
var Placement=2;//          0b00000010
var Update=4;//             0b00000100
var PlacementAndUpdate=6;// 0b00000110
var Deletion=8;//           0b00001000
var ContentReset=16;//      0b00010000
var Callback=32;//          0b00100000
var Err=64;//               0b01000000
var Ref=128;//              0b10000000
var MOUNTING=1;var MOUNTED=2;var UNMOUNTED=3;function isFiberMountedImpl(fiber){var node=fiber;if(!fiber.alternate){// If there is no alternate, this might be a new tree that isn't inserted
// yet. If it is, then it will have a pending insertion effect on it.
if((node.effectTag&Placement)!==NoEffect){return MOUNTING;}while(node['return']){node=node['return'];if((node.effectTag&Placement)!==NoEffect){return MOUNTING;}}}else{while(node['return']){node=node['return'];}}if(node.tag===HostRoot){// TODO: Check if this was a nested HostRoot when used with
// renderContainerIntoSubtree.
return MOUNTED;}// If we didn't hit the root, that means that we're in an disconnected tree
// that has been unmounted.
return UNMOUNTED;}function isFiberMounted(fiber){return isFiberMountedImpl(fiber)===MOUNTED;}function isMounted(component){{var owner=ReactCurrentOwner.current;if(owner!==null&&owner.tag===ClassComponent){var ownerFiber=owner;var instance=ownerFiber.stateNode;warning(instance._warnedAboutRefsInRender,'%s is accessing isMounted inside its render() function. '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',getComponentName(ownerFiber)||'A component');instance._warnedAboutRefsInRender=true;}}var fiber=get(component);if(!fiber){return false;}return isFiberMountedImpl(fiber)===MOUNTED;}function assertIsMounted(fiber){!(isFiberMountedImpl(fiber)===MOUNTED)?invariant(false,'Unable to find node on an unmounted component.'):void 0;}function findCurrentFiberUsingSlowPath(fiber){var alternate=fiber.alternate;if(!alternate){// If there is no alternate, then we only need to check if it is mounted.
var state=isFiberMountedImpl(fiber);!(state!==UNMOUNTED)?invariant(false,'Unable to find node on an unmounted component.'):void 0;if(state===MOUNTING){return null;}return fiber;}// If we have two possible branches, we'll walk backwards up to the root
// to see what path the root points to. On the way we may hit one of the
// special cases and we'll deal with them.
var a=fiber;var b=alternate;while(true){var parentA=a['return'];var parentB=parentA?parentA.alternate:null;if(!parentA||!parentB){// We're at the root.
break;}// If both copies of the parent fiber point to the same child, we can
// assume that the child is current. This happens when we bailout on low
// priority: the bailed out fiber's child reuses the current child.
if(parentA.child===parentB.child){var child=parentA.child;while(child){if(child===a){// We've determined that A is the current branch.
assertIsMounted(parentA);return fiber;}if(child===b){// We've determined that B is the current branch.
assertIsMounted(parentA);return alternate;}child=child.sibling;}// We should never have an alternate for any mounting node. So the only
// way this could possibly happen is if this was unmounted, if at all.
invariant(false,'Unable to find node on an unmounted component.');}if(a['return']!==b['return']){// The return pointer of A and the return pointer of B point to different
// fibers. We assume that return pointers never criss-cross, so A must
// belong to the child set of A.return, and B must belong to the child
// set of B.return.
a=parentA;b=parentB;}else{// The return pointers point to the same fiber. We'll have to use the
// default, slow path: scan the child sets of each parent alternate to see
// which child belongs to which set.
//
// Search parent A's child set
var didFindChild=false;var _child=parentA.child;while(_child){if(_child===a){didFindChild=true;a=parentA;b=parentB;break;}if(_child===b){didFindChild=true;b=parentA;a=parentB;break;}_child=_child.sibling;}if(!didFindChild){// Search parent B's child set
_child=parentB.child;while(_child){if(_child===a){didFindChild=true;a=parentB;b=parentA;break;}if(_child===b){didFindChild=true;b=parentB;a=parentA;break;}_child=_child.sibling;}!didFindChild?invariant(false,'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.'):void 0;}}!(a.alternate===b)?invariant(false,'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.'):void 0;}// If the root is not a host container, we're in a disconnected tree. I.e.
// unmounted.
!(a.tag===HostRoot)?invariant(false,'Unable to find node on an unmounted component.'):void 0;if(a.stateNode.current===a){// We've determined that A is the current branch.
return fiber;}// Otherwise B has to be current branch.
return alternate;}function findCurrentHostFiber(parent){var currentParent=findCurrentFiberUsingSlowPath(parent);if(!currentParent){return null;}// Next we'll drill down this component to find the first HostComponent/Text.
var node=currentParent;while(true){if(node.tag===HostComponent||node.tag===HostText){return node;}else if(node.child){node.child['return']=node;node=node.child;continue;}if(node===currentParent){return null;}while(!node.sibling){if(!node['return']||node['return']===currentParent){return null;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;}// Flow needs the return null here, but ESLint complains about it.
// eslint-disable-next-line no-unreachable
return null;}function findCurrentHostFiberWithNoPortals(parent){var currentParent=findCurrentFiberUsingSlowPath(parent);if(!currentParent){return null;}// Next we'll drill down this component to find the first HostComponent/Text.
var node=currentParent;while(true){if(node.tag===HostComponent||node.tag===HostText){return node;}else if(node.child&&node.tag!==HostPortal){node.child['return']=node;node=node.child;continue;}if(node===currentParent){return null;}while(!node.sibling){if(!node['return']||node['return']===currentParent){return null;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;}// Flow needs the return null here, but ESLint complains about it.
// eslint-disable-next-line no-unreachable
return null;}var CALLBACK_BOOKKEEPING_POOL_SIZE=10;var callbackBookkeepingPool=[];/**
 * Find the deepest React component completely containing the root of the
 * passed-in instance (for use when entire React trees are nested within each
 * other). If React trees are not nested, returns null.
 */function findRootContainerNode(inst){// TODO: It may be a good idea to cache this to prevent unnecessary DOM
// traversal, but caching is difficult to do correctly without using a
// mutation observer to listen for all DOM changes.
while(inst['return']){inst=inst['return'];}if(inst.tag!==HostRoot){// This can happen if we're in a detached tree.
return null;}return inst.stateNode.containerInfo;}// Used to store ancestor hierarchy in top level callback
function getTopLevelCallbackBookKeeping(topLevelType,nativeEvent,targetInst){if(callbackBookkeepingPool.length){var instance=callbackBookkeepingPool.pop();instance.topLevelType=topLevelType;instance.nativeEvent=nativeEvent;instance.targetInst=targetInst;return instance;}return{topLevelType:topLevelType,nativeEvent:nativeEvent,targetInst:targetInst,ancestors:[]};}function releaseTopLevelCallbackBookKeeping(instance){instance.topLevelType=null;instance.nativeEvent=null;instance.targetInst=null;instance.ancestors.length=0;if(callbackBookkeepingPool.length<CALLBACK_BOOKKEEPING_POOL_SIZE){callbackBookkeepingPool.push(instance);}}function handleTopLevelImpl(bookKeeping){var targetInst=bookKeeping.targetInst;// Loop through the hierarchy, in case there's any nested components.
// It's important that we build the array of ancestors before calling any
// event handlers, because event handlers can modify the DOM, leading to
// inconsistencies with ReactMount's node cache. See #1105.
var ancestor=targetInst;do{if(!ancestor){bookKeeping.ancestors.push(ancestor);break;}var root=findRootContainerNode(ancestor);if(!root){break;}bookKeeping.ancestors.push(ancestor);ancestor=getClosestInstanceFromNode(root);}while(ancestor);for(var i=0;i<bookKeeping.ancestors.length;i++){targetInst=bookKeeping.ancestors[i];_handleTopLevel(bookKeeping.topLevelType,targetInst,bookKeeping.nativeEvent,getEventTarget(bookKeeping.nativeEvent));}}// TODO: can we stop exporting these?
var _enabled=true;var _handleTopLevel=void 0;function setHandleTopLevel(handleTopLevel){_handleTopLevel=handleTopLevel;}function setEnabled(enabled){_enabled=!!enabled;}function isEnabled(){return _enabled;}/**
 * Traps top-level events by using event bubbling.
 *
 * @param {string} topLevelType Record from `BrowserEventConstants`.
 * @param {string} handlerBaseName Event name (e.g. "click").
 * @param {object} element Element on which to attach listener.
 * @return {?object} An object with a remove function which will forcefully
 *                  remove the listener.
 * @internal
 */function trapBubbledEvent(topLevelType,handlerBaseName,element){if(!element){return null;}return EventListener.listen(element,handlerBaseName,dispatchEvent.bind(null,topLevelType));}/**
 * Traps a top-level event by using event capturing.
 *
 * @param {string} topLevelType Record from `BrowserEventConstants`.
 * @param {string} handlerBaseName Event name (e.g. "click").
 * @param {object} element Element on which to attach listener.
 * @return {?object} An object with a remove function which will forcefully
 *                  remove the listener.
 * @internal
 */function trapCapturedEvent(topLevelType,handlerBaseName,element){if(!element){return null;}return EventListener.capture(element,handlerBaseName,dispatchEvent.bind(null,topLevelType));}function dispatchEvent(topLevelType,nativeEvent){if(!_enabled){return;}var nativeEventTarget=getEventTarget(nativeEvent);var targetInst=getClosestInstanceFromNode(nativeEventTarget);if(targetInst!==null&&typeof targetInst.tag==='number'&&!isFiberMounted(targetInst)){// If we get an event (ex: img onload) before committing that
// component's mount, ignore it for now (that is, treat it as if it was an
// event on a non-React tree). We might also consider queueing events and
// dispatching them after the mount.
targetInst=null;}var bookKeeping=getTopLevelCallbackBookKeeping(topLevelType,nativeEvent,targetInst);try{// Event queue being processed in the same cycle allows
// `preventDefault`.
batchedUpdates(handleTopLevelImpl,bookKeeping);}finally{releaseTopLevelCallbackBookKeeping(bookKeeping);}}var ReactDOMEventListener=Object.freeze({get _enabled(){return _enabled;},get _handleTopLevel(){return _handleTopLevel;},setHandleTopLevel:setHandleTopLevel,setEnabled:setEnabled,isEnabled:isEnabled,trapBubbledEvent:trapBubbledEvent,trapCapturedEvent:trapCapturedEvent,dispatchEvent:dispatchEvent});/**
 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
 *
 * @param {string} styleProp
 * @param {string} eventName
 * @returns {object}
 */function makePrefixMap(styleProp,eventName){var prefixes={};prefixes[styleProp.toLowerCase()]=eventName.toLowerCase();prefixes['Webkit'+styleProp]='webkit'+eventName;prefixes['Moz'+styleProp]='moz'+eventName;prefixes['ms'+styleProp]='MS'+eventName;prefixes['O'+styleProp]='o'+eventName.toLowerCase();return prefixes;}/**
 * A list of event names to a configurable list of vendor prefixes.
 */var vendorPrefixes={animationend:makePrefixMap('Animation','AnimationEnd'),animationiteration:makePrefixMap('Animation','AnimationIteration'),animationstart:makePrefixMap('Animation','AnimationStart'),transitionend:makePrefixMap('Transition','TransitionEnd')};/**
 * Event names that have already been detected and prefixed (if applicable).
 */var prefixedEventNames={};/**
 * Element to check for prefixes on.
 */var style={};/**
 * Bootstrap if a DOM exists.
 */if(ExecutionEnvironment.canUseDOM){style=document.createElement('div').style;// On some platforms, in particular some releases of Android 4.x,
// the un-prefixed "animation" and "transition" properties are defined on the
// style object but the events that fire will still be prefixed, so we need
// to check if the un-prefixed events are usable, and if not remove them from the map.
if(!('AnimationEvent'in window)){delete vendorPrefixes.animationend.animation;delete vendorPrefixes.animationiteration.animation;delete vendorPrefixes.animationstart.animation;}// Same as above
if(!('TransitionEvent'in window)){delete vendorPrefixes.transitionend.transition;}}/**
 * Attempts to determine the correct vendor prefixed event name.
 *
 * @param {string} eventName
 * @returns {string}
 */function getVendorPrefixedEventName(eventName){if(prefixedEventNames[eventName]){return prefixedEventNames[eventName];}else if(!vendorPrefixes[eventName]){return eventName;}var prefixMap=vendorPrefixes[eventName];for(var styleProp in prefixMap){if(prefixMap.hasOwnProperty(styleProp)&&styleProp in style){return prefixedEventNames[eventName]=prefixMap[styleProp];}}return'';}/**
 * Types of raw signals from the browser caught at the top level.
 *
 * For events like 'submit' which don't consistently bubble (which we
 * trap at a lower node than `document`), binding at `document` would
 * cause duplicate events so we don't include them here.
 */var topLevelTypes$1={topAbort:'abort',topAnimationEnd:getVendorPrefixedEventName('animationend')||'animationend',topAnimationIteration:getVendorPrefixedEventName('animationiteration')||'animationiteration',topAnimationStart:getVendorPrefixedEventName('animationstart')||'animationstart',topBlur:'blur',topCancel:'cancel',topCanPlay:'canplay',topCanPlayThrough:'canplaythrough',topChange:'change',topClick:'click',topClose:'close',topCompositionEnd:'compositionend',topCompositionStart:'compositionstart',topCompositionUpdate:'compositionupdate',topContextMenu:'contextmenu',topCopy:'copy',topCut:'cut',topDoubleClick:'dblclick',topDrag:'drag',topDragEnd:'dragend',topDragEnter:'dragenter',topDragExit:'dragexit',topDragLeave:'dragleave',topDragOver:'dragover',topDragStart:'dragstart',topDrop:'drop',topDurationChange:'durationchange',topEmptied:'emptied',topEncrypted:'encrypted',topEnded:'ended',topError:'error',topFocus:'focus',topInput:'input',topKeyDown:'keydown',topKeyPress:'keypress',topKeyUp:'keyup',topLoadedData:'loadeddata',topLoad:'load',topLoadedMetadata:'loadedmetadata',topLoadStart:'loadstart',topMouseDown:'mousedown',topMouseMove:'mousemove',topMouseOut:'mouseout',topMouseOver:'mouseover',topMouseUp:'mouseup',topPaste:'paste',topPause:'pause',topPlay:'play',topPlaying:'playing',topProgress:'progress',topRateChange:'ratechange',topScroll:'scroll',topSeeked:'seeked',topSeeking:'seeking',topSelectionChange:'selectionchange',topStalled:'stalled',topSuspend:'suspend',topTextInput:'textInput',topTimeUpdate:'timeupdate',topToggle:'toggle',topTouchCancel:'touchcancel',topTouchEnd:'touchend',topTouchMove:'touchmove',topTouchStart:'touchstart',topTransitionEnd:getVendorPrefixedEventName('transitionend')||'transitionend',topVolumeChange:'volumechange',topWaiting:'waiting',topWheel:'wheel'};var BrowserEventConstants={topLevelTypes:topLevelTypes$1};function runEventQueueInBatch(events){enqueueEvents(events);processEventQueue(false);}/**
 * Streams a fired top-level event to `EventPluginHub` where plugins have the
 * opportunity to create `ReactEvent`s to be dispatched.
 */function handleTopLevel(topLevelType,targetInst,nativeEvent,nativeEventTarget){var events=extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget);runEventQueueInBatch(events);}var topLevelTypes=BrowserEventConstants.topLevelTypes;/**
 * Summary of `ReactBrowserEventEmitter` event handling:
 *
 *  - Top-level delegation is used to trap most native browser events. This
 *    may only occur in the main thread and is the responsibility of
 *    ReactDOMEventListener, which is injected and can therefore support
 *    pluggable event sources. This is the only work that occurs in the main
 *    thread.
 *
 *  - We normalize and de-duplicate events to account for browser quirks. This
 *    may be done in the worker thread.
 *
 *  - Forward these native events (with the associated top-level type used to
 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
 *    to extract any synthetic events.
 *
 *  - The `EventPluginHub` will then process each event by annotating them with
 *    "dispatches", a sequence of listeners and IDs that care about that event.
 *
 *  - The `EventPluginHub` then dispatches the events.
 *
 * Overview of React and the event system:
 *
 * +------------+    .
 * |    DOM     |    .
 * +------------+    .
 *       |           .
 *       v           .
 * +------------+    .
 * | ReactEvent |    .
 * |  Listener  |    .
 * +------------+    .                         +-----------+
 *       |           .               +--------+|SimpleEvent|
 *       |           .               |         |Plugin     |
 * +-----|------+    .               v         +-----------+
 * |     |      |    .    +--------------+                    +------------+
 * |     +-----------.--->|EventPluginHub|                    |    Event   |
 * |            |    .    |              |     +-----------+  | Propagators|
 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
 * |            |    .    |              |     +-----------+  |  utilities |
 * |     +-----------.--->|              |                    +------------+
 * |     |      |    .    +--------------+
 * +-----|------+    .                ^        +-----------+
 *       |           .                |        |Enter/Leave|
 *       +           .                +-------+|Plugin     |
 * +-------------+   .                         +-----------+
 * | application |   .
 * |-------------|   .
 * |             |   .
 * |             |   .
 * +-------------+   .
 *                   .
 *    React Core     .  General Purpose Event Plugin System
 */var alreadyListeningTo={};var reactTopListenersCounter=0;/**
 * To ensure no conflicts with other potential React instances on the page
 */var topListenersIDKey='_reactListenersID'+(''+Math.random()).slice(2);function getListeningForDocument(mountAt){// In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
// directly.
if(!Object.prototype.hasOwnProperty.call(mountAt,topListenersIDKey)){mountAt[topListenersIDKey]=reactTopListenersCounter++;alreadyListeningTo[mountAt[topListenersIDKey]]={};}return alreadyListeningTo[mountAt[topListenersIDKey]];}/**
 * We listen for bubbled touch events on the document object.
 *
 * Firefox v8.01 (and possibly others) exhibited strange behavior when
 * mounting `onmousemove` events at some node that was not the document
 * element. The symptoms were that if your mouse is not moving over something
 * contained within that mount point (for example on the background) the
 * top-level listeners for `onmousemove` won't be called. However, if you
 * register the `mousemove` on the document object, then it will of course
 * catch all `mousemove`s. This along with iOS quirks, justifies restricting
 * top-level listeners to the document object only, at least for these
 * movement types of events and possibly all events.
 *
 * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
 *
 * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
 * they bubble to document.
 *
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @param {object} contentDocumentHandle Document which owns the container
 */function listenTo(registrationName,contentDocumentHandle){var mountAt=contentDocumentHandle;var isListening=getListeningForDocument(mountAt);var dependencies=registrationNameDependencies[registrationName];for(var i=0;i<dependencies.length;i++){var dependency=dependencies[i];if(!(isListening.hasOwnProperty(dependency)&&isListening[dependency])){if(dependency==='topScroll'){trapCapturedEvent('topScroll','scroll',mountAt);}else if(dependency==='topFocus'||dependency==='topBlur'){trapCapturedEvent('topFocus','focus',mountAt);trapCapturedEvent('topBlur','blur',mountAt);// to make sure blur and focus event listeners are only attached once
isListening.topBlur=true;isListening.topFocus=true;}else if(dependency==='topCancel'){if(isEventSupported('cancel',true)){trapCapturedEvent('topCancel','cancel',mountAt);}isListening.topCancel=true;}else if(dependency==='topClose'){if(isEventSupported('close',true)){trapCapturedEvent('topClose','close',mountAt);}isListening.topClose=true;}else if(topLevelTypes.hasOwnProperty(dependency)){trapBubbledEvent(dependency,topLevelTypes[dependency],mountAt);}isListening[dependency]=true;}}}function isListeningToAllDependencies(registrationName,mountAt){var isListening=getListeningForDocument(mountAt);var dependencies=registrationNameDependencies[registrationName];for(var i=0;i<dependencies.length;i++){var dependency=dependencies[i];if(!(isListening.hasOwnProperty(dependency)&&isListening[dependency])){return false;}}return true;}/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */function getLeafNode(node){while(node&&node.firstChild){node=node.firstChild;}return node;}/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */function getSiblingNode(node){while(node){if(node.nextSibling){return node.nextSibling;}node=node.parentNode;}}/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */function getNodeForCharacterOffset(root,offset){var node=getLeafNode(root);var nodeStart=0;var nodeEnd=0;while(node){if(node.nodeType===TEXT_NODE){nodeEnd=nodeStart+node.textContent.length;if(nodeStart<=offset&&nodeEnd>=offset){return{node:node,offset:offset-nodeStart};}nodeStart=nodeEnd;}node=getLeafNode(getSiblingNode(node));}}/**
 * @param {DOMElement} outerNode
 * @return {?object}
 */function getOffsets(outerNode){var selection=window.getSelection&&window.getSelection();if(!selection||selection.rangeCount===0){return null;}var anchorNode=selection.anchorNode,anchorOffset=selection.anchorOffset,focusNode$$1=selection.focusNode,focusOffset=selection.focusOffset;// In Firefox, anchorNode and focusNode can be "anonymous divs", e.g. the
// up/down buttons on an <input type="number">. Anonymous divs do not seem to
// expose properties, triggering a "Permission denied error" if any of its
// properties are accessed. The only seemingly possible way to avoid erroring
// is to access a property that typically works for non-anonymous divs and
// catch any error that may otherwise arise. See
// https://bugzilla.mozilla.org/show_bug.cgi?id=208427
try{/* eslint-disable no-unused-expressions */anchorNode.nodeType;focusNode$$1.nodeType;/* eslint-enable no-unused-expressions */}catch(e){return null;}return getModernOffsetsFromPoints(outerNode,anchorNode,anchorOffset,focusNode$$1,focusOffset);}/**
 * Returns {start, end} where `start` is the character/codepoint index of
 * (anchorNode, anchorOffset) within the textContent of `outerNode`, and
 * `end` is the index of (focusNode, focusOffset).
 *
 * Returns null if you pass in garbage input but we should probably just crash.
 *
 * Exported only for testing.
 */function getModernOffsetsFromPoints(outerNode,anchorNode,anchorOffset,focusNode$$1,focusOffset){var length=0;var start=-1;var end=-1;var indexWithinAnchor=0;var indexWithinFocus=0;var node=outerNode;var parentNode=null;outer:while(true){var next=null;while(true){if(node===anchorNode&&(anchorOffset===0||node.nodeType===TEXT_NODE)){start=length+anchorOffset;}if(node===focusNode$$1&&(focusOffset===0||node.nodeType===TEXT_NODE)){end=length+focusOffset;}if(node.nodeType===TEXT_NODE){length+=node.nodeValue.length;}if((next=node.firstChild)===null){break;}// Moving from `node` to its first child `next`.
parentNode=node;node=next;}while(true){if(node===outerNode){// If `outerNode` has children, this is always the second time visiting
// it. If it has no children, this is still the first loop, and the only
// valid selection is anchorNode and focusNode both equal to this node
// and both offsets 0, in which case we will have handled above.
break outer;}if(parentNode===anchorNode&&++indexWithinAnchor===anchorOffset){start=length;}if(parentNode===focusNode$$1&&++indexWithinFocus===focusOffset){end=length;}if((next=node.nextSibling)!==null){break;}node=parentNode;parentNode=node.parentNode;}// Moving from `node` to its next sibling `next`.
node=next;}if(start===-1||end===-1){// This should never happen. (Would happen if the anchor/focus nodes aren't
// actually inside the passed-in node.)
return null;}return{start:start,end:end};}/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programmatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */function setOffsets(node,offsets){if(!window.getSelection){return;}var selection=window.getSelection();var length=node[getTextContentAccessor()].length;var start=Math.min(offsets.start,length);var end=offsets.end===undefined?start:Math.min(offsets.end,length);// IE 11 uses modern selection, but doesn't support the extend method.
// Flip backward selections, so we can set with a single range.
if(!selection.extend&&start>end){var temp=end;end=start;start=temp;}var startMarker=getNodeForCharacterOffset(node,start);var endMarker=getNodeForCharacterOffset(node,end);if(startMarker&&endMarker){if(selection.rangeCount===1&&selection.anchorNode===startMarker.node&&selection.anchorOffset===startMarker.offset&&selection.focusNode===endMarker.node&&selection.focusOffset===endMarker.offset){return;}var range=document.createRange();range.setStart(startMarker.node,startMarker.offset);selection.removeAllRanges();if(start>end){selection.addRange(range);selection.extend(endMarker.node,endMarker.offset);}else{range.setEnd(endMarker.node,endMarker.offset);selection.addRange(range);}}}function isInDocument(node){return containsNode(document.documentElement,node);}/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 */function hasSelectionCapabilities(elem){var nodeName=elem&&elem.nodeName&&elem.nodeName.toLowerCase();return nodeName&&(nodeName==='input'&&elem.type==='text'||nodeName==='textarea'||elem.contentEditable==='true');}function getSelectionInformation(){var focusedElem=getActiveElement();return{focusedElem:focusedElem,selectionRange:hasSelectionCapabilities(focusedElem)?getSelection$1(focusedElem):null};}/**
 * @restoreSelection: If any selection information was potentially lost,
 * restore it. This is useful when performing operations that could remove dom
 * nodes and place them back in, resulting in focus being lost.
 */function restoreSelection(priorSelectionInformation){var curFocusedElem=getActiveElement();var priorFocusedElem=priorSelectionInformation.focusedElem;var priorSelectionRange=priorSelectionInformation.selectionRange;if(curFocusedElem!==priorFocusedElem&&isInDocument(priorFocusedElem)){if(hasSelectionCapabilities(priorFocusedElem)){setSelection(priorFocusedElem,priorSelectionRange);}// Focusing a node can change the scroll position, which is undesirable
var ancestors=[];var ancestor=priorFocusedElem;while(ancestor=ancestor.parentNode){if(ancestor.nodeType===ELEMENT_NODE){ancestors.push({element:ancestor,left:ancestor.scrollLeft,top:ancestor.scrollTop});}}focusNode(priorFocusedElem);for(var i=0;i<ancestors.length;i++){var info=ancestors[i];info.element.scrollLeft=info.left;info.element.scrollTop=info.top;}}}/**
 * @getSelection: Gets the selection bounds of a focused textarea, input or
 * contentEditable node.
 * -@input: Look up selection bounds of this input
 * -@return {start: selectionStart, end: selectionEnd}
 */function getSelection$1(input){var selection=void 0;if('selectionStart'in input){// Modern browser with input or textarea.
selection={start:input.selectionStart,end:input.selectionEnd};}else{// Content editable or old IE textarea.
selection=getOffsets(input);}return selection||{start:0,end:0};}/**
 * @setSelection: Sets the selection bounds of a textarea or input and focuses
 * the input.
 * -@input     Set selection bounds of this input or textarea
 * -@offsets   Object of same form that is returned from get*
 */function setSelection(input,offsets){var start=offsets.start,end=offsets.end;if(end===undefined){end=start;}if('selectionStart'in input){input.selectionStart=start;input.selectionEnd=Math.min(end,input.value.length);}else{setOffsets(input,offsets);}}var skipSelectionChangeEvent=ExecutionEnvironment.canUseDOM&&'documentMode'in document&&document.documentMode<=11;var eventTypes$3={select:{phasedRegistrationNames:{bubbled:'onSelect',captured:'onSelectCapture'},dependencies:['topBlur','topContextMenu','topFocus','topKeyDown','topKeyUp','topMouseDown','topMouseUp','topSelectionChange']}};var activeElement$1=null;var activeElementInst$1=null;var lastSelection=null;var mouseDown=false;/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 *
 * @param {DOMElement} node
 * @return {object}
 */function getSelection(node){if('selectionStart'in node&&hasSelectionCapabilities(node)){return{start:node.selectionStart,end:node.selectionEnd};}else if(window.getSelection){var selection=window.getSelection();return{anchorNode:selection.anchorNode,anchorOffset:selection.anchorOffset,focusNode:selection.focusNode,focusOffset:selection.focusOffset};}}/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @return {?SyntheticEvent}
 */function constructSelectEvent(nativeEvent,nativeEventTarget){// Ensure we have the right element, and that the user is not dragging a
// selection (this matches native `select` event behavior). In HTML5, select
// fires only on input and textarea thus if there's no focused element we
// won't dispatch.
if(mouseDown||activeElement$1==null||activeElement$1!==getActiveElement()){return null;}// Only fire when selection has actually changed.
var currentSelection=getSelection(activeElement$1);if(!lastSelection||!shallowEqual(lastSelection,currentSelection)){lastSelection=currentSelection;var syntheticEvent=SyntheticEvent$1.getPooled(eventTypes$3.select,activeElementInst$1,nativeEvent,nativeEventTarget);syntheticEvent.type='select';syntheticEvent.target=activeElement$1;accumulateTwoPhaseDispatches(syntheticEvent);return syntheticEvent;}return null;}/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */var SelectEventPlugin={eventTypes:eventTypes$3,extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var doc=nativeEventTarget.window===nativeEventTarget?nativeEventTarget.document:nativeEventTarget.nodeType===DOCUMENT_NODE?nativeEventTarget:nativeEventTarget.ownerDocument;// Track whether all listeners exists for this plugin. If none exist, we do
// not extract events. See #3639.
if(!doc||!isListeningToAllDependencies('onSelect',doc)){return null;}var targetNode=targetInst?getNodeFromInstance$1(targetInst):window;switch(topLevelType){// Track the input node that has focus.
case'topFocus':if(isTextInputElement(targetNode)||targetNode.contentEditable==='true'){activeElement$1=targetNode;activeElementInst$1=targetInst;lastSelection=null;}break;case'topBlur':activeElement$1=null;activeElementInst$1=null;lastSelection=null;break;// Don't fire the event while the user is dragging. This matches the
// semantics of the native select event.
case'topMouseDown':mouseDown=true;break;case'topContextMenu':case'topMouseUp':mouseDown=false;return constructSelectEvent(nativeEvent,nativeEventTarget);// Chrome and IE fire non-standard event when selection is changed (and
// sometimes when it hasn't). IE's event fires out of order with respect
// to key and input events on deletion, so we discard it.
//
// Firefox doesn't support selectionchange, so check selection status
// after each key entry. The selection changes after keydown and before
// keyup, but we check on keydown as well in the case of holding down a
// key, when multiple keydown events are fired but only one keyup is.
// This is also our approach for IE handling, for the reason above.
case'topSelectionChange':if(skipSelectionChangeEvent){break;}// falls through
case'topKeyDown':case'topKeyUp':return constructSelectEvent(nativeEvent,nativeEventTarget);}return null;}};/**
 * @interface Event
 * @see http://www.w3.org/TR/css3-animations/#AnimationEvent-interface
 * @see https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent
 */var AnimationEventInterface={animationName:null,elapsedTime:null,pseudoElement:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */function SyntheticAnimationEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticEvent$1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticEvent$1.augmentClass(SyntheticAnimationEvent,AnimationEventInterface);/**
 * @interface Event
 * @see http://www.w3.org/TR/clipboard-apis/
 */var ClipboardEventInterface={clipboardData:function clipboardData(event){return'clipboardData'in event?event.clipboardData:window.clipboardData;}};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */function SyntheticClipboardEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticEvent$1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticEvent$1.augmentClass(SyntheticClipboardEvent,ClipboardEventInterface);/**
 * @interface FocusEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var FocusEventInterface={relatedTarget:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticFocusEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticUIEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticUIEvent.augmentClass(SyntheticFocusEvent,FocusEventInterface);/**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */function getEventCharCode(nativeEvent){var charCode;var keyCode=nativeEvent.keyCode;if('charCode'in nativeEvent){charCode=nativeEvent.charCode;// FF does not set `charCode` for the Enter-key, check against `keyCode`.
if(charCode===0&&keyCode===13){charCode=13;}}else{// IE8 does not implement `charCode`, but `keyCode` has the correct value.
charCode=keyCode;}// Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
// Must not discard the (non-)printable Enter-key.
if(charCode>=32||charCode===13){return charCode;}return 0;}/**
 * Normalization of deprecated HTML5 `key` values
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */var normalizeKey={Esc:'Escape',Spacebar:' ',Left:'ArrowLeft',Up:'ArrowUp',Right:'ArrowRight',Down:'ArrowDown',Del:'Delete',Win:'OS',Menu:'ContextMenu',Apps:'ContextMenu',Scroll:'ScrollLock',MozPrintableKey:'Unidentified'};/**
 * Translation from legacy `keyCode` to HTML5 `key`
 * Only special keys supported, all others depend on keyboard layout or browser
 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
 */var translateToKey={'8':'Backspace','9':'Tab','12':'Clear','13':'Enter','16':'Shift','17':'Control','18':'Alt','19':'Pause','20':'CapsLock','27':'Escape','32':' ','33':'PageUp','34':'PageDown','35':'End','36':'Home','37':'ArrowLeft','38':'ArrowUp','39':'ArrowRight','40':'ArrowDown','45':'Insert','46':'Delete','112':'F1','113':'F2','114':'F3','115':'F4','116':'F5','117':'F6','118':'F7','119':'F8','120':'F9','121':'F10','122':'F11','123':'F12','144':'NumLock','145':'ScrollLock','224':'Meta'};/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */function getEventKey(nativeEvent){if(nativeEvent.key){// Normalize inconsistent values reported by browsers due to
// implementations of a working draft specification.
// FireFox implements `key` but returns `MozPrintableKey` for all
// printable characters (normalized to `Unidentified`), ignore it.
var key=normalizeKey[nativeEvent.key]||nativeEvent.key;if(key!=='Unidentified'){return key;}}// Browser does not implement `key`, polyfill as much of it as we can.
if(nativeEvent.type==='keypress'){var charCode=getEventCharCode(nativeEvent);// The enter-key is technically both printable and non-printable and can
// thus be captured by `keypress`, no other non-printable key should.
return charCode===13?'Enter':String.fromCharCode(charCode);}if(nativeEvent.type==='keydown'||nativeEvent.type==='keyup'){// While user keyboard layout determines the actual meaning of each
// `keyCode` value, almost all function keys have a universal value.
return translateToKey[nativeEvent.keyCode]||'Unidentified';}return'';}/**
 * @interface KeyboardEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var KeyboardEventInterface={key:getEventKey,location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:getEventModifierState,// Legacy Interface
charCode:function charCode(event){// `charCode` is the result of a KeyPress event and represents the value of
// the actual printable character.
// KeyPress is deprecated, but its replacement is not yet final and not
// implemented in any major browser. Only KeyPress has charCode.
if(event.type==='keypress'){return getEventCharCode(event);}return 0;},keyCode:function keyCode(event){// `keyCode` is the result of a KeyDown/Up event and represents the value of
// physical keyboard key.
// The actual meaning of the value depends on the users' keyboard layout
// which cannot be detected. Assuming that it is a US keyboard layout
// provides a surprisingly accurate mapping for US and European users.
// Due to this, it is left to the user to implement at this time.
if(event.type==='keydown'||event.type==='keyup'){return event.keyCode;}return 0;},which:function which(event){// `which` is an alias for either `keyCode` or `charCode` depending on the
// type of the event.
if(event.type==='keypress'){return getEventCharCode(event);}if(event.type==='keydown'||event.type==='keyup'){return event.keyCode;}return 0;}};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticKeyboardEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticUIEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent,KeyboardEventInterface);/**
 * @interface DragEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var DragEventInterface={dataTransfer:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */function SyntheticDragEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticMouseEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticMouseEvent.augmentClass(SyntheticDragEvent,DragEventInterface);/**
 * @interface TouchEvent
 * @see http://www.w3.org/TR/touch-events/
 */var TouchEventInterface={touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:getEventModifierState};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticUIEvent}
 */function SyntheticTouchEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticUIEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticUIEvent.augmentClass(SyntheticTouchEvent,TouchEventInterface);/**
 * @interface Event
 * @see http://www.w3.org/TR/2009/WD-css3-transitions-20090320/#transition-events-
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent
 */var TransitionEventInterface={propertyName:null,elapsedTime:null,pseudoElement:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */function SyntheticTransitionEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticEvent$1.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticEvent$1.augmentClass(SyntheticTransitionEvent,TransitionEventInterface);/**
 * @interface WheelEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var WheelEventInterface={deltaX:function deltaX(event){return'deltaX'in event?event.deltaX:// Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
'wheelDeltaX'in event?-event.wheelDeltaX:0;},deltaY:function deltaY(event){return'deltaY'in event?event.deltaY:// Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
'wheelDeltaY'in event?-event.wheelDeltaY:// Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
'wheelDelta'in event?-event.wheelDelta:0;},deltaZ:null,// Browsers without "deltaMode" is reporting in raw wheel delta where one
// notch on the scroll is always +/- 120, roughly equivalent to pixels.
// A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
// ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
deltaMode:null};/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticMouseEvent}
 */function SyntheticWheelEvent(dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget){return SyntheticMouseEvent.call(this,dispatchConfig,dispatchMarker,nativeEvent,nativeEventTarget);}SyntheticMouseEvent.augmentClass(SyntheticWheelEvent,WheelEventInterface);/**
 * Turns
 * ['abort', ...]
 * into
 * eventTypes = {
 *   'abort': {
 *     phasedRegistrationNames: {
 *       bubbled: 'onAbort',
 *       captured: 'onAbortCapture',
 *     },
 *     dependencies: ['topAbort'],
 *   },
 *   ...
 * };
 * topLevelEventsToDispatchConfig = {
 *   'topAbort': { sameConfig }
 * };
 */var eventTypes$4={};var topLevelEventsToDispatchConfig={};['abort','animationEnd','animationIteration','animationStart','blur','cancel','canPlay','canPlayThrough','click','close','contextMenu','copy','cut','doubleClick','drag','dragEnd','dragEnter','dragExit','dragLeave','dragOver','dragStart','drop','durationChange','emptied','encrypted','ended','error','focus','input','invalid','keyDown','keyPress','keyUp','load','loadedData','loadedMetadata','loadStart','mouseDown','mouseMove','mouseOut','mouseOver','mouseUp','paste','pause','play','playing','progress','rateChange','reset','scroll','seeked','seeking','stalled','submit','suspend','timeUpdate','toggle','touchCancel','touchEnd','touchMove','touchStart','transitionEnd','volumeChange','waiting','wheel'].forEach(function(event){var capitalizedEvent=event[0].toUpperCase()+event.slice(1);var onEvent='on'+capitalizedEvent;var topEvent='top'+capitalizedEvent;var type={phasedRegistrationNames:{bubbled:onEvent,captured:onEvent+'Capture'},dependencies:[topEvent]};eventTypes$4[event]=type;topLevelEventsToDispatchConfig[topEvent]=type;});// Only used in DEV for exhaustiveness validation.
var knownHTMLTopLevelTypes=['topAbort','topCancel','topCanPlay','topCanPlayThrough','topClose','topDurationChange','topEmptied','topEncrypted','topEnded','topError','topInput','topInvalid','topLoad','topLoadedData','topLoadedMetadata','topLoadStart','topPause','topPlay','topPlaying','topProgress','topRateChange','topReset','topSeeked','topSeeking','topStalled','topSubmit','topSuspend','topTimeUpdate','topToggle','topVolumeChange','topWaiting'];var SimpleEventPlugin={eventTypes:eventTypes$4,extractEvents:function extractEvents(topLevelType,targetInst,nativeEvent,nativeEventTarget){var dispatchConfig=topLevelEventsToDispatchConfig[topLevelType];if(!dispatchConfig){return null;}var EventConstructor;switch(topLevelType){case'topKeyPress':// Firefox creates a keypress event for function keys too. This removes
// the unwanted keypress events. Enter is however both printable and
// non-printable. One would expect Tab to be as well (but it isn't).
if(getEventCharCode(nativeEvent)===0){return null;}/* falls through */case'topKeyDown':case'topKeyUp':EventConstructor=SyntheticKeyboardEvent;break;case'topBlur':case'topFocus':EventConstructor=SyntheticFocusEvent;break;case'topClick':// Firefox creates a click event on right mouse clicks. This removes the
// unwanted click events.
if(nativeEvent.button===2){return null;}/* falls through */case'topDoubleClick':case'topMouseDown':case'topMouseMove':case'topMouseUp':// TODO: Disabled elements should not respond to mouse events
/* falls through */case'topMouseOut':case'topMouseOver':case'topContextMenu':EventConstructor=SyntheticMouseEvent;break;case'topDrag':case'topDragEnd':case'topDragEnter':case'topDragExit':case'topDragLeave':case'topDragOver':case'topDragStart':case'topDrop':EventConstructor=SyntheticDragEvent;break;case'topTouchCancel':case'topTouchEnd':case'topTouchMove':case'topTouchStart':EventConstructor=SyntheticTouchEvent;break;case'topAnimationEnd':case'topAnimationIteration':case'topAnimationStart':EventConstructor=SyntheticAnimationEvent;break;case'topTransitionEnd':EventConstructor=SyntheticTransitionEvent;break;case'topScroll':EventConstructor=SyntheticUIEvent;break;case'topWheel':EventConstructor=SyntheticWheelEvent;break;case'topCopy':case'topCut':case'topPaste':EventConstructor=SyntheticClipboardEvent;break;default:{if(knownHTMLTopLevelTypes.indexOf(topLevelType)===-1){warning(false,'SimpleEventPlugin: Unhandled event type, `%s`. This warning '+'is likely caused by a bug in React. Please file an issue.',topLevelType);}}// HTML Events
// @see http://www.w3.org/TR/html5/index.html#events-0
EventConstructor=SyntheticEvent$1;break;}var event=EventConstructor.getPooled(dispatchConfig,targetInst,nativeEvent,nativeEventTarget);accumulateTwoPhaseDispatches(event);return event;}};setHandleTopLevel(handleTopLevel);/**
 * Inject modules for resolving DOM hierarchy and plugin ordering.
 */injection$1.injectEventPluginOrder(DOMEventPluginOrder);injection$2.injectComponentTree(ReactDOMComponentTree);/**
 * Some important event plugins included by default (without having to require
 * them).
 */injection$1.injectEventPluginsByName({SimpleEventPlugin:SimpleEventPlugin,EnterLeaveEventPlugin:EnterLeaveEventPlugin,ChangeEventPlugin:ChangeEventPlugin,SelectEventPlugin:SelectEventPlugin,BeforeInputEventPlugin:BeforeInputEventPlugin});var enableAsyncSubtreeAPI=true;var enableAsyncSchedulingByDefaultInReactDOM=false;// Exports ReactDOM.createRoot
var enableCreateRoot=false;var enableUserTimingAPI=true;// Mutating mode (React DOM, React ART, React Native):
var enableMutatingReconciler=true;// Experimental noop mode (currently unused):
var enableNoopReconciler=false;// Experimental persistent mode (CS):
var enablePersistentReconciler=false;// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:
var debugRenderPhaseSideEffects=false;// Only used in www builds.
var valueStack=[];{var fiberStack=[];}var index=-1;function createCursor(defaultValue){return{current:defaultValue};}function pop(cursor,fiber){if(index<0){{warning(false,'Unexpected pop.');}return;}{if(fiber!==fiberStack[index]){warning(false,'Unexpected Fiber popped.');}}cursor.current=valueStack[index];valueStack[index]=null;{fiberStack[index]=null;}index--;}function push(cursor,value,fiber){index++;valueStack[index]=cursor.current;{fiberStack[index]=fiber;}cursor.current=value;}function reset$1(){while(index>-1){valueStack[index]=null;{fiberStack[index]=null;}index--;}}var describeComponentFrame=function describeComponentFrame(name,source,ownerName){return'\n    in '+(name||'Unknown')+(source?' (at '+source.fileName.replace(/^.*[\\\/]/,'')+':'+source.lineNumber+')':ownerName?' (created by '+ownerName+')':'');};function describeFiber(fiber){switch(fiber.tag){case IndeterminateComponent:case FunctionalComponent:case ClassComponent:case HostComponent:var owner=fiber._debugOwner;var source=fiber._debugSource;var name=getComponentName(fiber);var ownerName=null;if(owner){ownerName=getComponentName(owner);}return describeComponentFrame(name,source,ownerName);default:return'';}}// This function can only be called with a work-in-progress fiber and
// only during begin or complete phase. Do not call it under any other
// circumstances.
function getStackAddendumByWorkInProgressFiber(workInProgress){var info='';var node=workInProgress;do{info+=describeFiber(node);// Otherwise this return pointer might point to the wrong tree:
node=node['return'];}while(node);return info;}function getCurrentFiberOwnerName(){{var fiber=ReactDebugCurrentFiber.current;if(fiber===null){return null;}var owner=fiber._debugOwner;if(owner!==null&&typeof owner!=='undefined'){return getComponentName(owner);}}return null;}function getCurrentFiberStackAddendum(){{var fiber=ReactDebugCurrentFiber.current;if(fiber===null){return null;}// Safe because if current fiber exists, we are reconciling,
// and it is guaranteed to be the work-in-progress version.
return getStackAddendumByWorkInProgressFiber(fiber);}return null;}function resetCurrentFiber(){ReactDebugCurrentFrame.getCurrentStack=null;ReactDebugCurrentFiber.current=null;ReactDebugCurrentFiber.phase=null;}function setCurrentFiber(fiber){ReactDebugCurrentFrame.getCurrentStack=getCurrentFiberStackAddendum;ReactDebugCurrentFiber.current=fiber;ReactDebugCurrentFiber.phase=null;}function setCurrentPhase(phase){ReactDebugCurrentFiber.phase=phase;}var ReactDebugCurrentFiber={current:null,phase:null,resetCurrentFiber:resetCurrentFiber,setCurrentFiber:setCurrentFiber,setCurrentPhase:setCurrentPhase,getCurrentFiberOwnerName:getCurrentFiberOwnerName,getCurrentFiberStackAddendum:getCurrentFiberStackAddendum};// Prefix measurements so that it's possible to filter them.
// Longer prefixes are hard to read in DevTools.
var reactEmoji='\u269B';var warningEmoji='\u26D4';var supportsUserTiming=typeof performance!=='undefined'&&typeof performance.mark==='function'&&typeof performance.clearMarks==='function'&&typeof performance.measure==='function'&&typeof performance.clearMeasures==='function';// Keep track of current fiber so that we know the path to unwind on pause.
// TODO: this looks the same as nextUnitOfWork in scheduler. Can we unify them?
var currentFiber=null;// If we're in the middle of user code, which fiber and method is it?
// Reusing `currentFiber` would be confusing for this because user code fiber
// can change during commit phase too, but we don't need to unwind it (since
// lifecycles in the commit phase don't resemble a tree).
var currentPhase=null;var currentPhaseFiber=null;// Did lifecycle hook schedule an update? This is often a performance problem,
// so we will keep track of it, and include it in the report.
// Track commits caused by cascading updates.
var isCommitting=false;var hasScheduledUpdateInCurrentCommit=false;var hasScheduledUpdateInCurrentPhase=false;var commitCountInCurrentWorkLoop=0;var effectCountInCurrentCommit=0;var isWaitingForCallback=false;// During commits, we only show a measurement once per method name
// to avoid stretch the commit phase with measurement overhead.
var labelsInCurrentCommit=new Set();var formatMarkName=function formatMarkName(markName){return reactEmoji+' '+markName;};var formatLabel=function formatLabel(label,warning$$1){var prefix=warning$$1?warningEmoji+' ':reactEmoji+' ';var suffix=warning$$1?' Warning: '+warning$$1:'';return''+prefix+label+suffix;};var beginMark=function beginMark(markName){performance.mark(formatMarkName(markName));};var clearMark=function clearMark(markName){performance.clearMarks(formatMarkName(markName));};var endMark=function endMark(label,markName,warning$$1){var formattedMarkName=formatMarkName(markName);var formattedLabel=formatLabel(label,warning$$1);try{performance.measure(formattedLabel,formattedMarkName);}catch(err){}// If previous mark was missing for some reason, this will throw.
// This could only happen if React crashed in an unexpected place earlier.
// Don't pile on with more errors.
// Clear marks immediately to avoid growing buffer.
performance.clearMarks(formattedMarkName);performance.clearMeasures(formattedLabel);};var getFiberMarkName=function getFiberMarkName(label,debugID){return label+' (#'+debugID+')';};var getFiberLabel=function getFiberLabel(componentName,isMounted,phase){if(phase===null){// These are composite component total time measurements.
return componentName+' ['+(isMounted?'update':'mount')+']';}else{// Composite component methods.
return componentName+'.'+phase;}};var beginFiberMark=function beginFiberMark(fiber,phase){var componentName=getComponentName(fiber)||'Unknown';var debugID=fiber._debugID;var isMounted=fiber.alternate!==null;var label=getFiberLabel(componentName,isMounted,phase);if(isCommitting&&labelsInCurrentCommit.has(label)){// During the commit phase, we don't show duplicate labels because
// there is a fixed overhead for every measurement, and we don't
// want to stretch the commit phase beyond necessary.
return false;}labelsInCurrentCommit.add(label);var markName=getFiberMarkName(label,debugID);beginMark(markName);return true;};var clearFiberMark=function clearFiberMark(fiber,phase){var componentName=getComponentName(fiber)||'Unknown';var debugID=fiber._debugID;var isMounted=fiber.alternate!==null;var label=getFiberLabel(componentName,isMounted,phase);var markName=getFiberMarkName(label,debugID);clearMark(markName);};var endFiberMark=function endFiberMark(fiber,phase,warning$$1){var componentName=getComponentName(fiber)||'Unknown';var debugID=fiber._debugID;var isMounted=fiber.alternate!==null;var label=getFiberLabel(componentName,isMounted,phase);var markName=getFiberMarkName(label,debugID);endMark(label,markName,warning$$1);};var shouldIgnoreFiber=function shouldIgnoreFiber(fiber){// Host components should be skipped in the timeline.
// We could check typeof fiber.type, but does this work with RN?
switch(fiber.tag){case HostRoot:case HostComponent:case HostText:case HostPortal:case ReturnComponent:case Fragment:return true;default:return false;}};var clearPendingPhaseMeasurement=function clearPendingPhaseMeasurement(){if(currentPhase!==null&&currentPhaseFiber!==null){clearFiberMark(currentPhaseFiber,currentPhase);}currentPhaseFiber=null;currentPhase=null;hasScheduledUpdateInCurrentPhase=false;};var pauseTimers=function pauseTimers(){// Stops all currently active measurements so that they can be resumed
// if we continue in a later deferred loop from the same unit of work.
var fiber=currentFiber;while(fiber){if(fiber._debugIsCurrentlyTiming){endFiberMark(fiber,null,null);}fiber=fiber['return'];}};var resumeTimersRecursively=function resumeTimersRecursively(fiber){if(fiber['return']!==null){resumeTimersRecursively(fiber['return']);}if(fiber._debugIsCurrentlyTiming){beginFiberMark(fiber,null);}};var resumeTimers=function resumeTimers(){// Resumes all measurements that were active during the last deferred loop.
if(currentFiber!==null){resumeTimersRecursively(currentFiber);}};function recordEffect(){if(enableUserTimingAPI){effectCountInCurrentCommit++;}}function recordScheduleUpdate(){if(enableUserTimingAPI){if(isCommitting){hasScheduledUpdateInCurrentCommit=true;}if(currentPhase!==null&&currentPhase!=='componentWillMount'&&currentPhase!=='componentWillReceiveProps'){hasScheduledUpdateInCurrentPhase=true;}}}function startRequestCallbackTimer(){if(enableUserTimingAPI){if(supportsUserTiming&&!isWaitingForCallback){isWaitingForCallback=true;beginMark('(Waiting for async callback...)');}}}function stopRequestCallbackTimer(didExpire){if(enableUserTimingAPI){if(supportsUserTiming){isWaitingForCallback=false;var warning$$1=didExpire?'React was blocked by main thread':null;endMark('(Waiting for async callback...)','(Waiting for async callback...)',warning$$1);}}}function startWorkTimer(fiber){if(enableUserTimingAPI){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// If we pause, this is the fiber to unwind from.
currentFiber=fiber;if(!beginFiberMark(fiber,null)){return;}fiber._debugIsCurrentlyTiming=true;}}function cancelWorkTimer(fiber){if(enableUserTimingAPI){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// Remember we shouldn't complete measurement for this fiber.
// Otherwise flamechart will be deep even for small updates.
fiber._debugIsCurrentlyTiming=false;clearFiberMark(fiber,null);}}function stopWorkTimer(fiber){if(enableUserTimingAPI){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// If we pause, its parent is the fiber to unwind from.
currentFiber=fiber['return'];if(!fiber._debugIsCurrentlyTiming){return;}fiber._debugIsCurrentlyTiming=false;endFiberMark(fiber,null,null);}}function stopFailedWorkTimer(fiber){if(enableUserTimingAPI){if(!supportsUserTiming||shouldIgnoreFiber(fiber)){return;}// If we pause, its parent is the fiber to unwind from.
currentFiber=fiber['return'];if(!fiber._debugIsCurrentlyTiming){return;}fiber._debugIsCurrentlyTiming=false;var warning$$1='An error was thrown inside this error boundary';endFiberMark(fiber,null,warning$$1);}}function startPhaseTimer(fiber,phase){if(enableUserTimingAPI){if(!supportsUserTiming){return;}clearPendingPhaseMeasurement();if(!beginFiberMark(fiber,phase)){return;}currentPhaseFiber=fiber;currentPhase=phase;}}function stopPhaseTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}if(currentPhase!==null&&currentPhaseFiber!==null){var warning$$1=hasScheduledUpdateInCurrentPhase?'Scheduled a cascading update':null;endFiberMark(currentPhaseFiber,currentPhase,warning$$1);}currentPhase=null;currentPhaseFiber=null;}}function startWorkLoopTimer(nextUnitOfWork){if(enableUserTimingAPI){currentFiber=nextUnitOfWork;if(!supportsUserTiming){return;}commitCountInCurrentWorkLoop=0;// This is top level call.
// Any other measurements are performed within.
beginMark('(React Tree Reconciliation)');// Resume any measurements that were in progress during the last loop.
resumeTimers();}}function stopWorkLoopTimer(interruptedBy){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var warning$$1=null;if(interruptedBy!==null){if(interruptedBy.tag===HostRoot){warning$$1='A top-level update interrupted the previous render';}else{var componentName=getComponentName(interruptedBy)||'Unknown';warning$$1='An update to '+componentName+' interrupted the previous render';}}else if(commitCountInCurrentWorkLoop>1){warning$$1='There were cascading updates';}commitCountInCurrentWorkLoop=0;// Pause any measurements until the next loop.
pauseTimers();endMark('(React Tree Reconciliation)','(React Tree Reconciliation)',warning$$1);}}function startCommitTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}isCommitting=true;hasScheduledUpdateInCurrentCommit=false;labelsInCurrentCommit.clear();beginMark('(Committing Changes)');}}function stopCommitTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var warning$$1=null;if(hasScheduledUpdateInCurrentCommit){warning$$1='Lifecycle hook scheduled a cascading update';}else if(commitCountInCurrentWorkLoop>0){warning$$1='Caused by a cascading update in earlier commit';}hasScheduledUpdateInCurrentCommit=false;commitCountInCurrentWorkLoop++;isCommitting=false;labelsInCurrentCommit.clear();endMark('(Committing Changes)','(Committing Changes)',warning$$1);}}function startCommitHostEffectsTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}effectCountInCurrentCommit=0;beginMark('(Committing Host Effects)');}}function stopCommitHostEffectsTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var count=effectCountInCurrentCommit;effectCountInCurrentCommit=0;endMark('(Committing Host Effects: '+count+' Total)','(Committing Host Effects)',null);}}function startCommitLifeCyclesTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}effectCountInCurrentCommit=0;beginMark('(Calling Lifecycle Methods)');}}function stopCommitLifeCyclesTimer(){if(enableUserTimingAPI){if(!supportsUserTiming){return;}var count=effectCountInCurrentCommit;effectCountInCurrentCommit=0;endMark('(Calling Lifecycle Methods: '+count+' Total)','(Calling Lifecycle Methods)',null);}}{var warnedAboutMissingGetChildContext={};}// A cursor to the current merged context object on the stack.
var contextStackCursor=createCursor(emptyObject);// A cursor to a boolean indicating whether the context has changed.
var didPerformWorkStackCursor=createCursor(false);// Keep track of the previous context object that was on the stack.
// We use this to get access to the parent context after we have already
// pushed the next context provider, and now need to merge their contexts.
var previousContext=emptyObject;function getUnmaskedContext(workInProgress){var hasOwnContext=isContextProvider(workInProgress);if(hasOwnContext){// If the fiber is a context provider itself, when we read its context
// we have already pushed its own child context on the stack. A context
// provider should not "see" its own child context. Therefore we read the
// previous (parent) context instead for a context provider.
return previousContext;}return contextStackCursor.current;}function cacheContext(workInProgress,unmaskedContext,maskedContext){var instance=workInProgress.stateNode;instance.__reactInternalMemoizedUnmaskedChildContext=unmaskedContext;instance.__reactInternalMemoizedMaskedChildContext=maskedContext;}function getMaskedContext(workInProgress,unmaskedContext){var type=workInProgress.type;var contextTypes=type.contextTypes;if(!contextTypes){return emptyObject;}// Avoid recreating masked context unless unmasked context has changed.
// Failing to do this will result in unnecessary calls to componentWillReceiveProps.
// This may trigger infinite loops if componentWillReceiveProps calls setState.
var instance=workInProgress.stateNode;if(instance&&instance.__reactInternalMemoizedUnmaskedChildContext===unmaskedContext){return instance.__reactInternalMemoizedMaskedChildContext;}var context={};for(var key in contextTypes){context[key]=unmaskedContext[key];}{var name=getComponentName(workInProgress)||'Unknown';checkPropTypes(contextTypes,context,'context',name,ReactDebugCurrentFiber.getCurrentFiberStackAddendum);}// Cache unmasked context so we can avoid recreating masked context unless necessary.
// Context is created before the class component is instantiated so check for instance.
if(instance){cacheContext(workInProgress,unmaskedContext,context);}return context;}function hasContextChanged(){return didPerformWorkStackCursor.current;}function isContextConsumer(fiber){return fiber.tag===ClassComponent&&fiber.type.contextTypes!=null;}function isContextProvider(fiber){return fiber.tag===ClassComponent&&fiber.type.childContextTypes!=null;}function popContextProvider(fiber){if(!isContextProvider(fiber)){return;}pop(didPerformWorkStackCursor,fiber);pop(contextStackCursor,fiber);}function popTopLevelContextObject(fiber){pop(didPerformWorkStackCursor,fiber);pop(contextStackCursor,fiber);}function pushTopLevelContextObject(fiber,context,didChange){!(contextStackCursor.cursor==null)?invariant(false,'Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.'):void 0;push(contextStackCursor,context,fiber);push(didPerformWorkStackCursor,didChange,fiber);}function processChildContext(fiber,parentContext){var instance=fiber.stateNode;var childContextTypes=fiber.type.childContextTypes;// TODO (bvaughn) Replace this behavior with an invariant() in the future.
// It has only been added in Fiber to match the (unintentional) behavior in Stack.
if(typeof instance.getChildContext!=='function'){{var componentName=getComponentName(fiber)||'Unknown';if(!warnedAboutMissingGetChildContext[componentName]){warnedAboutMissingGetChildContext[componentName]=true;warning(false,'%s.childContextTypes is specified but there is no getChildContext() method '+'on the instance. You can either define getChildContext() on %s or remove '+'childContextTypes from it.',componentName,componentName);}}return parentContext;}var childContext=void 0;{ReactDebugCurrentFiber.setCurrentPhase('getChildContext');}startPhaseTimer(fiber,'getChildContext');childContext=instance.getChildContext();stopPhaseTimer();{ReactDebugCurrentFiber.setCurrentPhase(null);}for(var contextKey in childContext){!(contextKey in childContextTypes)?invariant(false,'%s.getChildContext(): key "%s" is not defined in childContextTypes.',getComponentName(fiber)||'Unknown',contextKey):void 0;}{var name=getComponentName(fiber)||'Unknown';checkPropTypes(childContextTypes,childContext,'child context',name,// In practice, there is one case in which we won't get a stack. It's when
// somebody calls unstable_renderSubtreeIntoContainer() and we process
// context from the parent component instance. The stack will be missing
// because it's outside of the reconciliation, and so the pointer has not
// been set. This is rare and doesn't matter. We'll also remove that API.
ReactDebugCurrentFiber.getCurrentFiberStackAddendum);}return _assign({},parentContext,childContext);}function pushContextProvider(workInProgress){if(!isContextProvider(workInProgress)){return false;}var instance=workInProgress.stateNode;// We push the context as early as possible to ensure stack integrity.
// If the instance does not exist yet, we will push null at first,
// and replace it on the stack later when invalidating the context.
var memoizedMergedChildContext=instance&&instance.__reactInternalMemoizedMergedChildContext||emptyObject;// Remember the parent context so we can merge with it later.
// Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
previousContext=contextStackCursor.current;push(contextStackCursor,memoizedMergedChildContext,workInProgress);push(didPerformWorkStackCursor,didPerformWorkStackCursor.current,workInProgress);return true;}function invalidateContextProvider(workInProgress,didChange){var instance=workInProgress.stateNode;!instance?invariant(false,'Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.'):void 0;if(didChange){// Merge parent and own context.
// Skip this if we're not updating due to sCU.
// This avoids unnecessarily recomputing memoized values.
var mergedContext=processChildContext(workInProgress,previousContext);instance.__reactInternalMemoizedMergedChildContext=mergedContext;// Replace the old (or empty) context with the new one.
// It is important to unwind the context in the reverse order.
pop(didPerformWorkStackCursor,workInProgress);pop(contextStackCursor,workInProgress);// Now push the new context and mark that it has changed.
push(contextStackCursor,mergedContext,workInProgress);push(didPerformWorkStackCursor,didChange,workInProgress);}else{pop(didPerformWorkStackCursor,workInProgress);push(didPerformWorkStackCursor,didChange,workInProgress);}}function resetContext(){previousContext=emptyObject;contextStackCursor.current=emptyObject;didPerformWorkStackCursor.current=false;}function findCurrentUnmaskedContext(fiber){// Currently this is only used with renderSubtreeIntoContainer; not sure if it
// makes sense elsewhere
!(isFiberMounted(fiber)&&fiber.tag===ClassComponent)?invariant(false,'Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.'):void 0;var node=fiber;while(node.tag!==HostRoot){if(isContextProvider(node)){return node.stateNode.__reactInternalMemoizedMergedChildContext;}var parent=node['return'];!parent?invariant(false,'Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.'):void 0;node=parent;}return node.stateNode.context;}var NoWork=0;// TODO: Use an opaque type once ESLint et al support the syntax
var Sync=1;var Never=2147483647;// Max int32: Math.pow(2, 31) - 1
var UNIT_SIZE=10;var MAGIC_NUMBER_OFFSET=2;// 1 unit of expiration time represents 10ms.
function msToExpirationTime(ms){// Always add an offset so that we don't clash with the magic number for NoWork.
return(ms/UNIT_SIZE|0)+MAGIC_NUMBER_OFFSET;}function expirationTimeToMs(expirationTime){return(expirationTime-MAGIC_NUMBER_OFFSET)*UNIT_SIZE;}function ceiling(num,precision){return((num/precision|0)+1)*precision;}function computeExpirationBucket(currentTime,expirationInMs,bucketSizeMs){return ceiling(currentTime+expirationInMs/UNIT_SIZE,bucketSizeMs/UNIT_SIZE);}var NoContext=0;var AsyncUpdates=1;{var hasBadMapPolyfill=false;try{var nonExtensibleObject=Object.preventExtensions({});/* eslint-disable no-new *//* eslint-enable no-new */}catch(e){// TODO: Consider warning about bad polyfills
hasBadMapPolyfill=true;}}// A Fiber is work on a Component that needs to be done or was done. There can
// be more than one per component.
{var debugCounter=1;}function FiberNode(tag,key,internalContextTag){// Instance
this.tag=tag;this.key=key;this.type=null;this.stateNode=null;// Fiber
this['return']=null;this.child=null;this.sibling=null;this.index=0;this.ref=null;this.pendingProps=null;this.memoizedProps=null;this.updateQueue=null;this.memoizedState=null;this.internalContextTag=internalContextTag;// Effects
this.effectTag=NoEffect;this.nextEffect=null;this.firstEffect=null;this.lastEffect=null;this.expirationTime=NoWork;this.alternate=null;{this._debugID=debugCounter++;this._debugSource=null;this._debugOwner=null;this._debugIsCurrentlyTiming=false;if(!hasBadMapPolyfill&&typeof Object.preventExtensions==='function'){Object.preventExtensions(this);}}}// This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
var createFiber=function createFiber(tag,key,internalContextTag){// $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
return new FiberNode(tag,key,internalContextTag);};function shouldConstruct(Component){return!!(Component.prototype&&Component.prototype.isReactComponent);}// This is used to create an alternate fiber to do work on.
function createWorkInProgress(current,pendingProps,expirationTime){var workInProgress=current.alternate;if(workInProgress===null){// We use a double buffering pooling technique because we know that we'll
// only ever need at most two versions of a tree. We pool the "other" unused
// node that we're free to reuse. This is lazily created to avoid allocating
// extra objects for things that are never updated. It also allow us to
// reclaim the extra memory if needed.
workInProgress=createFiber(current.tag,current.key,current.internalContextTag);workInProgress.type=current.type;workInProgress.stateNode=current.stateNode;{// DEV-only fields
workInProgress._debugID=current._debugID;workInProgress._debugSource=current._debugSource;workInProgress._debugOwner=current._debugOwner;}workInProgress.alternate=current;current.alternate=workInProgress;}else{// We already have an alternate.
// Reset the effect tag.
workInProgress.effectTag=NoEffect;// The effect list is no longer valid.
workInProgress.nextEffect=null;workInProgress.firstEffect=null;workInProgress.lastEffect=null;}workInProgress.expirationTime=expirationTime;workInProgress.pendingProps=pendingProps;workInProgress.child=current.child;workInProgress.memoizedProps=current.memoizedProps;workInProgress.memoizedState=current.memoizedState;workInProgress.updateQueue=current.updateQueue;// These will be overridden during the parent's reconciliation
workInProgress.sibling=current.sibling;workInProgress.index=current.index;workInProgress.ref=current.ref;return workInProgress;}function createHostRootFiber(){var fiber=createFiber(HostRoot,null,NoContext);return fiber;}function createFiberFromElement(element,internalContextTag,expirationTime){var owner=null;{owner=element._owner;}var fiber=void 0;var type=element.type,key=element.key;if(typeof type==='function'){fiber=shouldConstruct(type)?createFiber(ClassComponent,key,internalContextTag):createFiber(IndeterminateComponent,key,internalContextTag);fiber.type=type;fiber.pendingProps=element.props;}else if(typeof type==='string'){fiber=createFiber(HostComponent,key,internalContextTag);fiber.type=type;fiber.pendingProps=element.props;}else if((typeof type==='undefined'?'undefined':_typeof(type))==='object'&&type!==null&&typeof type.tag==='number'){// Currently assumed to be a continuation and therefore is a fiber already.
// TODO: The yield system is currently broken for updates in some cases.
// The reified yield stores a fiber, but we don't know which fiber that is;
// the current or a workInProgress? When the continuation gets rendered here
// we don't know if we can reuse that fiber or if we need to clone it.
// There is probably a clever way to restructure this.
fiber=type;fiber.pendingProps=element.props;}else{var info='';{if(type===undefined||(typeof type==='undefined'?'undefined':_typeof(type))==='object'&&type!==null&&Object.keys(type).length===0){info+=' You likely forgot to export your component from the file '+"it's defined in, or you might have mixed up default and named imports.";}var ownerName=owner?getComponentName(owner):null;if(ownerName){info+='\n\nCheck the render method of `'+ownerName+'`.';}}invariant(false,'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s',type==null?type:typeof type==='undefined'?'undefined':_typeof(type),info);}{fiber._debugSource=element._source;fiber._debugOwner=element._owner;}fiber.expirationTime=expirationTime;return fiber;}function createFiberFromFragment(elements,internalContextTag,expirationTime,key){var fiber=createFiber(Fragment,key,internalContextTag);fiber.pendingProps=elements;fiber.expirationTime=expirationTime;return fiber;}function createFiberFromText(content,internalContextTag,expirationTime){var fiber=createFiber(HostText,null,internalContextTag);fiber.pendingProps=content;fiber.expirationTime=expirationTime;return fiber;}function createFiberFromHostInstanceForDeletion(){var fiber=createFiber(HostComponent,null,NoContext);fiber.type='DELETED';return fiber;}function createFiberFromCall(call,internalContextTag,expirationTime){var fiber=createFiber(CallComponent,call.key,internalContextTag);fiber.type=call.handler;fiber.pendingProps=call;fiber.expirationTime=expirationTime;return fiber;}function createFiberFromReturn(returnNode,internalContextTag,expirationTime){var fiber=createFiber(ReturnComponent,null,internalContextTag);fiber.expirationTime=expirationTime;return fiber;}function createFiberFromPortal(portal,internalContextTag,expirationTime){var fiber=createFiber(HostPortal,portal.key,internalContextTag);fiber.pendingProps=portal.children||[];fiber.expirationTime=expirationTime;fiber.stateNode={containerInfo:portal.containerInfo,pendingChildren:null,// Used by persistent updates
implementation:portal.implementation};return fiber;}function createFiberRoot(containerInfo,hydrate){// Cyclic construction. This cheats the type system right now because
// stateNode is any.
var uninitializedFiber=createHostRootFiber();var root={current:uninitializedFiber,containerInfo:containerInfo,pendingChildren:null,remainingExpirationTime:NoWork,isReadyForCommit:false,finishedWork:null,context:null,pendingContext:null,hydrate:hydrate,nextScheduledRoot:null};uninitializedFiber.stateNode=root;return root;}var onCommitFiberRoot=null;var onCommitFiberUnmount=null;var hasLoggedError=false;function catchErrors(fn){return function(arg){try{return fn(arg);}catch(err){if(true&&!hasLoggedError){hasLoggedError=true;warning(false,'React DevTools encountered an error: %s',err);}}};}function injectInternals(internals){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__==='undefined'){// No DevTools
return false;}var hook=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(hook.isDisabled){// This isn't a real property on the hook, but it can be set to opt out
// of DevTools integration and associated warnings and logs.
// https://github.com/facebook/react/issues/3877
return true;}if(!hook.supportsFiber){{warning(false,'The installed version of React DevTools is too old and will not work '+'with the current version of React. Please update React DevTools. '+'https://fb.me/react-devtools');}// DevTools exists, even though it doesn't support Fiber.
return true;}try{var rendererID=hook.inject(internals);// We have successfully injected, so now it is safe to set up hooks.
onCommitFiberRoot=catchErrors(function(root){return hook.onCommitFiberRoot(rendererID,root);});onCommitFiberUnmount=catchErrors(function(fiber){return hook.onCommitFiberUnmount(rendererID,fiber);});}catch(err){// Catch all errors because it is unsafe to throw during initialization.
{warning(false,'React DevTools encountered an error: %s.',err);}}// DevTools exists
return true;}function onCommitRoot(root){if(typeof onCommitFiberRoot==='function'){onCommitFiberRoot(root);}}function onCommitUnmount(fiber){if(typeof onCommitFiberUnmount==='function'){onCommitFiberUnmount(fiber);}}{var didWarnUpdateInsideUpdate=false;}// Callbacks are not validated until invocation
// Singly linked-list of updates. When an update is scheduled, it is added to
// the queue of the current fiber and the work-in-progress fiber. The two queues
// are separate but they share a persistent structure.
//
// During reconciliation, updates are removed from the work-in-progress fiber,
// but they remain on the current fiber. That ensures that if a work-in-progress
// is aborted, the aborted updates are recovered by cloning from current.
//
// The work-in-progress queue is always a subset of the current queue.
//
// When the tree is committed, the work-in-progress becomes the current.
function createUpdateQueue(baseState){var queue={baseState:baseState,expirationTime:NoWork,first:null,last:null,callbackList:null,hasForceUpdate:false,isInitialized:false};{queue.isProcessing=false;}return queue;}function insertUpdateIntoQueue(queue,update){// Append the update to the end of the list.
if(queue.last===null){// Queue is empty
queue.first=queue.last=update;}else{queue.last.next=update;queue.last=update;}if(queue.expirationTime===NoWork||queue.expirationTime>update.expirationTime){queue.expirationTime=update.expirationTime;}}function insertUpdateIntoFiber(fiber,update){// We'll have at least one and at most two distinct update queues.
var alternateFiber=fiber.alternate;var queue1=fiber.updateQueue;if(queue1===null){// TODO: We don't know what the base state will be until we begin work.
// It depends on which fiber is the next current. Initialize with an empty
// base state, then set to the memoizedState when rendering. Not super
// happy with this approach.
queue1=fiber.updateQueue=createUpdateQueue(null);}var queue2=void 0;if(alternateFiber!==null){queue2=alternateFiber.updateQueue;if(queue2===null){queue2=alternateFiber.updateQueue=createUpdateQueue(null);}}else{queue2=null;}queue2=queue2!==queue1?queue2:null;// Warn if an update is scheduled from inside an updater function.
{if((queue1.isProcessing||queue2!==null&&queue2.isProcessing)&&!didWarnUpdateInsideUpdate){warning(false,'An update (setState, replaceState, or forceUpdate) was scheduled '+'from inside an update function. Update functions should be pure, '+'with zero side-effects. Consider using componentDidUpdate or a '+'callback.');didWarnUpdateInsideUpdate=true;}}// If there's only one queue, add the update to that queue and exit.
if(queue2===null){insertUpdateIntoQueue(queue1,update);return;}// If either queue is empty, we need to add to both queues.
if(queue1.last===null||queue2.last===null){insertUpdateIntoQueue(queue1,update);insertUpdateIntoQueue(queue2,update);return;}// If both lists are not empty, the last update is the same for both lists
// because of structural sharing. So, we should only append to one of
// the lists.
insertUpdateIntoQueue(queue1,update);// But we still need to update the `last` pointer of queue2.
queue2.last=update;}function getUpdateExpirationTime(fiber){if(fiber.tag!==ClassComponent&&fiber.tag!==HostRoot){return NoWork;}var updateQueue=fiber.updateQueue;if(updateQueue===null){return NoWork;}return updateQueue.expirationTime;}function getStateFromUpdate(update,instance,prevState,props){var partialState=update.partialState;if(typeof partialState==='function'){var updateFn=partialState;// Invoke setState callback an extra time to help detect side-effects.
if(debugRenderPhaseSideEffects){updateFn.call(instance,prevState,props);}return updateFn.call(instance,prevState,props);}else{return partialState;}}function processUpdateQueue(current,workInProgress,queue,instance,props,renderExpirationTime){if(current!==null&&current.updateQueue===queue){// We need to create a work-in-progress queue, by cloning the current queue.
var currentQueue=queue;queue=workInProgress.updateQueue={baseState:currentQueue.baseState,expirationTime:currentQueue.expirationTime,first:currentQueue.first,last:currentQueue.last,isInitialized:currentQueue.isInitialized,// These fields are no longer valid because they were already committed.
// Reset them.
callbackList:null,hasForceUpdate:false};}{// Set this flag so we can warn if setState is called inside the update
// function of another setState.
queue.isProcessing=true;}// Reset the remaining expiration time. If we skip over any updates, we'll
// increase this accordingly.
queue.expirationTime=NoWork;// TODO: We don't know what the base state will be until we begin work.
// It depends on which fiber is the next current. Initialize with an empty
// base state, then set to the memoizedState when rendering. Not super
// happy with this approach.
var state=void 0;if(queue.isInitialized){state=queue.baseState;}else{state=queue.baseState=workInProgress.memoizedState;queue.isInitialized=true;}var dontMutatePrevState=true;var update=queue.first;var didSkip=false;while(update!==null){var updateExpirationTime=update.expirationTime;if(updateExpirationTime>renderExpirationTime){// This update does not have sufficient priority. Skip it.
var remainingExpirationTime=queue.expirationTime;if(remainingExpirationTime===NoWork||remainingExpirationTime>updateExpirationTime){// Update the remaining expiration time.
queue.expirationTime=updateExpirationTime;}if(!didSkip){didSkip=true;queue.baseState=state;}// Continue to the next update.
update=update.next;continue;}// This update does have sufficient priority.
// If no previous updates were skipped, drop this update from the queue by
// advancing the head of the list.
if(!didSkip){queue.first=update.next;if(queue.first===null){queue.last=null;}}// Process the update
var _partialState=void 0;if(update.isReplace){state=getStateFromUpdate(update,instance,state,props);dontMutatePrevState=true;}else{_partialState=getStateFromUpdate(update,instance,state,props);if(_partialState){if(dontMutatePrevState){// $FlowFixMe: Idk how to type this properly.
state=_assign({},state,_partialState);}else{state=_assign(state,_partialState);}dontMutatePrevState=false;}}if(update.isForced){queue.hasForceUpdate=true;}if(update.callback!==null){// Append to list of callbacks.
var _callbackList=queue.callbackList;if(_callbackList===null){_callbackList=queue.callbackList=[];}_callbackList.push(update);}update=update.next;}if(queue.callbackList!==null){workInProgress.effectTag|=Callback;}else if(queue.first===null&&!queue.hasForceUpdate){// The queue is empty. We can reset it.
workInProgress.updateQueue=null;}if(!didSkip){didSkip=true;queue.baseState=state;}{// No longer processing.
queue.isProcessing=false;}return state;}function commitCallbacks(queue,context){var callbackList=queue.callbackList;if(callbackList===null){return;}// Set the list to null to make sure they don't get called more than once.
queue.callbackList=null;for(var i=0;i<callbackList.length;i++){var update=callbackList[i];var _callback=update.callback;// This update might be processed again. Clear the callback so it's only
// called once.
update.callback=null;!(typeof _callback==='function')?invariant(false,'Invalid argument passed as callback. Expected a function. Instead received: %s',_callback):void 0;_callback.call(context);}}var fakeInternalInstance={};var isArray=Array.isArray;{var didWarnAboutStateAssignmentForComponent={};var warnOnInvalidCallback=function warnOnInvalidCallback(callback,callerName){warning(callback===null||typeof callback==='function','%s(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callerName,callback);};// This is so gross but it's at least non-critical and can be removed if
// it causes problems. This is meant to give a nicer error message for
// ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
// ...)) which otherwise throws a "_processChildContext is not a function"
// exception.
Object.defineProperty(fakeInternalInstance,'_processChildContext',{enumerable:false,value:function value(){invariant(false,'_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn\'t supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).');}});Object.freeze(fakeInternalInstance);}var ReactFiberClassComponent=function ReactFiberClassComponent(scheduleWork,computeExpirationForFiber,memoizeProps,memoizeState){// Class component state updater
var updater={isMounted:isMounted,enqueueSetState:function enqueueSetState(instance,partialState,callback){var fiber=get(instance);callback=callback===undefined?null:callback;{warnOnInvalidCallback(callback,'setState');}var expirationTime=computeExpirationForFiber(fiber);var update={expirationTime:expirationTime,partialState:partialState,callback:callback,isReplace:false,isForced:false,nextCallback:null,next:null};insertUpdateIntoFiber(fiber,update);scheduleWork(fiber,expirationTime);},enqueueReplaceState:function enqueueReplaceState(instance,state,callback){var fiber=get(instance);callback=callback===undefined?null:callback;{warnOnInvalidCallback(callback,'replaceState');}var expirationTime=computeExpirationForFiber(fiber);var update={expirationTime:expirationTime,partialState:state,callback:callback,isReplace:true,isForced:false,nextCallback:null,next:null};insertUpdateIntoFiber(fiber,update);scheduleWork(fiber,expirationTime);},enqueueForceUpdate:function enqueueForceUpdate(instance,callback){var fiber=get(instance);callback=callback===undefined?null:callback;{warnOnInvalidCallback(callback,'forceUpdate');}var expirationTime=computeExpirationForFiber(fiber);var update={expirationTime:expirationTime,partialState:null,callback:callback,isReplace:false,isForced:true,nextCallback:null,next:null};insertUpdateIntoFiber(fiber,update);scheduleWork(fiber,expirationTime);}};function checkShouldComponentUpdate(workInProgress,oldProps,newProps,oldState,newState,newContext){if(oldProps===null||workInProgress.updateQueue!==null&&workInProgress.updateQueue.hasForceUpdate){// If the workInProgress already has an Update effect, return true
return true;}var instance=workInProgress.stateNode;var type=workInProgress.type;if(typeof instance.shouldComponentUpdate==='function'){startPhaseTimer(workInProgress,'shouldComponentUpdate');var shouldUpdate=instance.shouldComponentUpdate(newProps,newState,newContext);stopPhaseTimer();// Simulate an async bailout/interruption by invoking lifecycle twice.
if(debugRenderPhaseSideEffects){instance.shouldComponentUpdate(newProps,newState,newContext);}{warning(shouldUpdate!==undefined,'%s.shouldComponentUpdate(): Returned undefined instead of a '+'boolean value. Make sure to return true or false.',getComponentName(workInProgress)||'Unknown');}return shouldUpdate;}if(type.prototype&&type.prototype.isPureReactComponent){return!shallowEqual(oldProps,newProps)||!shallowEqual(oldState,newState);}return true;}function checkClassInstance(workInProgress){var instance=workInProgress.stateNode;var type=workInProgress.type;{var name=getComponentName(workInProgress);var renderPresent=instance.render;if(!renderPresent){if(type.prototype&&typeof type.prototype.render==='function'){warning(false,'%s(...): No `render` method found on the returned component '+'instance: did you accidentally return an object from the constructor?',name);}else{warning(false,'%s(...): No `render` method found on the returned component '+'instance: you may have forgotten to define `render`.',name);}}var noGetInitialStateOnES6=!instance.getInitialState||instance.getInitialState.isReactClassApproved||instance.state;warning(noGetInitialStateOnES6,'getInitialState was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Did you mean to define a state property instead?',name);var noGetDefaultPropsOnES6=!instance.getDefaultProps||instance.getDefaultProps.isReactClassApproved;warning(noGetDefaultPropsOnES6,'getDefaultProps was defined on %s, a plain JavaScript class. '+'This is only supported for classes created using React.createClass. '+'Use a static property to define defaultProps instead.',name);var noInstancePropTypes=!instance.propTypes;warning(noInstancePropTypes,'propTypes was defined as an instance property on %s. Use a static '+'property to define propTypes instead.',name);var noInstanceContextTypes=!instance.contextTypes;warning(noInstanceContextTypes,'contextTypes was defined as an instance property on %s. Use a static '+'property to define contextTypes instead.',name);var noComponentShouldUpdate=typeof instance.componentShouldUpdate!=='function';warning(noComponentShouldUpdate,'%s has a method called '+'componentShouldUpdate(). Did you mean shouldComponentUpdate()? '+'The name is phrased as a question because the function is '+'expected to return a value.',name);if(type.prototype&&type.prototype.isPureReactComponent&&typeof instance.shouldComponentUpdate!=='undefined'){warning(false,'%s has a method called shouldComponentUpdate(). '+'shouldComponentUpdate should not be used when extending React.PureComponent. '+'Please extend React.Component if shouldComponentUpdate is used.',getComponentName(workInProgress)||'A pure component');}var noComponentDidUnmount=typeof instance.componentDidUnmount!=='function';warning(noComponentDidUnmount,'%s has a method called '+'componentDidUnmount(). But there is no such lifecycle method. '+'Did you mean componentWillUnmount()?',name);var noComponentDidReceiveProps=typeof instance.componentDidReceiveProps!=='function';warning(noComponentDidReceiveProps,'%s has a method called '+'componentDidReceiveProps(). But there is no such lifecycle method. '+'If you meant to update the state in response to changing props, '+'use componentWillReceiveProps(). If you meant to fetch data or '+'run side-effects or mutations after React has updated the UI, use componentDidUpdate().',name);var noComponentWillRecieveProps=typeof instance.componentWillRecieveProps!=='function';warning(noComponentWillRecieveProps,'%s has a method called '+'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',name);var hasMutatedProps=instance.props!==workInProgress.pendingProps;warning(instance.props===undefined||!hasMutatedProps,'%s(...): When calling super() in `%s`, make sure to pass '+"up the same props that your component's constructor was passed.",name,name);var noInstanceDefaultProps=!instance.defaultProps;warning(noInstanceDefaultProps,'Setting defaultProps as an instance property on %s is not supported and will be ignored.'+' Instead, define defaultProps as a static property on %s.',name,name);}var state=instance.state;if(state&&((typeof state==='undefined'?'undefined':_typeof(state))!=='object'||isArray(state))){warning(false,'%s.state: must be set to an object or null',getComponentName(workInProgress));}if(typeof instance.getChildContext==='function'){warning(_typeof(workInProgress.type.childContextTypes)==='object','%s.getChildContext(): childContextTypes must be defined in order to '+'use getChildContext().',getComponentName(workInProgress));}}function resetInputPointers(workInProgress,instance){instance.props=workInProgress.memoizedProps;instance.state=workInProgress.memoizedState;}function adoptClassInstance(workInProgress,instance){instance.updater=updater;workInProgress.stateNode=instance;// The instance needs access to the fiber so that it can schedule updates
set(instance,workInProgress);{instance._reactInternalInstance=fakeInternalInstance;}}function constructClassInstance(workInProgress,props){var ctor=workInProgress.type;var unmaskedContext=getUnmaskedContext(workInProgress);var needsContext=isContextConsumer(workInProgress);var context=needsContext?getMaskedContext(workInProgress,unmaskedContext):emptyObject;var instance=new ctor(props,context);adoptClassInstance(workInProgress,instance);// Cache unmasked context so we can avoid recreating masked context unless necessary.
// ReactFiberContext usually updates this cache but can't for newly-created instances.
if(needsContext){cacheContext(workInProgress,unmaskedContext,context);}return instance;}function callComponentWillMount(workInProgress,instance){startPhaseTimer(workInProgress,'componentWillMount');var oldState=instance.state;instance.componentWillMount();stopPhaseTimer();// Simulate an async bailout/interruption by invoking lifecycle twice.
if(debugRenderPhaseSideEffects){instance.componentWillMount();}if(oldState!==instance.state){{warning(false,'%s.componentWillMount(): Assigning directly to this.state is '+"deprecated (except inside a component's "+'constructor). Use setState instead.',getComponentName(workInProgress));}updater.enqueueReplaceState(instance,instance.state,null);}}function callComponentWillReceiveProps(workInProgress,instance,newProps,newContext){startPhaseTimer(workInProgress,'componentWillReceiveProps');var oldState=instance.state;instance.componentWillReceiveProps(newProps,newContext);stopPhaseTimer();// Simulate an async bailout/interruption by invoking lifecycle twice.
if(debugRenderPhaseSideEffects){instance.componentWillReceiveProps(newProps,newContext);}if(instance.state!==oldState){{var componentName=getComponentName(workInProgress)||'Component';if(!didWarnAboutStateAssignmentForComponent[componentName]){warning(false,'%s.componentWillReceiveProps(): Assigning directly to '+"this.state is deprecated (except inside a component's "+'constructor). Use setState instead.',componentName);didWarnAboutStateAssignmentForComponent[componentName]=true;}}updater.enqueueReplaceState(instance,instance.state,null);}}// Invokes the mount life-cycles on a previously never rendered instance.
function mountClassInstance(workInProgress,renderExpirationTime){var current=workInProgress.alternate;{checkClassInstance(workInProgress);}var instance=workInProgress.stateNode;var state=instance.state||null;var props=workInProgress.pendingProps;!props?invariant(false,'There must be pending props for an initial mount. This error is likely caused by a bug in React. Please file an issue.'):void 0;var unmaskedContext=getUnmaskedContext(workInProgress);instance.props=props;instance.state=workInProgress.memoizedState=state;instance.refs=emptyObject;instance.context=getMaskedContext(workInProgress,unmaskedContext);if(enableAsyncSubtreeAPI&&workInProgress.type!=null&&workInProgress.type.prototype!=null&&workInProgress.type.prototype.unstable_isAsyncReactComponent===true){workInProgress.internalContextTag|=AsyncUpdates;}if(typeof instance.componentWillMount==='function'){callComponentWillMount(workInProgress,instance);// If we had additional state updates during this life-cycle, let's
// process them now.
var updateQueue=workInProgress.updateQueue;if(updateQueue!==null){instance.state=processUpdateQueue(current,workInProgress,updateQueue,instance,props,renderExpirationTime);}}if(typeof instance.componentDidMount==='function'){workInProgress.effectTag|=Update;}}// Called on a preexisting class instance. Returns false if a resumed render
// could be reused.
// function resumeMountClassInstance(
//   workInProgress: Fiber,
//   priorityLevel: PriorityLevel,
// ): boolean {
//   const instance = workInProgress.stateNode;
//   resetInputPointers(workInProgress, instance);
//   let newState = workInProgress.memoizedState;
//   let newProps = workInProgress.pendingProps;
//   if (!newProps) {
//     // If there isn't any new props, then we'll reuse the memoized props.
//     // This could be from already completed work.
//     newProps = workInProgress.memoizedProps;
//     invariant(
//       newProps != null,
//       'There should always be pending or memoized props. This error is ' +
//         'likely caused by a bug in React. Please file an issue.',
//     );
//   }
//   const newUnmaskedContext = getUnmaskedContext(workInProgress);
//   const newContext = getMaskedContext(workInProgress, newUnmaskedContext);
//   const oldContext = instance.context;
//   const oldProps = workInProgress.memoizedProps;
//   if (
//     typeof instance.componentWillReceiveProps === 'function' &&
//     (oldProps !== newProps || oldContext !== newContext)
//   ) {
//     callComponentWillReceiveProps(
//       workInProgress,
//       instance,
//       newProps,
//       newContext,
//     );
//   }
//   // Process the update queue before calling shouldComponentUpdate
//   const updateQueue = workInProgress.updateQueue;
//   if (updateQueue !== null) {
//     newState = processUpdateQueue(
//       workInProgress,
//       updateQueue,
//       instance,
//       newState,
//       newProps,
//       priorityLevel,
//     );
//   }
//   // TODO: Should we deal with a setState that happened after the last
//   // componentWillMount and before this componentWillMount? Probably
//   // unsupported anyway.
//   if (
//     !checkShouldComponentUpdate(
//       workInProgress,
//       workInProgress.memoizedProps,
//       newProps,
//       workInProgress.memoizedState,
//       newState,
//       newContext,
//     )
//   ) {
//     // Update the existing instance's state, props, and context pointers even
//     // though we're bailing out.
//     instance.props = newProps;
//     instance.state = newState;
//     instance.context = newContext;
//     return false;
//   }
//   // Update the input pointers now so that they are correct when we call
//   // componentWillMount
//   instance.props = newProps;
//   instance.state = newState;
//   instance.context = newContext;
//   if (typeof instance.componentWillMount === 'function') {
//     callComponentWillMount(workInProgress, instance);
//     // componentWillMount may have called setState. Process the update queue.
//     const newUpdateQueue = workInProgress.updateQueue;
//     if (newUpdateQueue !== null) {
//       newState = processUpdateQueue(
//         workInProgress,
//         newUpdateQueue,
//         instance,
//         newState,
//         newProps,
//         priorityLevel,
//       );
//     }
//   }
//   if (typeof instance.componentDidMount === 'function') {
//     workInProgress.effectTag |= Update;
//   }
//   instance.state = newState;
//   return true;
// }
// Invokes the update life-cycles and returns false if it shouldn't rerender.
function updateClassInstance(current,workInProgress,renderExpirationTime){var instance=workInProgress.stateNode;resetInputPointers(workInProgress,instance);var oldProps=workInProgress.memoizedProps;var newProps=workInProgress.pendingProps;if(!newProps){// If there aren't any new props, then we'll reuse the memoized props.
// This could be from already completed work.
newProps=oldProps;!(newProps!=null)?invariant(false,'There should always be pending or memoized props. This error is likely caused by a bug in React. Please file an issue.'):void 0;}var oldContext=instance.context;var newUnmaskedContext=getUnmaskedContext(workInProgress);var newContext=getMaskedContext(workInProgress,newUnmaskedContext);// Note: During these life-cycles, instance.props/instance.state are what
// ever the previously attempted to render - not the "current". However,
// during componentDidUpdate we pass the "current" props.
if(typeof instance.componentWillReceiveProps==='function'&&(oldProps!==newProps||oldContext!==newContext)){callComponentWillReceiveProps(workInProgress,instance,newProps,newContext);}// Compute the next state using the memoized state and the update queue.
var oldState=workInProgress.memoizedState;// TODO: Previous state can be null.
var newState=void 0;if(workInProgress.updateQueue!==null){newState=processUpdateQueue(current,workInProgress,workInProgress.updateQueue,instance,newProps,renderExpirationTime);}else{newState=oldState;}if(oldProps===newProps&&oldState===newState&&!hasContextChanged()&&!(workInProgress.updateQueue!==null&&workInProgress.updateQueue.hasForceUpdate)){// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidUpdate==='function'){if(oldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.effectTag|=Update;}}return false;}var shouldUpdate=checkShouldComponentUpdate(workInProgress,oldProps,newProps,oldState,newState,newContext);if(shouldUpdate){if(typeof instance.componentWillUpdate==='function'){startPhaseTimer(workInProgress,'componentWillUpdate');instance.componentWillUpdate(newProps,newState,newContext);stopPhaseTimer();// Simulate an async bailout/interruption by invoking lifecycle twice.
if(debugRenderPhaseSideEffects){instance.componentWillUpdate(newProps,newState,newContext);}}if(typeof instance.componentDidUpdate==='function'){workInProgress.effectTag|=Update;}}else{// If an update was already in progress, we should schedule an Update
// effect even though we're bailing out, so that cWU/cDU are called.
if(typeof instance.componentDidUpdate==='function'){if(oldProps!==current.memoizedProps||oldState!==current.memoizedState){workInProgress.effectTag|=Update;}}// If shouldComponentUpdate returned false, we should still update the
// memoized props/state to indicate that this work can be reused.
memoizeProps(workInProgress,newProps);memoizeState(workInProgress,newState);}// Update the existing instance's state, props, and context pointers even
// if shouldComponentUpdate returns false.
instance.props=newProps;instance.state=newState;instance.context=newContext;return shouldUpdate;}return{adoptClassInstance:adoptClassInstance,constructClassInstance:constructClassInstance,mountClassInstance:mountClassInstance,// resumeMountClassInstance,
updateClassInstance:updateClassInstance};};// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol=typeof Symbol==='function'&&Symbol['for'];var REACT_ELEMENT_TYPE=hasSymbol?Symbol['for']('react.element'):0xeac7;var REACT_CALL_TYPE=hasSymbol?Symbol['for']('react.call'):0xeac8;var REACT_RETURN_TYPE=hasSymbol?Symbol['for']('react.return'):0xeac9;var REACT_PORTAL_TYPE=hasSymbol?Symbol['for']('react.portal'):0xeaca;var REACT_FRAGMENT_TYPE=hasSymbol?Symbol['for']('react.fragment'):0xeacb;var MAYBE_ITERATOR_SYMBOL=typeof Symbol==='function'&&Symbol.iterator;var FAUX_ITERATOR_SYMBOL='@@iterator';function getIteratorFn(maybeIterable){if(maybeIterable===null||typeof maybeIterable==='undefined'){return null;}var maybeIterator=MAYBE_ITERATOR_SYMBOL&&maybeIterable[MAYBE_ITERATOR_SYMBOL]||maybeIterable[FAUX_ITERATOR_SYMBOL];if(typeof maybeIterator==='function'){return maybeIterator;}return null;}var getCurrentFiberStackAddendum$1=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;{var didWarnAboutMaps=false;/**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */var ownerHasKeyUseWarning={};var ownerHasFunctionTypeWarning={};var warnForMissingKey=function warnForMissingKey(child){if(child===null||(typeof child==='undefined'?'undefined':_typeof(child))!=='object'){return;}if(!child._store||child._store.validated||child.key!=null){return;}!(_typeof(child._store)==='object')?invariant(false,'React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.'):void 0;child._store.validated=true;var currentComponentErrorInfo='Each child in an array or iterator should have a unique '+'"key" prop. See https://fb.me/react-warning-keys for '+'more information.'+(getCurrentFiberStackAddendum$1()||'');if(ownerHasKeyUseWarning[currentComponentErrorInfo]){return;}ownerHasKeyUseWarning[currentComponentErrorInfo]=true;warning(false,'Each child in an array or iterator should have a unique '+'"key" prop. See https://fb.me/react-warning-keys for '+'more information.%s',getCurrentFiberStackAddendum$1());};}var isArray$1=Array.isArray;function coerceRef(current,element){var mixedRef=element.ref;if(mixedRef!==null&&typeof mixedRef!=='function'){if(element._owner){var owner=element._owner;var inst=void 0;if(owner){var ownerFiber=owner;!(ownerFiber.tag===ClassComponent)?invariant(false,'Stateless function components cannot have refs.'):void 0;inst=ownerFiber.stateNode;}!inst?invariant(false,'Missing owner for string ref %s. This error is likely caused by a bug in React. Please file an issue.',mixedRef):void 0;var stringRef=''+mixedRef;// Check if previous string ref matches new string ref
if(current!==null&&current.ref!==null&&current.ref._stringRef===stringRef){return current.ref;}var ref=function ref(value){var refs=inst.refs===emptyObject?inst.refs={}:inst.refs;if(value===null){delete refs[stringRef];}else{refs[stringRef]=value;}};ref._stringRef=stringRef;return ref;}else{!(typeof mixedRef==='string')?invariant(false,'Expected ref to be a function or a string.'):void 0;!element._owner?invariant(false,'Element ref was specified as a string (%s) but no owner was set. You may have multiple copies of React loaded. (details: https://fb.me/react-refs-must-have-owner).',mixedRef):void 0;}}return mixedRef;}function throwOnInvalidObjectType(returnFiber,newChild){if(returnFiber.type!=='textarea'){var addendum='';{addendum=' If you meant to render a collection of children, use an array '+'instead.'+(getCurrentFiberStackAddendum$1()||'');}invariant(false,'Objects are not valid as a React child (found: %s).%s',Object.prototype.toString.call(newChild)==='[object Object]'?'object with keys {'+Object.keys(newChild).join(', ')+'}':newChild,addendum);}}function warnOnFunctionType(){var currentComponentErrorInfo='Functions are not valid as a React child. This may happen if '+'you return a Component instead of <Component /> from render. '+'Or maybe you meant to call this function rather than return it.'+(getCurrentFiberStackAddendum$1()||'');if(ownerHasFunctionTypeWarning[currentComponentErrorInfo]){return;}ownerHasFunctionTypeWarning[currentComponentErrorInfo]=true;warning(false,'Functions are not valid as a React child. This may happen if '+'you return a Component instead of <Component /> from render. '+'Or maybe you meant to call this function rather than return it.%s',getCurrentFiberStackAddendum$1()||'');}// This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function ChildReconciler(shouldTrackSideEffects){function deleteChild(returnFiber,childToDelete){if(!shouldTrackSideEffects){// Noop.
return;}// Deletions are added in reversed order so we add it to the front.
// At this point, the return fiber's effect list is empty except for
// deletions, so we can just append the deletion to the list. The remaining
// effects aren't added until the complete phase. Once we implement
// resuming, this may not be true.
var last=returnFiber.lastEffect;if(last!==null){last.nextEffect=childToDelete;returnFiber.lastEffect=childToDelete;}else{returnFiber.firstEffect=returnFiber.lastEffect=childToDelete;}childToDelete.nextEffect=null;childToDelete.effectTag=Deletion;}function deleteRemainingChildren(returnFiber,currentFirstChild){if(!shouldTrackSideEffects){// Noop.
return null;}// TODO: For the shouldClone case, this could be micro-optimized a bit by
// assuming that after the first child we've already added everything.
var childToDelete=currentFirstChild;while(childToDelete!==null){deleteChild(returnFiber,childToDelete);childToDelete=childToDelete.sibling;}return null;}function mapRemainingChildren(returnFiber,currentFirstChild){// Add the remaining children to a temporary map so that we can find them by
// keys quickly. Implicit (null) keys get added to this set with their index
var existingChildren=new Map();var existingChild=currentFirstChild;while(existingChild!==null){if(existingChild.key!==null){existingChildren.set(existingChild.key,existingChild);}else{existingChildren.set(existingChild.index,existingChild);}existingChild=existingChild.sibling;}return existingChildren;}function useFiber(fiber,pendingProps,expirationTime){// We currently set sibling to null and index to 0 here because it is easy
// to forget to do before returning it. E.g. for the single child case.
var clone=createWorkInProgress(fiber,pendingProps,expirationTime);clone.index=0;clone.sibling=null;return clone;}function placeChild(newFiber,lastPlacedIndex,newIndex){newFiber.index=newIndex;if(!shouldTrackSideEffects){// Noop.
return lastPlacedIndex;}var current=newFiber.alternate;if(current!==null){var oldIndex=current.index;if(oldIndex<lastPlacedIndex){// This is a move.
newFiber.effectTag=Placement;return lastPlacedIndex;}else{// This item can stay in place.
return oldIndex;}}else{// This is an insertion.
newFiber.effectTag=Placement;return lastPlacedIndex;}}function placeSingleChild(newFiber){// This is simpler for the single child case. We only need to do a
// placement for inserting new children.
if(shouldTrackSideEffects&&newFiber.alternate===null){newFiber.effectTag=Placement;}return newFiber;}function updateTextNode(returnFiber,current,textContent,expirationTime){if(current===null||current.tag!==HostText){// Insert
var created=createFiberFromText(textContent,returnFiber.internalContextTag,expirationTime);created['return']=returnFiber;return created;}else{// Update
var existing=useFiber(current,textContent,expirationTime);existing['return']=returnFiber;return existing;}}function updateElement(returnFiber,current,element,expirationTime){if(current!==null&&current.type===element.type){// Move based on index
var existing=useFiber(current,element.props,expirationTime);existing.ref=coerceRef(current,element);existing['return']=returnFiber;{existing._debugSource=element._source;existing._debugOwner=element._owner;}return existing;}else{// Insert
var created=createFiberFromElement(element,returnFiber.internalContextTag,expirationTime);created.ref=coerceRef(current,element);created['return']=returnFiber;return created;}}function updateCall(returnFiber,current,call,expirationTime){// TODO: Should this also compare handler to determine whether to reuse?
if(current===null||current.tag!==CallComponent){// Insert
var created=createFiberFromCall(call,returnFiber.internalContextTag,expirationTime);created['return']=returnFiber;return created;}else{// Move based on index
var existing=useFiber(current,call,expirationTime);existing['return']=returnFiber;return existing;}}function updateReturn(returnFiber,current,returnNode,expirationTime){if(current===null||current.tag!==ReturnComponent){// Insert
var created=createFiberFromReturn(returnNode,returnFiber.internalContextTag,expirationTime);created.type=returnNode.value;created['return']=returnFiber;return created;}else{// Move based on index
var existing=useFiber(current,null,expirationTime);existing.type=returnNode.value;existing['return']=returnFiber;return existing;}}function updatePortal(returnFiber,current,portal,expirationTime){if(current===null||current.tag!==HostPortal||current.stateNode.containerInfo!==portal.containerInfo||current.stateNode.implementation!==portal.implementation){// Insert
var created=createFiberFromPortal(portal,returnFiber.internalContextTag,expirationTime);created['return']=returnFiber;return created;}else{// Update
var existing=useFiber(current,portal.children||[],expirationTime);existing['return']=returnFiber;return existing;}}function updateFragment(returnFiber,current,fragment,expirationTime,key){if(current===null||current.tag!==Fragment){// Insert
var created=createFiberFromFragment(fragment,returnFiber.internalContextTag,expirationTime,key);created['return']=returnFiber;return created;}else{// Update
var existing=useFiber(current,fragment,expirationTime);existing['return']=returnFiber;return existing;}}function createChild(returnFiber,newChild,expirationTime){if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
var created=createFiberFromText(''+newChild,returnFiber.internalContextTag,expirationTime);created['return']=returnFiber;return created;}if((typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{if(newChild.type===REACT_FRAGMENT_TYPE){var _created=createFiberFromFragment(newChild.props.children,returnFiber.internalContextTag,expirationTime,newChild.key);_created['return']=returnFiber;return _created;}else{var _created2=createFiberFromElement(newChild,returnFiber.internalContextTag,expirationTime);_created2.ref=coerceRef(null,newChild);_created2['return']=returnFiber;return _created2;}}case REACT_CALL_TYPE:{var _created3=createFiberFromCall(newChild,returnFiber.internalContextTag,expirationTime);_created3['return']=returnFiber;return _created3;}case REACT_RETURN_TYPE:{var _created4=createFiberFromReturn(newChild,returnFiber.internalContextTag,expirationTime);_created4.type=newChild.value;_created4['return']=returnFiber;return _created4;}case REACT_PORTAL_TYPE:{var _created5=createFiberFromPortal(newChild,returnFiber.internalContextTag,expirationTime);_created5['return']=returnFiber;return _created5;}}if(isArray$1(newChild)||getIteratorFn(newChild)){var _created6=createFiberFromFragment(newChild,returnFiber.internalContextTag,expirationTime,null);_created6['return']=returnFiber;return _created6;}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}return null;}function updateSlot(returnFiber,oldFiber,newChild,expirationTime){// Update the fiber if the keys match, otherwise return null.
var key=oldFiber!==null?oldFiber.key:null;if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
if(key!==null){return null;}return updateTextNode(returnFiber,oldFiber,''+newChild,expirationTime);}if((typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{if(newChild.key===key){if(newChild.type===REACT_FRAGMENT_TYPE){return updateFragment(returnFiber,oldFiber,newChild.props.children,expirationTime,key);}return updateElement(returnFiber,oldFiber,newChild,expirationTime);}else{return null;}}case REACT_CALL_TYPE:{if(newChild.key===key){return updateCall(returnFiber,oldFiber,newChild,expirationTime);}else{return null;}}case REACT_RETURN_TYPE:{// Returns don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a
// yield.
if(key===null){return updateReturn(returnFiber,oldFiber,newChild,expirationTime);}else{return null;}}case REACT_PORTAL_TYPE:{if(newChild.key===key){return updatePortal(returnFiber,oldFiber,newChild,expirationTime);}else{return null;}}}if(isArray$1(newChild)||getIteratorFn(newChild)){if(key!==null){return null;}return updateFragment(returnFiber,oldFiber,newChild,expirationTime,null);}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}return null;}function updateFromMap(existingChildren,returnFiber,newIdx,newChild,expirationTime){if(typeof newChild==='string'||typeof newChild==='number'){// Text nodes don't have keys, so we neither have to check the old nor
// new node for the key. If both are text nodes, they match.
var matchedFiber=existingChildren.get(newIdx)||null;return updateTextNode(returnFiber,matchedFiber,''+newChild,expirationTime);}if((typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:{var _matchedFiber=existingChildren.get(newChild.key===null?newIdx:newChild.key)||null;if(newChild.type===REACT_FRAGMENT_TYPE){return updateFragment(returnFiber,_matchedFiber,newChild.props.children,expirationTime,newChild.key);}return updateElement(returnFiber,_matchedFiber,newChild,expirationTime);}case REACT_CALL_TYPE:{var _matchedFiber2=existingChildren.get(newChild.key===null?newIdx:newChild.key)||null;return updateCall(returnFiber,_matchedFiber2,newChild,expirationTime);}case REACT_RETURN_TYPE:{// Returns don't have keys, so we neither have to check the old nor
// new node for the key. If both are returns, they match.
var _matchedFiber3=existingChildren.get(newIdx)||null;return updateReturn(returnFiber,_matchedFiber3,newChild,expirationTime);}case REACT_PORTAL_TYPE:{var _matchedFiber4=existingChildren.get(newChild.key===null?newIdx:newChild.key)||null;return updatePortal(returnFiber,_matchedFiber4,newChild,expirationTime);}}if(isArray$1(newChild)||getIteratorFn(newChild)){var _matchedFiber5=existingChildren.get(newIdx)||null;return updateFragment(returnFiber,_matchedFiber5,newChild,expirationTime,null);}throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}return null;}/**
   * Warns if there is a duplicate or missing key
   */function warnOnInvalidKey(child,knownKeys){{if((typeof child==='undefined'?'undefined':_typeof(child))!=='object'||child===null){return knownKeys;}switch(child.$$typeof){case REACT_ELEMENT_TYPE:case REACT_CALL_TYPE:case REACT_PORTAL_TYPE:warnForMissingKey(child);var key=child.key;if(typeof key!=='string'){break;}if(knownKeys===null){knownKeys=new Set();knownKeys.add(key);break;}if(!knownKeys.has(key)){knownKeys.add(key);break;}warning(false,'Encountered two children with the same key, `%s`. '+'Keys should be unique so that components maintain their identity '+'across updates. Non-unique keys may cause children to be '+'duplicated and/or omitted — the behavior is unsupported and '+'could change in a future version.%s',key,getCurrentFiberStackAddendum$1());break;default:break;}}return knownKeys;}function reconcileChildrenArray(returnFiber,currentFirstChild,newChildren,expirationTime){// This algorithm can't optimize by searching from boths ends since we
// don't have backpointers on fibers. I'm trying to see how far we can get
// with that model. If it ends up not being worth the tradeoffs, we can
// add it later.
// Even with a two ended optimization, we'd want to optimize for the case
// where there are few changes and brute force the comparison instead of
// going for the Map. It'd like to explore hitting that path first in
// forward-only mode and only go for the Map once we notice that we need
// lots of look ahead. This doesn't handle reversal as well as two ended
// search but that's unusual. Besides, for the two ended optimization to
// work on Iterables, we'd need to copy the whole set.
// In this first iteration, we'll just live with hitting the bad case
// (adding everything to a Map) in for every insert/move.
// If you change this code, also update reconcileChildrenIterator() which
// uses the same algorithm.
{// First, validate keys.
var knownKeys=null;for(var i=0;i<newChildren.length;i++){var child=newChildren[i];knownKeys=warnOnInvalidKey(child,knownKeys);}}var resultingFirstChild=null;var previousNewFiber=null;var oldFiber=currentFirstChild;var lastPlacedIndex=0;var newIdx=0;var nextOldFiber=null;for(;oldFiber!==null&&newIdx<newChildren.length;newIdx++){if(oldFiber.index>newIdx){nextOldFiber=oldFiber;oldFiber=null;}else{nextOldFiber=oldFiber.sibling;}var newFiber=updateSlot(returnFiber,oldFiber,newChildren[newIdx],expirationTime);if(newFiber===null){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
if(oldFiber===null){oldFiber=nextOldFiber;}break;}if(shouldTrackSideEffects){if(oldFiber&&newFiber.alternate===null){// We matched the slot, but we didn't reuse the existing fiber, so we
// need to delete the existing child.
deleteChild(returnFiber,oldFiber);}}lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=newFiber;}else{// TODO: Defer siblings if we're not at the right index for this slot.
// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
previousNewFiber.sibling=newFiber;}previousNewFiber=newFiber;oldFiber=nextOldFiber;}if(newIdx===newChildren.length){// We've reached the end of the new children. We can delete the rest.
deleteRemainingChildren(returnFiber,oldFiber);return resultingFirstChild;}if(oldFiber===null){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;newIdx<newChildren.length;newIdx++){var _newFiber=createChild(returnFiber,newChildren[newIdx],expirationTime);if(!_newFiber){continue;}lastPlacedIndex=placeChild(_newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=_newFiber;}else{previousNewFiber.sibling=_newFiber;}previousNewFiber=_newFiber;}return resultingFirstChild;}// Add all children to a key map for quick lookups.
var existingChildren=mapRemainingChildren(returnFiber,oldFiber);// Keep scanning and use the map to restore deleted items as moves.
for(;newIdx<newChildren.length;newIdx++){var _newFiber2=updateFromMap(existingChildren,returnFiber,newIdx,newChildren[newIdx],expirationTime);if(_newFiber2){if(shouldTrackSideEffects){if(_newFiber2.alternate!==null){// The new fiber is a work in progress, but if there exists a
// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
existingChildren['delete'](_newFiber2.key===null?newIdx:_newFiber2.key);}}lastPlacedIndex=placeChild(_newFiber2,lastPlacedIndex,newIdx);if(previousNewFiber===null){resultingFirstChild=_newFiber2;}else{previousNewFiber.sibling=_newFiber2;}previousNewFiber=_newFiber2;}}if(shouldTrackSideEffects){// Any existing children that weren't consumed above were deleted. We need
// to add them to the deletion list.
existingChildren.forEach(function(child){return deleteChild(returnFiber,child);});}return resultingFirstChild;}function reconcileChildrenIterator(returnFiber,currentFirstChild,newChildrenIterable,expirationTime){// This is the same implementation as reconcileChildrenArray(),
// but using the iterator instead.
var iteratorFn=getIteratorFn(newChildrenIterable);!(typeof iteratorFn==='function')?invariant(false,'An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.'):void 0;{// Warn about using Maps as children
if(typeof newChildrenIterable.entries==='function'){var possibleMap=newChildrenIterable;if(possibleMap.entries===iteratorFn){warning(didWarnAboutMaps,'Using Maps as children is unsupported and will likely yield '+'unexpected results. Convert it to a sequence/iterable of keyed '+'ReactElements instead.%s',getCurrentFiberStackAddendum$1());didWarnAboutMaps=true;}}// First, validate keys.
// We'll get a different iterator later for the main pass.
var _newChildren=iteratorFn.call(newChildrenIterable);if(_newChildren){var knownKeys=null;var _step=_newChildren.next();for(;!_step.done;_step=_newChildren.next()){var child=_step.value;knownKeys=warnOnInvalidKey(child,knownKeys);}}}var newChildren=iteratorFn.call(newChildrenIterable);!(newChildren!=null)?invariant(false,'An iterable object provided no iterator.'):void 0;var resultingFirstChild=null;var previousNewFiber=null;var oldFiber=currentFirstChild;var lastPlacedIndex=0;var newIdx=0;var nextOldFiber=null;var step=newChildren.next();for(;oldFiber!==null&&!step.done;newIdx++,step=newChildren.next()){if(oldFiber.index>newIdx){nextOldFiber=oldFiber;oldFiber=null;}else{nextOldFiber=oldFiber.sibling;}var newFiber=updateSlot(returnFiber,oldFiber,step.value,expirationTime);if(newFiber===null){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
if(!oldFiber){oldFiber=nextOldFiber;}break;}if(shouldTrackSideEffects){if(oldFiber&&newFiber.alternate===null){// We matched the slot, but we didn't reuse the existing fiber, so we
// need to delete the existing child.
deleteChild(returnFiber,oldFiber);}}lastPlacedIndex=placeChild(newFiber,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=newFiber;}else{// TODO: Defer siblings if we're not at the right index for this slot.
// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
previousNewFiber.sibling=newFiber;}previousNewFiber=newFiber;oldFiber=nextOldFiber;}if(step.done){// We've reached the end of the new children. We can delete the rest.
deleteRemainingChildren(returnFiber,oldFiber);return resultingFirstChild;}if(oldFiber===null){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;!step.done;newIdx++,step=newChildren.next()){var _newFiber3=createChild(returnFiber,step.value,expirationTime);if(_newFiber3===null){continue;}lastPlacedIndex=placeChild(_newFiber3,lastPlacedIndex,newIdx);if(previousNewFiber===null){// TODO: Move out of the loop. This only happens for the first run.
resultingFirstChild=_newFiber3;}else{previousNewFiber.sibling=_newFiber3;}previousNewFiber=_newFiber3;}return resultingFirstChild;}// Add all children to a key map for quick lookups.
var existingChildren=mapRemainingChildren(returnFiber,oldFiber);// Keep scanning and use the map to restore deleted items as moves.
for(;!step.done;newIdx++,step=newChildren.next()){var _newFiber4=updateFromMap(existingChildren,returnFiber,newIdx,step.value,expirationTime);if(_newFiber4!==null){if(shouldTrackSideEffects){if(_newFiber4.alternate!==null){// The new fiber is a work in progress, but if there exists a
// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
existingChildren['delete'](_newFiber4.key===null?newIdx:_newFiber4.key);}}lastPlacedIndex=placeChild(_newFiber4,lastPlacedIndex,newIdx);if(previousNewFiber===null){resultingFirstChild=_newFiber4;}else{previousNewFiber.sibling=_newFiber4;}previousNewFiber=_newFiber4;}}if(shouldTrackSideEffects){// Any existing children that weren't consumed above were deleted. We need
// to add them to the deletion list.
existingChildren.forEach(function(child){return deleteChild(returnFiber,child);});}return resultingFirstChild;}function reconcileSingleTextNode(returnFiber,currentFirstChild,textContent,expirationTime){// There's no need to check for keys on text nodes since we don't have a
// way to define them.
if(currentFirstChild!==null&&currentFirstChild.tag===HostText){// We already have an existing node so let's just update it and delete
// the rest.
deleteRemainingChildren(returnFiber,currentFirstChild.sibling);var existing=useFiber(currentFirstChild,textContent,expirationTime);existing['return']=returnFiber;return existing;}// The existing first child is not a text node so we need to create one
// and delete the existing ones.
deleteRemainingChildren(returnFiber,currentFirstChild);var created=createFiberFromText(textContent,returnFiber.internalContextTag,expirationTime);created['return']=returnFiber;return created;}function reconcileSingleElement(returnFiber,currentFirstChild,element,expirationTime){var key=element.key;var child=currentFirstChild;while(child!==null){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(child.key===key){if(child.tag===Fragment?element.type===REACT_FRAGMENT_TYPE:child.type===element.type){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,element.type===REACT_FRAGMENT_TYPE?element.props.children:element.props,expirationTime);existing.ref=coerceRef(child,element);existing['return']=returnFiber;{existing._debugSource=element._source;existing._debugOwner=element._owner;}return existing;}else{deleteRemainingChildren(returnFiber,child);break;}}else{deleteChild(returnFiber,child);}child=child.sibling;}if(element.type===REACT_FRAGMENT_TYPE){var created=createFiberFromFragment(element.props.children,returnFiber.internalContextTag,expirationTime,element.key);created['return']=returnFiber;return created;}else{var _created7=createFiberFromElement(element,returnFiber.internalContextTag,expirationTime);_created7.ref=coerceRef(currentFirstChild,element);_created7['return']=returnFiber;return _created7;}}function reconcileSingleCall(returnFiber,currentFirstChild,call,expirationTime){var key=call.key;var child=currentFirstChild;while(child!==null){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(child.key===key){if(child.tag===CallComponent){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,call,expirationTime);existing['return']=returnFiber;return existing;}else{deleteRemainingChildren(returnFiber,child);break;}}else{deleteChild(returnFiber,child);}child=child.sibling;}var created=createFiberFromCall(call,returnFiber.internalContextTag,expirationTime);created['return']=returnFiber;return created;}function reconcileSingleReturn(returnFiber,currentFirstChild,returnNode,expirationTime){// There's no need to check for keys on yields since they're stateless.
var child=currentFirstChild;if(child!==null){if(child.tag===ReturnComponent){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,null,expirationTime);existing.type=returnNode.value;existing['return']=returnFiber;return existing;}else{deleteRemainingChildren(returnFiber,child);}}var created=createFiberFromReturn(returnNode,returnFiber.internalContextTag,expirationTime);created.type=returnNode.value;created['return']=returnFiber;return created;}function reconcileSinglePortal(returnFiber,currentFirstChild,portal,expirationTime){var key=portal.key;var child=currentFirstChild;while(child!==null){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(child.key===key){if(child.tag===HostPortal&&child.stateNode.containerInfo===portal.containerInfo&&child.stateNode.implementation===portal.implementation){deleteRemainingChildren(returnFiber,child.sibling);var existing=useFiber(child,portal.children||[],expirationTime);existing['return']=returnFiber;return existing;}else{deleteRemainingChildren(returnFiber,child);break;}}else{deleteChild(returnFiber,child);}child=child.sibling;}var created=createFiberFromPortal(portal,returnFiber.internalContextTag,expirationTime);created['return']=returnFiber;return created;}// This API will tag the children with the side-effect of the reconciliation
// itself. They will be added to the side-effect list as we pass through the
// children and the parent.
function reconcileChildFibers(returnFiber,currentFirstChild,newChild,expirationTime){// This function is not recursive.
// If the top level item is an array, we treat it as a set of children,
// not as a fragment. Nested arrays on the other hand will be treated as
// fragment nodes. Recursion happens at the normal flow.
// Handle top level unkeyed fragments as if they were arrays.
// This leads to an ambiguity between <>{[...]}</> and <>...</>.
// We treat the ambiguous cases above the same.
if((typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null&&newChild.type===REACT_FRAGMENT_TYPE&&newChild.key===null){newChild=newChild.props.children;}// Handle object types
var isObject=(typeof newChild==='undefined'?'undefined':_typeof(newChild))==='object'&&newChild!==null;if(isObject){switch(newChild.$$typeof){case REACT_ELEMENT_TYPE:return placeSingleChild(reconcileSingleElement(returnFiber,currentFirstChild,newChild,expirationTime));case REACT_CALL_TYPE:return placeSingleChild(reconcileSingleCall(returnFiber,currentFirstChild,newChild,expirationTime));case REACT_RETURN_TYPE:return placeSingleChild(reconcileSingleReturn(returnFiber,currentFirstChild,newChild,expirationTime));case REACT_PORTAL_TYPE:return placeSingleChild(reconcileSinglePortal(returnFiber,currentFirstChild,newChild,expirationTime));}}if(typeof newChild==='string'||typeof newChild==='number'){return placeSingleChild(reconcileSingleTextNode(returnFiber,currentFirstChild,''+newChild,expirationTime));}if(isArray$1(newChild)){return reconcileChildrenArray(returnFiber,currentFirstChild,newChild,expirationTime);}if(getIteratorFn(newChild)){return reconcileChildrenIterator(returnFiber,currentFirstChild,newChild,expirationTime);}if(isObject){throwOnInvalidObjectType(returnFiber,newChild);}{if(typeof newChild==='function'){warnOnFunctionType();}}if(typeof newChild==='undefined'){// If the new child is undefined, and the return fiber is a composite
// component, throw an error. If Fiber return types are disabled,
// we already threw above.
switch(returnFiber.tag){case ClassComponent:{{var instance=returnFiber.stateNode;if(instance.render._isMockFunction){// We allow auto-mocks to proceed as if they're returning null.
break;}}}// Intentionally fall through to the next case, which handles both
// functions and classes
// eslint-disable-next-lined no-fallthrough
case FunctionalComponent:{var Component=returnFiber.type;invariant(false,'%s(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.',Component.displayName||Component.name||'Component');}}}// Remaining cases are all treated as empty.
return deleteRemainingChildren(returnFiber,currentFirstChild);}return reconcileChildFibers;}var reconcileChildFibers=ChildReconciler(true);var mountChildFibers=ChildReconciler(false);function cloneChildFibers(current,workInProgress){!(current===null||workInProgress.child===current.child)?invariant(false,'Resuming work not yet implemented.'):void 0;if(workInProgress.child===null){return;}var currentChild=workInProgress.child;var newChild=createWorkInProgress(currentChild,currentChild.pendingProps,currentChild.expirationTime);workInProgress.child=newChild;newChild['return']=workInProgress;while(currentChild.sibling!==null){currentChild=currentChild.sibling;newChild=newChild.sibling=createWorkInProgress(currentChild,currentChild.pendingProps,currentChild.expirationTime);newChild['return']=workInProgress;}newChild.sibling=null;}{var warnedAboutStatelessRefs={};}var ReactFiberBeginWork=function ReactFiberBeginWork(config,hostContext,hydrationContext,scheduleWork,computeExpirationForFiber){var shouldSetTextContent=config.shouldSetTextContent,useSyncScheduling=config.useSyncScheduling,shouldDeprioritizeSubtree=config.shouldDeprioritizeSubtree;var pushHostContext=hostContext.pushHostContext,pushHostContainer=hostContext.pushHostContainer;var enterHydrationState=hydrationContext.enterHydrationState,resetHydrationState=hydrationContext.resetHydrationState,tryToClaimNextHydratableInstance=hydrationContext.tryToClaimNextHydratableInstance;var _ReactFiberClassCompo=ReactFiberClassComponent(scheduleWork,computeExpirationForFiber,memoizeProps,memoizeState),adoptClassInstance=_ReactFiberClassCompo.adoptClassInstance,constructClassInstance=_ReactFiberClassCompo.constructClassInstance,mountClassInstance=_ReactFiberClassCompo.mountClassInstance,updateClassInstance=_ReactFiberClassCompo.updateClassInstance;// TODO: Remove this and use reconcileChildrenAtExpirationTime directly.
function reconcileChildren(current,workInProgress,nextChildren){reconcileChildrenAtExpirationTime(current,workInProgress,nextChildren,workInProgress.expirationTime);}function reconcileChildrenAtExpirationTime(current,workInProgress,nextChildren,renderExpirationTime){if(current===null){// If this is a fresh new component that hasn't been rendered yet, we
// won't update its child set by applying minimal side-effects. Instead,
// we will add them all to the child before it gets rendered. That means
// we can optimize this reconciliation pass by not tracking side-effects.
workInProgress.child=mountChildFibers(workInProgress,null,nextChildren,renderExpirationTime);}else{// If the current child is the same as the work in progress, it means that
// we haven't yet started any work on these children. Therefore, we use
// the clone algorithm to create a copy of all the current children.
// If we had any progressed work already, that is invalid at this point so
// let's throw it out.
workInProgress.child=reconcileChildFibers(workInProgress,current.child,nextChildren,renderExpirationTime);}}function updateFragment(current,workInProgress){var nextChildren=workInProgress.pendingProps;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
if(nextChildren===null){nextChildren=workInProgress.memoizedProps;}}else if(nextChildren===null||workInProgress.memoizedProps===nextChildren){return bailoutOnAlreadyFinishedWork(current,workInProgress);}reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextChildren);return workInProgress.child;}function markRef(current,workInProgress){var ref=workInProgress.ref;if(ref!==null&&(!current||current.ref!==ref)){// Schedule a Ref effect
workInProgress.effectTag|=Ref;}}function updateFunctionalComponent(current,workInProgress){var fn=workInProgress.type;var nextProps=workInProgress.pendingProps;var memoizedProps=workInProgress.memoizedProps;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
if(nextProps===null){nextProps=memoizedProps;}}else{if(nextProps===null||memoizedProps===nextProps){return bailoutOnAlreadyFinishedWork(current,workInProgress);}// TODO: consider bringing fn.shouldComponentUpdate() back.
// It used to be here.
}var unmaskedContext=getUnmaskedContext(workInProgress);var context=getMaskedContext(workInProgress,unmaskedContext);var nextChildren;{ReactCurrentOwner.current=workInProgress;ReactDebugCurrentFiber.setCurrentPhase('render');nextChildren=fn(nextProps,context);ReactDebugCurrentFiber.setCurrentPhase(null);}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork;reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextProps);return workInProgress.child;}function updateClassComponent(current,workInProgress,renderExpirationTime){// Push context providers early to prevent context stack mismatches.
// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var hasContext=pushContextProvider(workInProgress);var shouldUpdate=void 0;if(current===null){if(!workInProgress.stateNode){// In the initial pass we might need to construct the instance.
constructClassInstance(workInProgress,workInProgress.pendingProps);mountClassInstance(workInProgress,renderExpirationTime);shouldUpdate=true;}else{invariant(false,'Resuming work not yet implemented.');// In a resume, we'll already have an instance we can reuse.
// shouldUpdate = resumeMountClassInstance(workInProgress, renderExpirationTime);
}}else{shouldUpdate=updateClassInstance(current,workInProgress,renderExpirationTime);}return finishClassComponent(current,workInProgress,shouldUpdate,hasContext);}function finishClassComponent(current,workInProgress,shouldUpdate,hasContext){// Refs should update even if shouldComponentUpdate returns false
markRef(current,workInProgress);if(!shouldUpdate){// Context providers should defer to sCU for rendering
if(hasContext){invalidateContextProvider(workInProgress,false);}return bailoutOnAlreadyFinishedWork(current,workInProgress);}var instance=workInProgress.stateNode;// Rerender
ReactCurrentOwner.current=workInProgress;var nextChildren=void 0;{ReactDebugCurrentFiber.setCurrentPhase('render');nextChildren=instance.render();if(debugRenderPhaseSideEffects){instance.render();}ReactDebugCurrentFiber.setCurrentPhase(null);}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork;reconcileChildren(current,workInProgress,nextChildren);// Memoize props and state using the values we just used to render.
// TODO: Restructure so we never read values from the instance.
memoizeState(workInProgress,instance.state);memoizeProps(workInProgress,instance.props);// The context might have changed so we need to recalculate it.
if(hasContext){invalidateContextProvider(workInProgress,true);}return workInProgress.child;}function pushHostRootContext(workInProgress){var root=workInProgress.stateNode;if(root.pendingContext){pushTopLevelContextObject(workInProgress,root.pendingContext,root.pendingContext!==root.context);}else if(root.context){// Should always be set
pushTopLevelContextObject(workInProgress,root.context,false);}pushHostContainer(workInProgress,root.containerInfo);}function updateHostRoot(current,workInProgress,renderExpirationTime){pushHostRootContext(workInProgress);var updateQueue=workInProgress.updateQueue;if(updateQueue!==null){var prevState=workInProgress.memoizedState;var state=processUpdateQueue(current,workInProgress,updateQueue,null,null,renderExpirationTime);if(prevState===state){// If the state is the same as before, that's a bailout because we had
// no work that expires at this time.
resetHydrationState();return bailoutOnAlreadyFinishedWork(current,workInProgress);}var element=state.element;var root=workInProgress.stateNode;if((current===null||current.child===null)&&root.hydrate&&enterHydrationState(workInProgress)){// If we don't have any current children this might be the first pass.
// We always try to hydrate. If this isn't a hydration pass there won't
// be any children to hydrate which is effectively the same thing as
// not hydrating.
// This is a bit of a hack. We track the host root as a placement to
// know that we're currently in a mounting state. That way isMounted
// works as expected. We must reset this before committing.
// TODO: Delete this when we delete isMounted and findDOMNode.
workInProgress.effectTag|=Placement;// Ensure that children mount into this root without tracking
// side-effects. This ensures that we don't store Placement effects on
// nodes that will be hydrated.
workInProgress.child=mountChildFibers(workInProgress,null,element,renderExpirationTime);}else{// Otherwise reset hydration state in case we aborted and resumed another
// root.
resetHydrationState();reconcileChildren(current,workInProgress,element);}memoizeState(workInProgress,state);return workInProgress.child;}resetHydrationState();// If there is no update queue, that's a bailout because the root has no props.
return bailoutOnAlreadyFinishedWork(current,workInProgress);}function updateHostComponent(current,workInProgress,renderExpirationTime){pushHostContext(workInProgress);if(current===null){tryToClaimNextHydratableInstance(workInProgress);}var type=workInProgress.type;var memoizedProps=workInProgress.memoizedProps;var nextProps=workInProgress.pendingProps;if(nextProps===null){nextProps=memoizedProps;!(nextProps!==null)?invariant(false,'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.'):void 0;}var prevProps=current!==null?current.memoizedProps:null;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
}else if(nextProps===null||memoizedProps===nextProps){return bailoutOnAlreadyFinishedWork(current,workInProgress);}var nextChildren=nextProps.children;var isDirectTextChild=shouldSetTextContent(type,nextProps);if(isDirectTextChild){// We special case a direct text child of a host node. This is a common
// case. We won't handle it as a reified child. We will instead handle
// this in the host environment that also have access to this prop. That
// avoids allocating another HostText fiber and traversing it.
nextChildren=null;}else if(prevProps&&shouldSetTextContent(type,prevProps)){// If we're switching from a direct text child to a normal child, or to
// empty, we need to schedule the text content to be reset.
workInProgress.effectTag|=ContentReset;}markRef(current,workInProgress);// Check the host config to see if the children are offscreen/hidden.
if(renderExpirationTime!==Never&&!useSyncScheduling&&shouldDeprioritizeSubtree(type,nextProps)){// Down-prioritize the children.
workInProgress.expirationTime=Never;// Bailout and come back to this fiber later.
return null;}reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextProps);return workInProgress.child;}function updateHostText(current,workInProgress){if(current===null){tryToClaimNextHydratableInstance(workInProgress);}var nextProps=workInProgress.pendingProps;if(nextProps===null){nextProps=workInProgress.memoizedProps;}memoizeProps(workInProgress,nextProps);// Nothing to do here. This is terminal. We'll do the completion step
// immediately after.
return null;}function mountIndeterminateComponent(current,workInProgress,renderExpirationTime){!(current===null)?invariant(false,'An indeterminate component should never have mounted. This error is likely caused by a bug in React. Please file an issue.'):void 0;var fn=workInProgress.type;var props=workInProgress.pendingProps;var unmaskedContext=getUnmaskedContext(workInProgress);var context=getMaskedContext(workInProgress,unmaskedContext);var value;{if(fn.prototype&&typeof fn.prototype.render==='function'){var componentName=getComponentName(workInProgress);warning(false,"The <%s /> component appears to have a render method, but doesn't extend React.Component. "+'This is likely to cause errors. Change %s to extend React.Component instead.',componentName,componentName);}ReactCurrentOwner.current=workInProgress;value=fn(props,context);}// React DevTools reads this flag.
workInProgress.effectTag|=PerformedWork;if((typeof value==='undefined'?'undefined':_typeof(value))==='object'&&value!==null&&typeof value.render==='function'){// Proceed under the assumption that this is a class instance
workInProgress.tag=ClassComponent;// Push context providers early to prevent context stack mismatches.
// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var hasContext=pushContextProvider(workInProgress);adoptClassInstance(workInProgress,value);mountClassInstance(workInProgress,renderExpirationTime);return finishClassComponent(current,workInProgress,true,hasContext);}else{// Proceed under the assumption that this is a functional component
workInProgress.tag=FunctionalComponent;{var Component=workInProgress.type;if(Component){warning(!Component.childContextTypes,'%s(...): childContextTypes cannot be defined on a functional component.',Component.displayName||Component.name||'Component');}if(workInProgress.ref!==null){var info='';var ownerName=ReactDebugCurrentFiber.getCurrentFiberOwnerName();if(ownerName){info+='\n\nCheck the render method of `'+ownerName+'`.';}var warningKey=ownerName||workInProgress._debugID||'';var debugSource=workInProgress._debugSource;if(debugSource){warningKey=debugSource.fileName+':'+debugSource.lineNumber;}if(!warnedAboutStatelessRefs[warningKey]){warnedAboutStatelessRefs[warningKey]=true;warning(false,'Stateless function components cannot be given refs. '+'Attempts to access this ref will fail.%s%s',info,ReactDebugCurrentFiber.getCurrentFiberStackAddendum());}}}reconcileChildren(current,workInProgress,value);memoizeProps(workInProgress,props);return workInProgress.child;}}function updateCallComponent(current,workInProgress,renderExpirationTime){var nextCall=workInProgress.pendingProps;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
if(nextCall===null){nextCall=current&&current.memoizedProps;!(nextCall!==null)?invariant(false,'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.'):void 0;}}else if(nextCall===null||workInProgress.memoizedProps===nextCall){nextCall=workInProgress.memoizedProps;// TODO: When bailing out, we might need to return the stateNode instead
// of the child. To check it for work.
// return bailoutOnAlreadyFinishedWork(current, workInProgress);
}var nextChildren=nextCall.children;// The following is a fork of reconcileChildrenAtExpirationTime but using
// stateNode to store the child.
if(current===null){workInProgress.stateNode=mountChildFibers(workInProgress,workInProgress.stateNode,nextChildren,renderExpirationTime);}else{workInProgress.stateNode=reconcileChildFibers(workInProgress,workInProgress.stateNode,nextChildren,renderExpirationTime);}memoizeProps(workInProgress,nextCall);// This doesn't take arbitrary time so we could synchronously just begin
// eagerly do the work of workInProgress.child as an optimization.
return workInProgress.stateNode;}function updatePortalComponent(current,workInProgress,renderExpirationTime){pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);var nextChildren=workInProgress.pendingProps;if(hasContextChanged()){// Normally we can bail out on props equality but if context has changed
// we don't do the bailout and we have to reuse existing props instead.
if(nextChildren===null){nextChildren=current&&current.memoizedProps;!(nextChildren!=null)?invariant(false,'We should always have pending or current props. This error is likely caused by a bug in React. Please file an issue.'):void 0;}}else if(nextChildren===null||workInProgress.memoizedProps===nextChildren){return bailoutOnAlreadyFinishedWork(current,workInProgress);}if(current===null){// Portals are special because we don't append the children during mount
// but at commit. Therefore we need to track insertions which the normal
// flow doesn't do during mount. This doesn't happen at the root because
// the root always starts with a "current" with a null child.
// TODO: Consider unifying this with how the root works.
workInProgress.child=reconcileChildFibers(workInProgress,null,nextChildren,renderExpirationTime);memoizeProps(workInProgress,nextChildren);}else{reconcileChildren(current,workInProgress,nextChildren);memoizeProps(workInProgress,nextChildren);}return workInProgress.child;}/*
  function reuseChildrenEffects(returnFiber : Fiber, firstChild : Fiber) {
    let child = firstChild;
    do {
      // Ensure that the first and last effect of the parent corresponds
      // to the children's first and last effect.
      if (!returnFiber.firstEffect) {
        returnFiber.firstEffect = child.firstEffect;
      }
      if (child.lastEffect) {
        if (returnFiber.lastEffect) {
          returnFiber.lastEffect.nextEffect = child.firstEffect;
        }
        returnFiber.lastEffect = child.lastEffect;
      }
    } while (child = child.sibling);
  }
  */function bailoutOnAlreadyFinishedWork(current,workInProgress){cancelWorkTimer(workInProgress);// TODO: We should ideally be able to bail out early if the children have no
// more work to do. However, since we don't have a separation of this
// Fiber's priority and its children yet - we don't know without doing lots
// of the same work we do anyway. Once we have that separation we can just
// bail out here if the children has no more work at this priority level.
// if (workInProgress.priorityOfChildren <= priorityLevel) {
//   // If there are side-effects in these children that have not yet been
//   // committed we need to ensure that they get properly transferred up.
//   if (current && current.child !== workInProgress.child) {
//     reuseChildrenEffects(workInProgress, child);
//   }
//   return null;
// }
cloneChildFibers(current,workInProgress);return workInProgress.child;}function bailoutOnLowPriority(current,workInProgress){cancelWorkTimer(workInProgress);// TODO: Handle HostComponent tags here as well and call pushHostContext()?
// See PR 8590 discussion for context
switch(workInProgress.tag){case HostRoot:pushHostRootContext(workInProgress);break;case ClassComponent:pushContextProvider(workInProgress);break;case HostPortal:pushHostContainer(workInProgress,workInProgress.stateNode.containerInfo);break;}// TODO: What if this is currently in progress?
// How can that happen? How is this not being cloned?
return null;}// TODO: Delete memoizeProps/State and move to reconcile/bailout instead
function memoizeProps(workInProgress,nextProps){workInProgress.memoizedProps=nextProps;}function memoizeState(workInProgress,nextState){workInProgress.memoizedState=nextState;// Don't reset the updateQueue, in case there are pending updates. Resetting
// is handled by processUpdateQueue.
}function beginWork(current,workInProgress,renderExpirationTime){if(workInProgress.expirationTime===NoWork||workInProgress.expirationTime>renderExpirationTime){return bailoutOnLowPriority(current,workInProgress);}switch(workInProgress.tag){case IndeterminateComponent:return mountIndeterminateComponent(current,workInProgress,renderExpirationTime);case FunctionalComponent:return updateFunctionalComponent(current,workInProgress);case ClassComponent:return updateClassComponent(current,workInProgress,renderExpirationTime);case HostRoot:return updateHostRoot(current,workInProgress,renderExpirationTime);case HostComponent:return updateHostComponent(current,workInProgress,renderExpirationTime);case HostText:return updateHostText(current,workInProgress);case CallHandlerPhase:// This is a restart. Reset the tag to the initial phase.
workInProgress.tag=CallComponent;// Intentionally fall through since this is now the same.
case CallComponent:return updateCallComponent(current,workInProgress,renderExpirationTime);case ReturnComponent:// A return component is just a placeholder, we can just run through the
// next one immediately.
return null;case HostPortal:return updatePortalComponent(current,workInProgress,renderExpirationTime);case Fragment:return updateFragment(current,workInProgress);default:invariant(false,'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');}}function beginFailedWork(current,workInProgress,renderExpirationTime){// Push context providers here to avoid a push/pop context mismatch.
switch(workInProgress.tag){case ClassComponent:pushContextProvider(workInProgress);break;case HostRoot:pushHostRootContext(workInProgress);break;default:invariant(false,'Invalid type of work. This error is likely caused by a bug in React. Please file an issue.');}// Add an error effect so we can handle the error during the commit phase
workInProgress.effectTag|=Err;// This is a weird case where we do "resume" work — work that failed on
// our first attempt. Because we no longer have a notion of "progressed
// deletions," reset the child to the current child to make sure we delete
// it again. TODO: Find a better way to handle this, perhaps during a more
// general overhaul of error handling.
if(current===null){workInProgress.child=null;}else if(workInProgress.child!==current.child){workInProgress.child=current.child;}if(workInProgress.expirationTime===NoWork||workInProgress.expirationTime>renderExpirationTime){return bailoutOnLowPriority(current,workInProgress);}// If we don't bail out, we're going be recomputing our children so we need
// to drop our effect list.
workInProgress.firstEffect=null;workInProgress.lastEffect=null;// Unmount the current children as if the component rendered null
var nextChildren=null;reconcileChildrenAtExpirationTime(current,workInProgress,nextChildren,renderExpirationTime);if(workInProgress.tag===ClassComponent){var instance=workInProgress.stateNode;workInProgress.memoizedProps=instance.props;workInProgress.memoizedState=instance.state;}return workInProgress.child;}return{beginWork:beginWork,beginFailedWork:beginFailedWork};};var ReactFiberCompleteWork=function ReactFiberCompleteWork(config,hostContext,hydrationContext){var createInstance=config.createInstance,createTextInstance=config.createTextInstance,appendInitialChild=config.appendInitialChild,finalizeInitialChildren=config.finalizeInitialChildren,prepareUpdate=config.prepareUpdate,mutation=config.mutation,persistence=config.persistence;var getRootHostContainer=hostContext.getRootHostContainer,popHostContext=hostContext.popHostContext,getHostContext=hostContext.getHostContext,popHostContainer=hostContext.popHostContainer;var prepareToHydrateHostInstance=hydrationContext.prepareToHydrateHostInstance,prepareToHydrateHostTextInstance=hydrationContext.prepareToHydrateHostTextInstance,popHydrationState=hydrationContext.popHydrationState;function markUpdate(workInProgress){// Tag the fiber with an update effect. This turns a Placement into
// an UpdateAndPlacement.
workInProgress.effectTag|=Update;}function markRef(workInProgress){workInProgress.effectTag|=Ref;}function appendAllReturns(returns,workInProgress){var node=workInProgress.stateNode;if(node){node['return']=workInProgress;}while(node!==null){if(node.tag===HostComponent||node.tag===HostText||node.tag===HostPortal){invariant(false,'A call cannot have host component children.');}else if(node.tag===ReturnComponent){returns.push(node.type);}else if(node.child!==null){node.child['return']=node;node=node.child;continue;}while(node.sibling===null){if(node['return']===null||node['return']===workInProgress){return;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;}}function moveCallToHandlerPhase(current,workInProgress,renderExpirationTime){var call=workInProgress.memoizedProps;!call?invariant(false,'Should be resolved by now. This error is likely caused by a bug in React. Please file an issue.'):void 0;// First step of the call has completed. Now we need to do the second.
// TODO: It would be nice to have a multi stage call represented by a
// single component, or at least tail call optimize nested ones. Currently
// that requires additional fields that we don't want to add to the fiber.
// So this requires nested handlers.
// Note: This doesn't mutate the alternate node. I don't think it needs to
// since this stage is reset for every pass.
workInProgress.tag=CallHandlerPhase;// Build up the returns.
// TODO: Compare this to a generator or opaque helpers like Children.
var returns=[];appendAllReturns(returns,workInProgress);var fn=call.handler;var props=call.props;var nextChildren=fn(props,returns);var currentFirstChild=current!==null?current.child:null;workInProgress.child=reconcileChildFibers(workInProgress,currentFirstChild,nextChildren,renderExpirationTime);return workInProgress.child;}function appendAllChildren(parent,workInProgress){// We only have the top Fiber that was created but we need recurse down its
// children to find all the terminal nodes.
var node=workInProgress.child;while(node!==null){if(node.tag===HostComponent||node.tag===HostText){appendInitialChild(parent,node.stateNode);}else if(node.tag===HostPortal){// If we have a portal child, then we don't want to traverse
// down its children. Instead, we'll get insertions from each child in
// the portal directly.
}else if(node.child!==null){node.child['return']=node;node=node.child;continue;}if(node===workInProgress){return;}while(node.sibling===null){if(node['return']===null||node['return']===workInProgress){return;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;}}var updateHostContainer=void 0;var updateHostComponent=void 0;var updateHostText=void 0;if(mutation){if(enableMutatingReconciler){// Mutation mode
updateHostContainer=function updateHostContainer(workInProgress){// Noop
};updateHostComponent=function updateHostComponent(current,workInProgress,updatePayload,type,oldProps,newProps,rootContainerInstance){// TODO: Type this specific to this type of component.
workInProgress.updateQueue=updatePayload;// If the update payload indicates that there is a change or if there
// is a new ref we mark this as an update. All the work is done in commitWork.
if(updatePayload){markUpdate(workInProgress);}};updateHostText=function updateHostText(current,workInProgress,oldText,newText){// If the text differs, mark it as an update. All the work in done in commitWork.
if(oldText!==newText){markUpdate(workInProgress);}};}else{invariant(false,'Mutating reconciler is disabled.');}}else if(persistence){if(enablePersistentReconciler){// Persistent host tree mode
var cloneInstance=persistence.cloneInstance,createContainerChildSet=persistence.createContainerChildSet,appendChildToContainerChildSet=persistence.appendChildToContainerChildSet,finalizeContainerChildren=persistence.finalizeContainerChildren;// An unfortunate fork of appendAllChildren because we have two different parent types.
var appendAllChildrenToContainer=function appendAllChildrenToContainer(containerChildSet,workInProgress){// We only have the top Fiber that was created but we need recurse down its
// children to find all the terminal nodes.
var node=workInProgress.child;while(node!==null){if(node.tag===HostComponent||node.tag===HostText){appendChildToContainerChildSet(containerChildSet,node.stateNode);}else if(node.tag===HostPortal){// If we have a portal child, then we don't want to traverse
// down its children. Instead, we'll get insertions from each child in
// the portal directly.
}else if(node.child!==null){node.child['return']=node;node=node.child;continue;}if(node===workInProgress){return;}while(node.sibling===null){if(node['return']===null||node['return']===workInProgress){return;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;}};updateHostContainer=function updateHostContainer(workInProgress){var portalOrRoot=workInProgress.stateNode;var childrenUnchanged=workInProgress.firstEffect===null;if(childrenUnchanged){// No changes, just reuse the existing instance.
}else{var container=portalOrRoot.containerInfo;var newChildSet=createContainerChildSet(container);if(finalizeContainerChildren(container,newChildSet)){markUpdate(workInProgress);}portalOrRoot.pendingChildren=newChildSet;// If children might have changed, we have to add them all to the set.
appendAllChildrenToContainer(newChildSet,workInProgress);// Schedule an update on the container to swap out the container.
markUpdate(workInProgress);}};updateHostComponent=function updateHostComponent(current,workInProgress,updatePayload,type,oldProps,newProps,rootContainerInstance){// If there are no effects associated with this node, then none of our children had any updates.
// This guarantees that we can reuse all of them.
var childrenUnchanged=workInProgress.firstEffect===null;var currentInstance=current.stateNode;if(childrenUnchanged&&updatePayload===null){// No changes, just reuse the existing instance.
// Note that this might release a previous clone.
workInProgress.stateNode=currentInstance;}else{var recyclableInstance=workInProgress.stateNode;var newInstance=cloneInstance(currentInstance,updatePayload,type,oldProps,newProps,workInProgress,childrenUnchanged,recyclableInstance);if(finalizeInitialChildren(newInstance,type,newProps,rootContainerInstance)){markUpdate(workInProgress);}workInProgress.stateNode=newInstance;if(childrenUnchanged){// If there are no other effects in this tree, we need to flag this node as having one.
// Even though we're not going to use it for anything.
// Otherwise parents won't know that there are new children to propagate upwards.
markUpdate(workInProgress);}else{// If children might have changed, we have to add them all to the set.
appendAllChildren(newInstance,workInProgress);}}};updateHostText=function updateHostText(current,workInProgress,oldText,newText){if(oldText!==newText){// If the text content differs, we'll create a new text instance for it.
var rootContainerInstance=getRootHostContainer();var currentHostContext=getHostContext();workInProgress.stateNode=createTextInstance(newText,rootContainerInstance,currentHostContext,workInProgress);// We'll have to mark it as having an effect, even though we won't use the effect for anything.
// This lets the parents know that at least one of their children has changed.
markUpdate(workInProgress);}};}else{invariant(false,'Persistent reconciler is disabled.');}}else{if(enableNoopReconciler){// No host operations
updateHostContainer=function updateHostContainer(workInProgress){// Noop
};updateHostComponent=function updateHostComponent(current,workInProgress,updatePayload,type,oldProps,newProps,rootContainerInstance){// Noop
};updateHostText=function updateHostText(current,workInProgress,oldText,newText){// Noop
};}else{invariant(false,'Noop reconciler is disabled.');}}function completeWork(current,workInProgress,renderExpirationTime){// Get the latest props.
var newProps=workInProgress.pendingProps;if(newProps===null){newProps=workInProgress.memoizedProps;}else if(workInProgress.expirationTime!==Never||renderExpirationTime===Never){// Reset the pending props, unless this was a down-prioritization.
workInProgress.pendingProps=null;}switch(workInProgress.tag){case FunctionalComponent:return null;case ClassComponent:{// We are leaving this subtree, so pop context if any.
popContextProvider(workInProgress);return null;}case HostRoot:{popHostContainer(workInProgress);popTopLevelContextObject(workInProgress);var fiberRoot=workInProgress.stateNode;if(fiberRoot.pendingContext){fiberRoot.context=fiberRoot.pendingContext;fiberRoot.pendingContext=null;}if(current===null||current.child===null){// If we hydrated, pop so that we can delete any remaining children
// that weren't hydrated.
popHydrationState(workInProgress);// This resets the hacky state to fix isMounted before committing.
// TODO: Delete this when we delete isMounted and findDOMNode.
workInProgress.effectTag&=~Placement;}updateHostContainer(workInProgress);return null;}case HostComponent:{popHostContext(workInProgress);var rootContainerInstance=getRootHostContainer();var type=workInProgress.type;if(current!==null&&workInProgress.stateNode!=null){// If we have an alternate, that means this is an update and we need to
// schedule a side-effect to do the updates.
var oldProps=current.memoizedProps;// If we get updated because one of our children updated, we don't
// have newProps so we'll have to reuse them.
// TODO: Split the update API as separate for the props vs. children.
// Even better would be if children weren't special cased at all tho.
var instance=workInProgress.stateNode;var currentHostContext=getHostContext();var updatePayload=prepareUpdate(instance,type,oldProps,newProps,rootContainerInstance,currentHostContext);updateHostComponent(current,workInProgress,updatePayload,type,oldProps,newProps,rootContainerInstance);if(current.ref!==workInProgress.ref){markRef(workInProgress);}}else{if(!newProps){!(workInProgress.stateNode!==null)?invariant(false,'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.'):void 0;// This can happen when we abort work.
return null;}var _currentHostContext=getHostContext();// TODO: Move createInstance to beginWork and keep it on a context
// "stack" as the parent. Then append children as we go in beginWork
// or completeWork depending on we want to add then top->down or
// bottom->up. Top->down is faster in IE11.
var wasHydrated=popHydrationState(workInProgress);if(wasHydrated){// TODO: Move this and createInstance step into the beginPhase
// to consolidate.
if(prepareToHydrateHostInstance(workInProgress,rootContainerInstance,_currentHostContext)){// If changes to the hydrated node needs to be applied at the
// commit-phase we mark this as such.
markUpdate(workInProgress);}}else{var _instance=createInstance(type,newProps,rootContainerInstance,_currentHostContext,workInProgress);appendAllChildren(_instance,workInProgress);// Certain renderers require commit-time effects for initial mount.
// (eg DOM renderer supports auto-focus for certain elements).
// Make sure such renderers get scheduled for later work.
if(finalizeInitialChildren(_instance,type,newProps,rootContainerInstance)){markUpdate(workInProgress);}workInProgress.stateNode=_instance;}if(workInProgress.ref!==null){// If there is a ref on a host node we need to schedule a callback
markRef(workInProgress);}}return null;}case HostText:{var newText=newProps;if(current&&workInProgress.stateNode!=null){var oldText=current.memoizedProps;// If we have an alternate, that means this is an update and we need
// to schedule a side-effect to do the updates.
updateHostText(current,workInProgress,oldText,newText);}else{if(typeof newText!=='string'){!(workInProgress.stateNode!==null)?invariant(false,'We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.'):void 0;// This can happen when we abort work.
return null;}var _rootContainerInstance=getRootHostContainer();var _currentHostContext2=getHostContext();var _wasHydrated=popHydrationState(workInProgress);if(_wasHydrated){if(prepareToHydrateHostTextInstance(workInProgress)){markUpdate(workInProgress);}}else{workInProgress.stateNode=createTextInstance(newText,_rootContainerInstance,_currentHostContext2,workInProgress);}}return null;}case CallComponent:return moveCallToHandlerPhase(current,workInProgress,renderExpirationTime);case CallHandlerPhase:// Reset the tag to now be a first phase call.
workInProgress.tag=CallComponent;return null;case ReturnComponent:// Does nothing.
return null;case Fragment:return null;case HostPortal:popHostContainer(workInProgress);updateHostContainer(workInProgress);return null;// Error cases
case IndeterminateComponent:invariant(false,'An indeterminate component should have become determinate before completing. This error is likely caused by a bug in React. Please file an issue.');// eslint-disable-next-line no-fallthrough
default:invariant(false,'Unknown unit of work tag. This error is likely caused by a bug in React. Please file an issue.');}}return{completeWork:completeWork};};var invokeGuardedCallback$2=ReactErrorUtils.invokeGuardedCallback;var hasCaughtError$1=ReactErrorUtils.hasCaughtError;var clearCaughtError$1=ReactErrorUtils.clearCaughtError;var ReactFiberCommitWork=function ReactFiberCommitWork(config,captureError){var getPublicInstance=config.getPublicInstance,mutation=config.mutation,persistence=config.persistence;var callComponentWillUnmountWithTimer=function callComponentWillUnmountWithTimer(current,instance){startPhaseTimer(current,'componentWillUnmount');instance.props=current.memoizedProps;instance.state=current.memoizedState;instance.componentWillUnmount();stopPhaseTimer();};// Capture errors so they don't interrupt unmounting.
function safelyCallComponentWillUnmount(current,instance){{invokeGuardedCallback$2(null,callComponentWillUnmountWithTimer,null,current,instance);if(hasCaughtError$1()){var unmountError=clearCaughtError$1();captureError(current,unmountError);}}}function safelyDetachRef(current){var ref=current.ref;if(ref!==null){{invokeGuardedCallback$2(null,ref,null,null);if(hasCaughtError$1()){var refError=clearCaughtError$1();captureError(current,refError);}}}}function commitLifeCycles(current,finishedWork){switch(finishedWork.tag){case ClassComponent:{var instance=finishedWork.stateNode;if(finishedWork.effectTag&Update){if(current===null){startPhaseTimer(finishedWork,'componentDidMount');instance.props=finishedWork.memoizedProps;instance.state=finishedWork.memoizedState;instance.componentDidMount();stopPhaseTimer();}else{var prevProps=current.memoizedProps;var prevState=current.memoizedState;startPhaseTimer(finishedWork,'componentDidUpdate');instance.props=finishedWork.memoizedProps;instance.state=finishedWork.memoizedState;instance.componentDidUpdate(prevProps,prevState);stopPhaseTimer();}}var updateQueue=finishedWork.updateQueue;if(updateQueue!==null){commitCallbacks(updateQueue,instance);}return;}case HostRoot:{var _updateQueue=finishedWork.updateQueue;if(_updateQueue!==null){var _instance=finishedWork.child!==null?finishedWork.child.stateNode:null;commitCallbacks(_updateQueue,_instance);}return;}case HostComponent:{var _instance2=finishedWork.stateNode;// Renderers may schedule work to be done after host components are mounted
// (eg DOM renderer may schedule auto-focus for inputs and form controls).
// These effects should only be committed when components are first mounted,
// aka when there is no current/alternate.
if(current===null&&finishedWork.effectTag&Update){var type=finishedWork.type;var props=finishedWork.memoizedProps;commitMount(_instance2,type,props,finishedWork);}return;}case HostText:{// We have no life-cycles associated with text.
return;}case HostPortal:{// We have no life-cycles associated with portals.
return;}default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}}function commitAttachRef(finishedWork){var ref=finishedWork.ref;if(ref!==null){var instance=finishedWork.stateNode;switch(finishedWork.tag){case HostComponent:ref(getPublicInstance(instance));break;default:ref(instance);}}}function commitDetachRef(current){var currentRef=current.ref;if(currentRef!==null){currentRef(null);}}// User-originating errors (lifecycles and refs) should not interrupt
// deletion, so don't let them throw. Host-originating errors should
// interrupt deletion, so it's okay
function commitUnmount(current){if(typeof onCommitUnmount==='function'){onCommitUnmount(current);}switch(current.tag){case ClassComponent:{safelyDetachRef(current);var instance=current.stateNode;if(typeof instance.componentWillUnmount==='function'){safelyCallComponentWillUnmount(current,instance);}return;}case HostComponent:{safelyDetachRef(current);return;}case CallComponent:{commitNestedUnmounts(current.stateNode);return;}case HostPortal:{// TODO: this is recursive.
// We are also not using this parent because
// the portal will get pushed immediately.
if(enableMutatingReconciler&&mutation){unmountHostComponents(current);}else if(enablePersistentReconciler&&persistence){emptyPortalContainer(current);}return;}}}function commitNestedUnmounts(root){// While we're inside a removed host node we don't want to call
// removeChild on the inner nodes because they're removed by the top
// call anyway. We also want to call componentWillUnmount on all
// composites before this host node is removed from the tree. Therefore
var node=root;while(true){commitUnmount(node);// Visit children because they may contain more composite or host nodes.
// Skip portals because commitUnmount() currently visits them recursively.
if(node.child!==null&&(// If we use mutation we drill down into portals using commitUnmount above.
// If we don't use mutation we drill down into portals here instead.
!mutation||node.tag!==HostPortal)){node.child['return']=node;node=node.child;continue;}if(node===root){return;}while(node.sibling===null){if(node['return']===null||node['return']===root){return;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;}}function detachFiber(current){// Cut off the return pointers to disconnect it from the tree. Ideally, we
// should clear the child pointer of the parent alternate to let this
// get GC:ed but we don't know which for sure which parent is the current
// one so we'll settle for GC:ing the subtree of this child. This child
// itself will be GC:ed when the parent updates the next time.
current['return']=null;current.child=null;if(current.alternate){current.alternate.child=null;current.alternate['return']=null;}}if(!mutation){var commitContainer=void 0;if(persistence){var replaceContainerChildren=persistence.replaceContainerChildren,createContainerChildSet=persistence.createContainerChildSet;var emptyPortalContainer=function emptyPortalContainer(current){var portal=current.stateNode;var containerInfo=portal.containerInfo;var emptyChildSet=createContainerChildSet(containerInfo);replaceContainerChildren(containerInfo,emptyChildSet);};commitContainer=function commitContainer(finishedWork){switch(finishedWork.tag){case ClassComponent:{return;}case HostComponent:{return;}case HostText:{return;}case HostRoot:case HostPortal:{var portalOrRoot=finishedWork.stateNode;var containerInfo=portalOrRoot.containerInfo,_pendingChildren=portalOrRoot.pendingChildren;replaceContainerChildren(containerInfo,_pendingChildren);return;}default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}};}else{commitContainer=function commitContainer(finishedWork){// Noop
};}if(enablePersistentReconciler||enableNoopReconciler){return{commitResetTextContent:function commitResetTextContent(finishedWork){},commitPlacement:function commitPlacement(finishedWork){},commitDeletion:function commitDeletion(current){// Detach refs and call componentWillUnmount() on the whole subtree.
commitNestedUnmounts(current);detachFiber(current);},commitWork:function commitWork(current,finishedWork){commitContainer(finishedWork);},commitLifeCycles:commitLifeCycles,commitAttachRef:commitAttachRef,commitDetachRef:commitDetachRef};}else if(persistence){invariant(false,'Persistent reconciler is disabled.');}else{invariant(false,'Noop reconciler is disabled.');}}var commitMount=mutation.commitMount,commitUpdate=mutation.commitUpdate,resetTextContent=mutation.resetTextContent,commitTextUpdate=mutation.commitTextUpdate,appendChild=mutation.appendChild,appendChildToContainer=mutation.appendChildToContainer,insertBefore=mutation.insertBefore,insertInContainerBefore=mutation.insertInContainerBefore,removeChild=mutation.removeChild,removeChildFromContainer=mutation.removeChildFromContainer;function getHostParentFiber(fiber){var parent=fiber['return'];while(parent!==null){if(isHostParent(parent)){return parent;}parent=parent['return'];}invariant(false,'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.');}function isHostParent(fiber){return fiber.tag===HostComponent||fiber.tag===HostRoot||fiber.tag===HostPortal;}function getHostSibling(fiber){// We're going to search forward into the tree until we find a sibling host
// node. Unfortunately, if multiple insertions are done in a row we have to
// search past them. This leads to exponential search for the next sibling.
var node=fiber;siblings:while(true){// If we didn't find anything, let's try the next sibling.
while(node.sibling===null){if(node['return']===null||isHostParent(node['return'])){// If we pop out of the root or hit the parent the fiber we are the
// last sibling.
return null;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;while(node.tag!==HostComponent&&node.tag!==HostText){// If it is not host node and, we might have a host node inside it.
// Try to search down until we find one.
if(node.effectTag&Placement){// If we don't have a child, try the siblings instead.
continue siblings;}// If we don't have a child, try the siblings instead.
// We also skip portals because they are not part of this host tree.
if(node.child===null||node.tag===HostPortal){continue siblings;}else{node.child['return']=node;node=node.child;}}// Check if this host node is stable or about to be placed.
if(!(node.effectTag&Placement)){// Found it!
return node.stateNode;}}}function commitPlacement(finishedWork){// Recursively insert all host nodes into the parent.
var parentFiber=getHostParentFiber(finishedWork);var parent=void 0;var isContainer=void 0;switch(parentFiber.tag){case HostComponent:parent=parentFiber.stateNode;isContainer=false;break;case HostRoot:parent=parentFiber.stateNode.containerInfo;isContainer=true;break;case HostPortal:parent=parentFiber.stateNode.containerInfo;isContainer=true;break;default:invariant(false,'Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.');}if(parentFiber.effectTag&ContentReset){// Reset the text content of the parent before doing any insertions
resetTextContent(parent);// Clear ContentReset from the effect tag
parentFiber.effectTag&=~ContentReset;}var before=getHostSibling(finishedWork);// We only have the top Fiber that was inserted but we need recurse down its
// children to find all the terminal nodes.
var node=finishedWork;while(true){if(node.tag===HostComponent||node.tag===HostText){if(before){if(isContainer){insertInContainerBefore(parent,node.stateNode,before);}else{insertBefore(parent,node.stateNode,before);}}else{if(isContainer){appendChildToContainer(parent,node.stateNode);}else{appendChild(parent,node.stateNode);}}}else if(node.tag===HostPortal){// If the insertion itself is a portal, then we don't want to traverse
// down its children. Instead, we'll get insertions from each child in
// the portal directly.
}else if(node.child!==null){node.child['return']=node;node=node.child;continue;}if(node===finishedWork){return;}while(node.sibling===null){if(node['return']===null||node['return']===finishedWork){return;}node=node['return'];}node.sibling['return']=node['return'];node=node.sibling;}}function unmountHostComponents(current){// We only have the top Fiber that was inserted but we need recurse down its
var node=current;// Each iteration, currentParent is populated with node's host parent if not
// currentParentIsValid.
var currentParentIsValid=false;var currentParent=void 0;var currentParentIsContainer=void 0;while(true){if(!currentParentIsValid){var parent=node['return'];findParent:while(true){!(parent!==null)?invariant(false,'Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.'):void 0;switch(parent.tag){case HostComponent:currentParent=parent.stateNode;currentParentIsContainer=false;break findParent;case HostRoot:currentParent=parent.stateNode.containerInfo;currentParentIsContainer=true;break findParent;case HostPortal:currentParent=parent.stateNode.containerInfo;currentParentIsContainer=true;break findParent;}parent=parent['return'];}currentParentIsValid=true;}if(node.tag===HostComponent||node.tag===HostText){commitNestedUnmounts(node);// After all the children have unmounted, it is now safe to remove the
// node from the tree.
if(currentParentIsContainer){removeChildFromContainer(currentParent,node.stateNode);}else{removeChild(currentParent,node.stateNode);}// Don't visit children because we already visited them.
}else if(node.tag===HostPortal){// When we go into a portal, it becomes the parent to remove from.
// We will reassign it back when we pop the portal on the way up.
currentParent=node.stateNode.containerInfo;// Visit children because portals might contain host components.
if(node.child!==null){node.child['return']=node;node=node.child;continue;}}else{commitUnmount(node);// Visit children because we may find more host components below.
if(node.child!==null){node.child['return']=node;node=node.child;continue;}}if(node===current){return;}while(node.sibling===null){if(node['return']===null||node['return']===current){return;}node=node['return'];if(node.tag===HostPortal){// When we go out of the portal, we need to restore the parent.
// Since we don't keep a stack of them, we will search for it.
currentParentIsValid=false;}}node.sibling['return']=node['return'];node=node.sibling;}}function commitDeletion(current){// Recursively delete all host nodes from the parent.
// Detach refs and call componentWillUnmount() on the whole subtree.
unmountHostComponents(current);detachFiber(current);}function commitWork(current,finishedWork){switch(finishedWork.tag){case ClassComponent:{return;}case HostComponent:{var instance=finishedWork.stateNode;if(instance!=null){// Commit the work prepared earlier.
var newProps=finishedWork.memoizedProps;// For hydration we reuse the update path but we treat the oldProps
// as the newProps. The updatePayload will contain the real change in
// this case.
var oldProps=current!==null?current.memoizedProps:newProps;var type=finishedWork.type;// TODO: Type the updateQueue to be specific to host components.
var updatePayload=finishedWork.updateQueue;finishedWork.updateQueue=null;if(updatePayload!==null){commitUpdate(instance,updatePayload,type,oldProps,newProps,finishedWork);}}return;}case HostText:{!(finishedWork.stateNode!==null)?invariant(false,'This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.'):void 0;var textInstance=finishedWork.stateNode;var newText=finishedWork.memoizedProps;// For hydration we reuse the update path but we treat the oldProps
// as the newProps. The updatePayload will contain the real change in
// this case.
var oldText=current!==null?current.memoizedProps:newText;commitTextUpdate(textInstance,oldText,newText);return;}case HostRoot:{return;}default:{invariant(false,'This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.');}}}function commitResetTextContent(current){resetTextContent(current.stateNode);}if(enableMutatingReconciler){return{commitResetTextContent:commitResetTextContent,commitPlacement:commitPlacement,commitDeletion:commitDeletion,commitWork:commitWork,commitLifeCycles:commitLifeCycles,commitAttachRef:commitAttachRef,commitDetachRef:commitDetachRef};}else{invariant(false,'Mutating reconciler is disabled.');}};var NO_CONTEXT={};var ReactFiberHostContext=function ReactFiberHostContext(config){var getChildHostContext=config.getChildHostContext,getRootHostContext=config.getRootHostContext;var contextStackCursor=createCursor(NO_CONTEXT);var contextFiberStackCursor=createCursor(NO_CONTEXT);var rootInstanceStackCursor=createCursor(NO_CONTEXT);function requiredContext(c){!(c!==NO_CONTEXT)?invariant(false,'Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.'):void 0;return c;}function getRootHostContainer(){var rootInstance=requiredContext(rootInstanceStackCursor.current);return rootInstance;}function pushHostContainer(fiber,nextRootInstance){// Push current root instance onto the stack;
// This allows us to reset root when portals are popped.
push(rootInstanceStackCursor,nextRootInstance,fiber);var nextRootContext=getRootHostContext(nextRootInstance);// Track the context and the Fiber that provided it.
// This enables us to pop only Fibers that provide unique contexts.
push(contextFiberStackCursor,fiber,fiber);push(contextStackCursor,nextRootContext,fiber);}function popHostContainer(fiber){pop(contextStackCursor,fiber);pop(contextFiberStackCursor,fiber);pop(rootInstanceStackCursor,fiber);}function getHostContext(){var context=requiredContext(contextStackCursor.current);return context;}function pushHostContext(fiber){var rootInstance=requiredContext(rootInstanceStackCursor.current);var context=requiredContext(contextStackCursor.current);var nextContext=getChildHostContext(context,fiber.type,rootInstance);// Don't push this Fiber's context unless it's unique.
if(context===nextContext){return;}// Track the context and the Fiber that provided it.
// This enables us to pop only Fibers that provide unique contexts.
push(contextFiberStackCursor,fiber,fiber);push(contextStackCursor,nextContext,fiber);}function popHostContext(fiber){// Do not pop unless this Fiber provided the current context.
// pushHostContext() only pushes Fibers that provide unique contexts.
if(contextFiberStackCursor.current!==fiber){return;}pop(contextStackCursor,fiber);pop(contextFiberStackCursor,fiber);}function resetHostContainer(){contextStackCursor.current=NO_CONTEXT;rootInstanceStackCursor.current=NO_CONTEXT;}return{getHostContext:getHostContext,getRootHostContainer:getRootHostContainer,popHostContainer:popHostContainer,popHostContext:popHostContext,pushHostContainer:pushHostContainer,pushHostContext:pushHostContext,resetHostContainer:resetHostContainer};};var ReactFiberHydrationContext=function ReactFiberHydrationContext(config){var shouldSetTextContent=config.shouldSetTextContent,hydration=config.hydration;// If this doesn't have hydration mode.
if(!hydration){return{enterHydrationState:function enterHydrationState(){return false;},resetHydrationState:function resetHydrationState(){},tryToClaimNextHydratableInstance:function tryToClaimNextHydratableInstance(){},prepareToHydrateHostInstance:function prepareToHydrateHostInstance(){invariant(false,'Expected prepareToHydrateHostInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');},prepareToHydrateHostTextInstance:function prepareToHydrateHostTextInstance(){invariant(false,'Expected prepareToHydrateHostTextInstance() to never be called. This error is likely caused by a bug in React. Please file an issue.');},popHydrationState:function popHydrationState(fiber){return false;}};}var canHydrateInstance=hydration.canHydrateInstance,canHydrateTextInstance=hydration.canHydrateTextInstance,getNextHydratableSibling=hydration.getNextHydratableSibling,getFirstHydratableChild=hydration.getFirstHydratableChild,hydrateInstance=hydration.hydrateInstance,hydrateTextInstance=hydration.hydrateTextInstance,didNotMatchHydratedContainerTextInstance=hydration.didNotMatchHydratedContainerTextInstance,didNotMatchHydratedTextInstance=hydration.didNotMatchHydratedTextInstance,didNotHydrateContainerInstance=hydration.didNotHydrateContainerInstance,didNotHydrateInstance=hydration.didNotHydrateInstance,didNotFindHydratableContainerInstance=hydration.didNotFindHydratableContainerInstance,didNotFindHydratableContainerTextInstance=hydration.didNotFindHydratableContainerTextInstance,didNotFindHydratableInstance=hydration.didNotFindHydratableInstance,didNotFindHydratableTextInstance=hydration.didNotFindHydratableTextInstance;// The deepest Fiber on the stack involved in a hydration context.
// This may have been an insertion or a hydration.
var hydrationParentFiber=null;var nextHydratableInstance=null;var isHydrating=false;function enterHydrationState(fiber){var parentInstance=fiber.stateNode.containerInfo;nextHydratableInstance=getFirstHydratableChild(parentInstance);hydrationParentFiber=fiber;isHydrating=true;return true;}function deleteHydratableInstance(returnFiber,instance){{switch(returnFiber.tag){case HostRoot:didNotHydrateContainerInstance(returnFiber.stateNode.containerInfo,instance);break;case HostComponent:didNotHydrateInstance(returnFiber.type,returnFiber.memoizedProps,returnFiber.stateNode,instance);break;}}var childToDelete=createFiberFromHostInstanceForDeletion();childToDelete.stateNode=instance;childToDelete['return']=returnFiber;childToDelete.effectTag=Deletion;// This might seem like it belongs on progressedFirstDeletion. However,
// these children are not part of the reconciliation list of children.
// Even if we abort and rereconcile the children, that will try to hydrate
// again and the nodes are still in the host tree so these will be
// recreated.
if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=childToDelete;returnFiber.lastEffect=childToDelete;}else{returnFiber.firstEffect=returnFiber.lastEffect=childToDelete;}}function insertNonHydratedInstance(returnFiber,fiber){fiber.effectTag|=Placement;{switch(returnFiber.tag){case HostRoot:{var parentContainer=returnFiber.stateNode.containerInfo;switch(fiber.tag){case HostComponent:var type=fiber.type;var props=fiber.pendingProps;didNotFindHydratableContainerInstance(parentContainer,type,props);break;case HostText:var text=fiber.pendingProps;didNotFindHydratableContainerTextInstance(parentContainer,text);break;}break;}case HostComponent:{var parentType=returnFiber.type;var parentProps=returnFiber.memoizedProps;var parentInstance=returnFiber.stateNode;switch(fiber.tag){case HostComponent:var _type=fiber.type;var _props=fiber.pendingProps;didNotFindHydratableInstance(parentType,parentProps,parentInstance,_type,_props);break;case HostText:var _text=fiber.pendingProps;didNotFindHydratableTextInstance(parentType,parentProps,parentInstance,_text);break;}break;}default:return;}}}function tryHydrate(fiber,nextInstance){switch(fiber.tag){case HostComponent:{var type=fiber.type;var props=fiber.pendingProps;var instance=canHydrateInstance(nextInstance,type,props);if(instance!==null){fiber.stateNode=instance;return true;}return false;}case HostText:{var text=fiber.pendingProps;var textInstance=canHydrateTextInstance(nextInstance,text);if(textInstance!==null){fiber.stateNode=textInstance;return true;}return false;}default:return false;}}function tryToClaimNextHydratableInstance(fiber){if(!isHydrating){return;}var nextInstance=nextHydratableInstance;if(!nextInstance){// Nothing to hydrate. Make it an insertion.
insertNonHydratedInstance(hydrationParentFiber,fiber);isHydrating=false;hydrationParentFiber=fiber;return;}if(!tryHydrate(fiber,nextInstance)){// If we can't hydrate this instance let's try the next one.
// We use this as a heuristic. It's based on intuition and not data so it
// might be flawed or unnecessary.
nextInstance=getNextHydratableSibling(nextInstance);if(!nextInstance||!tryHydrate(fiber,nextInstance)){// Nothing to hydrate. Make it an insertion.
insertNonHydratedInstance(hydrationParentFiber,fiber);isHydrating=false;hydrationParentFiber=fiber;return;}// We matched the next one, we'll now assume that the first one was
// superfluous and we'll delete it. Since we can't eagerly delete it
// we'll have to schedule a deletion. To do that, this node needs a dummy
// fiber associated with it.
deleteHydratableInstance(hydrationParentFiber,nextHydratableInstance);}hydrationParentFiber=fiber;nextHydratableInstance=getFirstHydratableChild(nextInstance);}function prepareToHydrateHostInstance(fiber,rootContainerInstance,hostContext){var instance=fiber.stateNode;var updatePayload=hydrateInstance(instance,fiber.type,fiber.memoizedProps,rootContainerInstance,hostContext,fiber);// TODO: Type this specific to this type of component.
fiber.updateQueue=updatePayload;// If the update payload indicates that there is a change or if there
// is a new ref we mark this as an update.
if(updatePayload!==null){return true;}return false;}function prepareToHydrateHostTextInstance(fiber){var textInstance=fiber.stateNode;var textContent=fiber.memoizedProps;var shouldUpdate=hydrateTextInstance(textInstance,textContent,fiber);{if(shouldUpdate){// We assume that prepareToHydrateHostTextInstance is called in a context where the
// hydration parent is the parent host component of this host text.
var returnFiber=hydrationParentFiber;if(returnFiber!==null){switch(returnFiber.tag){case HostRoot:{var parentContainer=returnFiber.stateNode.containerInfo;didNotMatchHydratedContainerTextInstance(parentContainer,textInstance,textContent);break;}case HostComponent:{var parentType=returnFiber.type;var parentProps=returnFiber.memoizedProps;var parentInstance=returnFiber.stateNode;didNotMatchHydratedTextInstance(parentType,parentProps,parentInstance,textInstance,textContent);break;}}}}}return shouldUpdate;}function popToNextHostParent(fiber){var parent=fiber['return'];while(parent!==null&&parent.tag!==HostComponent&&parent.tag!==HostRoot){parent=parent['return'];}hydrationParentFiber=parent;}function popHydrationState(fiber){if(fiber!==hydrationParentFiber){// We're deeper than the current hydration context, inside an inserted
// tree.
return false;}if(!isHydrating){// If we're not currently hydrating but we're in a hydration context, then
// we were an insertion and now need to pop up reenter hydration of our
// siblings.
popToNextHostParent(fiber);isHydrating=true;return false;}var type=fiber.type;// If we have any remaining hydratable nodes, we need to delete them now.
// We only do this deeper than head and body since they tend to have random
// other nodes in them. We also ignore components with pure text content in
// side of them.
// TODO: Better heuristic.
if(fiber.tag!==HostComponent||type!=='head'&&type!=='body'&&!shouldSetTextContent(type,fiber.memoizedProps)){var nextInstance=nextHydratableInstance;while(nextInstance){deleteHydratableInstance(fiber,nextInstance);nextInstance=getNextHydratableSibling(nextInstance);}}popToNextHostParent(fiber);nextHydratableInstance=hydrationParentFiber?getNextHydratableSibling(fiber.stateNode):null;return true;}function resetHydrationState(){hydrationParentFiber=null;nextHydratableInstance=null;isHydrating=false;}return{enterHydrationState:enterHydrationState,resetHydrationState:resetHydrationState,tryToClaimNextHydratableInstance:tryToClaimNextHydratableInstance,prepareToHydrateHostInstance:prepareToHydrateHostInstance,prepareToHydrateHostTextInstance:prepareToHydrateHostTextInstance,popHydrationState:popHydrationState};};// This lets us hook into Fiber to debug what it's doing.
// See https://github.com/facebook/react/pull/8033.
// This is not part of the public API, not even for React DevTools.
// You may only inject a debugTool if you work on React Fiber itself.
var ReactFiberInstrumentation={debugTool:null};var ReactFiberInstrumentation_1=ReactFiberInstrumentation;var defaultShowDialog=function defaultShowDialog(capturedError){return true;};var showDialog=defaultShowDialog;function logCapturedError(capturedError){var logError=showDialog(capturedError);// Allow injected showDialog() to prevent default console.error logging.
// This enables renderers like ReactNative to better manage redbox behavior.
if(logError===false){return;}var error=capturedError.error;var suppressLogging=error&&error.suppressReactErrorLogging;if(suppressLogging){return;}{var componentName=capturedError.componentName,componentStack=capturedError.componentStack,errorBoundaryName=capturedError.errorBoundaryName,errorBoundaryFound=capturedError.errorBoundaryFound,willRetry=capturedError.willRetry;var componentNameMessage=componentName?'The above error occurred in the <'+componentName+'> component:':'The above error occurred in one of your React components:';var errorBoundaryMessage=void 0;// errorBoundaryFound check is sufficient; errorBoundaryName check is to satisfy Flow.
if(errorBoundaryFound&&errorBoundaryName){if(willRetry){errorBoundaryMessage='React will try to recreate this component tree from scratch '+('using the error boundary you provided, '+errorBoundaryName+'.');}else{errorBoundaryMessage='This error was initially handled by the error boundary '+errorBoundaryName+'.\n'+'Recreating the tree from scratch failed so React will unmount the tree.';}}else{errorBoundaryMessage='Consider adding an error boundary to your tree to customize error handling behavior.\n'+'Visit https://fb.me/react-error-boundaries to learn more about error boundaries.';}var combinedMessage=''+componentNameMessage+componentStack+'\n\n'+(''+errorBoundaryMessage);// In development, we provide our own message with just the component stack.
// We don't include the original error message and JS stack because the browser
// has already printed it. Even if the application swallows the error, it is still
// displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
console.error(combinedMessage);}}var invokeGuardedCallback$1=ReactErrorUtils.invokeGuardedCallback;var hasCaughtError=ReactErrorUtils.hasCaughtError;var clearCaughtError=ReactErrorUtils.clearCaughtError;{var didWarnAboutStateTransition=false;var didWarnSetStateChildContext=false;var didWarnStateUpdateForUnmountedComponent={};var warnAboutUpdateOnUnmounted=function warnAboutUpdateOnUnmounted(fiber){var componentName=getComponentName(fiber)||'ReactClass';if(didWarnStateUpdateForUnmountedComponent[componentName]){return;}warning(false,'Can only update a mounted or mounting '+'component. This usually means you called setState, replaceState, '+'or forceUpdate on an unmounted component. This is a no-op.\n\nPlease '+'check the code for the %s component.',componentName);didWarnStateUpdateForUnmountedComponent[componentName]=true;};var warnAboutInvalidUpdates=function warnAboutInvalidUpdates(instance){switch(ReactDebugCurrentFiber.phase){case'getChildContext':if(didWarnSetStateChildContext){return;}warning(false,'setState(...): Cannot call setState() inside getChildContext()');didWarnSetStateChildContext=true;break;case'render':if(didWarnAboutStateTransition){return;}warning(false,'Cannot update during an existing state transition (such as within '+"`render` or another component's constructor). Render methods should "+'be a pure function of props and state; constructor side-effects are '+'an anti-pattern, but can be moved to `componentWillMount`.');didWarnAboutStateTransition=true;break;}};}var ReactFiberScheduler=function ReactFiberScheduler(config){var hostContext=ReactFiberHostContext(config);var hydrationContext=ReactFiberHydrationContext(config);var popHostContainer=hostContext.popHostContainer,popHostContext=hostContext.popHostContext,resetHostContainer=hostContext.resetHostContainer;var _ReactFiberBeginWork=ReactFiberBeginWork(config,hostContext,hydrationContext,scheduleWork,computeExpirationForFiber),beginWork=_ReactFiberBeginWork.beginWork,beginFailedWork=_ReactFiberBeginWork.beginFailedWork;var _ReactFiberCompleteWo=ReactFiberCompleteWork(config,hostContext,hydrationContext),completeWork=_ReactFiberCompleteWo.completeWork;var _ReactFiberCommitWork=ReactFiberCommitWork(config,captureError),commitResetTextContent=_ReactFiberCommitWork.commitResetTextContent,commitPlacement=_ReactFiberCommitWork.commitPlacement,commitDeletion=_ReactFiberCommitWork.commitDeletion,commitWork=_ReactFiberCommitWork.commitWork,commitLifeCycles=_ReactFiberCommitWork.commitLifeCycles,commitAttachRef=_ReactFiberCommitWork.commitAttachRef,commitDetachRef=_ReactFiberCommitWork.commitDetachRef;var now=config.now,scheduleDeferredCallback=config.scheduleDeferredCallback,cancelDeferredCallback=config.cancelDeferredCallback,useSyncScheduling=config.useSyncScheduling,prepareForCommit=config.prepareForCommit,resetAfterCommit=config.resetAfterCommit;// Represents the current time in ms.
var startTime=now();var mostRecentCurrentTime=msToExpirationTime(0);// Represents the expiration time that incoming updates should use. (If this
// is NoWork, use the default strategy: async updates in async mode, sync
// updates in sync mode.)
var expirationContext=NoWork;var isWorking=false;// The next work in progress fiber that we're currently working on.
var nextUnitOfWork=null;var nextRoot=null;// The time at which we're currently rendering work.
var nextRenderExpirationTime=NoWork;// The next fiber with an effect that we're currently committing.
var nextEffect=null;// Keep track of which fibers have captured an error that need to be handled.
// Work is removed from this collection after componentDidCatch is called.
var capturedErrors=null;// Keep track of which fibers have failed during the current batch of work.
// This is a different set than capturedErrors, because it is not reset until
// the end of the batch. This is needed to propagate errors correctly if a
// subtree fails more than once.
var failedBoundaries=null;// Error boundaries that captured an error during the current commit.
var commitPhaseBoundaries=null;var firstUncaughtError=null;var didFatal=false;var isCommitting=false;var isUnmounting=false;// Used for performance tracking.
var interruptedBy=null;function resetContextStack(){// Reset the stack
reset$1();// Reset the cursors
resetContext();resetHostContainer();}function commitAllHostEffects(){while(nextEffect!==null){{ReactDebugCurrentFiber.setCurrentFiber(nextEffect);}recordEffect();var effectTag=nextEffect.effectTag;if(effectTag&ContentReset){commitResetTextContent(nextEffect);}if(effectTag&Ref){var current=nextEffect.alternate;if(current!==null){commitDetachRef(current);}}// The following switch statement is only concerned about placement,
// updates, and deletions. To avoid needing to add a case for every
// possible bitmap value, we remove the secondary effects from the
// effect tag and switch on that value.
var primaryEffectTag=effectTag&~(Callback|Err|ContentReset|Ref|PerformedWork);switch(primaryEffectTag){case Placement:{commitPlacement(nextEffect);// Clear the "placement" from effect tag so that we know that this is inserted, before
// any life-cycles like componentDidMount gets called.
// TODO: findDOMNode doesn't rely on this any more but isMounted
// does and isMounted is deprecated anyway so we should be able
// to kill this.
nextEffect.effectTag&=~Placement;break;}case PlacementAndUpdate:{// Placement
commitPlacement(nextEffect);// Clear the "placement" from effect tag so that we know that this is inserted, before
// any life-cycles like componentDidMount gets called.
nextEffect.effectTag&=~Placement;// Update
var _current=nextEffect.alternate;commitWork(_current,nextEffect);break;}case Update:{var _current2=nextEffect.alternate;commitWork(_current2,nextEffect);break;}case Deletion:{isUnmounting=true;commitDeletion(nextEffect);isUnmounting=false;break;}}nextEffect=nextEffect.nextEffect;}{ReactDebugCurrentFiber.resetCurrentFiber();}}function commitAllLifeCycles(){while(nextEffect!==null){var effectTag=nextEffect.effectTag;if(effectTag&(Update|Callback)){recordEffect();var current=nextEffect.alternate;commitLifeCycles(current,nextEffect);}if(effectTag&Ref){recordEffect();commitAttachRef(nextEffect);}if(effectTag&Err){recordEffect();commitErrorHandling(nextEffect);}var next=nextEffect.nextEffect;// Ensure that we clean these up so that we don't accidentally keep them.
// I'm not actually sure this matters because we can't reset firstEffect
// and lastEffect since they're on every node, not just the effectful
// ones. So we have to clean everything as we reuse nodes anyway.
nextEffect.nextEffect=null;// Ensure that we reset the effectTag here so that we can rely on effect
// tags to reason about the current life-cycle.
nextEffect=next;}}function commitRoot(finishedWork){// We keep track of this so that captureError can collect any boundaries
// that capture an error during the commit phase. The reason these aren't
// local to this function is because errors that occur during cWU are
// captured elsewhere, to prevent the unmount from being interrupted.
isWorking=true;isCommitting=true;startCommitTimer();var root=finishedWork.stateNode;!(root.current!==finishedWork)?invariant(false,'Cannot commit the same tree as before. This is probably a bug related to the return field. This error is likely caused by a bug in React. Please file an issue.'):void 0;root.isReadyForCommit=false;// Reset this to null before calling lifecycles
ReactCurrentOwner.current=null;var firstEffect=void 0;if(finishedWork.effectTag>PerformedWork){// A fiber's effect list consists only of its children, not itself. So if
// the root has an effect, we need to add it to the end of the list. The
// resulting list is the set that would belong to the root's parent, if
// it had one; that is, all the effects in the tree including the root.
if(finishedWork.lastEffect!==null){finishedWork.lastEffect.nextEffect=finishedWork;firstEffect=finishedWork.firstEffect;}else{firstEffect=finishedWork;}}else{// There is no effect on the root.
firstEffect=finishedWork.firstEffect;}prepareForCommit();// Commit all the side-effects within a tree. We'll do this in two passes.
// The first pass performs all the host insertions, updates, deletions and
// ref unmounts.
nextEffect=firstEffect;startCommitHostEffectsTimer();while(nextEffect!==null){var didError=false;var _error=void 0;{invokeGuardedCallback$1(null,commitAllHostEffects,null);if(hasCaughtError()){didError=true;_error=clearCaughtError();}}if(didError){!(nextEffect!==null)?invariant(false,'Should have next effect. This error is likely caused by a bug in React. Please file an issue.'):void 0;captureError(nextEffect,_error);// Clean-up
if(nextEffect!==null){nextEffect=nextEffect.nextEffect;}}}stopCommitHostEffectsTimer();resetAfterCommit();// The work-in-progress tree is now the current tree. This must come after
// the first pass of the commit phase, so that the previous tree is still
// current during componentWillUnmount, but before the second pass, so that
// the finished work is current during componentDidMount/Update.
root.current=finishedWork;// In the second pass we'll perform all life-cycles and ref callbacks.
// Life-cycles happen as a separate pass so that all placements, updates,
// and deletions in the entire tree have already been invoked.
// This pass also triggers any renderer-specific initial effects.
nextEffect=firstEffect;startCommitLifeCyclesTimer();while(nextEffect!==null){var _didError=false;var _error2=void 0;{invokeGuardedCallback$1(null,commitAllLifeCycles,null);if(hasCaughtError()){_didError=true;_error2=clearCaughtError();}}if(_didError){!(nextEffect!==null)?invariant(false,'Should have next effect. This error is likely caused by a bug in React. Please file an issue.'):void 0;captureError(nextEffect,_error2);if(nextEffect!==null){nextEffect=nextEffect.nextEffect;}}}isCommitting=false;isWorking=false;stopCommitLifeCyclesTimer();stopCommitTimer();if(typeof onCommitRoot==='function'){onCommitRoot(finishedWork.stateNode);}if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCommitWork(finishedWork);}// If we caught any errors during this commit, schedule their boundaries
// to update.
if(commitPhaseBoundaries){commitPhaseBoundaries.forEach(scheduleErrorRecovery);commitPhaseBoundaries=null;}if(firstUncaughtError!==null){var _error3=firstUncaughtError;firstUncaughtError=null;onUncaughtError(_error3);}var remainingTime=root.current.expirationTime;if(remainingTime===NoWork){capturedErrors=null;failedBoundaries=null;}return remainingTime;}function resetExpirationTime(workInProgress,renderTime){if(renderTime!==Never&&workInProgress.expirationTime===Never){// The children of this component are hidden. Don't bubble their
// expiration times.
return;}// Check for pending updates.
var newExpirationTime=getUpdateExpirationTime(workInProgress);// TODO: Calls need to visit stateNode
// Bubble up the earliest expiration time.
var child=workInProgress.child;while(child!==null){if(child.expirationTime!==NoWork&&(newExpirationTime===NoWork||newExpirationTime>child.expirationTime)){newExpirationTime=child.expirationTime;}child=child.sibling;}workInProgress.expirationTime=newExpirationTime;}function completeUnitOfWork(workInProgress){while(true){// The current, flushed, state of this fiber is the alternate.
// Ideally nothing should rely on this, but relying on it here
// means that we don't need an additional field on the work in
// progress.
var current=workInProgress.alternate;{ReactDebugCurrentFiber.setCurrentFiber(workInProgress);}var next=completeWork(current,workInProgress,nextRenderExpirationTime);{ReactDebugCurrentFiber.resetCurrentFiber();}var returnFiber=workInProgress['return'];var siblingFiber=workInProgress.sibling;resetExpirationTime(workInProgress,nextRenderExpirationTime);if(next!==null){stopWorkTimer(workInProgress);if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);}// If completing this work spawned new work, do that next. We'll come
// back here again.
return next;}if(returnFiber!==null){// Append all the effects of the subtree and this fiber onto the effect
// list of the parent. The completion order of the children affects the
// side-effect order.
if(returnFiber.firstEffect===null){returnFiber.firstEffect=workInProgress.firstEffect;}if(workInProgress.lastEffect!==null){if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=workInProgress.firstEffect;}returnFiber.lastEffect=workInProgress.lastEffect;}// If this fiber had side-effects, we append it AFTER the children's
// side-effects. We can perform certain side-effects earlier if
// needed, by doing multiple passes over the effect list. We don't want
// to schedule our own side-effect on our own list because if end up
// reusing children we'll schedule this effect onto itself since we're
// at the end.
var effectTag=workInProgress.effectTag;// Skip both NoWork and PerformedWork tags when creating the effect list.
// PerformedWork effect is read by React DevTools but shouldn't be committed.
if(effectTag>PerformedWork){if(returnFiber.lastEffect!==null){returnFiber.lastEffect.nextEffect=workInProgress;}else{returnFiber.firstEffect=workInProgress;}returnFiber.lastEffect=workInProgress;}}stopWorkTimer(workInProgress);if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onCompleteWork(workInProgress);}if(siblingFiber!==null){// If there is more work to do in this returnFiber, do that next.
return siblingFiber;}else if(returnFiber!==null){// If there's no more work in this returnFiber. Complete the returnFiber.
workInProgress=returnFiber;continue;}else{// We've reached the root.
var root=workInProgress.stateNode;root.isReadyForCommit=true;return null;}}// Without this explicit null return Flow complains of invalid return type
// TODO Remove the above while(true) loop
// eslint-disable-next-line no-unreachable
return null;}function performUnitOfWork(workInProgress){// The current, flushed, state of this fiber is the alternate.
// Ideally nothing should rely on this, but relying on it here
// means that we don't need an additional field on the work in
// progress.
var current=workInProgress.alternate;// See if beginning this work spawns more work.
startWorkTimer(workInProgress);{ReactDebugCurrentFiber.setCurrentFiber(workInProgress);}var next=beginWork(current,workInProgress,nextRenderExpirationTime);{ReactDebugCurrentFiber.resetCurrentFiber();}if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);}if(next===null){// If this doesn't spawn new work, complete the current work.
next=completeUnitOfWork(workInProgress);}ReactCurrentOwner.current=null;return next;}function performFailedUnitOfWork(workInProgress){// The current, flushed, state of this fiber is the alternate.
// Ideally nothing should rely on this, but relying on it here
// means that we don't need an additional field on the work in
// progress.
var current=workInProgress.alternate;// See if beginning this work spawns more work.
startWorkTimer(workInProgress);{ReactDebugCurrentFiber.setCurrentFiber(workInProgress);}var next=beginFailedWork(current,workInProgress,nextRenderExpirationTime);{ReactDebugCurrentFiber.resetCurrentFiber();}if(true&&ReactFiberInstrumentation_1.debugTool){ReactFiberInstrumentation_1.debugTool.onBeginWork(workInProgress);}if(next===null){// If this doesn't spawn new work, complete the current work.
next=completeUnitOfWork(workInProgress);}ReactCurrentOwner.current=null;return next;}function workLoop(expirationTime){if(capturedErrors!==null){// If there are unhandled errors, switch to the slow work loop.
// TODO: How to avoid this check in the fast path? Maybe the renderer
// could keep track of which roots have unhandled errors and call a
// forked version of renderRoot.
slowWorkLoopThatChecksForFailedWork(expirationTime);return;}if(nextRenderExpirationTime===NoWork||nextRenderExpirationTime>expirationTime){return;}if(nextRenderExpirationTime<=mostRecentCurrentTime){// Flush all expired work.
while(nextUnitOfWork!==null){nextUnitOfWork=performUnitOfWork(nextUnitOfWork);}}else{// Flush asynchronous work until the deadline runs out of time.
while(nextUnitOfWork!==null&&!shouldYield()){nextUnitOfWork=performUnitOfWork(nextUnitOfWork);}}}function slowWorkLoopThatChecksForFailedWork(expirationTime){if(nextRenderExpirationTime===NoWork||nextRenderExpirationTime>expirationTime){return;}if(nextRenderExpirationTime<=mostRecentCurrentTime){// Flush all expired work.
while(nextUnitOfWork!==null){if(hasCapturedError(nextUnitOfWork)){// Use a forked version of performUnitOfWork
nextUnitOfWork=performFailedUnitOfWork(nextUnitOfWork);}else{nextUnitOfWork=performUnitOfWork(nextUnitOfWork);}}}else{// Flush asynchronous work until the deadline runs out of time.
while(nextUnitOfWork!==null&&!shouldYield()){if(hasCapturedError(nextUnitOfWork)){// Use a forked version of performUnitOfWork
nextUnitOfWork=performFailedUnitOfWork(nextUnitOfWork);}else{nextUnitOfWork=performUnitOfWork(nextUnitOfWork);}}}}function renderRootCatchBlock(root,failedWork,boundary,expirationTime){// We're going to restart the error boundary that captured the error.
// Conceptually, we're unwinding the stack. We need to unwind the
// context stack, too.
unwindContexts(failedWork,boundary);// Restart the error boundary using a forked version of
// performUnitOfWork that deletes the boundary's children. The entire
// failed subree will be unmounted. During the commit phase, a special
// lifecycle method is called on the error boundary, which triggers
// a re-render.
nextUnitOfWork=performFailedUnitOfWork(boundary);// Continue working.
workLoop(expirationTime);}function renderRoot(root,expirationTime){!!isWorking?invariant(false,'renderRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.'):void 0;isWorking=true;// We're about to mutate the work-in-progress tree. If the root was pending
// commit, it no longer is: we'll need to complete it again.
root.isReadyForCommit=false;// Check if we're starting from a fresh stack, or if we're resuming from
// previously yielded work.
if(root!==nextRoot||expirationTime!==nextRenderExpirationTime||nextUnitOfWork===null){// Reset the stack and start working from the root.
resetContextStack();nextRoot=root;nextRenderExpirationTime=expirationTime;nextUnitOfWork=createWorkInProgress(nextRoot.current,null,expirationTime);}startWorkLoopTimer(nextUnitOfWork);var didError=false;var error=null;{invokeGuardedCallback$1(null,workLoop,null,expirationTime);if(hasCaughtError()){didError=true;error=clearCaughtError();}}// An error was thrown during the render phase.
while(didError){if(didFatal){// This was a fatal error. Don't attempt to recover from it.
firstUncaughtError=error;break;}var failedWork=nextUnitOfWork;if(failedWork===null){// An error was thrown but there's no current unit of work. This can
// happen during the commit phase if there's a bug in the renderer.
didFatal=true;continue;}// "Capture" the error by finding the nearest boundary. If there is no
// error boundary, we use the root.
var boundary=captureError(failedWork,error);!(boundary!==null)?invariant(false,'Should have found an error boundary. This error is likely caused by a bug in React. Please file an issue.'):void 0;if(didFatal){// The error we just captured was a fatal error. This happens
// when the error propagates to the root more than once.
continue;}didError=false;error=null;{invokeGuardedCallback$1(null,renderRootCatchBlock,null,root,failedWork,boundary,expirationTime);if(hasCaughtError()){didError=true;error=clearCaughtError();continue;}}// We're finished working. Exit the error loop.
break;}var uncaughtError=firstUncaughtError;// We're done performing work. Time to clean up.
stopWorkLoopTimer(interruptedBy);interruptedBy=null;isWorking=false;didFatal=false;firstUncaughtError=null;if(uncaughtError!==null){onUncaughtError(uncaughtError);}return root.isReadyForCommit?root.current.alternate:null;}// Returns the boundary that captured the error, or null if the error is ignored
function captureError(failedWork,error){// It is no longer valid because we exited the user code.
ReactCurrentOwner.current=null;{ReactDebugCurrentFiber.resetCurrentFiber();}// Search for the nearest error boundary.
var boundary=null;// Passed to logCapturedError()
var errorBoundaryFound=false;var willRetry=false;var errorBoundaryName=null;// Host containers are a special case. If the failed work itself is a host
// container, then it acts as its own boundary. In all other cases, we
// ignore the work itself and only search through the parents.
if(failedWork.tag===HostRoot){boundary=failedWork;if(isFailedBoundary(failedWork)){// If this root already failed, there must have been an error when
// attempting to unmount it. This is a worst-case scenario and
// should only be possible if there's a bug in the renderer.
didFatal=true;}}else{var node=failedWork['return'];while(node!==null&&boundary===null){if(node.tag===ClassComponent){var instance=node.stateNode;if(typeof instance.componentDidCatch==='function'){errorBoundaryFound=true;errorBoundaryName=getComponentName(node);// Found an error boundary!
boundary=node;willRetry=true;}}else if(node.tag===HostRoot){// Treat the root like a no-op error boundary
boundary=node;}if(isFailedBoundary(node)){// This boundary is already in a failed state.
// If we're currently unmounting, that means this error was
// thrown while unmounting a failed subtree. We should ignore
// the error.
if(isUnmounting){return null;}// If we're in the commit phase, we should check to see if
// this boundary already captured an error during this commit.
// This case exists because multiple errors can be thrown during
// a single commit without interruption.
if(commitPhaseBoundaries!==null&&(commitPhaseBoundaries.has(node)||node.alternate!==null&&commitPhaseBoundaries.has(node.alternate))){// If so, we should ignore this error.
return null;}// The error should propagate to the next boundary -— we keep looking.
boundary=null;willRetry=false;}node=node['return'];}}if(boundary!==null){// Add to the collection of failed boundaries. This lets us know that
// subsequent errors in this subtree should propagate to the next boundary.
if(failedBoundaries===null){failedBoundaries=new Set();}failedBoundaries.add(boundary);// This method is unsafe outside of the begin and complete phases.
// We might be in the commit phase when an error is captured.
// The risk is that the return path from this Fiber may not be accurate.
// That risk is acceptable given the benefit of providing users more context.
var _componentStack=getStackAddendumByWorkInProgressFiber(failedWork);var _componentName=getComponentName(failedWork);// Add to the collection of captured errors. This is stored as a global
// map of errors and their component stack location keyed by the boundaries
// that capture them. We mostly use this Map as a Set; it's a Map only to
// avoid adding a field to Fiber to store the error.
if(capturedErrors===null){capturedErrors=new Map();}var capturedError={componentName:_componentName,componentStack:_componentStack,error:error,errorBoundary:errorBoundaryFound?boundary.stateNode:null,errorBoundaryFound:errorBoundaryFound,errorBoundaryName:errorBoundaryName,willRetry:willRetry};capturedErrors.set(boundary,capturedError);try{logCapturedError(capturedError);}catch(e){// Prevent cycle if logCapturedError() throws.
// A cycle may still occur if logCapturedError renders a component that throws.
var suppressLogging=e&&e.suppressReactErrorLogging;if(!suppressLogging){console.error(e);}}// If we're in the commit phase, defer scheduling an update on the
// boundary until after the commit is complete
if(isCommitting){if(commitPhaseBoundaries===null){commitPhaseBoundaries=new Set();}commitPhaseBoundaries.add(boundary);}else{// Otherwise, schedule an update now.
// TODO: Is this actually necessary during the render phase? Is it
// possible to unwind and continue rendering at the same priority,
// without corrupting internal state?
scheduleErrorRecovery(boundary);}return boundary;}else if(firstUncaughtError===null){// If no boundary is found, we'll need to throw the error
firstUncaughtError=error;}return null;}function hasCapturedError(fiber){// TODO: capturedErrors should store the boundary instance, to avoid needing
// to check the alternate.
return capturedErrors!==null&&(capturedErrors.has(fiber)||fiber.alternate!==null&&capturedErrors.has(fiber.alternate));}function isFailedBoundary(fiber){// TODO: failedBoundaries should store the boundary instance, to avoid
// needing to check the alternate.
return failedBoundaries!==null&&(failedBoundaries.has(fiber)||fiber.alternate!==null&&failedBoundaries.has(fiber.alternate));}function commitErrorHandling(effectfulFiber){var capturedError=void 0;if(capturedErrors!==null){capturedError=capturedErrors.get(effectfulFiber);capturedErrors['delete'](effectfulFiber);if(capturedError==null){if(effectfulFiber.alternate!==null){effectfulFiber=effectfulFiber.alternate;capturedError=capturedErrors.get(effectfulFiber);capturedErrors['delete'](effectfulFiber);}}}!(capturedError!=null)?invariant(false,'No error for given unit of work. This error is likely caused by a bug in React. Please file an issue.'):void 0;switch(effectfulFiber.tag){case ClassComponent:var instance=effectfulFiber.stateNode;var info={componentStack:capturedError.componentStack};// Allow the boundary to handle the error, usually by scheduling
// an update to itself
instance.componentDidCatch(capturedError.error,info);return;case HostRoot:if(firstUncaughtError===null){firstUncaughtError=capturedError.error;}return;default:invariant(false,'Invalid type of work. This error is likely caused by a bug in React. Please file an issue.');}}function unwindContexts(from,to){var node=from;while(node!==null){switch(node.tag){case ClassComponent:popContextProvider(node);break;case HostComponent:popHostContext(node);break;case HostRoot:popHostContainer(node);break;case HostPortal:popHostContainer(node);break;}if(node===to||node.alternate===to){stopFailedWorkTimer(node);break;}else{stopWorkTimer(node);}node=node['return'];}}function computeAsyncExpiration(){// Given the current clock time, returns an expiration time. We use rounding
// to batch like updates together.
// Should complete within ~1000ms. 1200ms max.
var currentTime=recalculateCurrentTime();var expirationMs=1000;var bucketSizeMs=200;return computeExpirationBucket(currentTime,expirationMs,bucketSizeMs);}function computeExpirationForFiber(fiber){var expirationTime=void 0;if(expirationContext!==NoWork){// An explicit expiration context was set;
expirationTime=expirationContext;}else if(isWorking){if(isCommitting){// Updates that occur during the commit phase should have sync priority
// by default.
expirationTime=Sync;}else{// Updates during the render phase should expire at the same time as
// the work that is being rendered.
expirationTime=nextRenderExpirationTime;}}else{// No explicit expiration context was set, and we're not currently
// performing work. Calculate a new expiration time.
if(useSyncScheduling&&!(fiber.internalContextTag&AsyncUpdates)){// This is a sync update
expirationTime=Sync;}else{// This is an async update
expirationTime=computeAsyncExpiration();}}return expirationTime;}function scheduleWork(fiber,expirationTime){return scheduleWorkImpl(fiber,expirationTime,false);}function checkRootNeedsClearing(root,fiber,expirationTime){if(!isWorking&&root===nextRoot&&expirationTime<nextRenderExpirationTime){// Restart the root from the top.
if(nextUnitOfWork!==null){// This is an interruption. (Used for performance tracking.)
interruptedBy=fiber;}nextRoot=null;nextUnitOfWork=null;nextRenderExpirationTime=NoWork;}}function scheduleWorkImpl(fiber,expirationTime,isErrorRecovery){recordScheduleUpdate();{if(!isErrorRecovery&&fiber.tag===ClassComponent){var instance=fiber.stateNode;warnAboutInvalidUpdates(instance);}}var node=fiber;while(node!==null){// Walk the parent path to the root and update each node's
// expiration time.
if(node.expirationTime===NoWork||node.expirationTime>expirationTime){node.expirationTime=expirationTime;}if(node.alternate!==null){if(node.alternate.expirationTime===NoWork||node.alternate.expirationTime>expirationTime){node.alternate.expirationTime=expirationTime;}}if(node['return']===null){if(node.tag===HostRoot){var root=node.stateNode;checkRootNeedsClearing(root,fiber,expirationTime);requestWork(root,expirationTime);checkRootNeedsClearing(root,fiber,expirationTime);}else{{if(!isErrorRecovery&&fiber.tag===ClassComponent){warnAboutUpdateOnUnmounted(fiber);}}return;}}node=node['return'];}}function scheduleErrorRecovery(fiber){scheduleWorkImpl(fiber,Sync,true);}function recalculateCurrentTime(){// Subtract initial time so it fits inside 32bits
var ms=now()-startTime;mostRecentCurrentTime=msToExpirationTime(ms);return mostRecentCurrentTime;}function deferredUpdates(fn){var previousExpirationContext=expirationContext;expirationContext=computeAsyncExpiration();try{return fn();}finally{expirationContext=previousExpirationContext;}}function syncUpdates(fn){var previousExpirationContext=expirationContext;expirationContext=Sync;try{return fn();}finally{expirationContext=previousExpirationContext;}}// TODO: Everything below this is written as if it has been lifted to the
// renderers. I'll do this in a follow-up.
// Linked-list of roots
var firstScheduledRoot=null;var lastScheduledRoot=null;var callbackExpirationTime=NoWork;var callbackID=-1;var isRendering=false;var nextFlushedRoot=null;var nextFlushedExpirationTime=NoWork;var deadlineDidExpire=false;var hasUnhandledError=false;var unhandledError=null;var deadline=null;var isBatchingUpdates=false;var isUnbatchingUpdates=false;// Use these to prevent an infinite loop of nested updates
var NESTED_UPDATE_LIMIT=1000;var nestedUpdateCount=0;var timeHeuristicForUnitOfWork=1;function scheduleCallbackWithExpiration(expirationTime){if(callbackExpirationTime!==NoWork){// A callback is already scheduled. Check its expiration time (timeout).
if(expirationTime>callbackExpirationTime){// Existing callback has sufficient timeout. Exit.
return;}else{// Existing callback has insufficient timeout. Cancel and schedule a
// new one.
cancelDeferredCallback(callbackID);}// The request callback timer is already running. Don't start a new one.
}else{startRequestCallbackTimer();}// Compute a timeout for the given expiration time.
var currentMs=now()-startTime;var expirationMs=expirationTimeToMs(expirationTime);var timeout=expirationMs-currentMs;callbackExpirationTime=expirationTime;callbackID=scheduleDeferredCallback(performAsyncWork,{timeout:timeout});}// requestWork is called by the scheduler whenever a root receives an update.
// It's up to the renderer to call renderRoot at some point in the future.
function requestWork(root,expirationTime){if(nestedUpdateCount>NESTED_UPDATE_LIMIT){invariant(false,'Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.');}// Add the root to the schedule.
// Check if this root is already part of the schedule.
if(root.nextScheduledRoot===null){// This root is not already scheduled. Add it.
root.remainingExpirationTime=expirationTime;if(lastScheduledRoot===null){firstScheduledRoot=lastScheduledRoot=root;root.nextScheduledRoot=root;}else{lastScheduledRoot.nextScheduledRoot=root;lastScheduledRoot=root;lastScheduledRoot.nextScheduledRoot=firstScheduledRoot;}}else{// This root is already scheduled, but its priority may have increased.
var remainingExpirationTime=root.remainingExpirationTime;if(remainingExpirationTime===NoWork||expirationTime<remainingExpirationTime){// Update the priority.
root.remainingExpirationTime=expirationTime;}}if(isRendering){// Prevent reentrancy. Remaining work will be scheduled at the end of
// the currently rendering batch.
return;}if(isBatchingUpdates){// Flush work at the end of the batch.
if(isUnbatchingUpdates){// ...unless we're inside unbatchedUpdates, in which case we should
// flush it now.
nextFlushedRoot=root;nextFlushedExpirationTime=Sync;performWorkOnRoot(nextFlushedRoot,nextFlushedExpirationTime);}return;}// TODO: Get rid of Sync and use current time?
if(expirationTime===Sync){performWork(Sync,null);}else{scheduleCallbackWithExpiration(expirationTime);}}function findHighestPriorityRoot(){var highestPriorityWork=NoWork;var highestPriorityRoot=null;if(lastScheduledRoot!==null){var previousScheduledRoot=lastScheduledRoot;var root=firstScheduledRoot;while(root!==null){var remainingExpirationTime=root.remainingExpirationTime;if(remainingExpirationTime===NoWork){// This root no longer has work. Remove it from the scheduler.
// TODO: This check is redudant, but Flow is confused by the branch
// below where we set lastScheduledRoot to null, even though we break
// from the loop right after.
!(previousScheduledRoot!==null&&lastScheduledRoot!==null)?invariant(false,'Should have a previous and last root. This error is likely caused by a bug in React. Please file an issue.'):void 0;if(root===root.nextScheduledRoot){// This is the only root in the list.
root.nextScheduledRoot=null;firstScheduledRoot=lastScheduledRoot=null;break;}else if(root===firstScheduledRoot){// This is the first root in the list.
var next=root.nextScheduledRoot;firstScheduledRoot=next;lastScheduledRoot.nextScheduledRoot=next;root.nextScheduledRoot=null;}else if(root===lastScheduledRoot){// This is the last root in the list.
lastScheduledRoot=previousScheduledRoot;lastScheduledRoot.nextScheduledRoot=firstScheduledRoot;root.nextScheduledRoot=null;break;}else{previousScheduledRoot.nextScheduledRoot=root.nextScheduledRoot;root.nextScheduledRoot=null;}root=previousScheduledRoot.nextScheduledRoot;}else{if(highestPriorityWork===NoWork||remainingExpirationTime<highestPriorityWork){// Update the priority, if it's higher
highestPriorityWork=remainingExpirationTime;highestPriorityRoot=root;}if(root===lastScheduledRoot){break;}previousScheduledRoot=root;root=root.nextScheduledRoot;}}}// If the next root is the same as the previous root, this is a nested
// update. To prevent an infinite loop, increment the nested update count.
var previousFlushedRoot=nextFlushedRoot;if(previousFlushedRoot!==null&&previousFlushedRoot===highestPriorityRoot){nestedUpdateCount++;}else{// Reset whenever we switch roots.
nestedUpdateCount=0;}nextFlushedRoot=highestPriorityRoot;nextFlushedExpirationTime=highestPriorityWork;}function performAsyncWork(dl){performWork(NoWork,dl);}function performWork(minExpirationTime,dl){deadline=dl;// Keep working on roots until there's no more work, or until the we reach
// the deadline.
findHighestPriorityRoot();if(enableUserTimingAPI&&deadline!==null){var didExpire=nextFlushedExpirationTime<recalculateCurrentTime();stopRequestCallbackTimer(didExpire);}while(nextFlushedRoot!==null&&nextFlushedExpirationTime!==NoWork&&(minExpirationTime===NoWork||nextFlushedExpirationTime<=minExpirationTime)&&!deadlineDidExpire){performWorkOnRoot(nextFlushedRoot,nextFlushedExpirationTime);// Find the next highest priority work.
findHighestPriorityRoot();}// We're done flushing work. Either we ran out of time in this callback,
// or there's no more work left with sufficient priority.
// If we're inside a callback, set this to false since we just completed it.
if(deadline!==null){callbackExpirationTime=NoWork;callbackID=-1;}// If there's work left over, schedule a new callback.
if(nextFlushedExpirationTime!==NoWork){scheduleCallbackWithExpiration(nextFlushedExpirationTime);}// Clean-up.
deadline=null;deadlineDidExpire=false;nestedUpdateCount=0;if(hasUnhandledError){var _error4=unhandledError;unhandledError=null;hasUnhandledError=false;throw _error4;}}function performWorkOnRoot(root,expirationTime){!!isRendering?invariant(false,'performWorkOnRoot was called recursively. This error is likely caused by a bug in React. Please file an issue.'):void 0;isRendering=true;// Check if this is async work or sync/expired work.
// TODO: Pass current time as argument to renderRoot, commitRoot
if(expirationTime<=recalculateCurrentTime()){// Flush sync work.
var finishedWork=root.finishedWork;if(finishedWork!==null){// This root is already complete. We can commit it.
root.finishedWork=null;root.remainingExpirationTime=commitRoot(finishedWork);}else{root.finishedWork=null;finishedWork=renderRoot(root,expirationTime);if(finishedWork!==null){// We've completed the root. Commit it.
root.remainingExpirationTime=commitRoot(finishedWork);}}}else{// Flush async work.
var _finishedWork=root.finishedWork;if(_finishedWork!==null){// This root is already complete. We can commit it.
root.finishedWork=null;root.remainingExpirationTime=commitRoot(_finishedWork);}else{root.finishedWork=null;_finishedWork=renderRoot(root,expirationTime);if(_finishedWork!==null){// We've completed the root. Check the deadline one more time
// before committing.
if(!shouldYield()){// Still time left. Commit the root.
root.remainingExpirationTime=commitRoot(_finishedWork);}else{// There's no time left. Mark this root as complete. We'll come
// back and commit it later.
root.finishedWork=_finishedWork;}}}}isRendering=false;}// When working on async work, the reconciler asks the renderer if it should
// yield execution. For DOM, we implement this with requestIdleCallback.
function shouldYield(){if(deadline===null){return false;}if(deadline.timeRemaining()>timeHeuristicForUnitOfWork){// Disregard deadline.didTimeout. Only expired work should be flushed
// during a timeout. This path is only hit for non-expired work.
return false;}deadlineDidExpire=true;return true;}// TODO: Not happy about this hook. Conceptually, renderRoot should return a
// tuple of (isReadyForCommit, didError, error)
function onUncaughtError(error){!(nextFlushedRoot!==null)?invariant(false,'Should be working on a root. This error is likely caused by a bug in React. Please file an issue.'):void 0;// Unschedule this root so we don't work on it again until there's
// another update.
nextFlushedRoot.remainingExpirationTime=NoWork;if(!hasUnhandledError){hasUnhandledError=true;unhandledError=error;}}// TODO: Batching should be implemented at the renderer level, not inside
// the reconciler.
function batchedUpdates(fn,a){var previousIsBatchingUpdates=isBatchingUpdates;isBatchingUpdates=true;try{return fn(a);}finally{isBatchingUpdates=previousIsBatchingUpdates;if(!isBatchingUpdates&&!isRendering){performWork(Sync,null);}}}// TODO: Batching should be implemented at the renderer level, not inside
// the reconciler.
function unbatchedUpdates(fn){if(isBatchingUpdates&&!isUnbatchingUpdates){isUnbatchingUpdates=true;try{return fn();}finally{isUnbatchingUpdates=false;}}return fn();}// TODO: Batching should be implemented at the renderer level, not within
// the reconciler.
function flushSync(fn){var previousIsBatchingUpdates=isBatchingUpdates;isBatchingUpdates=true;try{return syncUpdates(fn);}finally{isBatchingUpdates=previousIsBatchingUpdates;!!isRendering?invariant(false,'flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering.'):void 0;performWork(Sync,null);}}return{computeAsyncExpiration:computeAsyncExpiration,computeExpirationForFiber:computeExpirationForFiber,scheduleWork:scheduleWork,batchedUpdates:batchedUpdates,unbatchedUpdates:unbatchedUpdates,flushSync:flushSync,deferredUpdates:deferredUpdates};};{var didWarnAboutNestedUpdates=false;}// 0 is PROD, 1 is DEV.
// Might add PROFILE later.
function getContextForSubtree(parentComponent){if(!parentComponent){return emptyObject;}var fiber=get(parentComponent);var parentContext=findCurrentUnmaskedContext(fiber);return isContextProvider(fiber)?processChildContext(fiber,parentContext):parentContext;}var ReactFiberReconciler$1=function ReactFiberReconciler$1(config){var getPublicInstance=config.getPublicInstance;var _ReactFiberScheduler=ReactFiberScheduler(config),computeAsyncExpiration=_ReactFiberScheduler.computeAsyncExpiration,computeExpirationForFiber=_ReactFiberScheduler.computeExpirationForFiber,scheduleWork=_ReactFiberScheduler.scheduleWork,batchedUpdates=_ReactFiberScheduler.batchedUpdates,unbatchedUpdates=_ReactFiberScheduler.unbatchedUpdates,flushSync=_ReactFiberScheduler.flushSync,deferredUpdates=_ReactFiberScheduler.deferredUpdates;function scheduleTopLevelUpdate(current,element,callback){{if(ReactDebugCurrentFiber.phase==='render'&&ReactDebugCurrentFiber.current!==null&&!didWarnAboutNestedUpdates){didWarnAboutNestedUpdates=true;warning(false,'Render methods should be a pure function of props and state; '+'triggering nested component updates from render is not allowed. '+'If necessary, trigger nested updates in componentDidUpdate.\n\n'+'Check the render method of %s.',getComponentName(ReactDebugCurrentFiber.current)||'Unknown');}}callback=callback===undefined?null:callback;{warning(callback===null||typeof callback==='function','render(...): Expected the last optional `callback` argument to be a '+'function. Instead received: %s.',callback);}var expirationTime=void 0;// Check if the top-level element is an async wrapper component. If so,
// treat updates to the root as async. This is a bit weird but lets us
// avoid a separate `renderAsync` API.
if(enableAsyncSubtreeAPI&&element!=null&&element.type!=null&&element.type.prototype!=null&&element.type.prototype.unstable_isAsyncReactComponent===true){expirationTime=computeAsyncExpiration();}else{expirationTime=computeExpirationForFiber(current);}var update={expirationTime:expirationTime,partialState:{element:element},callback:callback,isReplace:false,isForced:false,nextCallback:null,next:null};insertUpdateIntoFiber(current,update);scheduleWork(current,expirationTime);}function findHostInstance(fiber){var hostFiber=findCurrentHostFiber(fiber);if(hostFiber===null){return null;}return hostFiber.stateNode;}return{createContainer:function createContainer(containerInfo,hydrate){return createFiberRoot(containerInfo,hydrate);},updateContainer:function updateContainer(element,container,parentComponent,callback){// TODO: If this is a nested container, this won't be the root.
var current=container.current;{if(ReactFiberInstrumentation_1.debugTool){if(current.alternate===null){ReactFiberInstrumentation_1.debugTool.onMountContainer(container);}else if(element===null){ReactFiberInstrumentation_1.debugTool.onUnmountContainer(container);}else{ReactFiberInstrumentation_1.debugTool.onUpdateContainer(container);}}}var context=getContextForSubtree(parentComponent);if(container.context===null){container.context=context;}else{container.pendingContext=context;}scheduleTopLevelUpdate(current,element,callback);},batchedUpdates:batchedUpdates,unbatchedUpdates:unbatchedUpdates,deferredUpdates:deferredUpdates,flushSync:flushSync,getPublicRootInstance:function getPublicRootInstance(container){var containerFiber=container.current;if(!containerFiber.child){return null;}switch(containerFiber.child.tag){case HostComponent:return getPublicInstance(containerFiber.child.stateNode);default:return containerFiber.child.stateNode;}},findHostInstance:findHostInstance,findHostInstanceWithNoPortals:function findHostInstanceWithNoPortals(fiber){var hostFiber=findCurrentHostFiberWithNoPortals(fiber);if(hostFiber===null){return null;}return hostFiber.stateNode;},injectIntoDevTools:function injectIntoDevTools(devToolsConfig){var _findFiberByHostInstance=devToolsConfig.findFiberByHostInstance;return injectInternals(_assign({},devToolsConfig,{findHostInstanceByFiber:function findHostInstanceByFiber(fiber){return findHostInstance(fiber);},findFiberByHostInstance:function findFiberByHostInstance(instance){if(!_findFiberByHostInstance){// Might not be implemented by the renderer.
return null;}return _findFiberByHostInstance(instance);}}));}};};var ReactFiberReconciler$2=Object.freeze({default:ReactFiberReconciler$1});var ReactFiberReconciler$3=ReactFiberReconciler$2&&ReactFiberReconciler$1||ReactFiberReconciler$2;// TODO: bundle Flow types with the package.
// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var reactReconciler=ReactFiberReconciler$3['default']?ReactFiberReconciler$3['default']:ReactFiberReconciler$3;function createPortal$1(children,containerInfo,// TODO: figure out the API for cross-renderer implementation.
implementation){var key=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;return{// This tag allow us to uniquely identify this as a React Portal
$$typeof:REACT_PORTAL_TYPE,key:key==null?null:''+key,children:children,containerInfo:containerInfo,implementation:implementation};}// TODO: this is special because it gets imported during build.
var ReactVersion='16.2.0';// a requestAnimationFrame, storing the time for the start of the frame, then
// scheduling a postMessage which gets scheduled after paint. Within the
// postMessage handler do as much work as possible until time + frame rate.
// By separating the idle call into a separate event tick we ensure that
// layout, paint and other browser work is counted against the available time.
// The frame rate is dynamically adjusted.
{if(ExecutionEnvironment.canUseDOM&&typeof requestAnimationFrame!=='function'){warning(false,'React depends on requestAnimationFrame. Make sure that you load a '+'polyfill in older browsers. http://fb.me/react-polyfills');}}var hasNativePerformanceNow=(typeof performance==='undefined'?'undefined':_typeof(performance))==='object'&&typeof performance.now==='function';var now=void 0;if(hasNativePerformanceNow){now=function now(){return performance.now();};}else{now=function now(){return Date.now();};}// TODO: There's no way to cancel, because Fiber doesn't atm.
var rIC=void 0;var cIC=void 0;if(!ExecutionEnvironment.canUseDOM){rIC=function rIC(frameCallback){return setTimeout(function(){frameCallback({timeRemaining:function timeRemaining(){return Infinity;}});});};cIC=function cIC(timeoutID){clearTimeout(timeoutID);};}else if(typeof requestIdleCallback!=='function'||typeof cancelIdleCallback!=='function'){// Polyfill requestIdleCallback and cancelIdleCallback
var scheduledRICCallback=null;var isIdleScheduled=false;var timeoutTime=-1;var isAnimationFrameScheduled=false;var frameDeadline=0;// We start out assuming that we run at 30fps but then the heuristic tracking
// will adjust this value to a faster fps if we get more frequent animation
// frames.
var previousFrameTime=33;var activeFrameTime=33;var frameDeadlineObject;if(hasNativePerformanceNow){frameDeadlineObject={didTimeout:false,timeRemaining:function timeRemaining(){// We assume that if we have a performance timer that the rAF callback
// gets a performance timer value. Not sure if this is always true.
var remaining=frameDeadline-performance.now();return remaining>0?remaining:0;}};}else{frameDeadlineObject={didTimeout:false,timeRemaining:function timeRemaining(){// Fallback to Date.now()
var remaining=frameDeadline-Date.now();return remaining>0?remaining:0;}};}// We use the postMessage trick to defer idle work until after the repaint.
var messageKey='__reactIdleCallback$'+Math.random().toString(36).slice(2);var idleTick=function idleTick(event){if(event.source!==window||event.data!==messageKey){return;}isIdleScheduled=false;var currentTime=now();if(frameDeadline-currentTime<=0){// There's no time left in this idle period. Check if the callback has
// a timeout and whether it's been exceeded.
if(timeoutTime!==-1&&timeoutTime<=currentTime){// Exceeded the timeout. Invoke the callback even though there's no
// time left.
frameDeadlineObject.didTimeout=true;}else{// No timeout.
if(!isAnimationFrameScheduled){// Schedule another animation callback so we retry later.
isAnimationFrameScheduled=true;requestAnimationFrame(animationTick);}// Exit without invoking the callback.
return;}}else{// There's still time left in this idle period.
frameDeadlineObject.didTimeout=false;}timeoutTime=-1;var callback=scheduledRICCallback;scheduledRICCallback=null;if(callback!==null){callback(frameDeadlineObject);}};// Assumes that we have addEventListener in this environment. Might need
// something better for old IE.
window.addEventListener('message',idleTick,false);var animationTick=function animationTick(rafTime){isAnimationFrameScheduled=false;var nextFrameTime=rafTime-frameDeadline+activeFrameTime;if(nextFrameTime<activeFrameTime&&previousFrameTime<activeFrameTime){if(nextFrameTime<8){// Defensive coding. We don't support higher frame rates than 120hz.
// If we get lower than that, it is probably a bug.
nextFrameTime=8;}// If one frame goes long, then the next one can be short to catch up.
// If two frames are short in a row, then that's an indication that we
// actually have a higher frame rate than what we're currently optimizing.
// We adjust our heuristic dynamically accordingly. For example, if we're
// running on 120hz display or 90hz VR display.
// Take the max of the two in case one of them was an anomaly due to
// missed frame deadlines.
activeFrameTime=nextFrameTime<previousFrameTime?previousFrameTime:nextFrameTime;}else{previousFrameTime=nextFrameTime;}frameDeadline=rafTime+activeFrameTime;if(!isIdleScheduled){isIdleScheduled=true;window.postMessage(messageKey,'*');}};rIC=function rIC(callback,options){// This assumes that we only schedule one callback at a time because that's
// how Fiber uses it.
scheduledRICCallback=callback;if(options!=null&&typeof options.timeout==='number'){timeoutTime=now()+options.timeout;}if(!isAnimationFrameScheduled){// If rAF didn't already schedule one, we need to schedule a frame.
// TODO: If this rAF doesn't materialize because the browser throttles, we
// might want to still have setTimeout trigger rIC as a backup to ensure
// that we keep performing work.
isAnimationFrameScheduled=true;requestAnimationFrame(animationTick);}return 0;};cIC=function cIC(){scheduledRICCallback=null;isIdleScheduled=false;timeoutTime=-1;};}else{rIC=window.requestIdleCallback;cIC=window.cancelIdleCallback;}/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */var lowPriorityWarning=function lowPriorityWarning(){};{var printWarning=function printWarning(format){for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key];}var argIndex=0;var message='Warning: '+format.replace(/%s/g,function(){return args[argIndex++];});if(typeof console!=='undefined'){console.warn(message);}try{// --- Welcome to debugging React ---
// This error was thrown as a convenience so that you can use this stack
// to find the callsite that caused this warning to fire.
throw new Error(message);}catch(x){}};lowPriorityWarning=function lowPriorityWarning(condition,format){if(format===undefined){throw new Error('`warning(condition, format, ...args)` requires a warning '+'message argument');}if(!condition){for(var _len2=arguments.length,args=Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){args[_key2-2]=arguments[_key2];}printWarning.apply(undefined,[format].concat(args));}};}var lowPriorityWarning$1=lowPriorityWarning;// isAttributeNameSafe() is currently duplicated in DOMMarkupOperations.
// TODO: Find a better place for this.
var VALID_ATTRIBUTE_NAME_REGEX=new RegExp('^['+ATTRIBUTE_NAME_START_CHAR+']['+ATTRIBUTE_NAME_CHAR+']*$');var illegalAttributeNameCache={};var validatedAttributeNameCache={};function isAttributeNameSafe(attributeName){if(validatedAttributeNameCache.hasOwnProperty(attributeName)){return true;}if(illegalAttributeNameCache.hasOwnProperty(attributeName)){return false;}if(VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)){validatedAttributeNameCache[attributeName]=true;return true;}illegalAttributeNameCache[attributeName]=true;{warning(false,'Invalid attribute name: `%s`',attributeName);}return false;}// shouldIgnoreValue() is currently duplicated in DOMMarkupOperations.
// TODO: Find a better place for this.
function shouldIgnoreValue(propertyInfo,value){return value==null||propertyInfo.hasBooleanValue&&!value||propertyInfo.hasNumericValue&&isNaN(value)||propertyInfo.hasPositiveNumericValue&&value<1||propertyInfo.hasOverloadedBooleanValue&&value===false;}/**
 * Operations for dealing with DOM properties.
 *//**
 * Get the value for a property on a node. Only used in DEV for SSR validation.
 * The "expected" argument is used as a hint of what the expected value is.
 * Some properties have multiple equivalent values.
 */function getValueForProperty(node,name,expected){{var propertyInfo=getPropertyInfo(name);if(propertyInfo){var mutationMethod=propertyInfo.mutationMethod;if(mutationMethod||propertyInfo.mustUseProperty){return node[propertyInfo.propertyName];}else{var attributeName=propertyInfo.attributeName;var stringValue=null;if(propertyInfo.hasOverloadedBooleanValue){if(node.hasAttribute(attributeName)){var value=node.getAttribute(attributeName);if(value===''){return true;}if(shouldIgnoreValue(propertyInfo,expected)){return value;}if(value===''+expected){return expected;}return value;}}else if(node.hasAttribute(attributeName)){if(shouldIgnoreValue(propertyInfo,expected)){// We had an attribute but shouldn't have had one, so read it
// for the error message.
return node.getAttribute(attributeName);}if(propertyInfo.hasBooleanValue){// If this was a boolean, it doesn't matter what the value is
// the fact that we have it is the same as the expected.
return expected;}// Even if this property uses a namespace we use getAttribute
// because we assume its namespaced name is the same as our config.
// To use getAttributeNS we need the local name which we don't have
// in our config atm.
stringValue=node.getAttribute(attributeName);}if(shouldIgnoreValue(propertyInfo,expected)){return stringValue===null?expected:stringValue;}else if(stringValue===''+expected){return expected;}else{return stringValue;}}}}}/**
 * Get the value for a attribute on a node. Only used in DEV for SSR validation.
 * The third argument is used as a hint of what the expected value is. Some
 * attributes have multiple equivalent values.
 */function getValueForAttribute(node,name,expected){{if(!isAttributeNameSafe(name)){return;}if(!node.hasAttribute(name)){return expected===undefined?undefined:null;}var value=node.getAttribute(name);if(value===''+expected){return expected;}return value;}}/**
 * Sets the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 * @param {*} value
 */function setValueForProperty(node,name,value){var propertyInfo=getPropertyInfo(name);if(propertyInfo&&shouldSetAttribute(name,value)){var mutationMethod=propertyInfo.mutationMethod;if(mutationMethod){mutationMethod(node,value);}else if(shouldIgnoreValue(propertyInfo,value)){deleteValueForProperty(node,name);return;}else if(propertyInfo.mustUseProperty){// Contrary to `setAttribute`, object properties are properly
// `toString`ed by IE8/9.
node[propertyInfo.propertyName]=value;}else{var attributeName=propertyInfo.attributeName;var namespace=propertyInfo.attributeNamespace;// `setAttribute` with objects becomes only `[object]` in IE8/9,
// ('' + value) makes it output the correct toString()-value.
if(namespace){node.setAttributeNS(namespace,attributeName,''+value);}else if(propertyInfo.hasBooleanValue||propertyInfo.hasOverloadedBooleanValue&&value===true){node.setAttribute(attributeName,'');}else{node.setAttribute(attributeName,''+value);}}}else{setValueForAttribute(node,name,shouldSetAttribute(name,value)?value:null);return;}{}}function setValueForAttribute(node,name,value){if(!isAttributeNameSafe(name)){return;}if(value==null){node.removeAttribute(name);}else{node.setAttribute(name,''+value);}{}}/**
 * Deletes an attributes from a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 */function deleteValueForAttribute(node,name){node.removeAttribute(name);}/**
 * Deletes the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 */function deleteValueForProperty(node,name){var propertyInfo=getPropertyInfo(name);if(propertyInfo){var mutationMethod=propertyInfo.mutationMethod;if(mutationMethod){mutationMethod(node,undefined);}else if(propertyInfo.mustUseProperty){var propName=propertyInfo.propertyName;if(propertyInfo.hasBooleanValue){node[propName]=false;}else{node[propName]='';}}else{node.removeAttribute(propertyInfo.attributeName);}}else{node.removeAttribute(name);}}var ReactControlledValuePropTypes={checkPropTypes:null};{var hasReadOnlyValue={button:true,checkbox:true,image:true,hidden:true,radio:true,reset:true,submit:true};var propTypes={value:function value(props,propName,componentName){if(!props[propName]||hasReadOnlyValue[props.type]||props.onChange||props.readOnly||props.disabled){return null;}return new Error('You provided a `value` prop to a form field without an '+'`onChange` handler. This will render a read-only field. If '+'the field should be mutable use `defaultValue`. Otherwise, '+'set either `onChange` or `readOnly`.');},checked:function checked(props,propName,componentName){if(!props[propName]||props.onChange||props.readOnly||props.disabled){return null;}return new Error('You provided a `checked` prop to a form field without an '+'`onChange` handler. This will render a read-only field. If '+'the field should be mutable use `defaultChecked`. Otherwise, '+'set either `onChange` or `readOnly`.');}};/**
   * Provide a linked `value` attribute for controlled forms. You should not use
   * this outside of the ReactDOM controlled form components.
   */ReactControlledValuePropTypes.checkPropTypes=function(tagName,props,getStack){checkPropTypes(propTypes,props,'prop',tagName,getStack);};}// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$2=ReactDebugCurrentFiber.getCurrentFiberOwnerName;var getCurrentFiberStackAddendum$3=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;var didWarnValueDefaultValue=false;var didWarnCheckedDefaultChecked=false;var didWarnControlledToUncontrolled=false;var didWarnUncontrolledToControlled=false;function isControlled(props){var usesChecked=props.type==='checkbox'||props.type==='radio';return usesChecked?props.checked!=null:props.value!=null;}/**
 * Implements an <input> host component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * See http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */function getHostProps(element,props){var node=element;var value=props.value;var checked=props.checked;var hostProps=_assign({// Make sure we set .type before any other properties (setting .value
// before .type means .value is lost in IE11 and below)
type:undefined,// Make sure we set .step before .value (setting .value before .step
// means .value is rounded on mount, based upon step precision)
step:undefined,// Make sure we set .min & .max before .value (to ensure proper order
// in corner cases such as min or max deriving from value, e.g. Issue #7170)
min:undefined,max:undefined},props,{defaultChecked:undefined,defaultValue:undefined,value:value!=null?value:node._wrapperState.initialValue,checked:checked!=null?checked:node._wrapperState.initialChecked});return hostProps;}function initWrapperState(element,props){{ReactControlledValuePropTypes.checkPropTypes('input',props,getCurrentFiberStackAddendum$3);if(props.checked!==undefined&&props.defaultChecked!==undefined&&!didWarnCheckedDefaultChecked){warning(false,'%s contains an input of type %s with both checked and defaultChecked props. '+'Input elements must be either controlled or uncontrolled '+'(specify either the checked prop, or the defaultChecked prop, but not '+'both). Decide between using a controlled or uncontrolled input '+'element and remove one of these props. More info: '+'https://fb.me/react-controlled-components',getCurrentFiberOwnerName$2()||'A component',props.type);didWarnCheckedDefaultChecked=true;}if(props.value!==undefined&&props.defaultValue!==undefined&&!didWarnValueDefaultValue){warning(false,'%s contains an input of type %s with both value and defaultValue props. '+'Input elements must be either controlled or uncontrolled '+'(specify either the value prop, or the defaultValue prop, but not '+'both). Decide between using a controlled or uncontrolled input '+'element and remove one of these props. More info: '+'https://fb.me/react-controlled-components',getCurrentFiberOwnerName$2()||'A component',props.type);didWarnValueDefaultValue=true;}}var defaultValue=props.defaultValue;var node=element;node._wrapperState={initialChecked:props.checked!=null?props.checked:props.defaultChecked,initialValue:props.value!=null?props.value:defaultValue,controlled:isControlled(props)};}function updateChecked(element,props){var node=element;var checked=props.checked;if(checked!=null){setValueForProperty(node,'checked',checked);}}function updateWrapper(element,props){var node=element;{var controlled=isControlled(props);if(!node._wrapperState.controlled&&controlled&&!didWarnUncontrolledToControlled){warning(false,'A component is changing an uncontrolled input of type %s to be controlled. '+'Input elements should not switch from uncontrolled to controlled (or vice versa). '+'Decide between using a controlled or uncontrolled input '+'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s',props.type,getCurrentFiberStackAddendum$3());didWarnUncontrolledToControlled=true;}if(node._wrapperState.controlled&&!controlled&&!didWarnControlledToUncontrolled){warning(false,'A component is changing a controlled input of type %s to be uncontrolled. '+'Input elements should not switch from controlled to uncontrolled (or vice versa). '+'Decide between using a controlled or uncontrolled input '+'element for the lifetime of the component. More info: https://fb.me/react-controlled-components%s',props.type,getCurrentFiberStackAddendum$3());didWarnControlledToUncontrolled=true;}}updateChecked(element,props);var value=props.value;if(value!=null){if(value===0&&node.value===''){node.value='0';// Note: IE9 reports a number inputs as 'text', so check props instead.
}else if(props.type==='number'){// Simulate `input.valueAsNumber`. IE9 does not support it
var valueAsNumber=parseFloat(node.value)||0;if(// eslint-disable-next-line
value!=valueAsNumber||// eslint-disable-next-line
value==valueAsNumber&&node.value!=value){// Cast `value` to a string to ensure the value is set correctly. While
// browsers typically do this as necessary, jsdom doesn't.
node.value=''+value;}}else if(node.value!==''+value){// Cast `value` to a string to ensure the value is set correctly. While
// browsers typically do this as necessary, jsdom doesn't.
node.value=''+value;}}else{if(props.value==null&&props.defaultValue!=null){// In Chrome, assigning defaultValue to certain input types triggers input validation.
// For number inputs, the display value loses trailing decimal points. For email inputs,
// Chrome raises "The specified value <x> is not a valid email address".
//
// Here we check to see if the defaultValue has actually changed, avoiding these problems
// when the user is inputting text
//
// https://github.com/facebook/react/issues/7253
if(node.defaultValue!==''+props.defaultValue){node.defaultValue=''+props.defaultValue;}}if(props.checked==null&&props.defaultChecked!=null){node.defaultChecked=!!props.defaultChecked;}}}function postMountWrapper(element,props){var node=element;// Detach value from defaultValue. We won't do anything if we're working on
// submit or reset inputs as those values & defaultValues are linked. They
// are not resetable nodes so this operation doesn't matter and actually
// removes browser-default values (eg "Submit Query") when no value is
// provided.
switch(props.type){case'submit':case'reset':break;case'color':case'date':case'datetime':case'datetime-local':case'month':case'time':case'week':// This fixes the no-show issue on iOS Safari and Android Chrome:
// https://github.com/facebook/react/issues/7233
node.value='';node.value=node.defaultValue;break;default:node.value=node.value;break;}// Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
// this is needed to work around a chrome bug where setting defaultChecked
// will sometimes influence the value of checked (even after detachment).
// Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
// We need to temporarily unset name to avoid disrupting radio button groups.
var name=node.name;if(name!==''){node.name='';}node.defaultChecked=!node.defaultChecked;node.defaultChecked=!node.defaultChecked;if(name!==''){node.name=name;}}function restoreControlledState$1(element,props){var node=element;updateWrapper(node,props);updateNamedCousins(node,props);}function updateNamedCousins(rootNode,props){var name=props.name;if(props.type==='radio'&&name!=null){var queryRoot=rootNode;while(queryRoot.parentNode){queryRoot=queryRoot.parentNode;}// If `rootNode.form` was non-null, then we could try `form.elements`,
// but that sometimes behaves strangely in IE8. We could also try using
// `form.getElementsByName`, but that will only return direct children
// and won't include inputs that use the HTML5 `form=` attribute. Since
// the input might not even be in a form. It might not even be in the
// document. Let's just use the local `querySelectorAll` to ensure we don't
// miss anything.
var group=queryRoot.querySelectorAll('input[name='+JSON.stringify(''+name)+'][type="radio"]');for(var i=0;i<group.length;i++){var otherNode=group[i];if(otherNode===rootNode||otherNode.form!==rootNode.form){continue;}// This will throw if radio buttons rendered by different copies of React
// and the same name are rendered into the same form (same as #1939).
// That's probably okay; we don't support it just as we don't support
// mixing React radio buttons with non-React ones.
var otherProps=getFiberCurrentPropsFromNode$1(otherNode);!otherProps?invariant(false,'ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.'):void 0;// We need update the tracked value on the named cousin since the value
// was changed but the input saw no event or value set
updateValueIfChanged(otherNode);// If this is a controlled radio button group, forcing the input that
// was previously checked to update will cause it to be come re-checked
// as appropriate.
updateWrapper(otherNode,otherProps);}}}function flattenChildren(children){var content='';// Flatten children and warn if they aren't strings or numbers;
// invalid types are ignored.
// We can silently skip them because invalid DOM nesting warning
// catches these cases in Fiber.
React.Children.forEach(children,function(child){if(child==null){return;}if(typeof child==='string'||typeof child==='number'){content+=child;}});return content;}/**
 * Implements an <option> host component that warns when `selected` is set.
 */function validateProps(element,props){// TODO (yungsters): Remove support for `selected` in <option>.
{warning(props.selected==null,'Use the `defaultValue` or `value` props on <select> instead of '+'setting `selected` on <option>.');}}function postMountWrapper$1(element,props){// value="" should make a value attribute (#6219)
if(props.value!=null){element.setAttribute('value',props.value);}}function getHostProps$1(element,props){var hostProps=_assign({children:undefined},props);var content=flattenChildren(props.children);if(content){hostProps.children=content;}return hostProps;}// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$3=ReactDebugCurrentFiber.getCurrentFiberOwnerName;var getCurrentFiberStackAddendum$4=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;{var didWarnValueDefaultValue$1=false;}function getDeclarationErrorAddendum(){var ownerName=getCurrentFiberOwnerName$3();if(ownerName){return'\n\nCheck the render method of `'+ownerName+'`.';}return'';}var valuePropNames=['value','defaultValue'];/**
 * Validation function for `value` and `defaultValue`.
 */function checkSelectPropTypes(props){ReactControlledValuePropTypes.checkPropTypes('select',props,getCurrentFiberStackAddendum$4);for(var i=0;i<valuePropNames.length;i++){var propName=valuePropNames[i];if(props[propName]==null){continue;}var isArray=Array.isArray(props[propName]);if(props.multiple&&!isArray){warning(false,'The `%s` prop supplied to <select> must be an array if '+'`multiple` is true.%s',propName,getDeclarationErrorAddendum());}else if(!props.multiple&&isArray){warning(false,'The `%s` prop supplied to <select> must be a scalar '+'value if `multiple` is false.%s',propName,getDeclarationErrorAddendum());}}}function updateOptions(node,multiple,propValue,setDefaultSelected){var options=node.options;if(multiple){var selectedValues=propValue;var selectedValue={};for(var i=0;i<selectedValues.length;i++){// Prefix to avoid chaos with special keys.
selectedValue['$'+selectedValues[i]]=true;}for(var _i=0;_i<options.length;_i++){var selected=selectedValue.hasOwnProperty('$'+options[_i].value);if(options[_i].selected!==selected){options[_i].selected=selected;}if(selected&&setDefaultSelected){options[_i].defaultSelected=true;}}}else{// Do not set `select.value` as exact behavior isn't consistent across all
// browsers for all cases.
var _selectedValue=''+propValue;var defaultSelected=null;for(var _i2=0;_i2<options.length;_i2++){if(options[_i2].value===_selectedValue){options[_i2].selected=true;if(setDefaultSelected){options[_i2].defaultSelected=true;}return;}if(defaultSelected===null&&!options[_i2].disabled){defaultSelected=options[_i2];}}if(defaultSelected!==null){defaultSelected.selected=true;}}}/**
 * Implements a <select> host component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * stringable. If `multiple` is true, the prop must be an array of stringables.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */function getHostProps$2(element,props){return _assign({},props,{value:undefined});}function initWrapperState$1(element,props){var node=element;{checkSelectPropTypes(props);}var value=props.value;node._wrapperState={initialValue:value!=null?value:props.defaultValue,wasMultiple:!!props.multiple};{if(props.value!==undefined&&props.defaultValue!==undefined&&!didWarnValueDefaultValue$1){warning(false,'Select elements must be either controlled or uncontrolled '+'(specify either the value prop, or the defaultValue prop, but not '+'both). Decide between using a controlled or uncontrolled select '+'element and remove one of these props. More info: '+'https://fb.me/react-controlled-components');didWarnValueDefaultValue$1=true;}}}function postMountWrapper$2(element,props){var node=element;node.multiple=!!props.multiple;var value=props.value;if(value!=null){updateOptions(node,!!props.multiple,value,false);}else if(props.defaultValue!=null){updateOptions(node,!!props.multiple,props.defaultValue,true);}}function postUpdateWrapper(element,props){var node=element;// After the initial mount, we control selected-ness manually so don't pass
// this value down
node._wrapperState.initialValue=undefined;var wasMultiple=node._wrapperState.wasMultiple;node._wrapperState.wasMultiple=!!props.multiple;var value=props.value;if(value!=null){updateOptions(node,!!props.multiple,value,false);}else if(wasMultiple!==!!props.multiple){// For simplicity, reapply `defaultValue` if `multiple` is toggled.
if(props.defaultValue!=null){updateOptions(node,!!props.multiple,props.defaultValue,true);}else{// Revert the select back to its default unselected state.
updateOptions(node,!!props.multiple,props.multiple?[]:'',false);}}}function restoreControlledState$2(element,props){var node=element;var value=props.value;if(value!=null){updateOptions(node,!!props.multiple,value,false);}}// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberStackAddendum$5=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;var didWarnValDefaultVal=false;/**
 * Implements a <textarea> host component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */function getHostProps$3(element,props){var node=element;!(props.dangerouslySetInnerHTML==null)?invariant(false,'`dangerouslySetInnerHTML` does not make sense on <textarea>.'):void 0;// Always set children to the same thing. In IE9, the selection range will
// get reset if `textContent` is mutated.  We could add a check in setTextContent
// to only set the value if/when the value differs from the node value (which would
// completely solve this IE9 bug), but Sebastian+Sophie seemed to like this
// solution. The value can be a boolean or object so that's why it's forced
// to be a string.
var hostProps=_assign({},props,{value:undefined,defaultValue:undefined,children:''+node._wrapperState.initialValue});return hostProps;}function initWrapperState$2(element,props){var node=element;{ReactControlledValuePropTypes.checkPropTypes('textarea',props,getCurrentFiberStackAddendum$5);if(props.value!==undefined&&props.defaultValue!==undefined&&!didWarnValDefaultVal){warning(false,'Textarea elements must be either controlled or uncontrolled '+'(specify either the value prop, or the defaultValue prop, but not '+'both). Decide between using a controlled or uncontrolled textarea '+'and remove one of these props. More info: '+'https://fb.me/react-controlled-components');didWarnValDefaultVal=true;}}var initialValue=props.value;// Only bother fetching default value if we're going to use it
if(initialValue==null){var defaultValue=props.defaultValue;// TODO (yungsters): Remove support for children content in <textarea>.
var children=props.children;if(children!=null){{warning(false,'Use the `defaultValue` or `value` props instead of setting '+'children on <textarea>.');}!(defaultValue==null)?invariant(false,'If you supply `defaultValue` on a <textarea>, do not pass children.'):void 0;if(Array.isArray(children)){!(children.length<=1)?invariant(false,'<textarea> can only have at most one child.'):void 0;children=children[0];}defaultValue=''+children;}if(defaultValue==null){defaultValue='';}initialValue=defaultValue;}node._wrapperState={initialValue:''+initialValue};}function updateWrapper$1(element,props){var node=element;var value=props.value;if(value!=null){// Cast `value` to a string to ensure the value is set correctly. While
// browsers typically do this as necessary, jsdom doesn't.
var newValue=''+value;// To avoid side effects (such as losing text selection), only set value if changed
if(newValue!==node.value){node.value=newValue;}if(props.defaultValue==null){node.defaultValue=newValue;}}if(props.defaultValue!=null){node.defaultValue=props.defaultValue;}}function postMountWrapper$3(element,props){var node=element;// This is in postMount because we need access to the DOM node, which is not
// available until after the component has mounted.
var textContent=node.textContent;// Only set node.value if textContent is equal to the expected
// initial value. In IE10/IE11 there is a bug where the placeholder attribute
// will populate textContent as well.
// https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
if(textContent===node._wrapperState.initialValue){node.value=textContent;}}function restoreControlledState$3(element,props){// DOM component is still mounted; update
updateWrapper$1(element,props);}var HTML_NAMESPACE$1='http://www.w3.org/1999/xhtml';var MATH_NAMESPACE='http://www.w3.org/1998/Math/MathML';var SVG_NAMESPACE='http://www.w3.org/2000/svg';var Namespaces={html:HTML_NAMESPACE$1,mathml:MATH_NAMESPACE,svg:SVG_NAMESPACE};// Assumes there is no parent namespace.
function getIntrinsicNamespace(type){switch(type){case'svg':return SVG_NAMESPACE;case'math':return MATH_NAMESPACE;default:return HTML_NAMESPACE$1;}}function getChildNamespace(parentNamespace,type){if(parentNamespace==null||parentNamespace===HTML_NAMESPACE$1){// No (or default) parent namespace: potential entry point.
return getIntrinsicNamespace(type);}if(parentNamespace===SVG_NAMESPACE&&type==='foreignObject'){// We're leaving SVG.
return HTML_NAMESPACE$1;}// By default, pass namespace below.
return parentNamespace;}/* globals MSApp *//**
 * Create a function which has 'unsafe' privileges (required by windows8 apps)
 */var createMicrosoftUnsafeLocalFunction=function createMicrosoftUnsafeLocalFunction(func){if(typeof MSApp!=='undefined'&&MSApp.execUnsafeLocalFunction){return function(arg0,arg1,arg2,arg3){MSApp.execUnsafeLocalFunction(function(){return func(arg0,arg1,arg2,arg3);});};}else{return func;}};// SVG temp container for IE lacking innerHTML
var reusableSVGContainer=void 0;/**
 * Set the innerHTML property of a node
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */var setInnerHTML=createMicrosoftUnsafeLocalFunction(function(node,html){// IE does not have innerHTML for SVG nodes, so instead we inject the
// new markup in a temp node and then move the child nodes across into
// the target node
if(node.namespaceURI===Namespaces.svg&&!('innerHTML'in node)){reusableSVGContainer=reusableSVGContainer||document.createElement('div');reusableSVGContainer.innerHTML='<svg>'+html+'</svg>';var svgNode=reusableSVGContainer.firstChild;while(node.firstChild){node.removeChild(node.firstChild);}while(svgNode.firstChild){node.appendChild(svgNode.firstChild);}}else{node.innerHTML=html;}});/**
 * Set the textContent property of a node, ensuring that whitespace is preserved
 * even in IE8. innerText is a poor substitute for textContent and, among many
 * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
 * as it should.
 *
 * @param {DOMElement} node
 * @param {string} text
 * @internal
 */var setTextContent=function setTextContent(node,text){if(text){var firstChild=node.firstChild;if(firstChild&&firstChild===node.lastChild&&firstChild.nodeType===TEXT_NODE){firstChild.nodeValue=text;return;}}node.textContent=text;};/**
 * CSS properties which accept numbers but are not in units of "px".
 */var isUnitlessNumber={animationIterationCount:true,borderImageOutset:true,borderImageSlice:true,borderImageWidth:true,boxFlex:true,boxFlexGroup:true,boxOrdinalGroup:true,columnCount:true,columns:true,flex:true,flexGrow:true,flexPositive:true,flexShrink:true,flexNegative:true,flexOrder:true,gridRow:true,gridRowEnd:true,gridRowSpan:true,gridRowStart:true,gridColumn:true,gridColumnEnd:true,gridColumnSpan:true,gridColumnStart:true,fontWeight:true,lineClamp:true,lineHeight:true,opacity:true,order:true,orphans:true,tabSize:true,widows:true,zIndex:true,zoom:true,// SVG-related properties
fillOpacity:true,floodOpacity:true,stopOpacity:true,strokeDasharray:true,strokeDashoffset:true,strokeMiterlimit:true,strokeOpacity:true,strokeWidth:true};/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */function prefixKey(prefix,key){return prefix+key.charAt(0).toUpperCase()+key.substring(1);}/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */var prefixes=['Webkit','ms','Moz','O'];// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
// infinite loop, because it iterates over the newly added props too.
Object.keys(isUnitlessNumber).forEach(function(prop){prefixes.forEach(function(prefix){isUnitlessNumber[prefixKey(prefix,prop)]=isUnitlessNumber[prop];});});/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */function dangerousStyleValue(name,value,isCustomProperty){// Note that we've removed escapeTextForBrowser() calls here since the
// whole string will be escaped when the attribute is injected into
// the markup. If you provide unsafe user data here they can inject
// arbitrary CSS which may be problematic (I couldn't repro this):
// https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
// http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
// This is not an XSS hole but instead a potential CSS injection issue
// which has lead to a greater discussion about how we're going to
// trust URLs moving forward. See #2115901
var isEmpty=value==null||typeof value==='boolean'||value==='';if(isEmpty){return'';}if(!isCustomProperty&&typeof value==='number'&&value!==0&&!(isUnitlessNumber.hasOwnProperty(name)&&isUnitlessNumber[name])){return value+'px';// Presumes implicit 'px' suffix for unitless numbers
}return(''+value).trim();}var warnValidStyle=emptyFunction;{// 'msTransform' is correct, but the other prefixes should be capitalized
var badVendoredStyleNamePattern=/^(?:webkit|moz|o)[A-Z]/;// style values shouldn't contain a semicolon
var badStyleValueWithSemicolonPattern=/;\s*$/;var warnedStyleNames={};var warnedStyleValues={};var warnedForNaNValue=false;var warnedForInfinityValue=false;var warnHyphenatedStyleName=function warnHyphenatedStyleName(name,getStack){if(warnedStyleNames.hasOwnProperty(name)&&warnedStyleNames[name]){return;}warnedStyleNames[name]=true;warning(false,'Unsupported style property %s. Did you mean %s?%s',name,camelizeStyleName(name),getStack());};var warnBadVendoredStyleName=function warnBadVendoredStyleName(name,getStack){if(warnedStyleNames.hasOwnProperty(name)&&warnedStyleNames[name]){return;}warnedStyleNames[name]=true;warning(false,'Unsupported vendor-prefixed style property %s. Did you mean %s?%s',name,name.charAt(0).toUpperCase()+name.slice(1),getStack());};var warnStyleValueWithSemicolon=function warnStyleValueWithSemicolon(name,value,getStack){if(warnedStyleValues.hasOwnProperty(value)&&warnedStyleValues[value]){return;}warnedStyleValues[value]=true;warning(false,"Style property values shouldn't contain a semicolon. "+'Try "%s: %s" instead.%s',name,value.replace(badStyleValueWithSemicolonPattern,''),getStack());};var warnStyleValueIsNaN=function warnStyleValueIsNaN(name,value,getStack){if(warnedForNaNValue){return;}warnedForNaNValue=true;warning(false,'`NaN` is an invalid value for the `%s` css style property.%s',name,getStack());};var warnStyleValueIsInfinity=function warnStyleValueIsInfinity(name,value,getStack){if(warnedForInfinityValue){return;}warnedForInfinityValue=true;warning(false,'`Infinity` is an invalid value for the `%s` css style property.%s',name,getStack());};warnValidStyle=function warnValidStyle(name,value,getStack){if(name.indexOf('-')>-1){warnHyphenatedStyleName(name,getStack);}else if(badVendoredStyleNamePattern.test(name)){warnBadVendoredStyleName(name,getStack);}else if(badStyleValueWithSemicolonPattern.test(value)){warnStyleValueWithSemicolon(name,value,getStack);}if(typeof value==='number'){if(isNaN(value)){warnStyleValueIsNaN(name,value,getStack);}else if(!isFinite(value)){warnStyleValueIsInfinity(name,value,getStack);}}};}var warnValidStyle$1=warnValidStyle;/**
 * Operations for dealing with CSS properties.
 *//**
 * This creates a string that is expected to be equivalent to the style
 * attribute generated by server-side rendering. It by-passes warnings and
 * security checks so it's not safe to use this value for anything other than
 * comparison. It is only used in DEV for SSR validation.
 */function createDangerousStringForStyles(styles){{var serialized='';var delimiter='';for(var styleName in styles){if(!styles.hasOwnProperty(styleName)){continue;}var styleValue=styles[styleName];if(styleValue!=null){var isCustomProperty=styleName.indexOf('--')===0;serialized+=delimiter+hyphenateStyleName(styleName)+':';serialized+=dangerousStyleValue(styleName,styleValue,isCustomProperty);delimiter=';';}}return serialized||null;}}/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} node
 * @param {object} styles
 */function setValueForStyles(node,styles,getStack){var style=node.style;for(var styleName in styles){if(!styles.hasOwnProperty(styleName)){continue;}var isCustomProperty=styleName.indexOf('--')===0;{if(!isCustomProperty){warnValidStyle$1(styleName,styles[styleName],getStack);}}var styleValue=dangerousStyleValue(styleName,styles[styleName],isCustomProperty);if(styleName==='float'){styleName='cssFloat';}if(isCustomProperty){style.setProperty(styleName,styleValue);}else{style[styleName]=styleValue;}}}// For HTML, certain tags should omit their close tag. We keep a whitelist for
// those special-case tags.
var omittedCloseTags={area:true,base:true,br:true,col:true,embed:true,hr:true,img:true,input:true,keygen:true,link:true,meta:true,param:true,source:true,track:true,wbr:true};// For HTML, certain tags cannot have children. This has the same purpose as
// `omittedCloseTags` except that `menuitem` should still have its closing tag.
var voidElementTags=_assign({menuitem:true},omittedCloseTags);var HTML$1='__html';function assertValidProps(tag,props,getStack){if(!props){return;}// Note the use of `==` which checks for null or undefined.
if(voidElementTags[tag]){!(props.children==null&&props.dangerouslySetInnerHTML==null)?invariant(false,'%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s',tag,getStack()):void 0;}if(props.dangerouslySetInnerHTML!=null){!(props.children==null)?invariant(false,'Can only set one of `children` or `props.dangerouslySetInnerHTML`.'):void 0;!(_typeof(props.dangerouslySetInnerHTML)==='object'&&HTML$1 in props.dangerouslySetInnerHTML)?invariant(false,'`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.'):void 0;}{warning(props.suppressContentEditableWarning||!props.contentEditable||props.children==null,'A component is `contentEditable` and contains `children` managed by '+'React. It is now your responsibility to guarantee that none of '+'those nodes are unexpectedly modified or duplicated. This is '+'probably not intentional.%s',getStack());}!(props.style==null||_typeof(props.style)==='object')?invariant(false,'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s',getStack()):void 0;}function isCustomComponent(tagName,props){if(tagName.indexOf('-')===-1){return typeof props.is==='string';}switch(tagName){// These are reserved SVG and MathML elements.
// We don't mind this whitelist too much because we expect it to never grow.
// The alternative is to track the namespace in a few places which is convoluted.
// https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
case'annotation-xml':case'color-profile':case'font-face':case'font-face-src':case'font-face-uri':case'font-face-format':case'font-face-name':case'missing-glyph':return false;default:return true;}}var ariaProperties={'aria-current':0,// state
'aria-details':0,'aria-disabled':0,// state
'aria-hidden':0,// state
'aria-invalid':0,// state
'aria-keyshortcuts':0,'aria-label':0,'aria-roledescription':0,// Widget Attributes
'aria-autocomplete':0,'aria-checked':0,'aria-expanded':0,'aria-haspopup':0,'aria-level':0,'aria-modal':0,'aria-multiline':0,'aria-multiselectable':0,'aria-orientation':0,'aria-placeholder':0,'aria-pressed':0,'aria-readonly':0,'aria-required':0,'aria-selected':0,'aria-sort':0,'aria-valuemax':0,'aria-valuemin':0,'aria-valuenow':0,'aria-valuetext':0,// Live Region Attributes
'aria-atomic':0,'aria-busy':0,'aria-live':0,'aria-relevant':0,// Drag-and-Drop Attributes
'aria-dropeffect':0,'aria-grabbed':0,// Relationship Attributes
'aria-activedescendant':0,'aria-colcount':0,'aria-colindex':0,'aria-colspan':0,'aria-controls':0,'aria-describedby':0,'aria-errormessage':0,'aria-flowto':0,'aria-labelledby':0,'aria-owns':0,'aria-posinset':0,'aria-rowcount':0,'aria-rowindex':0,'aria-rowspan':0,'aria-setsize':0};var warnedProperties={};var rARIA=new RegExp('^(aria)-['+ATTRIBUTE_NAME_CHAR+']*$');var rARIACamel=new RegExp('^(aria)[A-Z]['+ATTRIBUTE_NAME_CHAR+']*$');var hasOwnProperty=Object.prototype.hasOwnProperty;function getStackAddendum(){var stack=ReactDebugCurrentFrame.getStackAddendum();return stack!=null?stack:'';}function validateProperty(tagName,name){if(hasOwnProperty.call(warnedProperties,name)&&warnedProperties[name]){return true;}if(rARIACamel.test(name)){var ariaName='aria-'+name.slice(4).toLowerCase();var correctName=ariaProperties.hasOwnProperty(ariaName)?ariaName:null;// If this is an aria-* attribute, but is not listed in the known DOM
// DOM properties, then it is an invalid aria-* attribute.
if(correctName==null){warning(false,'Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.%s',name,getStackAddendum());warnedProperties[name]=true;return true;}// aria-* attributes should be lowercase; suggest the lowercase version.
if(name!==correctName){warning(false,'Invalid ARIA attribute `%s`. Did you mean `%s`?%s',name,correctName,getStackAddendum());warnedProperties[name]=true;return true;}}if(rARIA.test(name)){var lowerCasedName=name.toLowerCase();var standardName=ariaProperties.hasOwnProperty(lowerCasedName)?lowerCasedName:null;// If this is an aria-* attribute, but is not listed in the known DOM
// DOM properties, then it is an invalid aria-* attribute.
if(standardName==null){warnedProperties[name]=true;return false;}// aria-* attributes should be lowercase; suggest the lowercase version.
if(name!==standardName){warning(false,'Unknown ARIA attribute `%s`. Did you mean `%s`?%s',name,standardName,getStackAddendum());warnedProperties[name]=true;return true;}}return true;}function warnInvalidARIAProps(type,props){var invalidProps=[];for(var key in props){var isValid=validateProperty(type,key);if(!isValid){invalidProps.push(key);}}var unknownPropString=invalidProps.map(function(prop){return'`'+prop+'`';}).join(', ');if(invalidProps.length===1){warning(false,'Invalid aria prop %s on <%s> tag. '+'For details, see https://fb.me/invalid-aria-prop%s',unknownPropString,type,getStackAddendum());}else if(invalidProps.length>1){warning(false,'Invalid aria props %s on <%s> tag. '+'For details, see https://fb.me/invalid-aria-prop%s',unknownPropString,type,getStackAddendum());}}function validateProperties(type,props){if(isCustomComponent(type,props)){return;}warnInvalidARIAProps(type,props);}var didWarnValueNull=false;function getStackAddendum$1(){var stack=ReactDebugCurrentFrame.getStackAddendum();return stack!=null?stack:'';}function validateProperties$1(type,props){if(type!=='input'&&type!=='textarea'&&type!=='select'){return;}if(props!=null&&props.value===null&&!didWarnValueNull){didWarnValueNull=true;if(type==='select'&&props.multiple){warning(false,'`value` prop on `%s` should not be null. '+'Consider using an empty array when `multiple` is set to `true` '+'to clear the component or `undefined` for uncontrolled components.%s',type,getStackAddendum$1());}else{warning(false,'`value` prop on `%s` should not be null. '+'Consider using an empty string to clear the component or `undefined` '+'for uncontrolled components.%s',type,getStackAddendum$1());}}}// When adding attributes to the HTML or SVG whitelist, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var possibleStandardNames={// HTML
accept:'accept',acceptcharset:'acceptCharset','accept-charset':'acceptCharset',accesskey:'accessKey',action:'action',allowfullscreen:'allowFullScreen',alt:'alt',as:'as',async:'async',autocapitalize:'autoCapitalize',autocomplete:'autoComplete',autocorrect:'autoCorrect',autofocus:'autoFocus',autoplay:'autoPlay',autosave:'autoSave',capture:'capture',cellpadding:'cellPadding',cellspacing:'cellSpacing',challenge:'challenge',charset:'charSet',checked:'checked',children:'children',cite:'cite','class':'className',classid:'classID',classname:'className',cols:'cols',colspan:'colSpan',content:'content',contenteditable:'contentEditable',contextmenu:'contextMenu',controls:'controls',controlslist:'controlsList',coords:'coords',crossorigin:'crossOrigin',dangerouslysetinnerhtml:'dangerouslySetInnerHTML',data:'data',datetime:'dateTime','default':'default',defaultchecked:'defaultChecked',defaultvalue:'defaultValue',defer:'defer',dir:'dir',disabled:'disabled',download:'download',draggable:'draggable',enctype:'encType','for':'htmlFor',form:'form',formmethod:'formMethod',formaction:'formAction',formenctype:'formEncType',formnovalidate:'formNoValidate',formtarget:'formTarget',frameborder:'frameBorder',headers:'headers',height:'height',hidden:'hidden',high:'high',href:'href',hreflang:'hrefLang',htmlfor:'htmlFor',httpequiv:'httpEquiv','http-equiv':'httpEquiv',icon:'icon',id:'id',innerhtml:'innerHTML',inputmode:'inputMode',integrity:'integrity',is:'is',itemid:'itemID',itemprop:'itemProp',itemref:'itemRef',itemscope:'itemScope',itemtype:'itemType',keyparams:'keyParams',keytype:'keyType',kind:'kind',label:'label',lang:'lang',list:'list',loop:'loop',low:'low',manifest:'manifest',marginwidth:'marginWidth',marginheight:'marginHeight',max:'max',maxlength:'maxLength',media:'media',mediagroup:'mediaGroup',method:'method',min:'min',minlength:'minLength',multiple:'multiple',muted:'muted',name:'name',nonce:'nonce',novalidate:'noValidate',open:'open',optimum:'optimum',pattern:'pattern',placeholder:'placeholder',playsinline:'playsInline',poster:'poster',preload:'preload',profile:'profile',radiogroup:'radioGroup',readonly:'readOnly',referrerpolicy:'referrerPolicy',rel:'rel',required:'required',reversed:'reversed',role:'role',rows:'rows',rowspan:'rowSpan',sandbox:'sandbox',scope:'scope',scoped:'scoped',scrolling:'scrolling',seamless:'seamless',selected:'selected',shape:'shape',size:'size',sizes:'sizes',span:'span',spellcheck:'spellCheck',src:'src',srcdoc:'srcDoc',srclang:'srcLang',srcset:'srcSet',start:'start',step:'step',style:'style',summary:'summary',tabindex:'tabIndex',target:'target',title:'title',type:'type',usemap:'useMap',value:'value',width:'width',wmode:'wmode',wrap:'wrap',// SVG
about:'about',accentheight:'accentHeight','accent-height':'accentHeight',accumulate:'accumulate',additive:'additive',alignmentbaseline:'alignmentBaseline','alignment-baseline':'alignmentBaseline',allowreorder:'allowReorder',alphabetic:'alphabetic',amplitude:'amplitude',arabicform:'arabicForm','arabic-form':'arabicForm',ascent:'ascent',attributename:'attributeName',attributetype:'attributeType',autoreverse:'autoReverse',azimuth:'azimuth',basefrequency:'baseFrequency',baselineshift:'baselineShift','baseline-shift':'baselineShift',baseprofile:'baseProfile',bbox:'bbox',begin:'begin',bias:'bias',by:'by',calcmode:'calcMode',capheight:'capHeight','cap-height':'capHeight',clip:'clip',clippath:'clipPath','clip-path':'clipPath',clippathunits:'clipPathUnits',cliprule:'clipRule','clip-rule':'clipRule',color:'color',colorinterpolation:'colorInterpolation','color-interpolation':'colorInterpolation',colorinterpolationfilters:'colorInterpolationFilters','color-interpolation-filters':'colorInterpolationFilters',colorprofile:'colorProfile','color-profile':'colorProfile',colorrendering:'colorRendering','color-rendering':'colorRendering',contentscripttype:'contentScriptType',contentstyletype:'contentStyleType',cursor:'cursor',cx:'cx',cy:'cy',d:'d',datatype:'datatype',decelerate:'decelerate',descent:'descent',diffuseconstant:'diffuseConstant',direction:'direction',display:'display',divisor:'divisor',dominantbaseline:'dominantBaseline','dominant-baseline':'dominantBaseline',dur:'dur',dx:'dx',dy:'dy',edgemode:'edgeMode',elevation:'elevation',enablebackground:'enableBackground','enable-background':'enableBackground',end:'end',exponent:'exponent',externalresourcesrequired:'externalResourcesRequired',fill:'fill',fillopacity:'fillOpacity','fill-opacity':'fillOpacity',fillrule:'fillRule','fill-rule':'fillRule',filter:'filter',filterres:'filterRes',filterunits:'filterUnits',floodopacity:'floodOpacity','flood-opacity':'floodOpacity',floodcolor:'floodColor','flood-color':'floodColor',focusable:'focusable',fontfamily:'fontFamily','font-family':'fontFamily',fontsize:'fontSize','font-size':'fontSize',fontsizeadjust:'fontSizeAdjust','font-size-adjust':'fontSizeAdjust',fontstretch:'fontStretch','font-stretch':'fontStretch',fontstyle:'fontStyle','font-style':'fontStyle',fontvariant:'fontVariant','font-variant':'fontVariant',fontweight:'fontWeight','font-weight':'fontWeight',format:'format',from:'from',fx:'fx',fy:'fy',g1:'g1',g2:'g2',glyphname:'glyphName','glyph-name':'glyphName',glyphorientationhorizontal:'glyphOrientationHorizontal','glyph-orientation-horizontal':'glyphOrientationHorizontal',glyphorientationvertical:'glyphOrientationVertical','glyph-orientation-vertical':'glyphOrientationVertical',glyphref:'glyphRef',gradienttransform:'gradientTransform',gradientunits:'gradientUnits',hanging:'hanging',horizadvx:'horizAdvX','horiz-adv-x':'horizAdvX',horizoriginx:'horizOriginX','horiz-origin-x':'horizOriginX',ideographic:'ideographic',imagerendering:'imageRendering','image-rendering':'imageRendering',in2:'in2','in':'in',inlist:'inlist',intercept:'intercept',k1:'k1',k2:'k2',k3:'k3',k4:'k4',k:'k',kernelmatrix:'kernelMatrix',kernelunitlength:'kernelUnitLength',kerning:'kerning',keypoints:'keyPoints',keysplines:'keySplines',keytimes:'keyTimes',lengthadjust:'lengthAdjust',letterspacing:'letterSpacing','letter-spacing':'letterSpacing',lightingcolor:'lightingColor','lighting-color':'lightingColor',limitingconeangle:'limitingConeAngle',local:'local',markerend:'markerEnd','marker-end':'markerEnd',markerheight:'markerHeight',markermid:'markerMid','marker-mid':'markerMid',markerstart:'markerStart','marker-start':'markerStart',markerunits:'markerUnits',markerwidth:'markerWidth',mask:'mask',maskcontentunits:'maskContentUnits',maskunits:'maskUnits',mathematical:'mathematical',mode:'mode',numoctaves:'numOctaves',offset:'offset',opacity:'opacity',operator:'operator',order:'order',orient:'orient',orientation:'orientation',origin:'origin',overflow:'overflow',overlineposition:'overlinePosition','overline-position':'overlinePosition',overlinethickness:'overlineThickness','overline-thickness':'overlineThickness',paintorder:'paintOrder','paint-order':'paintOrder',panose1:'panose1','panose-1':'panose1',pathlength:'pathLength',patterncontentunits:'patternContentUnits',patterntransform:'patternTransform',patternunits:'patternUnits',pointerevents:'pointerEvents','pointer-events':'pointerEvents',points:'points',pointsatx:'pointsAtX',pointsaty:'pointsAtY',pointsatz:'pointsAtZ',prefix:'prefix',preservealpha:'preserveAlpha',preserveaspectratio:'preserveAspectRatio',primitiveunits:'primitiveUnits',property:'property',r:'r',radius:'radius',refx:'refX',refy:'refY',renderingintent:'renderingIntent','rendering-intent':'renderingIntent',repeatcount:'repeatCount',repeatdur:'repeatDur',requiredextensions:'requiredExtensions',requiredfeatures:'requiredFeatures',resource:'resource',restart:'restart',result:'result',results:'results',rotate:'rotate',rx:'rx',ry:'ry',scale:'scale',security:'security',seed:'seed',shaperendering:'shapeRendering','shape-rendering':'shapeRendering',slope:'slope',spacing:'spacing',specularconstant:'specularConstant',specularexponent:'specularExponent',speed:'speed',spreadmethod:'spreadMethod',startoffset:'startOffset',stddeviation:'stdDeviation',stemh:'stemh',stemv:'stemv',stitchtiles:'stitchTiles',stopcolor:'stopColor','stop-color':'stopColor',stopopacity:'stopOpacity','stop-opacity':'stopOpacity',strikethroughposition:'strikethroughPosition','strikethrough-position':'strikethroughPosition',strikethroughthickness:'strikethroughThickness','strikethrough-thickness':'strikethroughThickness',string:'string',stroke:'stroke',strokedasharray:'strokeDasharray','stroke-dasharray':'strokeDasharray',strokedashoffset:'strokeDashoffset','stroke-dashoffset':'strokeDashoffset',strokelinecap:'strokeLinecap','stroke-linecap':'strokeLinecap',strokelinejoin:'strokeLinejoin','stroke-linejoin':'strokeLinejoin',strokemiterlimit:'strokeMiterlimit','stroke-miterlimit':'strokeMiterlimit',strokewidth:'strokeWidth','stroke-width':'strokeWidth',strokeopacity:'strokeOpacity','stroke-opacity':'strokeOpacity',suppresscontenteditablewarning:'suppressContentEditableWarning',suppresshydrationwarning:'suppressHydrationWarning',surfacescale:'surfaceScale',systemlanguage:'systemLanguage',tablevalues:'tableValues',targetx:'targetX',targety:'targetY',textanchor:'textAnchor','text-anchor':'textAnchor',textdecoration:'textDecoration','text-decoration':'textDecoration',textlength:'textLength',textrendering:'textRendering','text-rendering':'textRendering',to:'to',transform:'transform','typeof':'typeof',u1:'u1',u2:'u2',underlineposition:'underlinePosition','underline-position':'underlinePosition',underlinethickness:'underlineThickness','underline-thickness':'underlineThickness',unicode:'unicode',unicodebidi:'unicodeBidi','unicode-bidi':'unicodeBidi',unicoderange:'unicodeRange','unicode-range':'unicodeRange',unitsperem:'unitsPerEm','units-per-em':'unitsPerEm',unselectable:'unselectable',valphabetic:'vAlphabetic','v-alphabetic':'vAlphabetic',values:'values',vectoreffect:'vectorEffect','vector-effect':'vectorEffect',version:'version',vertadvy:'vertAdvY','vert-adv-y':'vertAdvY',vertoriginx:'vertOriginX','vert-origin-x':'vertOriginX',vertoriginy:'vertOriginY','vert-origin-y':'vertOriginY',vhanging:'vHanging','v-hanging':'vHanging',videographic:'vIdeographic','v-ideographic':'vIdeographic',viewbox:'viewBox',viewtarget:'viewTarget',visibility:'visibility',vmathematical:'vMathematical','v-mathematical':'vMathematical',vocab:'vocab',widths:'widths',wordspacing:'wordSpacing','word-spacing':'wordSpacing',writingmode:'writingMode','writing-mode':'writingMode',x1:'x1',x2:'x2',x:'x',xchannelselector:'xChannelSelector',xheight:'xHeight','x-height':'xHeight',xlinkactuate:'xlinkActuate','xlink:actuate':'xlinkActuate',xlinkarcrole:'xlinkArcrole','xlink:arcrole':'xlinkArcrole',xlinkhref:'xlinkHref','xlink:href':'xlinkHref',xlinkrole:'xlinkRole','xlink:role':'xlinkRole',xlinkshow:'xlinkShow','xlink:show':'xlinkShow',xlinktitle:'xlinkTitle','xlink:title':'xlinkTitle',xlinktype:'xlinkType','xlink:type':'xlinkType',xmlbase:'xmlBase','xml:base':'xmlBase',xmllang:'xmlLang','xml:lang':'xmlLang',xmlns:'xmlns','xml:space':'xmlSpace',xmlnsxlink:'xmlnsXlink','xmlns:xlink':'xmlnsXlink',xmlspace:'xmlSpace',y1:'y1',y2:'y2',y:'y',ychannelselector:'yChannelSelector',z:'z',zoomandpan:'zoomAndPan'};function getStackAddendum$2(){var stack=ReactDebugCurrentFrame.getStackAddendum();return stack!=null?stack:'';}{var warnedProperties$1={};var hasOwnProperty$1=Object.prototype.hasOwnProperty;var EVENT_NAME_REGEX=/^on./;var INVALID_EVENT_NAME_REGEX=/^on[^A-Z]/;var rARIA$1=new RegExp('^(aria)-['+ATTRIBUTE_NAME_CHAR+']*$');var rARIACamel$1=new RegExp('^(aria)[A-Z]['+ATTRIBUTE_NAME_CHAR+']*$');var validateProperty$1=function validateProperty$1(tagName,name,value,canUseEventSystem){if(hasOwnProperty$1.call(warnedProperties$1,name)&&warnedProperties$1[name]){return true;}var lowerCasedName=name.toLowerCase();if(lowerCasedName==='onfocusin'||lowerCasedName==='onfocusout'){warning(false,'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. '+'All React events are normalized to bubble, so onFocusIn and onFocusOut '+'are not needed/supported by React.');warnedProperties$1[name]=true;return true;}// We can't rely on the event system being injected on the server.
if(canUseEventSystem){if(registrationNameModules.hasOwnProperty(name)){return true;}var registrationName=possibleRegistrationNames.hasOwnProperty(lowerCasedName)?possibleRegistrationNames[lowerCasedName]:null;if(registrationName!=null){warning(false,'Invalid event handler property `%s`. Did you mean `%s`?%s',name,registrationName,getStackAddendum$2());warnedProperties$1[name]=true;return true;}if(EVENT_NAME_REGEX.test(name)){warning(false,'Unknown event handler property `%s`. It will be ignored.%s',name,getStackAddendum$2());warnedProperties$1[name]=true;return true;}}else if(EVENT_NAME_REGEX.test(name)){// If no event plugins have been injected, we are in a server environment.
// So we can't tell if the event name is correct for sure, but we can filter
// out known bad ones like `onclick`. We can't suggest a specific replacement though.
if(INVALID_EVENT_NAME_REGEX.test(name)){warning(false,'Invalid event handler property `%s`. '+'React events use the camelCase naming convention, for example `onClick`.%s',name,getStackAddendum$2());}warnedProperties$1[name]=true;return true;}// Let the ARIA attribute hook validate ARIA attributes
if(rARIA$1.test(name)||rARIACamel$1.test(name)){return true;}if(lowerCasedName==='innerhtml'){warning(false,'Directly setting property `innerHTML` is not permitted. '+'For more information, lookup documentation on `dangerouslySetInnerHTML`.');warnedProperties$1[name]=true;return true;}if(lowerCasedName==='aria'){warning(false,'The `aria` attribute is reserved for future use in React. '+'Pass individual `aria-` attributes instead.');warnedProperties$1[name]=true;return true;}if(lowerCasedName==='is'&&value!==null&&value!==undefined&&typeof value!=='string'){warning(false,'Received a `%s` for a string attribute `is`. If this is expected, cast '+'the value to a string.%s',typeof value==='undefined'?'undefined':_typeof(value),getStackAddendum$2());warnedProperties$1[name]=true;return true;}if(typeof value==='number'&&isNaN(value)){warning(false,'Received NaN for the `%s` attribute. If this is expected, cast '+'the value to a string.%s',name,getStackAddendum$2());warnedProperties$1[name]=true;return true;}var isReserved=isReservedProp(name);// Known attributes should match the casing specified in the property config.
if(possibleStandardNames.hasOwnProperty(lowerCasedName)){var standardName=possibleStandardNames[lowerCasedName];if(standardName!==name){warning(false,'Invalid DOM property `%s`. Did you mean `%s`?%s',name,standardName,getStackAddendum$2());warnedProperties$1[name]=true;return true;}}else if(!isReserved&&name!==lowerCasedName){// Unknown attributes should have lowercase casing since that's how they
// will be cased anyway with server rendering.
warning(false,'React does not recognize the `%s` prop on a DOM element. If you '+'intentionally want it to appear in the DOM as a custom '+'attribute, spell it as lowercase `%s` instead. '+'If you accidentally passed it from a parent component, remove '+'it from the DOM element.%s',name,lowerCasedName,getStackAddendum$2());warnedProperties$1[name]=true;return true;}if(typeof value==='boolean'&&!shouldAttributeAcceptBooleanValue(name)){if(value){warning(false,'Received `%s` for a non-boolean attribute `%s`.\n\n'+'If you want to write it to the DOM, pass a string instead: '+'%s="%s" or %s={value.toString()}.%s',value,name,name,value,name,getStackAddendum$2());}else{warning(false,'Received `%s` for a non-boolean attribute `%s`.\n\n'+'If you want to write it to the DOM, pass a string instead: '+'%s="%s" or %s={value.toString()}.\n\n'+'If you used to conditionally omit it with %s={condition && value}, '+'pass %s={condition ? value : undefined} instead.%s',value,name,name,value,name,name,name,getStackAddendum$2());}warnedProperties$1[name]=true;return true;}// Now that we've validated casing, do not validate
// data types for reserved props
if(isReserved){return true;}// Warn when a known attribute is a bad type
if(!shouldSetAttribute(name,value)){warnedProperties$1[name]=true;return false;}return true;};}var warnUnknownProperties=function warnUnknownProperties(type,props,canUseEventSystem){var unknownProps=[];for(var key in props){var isValid=validateProperty$1(type,key,props[key],canUseEventSystem);if(!isValid){unknownProps.push(key);}}var unknownPropString=unknownProps.map(function(prop){return'`'+prop+'`';}).join(', ');if(unknownProps.length===1){warning(false,'Invalid value for prop %s on <%s> tag. Either remove it from the element, '+'or pass a string or number value to keep it in the DOM. '+'For details, see https://fb.me/react-attribute-behavior%s',unknownPropString,type,getStackAddendum$2());}else if(unknownProps.length>1){warning(false,'Invalid values for props %s on <%s> tag. Either remove them from the element, '+'or pass a string or number value to keep them in the DOM. '+'For details, see https://fb.me/react-attribute-behavior%s',unknownPropString,type,getStackAddendum$2());}};function validateProperties$2(type,props,canUseEventSystem){if(isCustomComponent(type,props)){return;}warnUnknownProperties(type,props,canUseEventSystem);}// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberOwnerName$1=ReactDebugCurrentFiber.getCurrentFiberOwnerName;var getCurrentFiberStackAddendum$2=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;var didWarnInvalidHydration=false;var didWarnShadyDOM=false;var DANGEROUSLY_SET_INNER_HTML='dangerouslySetInnerHTML';var SUPPRESS_CONTENT_EDITABLE_WARNING='suppressContentEditableWarning';var SUPPRESS_HYDRATION_WARNING$1='suppressHydrationWarning';var AUTOFOCUS='autoFocus';var CHILDREN='children';var STYLE='style';var HTML='__html';var HTML_NAMESPACE=Namespaces.html;var getStack=emptyFunction.thatReturns('');{getStack=getCurrentFiberStackAddendum$2;var warnedUnknownTags={// Chrome is the only major browser not shipping <time>. But as of July
// 2017 it intends to ship it due to widespread usage. We intentionally
// *don't* warn for <time> even if it's unrecognized by Chrome because
// it soon will be, and many apps have been using it anyway.
time:true,// There are working polyfills for <dialog>. Let people use it.
dialog:true};var validatePropertiesInDevelopment=function validatePropertiesInDevelopment(type,props){validateProperties(type,props);validateProperties$1(type,props);validateProperties$2(type,props,/* canUseEventSystem */true);};// HTML parsing normalizes CR and CRLF to LF.
// It also can turn \u0000 into \uFFFD inside attributes.
// https://www.w3.org/TR/html5/single-page.html#preprocessing-the-input-stream
// If we have a mismatch, it might be caused by that.
// We will still patch up in this case but not fire the warning.
var NORMALIZE_NEWLINES_REGEX=/\r\n?/g;var NORMALIZE_NULL_AND_REPLACEMENT_REGEX=/\u0000|\uFFFD/g;var normalizeMarkupForTextOrAttribute=function normalizeMarkupForTextOrAttribute(markup){var markupString=typeof markup==='string'?markup:''+markup;return markupString.replace(NORMALIZE_NEWLINES_REGEX,'\n').replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX,'');};var warnForTextDifference=function warnForTextDifference(serverText,clientText){if(didWarnInvalidHydration){return;}var normalizedClientText=normalizeMarkupForTextOrAttribute(clientText);var normalizedServerText=normalizeMarkupForTextOrAttribute(serverText);if(normalizedServerText===normalizedClientText){return;}didWarnInvalidHydration=true;warning(false,'Text content did not match. Server: "%s" Client: "%s"',normalizedServerText,normalizedClientText);};var warnForPropDifference=function warnForPropDifference(propName,serverValue,clientValue){if(didWarnInvalidHydration){return;}var normalizedClientValue=normalizeMarkupForTextOrAttribute(clientValue);var normalizedServerValue=normalizeMarkupForTextOrAttribute(serverValue);if(normalizedServerValue===normalizedClientValue){return;}didWarnInvalidHydration=true;warning(false,'Prop `%s` did not match. Server: %s Client: %s',propName,JSON.stringify(normalizedServerValue),JSON.stringify(normalizedClientValue));};var warnForExtraAttributes=function warnForExtraAttributes(attributeNames){if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;var names=[];attributeNames.forEach(function(name){names.push(name);});warning(false,'Extra attributes from the server: %s',names);};var warnForInvalidEventListener=function warnForInvalidEventListener(registrationName,listener){if(listener===false){warning(false,'Expected `%s` listener to be a function, instead got `false`.\n\n'+'If you used to conditionally omit it with %s={condition && value}, '+'pass %s={condition ? value : undefined} instead.%s',registrationName,registrationName,registrationName,getCurrentFiberStackAddendum$2());}else{warning(false,'Expected `%s` listener to be a function, instead got a value of `%s` type.%s',registrationName,typeof listener==='undefined'?'undefined':_typeof(listener),getCurrentFiberStackAddendum$2());}};// Parse the HTML and read it back to normalize the HTML string so that it
// can be used for comparison.
var normalizeHTML=function normalizeHTML(parent,html){// We could have created a separate document here to avoid
// re-initializing custom elements if they exist. But this breaks
// how <noscript> is being handled. So we use the same document.
// See the discussion in https://github.com/facebook/react/pull/11157.
var testElement=parent.namespaceURI===HTML_NAMESPACE?parent.ownerDocument.createElement(parent.tagName):parent.ownerDocument.createElementNS(parent.namespaceURI,parent.tagName);testElement.innerHTML=html;return testElement.innerHTML;};}function ensureListeningTo(rootContainerElement,registrationName){var isDocumentOrFragment=rootContainerElement.nodeType===DOCUMENT_NODE||rootContainerElement.nodeType===DOCUMENT_FRAGMENT_NODE;var doc=isDocumentOrFragment?rootContainerElement:rootContainerElement.ownerDocument;listenTo(registrationName,doc);}function getOwnerDocumentFromRootContainer(rootContainerElement){return rootContainerElement.nodeType===DOCUMENT_NODE?rootContainerElement:rootContainerElement.ownerDocument;}// There are so many media events, it makes sense to just
// maintain a list rather than create a `trapBubbledEvent` for each
var mediaEvents={topAbort:'abort',topCanPlay:'canplay',topCanPlayThrough:'canplaythrough',topDurationChange:'durationchange',topEmptied:'emptied',topEncrypted:'encrypted',topEnded:'ended',topError:'error',topLoadedData:'loadeddata',topLoadedMetadata:'loadedmetadata',topLoadStart:'loadstart',topPause:'pause',topPlay:'play',topPlaying:'playing',topProgress:'progress',topRateChange:'ratechange',topSeeked:'seeked',topSeeking:'seeking',topStalled:'stalled',topSuspend:'suspend',topTimeUpdate:'timeupdate',topVolumeChange:'volumechange',topWaiting:'waiting'};function trapClickOnNonInteractiveElement(node){// Mobile Safari does not fire properly bubble click events on
// non-interactive elements, which means delegated click listeners do not
// fire. The workaround for this bug involves attaching an empty click
// listener on the target node.
// http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
// Just set it using the onclick property so that we don't have to manage any
// bookkeeping for it. Not sure if we need to clear it when the listener is
// removed.
// TODO: Only do this for the relevant Safaris maybe?
node.onclick=emptyFunction;}function setInitialDOMProperties(tag,domElement,rootContainerElement,nextProps,isCustomComponentTag){for(var propKey in nextProps){if(!nextProps.hasOwnProperty(propKey)){continue;}var nextProp=nextProps[propKey];if(propKey===STYLE){{if(nextProp){// Freeze the next style object so that we can assume it won't be
// mutated. We have already warned for this in the past.
Object.freeze(nextProp);}}// Relies on `updateStylesByID` not mutating `styleUpdates`.
setValueForStyles(domElement,nextProp,getStack);}else if(propKey===DANGEROUSLY_SET_INNER_HTML){var nextHtml=nextProp?nextProp[HTML]:undefined;if(nextHtml!=null){setInnerHTML(domElement,nextHtml);}}else if(propKey===CHILDREN){if(typeof nextProp==='string'){// Avoid setting initial textContent when the text is empty. In IE11 setting
// textContent on a <textarea> will cause the placeholder to not
// show within the <textarea> until it has been focused and blurred again.
// https://github.com/facebook/react/issues/6731#issuecomment-254874553
var canSetTextContent=tag!=='textarea'||nextProp!=='';if(canSetTextContent){setTextContent(domElement,nextProp);}}else if(typeof nextProp==='number'){setTextContent(domElement,''+nextProp);}}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||propKey===SUPPRESS_HYDRATION_WARNING$1){// Noop
}else if(propKey===AUTOFOCUS){// We polyfill it separately on the client during commit.
// We blacklist it here rather than in the property list because we emit it in SSR.
}else if(registrationNameModules.hasOwnProperty(propKey)){if(nextProp!=null){if(true&&typeof nextProp!=='function'){warnForInvalidEventListener(propKey,nextProp);}ensureListeningTo(rootContainerElement,propKey);}}else if(isCustomComponentTag){setValueForAttribute(domElement,propKey,nextProp);}else if(nextProp!=null){// If we're updating to null or undefined, we should remove the property
// from the DOM node instead of inadvertently setting to a string. This
// brings us in line with the same behavior we have on initial render.
setValueForProperty(domElement,propKey,nextProp);}}}function updateDOMProperties(domElement,updatePayload,wasCustomComponentTag,isCustomComponentTag){// TODO: Handle wasCustomComponentTag
for(var i=0;i<updatePayload.length;i+=2){var propKey=updatePayload[i];var propValue=updatePayload[i+1];if(propKey===STYLE){setValueForStyles(domElement,propValue,getStack);}else if(propKey===DANGEROUSLY_SET_INNER_HTML){setInnerHTML(domElement,propValue);}else if(propKey===CHILDREN){setTextContent(domElement,propValue);}else if(isCustomComponentTag){if(propValue!=null){setValueForAttribute(domElement,propKey,propValue);}else{deleteValueForAttribute(domElement,propKey);}}else if(propValue!=null){setValueForProperty(domElement,propKey,propValue);}else{// If we're updating to null or undefined, we should remove the property
// from the DOM node instead of inadvertently setting to a string. This
// brings us in line with the same behavior we have on initial render.
deleteValueForProperty(domElement,propKey);}}}function createElement$1(type,props,rootContainerElement,parentNamespace){// We create tags in the namespace of their parent container, except HTML
var ownerDocument=getOwnerDocumentFromRootContainer(rootContainerElement);var domElement;var namespaceURI=parentNamespace;if(namespaceURI===HTML_NAMESPACE){namespaceURI=getIntrinsicNamespace(type);}if(namespaceURI===HTML_NAMESPACE){{var isCustomComponentTag=isCustomComponent(type,props);// Should this check be gated by parent namespace? Not sure we want to
// allow <SVG> or <mATH>.
warning(isCustomComponentTag||type===type.toLowerCase(),'<%s /> is using uppercase HTML. Always use lowercase HTML tags '+'in React.',type);}if(type==='script'){// Create the script via .innerHTML so its "parser-inserted" flag is
// set to true and it does not execute
var div=ownerDocument.createElement('div');div.innerHTML='<script><'+'/script>';// eslint-disable-line
// This is guaranteed to yield a script element.
var firstChild=div.firstChild;domElement=div.removeChild(firstChild);}else if(typeof props.is==='string'){// $FlowIssue `createElement` should be updated for Web Components
domElement=ownerDocument.createElement(type,{is:props.is});}else{// Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
// See discussion in https://github.com/facebook/react/pull/6896
// and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
domElement=ownerDocument.createElement(type);}}else{domElement=ownerDocument.createElementNS(namespaceURI,type);}{if(namespaceURI===HTML_NAMESPACE){if(!isCustomComponentTag&&Object.prototype.toString.call(domElement)==='[object HTMLUnknownElement]'&&!Object.prototype.hasOwnProperty.call(warnedUnknownTags,type)){warnedUnknownTags[type]=true;warning(false,'The tag <%s> is unrecognized in this browser. '+'If you meant to render a React component, start its name with '+'an uppercase letter.',type);}}}return domElement;}function createTextNode$1(text,rootContainerElement){return getOwnerDocumentFromRootContainer(rootContainerElement).createTextNode(text);}function setInitialProperties$1(domElement,tag,rawProps,rootContainerElement){var isCustomComponentTag=isCustomComponent(tag,rawProps);{validatePropertiesInDevelopment(tag,rawProps);if(isCustomComponentTag&&!didWarnShadyDOM&&domElement.shadyRoot){warning(false,'%s is using shady DOM. Using shady DOM with React can '+'cause things to break subtly.',getCurrentFiberOwnerName$1()||'A component');didWarnShadyDOM=true;}}// TODO: Make sure that we check isMounted before firing any of these events.
var props;switch(tag){case'iframe':case'object':trapBubbledEvent('topLoad','load',domElement);props=rawProps;break;case'video':case'audio':// Create listener for each media event
for(var event in mediaEvents){if(mediaEvents.hasOwnProperty(event)){trapBubbledEvent(event,mediaEvents[event],domElement);}}props=rawProps;break;case'source':trapBubbledEvent('topError','error',domElement);props=rawProps;break;case'img':case'image':trapBubbledEvent('topError','error',domElement);trapBubbledEvent('topLoad','load',domElement);props=rawProps;break;case'form':trapBubbledEvent('topReset','reset',domElement);trapBubbledEvent('topSubmit','submit',domElement);props=rawProps;break;case'details':trapBubbledEvent('topToggle','toggle',domElement);props=rawProps;break;case'input':initWrapperState(domElement,rawProps);props=getHostProps(domElement,rawProps);trapBubbledEvent('topInvalid','invalid',domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'option':validateProps(domElement,rawProps);props=getHostProps$1(domElement,rawProps);break;case'select':initWrapperState$1(domElement,rawProps);props=getHostProps$2(domElement,rawProps);trapBubbledEvent('topInvalid','invalid',domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'textarea':initWrapperState$2(domElement,rawProps);props=getHostProps$3(domElement,rawProps);trapBubbledEvent('topInvalid','invalid',domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;default:props=rawProps;}assertValidProps(tag,props,getStack);setInitialDOMProperties(tag,domElement,rootContainerElement,props,isCustomComponentTag);switch(tag){case'input':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
track(domElement);postMountWrapper(domElement,rawProps);break;case'textarea':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
track(domElement);postMountWrapper$3(domElement,rawProps);break;case'option':postMountWrapper$1(domElement,rawProps);break;case'select':postMountWrapper$2(domElement,rawProps);break;default:if(typeof props.onClick==='function'){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(domElement);}break;}}// Calculate the diff between the two objects.
function diffProperties$1(domElement,tag,lastRawProps,nextRawProps,rootContainerElement){{validatePropertiesInDevelopment(tag,nextRawProps);}var updatePayload=null;var lastProps;var nextProps;switch(tag){case'input':lastProps=getHostProps(domElement,lastRawProps);nextProps=getHostProps(domElement,nextRawProps);updatePayload=[];break;case'option':lastProps=getHostProps$1(domElement,lastRawProps);nextProps=getHostProps$1(domElement,nextRawProps);updatePayload=[];break;case'select':lastProps=getHostProps$2(domElement,lastRawProps);nextProps=getHostProps$2(domElement,nextRawProps);updatePayload=[];break;case'textarea':lastProps=getHostProps$3(domElement,lastRawProps);nextProps=getHostProps$3(domElement,nextRawProps);updatePayload=[];break;default:lastProps=lastRawProps;nextProps=nextRawProps;if(typeof lastProps.onClick!=='function'&&typeof nextProps.onClick==='function'){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(domElement);}break;}assertValidProps(tag,nextProps,getStack);var propKey;var styleName;var styleUpdates=null;for(propKey in lastProps){if(nextProps.hasOwnProperty(propKey)||!lastProps.hasOwnProperty(propKey)||lastProps[propKey]==null){continue;}if(propKey===STYLE){var lastStyle=lastProps[propKey];for(styleName in lastStyle){if(lastStyle.hasOwnProperty(styleName)){if(!styleUpdates){styleUpdates={};}styleUpdates[styleName]='';}}}else if(propKey===DANGEROUSLY_SET_INNER_HTML||propKey===CHILDREN){// Noop. This is handled by the clear text mechanism.
}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||propKey===SUPPRESS_HYDRATION_WARNING$1){// Noop
}else if(propKey===AUTOFOCUS){// Noop. It doesn't work on updates anyway.
}else if(registrationNameModules.hasOwnProperty(propKey)){// This is a special case. If any listener updates we need to ensure
// that the "current" fiber pointer gets updated so we need a commit
// to update this element.
if(!updatePayload){updatePayload=[];}}else{// For all other deleted properties we add it to the queue. We use
// the whitelist in the commit phase instead.
(updatePayload=updatePayload||[]).push(propKey,null);}}for(propKey in nextProps){var nextProp=nextProps[propKey];var lastProp=lastProps!=null?lastProps[propKey]:undefined;if(!nextProps.hasOwnProperty(propKey)||nextProp===lastProp||nextProp==null&&lastProp==null){continue;}if(propKey===STYLE){{if(nextProp){// Freeze the next style object so that we can assume it won't be
// mutated. We have already warned for this in the past.
Object.freeze(nextProp);}}if(lastProp){// Unset styles on `lastProp` but not on `nextProp`.
for(styleName in lastProp){if(lastProp.hasOwnProperty(styleName)&&(!nextProp||!nextProp.hasOwnProperty(styleName))){if(!styleUpdates){styleUpdates={};}styleUpdates[styleName]='';}}// Update styles that changed since `lastProp`.
for(styleName in nextProp){if(nextProp.hasOwnProperty(styleName)&&lastProp[styleName]!==nextProp[styleName]){if(!styleUpdates){styleUpdates={};}styleUpdates[styleName]=nextProp[styleName];}}}else{// Relies on `updateStylesByID` not mutating `styleUpdates`.
if(!styleUpdates){if(!updatePayload){updatePayload=[];}updatePayload.push(propKey,styleUpdates);}styleUpdates=nextProp;}}else if(propKey===DANGEROUSLY_SET_INNER_HTML){var nextHtml=nextProp?nextProp[HTML]:undefined;var lastHtml=lastProp?lastProp[HTML]:undefined;if(nextHtml!=null){if(lastHtml!==nextHtml){(updatePayload=updatePayload||[]).push(propKey,''+nextHtml);}}else{// TODO: It might be too late to clear this if we have children
// inserted already.
}}else if(propKey===CHILDREN){if(lastProp!==nextProp&&(typeof nextProp==='string'||typeof nextProp==='number')){(updatePayload=updatePayload||[]).push(propKey,''+nextProp);}}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||propKey===SUPPRESS_HYDRATION_WARNING$1){// Noop
}else if(registrationNameModules.hasOwnProperty(propKey)){if(nextProp!=null){// We eagerly listen to this even though we haven't committed yet.
if(true&&typeof nextProp!=='function'){warnForInvalidEventListener(propKey,nextProp);}ensureListeningTo(rootContainerElement,propKey);}if(!updatePayload&&lastProp!==nextProp){// This is a special case. If any listener updates we need to ensure
// that the "current" props pointer gets updated so we need a commit
// to update this element.
updatePayload=[];}}else{// For any other property we always add it to the queue and then we
// filter it out using the whitelist during the commit.
(updatePayload=updatePayload||[]).push(propKey,nextProp);}}if(styleUpdates){(updatePayload=updatePayload||[]).push(STYLE,styleUpdates);}return updatePayload;}// Apply the diff.
function updateProperties$1(domElement,updatePayload,tag,lastRawProps,nextRawProps){// Update checked *before* name.
// In the middle of an update, it is possible to have multiple checked.
// When a checked radio tries to change name, browser makes another radio's checked false.
if(tag==='input'&&nextRawProps.type==='radio'&&nextRawProps.name!=null){updateChecked(domElement,nextRawProps);}var wasCustomComponentTag=isCustomComponent(tag,lastRawProps);var isCustomComponentTag=isCustomComponent(tag,nextRawProps);// Apply the diff.
updateDOMProperties(domElement,updatePayload,wasCustomComponentTag,isCustomComponentTag);// TODO: Ensure that an update gets scheduled if any of the special props
// changed.
switch(tag){case'input':// Update the wrapper around inputs *after* updating props. This has to
// happen after `updateDOMProperties`. Otherwise HTML5 input validations
// raise warnings and prevent the new value from being assigned.
updateWrapper(domElement,nextRawProps);break;case'textarea':updateWrapper$1(domElement,nextRawProps);break;case'select':// <select> value update needs to occur after <option> children
// reconciliation
postUpdateWrapper(domElement,nextRawProps);break;}}function diffHydratedProperties$1(domElement,tag,rawProps,parentNamespace,rootContainerElement){{var suppressHydrationWarning=rawProps[SUPPRESS_HYDRATION_WARNING$1]===true;var isCustomComponentTag=isCustomComponent(tag,rawProps);validatePropertiesInDevelopment(tag,rawProps);if(isCustomComponentTag&&!didWarnShadyDOM&&domElement.shadyRoot){warning(false,'%s is using shady DOM. Using shady DOM with React can '+'cause things to break subtly.',getCurrentFiberOwnerName$1()||'A component');didWarnShadyDOM=true;}}// TODO: Make sure that we check isMounted before firing any of these events.
switch(tag){case'iframe':case'object':trapBubbledEvent('topLoad','load',domElement);break;case'video':case'audio':// Create listener for each media event
for(var event in mediaEvents){if(mediaEvents.hasOwnProperty(event)){trapBubbledEvent(event,mediaEvents[event],domElement);}}break;case'source':trapBubbledEvent('topError','error',domElement);break;case'img':case'image':trapBubbledEvent('topError','error',domElement);trapBubbledEvent('topLoad','load',domElement);break;case'form':trapBubbledEvent('topReset','reset',domElement);trapBubbledEvent('topSubmit','submit',domElement);break;case'details':trapBubbledEvent('topToggle','toggle',domElement);break;case'input':initWrapperState(domElement,rawProps);trapBubbledEvent('topInvalid','invalid',domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'option':validateProps(domElement,rawProps);break;case'select':initWrapperState$1(domElement,rawProps);trapBubbledEvent('topInvalid','invalid',domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;case'textarea':initWrapperState$2(domElement,rawProps);trapBubbledEvent('topInvalid','invalid',domElement);// For controlled components we always need to ensure we're listening
// to onChange. Even if there is no listener.
ensureListeningTo(rootContainerElement,'onChange');break;}assertValidProps(tag,rawProps,getStack);{var extraAttributeNames=new Set();var attributes=domElement.attributes;for(var i=0;i<attributes.length;i++){var name=attributes[i].name.toLowerCase();switch(name){// Built-in SSR attribute is whitelisted
case'data-reactroot':break;// Controlled attributes are not validated
// TODO: Only ignore them on controlled tags.
case'value':break;case'checked':break;case'selected':break;default:// Intentionally use the original name.
// See discussion in https://github.com/facebook/react/pull/10676.
extraAttributeNames.add(attributes[i].name);}}}var updatePayload=null;for(var propKey in rawProps){if(!rawProps.hasOwnProperty(propKey)){continue;}var nextProp=rawProps[propKey];if(propKey===CHILDREN){// For text content children we compare against textContent. This
// might match additional HTML that is hidden when we read it using
// textContent. E.g. "foo" will match "f<span>oo</span>" but that still
// satisfies our requirement. Our requirement is not to produce perfect
// HTML and attributes. Ideally we should preserve structure but it's
// ok not to if the visible content is still enough to indicate what
// even listeners these nodes might be wired up to.
// TODO: Warn if there is more than a single textNode as a child.
// TODO: Should we use domElement.firstChild.nodeValue to compare?
if(typeof nextProp==='string'){if(domElement.textContent!==nextProp){if(true&&!suppressHydrationWarning){warnForTextDifference(domElement.textContent,nextProp);}updatePayload=[CHILDREN,nextProp];}}else if(typeof nextProp==='number'){if(domElement.textContent!==''+nextProp){if(true&&!suppressHydrationWarning){warnForTextDifference(domElement.textContent,nextProp);}updatePayload=[CHILDREN,''+nextProp];}}}else if(registrationNameModules.hasOwnProperty(propKey)){if(nextProp!=null){if(true&&typeof nextProp!=='function'){warnForInvalidEventListener(propKey,nextProp);}ensureListeningTo(rootContainerElement,propKey);}}else{// Validate that the properties correspond to their expected values.
var serverValue;var propertyInfo;if(suppressHydrationWarning){// Don't bother comparing. We're ignoring all these warnings.
}else if(propKey===SUPPRESS_CONTENT_EDITABLE_WARNING||propKey===SUPPRESS_HYDRATION_WARNING$1||// Controlled attributes are not validated
// TODO: Only ignore them on controlled tags.
propKey==='value'||propKey==='checked'||propKey==='selected'){// Noop
}else if(propKey===DANGEROUSLY_SET_INNER_HTML){var rawHtml=nextProp?nextProp[HTML]||'':'';var serverHTML=domElement.innerHTML;var expectedHTML=normalizeHTML(domElement,rawHtml);if(expectedHTML!==serverHTML){warnForPropDifference(propKey,serverHTML,expectedHTML);}}else if(propKey===STYLE){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames['delete'](propKey);var expectedStyle=createDangerousStringForStyles(nextProp);serverValue=domElement.getAttribute('style');if(expectedStyle!==serverValue){warnForPropDifference(propKey,serverValue,expectedStyle);}}else if(isCustomComponentTag){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames['delete'](propKey.toLowerCase());serverValue=getValueForAttribute(domElement,propKey,nextProp);if(nextProp!==serverValue){warnForPropDifference(propKey,serverValue,nextProp);}}else if(shouldSetAttribute(propKey,nextProp)){if(propertyInfo=getPropertyInfo(propKey)){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames['delete'](propertyInfo.attributeName);serverValue=getValueForProperty(domElement,propKey,nextProp);}else{var ownNamespace=parentNamespace;if(ownNamespace===HTML_NAMESPACE){ownNamespace=getIntrinsicNamespace(tag);}if(ownNamespace===HTML_NAMESPACE){// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames['delete'](propKey.toLowerCase());}else{// $FlowFixMe - Should be inferred as not undefined.
extraAttributeNames['delete'](propKey);}serverValue=getValueForAttribute(domElement,propKey,nextProp);}if(nextProp!==serverValue){warnForPropDifference(propKey,serverValue,nextProp);}}}}{// $FlowFixMe - Should be inferred as not undefined.
if(extraAttributeNames.size>0&&!suppressHydrationWarning){// $FlowFixMe - Should be inferred as not undefined.
warnForExtraAttributes(extraAttributeNames);}}switch(tag){case'input':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
track(domElement);postMountWrapper(domElement,rawProps);break;case'textarea':// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
track(domElement);postMountWrapper$3(domElement,rawProps);break;case'select':case'option':// For input and textarea we current always set the value property at
// post mount to force it to diverge from attributes. However, for
// option and select we don't quite do the same thing and select
// is not resilient to the DOM state changing so we don't do that here.
// TODO: Consider not doing this for input and textarea.
break;default:if(typeof rawProps.onClick==='function'){// TODO: This cast may not be sound for SVG, MathML or custom elements.
trapClickOnNonInteractiveElement(domElement);}break;}return updatePayload;}function diffHydratedText$1(textNode,text){var isDifferent=textNode.nodeValue!==text;return isDifferent;}function warnForUnmatchedText$1(textNode,text){{warnForTextDifference(textNode.nodeValue,text);}}function warnForDeletedHydratableElement$1(parentNode,child){{if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning(false,'Did not expect server HTML to contain a <%s> in <%s>.',child.nodeName.toLowerCase(),parentNode.nodeName.toLowerCase());}}function warnForDeletedHydratableText$1(parentNode,child){{if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning(false,'Did not expect server HTML to contain the text node "%s" in <%s>.',child.nodeValue,parentNode.nodeName.toLowerCase());}}function warnForInsertedHydratedElement$1(parentNode,tag,props){{if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning(false,'Expected server HTML to contain a matching <%s> in <%s>.',tag,parentNode.nodeName.toLowerCase());}}function warnForInsertedHydratedText$1(parentNode,text){{if(text===''){// We expect to insert empty text nodes since they're not represented in
// the HTML.
// TODO: Remove this special case if we can just avoid inserting empty
// text nodes.
return;}if(didWarnInvalidHydration){return;}didWarnInvalidHydration=true;warning(false,'Expected server HTML to contain a matching text node for "%s" in <%s>.',text,parentNode.nodeName.toLowerCase());}}function restoreControlledState(domElement,tag,props){switch(tag){case'input':restoreControlledState$1(domElement,props);return;case'textarea':restoreControlledState$3(domElement,props);return;case'select':restoreControlledState$2(domElement,props);return;}}var ReactDOMFiberComponent=Object.freeze({createElement:createElement$1,createTextNode:createTextNode$1,setInitialProperties:setInitialProperties$1,diffProperties:diffProperties$1,updateProperties:updateProperties$1,diffHydratedProperties:diffHydratedProperties$1,diffHydratedText:diffHydratedText$1,warnForUnmatchedText:warnForUnmatchedText$1,warnForDeletedHydratableElement:warnForDeletedHydratableElement$1,warnForDeletedHydratableText:warnForDeletedHydratableText$1,warnForInsertedHydratedElement:warnForInsertedHydratedElement$1,warnForInsertedHydratedText:warnForInsertedHydratedText$1,restoreControlledState:restoreControlledState});// TODO: direct imports like some-package/src/* are bad. Fix me.
var getCurrentFiberStackAddendum$6=ReactDebugCurrentFiber.getCurrentFiberStackAddendum;var validateDOMNesting=emptyFunction;{// This validation code was written based on the HTML5 parsing spec:
// https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
//
// Note: this does not catch all invalid nesting, nor does it try to (as it's
// not clear what practical benefit doing so provides); instead, we warn only
// for cases where the parser will give a parse tree differing from what React
// intended. For example, <b><div></div></b> is invalid but we don't warn
// because it still parses correctly; we do warn for other cases like nested
// <p> tags where the beginning of the second element implicitly closes the
// first, causing a confusing mess.
// https://html.spec.whatwg.org/multipage/syntax.html#special
var specialTags=['address','applet','area','article','aside','base','basefont','bgsound','blockquote','body','br','button','caption','center','col','colgroup','dd','details','dir','div','dl','dt','embed','fieldset','figcaption','figure','footer','form','frame','frameset','h1','h2','h3','h4','h5','h6','head','header','hgroup','hr','html','iframe','img','input','isindex','li','link','listing','main','marquee','menu','menuitem','meta','nav','noembed','noframes','noscript','object','ol','p','param','plaintext','pre','script','section','select','source','style','summary','table','tbody','td','template','textarea','tfoot','th','thead','title','tr','track','ul','wbr','xmp'];// https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
var inScopeTags=['applet','caption','html','table','td','th','marquee','object','template',// https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
// TODO: Distinguish by namespace here -- for <title>, including it here
// errs on the side of fewer warnings
'foreignObject','desc','title'];// https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-button-scope
var buttonScopeTags=inScopeTags.concat(['button']);// https://html.spec.whatwg.org/multipage/syntax.html#generate-implied-end-tags
var impliedEndTags=['dd','dt','li','option','optgroup','p','rp','rt'];var emptyAncestorInfo={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null};var updatedAncestorInfo$1=function updatedAncestorInfo$1(oldInfo,tag,instance){var ancestorInfo=_assign({},oldInfo||emptyAncestorInfo);var info={tag:tag,instance:instance};if(inScopeTags.indexOf(tag)!==-1){ancestorInfo.aTagInScope=null;ancestorInfo.buttonTagInScope=null;ancestorInfo.nobrTagInScope=null;}if(buttonScopeTags.indexOf(tag)!==-1){ancestorInfo.pTagInButtonScope=null;}// See rules for 'li', 'dd', 'dt' start tags in
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
if(specialTags.indexOf(tag)!==-1&&tag!=='address'&&tag!=='div'&&tag!=='p'){ancestorInfo.listItemTagAutoclosing=null;ancestorInfo.dlItemTagAutoclosing=null;}ancestorInfo.current=info;if(tag==='form'){ancestorInfo.formTag=info;}if(tag==='a'){ancestorInfo.aTagInScope=info;}if(tag==='button'){ancestorInfo.buttonTagInScope=info;}if(tag==='nobr'){ancestorInfo.nobrTagInScope=info;}if(tag==='p'){ancestorInfo.pTagInButtonScope=info;}if(tag==='li'){ancestorInfo.listItemTagAutoclosing=info;}if(tag==='dd'||tag==='dt'){ancestorInfo.dlItemTagAutoclosing=info;}return ancestorInfo;};/**
   * Returns whether
   */var isTagValidWithParent=function isTagValidWithParent(tag,parentTag){// First, let's check if we're in an unusual parsing mode...
switch(parentTag){// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
case'select':return tag==='option'||tag==='optgroup'||tag==='#text';case'optgroup':return tag==='option'||tag==='#text';// Strictly speaking, seeing an <option> doesn't mean we're in a <select>
// but
case'option':return tag==='#text';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
// No special behavior since these rules fall back to "in body" mode for
// all except special table nodes which cause bad parsing behavior anyway.
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
case'tr':return tag==='th'||tag==='td'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
case'tbody':case'thead':case'tfoot':return tag==='tr'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
case'colgroup':return tag==='col'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
case'table':return tag==='caption'||tag==='colgroup'||tag==='tbody'||tag==='tfoot'||tag==='thead'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
case'head':return tag==='base'||tag==='basefont'||tag==='bgsound'||tag==='link'||tag==='meta'||tag==='title'||tag==='noscript'||tag==='noframes'||tag==='style'||tag==='script'||tag==='template';// https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
case'html':return tag==='head'||tag==='body';case'#document':return tag==='html';}// Probably in the "in body" parsing mode, so we outlaw only tag combos
// where the parsing rules cause implicit opens or closes to be added.
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
switch(tag){case'h1':case'h2':case'h3':case'h4':case'h5':case'h6':return parentTag!=='h1'&&parentTag!=='h2'&&parentTag!=='h3'&&parentTag!=='h4'&&parentTag!=='h5'&&parentTag!=='h6';case'rp':case'rt':return impliedEndTags.indexOf(parentTag)===-1;case'body':case'caption':case'col':case'colgroup':case'frame':case'head':case'html':case'tbody':case'td':case'tfoot':case'th':case'thead':case'tr':// These tags are only valid with a few parents that have special child
// parsing rules -- if we're down here, then none of those matched and
// so we allow it only if we don't know what the parent is, as all other
// cases are invalid.
return parentTag==null;}return true;};/**
   * Returns whether
   */var findInvalidAncestorForTag=function findInvalidAncestorForTag(tag,ancestorInfo){switch(tag){case'address':case'article':case'aside':case'blockquote':case'center':case'details':case'dialog':case'dir':case'div':case'dl':case'fieldset':case'figcaption':case'figure':case'footer':case'header':case'hgroup':case'main':case'menu':case'nav':case'ol':case'p':case'section':case'summary':case'ul':case'pre':case'listing':case'table':case'hr':case'xmp':case'h1':case'h2':case'h3':case'h4':case'h5':case'h6':return ancestorInfo.pTagInButtonScope;case'form':return ancestorInfo.formTag||ancestorInfo.pTagInButtonScope;case'li':return ancestorInfo.listItemTagAutoclosing;case'dd':case'dt':return ancestorInfo.dlItemTagAutoclosing;case'button':return ancestorInfo.buttonTagInScope;case'a':// Spec says something about storing a list of markers, but it sounds
// equivalent to this check.
return ancestorInfo.aTagInScope;case'nobr':return ancestorInfo.nobrTagInScope;}return null;};var didWarn={};validateDOMNesting=function validateDOMNesting(childTag,childText,ancestorInfo){ancestorInfo=ancestorInfo||emptyAncestorInfo;var parentInfo=ancestorInfo.current;var parentTag=parentInfo&&parentInfo.tag;if(childText!=null){warning(childTag==null,'validateDOMNesting: when childText is passed, childTag should be null');childTag='#text';}var invalidParent=isTagValidWithParent(childTag,parentTag)?null:parentInfo;var invalidAncestor=invalidParent?null:findInvalidAncestorForTag(childTag,ancestorInfo);var invalidParentOrAncestor=invalidParent||invalidAncestor;if(!invalidParentOrAncestor){return;}var ancestorTag=invalidParentOrAncestor.tag;var addendum=getCurrentFiberStackAddendum$6();var warnKey=!!invalidParent+'|'+childTag+'|'+ancestorTag+'|'+addendum;if(didWarn[warnKey]){return;}didWarn[warnKey]=true;var tagDisplayName=childTag;var whitespaceInfo='';if(childTag==='#text'){if(/\S/.test(childText)){tagDisplayName='Text nodes';}else{tagDisplayName='Whitespace text nodes';whitespaceInfo=" Make sure you don't have any extra whitespace between tags on "+'each line of your source code.';}}else{tagDisplayName='<'+childTag+'>';}if(invalidParent){var info='';if(ancestorTag==='table'&&childTag==='tr'){info+=' Add a <tbody> to your code to match the DOM tree generated by '+'the browser.';}warning(false,'validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s%s',tagDisplayName,ancestorTag,whitespaceInfo,info,addendum);}else{warning(false,'validateDOMNesting(...): %s cannot appear as a descendant of '+'<%s>.%s',tagDisplayName,ancestorTag,addendum);}};// TODO: turn this into a named export
validateDOMNesting.updatedAncestorInfo=updatedAncestorInfo$1;// For testing
validateDOMNesting.isTagValidInContext=function(tag,ancestorInfo){ancestorInfo=ancestorInfo||emptyAncestorInfo;var parentInfo=ancestorInfo.current;var parentTag=parentInfo&&parentInfo.tag;return isTagValidWithParent(tag,parentTag)&&!findInvalidAncestorForTag(tag,ancestorInfo);};}var validateDOMNesting$1=validateDOMNesting;// TODO: direct imports like some-package/src/* are bad. Fix me.
var createElement=createElement$1;var createTextNode=createTextNode$1;var setInitialProperties=setInitialProperties$1;var diffProperties=diffProperties$1;var updateProperties=updateProperties$1;var diffHydratedProperties=diffHydratedProperties$1;var diffHydratedText=diffHydratedText$1;var warnForUnmatchedText=warnForUnmatchedText$1;var warnForDeletedHydratableElement=warnForDeletedHydratableElement$1;var warnForDeletedHydratableText=warnForDeletedHydratableText$1;var warnForInsertedHydratedElement=warnForInsertedHydratedElement$1;var warnForInsertedHydratedText=warnForInsertedHydratedText$1;var updatedAncestorInfo=validateDOMNesting$1.updatedAncestorInfo;var precacheFiberNode=precacheFiberNode$1;var updateFiberProps=updateFiberProps$1;{var SUPPRESS_HYDRATION_WARNING='suppressHydrationWarning';if(typeof Map!=='function'||Map.prototype==null||typeof Map.prototype.forEach!=='function'||typeof Set!=='function'||Set.prototype==null||typeof Set.prototype.clear!=='function'||typeof Set.prototype.forEach!=='function'){warning(false,'React depends on Map and Set built-in types. Make sure that you load a '+'polyfill in older browsers. http://fb.me/react-polyfills');}}injection$3.injectFiberControlledHostComponent(ReactDOMFiberComponent);var eventsEnabled=null;var selectionInformation=null;/**
 * True if the supplied DOM node is a valid node element.
 *
 * @param {?DOMElement} node The candidate DOM node.
 * @return {boolean} True if the DOM is a valid DOM node.
 * @internal
 */function isValidContainer(node){return!!(node&&(node.nodeType===ELEMENT_NODE||node.nodeType===DOCUMENT_NODE||node.nodeType===DOCUMENT_FRAGMENT_NODE||node.nodeType===COMMENT_NODE&&node.nodeValue===' react-mount-point-unstable '));}function getReactRootElementInContainer(container){if(!container){return null;}if(container.nodeType===DOCUMENT_NODE){return container.documentElement;}else{return container.firstChild;}}function shouldHydrateDueToLegacyHeuristic(container){var rootElement=getReactRootElementInContainer(container);return!!(rootElement&&rootElement.nodeType===ELEMENT_NODE&&rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME));}function shouldAutoFocusHostComponent(type,props){switch(type){case'button':case'input':case'select':case'textarea':return!!props.autoFocus;}return false;}var DOMRenderer=reactReconciler({getRootHostContext:function getRootHostContext(rootContainerInstance){var type=void 0;var namespace=void 0;var nodeType=rootContainerInstance.nodeType;switch(nodeType){case DOCUMENT_NODE:case DOCUMENT_FRAGMENT_NODE:{type=nodeType===DOCUMENT_NODE?'#document':'#fragment';var root=rootContainerInstance.documentElement;namespace=root?root.namespaceURI:getChildNamespace(null,'');break;}default:{var container=nodeType===COMMENT_NODE?rootContainerInstance.parentNode:rootContainerInstance;var ownNamespace=container.namespaceURI||null;type=container.tagName;namespace=getChildNamespace(ownNamespace,type);break;}}{var validatedTag=type.toLowerCase();var _ancestorInfo=updatedAncestorInfo(null,validatedTag,null);return{namespace:namespace,ancestorInfo:_ancestorInfo};}return namespace;},getChildHostContext:function getChildHostContext(parentHostContext,type){{var parentHostContextDev=parentHostContext;var _namespace=getChildNamespace(parentHostContextDev.namespace,type);var _ancestorInfo2=updatedAncestorInfo(parentHostContextDev.ancestorInfo,type,null);return{namespace:_namespace,ancestorInfo:_ancestorInfo2};}var parentNamespace=parentHostContext;return getChildNamespace(parentNamespace,type);},getPublicInstance:function getPublicInstance(instance){return instance;},prepareForCommit:function prepareForCommit(){eventsEnabled=isEnabled();selectionInformation=getSelectionInformation();setEnabled(false);},resetAfterCommit:function resetAfterCommit(){restoreSelection(selectionInformation);selectionInformation=null;setEnabled(eventsEnabled);eventsEnabled=null;},createInstance:function createInstance(type,props,rootContainerInstance,hostContext,internalInstanceHandle){var parentNamespace=void 0;{// TODO: take namespace into account when validating.
var hostContextDev=hostContext;validateDOMNesting$1(type,null,hostContextDev.ancestorInfo);if(typeof props.children==='string'||typeof props.children==='number'){var string=''+props.children;var ownAncestorInfo=updatedAncestorInfo(hostContextDev.ancestorInfo,type,null);validateDOMNesting$1(null,string,ownAncestorInfo);}parentNamespace=hostContextDev.namespace;}var domElement=createElement(type,props,rootContainerInstance,parentNamespace);precacheFiberNode(internalInstanceHandle,domElement);updateFiberProps(domElement,props);return domElement;},appendInitialChild:function appendInitialChild(parentInstance,child){parentInstance.appendChild(child);},finalizeInitialChildren:function finalizeInitialChildren(domElement,type,props,rootContainerInstance){setInitialProperties(domElement,type,props,rootContainerInstance);return shouldAutoFocusHostComponent(type,props);},prepareUpdate:function prepareUpdate(domElement,type,oldProps,newProps,rootContainerInstance,hostContext){{var hostContextDev=hostContext;if(_typeof(newProps.children)!==_typeof(oldProps.children)&&(typeof newProps.children==='string'||typeof newProps.children==='number')){var string=''+newProps.children;var ownAncestorInfo=updatedAncestorInfo(hostContextDev.ancestorInfo,type,null);validateDOMNesting$1(null,string,ownAncestorInfo);}}return diffProperties(domElement,type,oldProps,newProps,rootContainerInstance);},shouldSetTextContent:function shouldSetTextContent(type,props){return type==='textarea'||typeof props.children==='string'||typeof props.children==='number'||_typeof(props.dangerouslySetInnerHTML)==='object'&&props.dangerouslySetInnerHTML!==null&&typeof props.dangerouslySetInnerHTML.__html==='string';},shouldDeprioritizeSubtree:function shouldDeprioritizeSubtree(type,props){return!!props.hidden;},createTextInstance:function createTextInstance(text,rootContainerInstance,hostContext,internalInstanceHandle){{var hostContextDev=hostContext;validateDOMNesting$1(null,text,hostContextDev.ancestorInfo);}var textNode=createTextNode(text,rootContainerInstance);precacheFiberNode(internalInstanceHandle,textNode);return textNode;},now:now,mutation:{commitMount:function commitMount(domElement,type,newProps,internalInstanceHandle){domElement.focus();},commitUpdate:function commitUpdate(domElement,updatePayload,type,oldProps,newProps,internalInstanceHandle){// Update the props handle so that we know which props are the ones with
// with current event handlers.
updateFiberProps(domElement,newProps);// Apply the diff to the DOM node.
updateProperties(domElement,updatePayload,type,oldProps,newProps);},resetTextContent:function resetTextContent(domElement){domElement.textContent='';},commitTextUpdate:function commitTextUpdate(textInstance,oldText,newText){textInstance.nodeValue=newText;},appendChild:function appendChild(parentInstance,child){parentInstance.appendChild(child);},appendChildToContainer:function appendChildToContainer(container,child){if(container.nodeType===COMMENT_NODE){container.parentNode.insertBefore(child,container);}else{container.appendChild(child);}},insertBefore:function insertBefore(parentInstance,child,beforeChild){parentInstance.insertBefore(child,beforeChild);},insertInContainerBefore:function insertInContainerBefore(container,child,beforeChild){if(container.nodeType===COMMENT_NODE){container.parentNode.insertBefore(child,beforeChild);}else{container.insertBefore(child,beforeChild);}},removeChild:function removeChild(parentInstance,child){parentInstance.removeChild(child);},removeChildFromContainer:function removeChildFromContainer(container,child){if(container.nodeType===COMMENT_NODE){container.parentNode.removeChild(child);}else{container.removeChild(child);}}},hydration:{canHydrateInstance:function canHydrateInstance(instance,type,props){if(instance.nodeType!==ELEMENT_NODE||type.toLowerCase()!==instance.nodeName.toLowerCase()){return null;}// This has now been refined to an element node.
return instance;},canHydrateTextInstance:function canHydrateTextInstance(instance,text){if(text===''||instance.nodeType!==TEXT_NODE){// Empty strings are not parsed by HTML so there won't be a correct match here.
return null;}// This has now been refined to a text node.
return instance;},getNextHydratableSibling:function getNextHydratableSibling(instance){var node=instance.nextSibling;// Skip non-hydratable nodes.
while(node&&node.nodeType!==ELEMENT_NODE&&node.nodeType!==TEXT_NODE){node=node.nextSibling;}return node;},getFirstHydratableChild:function getFirstHydratableChild(parentInstance){var next=parentInstance.firstChild;// Skip non-hydratable nodes.
while(next&&next.nodeType!==ELEMENT_NODE&&next.nodeType!==TEXT_NODE){next=next.nextSibling;}return next;},hydrateInstance:function hydrateInstance(instance,type,props,rootContainerInstance,hostContext,internalInstanceHandle){precacheFiberNode(internalInstanceHandle,instance);// TODO: Possibly defer this until the commit phase where all the events
// get attached.
updateFiberProps(instance,props);var parentNamespace=void 0;{var hostContextDev=hostContext;parentNamespace=hostContextDev.namespace;}return diffHydratedProperties(instance,type,props,parentNamespace,rootContainerInstance);},hydrateTextInstance:function hydrateTextInstance(textInstance,text,internalInstanceHandle){precacheFiberNode(internalInstanceHandle,textInstance);return diffHydratedText(textInstance,text);},didNotMatchHydratedContainerTextInstance:function didNotMatchHydratedContainerTextInstance(parentContainer,textInstance,text){{warnForUnmatchedText(textInstance,text);}},didNotMatchHydratedTextInstance:function didNotMatchHydratedTextInstance(parentType,parentProps,parentInstance,textInstance,text){if(true&&parentProps[SUPPRESS_HYDRATION_WARNING]!==true){warnForUnmatchedText(textInstance,text);}},didNotHydrateContainerInstance:function didNotHydrateContainerInstance(parentContainer,instance){{if(instance.nodeType===1){warnForDeletedHydratableElement(parentContainer,instance);}else{warnForDeletedHydratableText(parentContainer,instance);}}},didNotHydrateInstance:function didNotHydrateInstance(parentType,parentProps,parentInstance,instance){if(true&&parentProps[SUPPRESS_HYDRATION_WARNING]!==true){if(instance.nodeType===1){warnForDeletedHydratableElement(parentInstance,instance);}else{warnForDeletedHydratableText(parentInstance,instance);}}},didNotFindHydratableContainerInstance:function didNotFindHydratableContainerInstance(parentContainer,type,props){{warnForInsertedHydratedElement(parentContainer,type,props);}},didNotFindHydratableContainerTextInstance:function didNotFindHydratableContainerTextInstance(parentContainer,text){{warnForInsertedHydratedText(parentContainer,text);}},didNotFindHydratableInstance:function didNotFindHydratableInstance(parentType,parentProps,parentInstance,type,props){if(true&&parentProps[SUPPRESS_HYDRATION_WARNING]!==true){warnForInsertedHydratedElement(parentInstance,type,props);}},didNotFindHydratableTextInstance:function didNotFindHydratableTextInstance(parentType,parentProps,parentInstance,text){if(true&&parentProps[SUPPRESS_HYDRATION_WARNING]!==true){warnForInsertedHydratedText(parentInstance,text);}}},scheduleDeferredCallback:rIC,cancelDeferredCallback:cIC,useSyncScheduling:!enableAsyncSchedulingByDefaultInReactDOM});injection$4.injectFiberBatchedUpdates(DOMRenderer.batchedUpdates);var warnedAboutHydrateAPI=false;function renderSubtreeIntoContainer(parentComponent,children,container,forceHydrate,callback){!isValidContainer(container)?invariant(false,'Target container is not a DOM element.'):void 0;{if(container._reactRootContainer&&container.nodeType!==COMMENT_NODE){var hostInstance=DOMRenderer.findHostInstanceWithNoPortals(container._reactRootContainer.current);if(hostInstance){warning(hostInstance.parentNode===container,'render(...): It looks like the React-rendered content of this '+'container was removed without using React. This is not '+'supported and will cause errors. Instead, call '+'ReactDOM.unmountComponentAtNode to empty a container.');}}var isRootRenderedBySomeReact=!!container._reactRootContainer;var rootEl=getReactRootElementInContainer(container);var hasNonRootReactChild=!!(rootEl&&getInstanceFromNode$1(rootEl));warning(!hasNonRootReactChild||isRootRenderedBySomeReact,'render(...): Replacing React-rendered children with a new root '+'component. If you intended to update the children of this node, '+'you should instead have the existing children update their state '+'and render the new components instead of calling ReactDOM.render.');warning(container.nodeType!==ELEMENT_NODE||!container.tagName||container.tagName.toUpperCase()!=='BODY','render(): Rendering components directly into document.body is '+'discouraged, since its children are often manipulated by third-party '+'scripts and browser extensions. This may lead to subtle '+'reconciliation issues. Try rendering into a container element created '+'for your app.');}var root=container._reactRootContainer;if(!root){var shouldHydrate=forceHydrate||shouldHydrateDueToLegacyHeuristic(container);// First clear any existing content.
if(!shouldHydrate){var warned=false;var rootSibling=void 0;while(rootSibling=container.lastChild){{if(!warned&&rootSibling.nodeType===ELEMENT_NODE&&rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)){warned=true;warning(false,'render(): Target node has markup rendered by React, but there '+'are unrelated nodes as well. This is most commonly caused by '+'white-space inserted around server-rendered markup.');}}container.removeChild(rootSibling);}}{if(shouldHydrate&&!forceHydrate&&!warnedAboutHydrateAPI){warnedAboutHydrateAPI=true;lowPriorityWarning$1(false,'render(): Calling ReactDOM.render() to hydrate server-rendered markup '+'will stop working in React v17. Replace the ReactDOM.render() call '+'with ReactDOM.hydrate() if you want React to attach to the server HTML.');}}var newRoot=DOMRenderer.createContainer(container,shouldHydrate);root=container._reactRootContainer=newRoot;// Initial mount should not be batched.
DOMRenderer.unbatchedUpdates(function(){DOMRenderer.updateContainer(children,newRoot,parentComponent,callback);});}else{DOMRenderer.updateContainer(children,root,parentComponent,callback);}return DOMRenderer.getPublicRootInstance(root);}function createPortal(children,container){var key=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;!isValidContainer(container)?invariant(false,'Target container is not a DOM element.'):void 0;// TODO: pass ReactDOM portal implementation as third argument
return createPortal$1(children,container,null,key);}function ReactRoot(container,hydrate){var root=DOMRenderer.createContainer(container,hydrate);this._reactRootContainer=root;}ReactRoot.prototype.render=function(children,callback){var root=this._reactRootContainer;DOMRenderer.updateContainer(children,root,null,callback);};ReactRoot.prototype.unmount=function(callback){var root=this._reactRootContainer;DOMRenderer.updateContainer(null,root,null,callback);};var ReactDOM={createPortal:createPortal,findDOMNode:function findDOMNode(componentOrElement){{var owner=ReactCurrentOwner.current;if(owner!==null){var warnedAboutRefsInRender=owner.stateNode._warnedAboutRefsInRender;warning(warnedAboutRefsInRender,'%s is accessing findDOMNode inside its render(). '+'render() should be a pure function of props and state. It should '+'never access something that requires stale data from the previous '+'render, such as refs. Move this logic to componentDidMount and '+'componentDidUpdate instead.',getComponentName(owner)||'A component');owner.stateNode._warnedAboutRefsInRender=true;}}if(componentOrElement==null){return null;}if(componentOrElement.nodeType===ELEMENT_NODE){return componentOrElement;}var inst=get(componentOrElement);if(inst){return DOMRenderer.findHostInstance(inst);}if(typeof componentOrElement.render==='function'){invariant(false,'Unable to find node on an unmounted component.');}else{invariant(false,'Element appears to be neither ReactComponent nor DOMNode. Keys: %s',Object.keys(componentOrElement));}},hydrate:function hydrate(element,container,callback){// TODO: throw or warn if we couldn't hydrate?
return renderSubtreeIntoContainer(null,element,container,true,callback);},render:function render(element,container,callback){return renderSubtreeIntoContainer(null,element,container,false,callback);},unstable_renderSubtreeIntoContainer:function unstable_renderSubtreeIntoContainer(parentComponent,element,containerNode,callback){!(parentComponent!=null&&has(parentComponent))?invariant(false,'parentComponent must be a valid React Component'):void 0;return renderSubtreeIntoContainer(parentComponent,element,containerNode,false,callback);},unmountComponentAtNode:function unmountComponentAtNode(container){!isValidContainer(container)?invariant(false,'unmountComponentAtNode(...): Target container is not a DOM element.'):void 0;if(container._reactRootContainer){{var rootEl=getReactRootElementInContainer(container);var renderedByDifferentReact=rootEl&&!getInstanceFromNode$1(rootEl);warning(!renderedByDifferentReact,"unmountComponentAtNode(): The node you're attempting to unmount "+'was rendered by another copy of React.');}// Unmount should not be batched.
DOMRenderer.unbatchedUpdates(function(){renderSubtreeIntoContainer(null,null,container,false,function(){container._reactRootContainer=null;});});// If you call unmountComponentAtNode twice in quick succession, you'll
// get `true` twice. That's probably fine?
return true;}else{{var _rootEl=getReactRootElementInContainer(container);var hasNonRootReactChild=!!(_rootEl&&getInstanceFromNode$1(_rootEl));// Check if the container itself is a React root node.
var isContainerReactRoot=container.nodeType===1&&isValidContainer(container.parentNode)&&!!container.parentNode._reactRootContainer;warning(!hasNonRootReactChild,"unmountComponentAtNode(): The node you're attempting to unmount "+'was rendered by React and is not a top-level container. %s',isContainerReactRoot?'You may have accidentally passed in a React root node instead '+'of its container.':'Instead, have the parent component update its state and '+'rerender in order to remove this component.');}return false;}},// Temporary alias since we already shipped React 16 RC with it.
// TODO: remove in React 17.
unstable_createPortal:createPortal,unstable_batchedUpdates:batchedUpdates,unstable_deferredUpdates:DOMRenderer.deferredUpdates,flushSync:DOMRenderer.flushSync,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{// For TapEventPlugin which is popular in open source
EventPluginHub:EventPluginHub,// Used by test-utils
EventPluginRegistry:EventPluginRegistry,EventPropagators:EventPropagators,ReactControlledComponent:ReactControlledComponent,ReactDOMComponentTree:ReactDOMComponentTree,ReactDOMEventListener:ReactDOMEventListener}};if(enableCreateRoot){ReactDOM.createRoot=function createRoot(container,options){var hydrate=options!=null&&options.hydrate===true;return new ReactRoot(container,hydrate);};}var foundDevTools=DOMRenderer.injectIntoDevTools({findFiberByHostInstance:getClosestInstanceFromNode,bundleType:1,version:ReactVersion,rendererPackageName:'react-dom'});{if(!foundDevTools&&ExecutionEnvironment.canUseDOM&&window.top===window.self){// If we're in Chrome or Firefox, provide a download link if not installed.
if(navigator.userAgent.indexOf('Chrome')>-1&&navigator.userAgent.indexOf('Edge')===-1||navigator.userAgent.indexOf('Firefox')>-1){var protocol=window.location.protocol;// Don't warn in exotic cases like chrome-extension://.
if(/^(https?|file):$/.test(protocol)){console.info('%cDownload the React DevTools '+'for a better development experience: '+'https://fb.me/react-devtools'+(protocol==='file:'?'\nYou might need to use a local HTTP server (instead of file://): '+'https://fb.me/react-devtools-faq':''),'font-weight:bold');}}}}var ReactDOM$2=Object.freeze({default:ReactDOM});var ReactDOM$3=ReactDOM$2&&ReactDOM||ReactDOM$2;// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var reactDom=ReactDOM$3['default']?ReactDOM$3['default']:ReactDOM$3;module.exports=reactDom;})();}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var hyphenate = __webpack_require__(24);

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var camelize = __webpack_require__(26);

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(31)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(29)(undefined);
// imports


// module
exports.push([module.i, "/* h1 {\n\tfont-family: Arial;\n\tcolor: #FF0000;\n} */\ndiv {\n  background-color: #0F0;\n  color: #FFF; }\n\n#image {\n  background: url(" + __webpack_require__(30) + ");\n  height: 900px;\n  width: 900px; }\n", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(32);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ })
/******/ ]);