"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/ChatPage",{

/***/ "./pages/ChatPage.tsx":
/*!****************************!*\
  !*** ./pages/ChatPage.tsx ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _src_app_firebase_firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/app/firebase/firebase */ \"./src/app/firebase/firebase.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _src_app_Utility_NavBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/app/Utility/NavBar */ \"./src/app/Utility/NavBar.tsx\");\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./main.css */ \"./pages/main.css\");\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_main_css__WEBPACK_IMPORTED_MODULE_7__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst ChatRenderingPage = ()=>{\n    _s();\n    const [currentUser, setCurrentUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [username, setUsername] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [sessionID, setSessionId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isReady, setIsReady] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false); // New state to control rendering\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.onAuthStateChanged)(_src_app_firebase_firebase__WEBPACK_IMPORTED_MODULE_3__.auth, async (user)=>{\n            if (user) {\n                setCurrentUser(user);\n                const userDoc = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.getDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_4__.doc)(_src_app_firebase_firebase__WEBPACK_IMPORTED_MODULE_3__.db, \"users\", user.uid));\n                if (userDoc.exists()) {\n                    setUsername(userDoc.data().username);\n                }\n                setIsReady(true); // Set ready state to true if user is authenticated\n            } else {\n                router.push(\"/login\");\n            }\n        });\n        return ()=>unsubscribe();\n    }, [\n        router\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const timeoutId = setTimeout(()=>{\n            setIsReady(true);\n        }, 3000);\n        return ()=>clearTimeout(timeoutId); // clears timeout\n    }, []);\n    const startChat = async ()=>{\n        // Assume you have a function to create a WebRTC session, replace it with your implementation\n        const newSessionId = await fetch(\"../server/webrtc\");\n        console.log(\"WebRTC session ID:\", newSessionId);\n    };\n    if (!isReady) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Loading...\"\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\ozair\\\\Documents\\\\GitHub\\\\Pod2\\\\pages\\\\ChatPage.tsx\",\n            lineNumber: 48,\n            columnNumber: 16\n        }, undefined); // Loading instead of rendering chat temporarely.\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_src_app_Utility_NavBar__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ozair\\\\Documents\\\\GitHub\\\\Pod2\\\\pages\\\\ChatPage.tsx\",\n                lineNumber: 53,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex justify-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: startChat,\n                        className: \"my-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded\",\n                        children: \"Start Chat\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\ozair\\\\Documents\\\\GitHub\\\\Pod2\\\\pages\\\\ChatPage.tsx\",\n                        lineNumber: 55,\n                        columnNumber: 13\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        id: \"videos\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"video\", {\n                                class: \"video-player\",\n                                id: \"user-1\",\n                                autoplay: true,\n                                playsinline: true\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ozair\\\\Documents\\\\GitHub\\\\Pod2\\\\pages\\\\ChatPage.tsx\",\n                                lineNumber: 57,\n                                columnNumber: 9\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"video\", {\n                                class: \"video-player\",\n                                id: \"user-2\",\n                                autoplay: true,\n                                playsinline: true\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ozair\\\\Documents\\\\GitHub\\\\Pod2\\\\pages\\\\ChatPage.tsx\",\n                                lineNumber: 58,\n                                columnNumber: 9\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"C:\\\\Users\\\\ozair\\\\Documents\\\\GitHub\\\\Pod2\\\\pages\\\\ChatPage.tsx\",\n                        lineNumber: 56,\n                        columnNumber: 13\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\ozair\\\\Documents\\\\GitHub\\\\Pod2\\\\pages\\\\ChatPage.tsx\",\n                lineNumber: 54,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true);\n};\n_s(ChatRenderingPage, \"OrPe1ZsJUcPLZ2Ig9XCcZVOsom0=\", false, function() {\n    return [\n        next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter\n    ];\n});\n_c = ChatRenderingPage;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ChatRenderingPage);\nvar _c;\n$RefreshReg$(_c, \"ChatRenderingPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9DaGF0UGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7QUFDTTtBQUNEO0FBQ1A7QUFDVDtBQUNNO0FBQzNCO0FBRW5CLE1BQU1VLG9CQUFvQjs7SUFDdEIsTUFBTSxDQUFDQyxhQUFhQyxlQUFlLEdBQUdWLCtDQUFRQSxDQUFjO0lBQzVELE1BQU0sQ0FBQ1csVUFBVUMsWUFBWSxHQUFHWiwrQ0FBUUEsQ0FBZ0I7SUFDeEQsTUFBTSxDQUFDYSxXQUFXQyxhQUFhLEdBQUdkLCtDQUFRQSxDQUFnQjtJQUMxRCxNQUFNLENBQUNlLFNBQVNDLFdBQVcsR0FBR2hCLCtDQUFRQSxDQUFDLFFBQVEsaUNBQWlDO0lBQ2hGLE1BQU1pQixTQUFTWCxzREFBU0E7SUFFeEJQLGdEQUFTQSxDQUFDO1FBQ04sTUFBTW1CLGNBQWNqQixpRUFBa0JBLENBQUNDLDREQUFJQSxFQUFFLE9BQU9pQjtZQUNoRCxJQUFJQSxNQUFNO2dCQUNOVCxlQUFlUztnQkFDZixNQUFNQyxVQUFVLE1BQU1mLDBEQUFNQSxDQUFDRCx1REFBR0EsQ0FBQ0QsMERBQUVBLEVBQUUsU0FBU2dCLEtBQUtFLEdBQUc7Z0JBQ3RELElBQUlELFFBQVFFLE1BQU0sSUFBSTtvQkFDbEJWLFlBQVlRLFFBQVFHLElBQUksR0FBR1osUUFBUTtnQkFDdkM7Z0JBQ0FLLFdBQVcsT0FBTyxtREFBbUQ7WUFDekUsT0FBTztnQkFDSEMsT0FBT08sSUFBSSxDQUFDO1lBQ2hCO1FBQ0o7UUFFQSxPQUFPLElBQU1OO0lBQ2pCLEdBQUc7UUFBQ0Q7S0FBTztJQUVYbEIsZ0RBQVNBLENBQUM7UUFDTixNQUFNMEIsWUFBWUMsV0FBVztZQUN6QlYsV0FBVztRQUNmLEdBQUc7UUFFSCxPQUFPLElBQU1XLGFBQWFGLFlBQVksaUJBQWlCO0lBQzNELEdBQUcsRUFBRTtJQUVMLE1BQU1HLFlBQVk7UUFDZCw2RkFBNkY7UUFDN0YsTUFBTUMsZUFBZSxNQUFNQyxNQUFNO1FBQ2pDQyxRQUFRQyxHQUFHLENBQUMsc0JBQXNCSDtJQUN0QztJQUVBLElBQUksQ0FBQ2QsU0FBUztRQUNWLHFCQUFPLDhEQUFDa0I7c0JBQUk7Ozs7O3VCQUFrQixpREFBaUQ7SUFDbkY7SUFFQSxxQkFDRzs7MEJBQ0MsOERBQUMxQiwrREFBTUE7Ozs7OzBCQUNQLDhEQUFDMEI7Z0JBQUlDLFdBQVk7O2tDQUNiLDhEQUFDQzt3QkFBT0MsU0FBV1I7d0JBQVdNLFdBQVU7a0NBQTZFOzs7Ozs7a0NBQ3JILDhEQUFDRDt3QkFBSUksSUFBRzs7MENBQ1osOERBQUNDO2dDQUFNQyxPQUFNO2dDQUFlRixJQUFHO2dDQUFTRyxRQUFRO2dDQUFDQyxXQUFXOzs7Ozs7MENBQzVELDhEQUFDSDtnQ0FBTUMsT0FBTTtnQ0FBZUYsSUFBRztnQ0FBU0csUUFBUTtnQ0FBQ0MsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNcEU7R0F2RE1qQzs7UUFLYUYsa0RBQVNBOzs7S0FMdEJFO0FBeUROLCtEQUFlQSxpQkFBaUJBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvQ2hhdFBhZ2UudHN4PzU4NGIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IG9uQXV0aFN0YXRlQ2hhbmdlZCwgVXNlciB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xyXG5pbXBvcnQgeyBhdXRoLCBkYiB9IGZyb20gJy4uL3NyYy9hcHAvZmlyZWJhc2UvZmlyZWJhc2UnO1xyXG5pbXBvcnQgeyBkb2MsIGdldERvYyB9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7IFxyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCBOYXZCYXIgZnJvbSAnLi4vc3JjL2FwcC9VdGlsaXR5L05hdkJhcidcclxuaW1wb3J0ICcuL21haW4uY3NzJ1xyXG5cclxuY29uc3QgQ2hhdFJlbmRlcmluZ1BhZ2UgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBbY3VycmVudFVzZXIsIHNldEN1cnJlbnRVc2VyXSA9IHVzZVN0YXRlPFVzZXIgfCBudWxsPihudWxsKTtcclxuICAgIGNvbnN0IFt1c2VybmFtZSwgc2V0VXNlcm5hbWVdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XHJcbiAgICBjb25zdCBbc2Vzc2lvbklELCBzZXRTZXNzaW9uSWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XHJcbiAgICBjb25zdCBbaXNSZWFkeSwgc2V0SXNSZWFkeV0gPSB1c2VTdGF0ZShmYWxzZSk7IC8vIE5ldyBzdGF0ZSB0byBjb250cm9sIHJlbmRlcmluZ1xyXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCB1bnN1YnNjcmliZSA9IG9uQXV0aFN0YXRlQ2hhbmdlZChhdXRoLCBhc3luYyAodXNlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodXNlcikge1xyXG4gICAgICAgICAgICAgICAgc2V0Q3VycmVudFVzZXIodXNlcik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyRG9jID0gYXdhaXQgZ2V0RG9jKGRvYyhkYiwgJ3VzZXJzJywgdXNlci51aWQpKTtcclxuICAgICAgICAgICAgICAgIGlmICh1c2VyRG9jLmV4aXN0cygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VXNlcm5hbWUodXNlckRvYy5kYXRhKCkudXNlcm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2V0SXNSZWFkeSh0cnVlKTsgLy8gU2V0IHJlYWR5IHN0YXRlIHRvIHRydWUgaWYgdXNlciBpcyBhdXRoZW50aWNhdGVkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZXIucHVzaCgnL2xvZ2luJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHVuc3Vic2NyaWJlKCk7XHJcbiAgICB9LCBbcm91dGVyXSk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgc2V0SXNSZWFkeSh0cnVlKTsgXHJcbiAgICAgICAgfSwgMzAwMCk7XHJcblxyXG4gICAgICAgIHJldHVybiAoKSA9PiBjbGVhclRpbWVvdXQodGltZW91dElkKTsgLy8gY2xlYXJzIHRpbWVvdXRcclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICBjb25zdCBzdGFydENoYXQgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgLy8gQXNzdW1lIHlvdSBoYXZlIGEgZnVuY3Rpb24gdG8gY3JlYXRlIGEgV2ViUlRDIHNlc3Npb24sIHJlcGxhY2UgaXQgd2l0aCB5b3VyIGltcGxlbWVudGF0aW9uXHJcbiAgICAgICAgY29uc3QgbmV3U2Vzc2lvbklkID0gYXdhaXQgZmV0Y2goJy4uL3NlcnZlci93ZWJydGMnKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdXZWJSVEMgc2Vzc2lvbiBJRDonLCBuZXdTZXNzaW9uSWQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIWlzUmVhZHkpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5Mb2FkaW5nLi4uPC9kaXY+OyAvLyBMb2FkaW5nIGluc3RlYWQgb2YgcmVuZGVyaW5nIGNoYXQgdGVtcG9yYXJlbHkuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgIDw+XHJcbiAgICAgICAgPE5hdkJhciAvPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lID0gXCJmbGV4IGp1c3RpZnktY2VudGVyXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gb25DbGljayA9IHtzdGFydENoYXR9IGNsYXNzTmFtZT1cIm15LTQ4IGJnLWJsdWUtNTAwIGhvdmVyOmJnLWJsdWUtNzAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHB5LTIgcHgtNCByb3VuZGVkXCI+U3RhcnQgQ2hhdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwidmlkZW9zXCI+XHJcbiAgICAgICAgPHZpZGVvIGNsYXNzPVwidmlkZW8tcGxheWVyXCIgaWQ9XCJ1c2VyLTFcIiBhdXRvcGxheSBwbGF5c2lubGluZT48L3ZpZGVvPlxyXG4gICAgICAgIDx2aWRlbyBjbGFzcz1cInZpZGVvLXBsYXllclwiIGlkPVwidXNlci0yXCIgYXV0b3BsYXkgcGxheXNpbmxpbmU+PC92aWRlbz5cclxuICAgIDwvZGl2PiAgICAgICBcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgIDwvPiBcclxuICAgICAgIFxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hhdFJlbmRlcmluZ1BhZ2U7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwiYXV0aCIsImRiIiwiZG9jIiwiZ2V0RG9jIiwidXNlUm91dGVyIiwiTmF2QmFyIiwiQ2hhdFJlbmRlcmluZ1BhZ2UiLCJjdXJyZW50VXNlciIsInNldEN1cnJlbnRVc2VyIiwidXNlcm5hbWUiLCJzZXRVc2VybmFtZSIsInNlc3Npb25JRCIsInNldFNlc3Npb25JZCIsImlzUmVhZHkiLCJzZXRJc1JlYWR5Iiwicm91dGVyIiwidW5zdWJzY3JpYmUiLCJ1c2VyIiwidXNlckRvYyIsInVpZCIsImV4aXN0cyIsImRhdGEiLCJwdXNoIiwidGltZW91dElkIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInN0YXJ0Q2hhdCIsIm5ld1Nlc3Npb25JZCIsImZldGNoIiwiY29uc29sZSIsImxvZyIsImRpdiIsImNsYXNzTmFtZSIsImJ1dHRvbiIsIm9uQ2xpY2siLCJpZCIsInZpZGVvIiwiY2xhc3MiLCJhdXRvcGxheSIsInBsYXlzaW5saW5lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/ChatPage.tsx\n"));

/***/ })

});