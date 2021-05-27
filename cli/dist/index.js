/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var webResource_1 = __importDefault(__webpack_require__(/*! ./webResource */ "./src/webResource/index.ts"));
/**
 * Provide a basic CLI parser.
 * @param command Command selector.
 * @param args Command line argument values.
 */
function main(command, args) {
    switch (command) {
        case 'wr':
        case 'web-resource':
            webResource_1.default(args);
            break;
        default:
            console.warn("Command \"" + command + "\" not recognized.");
    }
}
/** Destructure the command line arguments. */
(function (_a) {
    var a = _a[0], b = _a[1], c = _a[2], d = _a.slice(3);
    return main(c, d);
})(process.argv);


/***/ }),

/***/ "./src/webResource/download.ts":
/*!*************************************!*\
  !*** ./src/webResource/download.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function download(name) {
    console.log('Download the web resource, ' + name);
}
exports.default = download;


/***/ }),

/***/ "./src/webResource/index.ts":
/*!**********************************!*\
  !*** ./src/webResource/index.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var download_1 = __importDefault(__webpack_require__(/*! ./download */ "./src/webResource/download.ts"));
function main(args) {
    var action = args[0], options = args.slice(1);
    switch (action) {
        case 'download':
            var name_1 = options[0];
            if (name_1) {
                download_1.default(name_1);
            }
            break;
        default:
            console.warn("[web-resource] Action \"" + action + "\" not recognized.");
    }
}
exports.default = main;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly94cm0tY2xpLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3hybS1jbGkvLi9zcmMvd2ViUmVzb3VyY2UvZG93bmxvYWQudHMiLCJ3ZWJwYWNrOi8veHJtLWNsaS8uL3NyYy93ZWJSZXNvdXJjZS9pbmRleC50cyIsIndlYnBhY2s6Ly94cm0tY2xpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3hybS1jbGkvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELG9DQUFvQyxtQkFBTyxDQUFDLGlEQUFlO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7QUN6Qlk7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7Ozs7Ozs7QUNMRjtBQUNiO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGlDQUFpQyxtQkFBTyxDQUFDLGlEQUFZO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7Ozs7OztVQ25CZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIHdlYlJlc291cmNlXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vd2ViUmVzb3VyY2VcIikpO1xyXG4vKipcclxuICogUHJvdmlkZSBhIGJhc2ljIENMSSBwYXJzZXIuXHJcbiAqIEBwYXJhbSBjb21tYW5kIENvbW1hbmQgc2VsZWN0b3IuXHJcbiAqIEBwYXJhbSBhcmdzIENvbW1hbmQgbGluZSBhcmd1bWVudCB2YWx1ZXMuXHJcbiAqL1xyXG5mdW5jdGlvbiBtYWluKGNvbW1hbmQsIGFyZ3MpIHtcclxuICAgIHN3aXRjaCAoY29tbWFuZCkge1xyXG4gICAgICAgIGNhc2UgJ3dyJzpcclxuICAgICAgICBjYXNlICd3ZWItcmVzb3VyY2UnOlxyXG4gICAgICAgICAgICB3ZWJSZXNvdXJjZV8xLmRlZmF1bHQoYXJncyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIkNvbW1hbmQgXFxcIlwiICsgY29tbWFuZCArIFwiXFxcIiBub3QgcmVjb2duaXplZC5cIik7XHJcbiAgICB9XHJcbn1cclxuLyoqIERlc3RydWN0dXJlIHRoZSBjb21tYW5kIGxpbmUgYXJndW1lbnRzLiAqL1xyXG4oZnVuY3Rpb24gKF9hKSB7XHJcbiAgICB2YXIgYSA9IF9hWzBdLCBiID0gX2FbMV0sIGMgPSBfYVsyXSwgZCA9IF9hLnNsaWNlKDMpO1xyXG4gICAgcmV0dXJuIG1haW4oYywgZCk7XHJcbn0pKHByb2Nlc3MuYXJndik7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmZ1bmN0aW9uIGRvd25sb2FkKG5hbWUpIHtcclxuICAgIGNvbnNvbGUubG9nKCdEb3dubG9hZCB0aGUgd2ViIHJlc291cmNlLCAnICsgbmFtZSk7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gZG93bmxvYWQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBkb3dubG9hZF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2Rvd25sb2FkXCIpKTtcclxuZnVuY3Rpb24gbWFpbihhcmdzKSB7XHJcbiAgICB2YXIgYWN0aW9uID0gYXJnc1swXSwgb3B0aW9ucyA9IGFyZ3Muc2xpY2UoMSk7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICAgIGNhc2UgJ2Rvd25sb2FkJzpcclxuICAgICAgICAgICAgdmFyIG5hbWVfMSA9IG9wdGlvbnNbMF07XHJcbiAgICAgICAgICAgIGlmIChuYW1lXzEpIHtcclxuICAgICAgICAgICAgICAgIGRvd25sb2FkXzEuZGVmYXVsdChuYW1lXzEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlt3ZWItcmVzb3VyY2VdIEFjdGlvbiBcXFwiXCIgKyBhY3Rpb24gKyBcIlxcXCIgbm90IHJlY29nbml6ZWQuXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IG1haW47XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=