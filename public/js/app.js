/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.ts":
/*!***********************!*\
  !*** ./src/js/app.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scribe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scribe */ \"./src/js/scribe.ts\");\n/**\n * app.js\n * All custom JS for theme stored here.\n * @author Ainsley Clark\n * @author URL:   https://ainsley.dev\n * @author Email: hello@ainsley.dev\n */\n\nnew _scribe__WEBPACK_IMPORTED_MODULE_0__.Scribe({\n  form: \".scribe-form\"\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYXBwLnRzLmpzIiwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlBLDJDQUFKLENBQVc7QUFDUEMsRUFBQUEsSUFBSSxFQUFFO0FBREMsQ0FBWCIsInNvdXJjZXMiOlsid2VicGFjazovL3NjcmliZS1mb3JtLy4vc3JjL2pzL2FwcC50cz83OWQ5Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogYXBwLmpzXG4gKiBBbGwgY3VzdG9tIEpTIGZvciB0aGVtZSBzdG9yZWQgaGVyZS5cbiAqIEBhdXRob3IgQWluc2xleSBDbGFya1xuICogQGF1dGhvciBVUkw6ICAgaHR0cHM6Ly9haW5zbGV5LmRldlxuICogQGF1dGhvciBFbWFpbDogaGVsbG9AYWluc2xleS5kZXZcbiAqL1xuaW1wb3J0IHsgU2NyaWJlIH0gZnJvbSBcIi4vc2NyaWJlXCI7XG5uZXcgU2NyaWJlKHtcbiAgICBmb3JtOiBcIi5zY3JpYmUtZm9ybVwiLFxufSk7XG4iXSwibmFtZXMiOlsiU2NyaWJlIiwiZm9ybSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/app.ts\n");

/***/ }),

