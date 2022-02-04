/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.ts":
/*!***********************!*\
  !*** ./src/js/app.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scribe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scribe */ "./src/js/scribe.ts");
/**
 * app.js
 * All custom JS for theme stored here.
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

var scribe = new _scribe__WEBPACK_IMPORTED_MODULE_0__.Scribe({
  form: ".scribe-form"
});

/***/ }),

/***/ "./src/js/common/log.ts":
/*!******************************!*\
  !*** ./src/js/common/log.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Log": () => (/* binding */ Log)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Logger utility class for logging out messages to the
 * console.
 */
var Log = /*#__PURE__*/function () {
  function Log() {
    _classCallCheck(this, Log);
  }

  _createClass(Log, null, [{
    key: "error",
    value:
    /**
     * Log a console error.
     * @param message
     */
    function error(message) {
      console.error(this.prefix, message);
    }
    /**
     * Log a console warning,
     * @param message
     */

  }, {
    key: "warn",
    value: function warn(message) {
      console.warn(this.prefix, message);
    }
    /**
     * Log a console message.
     * @param message
     */

  }, {
    key: "info",
    value: function info(message) {
      console.log(this.prefix, message);
    }
  }]);

  return Log;
}();

_defineProperty(Log, "prefix", "Scribe - ");

/***/ }),

/***/ "./src/js/scribe.ts":
/*!**************************!*\
  !*** ./src/js/scribe.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scribe": () => (/* binding */ Scribe)
/* harmony export */ });
/* harmony import */ var _common_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/log */ "./src/js/common/log.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * scribe.js
 * Scribe class for forms.
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */

var VERSION = "1.0.0";
var Scribe = /*#__PURE__*/function () {
  /**
   * Default configuration for scribe.
   */

  /**
   * The main HTML Form element to use.
   */

  /**
   *
   */

  /**
   *
   */

  /**
   *
   */

  /**
   *
   * @param config
   */
  function Scribe(config) {
    _classCallCheck(this, Scribe);

    _defineProperty(this, "config", {
      form: ".scribe-form",
      controls: true,
      horizontal: false,
      prevButton: ".scribe-prev",
      nextButton: ".scribe-next"
    });

    _defineProperty(this, "form", void 0);

    _defineProperty(this, "list", void 0);

    _defineProperty(this, "currentSlide", 0);

    _defineProperty(this, "animatingTime", 600);

    _defineProperty(this, "getInput", function (el) {
      return el.querySelector("input, textarea, select");
    });

    if (config) {
      this.config = _objectSpread(_objectSpread({}, this.config), config);
    }

    console.log(this.config); // @ts-ignore

    this.setForm(this.config.form);
    this.list = this.form.querySelectorAll(".scribe-item");
    this.form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    this.listener();
    this.attachNavigation();
    this.form.classList.add("scribe-form-loaded");
  }
  /**
   *
   * @returns string
   */


  _createClass(Scribe, [{
    key: "version",
    value: function version() {
      return VERSION;
    }
    /**
     *
     * @param target
     */

  }, {
    key: "goTo",
    value: function goTo(target) {
      console.log("go to");
    }
    /**
     *
     * @private
     */

  }, {
    key: "listener",
    value: function listener() {
      var _this = this;

      document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          _this.nextSlide();
        }
      });
    }
    /**
     * Goes to the previous slide in the form.
     * If it's the first slide, the function will exit.
     * Input elements are autofocused once the animation has been completed.
     */

  }, {
    key: "previousSlide",
    value: function previousSlide() {
      if (this.isFirstSlide()) {
        return;
      }

      var curr = this.list[this.currentSlide],
          prev = this.list[this.currentSlide - 1];
      prev.classList.add("scribe-item-show");
      curr.classList.remove("scribe-item-show");
      curr.classList.add("scribe-item-hide-forwards");
      this.focusElement(this.getInput(prev));
      this.currentSlide--;
    }
    /**
     * Goes to the next slide in the form.
     * If it's the last slide, the function will exit.
     * Input elements are autofocused once the animation has been completed.
     */

  }, {
    key: "nextSlide",
    value: function nextSlide() {
      if (this.isLastSlide()) {
        return;
      }

      var curr = this.list[this.currentSlide],
          next = this.list[this.currentSlide + 1];
      curr.classList.add("scribe-item-hide");
      curr.classList.remove("scribe-item-show");
      curr.classList.remove("scribe-item-hide-forwards");
      next.classList.add("scribe-item-show");
      this.focusElement(this.getInput(next));
      this.currentSlide++;
    }
    /**
     * Determines if the current slide is the first in the form.
     * @returns bool
     */

  }, {
    key: "isFirstSlide",
    value: function isFirstSlide() {
      return this.currentSlide === 0;
    }
    /**
     * Determines if the current slide is the last in the form.
     * @returns bool
     */

  }, {
    key: "isLastSlide",
    value: function isLastSlide() {
      return this.list.length - 1 === this.currentSlide;
    }
    /**
     * Obtains Scribe information.
     * TODO: Add navContainer etc.
     * @returns ScribeInfo
     */

  }, {
    key: "getInfo",
    value: function getInfo() {
      return {
        index: this.currentSlide,
        items: this.list.length
      };
    }
    /**
     *
     * @returns bool
     */

  }, {
    key: "validate",
    value: function validate() {
      return true;
    }
    /**
     *
     * @private
     */

  }, {
    key: "attachNavigation",
    value: function attachNavigation() {
      var _this2 = this;

      var next = document.querySelector(".scribe-next");

      if (next) {
        next.addEventListener("click", function (e) {
          e.preventDefault();

          _this2.nextSlide();
        });
      }

      var prev = document.querySelector(".scribe-previous");

      if (prev) {
        prev.addEventListener("click", function (e) {
          e.preventDefault();

          _this2.previousSlide();
        });
      }
    }
    /**
     * Obtains the input element from a list item.
     * @param el
     * @private
     */

  }, {
    key: "focusElement",
    value:
    /**
     * Focuses the HTMLElement, in order for the user to type when
     * a slide has transitioned.
     * @param el
     * @private
     */
    function focusElement(el) {
      if (el) {
        setTimeout(function () {
          el.focus();
        }, this.animatingTime);
      }
    }
    /**
     * Sets the form
     * @param form
     * @private
     */

  }, {
    key: "setForm",
    value: function setForm(form) {
      if (typeof form === "string") {
        form = document.querySelector(form);
      }

      if (!form) {
        _common_log__WEBPACK_IMPORTED_MODULE_0__.Log.error("".concat(form, " is not a valid HTMLFormElement"));
      }

      this.form = form;
    }
  }]);

  return Scribe;
}();

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/app": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkscribe_form"] = self["webpackChunkscribe_form"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./src/js/app.ts")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/app"], () => (__webpack_require__("./src/scss/app.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;