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

var scribe = new _scribe__WEBPACK_IMPORTED_MODULE_0__.Scribe(".scribe-form");

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
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validation */ "./src/js/validation.ts");
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

var Scribe = /*#__PURE__*/function () {
  // This would be great for options
  // TODO this will be a config struct;
  function Scribe(formSelector) {
    _classCallCheck(this, Scribe);

    _defineProperty(this, "form", void 0);

    _defineProperty(this, "list", void 0);

    _defineProperty(this, "validator", void 0);

    _defineProperty(this, "currentSlide", 0);

    _defineProperty(this, "animatingTime", 600);

    _defineProperty(this, "getInput", function (el) {
      return el.querySelector("input, textarea, select");
    });

    var form = document.querySelector("form");

    if (!form) {
      console.error("".concat(formSelector, " not found in DOM"));
      return;
    }

    this.form = form;
    this.list = form.querySelectorAll(".scribe-item");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
    });
    this.validator = new _validation__WEBPACK_IMPORTED_MODULE_0__.Validation(form);
    this.listener();
    this.form.classList.add("scribe-form-loaded");
  }

  _createClass(Scribe, [{
    key: "listener",
    value: function listener() {
      var _this = this;

      document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          _this.nextSlide();
        }
      });
      var next = document.querySelector(".scribe-next");

      if (next) {
        next.addEventListener("click", function (e) {
          e.preventDefault();

          _this.nextSlide();
        });
      }

      var prev = document.querySelector(".scribe-previous");

      if (prev) {
        prev.addEventListener("click", function (e) {
          e.preventDefault();

          _this.previousSlide();
        });
      }
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
  }, {
    key: "getInfo",
    value: function getInfo() {
      return {};
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
  }]);

  return Scribe;
}();

/***/ }),

/***/ "./src/js/validation.ts":
/*!******************************!*\
  !*** ./src/js/validation.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Validation": () => (/* binding */ Validation)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * validation.js
 * Validation logic for Scribe
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 */
var Validation = /*#__PURE__*/function () {
  // Configuration for Pristine.
  function Validation(form) {
    _classCallCheck(this, Validation);

    _defineProperty(this, "config", {
      // Class of the parent element where the error/success class is added
      classTo: 'form-group',
      // Class of the parent to add in case of an error.
      errorClass: 'form-group-error',
      // Class of the parent to add in case of success.
      successClass: 'form-group-success',
      // Class of the parent element where error text element is appended
      errorTextParent: 'form-group',
      // Type of element to create for the error text
      errorTextTag: 'span',
      // Class of the error text element
      errorTextClass: 'form-message'
    });

    _defineProperty(this, "form", void 0);
  }

  _createClass(Validation, [{
    key: "validate",
    value: function validate(el) {
      var isRequired = el.getAttribute("required");
      return false; //if (!require())
    }
  }]);

  return Validation;
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