/***/ "./src/js/common/log.ts":
/*!******************************!*\
  !*** ./src/js/common/log.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Log\": () => (/* binding */ Log)\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n * Logger utility class for logging out messages to the\n * console.\n */\nvar Log = /*#__PURE__*/function () {\n  function Log() {\n    _classCallCheck(this, Log);\n  }\n\n  _createClass(Log, null, [{\n    key: \"error\",\n    value:\n    /**\n     * Log a console error.\n     * @param message\n     */\n    function error(message) {\n      console.error(this.prefix, message);\n    }\n    /**\n     * Log a console warning,\n     * @param message\n     */\n\n  }, {\n    key: \"warn\",\n    value: function warn(message) {\n      console.warn(this.prefix, message);\n    }\n    /**\n     * Log a console message.\n     * @param message\n     */\n\n  }, {\n    key: \"info\",\n    value: function info(message) {\n      console.log(this.prefix, message);\n    }\n  }]);\n\n  return Log;\n}();\n\n_defineProperty(Log, \"prefix\", \"Scribe -\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvY29tbW9uL2xvZy50cy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLElBQU1BLEdBQWI7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDSSxtQkFBYUMsT0FBYixFQUFzQjtBQUNsQkMsTUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWMsS0FBS0MsTUFBbkIsRUFBMkJILE9BQTNCO0FBQ0g7QUFDRDtBQUNKO0FBQ0E7QUFDQTs7QUFaQTtBQUFBO0FBQUEsV0FhSSxjQUFZQSxPQUFaLEVBQXFCO0FBQ2pCQyxNQUFBQSxPQUFPLENBQUNHLElBQVIsQ0FBYSxLQUFLRCxNQUFsQixFQUEwQkgsT0FBMUI7QUFDSDtBQUNEO0FBQ0o7QUFDQTtBQUNBOztBQW5CQTtBQUFBO0FBQUEsV0FvQkksY0FBWUEsT0FBWixFQUFxQjtBQUNqQkMsTUFBQUEsT0FBTyxDQUFDSSxHQUFSLENBQVksS0FBS0YsTUFBakIsRUFBeUJILE9BQXpCO0FBQ0g7QUF0Qkw7O0FBQUE7QUFBQTs7Z0JBQWFELGVBQ08iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY3JpYmUtZm9ybS8uL3NyYy9qcy9jb21tb24vbG9nLnRzP2NhOGQiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBMb2dnZXIgdXRpbGl0eSBjbGFzcyBmb3IgbG9nZ2luZyBvdXQgbWVzc2FnZXMgdG8gdGhlXG4gKiBjb25zb2xlLlxuICovXG5leHBvcnQgY2xhc3MgTG9nIHtcbiAgICBzdGF0aWMgcHJlZml4ID0gXCJTY3JpYmUgLVwiO1xuICAgIC8qKlxuICAgICAqIExvZyBhIGNvbnNvbGUgZXJyb3IuXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZXJyb3IobWVzc2FnZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJlZml4LCBtZXNzYWdlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTG9nIGEgY29uc29sZSB3YXJuaW5nLFxuICAgICAqIEBwYXJhbSBtZXNzYWdlXG4gICAgICovXG4gICAgc3RhdGljIHdhcm4obWVzc2FnZSkge1xuICAgICAgICBjb25zb2xlLndhcm4odGhpcy5wcmVmaXgsIG1lc3NhZ2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb2cgYSBjb25zb2xlIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5mbyhtZXNzYWdlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucHJlZml4LCBtZXNzYWdlKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiTG9nIiwibWVzc2FnZSIsImNvbnNvbGUiLCJlcnJvciIsInByZWZpeCIsIndhcm4iLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/common/log.ts\n");

/***/ }),

/***/ "./src/js/scribe.ts":
/*!**************************!*\
  !*** ./src/js/scribe.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Scribe\": () => (/* binding */ Scribe)\n/* harmony export */ });\n/* harmony import */ var _common_log__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/log */ \"./src/js/common/log.ts\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n * scribe.js\n * Scribe class for forms.\n * @author Ainsley Clark\n * @author URL:   https://ainsley.dev\n * @author Email: hello@ainsley.dev\n */\n\nvar VERSION = \"1.0.0\";\nvar Scribe = /*#__PURE__*/function () {\n  /**\n   * Default configuration for scribe.\n   */\n\n  /**\n   * The main HTML Form element to use.\n   */\n\n  /**\n   *\n   */\n\n  /**\n   *\n   */\n\n  /**\n   *\n   */\n\n  /**\n   * Creates a new Scribe instance based of the configuration passed.\n   * If no config is passed, scribe defaults will be used.\n   * @param config\n   */\n  function Scribe(config) {\n    _classCallCheck(this, Scribe);\n\n    _defineProperty(this, \"config\", {\n      form: \".scribe-form\",\n      controls: true,\n      horizontal: false,\n      okButton: \".scribe-ok\",\n      prevButton: \".scribe-prev\",\n      nextButton: \".scribe-next\"\n    });\n\n    _defineProperty(this, \"form\", void 0);\n\n    _defineProperty(this, \"list\", void 0);\n\n    _defineProperty(this, \"currentSlide\", 0);\n\n    _defineProperty(this, \"animatingTime\", 600);\n\n    _defineProperty(this, \"getInput\", function (el) {\n      return el.querySelector(\"input, textarea, select\");\n    });\n\n    if (config) {\n      this.config = _objectSpread(_objectSpread({}, this.config), config);\n    } // @ts-ignore\n\n\n    this.setForm(this.config.form);\n    this.list = this.form.querySelectorAll(\".scribe-question\");\n    this.form.addEventListener(\"submit\", function (e) {\n      e.preventDefault();\n    });\n    this.listener();\n    this.attachNavigation();\n    this.attachOk();\n    this.addLoadedForm(); //   this.focusElement(this.getInput(this.list[0]), true)\n  }\n  /**\n   * Obtains the current Scribe Version number.\n   * @returns string\n   */\n\n\n  _createClass(Scribe, [{\n    key: \"version\",\n    value: function version() {\n      return VERSION;\n    }\n    /**\n     *\n     * @param target\n     */\n\n  }, {\n    key: \"goTo\",\n    value: function goTo(target) {\n      if (typeof target === 'string') {\n        switch (target) {\n          case 'next':\n            this.nextSlide();\n            break;\n\n          case 'prev':\n            this.previousSlide();\n            break;\n\n          case 'first':\n            break;\n\n          case 'last':\n            break;\n\n          default:\n            _common_log__WEBPACK_IMPORTED_MODULE_0__.Log.error(\"Target should be 'next', 'prev', 'first', 'last' or index\");\n        }\n\n        return;\n      } // TODO: Handle index\n\n    }\n    /**\n     *\n     * @private\n     */\n\n  }, {\n    key: \"listener\",\n    value: function listener() {\n      var _this = this;\n\n      document.addEventListener('keypress', function (e) {\n        var isEnter = e.key === 'Enter';\n\n        if (e.shiftKey && isEnter && e.target instanceof HTMLTextAreaElement) {\n          e.preventDefault();\n          e.target.value += \"\\n\";\n          return;\n        }\n\n        if (isEnter) {\n          e.preventDefault();\n\n          _this.nextSlide();\n        }\n      });\n    }\n    /**\n     * Goes to the previous slide in the form.\n     * If it's the first slide, the function will exit.\n     * Input elements are autofocused once the animation has been completed.\n     */\n\n  }, {\n    key: \"previousSlide\",\n    value: function previousSlide() {\n      if (this.isFirstSlide()) {\n        return;\n      }\n\n      var curr = this.list[this.currentSlide],\n          prev = this.list[this.currentSlide - 1]; // TODO: Broken here. Adding unecessary classes.\n\n      prev.classList.add(\"scribe-question-show\");\n      curr.classList.remove(\"scribe-question-show\");\n      curr.classList.add(\"scribe-question-hide-forwards\");\n      this.focusElement(this.getInput(prev));\n      this.currentSlide--;\n    }\n    /**\n     * Goes to the next slide in the form.\n     * If it's the last slide, the function will exit.\n     * Input elements are autofocused once the animation has been completed.\n     */\n\n  }, {\n    key: \"nextSlide\",\n    value: function nextSlide() {\n      if (this.isLastSlide()) {\n        return;\n      }\n\n      var curr = this.list[this.currentSlide],\n          next = this.list[this.currentSlide + 1];\n      curr.classList.add(\"scribe-question-hide\");\n      curr.classList.remove(\"scribe-question-show\");\n      curr.classList.remove(\"scribe-question-hide-forwards\");\n      next.classList.add(\"scribe-question-show\");\n      this.focusElement(this.getInput(next));\n      this.currentSlide++;\n    }\n    /**\n     * Determines if the current slide is the first in the form.\n     * @returns bool\n     */\n\n  }, {\n    key: \"isFirstSlide\",\n    value: function isFirstSlide() {\n      return this.currentSlide === 0;\n    }\n    /**\n     * Determines if the current slide is the last in the form.\n     * @returns bool\n     */\n\n  }, {\n    key: \"isLastSlide\",\n    value: function isLastSlide() {\n      return this.list.length - 1 === this.currentSlide;\n    }\n    /**\n     * Obtains Scribe information.\n     * TODO: Add navContainer etc.\n     * @returns ScribeInfo\n     */\n\n  }, {\n    key: \"getInfo\",\n    value: function getInfo() {\n      return {\n        index: this.currentSlide,\n        items: this.list.length\n      };\n    }\n    /**\n     *\n     * @returns bool\n     */\n\n  }, {\n    key: \"validate\",\n    value: function validate() {\n      return true;\n    }\n    /**\n     *\n     * @private\n     */\n\n  }, {\n    key: \"attachNavigation\",\n    value: function attachNavigation() {\n      var _this2 = this;\n\n      var next = document.querySelector(\".scribe-next\");\n\n      if (next) {\n        next.addEventListener(\"click\", function (e) {\n          e.preventDefault();\n\n          _this2.nextSlide();\n        });\n      }\n\n      var prev = document.querySelector(\".scribe-previous\");\n\n      if (prev) {\n        prev.addEventListener(\"click\", function (e) {\n          e.preventDefault();\n\n          _this2.previousSlide();\n        });\n      }\n    }\n  }, {\n    key: \"attachOk\",\n    value: function attachOk() {\n      var _this3 = this;\n\n      if (!this.config.okButton) {\n        return;\n      }\n\n      this.form.querySelectorAll(this.config.okButton).forEach(function (btn) {\n        btn.addEventListener(\"click\", function () {\n          return _this3.nextSlide();\n        });\n      });\n    }\n    /**\n     * Obtains the input element from a list item.\n     * @param el\n     * @private\n     */\n\n  }, {\n    key: \"focusElement\",\n    value:\n    /**\n     * Focuses the HTMLElement, in order for the user to type when\n     * a slide has transitioned.\n     * @param el\n     * @param timeout\n     * @private\n     */\n    function focusElement(el) {\n      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;\n\n      if (!el) {\n        return;\n      }\n\n      if (!timeout) {\n        el.focus();\n        return;\n      }\n\n      setTimeout(function () {\n        el.focus();\n      }, this.animatingTime);\n    }\n    /**\n     * Sets the form\n     * @param form\n     * @private\n     */\n\n  }, {\n    key: \"setForm\",\n    value: function setForm(form) {\n      if (typeof form === \"string\") {\n        form = document.querySelector(form);\n      }\n\n      if (!form) {\n        _common_log__WEBPACK_IMPORTED_MODULE_0__.Log.error(\"\".concat(form, \" is not a valid HTMLFormElement\"));\n      }\n\n      this.form = form;\n    }\n    /**\n     * Add the loaded class to the scribe form, ths will prevent\n     * any transitions occurring on initial page load.\n     * @private\n     */\n\n  }, {\n    key: \"addLoadedForm\",\n    value: function addLoadedForm() {\n      this.form.classList.add(\"scribe-form-loaded\");\n    }\n  }]);\n\n  return Scribe;\n}();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YjtBQUNIOztBQUNELFdBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNIO0FBQ0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUEzT0E7QUFBQTtBQUFBLFdBNE9JLHlCQUFnQjtBQUNaLFdBQUtBLElBQUwsQ0FBVWdDLFNBQVYsQ0FBb0JDLEdBQXBCLENBQXdCLG9CQUF4QjtBQUNIO0FBOU9MOztBQUFBO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY3JpYmUtZm9ybS8uL3NyYy9qcy9zY3JpYmUudHM/MjM3NyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHNjcmliZS5qc1xuICogU2NyaWJlIGNsYXNzIGZvciBmb3Jtcy5cbiAqIEBhdXRob3IgQWluc2xleSBDbGFya1xuICogQGF1dGhvciBVUkw6ICAgaHR0cHM6Ly9haW5zbGV5LmRldlxuICogQGF1dGhvciBFbWFpbDogaGVsbG9AYWluc2xleS5kZXZcbiAqL1xuaW1wb3J0IHsgTG9nIH0gZnJvbSBcIi4vY29tbW9uL2xvZ1wiO1xuY29uc3QgVkVSU0lPTiA9IFwiMS4wLjBcIjtcbmV4cG9ydCBjbGFzcyBTY3JpYmUge1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgY29uZmlndXJhdGlvbiBmb3Igc2NyaWJlLlxuICAgICAqL1xuICAgIGNvbmZpZyA9IHtcbiAgICAgICAgZm9ybTogXCIuc2NyaWJlLWZvcm1cIixcbiAgICAgICAgY29udHJvbHM6IHRydWUsXG4gICAgICAgIGhvcml6b250YWw6IGZhbHNlLFxuICAgICAgICBva0J1dHRvbjogXCIuc2NyaWJlLW9rXCIsXG4gICAgICAgIHByZXZCdXR0b246IFwiLnNjcmliZS1wcmV2XCIsXG4gICAgICAgIG5leHRCdXR0b246IFwiLnNjcmliZS1uZXh0XCIsXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGUgbWFpbiBIVE1MIEZvcm0gZWxlbWVudCB0byB1c2UuXG4gICAgICovXG4gICAgZm9ybTtcbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGxpc3Q7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBjdXJyZW50U2xpZGUgPSAwO1xuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgYW5pbWF0aW5nVGltZSA9IDYwMDtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IFNjcmliZSBpbnN0YW5jZSBiYXNlZCBvZiB0aGUgY29uZmlndXJhdGlvbiBwYXNzZWQuXG4gICAgICogSWYgbm8gY29uZmlnIGlzIHBhc3NlZCwgc2NyaWJlIGRlZmF1bHRzIHdpbGwgYmUgdXNlZC5cbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnID0geyAuLi50aGlzLmNvbmZpZywgLi4uY29uZmlnIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNldEZvcm0odGhpcy5jb25maWcuZm9ybSk7XG4gICAgICAgIHRoaXMubGlzdCA9IHRoaXMuZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiLnNjcmliZS1xdWVzdGlvblwiKTtcbiAgICAgICAgdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoTmF2aWdhdGlvbigpO1xuICAgICAgICB0aGlzLmF0dGFjaE9rKCk7XG4gICAgICAgIHRoaXMuYWRkTG9hZGVkRm9ybSgpO1xuICAgICAgICAvLyAgIHRoaXMuZm9jdXNFbGVtZW50KHRoaXMuZ2V0SW5wdXQodGhpcy5saXN0WzBdKSwgdHJ1ZSlcbiAgICB9XG4gICAgLyoqXG4gICAgICogT2J0YWlucyB0aGUgY3VycmVudCBTY3JpYmUgVmVyc2lvbiBudW1iZXIuXG4gICAgICogQHJldHVybnMgc3RyaW5nXG4gICAgICovXG4gICAgdmVyc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIFZFUlNJT047XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHRhcmdldFxuICAgICAqL1xuICAgIGdvVG8odGFyZ2V0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgc3dpdGNoICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0U2xpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncHJldic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNTbGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdmaXJzdCc6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2xhc3QnOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBMb2cuZXJyb3IoXCJUYXJnZXQgc2hvdWxkIGJlICduZXh0JywgJ3ByZXYnLCAnZmlyc3QnLCAnbGFzdCcgb3IgaW5kZXhcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzogSGFuZGxlIGluZGV4XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBsaXN0ZW5lcigpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzRW50ZXIgPSBlLmtleSA9PT0gJ0VudGVyJztcbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5ICYmIGlzRW50ZXIgJiYgZS50YXJnZXQgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlICs9IFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzRW50ZXIpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0U2xpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdvZXMgdG8gdGhlIHByZXZpb3VzIHNsaWRlIGluIHRoZSBmb3JtLlxuICAgICAqIElmIGl0J3MgdGhlIGZpcnN0IHNsaWRlLCB0aGUgZnVuY3Rpb24gd2lsbCBleGl0LlxuICAgICAqIElucHV0IGVsZW1lbnRzIGFyZSBhdXRvZm9jdXNlZCBvbmNlIHRoZSBhbmltYXRpb24gaGFzIGJlZW4gY29tcGxldGVkLlxuICAgICAqL1xuICAgIHByZXZpb3VzU2xpZGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRmlyc3RTbGlkZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VyciA9IHRoaXMubGlzdFt0aGlzLmN1cnJlbnRTbGlkZV0sIHByZXYgPSB0aGlzLmxpc3RbdGhpcy5jdXJyZW50U2xpZGUgLSAxXTtcbiAgICAgICAgLy8gVE9ETzogQnJva2VuIGhlcmUuIEFkZGluZyB1bmVjZXNzYXJ5IGNsYXNzZXMuXG4gICAgICAgIHByZXYuY2xhc3NMaXN0LmFkZChcInNjcmliZS1xdWVzdGlvbi1zaG93XCIpO1xuICAgICAgICBjdXJyLmNsYXNzTGlzdC5yZW1vdmUoXCJzY3JpYmUtcXVlc3Rpb24tc2hvd1wiKTtcbiAgICAgICAgY3Vyci5jbGFzc0xpc3QuYWRkKFwic2NyaWJlLXF1ZXN0aW9uLWhpZGUtZm9yd2FyZHNcIik7XG4gICAgICAgIHRoaXMuZm9jdXNFbGVtZW50KHRoaXMuZ2V0SW5wdXQocHJldikpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZS0tO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBHb2VzIHRvIHRoZSBuZXh0IHNsaWRlIGluIHRoZSBmb3JtLlxuICAgICAqIElmIGl0J3MgdGhlIGxhc3Qgc2xpZGUsIHRoZSBmdW5jdGlvbiB3aWxsIGV4aXQuXG4gICAgICogSW5wdXQgZWxlbWVudHMgYXJlIGF1dG9mb2N1c2VkIG9uY2UgdGhlIGFuaW1hdGlvbiBoYXMgYmVlbiBjb21wbGV0ZWQuXG4gICAgICovXG4gICAgbmV4dFNsaWRlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0xhc3RTbGlkZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VyciA9IHRoaXMubGlzdFt0aGlzLmN1cnJlbnRTbGlkZV0sIG5leHQgPSB0aGlzLmxpc3RbdGhpcy5jdXJyZW50U2xpZGUgKyAxXTtcbiAgICAgICAgY3Vyci5jbGFzc0xpc3QuYWRkKFwic2NyaWJlLXF1ZXN0aW9uLWhpZGVcIik7XG4gICAgICAgIGN1cnIuY2xhc3NMaXN0LnJlbW92ZShcInNjcmliZS1xdWVzdGlvbi1zaG93XCIpO1xuICAgICAgICBjdXJyLmNsYXNzTGlzdC5yZW1vdmUoXCJzY3JpYmUtcXVlc3Rpb24taGlkZS1mb3J3YXJkc1wiKTtcbiAgICAgICAgbmV4dC5jbGFzc0xpc3QuYWRkKFwic2NyaWJlLXF1ZXN0aW9uLXNob3dcIik7XG4gICAgICAgIHRoaXMuZm9jdXNFbGVtZW50KHRoaXMuZ2V0SW5wdXQobmV4dCkpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTbGlkZSsrO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIGlmIHRoZSBjdXJyZW50IHNsaWRlIGlzIHRoZSBmaXJzdCBpbiB0aGUgZm9ybS5cbiAgICAgKiBAcmV0dXJucyBib29sXG4gICAgICovXG4gICAgaXNGaXJzdFNsaWRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2xpZGUgPT09IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgaWYgdGhlIGN1cnJlbnQgc2xpZGUgaXMgdGhlIGxhc3QgaW4gdGhlIGZvcm0uXG4gICAgICogQHJldHVybnMgYm9vbFxuICAgICAqL1xuICAgIGlzTGFzdFNsaWRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5saXN0Lmxlbmd0aCAtIDEgPT09IHRoaXMuY3VycmVudFNsaWRlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPYnRhaW5zIFNjcmliZSBpbmZvcm1hdGlvbi5cbiAgICAgKiBUT0RPOiBBZGQgbmF2Q29udGFpbmVyIGV0Yy5cbiAgICAgKiBAcmV0dXJucyBTY3JpYmVJbmZvXG4gICAgICovXG4gICAgZ2V0SW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLmN1cnJlbnRTbGlkZSxcbiAgICAgICAgICAgIGl0ZW1zOiB0aGlzLmxpc3QubGVuZ3RoLFxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIGJvb2xcbiAgICAgKi9cbiAgICB2YWxpZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBhdHRhY2hOYXZpZ2F0aW9uKCkge1xuICAgICAgICBjb25zdCBuZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY3JpYmUtbmV4dFwiKTtcbiAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgIG5leHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRTbGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJldiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NyaWJlLXByZXZpb3VzXCIpO1xuICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgcHJldi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJldmlvdXNTbGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXR0YWNoT2soKSB7XG4gICAgICAgIGlmICghdGhpcy5jb25maWcub2tCdXR0b24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCh0aGlzLmNvbmZpZy5va0J1dHRvbikuZm9yRWFjaChidG4gPT4ge1xuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLm5leHRTbGlkZSgpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9idGFpbnMgdGhlIGlucHV0IGVsZW1lbnQgZnJvbSBhIGxpc3QgaXRlbS5cbiAgICAgKiBAcGFyYW0gZWxcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGdldElucHV0ID0gKGVsKSA9PiBlbC5xdWVyeVNlbGVjdG9yKFwiaW5wdXQsIHRleHRhcmVhLCBzZWxlY3RcIik7XG4gICAgLyoqXG4gICAgICogRm9jdXNlcyB0aGUgSFRNTEVsZW1lbnQsIGluIG9yZGVyIGZvciB0aGUgdXNlciB0byB0eXBlIHdoZW5cbiAgICAgKiBhIHNsaWRlIGhhcyB0cmFuc2l0aW9uZWQuXG4gICAgICogQHBhcmFtIGVsXG4gICAgICogQHBhcmFtIHRpbWVvdXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGZvY3VzRWxlbWVudChlbCwgdGltZW91dCA9IHRydWUpIHtcbiAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGltZW91dCkge1xuICAgICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgIH0sIHRoaXMuYW5pbWF0aW5nVGltZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGZvcm1cbiAgICAgKiBAcGFyYW0gZm9ybVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc2V0Rm9ybShmb3JtKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm9ybSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmb3JtKSB7XG4gICAgICAgICAgICBMb2cuZXJyb3IoYCR7Zm9ybX0gaXMgbm90IGEgdmFsaWQgSFRNTEZvcm1FbGVtZW50YCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBsb2FkZWQgY2xhc3MgdG8gdGhlIHNjcmliZSBmb3JtLCB0aHMgd2lsbCBwcmV2ZW50XG4gICAgICogYW55IHRyYW5zaXRpb25zIG9jY3VycmluZyBvbiBpbml0aWFsIHBhZ2UgbG9hZC5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFkZExvYWRlZEZvcm0oKSB7XG4gICAgICAgIHRoaXMuZm9ybS5jbGFzc0xpc3QuYWRkKFwic2NyaWJlLWZvcm0tbG9hZGVkXCIpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJMb2ciLCJWRVJTSU9OIiwiU2NyaWJlIiwiY29uZmlnIiwiZm9ybSIsImNvbnRyb2xzIiwiaG9yaXpvbnRhbCIsIm9rQnV0dG9uIiwicHJldkJ1dHRvbiIsIm5leHRCdXR0b24iLCJlbCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXRGb3JtIiwibGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwibGlzdGVuZXIiLCJhdHRhY2hOYXZpZ2F0aW9uIiwiYXR0YWNoT2siLCJhZGRMb2FkZWRGb3JtIiwidGFyZ2V0IiwibmV4dFNsaWRlIiwicHJldmlvdXNTbGlkZSIsImVycm9yIiwiZG9jdW1lbnQiLCJpc0VudGVyIiwia2V5Iiwic2hpZnRLZXkiLCJIVE1MVGV4dEFyZWFFbGVtZW50IiwidmFsdWUiLCJpc0ZpcnN0U2xpZGUiLCJjdXJyIiwiY3VycmVudFNsaWRlIiwicHJldiIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImZvY3VzRWxlbWVudCIsImdldElucHV0IiwiaXNMYXN0U2xpZGUiLCJuZXh0IiwibGVuZ3RoIiwiaW5kZXgiLCJpdGVtcyIsImZvckVhY2giLCJidG4iLCJ0aW1lb3V0IiwiZm9jdXMiLCJzZXRUaW1lb3V0IiwiYW5pbWF0aW5nVGltZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/js/scribe.ts\n");

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2Nzcy9hcHAuc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY3JpYmUtZm9ybS8uL3NyYy9zY3NzL2FwcC5zY3NzP2NmZjkiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/scss/app.scss\n");

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