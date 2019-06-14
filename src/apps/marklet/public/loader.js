/******/ ;(function(modules) {
  // webpackBootstrap
  /******/ // The module cache
  /******/ var installedModules = {} // The require function
  /******/
  /******/ /******/ function __webpack_require__(moduleId) {
    /******/
    /******/ // Check if module is in cache
    /******/ if (installedModules[moduleId]) {
      /******/ return installedModules[moduleId].exports
      /******/
    } // Create a new module (and put it into the cache)
    /******/ /******/ var module = (installedModules[moduleId] = {
      /******/ i: moduleId,
      /******/ l: false,
      /******/ exports: {},
      /******/
    }) // Execute the module function
    /******/
    /******/ /******/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    ) // Flag the module as loaded
    /******/
    /******/ /******/ module.l = true // Return the exports of the module
    /******/
    /******/ /******/ return module.exports
    /******/
  } // expose the modules object (__webpack_modules__)
  /******/
  /******/
  /******/ /******/ __webpack_require__.m = modules // expose the module cache
  /******/
  /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
  /******/
  /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
    /******/ if (!__webpack_require__.o(exports, name)) {
      /******/ Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter,
      })
      /******/
    }
    /******/
  } // define __esModule on exports
  /******/
  /******/ /******/ __webpack_require__.r = function(exports) {
    /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/ Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module',
      })
      /******/
    }
    /******/ Object.defineProperty(exports, '__esModule', { value: true })
    /******/
  } // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
  /******/
  /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
    value,
    mode
  ) {
    /******/ if (mode & 1) value = __webpack_require__(value)
    /******/ if (mode & 8) return value
    /******/ if (
      mode & 4 &&
      typeof value === 'object' &&
      value &&
      value.__esModule
    )
      return value
    /******/ var ns = Object.create(null)
    /******/ __webpack_require__.r(ns)
    /******/ Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value,
    })
    /******/ if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function(key) {
            return value[key]
          }.bind(null, key)
        )
    /******/ return ns
    /******/
  } // getDefaultExport function for compatibility with non-harmony modules
  /******/
  /******/ /******/ __webpack_require__.n = function(module) {
    /******/ var getter =
      module && module.__esModule
        ? /******/ function getDefault() {
            return module['default']
          }
        : /******/ function getModuleExports() {
            return module
          }
    /******/ __webpack_require__.d(getter, 'a', getter)
    /******/ return getter
    /******/
  } // Object.prototype.hasOwnProperty.call
  /******/
  /******/ /******/ __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  } // __webpack_public_path__
  /******/
  /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
  /******/
  /******/
  /******/ /******/ return __webpack_require__(
    (__webpack_require__.s = './src/assets/loader.js')
  )
  /******/
})(
  /************************************************************************/
  /******/ {
    /***/ './node_modules/core-js/modules/_a-function.js':
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        module.exports = function(it) {
          if (typeof it != 'function')
            throw TypeError(it + ' is not a function!')
          return it
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_add-to-unscopables.js':
      /*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_add-to-unscopables.js ***!
  \*************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // 22.1.3.31 Array.prototype[@@unscopables]
        var UNSCOPABLES = __webpack_require__(
          /*! ./_wks */ './node_modules/core-js/modules/_wks.js'
        )('unscopables')
        var ArrayProto = Array.prototype
        if (ArrayProto[UNSCOPABLES] == undefined)
          __webpack_require__(
            /*! ./_hide */ './node_modules/core-js/modules/_hide.js'
          )(ArrayProto, UNSCOPABLES, {})
        module.exports = function(key) {
          ArrayProto[UNSCOPABLES][key] = true
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_an-object.js':
      /*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(
          /*! ./_is-object */ './node_modules/core-js/modules/_is-object.js'
        )
        module.exports = function(it) {
          if (!isObject(it)) throw TypeError(it + ' is not an object!')
          return it
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_array-includes.js':
      /*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // false -> Array#indexOf
        // true  -> Array#includes
        var toIObject = __webpack_require__(
          /*! ./_to-iobject */ './node_modules/core-js/modules/_to-iobject.js'
        )
        var toLength = __webpack_require__(
          /*! ./_to-length */ './node_modules/core-js/modules/_to-length.js'
        )
        var toAbsoluteIndex = __webpack_require__(
          /*! ./_to-absolute-index */ './node_modules/core-js/modules/_to-absolute-index.js'
        )
        module.exports = function(IS_INCLUDES) {
          return function($this, el, fromIndex) {
            var O = toIObject($this)
            var length = toLength(O.length)
            var index = toAbsoluteIndex(fromIndex, length)
            var value
            // Array#includes uses SameValueZero equality algorithm
            // eslint-disable-next-line no-self-compare
            if (IS_INCLUDES && el != el)
              while (length > index) {
                value = O[index++]
                // eslint-disable-next-line no-self-compare
                if (value != value) return true
                // Array#indexOf ignores holes, Array#includes - not
              }
            else
              for (; length > index; index++)
                if (IS_INCLUDES || index in O) {
                  if (O[index] === el) return IS_INCLUDES || index || 0
                }
            return !IS_INCLUDES && -1
          }
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_cof.js':
      /*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        var toString = {}.toString

        module.exports = function(it) {
          return toString.call(it).slice(8, -1)
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_core.js':
      /*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        var core = (module.exports = { version: '2.6.5' })
        if (typeof __e == 'number') __e = core // eslint-disable-line no-undef

        /***/
      },

    /***/ './node_modules/core-js/modules/_ctx.js':
      /*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // optional / simple context binding
        var aFunction = __webpack_require__(
          /*! ./_a-function */ './node_modules/core-js/modules/_a-function.js'
        )
        module.exports = function(fn, that, length) {
          aFunction(fn)
          if (that === undefined) return fn
          switch (length) {
            case 1:
              return function(a) {
                return fn.call(that, a)
              }
            case 2:
              return function(a, b) {
                return fn.call(that, a, b)
              }
            case 3:
              return function(a, b, c) {
                return fn.call(that, a, b, c)
              }
          }
          return function(/* ...args */) {
            return fn.apply(that, arguments)
          }
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_defined.js':
      /*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        // 7.2.1 RequireObjectCoercible(argument)
        module.exports = function(it) {
          if (it == undefined) throw TypeError("Can't call method on  " + it)
          return it
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_descriptors.js':
      /*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // Thank's IE8 for his funny defineProperty
        module.exports = !__webpack_require__(
          /*! ./_fails */ './node_modules/core-js/modules/_fails.js'
        )(function() {
          return (
            Object.defineProperty({}, 'a', {
              get: function() {
                return 7
              },
            }).a != 7
          )
        })

        /***/
      },

    /***/ './node_modules/core-js/modules/_dom-create.js':
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(
          /*! ./_is-object */ './node_modules/core-js/modules/_is-object.js'
        )
        var document = __webpack_require__(
          /*! ./_global */ './node_modules/core-js/modules/_global.js'
        ).document
        // typeof document.createElement is 'object' in old IE
        var is = isObject(document) && isObject(document.createElement)
        module.exports = function(it) {
          return is ? document.createElement(it) : {}
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_enum-bug-keys.js':
      /*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        // IE 8- don't enum bug keys
        module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
          ','
        )

        /***/
      },

    /***/ './node_modules/core-js/modules/_enum-keys.js':
      /*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // all enumerable object keys, includes symbols
        var getKeys = __webpack_require__(
          /*! ./_object-keys */ './node_modules/core-js/modules/_object-keys.js'
        )
        var gOPS = __webpack_require__(
          /*! ./_object-gops */ './node_modules/core-js/modules/_object-gops.js'
        )
        var pIE = __webpack_require__(
          /*! ./_object-pie */ './node_modules/core-js/modules/_object-pie.js'
        )
        module.exports = function(it) {
          var result = getKeys(it)
          var getSymbols = gOPS.f
          if (getSymbols) {
            var symbols = getSymbols(it)
            var isEnum = pIE.f
            var i = 0
            var key
            while (symbols.length > i)
              if (isEnum.call(it, (key = symbols[i++]))) result.push(key)
          }
          return result
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_export.js':
      /*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var global = __webpack_require__(
          /*! ./_global */ './node_modules/core-js/modules/_global.js'
        )
        var core = __webpack_require__(
          /*! ./_core */ './node_modules/core-js/modules/_core.js'
        )
        var hide = __webpack_require__(
          /*! ./_hide */ './node_modules/core-js/modules/_hide.js'
        )
        var redefine = __webpack_require__(
          /*! ./_redefine */ './node_modules/core-js/modules/_redefine.js'
        )
        var ctx = __webpack_require__(
          /*! ./_ctx */ './node_modules/core-js/modules/_ctx.js'
        )
        var PROTOTYPE = 'prototype'

        var $export = function(type, name, source) {
          var IS_FORCED = type & $export.F
          var IS_GLOBAL = type & $export.G
          var IS_STATIC = type & $export.S
          var IS_PROTO = type & $export.P
          var IS_BIND = type & $export.B
          var target = IS_GLOBAL
            ? global
            : IS_STATIC
            ? global[name] || (global[name] = {})
            : (global[name] || {})[PROTOTYPE]
          var exports = IS_GLOBAL ? core : core[name] || (core[name] = {})
          var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
          var key, own, out, exp
          if (IS_GLOBAL) source = name
          for (key in source) {
            // contains in native
            own = !IS_FORCED && target && target[key] !== undefined
            // export native or passed
            out = (own ? target : source)[key]
            // bind timers to global for call from export context
            exp =
              IS_BIND && own
                ? ctx(out, global)
                : IS_PROTO && typeof out == 'function'
                ? ctx(Function.call, out)
                : out
            // extend global
            if (target) redefine(target, key, out, type & $export.U)
            // export
            if (exports[key] != out) hide(exports, key, exp)
            if (IS_PROTO && expProto[key] != out) expProto[key] = out
          }
        }
        global.core = core
        // type bitmap
        $export.F = 1 // forced
        $export.G = 2 // global
        $export.S = 4 // static
        $export.P = 8 // proto
        $export.B = 16 // bind
        $export.W = 32 // wrap
        $export.U = 64 // safe
        $export.R = 128 // real proto method for `library`
        module.exports = $export

        /***/
      },

    /***/ './node_modules/core-js/modules/_fails.js':
      /*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        module.exports = function(exec) {
          try {
            return !!exec()
          } catch (e) {
            return true
          }
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_function-to-string.js':
      /*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/_function-to-string.js ***!
  \*************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
          /*! ./_shared */ './node_modules/core-js/modules/_shared.js'
        )('native-function-to-string', Function.toString)

        /***/
      },

    /***/ './node_modules/core-js/modules/_global.js':
      /*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        var global = (module.exports =
          typeof window != 'undefined' && window.Math == Math
            ? window
            : typeof self != 'undefined' && self.Math == Math
            ? self
            : // eslint-disable-next-line no-new-func
              Function('return this')())
        if (typeof __g == 'number') __g = global // eslint-disable-line no-undef

        /***/
      },

    /***/ './node_modules/core-js/modules/_has.js':
      /*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        var hasOwnProperty = {}.hasOwnProperty
        module.exports = function(it, key) {
          return hasOwnProperty.call(it, key)
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_hide.js':
      /*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(
          /*! ./_object-dp */ './node_modules/core-js/modules/_object-dp.js'
        )
        var createDesc = __webpack_require__(
          /*! ./_property-desc */ './node_modules/core-js/modules/_property-desc.js'
        )
        module.exports = __webpack_require__(
          /*! ./_descriptors */ './node_modules/core-js/modules/_descriptors.js'
        )
          ? function(object, key, value) {
              return dP.f(object, key, createDesc(1, value))
            }
          : function(object, key, value) {
              object[key] = value
              return object
            }

        /***/
      },

    /***/ './node_modules/core-js/modules/_html.js':
      /*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var document = __webpack_require__(
          /*! ./_global */ './node_modules/core-js/modules/_global.js'
        ).document
        module.exports = document && document.documentElement

        /***/
      },

    /***/ './node_modules/core-js/modules/_ie8-dom-define.js':
      /*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        module.exports =
          !__webpack_require__(
            /*! ./_descriptors */ './node_modules/core-js/modules/_descriptors.js'
          ) &&
          !__webpack_require__(
            /*! ./_fails */ './node_modules/core-js/modules/_fails.js'
          )(function() {
            return (
              Object.defineProperty(
                __webpack_require__(
                  /*! ./_dom-create */ './node_modules/core-js/modules/_dom-create.js'
                )('div'),
                'a',
                {
                  get: function() {
                    return 7
                  },
                }
              ).a != 7
            )
          })

        /***/
      },

    /***/ './node_modules/core-js/modules/_iobject.js':
      /*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // fallback for non-array-like ES3 and non-enumerable old V8 strings
        var cof = __webpack_require__(
          /*! ./_cof */ './node_modules/core-js/modules/_cof.js'
        )
        // eslint-disable-next-line no-prototype-builtins
        module.exports = Object('z').propertyIsEnumerable(0)
          ? Object
          : function(it) {
              return cof(it) == 'String' ? it.split('') : Object(it)
            }

        /***/
      },

    /***/ './node_modules/core-js/modules/_is-array.js':
      /*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // 7.2.2 IsArray(argument)
        var cof = __webpack_require__(
          /*! ./_cof */ './node_modules/core-js/modules/_cof.js'
        )
        module.exports =
          Array.isArray ||
          function isArray(arg) {
            return cof(arg) == 'Array'
          }

        /***/
      },

    /***/ './node_modules/core-js/modules/_is-object.js':
      /*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        module.exports = function(it) {
          return typeof it === 'object' ? it !== null : typeof it === 'function'
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_iter-create.js':
      /*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-create.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        var create = __webpack_require__(
          /*! ./_object-create */ './node_modules/core-js/modules/_object-create.js'
        )
        var descriptor = __webpack_require__(
          /*! ./_property-desc */ './node_modules/core-js/modules/_property-desc.js'
        )
        var setToStringTag = __webpack_require__(
          /*! ./_set-to-string-tag */ './node_modules/core-js/modules/_set-to-string-tag.js'
        )
        var IteratorPrototype = {}

        // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
        __webpack_require__(
          /*! ./_hide */ './node_modules/core-js/modules/_hide.js'
        )(
          IteratorPrototype,
          __webpack_require__(
            /*! ./_wks */ './node_modules/core-js/modules/_wks.js'
          )('iterator'),
          function() {
            return this
          }
        )

        module.exports = function(Constructor, NAME, next) {
          Constructor.prototype = create(IteratorPrototype, {
            next: descriptor(1, next),
          })
          setToStringTag(Constructor, NAME + ' Iterator')
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_iter-define.js':
      /*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-define.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        var LIBRARY = __webpack_require__(
          /*! ./_library */ './node_modules/core-js/modules/_library.js'
        )
        var $export = __webpack_require__(
          /*! ./_export */ './node_modules/core-js/modules/_export.js'
        )
        var redefine = __webpack_require__(
          /*! ./_redefine */ './node_modules/core-js/modules/_redefine.js'
        )
        var hide = __webpack_require__(
          /*! ./_hide */ './node_modules/core-js/modules/_hide.js'
        )
        var Iterators = __webpack_require__(
          /*! ./_iterators */ './node_modules/core-js/modules/_iterators.js'
        )
        var $iterCreate = __webpack_require__(
          /*! ./_iter-create */ './node_modules/core-js/modules/_iter-create.js'
        )
        var setToStringTag = __webpack_require__(
          /*! ./_set-to-string-tag */ './node_modules/core-js/modules/_set-to-string-tag.js'
        )
        var getPrototypeOf = __webpack_require__(
          /*! ./_object-gpo */ './node_modules/core-js/modules/_object-gpo.js'
        )
        var ITERATOR = __webpack_require__(
          /*! ./_wks */ './node_modules/core-js/modules/_wks.js'
        )('iterator')
        var BUGGY = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
        var FF_ITERATOR = '@@iterator'
        var KEYS = 'keys'
        var VALUES = 'values'

        var returnThis = function() {
          return this
        }

        module.exports = function(
          Base,
          NAME,
          Constructor,
          next,
          DEFAULT,
          IS_SET,
          FORCED
        ) {
          $iterCreate(Constructor, NAME, next)
          var getMethod = function(kind) {
            if (!BUGGY && kind in proto) return proto[kind]
            switch (kind) {
              case KEYS:
                return function keys() {
                  return new Constructor(this, kind)
                }
              case VALUES:
                return function values() {
                  return new Constructor(this, kind)
                }
            }
            return function entries() {
              return new Constructor(this, kind)
            }
          }
          var TAG = NAME + ' Iterator'
          var DEF_VALUES = DEFAULT == VALUES
          var VALUES_BUG = false
          var proto = Base.prototype
          var $native =
            proto[ITERATOR] || proto[FF_ITERATOR] || (DEFAULT && proto[DEFAULT])
          var $default = $native || getMethod(DEFAULT)
          var $entries = DEFAULT
            ? !DEF_VALUES
              ? $default
              : getMethod('entries')
            : undefined
          var $anyNative = NAME == 'Array' ? proto.entries || $native : $native
          var methods, key, IteratorPrototype
          // Fix native
          if ($anyNative) {
            IteratorPrototype = getPrototypeOf($anyNative.call(new Base()))
            if (
              IteratorPrototype !== Object.prototype &&
              IteratorPrototype.next
            ) {
              // Set @@toStringTag to native iterators
              setToStringTag(IteratorPrototype, TAG, true)
              // fix for some old engines
              if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function')
                hide(IteratorPrototype, ITERATOR, returnThis)
            }
          }
          // fix Array#{values, @@iterator}.name in V8 / FF
          if (DEF_VALUES && $native && $native.name !== VALUES) {
            VALUES_BUG = true
            $default = function values() {
              return $native.call(this)
            }
          }
          // Define iterator
          if (
            (!LIBRARY || FORCED) &&
            (BUGGY || VALUES_BUG || !proto[ITERATOR])
          ) {
            hide(proto, ITERATOR, $default)
          }
          // Plug for library
          Iterators[NAME] = $default
          Iterators[TAG] = returnThis
          if (DEFAULT) {
            methods = {
              values: DEF_VALUES ? $default : getMethod(VALUES),
              keys: IS_SET ? $default : getMethod(KEYS),
              entries: $entries,
            }
            if (FORCED)
              for (key in methods) {
                if (!(key in proto)) redefine(proto, key, methods[key])
              }
            else
              $export(
                $export.P + $export.F * (BUGGY || VALUES_BUG),
                NAME,
                methods
              )
          }
          return methods
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_iter-step.js':
      /*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iter-step.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        module.exports = function(done, value) {
          return { value: value, done: !!done }
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_iterators.js':
      /*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_iterators.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        module.exports = {}

        /***/
      },

    /***/ './node_modules/core-js/modules/_library.js':
      /*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        module.exports = false

        /***/
      },

    /***/ './node_modules/core-js/modules/_meta.js':
      /*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var META = __webpack_require__(
          /*! ./_uid */ './node_modules/core-js/modules/_uid.js'
        )('meta')
        var isObject = __webpack_require__(
          /*! ./_is-object */ './node_modules/core-js/modules/_is-object.js'
        )
        var has = __webpack_require__(
          /*! ./_has */ './node_modules/core-js/modules/_has.js'
        )
        var setDesc = __webpack_require__(
          /*! ./_object-dp */ './node_modules/core-js/modules/_object-dp.js'
        ).f
        var id = 0
        var isExtensible =
          Object.isExtensible ||
          function() {
            return true
          }
        var FREEZE = !__webpack_require__(
          /*! ./_fails */ './node_modules/core-js/modules/_fails.js'
        )(function() {
          return isExtensible(Object.preventExtensions({}))
        })
        var setMeta = function(it) {
          setDesc(it, META, {
            value: {
              i: 'O' + ++id, // object ID
              w: {}, // weak collections IDs
            },
          })
        }
        var fastKey = function(it, create) {
          // return primitive with prefix
          if (!isObject(it))
            return typeof it == 'symbol'
              ? it
              : (typeof it == 'string' ? 'S' : 'P') + it
          if (!has(it, META)) {
            // can't set metadata to uncaught frozen object
            if (!isExtensible(it)) return 'F'
            // not necessary to add metadata
            if (!create) return 'E'
            // add missing metadata
            setMeta(it)
            // return object ID
          }
          return it[META].i
        }
        var getWeak = function(it, create) {
          if (!has(it, META)) {
            // can't set metadata to uncaught frozen object
            if (!isExtensible(it)) return true
            // not necessary to add metadata
            if (!create) return false
            // add missing metadata
            setMeta(it)
            // return hash weak collections IDs
          }
          return it[META].w
        }
        // add metadata on freeze-family methods calling
        var onFreeze = function(it) {
          if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META))
            setMeta(it)
          return it
        }
        var meta = (module.exports = {
          KEY: META,
          NEED: false,
          fastKey: fastKey,
          getWeak: getWeak,
          onFreeze: onFreeze,
        })

        /***/
      },

    /***/ './node_modules/core-js/modules/_object-create.js':
      /*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
        var anObject = __webpack_require__(
          /*! ./_an-object */ './node_modules/core-js/modules/_an-object.js'
        )
        var dPs = __webpack_require__(
          /*! ./_object-dps */ './node_modules/core-js/modules/_object-dps.js'
        )
        var enumBugKeys = __webpack_require__(
          /*! ./_enum-bug-keys */ './node_modules/core-js/modules/_enum-bug-keys.js'
        )
        var IE_PROTO = __webpack_require__(
          /*! ./_shared-key */ './node_modules/core-js/modules/_shared-key.js'
        )('IE_PROTO')
        var Empty = function() {
          /* empty */
        }
        var PROTOTYPE = 'prototype'

        // Create object with fake `null` prototype: use iframe Object with cleared prototype
        var createDict = function() {
          // Thrash, waste and sodomy: IE GC bug
          var iframe = __webpack_require__(
            /*! ./_dom-create */ './node_modules/core-js/modules/_dom-create.js'
          )('iframe')
          var i = enumBugKeys.length
          var lt = '<'
          var gt = '>'
          var iframeDocument
          iframe.style.display = 'none'
          __webpack_require__(
            /*! ./_html */ './node_modules/core-js/modules/_html.js'
          ).appendChild(iframe)
          iframe.src = 'javascript:' // eslint-disable-line no-script-url
          // createDict = iframe.contentWindow.Object;
          // html.removeChild(iframe);
          iframeDocument = iframe.contentWindow.document
          iframeDocument.open()
          iframeDocument.write(
            lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt
          )
          iframeDocument.close()
          createDict = iframeDocument.F
          while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]]
          return createDict()
        }

        module.exports =
          Object.create ||
          function create(O, Properties) {
            var result
            if (O !== null) {
              Empty[PROTOTYPE] = anObject(O)
              result = new Empty()
              Empty[PROTOTYPE] = null
              // add "__proto__" for Object.getPrototypeOf polyfill
              result[IE_PROTO] = O
            } else result = createDict()
            return Properties === undefined ? result : dPs(result, Properties)
          }

        /***/
      },

    /***/ './node_modules/core-js/modules/_object-dp.js':
      /*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(
          /*! ./_an-object */ './node_modules/core-js/modules/_an-object.js'
        )
        var IE8_DOM_DEFINE = __webpack_require__(
          /*! ./_ie8-dom-define */ './node_modules/core-js/modules/_ie8-dom-define.js'
        )
        var toPrimitive = __webpack_require__(
          /*! ./_to-primitive */ './node_modules/core-js/modules/_to-primitive.js'
        )
        var dP = Object.defineProperty

        exports.f = __webpack_require__(
          /*! ./_descriptors */ './node_modules/core-js/modules/_descriptors.js'
        )
          ? Object.defineProperty
          : function defineProperty(O, P, Attributes) {
              anObject(O)
              P = toPrimitive(P, true)
              anObject(Attributes)
              if (IE8_DOM_DEFINE)
                try {
                  return dP(O, P, Attributes)
                } catch (e) {
                  /* empty */
                }
              if ('get' in Attributes || 'set' in Attributes)
                throw TypeError('Accessors not supported!')
              if ('value' in Attributes) O[P] = Attributes.value
              return O
            }

        /***/
      },

    /***/ './node_modules/core-js/modules/_object-dps.js':
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(
          /*! ./_object-dp */ './node_modules/core-js/modules/_object-dp.js'
        )
        var anObject = __webpack_require__(
          /*! ./_an-object */ './node_modules/core-js/modules/_an-object.js'
        )
        var getKeys = __webpack_require__(
          /*! ./_object-keys */ './node_modules/core-js/modules/_object-keys.js'
        )

        module.exports = __webpack_require__(
          /*! ./_descriptors */ './node_modules/core-js/modules/_descriptors.js'
        )
          ? Object.defineProperties
          : function defineProperties(O, Properties) {
              anObject(O)
              var keys = getKeys(Properties)
              var length = keys.length
              var i = 0
              var P
              while (length > i) dP.f(O, (P = keys[i++]), Properties[P])
              return O
            }

        /***/
      },

    /***/ './node_modules/core-js/modules/_object-gopd.js':
      /*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var pIE = __webpack_require__(
          /*! ./_object-pie */ './node_modules/core-js/modules/_object-pie.js'
        )
        var createDesc = __webpack_require__(
          /*! ./_property-desc */ './node_modules/core-js/modules/_property-desc.js'
        )
        var toIObject = __webpack_require__(
          /*! ./_to-iobject */ './node_modules/core-js/modules/_to-iobject.js'
        )
        var toPrimitive = __webpack_require__(
          /*! ./_to-primitive */ './node_modules/core-js/modules/_to-primitive.js'
        )
        var has = __webpack_require__(
          /*! ./_has */ './node_modules/core-js/modules/_has.js'
        )
        var IE8_DOM_DEFINE = __webpack_require__(
          /*! ./_ie8-dom-define */ './node_modules/core-js/modules/_ie8-dom-define.js'
        )
        var gOPD = Object.getOwnPropertyDescriptor

        exports.f = __webpack_require__(
          /*! ./_descriptors */ './node_modules/core-js/modules/_descriptors.js'
        )
          ? gOPD
          : function getOwnPropertyDescriptor(O, P) {
              O = toIObject(O)
              P = toPrimitive(P, true)
              if (IE8_DOM_DEFINE)
                try {
                  return gOPD(O, P)
                } catch (e) {
                  /* empty */
                }
              if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P])
            }

        /***/
      },

    /***/ './node_modules/core-js/modules/_object-gopn-ext.js':
      /*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
        var toIObject = __webpack_require__(
          /*! ./_to-iobject */ './node_modules/core-js/modules/_to-iobject.js'
        )
        var gOPN = __webpack_require__(
          /*! ./_object-gopn */ './node_modules/core-js/modules/_object-gopn.js'
        ).f
        var toString = {}.toString

        var windowNames =
          typeof window == 'object' && window && Object.getOwnPropertyNames
            ? Object.getOwnPropertyNames(window)
            : []

        var getWindowNames = function(it) {
          try {
            return gOPN(it)
          } catch (e) {
            return windowNames.slice()
          }
        }

        module.exports.f = function getOwnPropertyNames(it) {
          return windowNames && toString.call(it) == '[object Window]'
            ? getWindowNames(it)
            : gOPN(toIObject(it))
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_object-gopn.js':
      /*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
        var $keys = __webpack_require__(
          /*! ./_object-keys-internal */ './node_modules/core-js/modules/_object-keys-internal.js'
        )
        var hiddenKeys = __webpack_require__(
          /*! ./_enum-bug-keys */ './node_modules/core-js/modules/_enum-bug-keys.js'
        ).concat('length', 'prototype')

        exports.f =
          Object.getOwnPropertyNames ||
          function getOwnPropertyNames(O) {
            return $keys(O, hiddenKeys)
          }

        /***/
      },

    /***/ './node_modules/core-js/modules/_object-gops.js':
      /*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        exports.f = Object.getOwnPropertySymbols

        /***/
      },

    /***/ './node_modules/core-js/modules/_object-gpo.js':
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
        var has = __webpack_require__(
          /*! ./_has */ './node_modules/core-js/modules/_has.js'
        )
        var toObject = __webpack_require__(
          /*! ./_to-object */ './node_modules/core-js/modules/_to-object.js'
        )
        var IE_PROTO = __webpack_require__(
          /*! ./_shared-key */ './node_modules/core-js/modules/_shared-key.js'
        )('IE_PROTO')
        var ObjectProto = Object.prototype

        module.exports =
          Object.getPrototypeOf ||
          function(O) {
            O = toObject(O)
            if (has(O, IE_PROTO)) return O[IE_PROTO]
            if (
              typeof O.constructor == 'function' &&
              O instanceof O.constructor
            ) {
              return O.constructor.prototype
            }
            return O instanceof Object ? ObjectProto : null
          }

        /***/
      },

    /***/ './node_modules/core-js/modules/_object-keys-internal.js':
      /*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var has = __webpack_require__(
          /*! ./_has */ './node_modules/core-js/modules/_has.js'
        )
        var toIObject = __webpack_require__(
          /*! ./_to-iobject */ './node_modules/core-js/modules/_to-iobject.js'
        )
        var arrayIndexOf = __webpack_require__(
          /*! ./_array-includes */ './node_modules/core-js/modules/_array-includes.js'
        )(false)
        var IE_PROTO = __webpack_require__(
          /*! ./_shared-key */ './node_modules/core-js/modules/_shared-key.js'
        )('IE_PROTO')

        module.exports = function(object, names) {
          var O = toIObject(object)
          var i = 0
          var result = []
          var key
          for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key)
          // Don't enum bug & hidden keys
          while (names.length > i)
            if (has(O, (key = names[i++]))) {
              ~arrayIndexOf(result, key) || result.push(key)
            }
          return result
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_object-keys.js':
      /*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // 19.1.2.14 / 15.2.3.14 Object.keys(O)
        var $keys = __webpack_require__(
          /*! ./_object-keys-internal */ './node_modules/core-js/modules/_object-keys-internal.js'
        )
        var enumBugKeys = __webpack_require__(
          /*! ./_enum-bug-keys */ './node_modules/core-js/modules/_enum-bug-keys.js'
        )

        module.exports =
          Object.keys ||
          function keys(O) {
            return $keys(O, enumBugKeys)
          }

        /***/
      },

    /***/ './node_modules/core-js/modules/_object-pie.js':
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        exports.f = {}.propertyIsEnumerable

        /***/
      },

    /***/ './node_modules/core-js/modules/_object-sap.js':
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // most Object methods by ES6 should accept primitives
        var $export = __webpack_require__(
          /*! ./_export */ './node_modules/core-js/modules/_export.js'
        )
        var core = __webpack_require__(
          /*! ./_core */ './node_modules/core-js/modules/_core.js'
        )
        var fails = __webpack_require__(
          /*! ./_fails */ './node_modules/core-js/modules/_fails.js'
        )
        module.exports = function(KEY, exec) {
          var fn = (core.Object || {})[KEY] || Object[KEY]
          var exp = {}
          exp[KEY] = exec(fn)
          $export(
            $export.S +
              $export.F *
                fails(function() {
                  fn(1)
                }),
            'Object',
            exp
          )
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_property-desc.js':
      /*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        module.exports = function(bitmap, value) {
          return {
            enumerable: !(bitmap & 1),
            configurable: !(bitmap & 2),
            writable: !(bitmap & 4),
            value: value,
          }
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_redefine.js':
      /*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var global = __webpack_require__(
          /*! ./_global */ './node_modules/core-js/modules/_global.js'
        )
        var hide = __webpack_require__(
          /*! ./_hide */ './node_modules/core-js/modules/_hide.js'
        )
        var has = __webpack_require__(
          /*! ./_has */ './node_modules/core-js/modules/_has.js'
        )
        var SRC = __webpack_require__(
          /*! ./_uid */ './node_modules/core-js/modules/_uid.js'
        )('src')
        var $toString = __webpack_require__(
          /*! ./_function-to-string */ './node_modules/core-js/modules/_function-to-string.js'
        )
        var TO_STRING = 'toString'
        var TPL = ('' + $toString).split(TO_STRING)

        __webpack_require__(
          /*! ./_core */ './node_modules/core-js/modules/_core.js'
        ).inspectSource = function(it) {
          return $toString.call(it)
        }

        ;(module.exports = function(O, key, val, safe) {
          var isFunction = typeof val == 'function'
          if (isFunction) has(val, 'name') || hide(val, 'name', key)
          if (O[key] === val) return
          if (isFunction)
            has(val, SRC) ||
              hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)))
          if (O === global) {
            O[key] = val
          } else if (!safe) {
            delete O[key]
            hide(O, key, val)
          } else if (O[key]) {
            O[key] = val
          } else {
            hide(O, key, val)
          }
          // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
        })(Function.prototype, TO_STRING, function toString() {
          return (
            (typeof this == 'function' && this[SRC]) || $toString.call(this)
          )
        })

        /***/
      },

    /***/ './node_modules/core-js/modules/_set-proto.js':
      /*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // Works with __proto__ only. Old v8 can't work with null proto objects.
        /* eslint-disable no-proto */
        var isObject = __webpack_require__(
          /*! ./_is-object */ './node_modules/core-js/modules/_is-object.js'
        )
        var anObject = __webpack_require__(
          /*! ./_an-object */ './node_modules/core-js/modules/_an-object.js'
        )
        var check = function(O, proto) {
          anObject(O)
          if (!isObject(proto) && proto !== null)
            throw TypeError(proto + ": can't set as prototype!")
        }
        module.exports = {
          set:
            Object.setPrototypeOf ||
            ('__proto__' in {} // eslint-disable-line
              ? (function(test, buggy, set) {
                  try {
                    set = __webpack_require__(
                      /*! ./_ctx */ './node_modules/core-js/modules/_ctx.js'
                    )(
                      Function.call,
                      __webpack_require__(
                        /*! ./_object-gopd */ './node_modules/core-js/modules/_object-gopd.js'
                      ).f(Object.prototype, '__proto__').set,
                      2
                    )
                    set(test, [])
                    buggy = !(test instanceof Array)
                  } catch (e) {
                    buggy = true
                  }
                  return function setPrototypeOf(O, proto) {
                    check(O, proto)
                    if (buggy) O.__proto__ = proto
                    else set(O, proto)
                    return O
                  }
                })({}, false)
              : undefined),
          check: check,
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_set-to-string-tag.js':
      /*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var def = __webpack_require__(
          /*! ./_object-dp */ './node_modules/core-js/modules/_object-dp.js'
        ).f
        var has = __webpack_require__(
          /*! ./_has */ './node_modules/core-js/modules/_has.js'
        )
        var TAG = __webpack_require__(
          /*! ./_wks */ './node_modules/core-js/modules/_wks.js'
        )('toStringTag')

        module.exports = function(it, tag, stat) {
          if (it && !has((it = stat ? it : it.prototype), TAG))
            def(it, TAG, { configurable: true, value: tag })
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_shared-key.js':
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var shared = __webpack_require__(
          /*! ./_shared */ './node_modules/core-js/modules/_shared.js'
        )('keys')
        var uid = __webpack_require__(
          /*! ./_uid */ './node_modules/core-js/modules/_uid.js'
        )
        module.exports = function(key) {
          return shared[key] || (shared[key] = uid(key))
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_shared.js':
      /*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var core = __webpack_require__(
          /*! ./_core */ './node_modules/core-js/modules/_core.js'
        )
        var global = __webpack_require__(
          /*! ./_global */ './node_modules/core-js/modules/_global.js'
        )
        var SHARED = '__core-js_shared__'
        var store = global[SHARED] || (global[SHARED] = {})

        ;(module.exports = function(key, value) {
          return store[key] || (store[key] = value !== undefined ? value : {})
        })('versions', []).push({
          version: core.version,
          mode: __webpack_require__(
            /*! ./_library */ './node_modules/core-js/modules/_library.js'
          )
            ? 'pure'
            : 'global',
          copyright: '© 2019 Denis Pushkarev (zloirock.ru)',
        })

        /***/
      },

    /***/ './node_modules/core-js/modules/_to-absolute-index.js':
      /*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(
          /*! ./_to-integer */ './node_modules/core-js/modules/_to-integer.js'
        )
        var max = Math.max
        var min = Math.min
        module.exports = function(index, length) {
          index = toInteger(index)
          return index < 0 ? max(index + length, 0) : min(index, length)
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_to-integer.js':
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        // 7.1.4 ToInteger
        var ceil = Math.ceil
        var floor = Math.floor
        module.exports = function(it) {
          return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it)
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_to-iobject.js':
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // to indexed object, toObject with fallback for non-array-like ES3 strings
        var IObject = __webpack_require__(
          /*! ./_iobject */ './node_modules/core-js/modules/_iobject.js'
        )
        var defined = __webpack_require__(
          /*! ./_defined */ './node_modules/core-js/modules/_defined.js'
        )
        module.exports = function(it) {
          return IObject(defined(it))
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_to-length.js':
      /*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // 7.1.15 ToLength
        var toInteger = __webpack_require__(
          /*! ./_to-integer */ './node_modules/core-js/modules/_to-integer.js'
        )
        var min = Math.min
        module.exports = function(it) {
          return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0 // pow(2, 53) - 1 == 9007199254740991
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_to-object.js':
      /*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // 7.1.13 ToObject(argument)
        var defined = __webpack_require__(
          /*! ./_defined */ './node_modules/core-js/modules/_defined.js'
        )
        module.exports = function(it) {
          return Object(defined(it))
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_to-primitive.js':
      /*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // 7.1.1 ToPrimitive(input [, PreferredType])
        var isObject = __webpack_require__(
          /*! ./_is-object */ './node_modules/core-js/modules/_is-object.js'
        )
        // instead of the ES6 spec version, we didn't implement @@toPrimitive case
        // and the second argument - flag - preferred type is a string
        module.exports = function(it, S) {
          if (!isObject(it)) return it
          var fn, val
          if (
            S &&
            typeof (fn = it.toString) == 'function' &&
            !isObject((val = fn.call(it)))
          )
            return val
          if (
            typeof (fn = it.valueOf) == 'function' &&
            !isObject((val = fn.call(it)))
          )
            return val
          if (
            !S &&
            typeof (fn = it.toString) == 'function' &&
            !isObject((val = fn.call(it)))
          )
            return val
          throw TypeError("Can't convert object to primitive value")
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_uid.js':
      /*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
        var id = 0
        var px = Math.random()
        module.exports = function(key) {
          return 'Symbol('.concat(
            key === undefined ? '' : key,
            ')_',
            (++id + px).toString(36)
          )
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_wks-define.js':
      /*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var global = __webpack_require__(
          /*! ./_global */ './node_modules/core-js/modules/_global.js'
        )
        var core = __webpack_require__(
          /*! ./_core */ './node_modules/core-js/modules/_core.js'
        )
        var LIBRARY = __webpack_require__(
          /*! ./_library */ './node_modules/core-js/modules/_library.js'
        )
        var wksExt = __webpack_require__(
          /*! ./_wks-ext */ './node_modules/core-js/modules/_wks-ext.js'
        )
        var defineProperty = __webpack_require__(
          /*! ./_object-dp */ './node_modules/core-js/modules/_object-dp.js'
        ).f
        module.exports = function(name) {
          var $Symbol =
            core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {})
          if (name.charAt(0) != '_' && !(name in $Symbol))
            defineProperty($Symbol, name, { value: wksExt.f(name) })
        }

        /***/
      },

    /***/ './node_modules/core-js/modules/_wks-ext.js':
      /*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        exports.f = __webpack_require__(
          /*! ./_wks */ './node_modules/core-js/modules/_wks.js'
        )

        /***/
      },

    /***/ './node_modules/core-js/modules/_wks.js':
      /*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var store = __webpack_require__(
          /*! ./_shared */ './node_modules/core-js/modules/_shared.js'
        )('wks')
        var uid = __webpack_require__(
          /*! ./_uid */ './node_modules/core-js/modules/_uid.js'
        )
        var Symbol = __webpack_require__(
          /*! ./_global */ './node_modules/core-js/modules/_global.js'
        ).Symbol
        var USE_SYMBOL = typeof Symbol == 'function'

        var $exports = (module.exports = function(name) {
          return (
            store[name] ||
            (store[name] =
              (USE_SYMBOL && Symbol[name]) ||
              (USE_SYMBOL ? Symbol : uid)('Symbol.' + name))
          )
        })

        $exports.store = store

        /***/
      },

    /***/ './node_modules/core-js/modules/es6.array.iterator.js':
      /*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.array.iterator.js ***!
  \************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        var addToUnscopables = __webpack_require__(
          /*! ./_add-to-unscopables */ './node_modules/core-js/modules/_add-to-unscopables.js'
        )
        var step = __webpack_require__(
          /*! ./_iter-step */ './node_modules/core-js/modules/_iter-step.js'
        )
        var Iterators = __webpack_require__(
          /*! ./_iterators */ './node_modules/core-js/modules/_iterators.js'
        )
        var toIObject = __webpack_require__(
          /*! ./_to-iobject */ './node_modules/core-js/modules/_to-iobject.js'
        )

        // 22.1.3.4 Array.prototype.entries()
        // 22.1.3.13 Array.prototype.keys()
        // 22.1.3.29 Array.prototype.values()
        // 22.1.3.30 Array.prototype[@@iterator]()
        module.exports = __webpack_require__(
          /*! ./_iter-define */ './node_modules/core-js/modules/_iter-define.js'
        )(
          Array,
          'Array',
          function(iterated, kind) {
            this._t = toIObject(iterated) // target
            this._i = 0 // next index
            this._k = kind // kind
            // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
          },
          function() {
            var O = this._t
            var kind = this._k
            var index = this._i++
            if (!O || index >= O.length) {
              this._t = undefined
              return step(1)
            }
            if (kind == 'keys') return step(0, index)
            if (kind == 'values') return step(0, O[index])
            return step(0, [index, O[index]])
          },
          'values'
        )

        // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
        Iterators.Arguments = Iterators.Array

        addToUnscopables('keys')
        addToUnscopables('values')
        addToUnscopables('entries')

        /***/
      },

    /***/ './node_modules/core-js/modules/es6.object.keys.js':
      /*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // 19.1.2.14 Object.keys(O)
        var toObject = __webpack_require__(
          /*! ./_to-object */ './node_modules/core-js/modules/_to-object.js'
        )
        var $keys = __webpack_require__(
          /*! ./_object-keys */ './node_modules/core-js/modules/_object-keys.js'
        )

        __webpack_require__(
          /*! ./_object-sap */ './node_modules/core-js/modules/_object-sap.js'
        )('keys', function() {
          return function keys(it) {
            return $keys(toObject(it))
          }
        })

        /***/
      },

    /***/ './node_modules/core-js/modules/es6.object.set-prototype-of.js':
      /*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        // 19.1.3.19 Object.setPrototypeOf(O, proto)
        var $export = __webpack_require__(
          /*! ./_export */ './node_modules/core-js/modules/_export.js'
        )
        $export($export.S, 'Object', {
          setPrototypeOf: __webpack_require__(
            /*! ./_set-proto */ './node_modules/core-js/modules/_set-proto.js'
          ).set,
        })

        /***/
      },

    /***/ './node_modules/core-js/modules/es6.symbol.js':
      /*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        // ECMAScript 6 symbols shim
        var global = __webpack_require__(
          /*! ./_global */ './node_modules/core-js/modules/_global.js'
        )
        var has = __webpack_require__(
          /*! ./_has */ './node_modules/core-js/modules/_has.js'
        )
        var DESCRIPTORS = __webpack_require__(
          /*! ./_descriptors */ './node_modules/core-js/modules/_descriptors.js'
        )
        var $export = __webpack_require__(
          /*! ./_export */ './node_modules/core-js/modules/_export.js'
        )
        var redefine = __webpack_require__(
          /*! ./_redefine */ './node_modules/core-js/modules/_redefine.js'
        )
        var META = __webpack_require__(
          /*! ./_meta */ './node_modules/core-js/modules/_meta.js'
        ).KEY
        var $fails = __webpack_require__(
          /*! ./_fails */ './node_modules/core-js/modules/_fails.js'
        )
        var shared = __webpack_require__(
          /*! ./_shared */ './node_modules/core-js/modules/_shared.js'
        )
        var setToStringTag = __webpack_require__(
          /*! ./_set-to-string-tag */ './node_modules/core-js/modules/_set-to-string-tag.js'
        )
        var uid = __webpack_require__(
          /*! ./_uid */ './node_modules/core-js/modules/_uid.js'
        )
        var wks = __webpack_require__(
          /*! ./_wks */ './node_modules/core-js/modules/_wks.js'
        )
        var wksExt = __webpack_require__(
          /*! ./_wks-ext */ './node_modules/core-js/modules/_wks-ext.js'
        )
        var wksDefine = __webpack_require__(
          /*! ./_wks-define */ './node_modules/core-js/modules/_wks-define.js'
        )
        var enumKeys = __webpack_require__(
          /*! ./_enum-keys */ './node_modules/core-js/modules/_enum-keys.js'
        )
        var isArray = __webpack_require__(
          /*! ./_is-array */ './node_modules/core-js/modules/_is-array.js'
        )
        var anObject = __webpack_require__(
          /*! ./_an-object */ './node_modules/core-js/modules/_an-object.js'
        )
        var isObject = __webpack_require__(
          /*! ./_is-object */ './node_modules/core-js/modules/_is-object.js'
        )
        var toIObject = __webpack_require__(
          /*! ./_to-iobject */ './node_modules/core-js/modules/_to-iobject.js'
        )
        var toPrimitive = __webpack_require__(
          /*! ./_to-primitive */ './node_modules/core-js/modules/_to-primitive.js'
        )
        var createDesc = __webpack_require__(
          /*! ./_property-desc */ './node_modules/core-js/modules/_property-desc.js'
        )
        var _create = __webpack_require__(
          /*! ./_object-create */ './node_modules/core-js/modules/_object-create.js'
        )
        var gOPNExt = __webpack_require__(
          /*! ./_object-gopn-ext */ './node_modules/core-js/modules/_object-gopn-ext.js'
        )
        var $GOPD = __webpack_require__(
          /*! ./_object-gopd */ './node_modules/core-js/modules/_object-gopd.js'
        )
        var $DP = __webpack_require__(
          /*! ./_object-dp */ './node_modules/core-js/modules/_object-dp.js'
        )
        var $keys = __webpack_require__(
          /*! ./_object-keys */ './node_modules/core-js/modules/_object-keys.js'
        )
        var gOPD = $GOPD.f
        var dP = $DP.f
        var gOPN = gOPNExt.f
        var $Symbol = global.Symbol
        var $JSON = global.JSON
        var _stringify = $JSON && $JSON.stringify
        var PROTOTYPE = 'prototype'
        var HIDDEN = wks('_hidden')
        var TO_PRIMITIVE = wks('toPrimitive')
        var isEnum = {}.propertyIsEnumerable
        var SymbolRegistry = shared('symbol-registry')
        var AllSymbols = shared('symbols')
        var OPSymbols = shared('op-symbols')
        var ObjectProto = Object[PROTOTYPE]
        var USE_NATIVE = typeof $Symbol == 'function'
        var QObject = global.QObject
        // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
        var setter =
          !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild

        // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
        var setSymbolDesc =
          DESCRIPTORS &&
          $fails(function() {
            return (
              _create(
                dP({}, 'a', {
                  get: function() {
                    return dP(this, 'a', { value: 7 }).a
                  },
                })
              ).a != 7
            )
          })
            ? function(it, key, D) {
                var protoDesc = gOPD(ObjectProto, key)
                if (protoDesc) delete ObjectProto[key]
                dP(it, key, D)
                if (protoDesc && it !== ObjectProto)
                  dP(ObjectProto, key, protoDesc)
              }
            : dP

        var wrap = function(tag) {
          var sym = (AllSymbols[tag] = _create($Symbol[PROTOTYPE]))
          sym._k = tag
          return sym
        }

        var isSymbol =
          USE_NATIVE && typeof $Symbol.iterator == 'symbol'
            ? function(it) {
                return typeof it == 'symbol'
              }
            : function(it) {
                return it instanceof $Symbol
              }

        var $defineProperty = function defineProperty(it, key, D) {
          if (it === ObjectProto) $defineProperty(OPSymbols, key, D)
          anObject(it)
          key = toPrimitive(key, true)
          anObject(D)
          if (has(AllSymbols, key)) {
            if (!D.enumerable) {
              if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}))
              it[HIDDEN][key] = true
            } else {
              if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false
              D = _create(D, { enumerable: createDesc(0, false) })
            }
            return setSymbolDesc(it, key, D)
          }
          return dP(it, key, D)
        }
        var $defineProperties = function defineProperties(it, P) {
          anObject(it)
          var keys = enumKeys((P = toIObject(P)))
          var i = 0
          var l = keys.length
          var key
          while (l > i) $defineProperty(it, (key = keys[i++]), P[key])
          return it
        }
        var $create = function create(it, P) {
          return P === undefined
            ? _create(it)
            : $defineProperties(_create(it), P)
        }
        var $propertyIsEnumerable = function propertyIsEnumerable(key) {
          var E = isEnum.call(this, (key = toPrimitive(key, true)))
          if (
            this === ObjectProto &&
            has(AllSymbols, key) &&
            !has(OPSymbols, key)
          )
            return false
          return E ||
            !has(this, key) ||
            !has(AllSymbols, key) ||
            (has(this, HIDDEN) && this[HIDDEN][key])
            ? E
            : true
        }
        var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(
          it,
          key
        ) {
          it = toIObject(it)
          key = toPrimitive(key, true)
          if (
            it === ObjectProto &&
            has(AllSymbols, key) &&
            !has(OPSymbols, key)
          )
            return
          var D = gOPD(it, key)
          if (
            D &&
            has(AllSymbols, key) &&
            !(has(it, HIDDEN) && it[HIDDEN][key])
          )
            D.enumerable = true
          return D
        }
        var $getOwnPropertyNames = function getOwnPropertyNames(it) {
          var names = gOPN(toIObject(it))
          var result = []
          var i = 0
          var key
          while (names.length > i) {
            if (
              !has(AllSymbols, (key = names[i++])) &&
              key != HIDDEN &&
              key != META
            )
              result.push(key)
          }
          return result
        }
        var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
          var IS_OP = it === ObjectProto
          var names = gOPN(IS_OP ? OPSymbols : toIObject(it))
          var result = []
          var i = 0
          var key
          while (names.length > i) {
            if (
              has(AllSymbols, (key = names[i++])) &&
              (IS_OP ? has(ObjectProto, key) : true)
            )
              result.push(AllSymbols[key])
          }
          return result
        }

        // 19.4.1.1 Symbol([description])
        if (!USE_NATIVE) {
          $Symbol = function Symbol() {
            if (this instanceof $Symbol)
              throw TypeError('Symbol is not a constructor!')
            var tag = uid(arguments.length > 0 ? arguments[0] : undefined)
            var $set = function(value) {
              if (this === ObjectProto) $set.call(OPSymbols, value)
              if (has(this, HIDDEN) && has(this[HIDDEN], tag))
                this[HIDDEN][tag] = false
              setSymbolDesc(this, tag, createDesc(1, value))
            }
            if (DESCRIPTORS && setter)
              setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set })
            return wrap(tag)
          }
          redefine($Symbol[PROTOTYPE], 'toString', function toString() {
            return this._k
          })

          $GOPD.f = $getOwnPropertyDescriptor
          $DP.f = $defineProperty
          __webpack_require__(
            /*! ./_object-gopn */ './node_modules/core-js/modules/_object-gopn.js'
          ).f = gOPNExt.f = $getOwnPropertyNames
          __webpack_require__(
            /*! ./_object-pie */ './node_modules/core-js/modules/_object-pie.js'
          ).f = $propertyIsEnumerable
          __webpack_require__(
            /*! ./_object-gops */ './node_modules/core-js/modules/_object-gops.js'
          ).f = $getOwnPropertySymbols

          if (
            DESCRIPTORS &&
            !__webpack_require__(
              /*! ./_library */ './node_modules/core-js/modules/_library.js'
            )
          ) {
            redefine(
              ObjectProto,
              'propertyIsEnumerable',
              $propertyIsEnumerable,
              true
            )
          }

          wksExt.f = function(name) {
            return wrap(wks(name))
          }
        }

        $export($export.G + $export.W + $export.F * !USE_NATIVE, {
          Symbol: $Symbol,
        })

        for (
          var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
            'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(
              ','
            ),
            j = 0;
          es6Symbols.length > j;

        )
          wks(es6Symbols[j++])

        for (
          var wellKnownSymbols = $keys(wks.store), k = 0;
          wellKnownSymbols.length > k;

        )
          wksDefine(wellKnownSymbols[k++])

        $export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
          // 19.4.2.1 Symbol.for(key)
          for: function(key) {
            return has(SymbolRegistry, (key += ''))
              ? SymbolRegistry[key]
              : (SymbolRegistry[key] = $Symbol(key))
          },
          // 19.4.2.5 Symbol.keyFor(sym)
          keyFor: function keyFor(sym) {
            if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!')
            for (var key in SymbolRegistry)
              if (SymbolRegistry[key] === sym) return key
          },
          useSetter: function() {
            setter = true
          },
          useSimple: function() {
            setter = false
          },
        })

        $export($export.S + $export.F * !USE_NATIVE, 'Object', {
          // 19.1.2.2 Object.create(O [, Properties])
          create: $create,
          // 19.1.2.4 Object.defineProperty(O, P, Attributes)
          defineProperty: $defineProperty,
          // 19.1.2.3 Object.defineProperties(O, Properties)
          defineProperties: $defineProperties,
          // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
          getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
          // 19.1.2.7 Object.getOwnPropertyNames(O)
          getOwnPropertyNames: $getOwnPropertyNames,
          // 19.1.2.8 Object.getOwnPropertySymbols(O)
          getOwnPropertySymbols: $getOwnPropertySymbols,
        })

        // 24.3.2 JSON.stringify(value [, replacer [, space]])
        $JSON &&
          $export(
            $export.S +
              $export.F *
                (!USE_NATIVE ||
                  $fails(function() {
                    var S = $Symbol()
                    // MS Edge converts symbol values to JSON as {}
                    // WebKit converts symbol values to JSON as null
                    // V8 throws on boxed symbols
                    return (
                      _stringify([S]) != '[null]' ||
                      _stringify({ a: S }) != '{}' ||
                      _stringify(Object(S)) != '{}'
                    )
                  })),
            'JSON',
            {
              stringify: function stringify(it) {
                var args = [it]
                var i = 1
                var replacer, $replacer
                while (arguments.length > i) args.push(arguments[i++])
                $replacer = replacer = args[1]
                if ((!isObject(replacer) && it === undefined) || isSymbol(it))
                  return // IE8 returns string on undefined
                if (!isArray(replacer))
                  replacer = function(key, value) {
                    if (typeof $replacer == 'function')
                      value = $replacer.call(this, key, value)
                    if (!isSymbol(value)) return value
                  }
                args[1] = replacer
                return _stringify.apply($JSON, args)
              },
            }
          )

        // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
        $Symbol[PROTOTYPE][TO_PRIMITIVE] ||
          __webpack_require__(
            /*! ./_hide */ './node_modules/core-js/modules/_hide.js'
          )($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf)
        // 19.4.3.5 Symbol.prototype[@@toStringTag]
        setToStringTag($Symbol, 'Symbol')
        // 20.2.1.9 Math[@@toStringTag]
        setToStringTag(Math, 'Math', true)
        // 24.3.3 JSON[@@toStringTag]
        setToStringTag(global.JSON, 'JSON', true)

        /***/
      },

    /***/ './node_modules/core-js/modules/es7.symbol.async-iterator.js':
      /*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es7.symbol.async-iterator.js ***!
  \*******************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        __webpack_require__(
          /*! ./_wks-define */ './node_modules/core-js/modules/_wks-define.js'
        )('asyncIterator')

        /***/
      },

    /***/ './node_modules/core-js/modules/web.dom.iterable.js':
      /*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom.iterable.js ***!
  \**********************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var $iterators = __webpack_require__(
          /*! ./es6.array.iterator */ './node_modules/core-js/modules/es6.array.iterator.js'
        )
        var getKeys = __webpack_require__(
          /*! ./_object-keys */ './node_modules/core-js/modules/_object-keys.js'
        )
        var redefine = __webpack_require__(
          /*! ./_redefine */ './node_modules/core-js/modules/_redefine.js'
        )
        var global = __webpack_require__(
          /*! ./_global */ './node_modules/core-js/modules/_global.js'
        )
        var hide = __webpack_require__(
          /*! ./_hide */ './node_modules/core-js/modules/_hide.js'
        )
        var Iterators = __webpack_require__(
          /*! ./_iterators */ './node_modules/core-js/modules/_iterators.js'
        )
        var wks = __webpack_require__(
          /*! ./_wks */ './node_modules/core-js/modules/_wks.js'
        )
        var ITERATOR = wks('iterator')
        var TO_STRING_TAG = wks('toStringTag')
        var ArrayValues = Iterators.Array

        var DOMIterables = {
          CSSRuleList: true, // TODO: Not spec compliant, should be false.
          CSSStyleDeclaration: false,
          CSSValueList: false,
          ClientRectList: false,
          DOMRectList: false,
          DOMStringList: false,
          DOMTokenList: true,
          DataTransferItemList: false,
          FileList: false,
          HTMLAllCollection: false,
          HTMLCollection: false,
          HTMLFormElement: false,
          HTMLSelectElement: false,
          MediaList: true, // TODO: Not spec compliant, should be false.
          MimeTypeArray: false,
          NamedNodeMap: false,
          NodeList: true,
          PaintRequestList: false,
          Plugin: false,
          PluginArray: false,
          SVGLengthList: false,
          SVGNumberList: false,
          SVGPathSegList: false,
          SVGPointList: false,
          SVGStringList: false,
          SVGTransformList: false,
          SourceBufferList: false,
          StyleSheetList: true, // TODO: Not spec compliant, should be false.
          TextTrackCueList: false,
          TextTrackList: false,
          TouchList: false,
        }

        for (
          var collections = getKeys(DOMIterables), i = 0;
          i < collections.length;
          i++
        ) {
          var NAME = collections[i]
          var explicit = DOMIterables[NAME]
          var Collection = global[NAME]
          var proto = Collection && Collection.prototype
          var key
          if (proto) {
            if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues)
            if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME)
            Iterators[NAME] = ArrayValues
            if (explicit)
              for (key in $iterators)
                if (!proto[key]) redefine(proto, key, $iterators[key], true)
          }
        }

        /***/
      },

    /***/ './node_modules/css-loader/dist/cjs.js!./src/extension/src/iframe.css':
      /*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/extension/src/iframe.css ***!
  \****************************************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(
          /*! ../../../node_modules/css-loader/dist/runtime/api.js */ './node_modules/css-loader/dist/runtime/api.js'
        )(false)
        // Module
        exports.push([
          module.i,
          "#arenaExtension_frame,\n#arenaExtension_div {\n  overflow: hidden !important;\n  width: 335px !important;\n  height: 625px !important;\n  position: fixed !important;\n  top: 0px !important;\n  right: 0px !important;\n  overflow-x: hidden;\n  overflow-y: auto;\n  max-height: calc(100% - 50px);\n  border: 5px solid #e7e7e5 !important;\n  border-radius: 0.25em;\n}\n\n#arenaExtension_frame {\n  display: block;\n  margin: 12px 15px 0 0 !important;\n  z-index: 9999999998 !important;\n  background: rgba(255, 255, 255, 1) !important;\n}\n\n#arenaExtension_frame.is-expanded,\n#arenaExtension_div.is-expanded {\n  height: 620px !important;\n}\n\n#arenaExtension_div {\n  z-index: 9999999999 !important;\n  display: none;\n  background: rgba(255, 255, 255, 1) !important;\n  opacity: 0;\n  align-items: center;\n  justify-content: center;\n  margin: 12px 15px 0 0 !important;\n  user-select: none;\n}\n\n#arenaExtension_div h1 {\n  font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;\n  color: #9d9d9d;\n  font-weight: normal;\n  padding: 1em 0.5em;\n  -webkit-font-smoothing: antialiased;\n  text-align: center;\n  display: inline-block !important;\n  font-size: 1.25em;\n  border: dashed 2px #ddd !important;\n  margin: 0 auto;\n}\n",
          '',
        ])

        /***/
      },

    /***/ './node_modules/css-loader/dist/runtime/api.js':
      /*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        /*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
        // css base code, injected by the css-loader
        // eslint-disable-next-line func-names
        module.exports = function(useSourceMap) {
          var list = [] // return the list of modules as css string

          list.toString = function toString() {
            return this.map(function(item) {
              var content = cssWithMappingToString(item, useSourceMap)

              if (item[2]) {
                return '@media '.concat(item[2], '{').concat(content, '}')
              }

              return content
            }).join('')
          } // import a list of modules into the list
          // eslint-disable-next-line func-names

          list.i = function(modules, mediaQuery) {
            if (typeof modules === 'string') {
              // eslint-disable-next-line no-param-reassign
              modules = [[null, modules, '']]
            }

            var alreadyImportedModules = {}

            for (var i = 0; i < this.length; i++) {
              // eslint-disable-next-line prefer-destructuring
              var id = this[i][0]

              if (id != null) {
                alreadyImportedModules[id] = true
              }
            }

            for (var _i = 0; _i < modules.length; _i++) {
              var item = modules[_i] // skip already imported module
              // this implementation is not 100% perfect for weird media query combinations
              // when a module is imported multiple times with different media queries.
              // I hope this will never occur (Hey this way we have smaller bundles)

              if (item[0] == null || !alreadyImportedModules[item[0]]) {
                if (mediaQuery && !item[2]) {
                  item[2] = mediaQuery
                } else if (mediaQuery) {
                  item[2] = '('
                    .concat(item[2], ') and (')
                    .concat(mediaQuery, ')')
                }

                list.push(item)
              }
            }
          }

          return list
        }

        function cssWithMappingToString(item, useSourceMap) {
          var content = item[1] || '' // eslint-disable-next-line prefer-destructuring

          var cssMapping = item[3]

          if (!cssMapping) {
            return content
          }

          if (useSourceMap && typeof btoa === 'function') {
            var sourceMapping = toComment(cssMapping)
            var sourceURLs = cssMapping.sources.map(function(source) {
              return '/*# sourceURL='
                .concat(cssMapping.sourceRoot)
                .concat(source, ' */')
            })
            return [content]
              .concat(sourceURLs)
              .concat([sourceMapping])
              .join('\n')
          }

          return [content].join('\n')
        } // Adapted from convert-source-map (MIT)

        function toComment(sourceMap) {
          // eslint-disable-next-line no-undef
          var base64 = btoa(
            unescape(encodeURIComponent(JSON.stringify(sourceMap)))
          )
          var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(
            base64
          )
          return '/*# '.concat(data, ' */')
        }

        /***/
      },

    /***/ './node_modules/qs/lib/formats.js':
      /*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        var replace = String.prototype.replace
        var percentTwenties = /%20/g

        module.exports = {
          default: 'RFC3986',
          formatters: {
            RFC1738: function(value) {
              return replace.call(value, percentTwenties, '+')
            },
            RFC3986: function(value) {
              return value
            },
          },
          RFC1738: 'RFC1738',
          RFC3986: 'RFC3986',
        }

        /***/
      },

    /***/ './node_modules/qs/lib/index.js':
      /*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        var stringify = __webpack_require__(
          /*! ./stringify */ './node_modules/qs/lib/stringify.js'
        )
        var parse = __webpack_require__(
          /*! ./parse */ './node_modules/qs/lib/parse.js'
        )
        var formats = __webpack_require__(
          /*! ./formats */ './node_modules/qs/lib/formats.js'
        )

        module.exports = {
          formats: formats,
          parse: parse,
          stringify: stringify,
        }

        /***/
      },

    /***/ './node_modules/qs/lib/parse.js':
      /*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        var utils = __webpack_require__(
          /*! ./utils */ './node_modules/qs/lib/utils.js'
        )

        var has = Object.prototype.hasOwnProperty

        var defaults = {
          allowDots: false,
          allowPrototypes: false,
          arrayLimit: 20,
          decoder: utils.decode,
          delimiter: '&',
          depth: 5,
          parameterLimit: 1000,
          plainObjects: false,
          strictNullHandling: false,
        }

        var parseValues = function parseQueryStringValues(str, options) {
          var obj = {}
          var cleanStr = options.ignoreQueryPrefix
            ? str.replace(/^\?/, '')
            : str
          var limit =
            options.parameterLimit === Infinity
              ? undefined
              : options.parameterLimit
          var parts = cleanStr.split(options.delimiter, limit)

          for (var i = 0; i < parts.length; ++i) {
            var part = parts[i]

            var bracketEqualsPos = part.indexOf(']=')
            var pos =
              bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1

            var key, val
            if (pos === -1) {
              key = options.decoder(part, defaults.decoder)
              val = options.strictNullHandling ? null : ''
            } else {
              key = options.decoder(part.slice(0, pos), defaults.decoder)
              val = options.decoder(part.slice(pos + 1), defaults.decoder)
            }
            if (has.call(obj, key)) {
              obj[key] = [].concat(obj[key]).concat(val)
            } else {
              obj[key] = val
            }
          }

          return obj
        }

        var parseObject = function(chain, val, options) {
          var leaf = val

          for (var i = chain.length - 1; i >= 0; --i) {
            var obj
            var root = chain[i]

            if (root === '[]') {
              obj = []
              obj = obj.concat(leaf)
            } else {
              obj = options.plainObjects ? Object.create(null) : {}
              var cleanRoot =
                root.charAt(0) === '[' && root.charAt(root.length - 1) === ']'
                  ? root.slice(1, -1)
                  : root
              var index = parseInt(cleanRoot, 10)
              if (
                !isNaN(index) &&
                root !== cleanRoot &&
                String(index) === cleanRoot &&
                index >= 0 &&
                (options.parseArrays && index <= options.arrayLimit)
              ) {
                obj = []
                obj[index] = leaf
              } else {
                obj[cleanRoot] = leaf
              }
            }

            leaf = obj
          }

          return leaf
        }

        var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
          if (!givenKey) {
            return
          }

          // Transform dot notation to bracket notation
          var key = options.allowDots
            ? givenKey.replace(/\.([^.[]+)/g, '[$1]')
            : givenKey

          // The regex chunks

          var brackets = /(\[[^[\]]*])/
          var child = /(\[[^[\]]*])/g

          // Get the parent

          var segment = brackets.exec(key)
          var parent = segment ? key.slice(0, segment.index) : key

          // Stash the parent if it exists

          var keys = []
          if (parent) {
            // If we aren't using plain objects, optionally prefix keys
            // that would overwrite object prototype properties
            if (!options.plainObjects && has.call(Object.prototype, parent)) {
              if (!options.allowPrototypes) {
                return
              }
            }

            keys.push(parent)
          }

          // Loop through children appending to the array until we hit depth

          var i = 0
          while ((segment = child.exec(key)) !== null && i < options.depth) {
            i += 1
            if (
              !options.plainObjects &&
              has.call(Object.prototype, segment[1].slice(1, -1))
            ) {
              if (!options.allowPrototypes) {
                return
              }
            }
            keys.push(segment[1])
          }

          // If there's a remainder, just add whatever is left

          if (segment) {
            keys.push('[' + key.slice(segment.index) + ']')
          }

          return parseObject(keys, val, options)
        }

        module.exports = function(str, opts) {
          var options = opts ? utils.assign({}, opts) : {}

          if (
            options.decoder !== null &&
            options.decoder !== undefined &&
            typeof options.decoder !== 'function'
          ) {
            throw new TypeError('Decoder has to be a function.')
          }

          options.ignoreQueryPrefix = options.ignoreQueryPrefix === true
          options.delimiter =
            typeof options.delimiter === 'string' ||
            utils.isRegExp(options.delimiter)
              ? options.delimiter
              : defaults.delimiter
          options.depth =
            typeof options.depth === 'number' ? options.depth : defaults.depth
          options.arrayLimit =
            typeof options.arrayLimit === 'number'
              ? options.arrayLimit
              : defaults.arrayLimit
          options.parseArrays = options.parseArrays !== false
          options.decoder =
            typeof options.decoder === 'function'
              ? options.decoder
              : defaults.decoder
          options.allowDots =
            typeof options.allowDots === 'boolean'
              ? options.allowDots
              : defaults.allowDots
          options.plainObjects =
            typeof options.plainObjects === 'boolean'
              ? options.plainObjects
              : defaults.plainObjects
          options.allowPrototypes =
            typeof options.allowPrototypes === 'boolean'
              ? options.allowPrototypes
              : defaults.allowPrototypes
          options.parameterLimit =
            typeof options.parameterLimit === 'number'
              ? options.parameterLimit
              : defaults.parameterLimit
          options.strictNullHandling =
            typeof options.strictNullHandling === 'boolean'
              ? options.strictNullHandling
              : defaults.strictNullHandling

          if (str === '' || str === null || typeof str === 'undefined') {
            return options.plainObjects ? Object.create(null) : {}
          }

          var tempObj =
            typeof str === 'string' ? parseValues(str, options) : str
          var obj = options.plainObjects ? Object.create(null) : {}

          // Iterate over the keys and setup the new object

          var keys = Object.keys(tempObj)
          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i]
            var newObj = parseKeys(key, tempObj[key], options)
            obj = utils.merge(obj, newObj, options)
          }

          return utils.compact(obj)
        }

        /***/
      },

    /***/ './node_modules/qs/lib/stringify.js':
      /*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        var utils = __webpack_require__(
          /*! ./utils */ './node_modules/qs/lib/utils.js'
        )
        var formats = __webpack_require__(
          /*! ./formats */ './node_modules/qs/lib/formats.js'
        )

        var arrayPrefixGenerators = {
          brackets: function brackets(prefix) {
            // eslint-disable-line func-name-matching
            return prefix + '[]'
          },
          indices: function indices(prefix, key) {
            // eslint-disable-line func-name-matching
            return prefix + '[' + key + ']'
          },
          repeat: function repeat(prefix) {
            // eslint-disable-line func-name-matching
            return prefix
          },
        }

        var toISO = Date.prototype.toISOString

        var defaults = {
          delimiter: '&',
          encode: true,
          encoder: utils.encode,
          encodeValuesOnly: false,
          serializeDate: function serializeDate(date) {
            // eslint-disable-line func-name-matching
            return toISO.call(date)
          },
          skipNulls: false,
          strictNullHandling: false,
        }

        var stringify = function stringify( // eslint-disable-line func-name-matching
          object,
          prefix,
          generateArrayPrefix,
          strictNullHandling,
          skipNulls,
          encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          formatter,
          encodeValuesOnly
        ) {
          var obj = object
          if (typeof filter === 'function') {
            obj = filter(prefix, obj)
          } else if (obj instanceof Date) {
            obj = serializeDate(obj)
          } else if (obj === null) {
            if (strictNullHandling) {
              return encoder && !encodeValuesOnly
                ? encoder(prefix, defaults.encoder)
                : prefix
            }

            obj = ''
          }

          if (
            typeof obj === 'string' ||
            typeof obj === 'number' ||
            typeof obj === 'boolean' ||
            utils.isBuffer(obj)
          ) {
            if (encoder) {
              var keyValue = encodeValuesOnly
                ? prefix
                : encoder(prefix, defaults.encoder)
              return [
                formatter(keyValue) +
                  '=' +
                  formatter(encoder(obj, defaults.encoder)),
              ]
            }
            return [formatter(prefix) + '=' + formatter(String(obj))]
          }

          var values = []

          if (typeof obj === 'undefined') {
            return values
          }

          var objKeys
          if (Array.isArray(filter)) {
            objKeys = filter
          } else {
            var keys = Object.keys(obj)
            objKeys = sort ? keys.sort(sort) : keys
          }

          for (var i = 0; i < objKeys.length; ++i) {
            var key = objKeys[i]

            if (skipNulls && obj[key] === null) {
              continue
            }

            if (Array.isArray(obj)) {
              values = values.concat(
                stringify(
                  obj[key],
                  generateArrayPrefix(prefix, key),
                  generateArrayPrefix,
                  strictNullHandling,
                  skipNulls,
                  encoder,
                  filter,
                  sort,
                  allowDots,
                  serializeDate,
                  formatter,
                  encodeValuesOnly
                )
              )
            } else {
              values = values.concat(
                stringify(
                  obj[key],
                  prefix + (allowDots ? '.' + key : '[' + key + ']'),
                  generateArrayPrefix,
                  strictNullHandling,
                  skipNulls,
                  encoder,
                  filter,
                  sort,
                  allowDots,
                  serializeDate,
                  formatter,
                  encodeValuesOnly
                )
              )
            }
          }

          return values
        }

        module.exports = function(object, opts) {
          var obj = object
          var options = opts ? utils.assign({}, opts) : {}

          if (
            options.encoder !== null &&
            options.encoder !== undefined &&
            typeof options.encoder !== 'function'
          ) {
            throw new TypeError('Encoder has to be a function.')
          }

          var delimiter =
            typeof options.delimiter === 'undefined'
              ? defaults.delimiter
              : options.delimiter
          var strictNullHandling =
            typeof options.strictNullHandling === 'boolean'
              ? options.strictNullHandling
              : defaults.strictNullHandling
          var skipNulls =
            typeof options.skipNulls === 'boolean'
              ? options.skipNulls
              : defaults.skipNulls
          var encode =
            typeof options.encode === 'boolean'
              ? options.encode
              : defaults.encode
          var encoder =
            typeof options.encoder === 'function'
              ? options.encoder
              : defaults.encoder
          var sort = typeof options.sort === 'function' ? options.sort : null
          var allowDots =
            typeof options.allowDots === 'undefined' ? false : options.allowDots
          var serializeDate =
            typeof options.serializeDate === 'function'
              ? options.serializeDate
              : defaults.serializeDate
          var encodeValuesOnly =
            typeof options.encodeValuesOnly === 'boolean'
              ? options.encodeValuesOnly
              : defaults.encodeValuesOnly
          if (typeof options.format === 'undefined') {
            options.format = formats['default']
          } else if (
            !Object.prototype.hasOwnProperty.call(
              formats.formatters,
              options.format
            )
          ) {
            throw new TypeError('Unknown format option provided.')
          }
          var formatter = formats.formatters[options.format]
          var objKeys
          var filter

          if (typeof options.filter === 'function') {
            filter = options.filter
            obj = filter('', obj)
          } else if (Array.isArray(options.filter)) {
            filter = options.filter
            objKeys = filter
          }

          var keys = []

          if (typeof obj !== 'object' || obj === null) {
            return ''
          }

          var arrayFormat
          if (options.arrayFormat in arrayPrefixGenerators) {
            arrayFormat = options.arrayFormat
          } else if ('indices' in options) {
            arrayFormat = options.indices ? 'indices' : 'repeat'
          } else {
            arrayFormat = 'indices'
          }

          var generateArrayPrefix = arrayPrefixGenerators[arrayFormat]

          if (!objKeys) {
            objKeys = Object.keys(obj)
          }

          if (sort) {
            objKeys.sort(sort)
          }

          for (var i = 0; i < objKeys.length; ++i) {
            var key = objKeys[i]

            if (skipNulls && obj[key] === null) {
              continue
            }

            keys = keys.concat(
              stringify(
                obj[key],
                key,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encode ? encoder : null,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
              )
            )
          }

          var joined = keys.join(delimiter)
          var prefix = options.addQueryPrefix === true ? '?' : ''

          return joined.length > 0 ? prefix + joined : ''
        }

        /***/
      },

    /***/ './node_modules/qs/lib/utils.js':
      /*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        var has = Object.prototype.hasOwnProperty

        var hexTable = (function() {
          var array = []
          for (var i = 0; i < 256; ++i) {
            array.push(
              '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase()
            )
          }

          return array
        })()

        var compactQueue = function compactQueue(queue) {
          var obj

          while (queue.length) {
            var item = queue.pop()
            obj = item.obj[item.prop]

            if (Array.isArray(obj)) {
              var compacted = []

              for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                  compacted.push(obj[j])
                }
              }

              item.obj[item.prop] = compacted
            }
          }

          return obj
        }

        exports.arrayToObject = function arrayToObject(source, options) {
          var obj = options && options.plainObjects ? Object.create(null) : {}
          for (var i = 0; i < source.length; ++i) {
            if (typeof source[i] !== 'undefined') {
              obj[i] = source[i]
            }
          }

          return obj
        }

        exports.merge = function merge(target, source, options) {
          if (!source) {
            return target
          }

          if (typeof source !== 'object') {
            if (Array.isArray(target)) {
              target.push(source)
            } else if (typeof target === 'object') {
              if (
                options.plainObjects ||
                options.allowPrototypes ||
                !has.call(Object.prototype, source)
              ) {
                target[source] = true
              }
            } else {
              return [target, source]
            }

            return target
          }

          if (typeof target !== 'object') {
            return [target].concat(source)
          }

          var mergeTarget = target
          if (Array.isArray(target) && !Array.isArray(source)) {
            mergeTarget = exports.arrayToObject(target, options)
          }

          if (Array.isArray(target) && Array.isArray(source)) {
            source.forEach(function(item, i) {
              if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                  target[i] = exports.merge(target[i], item, options)
                } else {
                  target.push(item)
                }
              } else {
                target[i] = item
              }
            })
            return target
          }

          return Object.keys(source).reduce(function(acc, key) {
            var value = source[key]

            if (has.call(acc, key)) {
              acc[key] = exports.merge(acc[key], value, options)
            } else {
              acc[key] = value
            }
            return acc
          }, mergeTarget)
        }

        exports.assign = function assignSingleSource(target, source) {
          return Object.keys(source).reduce(function(acc, key) {
            acc[key] = source[key]
            return acc
          }, target)
        }

        exports.decode = function(str) {
          try {
            return decodeURIComponent(str.replace(/\+/g, ' '))
          } catch (e) {
            return str
          }
        }

        exports.encode = function encode(str) {
          // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
          // It has been adapted here for stricter adherence to RFC 3986
          if (str.length === 0) {
            return str
          }

          var string = typeof str === 'string' ? str : String(str)

          var out = ''
          for (var i = 0; i < string.length; ++i) {
            var c = string.charCodeAt(i)

            if (
              c === 0x2d || // -
              c === 0x2e || // .
              c === 0x5f || // _
              c === 0x7e || // ~
              (c >= 0x30 && c <= 0x39) || // 0-9
              (c >= 0x41 && c <= 0x5a) || // a-z
              (c >= 0x61 && c <= 0x7a) // A-Z
            ) {
              out += string.charAt(i)
              continue
            }

            if (c < 0x80) {
              out = out + hexTable[c]
              continue
            }

            if (c < 0x800) {
              out =
                out + (hexTable[0xc0 | (c >> 6)] + hexTable[0x80 | (c & 0x3f)])
              continue
            }

            if (c < 0xd800 || c >= 0xe000) {
              out =
                out +
                (hexTable[0xe0 | (c >> 12)] +
                  hexTable[0x80 | ((c >> 6) & 0x3f)] +
                  hexTable[0x80 | (c & 0x3f)])
              continue
            }

            i += 1
            c = 0x10000 + (((c & 0x3ff) << 10) | (string.charCodeAt(i) & 0x3ff))
            out +=
              hexTable[0xf0 | (c >> 18)] +
              hexTable[0x80 | ((c >> 12) & 0x3f)] +
              hexTable[0x80 | ((c >> 6) & 0x3f)] +
              hexTable[0x80 | (c & 0x3f)]
          }

          return out
        }

        exports.compact = function compact(value) {
          var queue = [{ obj: { o: value }, prop: 'o' }]
          var refs = []

          for (var i = 0; i < queue.length; ++i) {
            var item = queue[i]
            var obj = item.obj[item.prop]

            var keys = Object.keys(obj)
            for (var j = 0; j < keys.length; ++j) {
              var key = keys[j]
              var val = obj[key]
              if (
                typeof val === 'object' &&
                val !== null &&
                refs.indexOf(val) === -1
              ) {
                queue.push({ obj: obj, prop: key })
                refs.push(val)
              }
            }
          }

          return compactQueue(queue)
        }

        exports.isRegExp = function isRegExp(obj) {
          return Object.prototype.toString.call(obj) === '[object RegExp]'
        }

        exports.isBuffer = function isBuffer(obj) {
          if (obj === null || typeof obj === 'undefined') {
            return false
          }

          return !!(
            obj.constructor &&
            obj.constructor.isBuffer &&
            obj.constructor.isBuffer(obj)
          )
        }

        /***/
      },

    /***/ './node_modules/style-loader/lib/addStyles.js':
      /*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        /*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

        var stylesInDom = {}

        var memoize = function(fn) {
          var memo

          return function() {
            if (typeof memo === 'undefined') memo = fn.apply(this, arguments)
            return memo
          }
        }

        var isOldIE = memoize(function() {
          // Test for IE <= 9 as proposed by Browserhacks
          // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
          // Tests for existence of standard globals is to allow style-loader
          // to operate correctly into non-standard environments
          // @see https://github.com/webpack-contrib/style-loader/issues/177
          return window && document && document.all && !window.atob
        })

        var getTarget = function(target, parent) {
          if (parent) {
            return parent.querySelector(target)
          }
          return document.querySelector(target)
        }

        var getElement = (function(fn) {
          var memo = {}

          return function(target, parent) {
            // If passing function in options, then use it for resolve "head" element.
            // Useful for Shadow Root style i.e
            // {
            //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
            // }
            if (typeof target === 'function') {
              return target()
            }
            if (typeof memo[target] === 'undefined') {
              var styleTarget = getTarget.call(this, target, parent)
              // Special case to return head of iframe instead of iframe itself
              if (
                window.HTMLIFrameElement &&
                styleTarget instanceof window.HTMLIFrameElement
              ) {
                try {
                  // This will throw an exception if access to iframe is blocked
                  // due to cross-origin restrictions
                  styleTarget = styleTarget.contentDocument.head
                } catch (e) {
                  styleTarget = null
                }
              }
              memo[target] = styleTarget
            }
            return memo[target]
          }
        })()

        var singleton = null
        var singletonCounter = 0
        var stylesInsertedAtTop = []

        var fixUrls = __webpack_require__(
          /*! ./urls */ './node_modules/style-loader/lib/urls.js'
        )

        module.exports = function(list, options) {
          if (typeof DEBUG !== 'undefined' && DEBUG) {
            if (typeof document !== 'object')
              throw new Error(
                'The style-loader cannot be used in a non-browser environment'
              )
          }

          options = options || {}

          options.attrs = typeof options.attrs === 'object' ? options.attrs : {}

          // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
          // tags it will allow on a page
          if (!options.singleton && typeof options.singleton !== 'boolean')
            options.singleton = isOldIE()

          // By default, add <style> tags to the <head> element
          if (!options.insertInto) options.insertInto = 'head'

          // By default, add <style> tags to the bottom of the target
          if (!options.insertAt) options.insertAt = 'bottom'

          var styles = listToStyles(list, options)

          addStylesToDom(styles, options)

          return function update(newList) {
            var mayRemove = []

            for (var i = 0; i < styles.length; i++) {
              var item = styles[i]
              var domStyle = stylesInDom[item.id]

              domStyle.refs--
              mayRemove.push(domStyle)
            }

            if (newList) {
              var newStyles = listToStyles(newList, options)
              addStylesToDom(newStyles, options)
            }

            for (var i = 0; i < mayRemove.length; i++) {
              var domStyle = mayRemove[i]

              if (domStyle.refs === 0) {
                for (var j = 0; j < domStyle.parts.length; j++)
                  domStyle.parts[j]()

                delete stylesInDom[domStyle.id]
              }
            }
          }
        }

        function addStylesToDom(styles, options) {
          for (var i = 0; i < styles.length; i++) {
            var item = styles[i]
            var domStyle = stylesInDom[item.id]

            if (domStyle) {
              domStyle.refs++

              for (var j = 0; j < domStyle.parts.length; j++) {
                domStyle.parts[j](item.parts[j])
              }

              for (; j < item.parts.length; j++) {
                domStyle.parts.push(addStyle(item.parts[j], options))
              }
            } else {
              var parts = []

              for (var j = 0; j < item.parts.length; j++) {
                parts.push(addStyle(item.parts[j], options))
              }

              stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
            }
          }
        }

        function listToStyles(list, options) {
          var styles = []
          var newStyles = {}

          for (var i = 0; i < list.length; i++) {
            var item = list[i]
            var id = options.base ? item[0] + options.base : item[0]
            var css = item[1]
            var media = item[2]
            var sourceMap = item[3]
            var part = { css: css, media: media, sourceMap: sourceMap }

            if (!newStyles[id])
              styles.push((newStyles[id] = { id: id, parts: [part] }))
            else newStyles[id].parts.push(part)
          }

          return styles
        }

        function insertStyleElement(options, style) {
          var target = getElement(options.insertInto)

          if (!target) {
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid."
            )
          }

          var lastStyleElementInsertedAtTop =
            stylesInsertedAtTop[stylesInsertedAtTop.length - 1]

          if (options.insertAt === 'top') {
            if (!lastStyleElementInsertedAtTop) {
              target.insertBefore(style, target.firstChild)
            } else if (lastStyleElementInsertedAtTop.nextSibling) {
              target.insertBefore(
                style,
                lastStyleElementInsertedAtTop.nextSibling
              )
            } else {
              target.appendChild(style)
            }
            stylesInsertedAtTop.push(style)
          } else if (options.insertAt === 'bottom') {
            target.appendChild(style)
          } else if (
            typeof options.insertAt === 'object' &&
            options.insertAt.before
          ) {
            var nextSibling = getElement(options.insertAt.before, target)
            target.insertBefore(style, nextSibling)
          } else {
            throw new Error(
              "[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n"
            )
          }
        }

        function removeStyleElement(style) {
          if (style.parentNode === null) return false
          style.parentNode.removeChild(style)

          var idx = stylesInsertedAtTop.indexOf(style)
          if (idx >= 0) {
            stylesInsertedAtTop.splice(idx, 1)
          }
        }

        function createStyleElement(options) {
          var style = document.createElement('style')

          if (options.attrs.type === undefined) {
            options.attrs.type = 'text/css'
          }

          if (options.attrs.nonce === undefined) {
            var nonce = getNonce()
            if (nonce) {
              options.attrs.nonce = nonce
            }
          }

          addAttrs(style, options.attrs)
          insertStyleElement(options, style)

          return style
        }

        function createLinkElement(options) {
          var link = document.createElement('link')

          if (options.attrs.type === undefined) {
            options.attrs.type = 'text/css'
          }
          options.attrs.rel = 'stylesheet'

          addAttrs(link, options.attrs)
          insertStyleElement(options, link)

          return link
        }

        function addAttrs(el, attrs) {
          Object.keys(attrs).forEach(function(key) {
            el.setAttribute(key, attrs[key])
          })
        }

        function getNonce() {
          if (false) {
          }

          return __webpack_require__.nc
        }

        function addStyle(obj, options) {
          var style, update, remove, result

          // If a transform function was defined, run it on the css
          if (options.transform && obj.css) {
            result =
              typeof options.transform === 'function'
                ? options.transform(obj.css)
                : options.transform.default(obj.css)

            if (result) {
              // If transform returns a value, use that instead of the original css.
              // This allows running runtime transformations on the css.
              obj.css = result
            } else {
              // If the transform function returns a falsy value, don't add this css.
              // This allows conditional loading of css
              return function() {
                // noop
              }
            }
          }

          if (options.singleton) {
            var styleIndex = singletonCounter++

            style = singleton || (singleton = createStyleElement(options))

            update = applyToSingletonTag.bind(null, style, styleIndex, false)
            remove = applyToSingletonTag.bind(null, style, styleIndex, true)
          } else if (
            obj.sourceMap &&
            typeof URL === 'function' &&
            typeof URL.createObjectURL === 'function' &&
            typeof URL.revokeObjectURL === 'function' &&
            typeof Blob === 'function' &&
            typeof btoa === 'function'
          ) {
            style = createLinkElement(options)
            update = updateLink.bind(null, style, options)
            remove = function() {
              removeStyleElement(style)

              if (style.href) URL.revokeObjectURL(style.href)
            }
          } else {
            style = createStyleElement(options)
            update = applyToTag.bind(null, style)
            remove = function() {
              removeStyleElement(style)
            }
          }

          update(obj)

          return function updateStyle(newObj) {
            if (newObj) {
              if (
                newObj.css === obj.css &&
                newObj.media === obj.media &&
                newObj.sourceMap === obj.sourceMap
              ) {
                return
              }

              update((obj = newObj))
            } else {
              remove()
            }
          }
        }

        var replaceText = (function() {
          var textStore = []

          return function(index, replacement) {
            textStore[index] = replacement

            return textStore.filter(Boolean).join('\n')
          }
        })()

        function applyToSingletonTag(style, index, remove, obj) {
          var css = remove ? '' : obj.css

          if (style.styleSheet) {
            style.styleSheet.cssText = replaceText(index, css)
          } else {
            var cssNode = document.createTextNode(css)
            var childNodes = style.childNodes

            if (childNodes[index]) style.removeChild(childNodes[index])

            if (childNodes.length) {
              style.insertBefore(cssNode, childNodes[index])
            } else {
              style.appendChild(cssNode)
            }
          }
        }

        function applyToTag(style, obj) {
          var css = obj.css
          var media = obj.media

          if (media) {
            style.setAttribute('media', media)
          }

          if (style.styleSheet) {
            style.styleSheet.cssText = css
          } else {
            while (style.firstChild) {
              style.removeChild(style.firstChild)
            }

            style.appendChild(document.createTextNode(css))
          }
        }

        function updateLink(link, options, obj) {
          var css = obj.css
          var sourceMap = obj.sourceMap

          /*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
          var autoFixUrls =
            options.convertToAbsoluteUrls === undefined && sourceMap

          if (options.convertToAbsoluteUrls || autoFixUrls) {
            css = fixUrls(css)
          }

          if (sourceMap) {
            // http://stackoverflow.com/a/26603875
            css +=
              '\n/*# sourceMappingURL=data:application/json;base64,' +
              btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) +
              ' */'
          }

          var blob = new Blob([css], { type: 'text/css' })

          var oldSrc = link.href

          link.href = URL.createObjectURL(blob)

          if (oldSrc) URL.revokeObjectURL(oldSrc)
        }

        /***/
      },

    /***/ './node_modules/style-loader/lib/urls.js':
      /*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
      /*! no static exports found */
      /***/ function(module, exports) {
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

        module.exports = function(css) {
          // get current location
          var location = typeof window !== 'undefined' && window.location

          if (!location) {
            throw new Error('fixUrls requires window.location')
          }

          // blank or null?
          if (!css || typeof css !== 'string') {
            return css
          }

          var baseUrl = location.protocol + '//' + location.host
          var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, '/')

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
          var fixedCss = css.replace(
            /url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,
            function(fullMatch, origUrl) {
              // strip quotes (if they exist)
              var unquotedOrigUrl = origUrl
                .trim()
                .replace(/^"(.*)"$/, function(o, $1) {
                  return $1
                })
                .replace(/^'(.*)'$/, function(o, $1) {
                  return $1
                })

              // already a full url? no change
              if (
                /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(
                  unquotedOrigUrl
                )
              ) {
                return fullMatch
              }

              // convert the url to a full url
              var newUrl

              if (unquotedOrigUrl.indexOf('//') === 0) {
                //TODO: should we add protocol?
                newUrl = unquotedOrigUrl
              } else if (unquotedOrigUrl.indexOf('/') === 0) {
                // path should be relative to the base url
                newUrl = baseUrl + unquotedOrigUrl // already starts with '/'
              } else {
                // path should be relative to current directory
                newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, '') // Strip leading './'
              }

              // send back the fixed url(...)
              return 'url(' + JSON.stringify(newUrl) + ')'
            }
          )

          // send back the fixed css
          return fixedCss
        }

        /***/
      },

    /***/ './src/assets/loader.js':
      /*!******************************!*\
  !*** ./src/assets/loader.js ***!
  \******************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        __webpack_require__(
          /*! core-js/modules/es7.symbol.async-iterator */ './node_modules/core-js/modules/es7.symbol.async-iterator.js'
        )

        __webpack_require__(
          /*! core-js/modules/es6.symbol */ './node_modules/core-js/modules/es6.symbol.js'
        )

        __webpack_require__(
          /*! core-js/modules/es6.object.set-prototype-of */ './node_modules/core-js/modules/es6.object.set-prototype-of.js'
        )

        var _qs = __webpack_require__(
          /*! qs */ './node_modules/qs/lib/index.js'
        )

        var _Pane2 = _interopRequireDefault(
          __webpack_require__(/*! ../lib/Pane */ './src/lib/Pane.ts')
        )

        var _PaneDataExtractor = _interopRequireDefault(
          __webpack_require__(
            /*! ../lib/PaneDataExtractor */ './src/lib/PaneDataExtractor.ts'
          )
        )

        var _iframe = _interopRequireDefault(
          __webpack_require__(
            /*! ../extension/src/iframe.css */ './src/extension/src/iframe.css'
          )
        )

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        function _typeof(obj) {
          if (
            typeof Symbol === 'function' &&
            typeof Symbol.iterator === 'symbol'
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj
            }
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === 'function' &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj
            }
          }
          return _typeof(obj)
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function')
          }
        }

        function _possibleConstructorReturn(self, call) {
          if (
            call &&
            (_typeof(call) === 'object' || typeof call === 'function')
          ) {
            return call
          }
          return _assertThisInitialized(self)
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function _getPrototypeOf(o) {
                return o.__proto__ || Object.getPrototypeOf(o)
              }
          return _getPrototypeOf(o)
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError(
              'Super expression must either be null or a function'
            )
          }
          subClass.prototype = Object.create(
            superClass && superClass.prototype,
            {
              constructor: {
                value: subClass,
                writable: true,
                configurable: true,
              },
            }
          )
          if (superClass) _setPrototypeOf(subClass, superClass)
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf =
            Object.setPrototypeOf ||
            function _setPrototypeOf(o, p) {
              o.__proto__ = p
              return o
            }
          return _setPrototypeOf(o, p)
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            )
          }
          return self
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true,
            })
          } else {
            obj[key] = value
          }
          return obj
        }

        var NODE_ENV = 'development'
        var SAVE_URL =
          NODE_ENV === 'development'
            ? 'http://localhost:5000/save'
            : 'https://www.are.na/save'

        var BookmarkletPane =
          /*#__PURE__*/
          (function(_Pane) {
            _inherits(BookmarkletPane, _Pane)

            function BookmarkletPane() {
              var _getPrototypeOf2

              var _this

              _classCallCheck(this, BookmarkletPane)

              for (
                var _len = arguments.length, args = new Array(_len), _key = 0;
                _key < _len;
                _key++
              ) {
                args[_key] = arguments[_key]
              }

              _this = _possibleConstructorReturn(
                this,
                (_getPrototypeOf2 = _getPrototypeOf(
                  BookmarkletPane
                )).call.apply(_getPrototypeOf2, [this].concat(args))
              )

              _defineProperty(
                _assertThisInitialized(_assertThisInitialized(_this)),
                'addIframeStyle',
                function() {
                  var markletStyle = document.createElement('style')
                  markletStyle.type = 'text/css'
                  markletStyle.appendChild(
                    document.createTextNode(_iframe.default)
                  )
                  document.body.appendChild(markletStyle)
                  return markletStyle
                }
              )

              _defineProperty(
                _assertThisInitialized(_assertThisInitialized(_this)),
                'getURL',
                function() {
                  var _ref = new _PaneDataExtractor.default(_this.msg),
                    data = _ref.data

                  var params = (0, _qs.stringify)(data, {
                    arrayFormat: 'brackets',
                    encode: false,
                  })
                  var url = encodeURIComponent(data.original_source_url)
                  return ''
                    .concat(SAVE_URL, '/')
                    .concat(url, '?')
                    .concat(params, ';')
                }
              )

              return _this
            }

            return BookmarkletPane
          })(_Pane2.default)

        var pane = new BookmarkletPane()
        pane.open({
          url: window.location.href,
          title: window.document.title,
        })

        /***/
      },

    /***/ './src/extension/src/iframe.css':
      /*!**************************************!*\
  !*** ./src/extension/src/iframe.css ***!
  \**************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        var content = __webpack_require__(
          /*! !../../../node_modules/css-loader/dist/cjs.js!./iframe.css */ './node_modules/css-loader/dist/cjs.js!./src/extension/src/iframe.css'
        )

        if (typeof content === 'string') content = [[module.i, content, '']]

        var transform
        var insertInto

        var options = { hmr: true }

        options.transform = transform
        options.insertInto = undefined

        var update = __webpack_require__(
          /*! ../../../node_modules/style-loader/lib/addStyles.js */ './node_modules/style-loader/lib/addStyles.js'
        )(content, options)

        if (content.locals) module.exports = content.locals

        if (false) {
        }

        /***/
      },

    /***/ './src/lib/Pane.ts':
      /*!*************************!*\
  !*** ./src/lib/Pane.ts ***!
  \*************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.default = void 0

        __webpack_require__(
          /*! core-js/modules/web.dom.iterable */ './node_modules/core-js/modules/web.dom.iterable.js'
        )

        __webpack_require__(
          /*! core-js/modules/es6.array.iterator */ './node_modules/core-js/modules/es6.array.iterator.js'
        )

        __webpack_require__(
          /*! core-js/modules/es6.object.keys */ './node_modules/core-js/modules/es6.object.keys.js'
        )

        var _PaneMessenger = _interopRequireDefault(
          __webpack_require__(
            /*! ./PaneMessenger */ './src/lib/PaneMessenger.ts'
          )
        )

        var _PaneDataExtractor = _interopRequireDefault(
          __webpack_require__(
            /*! ./PaneDataExtractor */ './src/lib/PaneDataExtractor.ts'
          )
        )

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj }
        }

        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {}
            var ownKeys = Object.keys(source)
            if (typeof Object.getOwnPropertySymbols === 'function') {
              ownKeys = ownKeys.concat(
                Object.getOwnPropertySymbols(source).filter(function(sym) {
                  return Object.getOwnPropertyDescriptor(source, sym).enumerable
                })
              )
            }
            ownKeys.forEach(function(key) {
              _defineProperty(target, key, source[key])
            })
          }
          return target
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function')
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i]
            descriptor.enumerable = descriptor.enumerable || false
            descriptor.configurable = true
            if ('value' in descriptor) descriptor.writable = true
            Object.defineProperty(target, descriptor.key, descriptor)
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps)
          if (staticProps) _defineProperties(Constructor, staticProps)
          return Constructor
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true,
            })
          } else {
            obj[key] = value
          }
          return obj
        }

        var Pane =
          /*#__PURE__*/
          (function() {
            function Pane() {
              var _this = this

              _classCallCheck(this, Pane)

              _defineProperty(this, 'isOpen', void 0)

              _defineProperty(this, 'frame', void 0)

              _defineProperty(this, 'msg', void 0)

              _defineProperty(this, 'dragTarget', void 0)

              _defineProperty(this, 'style', void 0)

              _defineProperty(this, 'messenger', void 0)

              _defineProperty(this, 'open', function(msg) {
                _this.isOpen = true

                if (_this.frame) {
                  return _this.showIframe()
                }

                return _this.initialize(msg)
              })

              _defineProperty(this, 'add', function(msg) {
                _this.isOpen = true

                if (_this.frame) {
                  _this.showIframe()

                  return _this.sendData(msg)
                }

                return _this.initialize(msg)
              })

              _defineProperty(this, 'close', function() {
                _this.isOpen = false

                _this.hideIframe()
              })

              _defineProperty(this, 'createIframe', function() {
                var iframe = document.createElement('iframe')
                iframe.src = _this.getURL()
                iframe.id = 'arenaExtension_frame'
                iframe.name = iframe.id
                document.body.appendChild(iframe)
                return iframe
              })

              _defineProperty(this, 'showIframe', function() {
                _this.frame.style.display = 'block'
              })

              _defineProperty(this, 'hideIframe', function() {
                _this.frame.style.display = 'none'
              })

              _defineProperty(this, 'createDragTarget', function() {
                var targetDiv = document.createElement('div')
                targetDiv.id = 'arenaExtension_div'
                var message = document.createElement('h1')
                message.innerHTML = 'Drag here to add to Are.na'
                targetDiv.appendChild(message)
                document.body.appendChild(targetDiv)
                return targetDiv
              })

              _defineProperty(this, 'addIframeStyle', function() {
                var link = document.createElement('link')
                link.type = 'text/css'
                link.rel = 'stylesheet'
                document.body.appendChild(link)
                return link
              })

              _defineProperty(this, 'getURL', function() {
                return '/'
              })

              _defineProperty(this, 'onStartDrag', function(e) {
                _this.messenger.send({
                  action: 'drag',
                })

                e.dataTransfer.effectAllowed = 'copyMove'

                if (
                  typeof e.dataTransfer.getData('text/html') === 'undefined' ||
                  e.target.tagName === 'IMG'
                ) {
                  var targetParent = document.createElement('A')
                  var parentHTML = targetParent.cloneNode(false)
                  var targetImage = e.target.cloneNode(false)
                  parentHTML.appendChild(targetImage)
                  e.dataTransfer.setData('text/html', parentHTML.outerHTML)
                } // Show the drop target

                _this.dragTarget.style.display = 'flex'
                _this.dragTarget.style.opacity = 1 // Hide the underlying iframe

                _this.hideIframe()
              })

              _defineProperty(this, 'onStopDrag', function() {
                // Hide the drop target
                _this.dragTarget.style.display = 'none'
                _this.dragTarget.style.opacity = 0 // Show the underlying iframe

                _this.showIframe()
              })

              _defineProperty(this, 'onDragOver', function(e) {
                e.stopPropagation()
                e.preventDefault()
                return false
              })

              _defineProperty(this, 'onDragEnter', function(e) {
                e.dataTransfer.dropEffect = 'copy'

                _this.messenger.send({
                  action: 'dragenter',
                })
              })

              _defineProperty(this, 'onDragLeave', function() {
                _this.messenger.send({
                  action: 'dragleave',
                })
              })

              _defineProperty(this, 'onDrop', function(e) {
                e.stopPropagation()
                e.preventDefault()
                var data = new _PaneDataExtractor.default(e).extract()

                _this.messenger.send({
                  action: 'drop',
                  value: data,
                })

                return false
              })

              _defineProperty(this, 'setupEventListeners', function() {
                document.addEventListener('dragstart', _this.onStartDrag, true)
                document.addEventListener('dragend', _this.onStopDrag, true)

                _this.dragTarget.addEventListener(
                  'dragover',
                  _this.onDragOver,
                  true
                )

                _this.dragTarget.addEventListener(
                  'dragenter',
                  _this.onDragEnter,
                  false
                )

                _this.dragTarget.addEventListener(
                  'dragleave',
                  _this.onDragLeave,
                  false
                )

                _this.dragTarget.addEventListener('drop', _this.onDrop, false)
              })

              _defineProperty(this, 'removeEventListeners', function() {
                document.removeEventListener(
                  'dragstart',
                  _this.onStartDrag,
                  true
                )
                document.removeEventListener('dragend', _this.onStopDrag, true)

                _this.dragTarget.removeEventListener(
                  'dragover',
                  _this.onDragOver,
                  true
                )

                _this.dragTarget.removeEventListener(
                  'dragenter',
                  _this.onDragEnter,
                  false
                )

                _this.dragTarget.removeEventListener(
                  'dragleave',
                  _this.onDragLeave,
                  false
                )

                _this.dragTarget.removeEventListener(
                  'drop',
                  _this.onDrop,
                  false
                )
              })

              _defineProperty(this, 'setupReceiver', function() {
                window.addEventListener('message', _this.receiveMessage)
              })

              _defineProperty(this, 'receiveMessage', function(msg) {
                switch (msg.data.action) {
                  case 'getCurrentPage':
                    _this.sendCurrentPage()

                    break

                  case 'getInitialBlock':
                    _this.sendInitialData()

                    break

                  case 'close':
                    _this.destroyPane()

                    break

                  case 'expand':
                    _this.expandPane()

                    break

                  case 'contract':
                    _this.contractPane()

                    break

                  default:
                    break
                }
              })

              _defineProperty(this, 'sendCurrentPage', function() {
                var _ref = new _PaneDataExtractor.default(),
                  data = _ref.data

                data = _objectSpread({}, data, {
                  type: 'Link',
                  value: window.location.href,
                  url: window.location.href,
                  title: document.title,
                })

                _this.messenger.send({
                  action: 'currentPage',
                  value: data,
                })
              })

              _defineProperty(this, 'saveCurrentPage', function() {
                _this.messenger.send({
                  action: 'saveCurrentPage',
                })
              })

              _defineProperty(this, 'sendInitialData', function() {
                _this.sendData(_this.msg)
              })

              _defineProperty(this, 'sendData', function(msg) {
                var data = new _PaneDataExtractor.default().extractSelection(
                  msg
                )

                if (data.type) {
                  _this.messenger.send({
                    action: 'drop',
                    value: data,
                  })
                }
              })

              _defineProperty(this, 'expandPane', function() {
                var element = document.getElementById('arenaExtension_frame')
                element.classList.add('is-expanded')
                var target = document.getElementById('arenaExtension_div')
                target.classList.add('is-expanded')
              })

              _defineProperty(this, 'contractPane', function() {
                var element = document.getElementById('arenaExtension_frame')
                element.classList.remove('is-expanded')
                var target = document.getElementById('arenaExtension_div')
                target.classList.remove('is-expanded')
              })

              _defineProperty(this, 'destroyPane', function() {
                _this.isOpen = false

                _this.removeEventListeners()

                if (_this.frame) document.body.removeChild(_this.frame)
                if (_this.dragTarget)
                  document.body.removeChild(_this.dragTarget)
                if (_this.style) document.body.removeChild(_this.style)
                _this.frame = null
                _this.dragTarget = null
                _this.style = null
              })
            }

            _createClass(Pane, [
              {
                key: 'initialize',
                value: function initialize(msg) {
                  this.msg = msg // All the things that will hold this component

                  this.frame = this.createIframe()
                  this.dragTarget = this.createDragTarget()
                  this.style = this.addIframeStyle() // Listen to drag and drop events on the browser window

                  this.setupEventListeners() // So we can communicate with the iframe

                  this.setupReceiver()
                  this.messenger = new _PaneMessenger.default(
                    this.frame.contentWindow
                  )
                },
              },
            ])

            return Pane
          })()

        var _default = Pane
        exports.default = _default

        /***/
      },

    /***/ './src/lib/PaneDataExtractor.ts':
      /*!**************************************!*\
  !*** ./src/lib/PaneDataExtractor.ts ***!
  \**************************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.default = void 0

        __webpack_require__(
          /*! core-js/modules/web.dom.iterable */ './node_modules/core-js/modules/web.dom.iterable.js'
        )

        __webpack_require__(
          /*! core-js/modules/es6.array.iterator */ './node_modules/core-js/modules/es6.array.iterator.js'
        )

        __webpack_require__(
          /*! core-js/modules/es6.object.keys */ './node_modules/core-js/modules/es6.object.keys.js'
        )

        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {}
            var ownKeys = Object.keys(source)
            if (typeof Object.getOwnPropertySymbols === 'function') {
              ownKeys = ownKeys.concat(
                Object.getOwnPropertySymbols(source).filter(function(sym) {
                  return Object.getOwnPropertyDescriptor(source, sym).enumerable
                })
              )
            }
            ownKeys.forEach(function(key) {
              _defineProperty(target, key, source[key])
            })
          }
          return target
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function')
          }
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true,
            })
          } else {
            obj[key] = value
          }
          return obj
        }

        var PaneDataExtractor = function PaneDataExtractor(event) {
          var _this = this

          _classCallCheck(this, PaneDataExtractor)

          _defineProperty(this, 'event', void 0)

          _defineProperty(this, 'data', void 0)

          _defineProperty(this, 'image', void 0)

          _defineProperty(this, 'extract', function() {
            var tempData = {} // make the temp data object a little nicer to deal with

            if (_this.event.dataTransfer.types != null) {
              for (
                var i = 0;
                i < _this.event.dataTransfer.types.length;
                i += 1
              ) {
                var type = _this.event.dataTransfer.types[i]
                tempData[type] = _this.event.dataTransfer.getData(type)
              }
            } // If we have html, try to find an image within

            if (tempData['text/html'] && _this.extractImageFromHTML(tempData)) {
              _this.data = _objectSpread({}, _this.data, {
                type: 'Image',
                value: _this.image,
              })
            } else if (tempData['text/uri-list']) {
              // we have a link, don't copy the original source
              _this.data = {
                id: _this.data.id,
                type: 'Link',
                value: tempData['text/uri-list'],
              }
            } else {
              // otherwise we are dealing with text
              _this.data = _objectSpread({}, _this.data, {
                type: 'Text',
                value: tempData['text/plain'],
              })
            }

            return _this.data
          })

          _defineProperty(this, 'extractSelection', function(msg) {
            // If we have some text, send that,
            // otherwise find an image if we can.
            // Failing all else, save the page.
            if (msg.options.selectionText) {
              _this.data = _objectSpread({}, _this.data, {
                type: 'Text',
                value: msg.options.selectionText,
              })
            } else if (msg.options.mediaType === 'image') {
              _this.data = _objectSpread({}, _this.data, {
                type: 'Image',
                value: msg.options.srcUrl,
              })
            }

            return _this.data
          })

          _defineProperty(this, 'extractImageFromHTML', function(data) {
            var html = new DOMParser().parseFromString(
              data['text/html'],
              'text/html'
            ).body.firstChild
            _this.image =
              html.querySelector('img') && html.querySelector('img').src
            return _this.image
          })

          _defineProperty(this, 'setSourceData', function() {
            _this.data = _objectSpread({}, _this.data, {
              original_source_url: window.location.href,
              original_source_title: document.title,
            })
          })

          this.event = event
          this.data = {
            id: Math.floor(Math.random() * 1000000) + 1,
          }
          this.setSourceData()
        }

        var _default = PaneDataExtractor
        exports.default = _default

        /***/
      },

    /***/ './src/lib/PaneMessenger.ts':
      /*!**********************************!*\
  !*** ./src/lib/PaneMessenger.ts ***!
  \**********************************/
      /*! no static exports found */
      /***/ function(module, exports, __webpack_require__) {
        'use strict'

        Object.defineProperty(exports, '__esModule', {
          value: true,
        })
        exports.default = void 0

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function')
          }
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true,
            })
          } else {
            obj[key] = value
          }
          return obj
        }

        var PaneMessenger = function PaneMessenger(el) {
          var _this = this

          _classCallCheck(this, PaneMessenger)

          _defineProperty(this, 'el', void 0)

          _defineProperty(this, 'send', function(_ref) {
            var action = _ref.action,
              value = _ref.value
            if (!_this.el) return false
            return _this.el.postMessage(
              {
                action: action,
                value: value,
              },
              '*'
            )
          })

          this.el = el
        }

        var _default = PaneMessenger
        exports.default = _default

        /***/
      },

    /******/
  }
)
//# sourceMappingURL=loader.js.map
