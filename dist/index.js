"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_OS_TYPES__ResponseEvent = exports.A_OS_TYPES__RequestEvent = exports.A_OS_MigrationManager = exports.A_OS_Widget = exports.A_OS_Page = exports.A_OS_CONSTANTS__ERROR_CODES = exports.A_OS_CONSTANTS__DEFAULT_ERRORS = exports.A_OS_EventsConnection = exports.A_OS_Events = exports.A_OS_ContextClass = exports.A_OS_Context = void 0;
var A_OS_Context_class_1 = require("./src/global/A_OS_Context.class");
Object.defineProperty(exports, "A_OS_Context", { enumerable: true, get: function () { return A_OS_Context_class_1.A_OS_Context; } });
Object.defineProperty(exports, "A_OS_ContextClass", { enumerable: true, get: function () { return A_OS_Context_class_1.A_OS_ContextClass; } });
/**
 * ============ GLOBAL Export ============
 */
var A_OS_Events_class_1 = require("./src/global/A_OS_Events.class");
Object.defineProperty(exports, "A_OS_Events", { enumerable: true, get: function () { return A_OS_Events_class_1.A_OS_Events; } });
var A_OS_EventsConnection_class_1 = require("./src/global/A_OS_EventsConnection.class");
Object.defineProperty(exports, "A_OS_EventsConnection", { enumerable: true, get: function () { return A_OS_EventsConnection_class_1.A_OS_EventsConnection; } });
/**
 * ============ API Export ============
 */
// export * as A_OS_AppInteractions from './src/api/app-interactions';
// export * as A_OS_ServerCommands from './src/api/server-commands';
// export * as A_OS_ServerDelegate from './src/api/server-delegate';
// ============ CONSTANTS Export ============
var errors_constants_1 = require("./src/constants/errors.constants");
Object.defineProperty(exports, "A_OS_CONSTANTS__DEFAULT_ERRORS", { enumerable: true, get: function () { return errors_constants_1.A_OS_CONSTANTS__DEFAULT_ERRORS; } });
Object.defineProperty(exports, "A_OS_CONSTANTS__ERROR_CODES", { enumerable: true, get: function () { return errors_constants_1.A_OS_CONSTANTS__ERROR_CODES; } });
/**
 * ============ LIB Export =================
 */
var A_OS_Page_class_1 = require("./src/lib/entities/page/A_OS_Page.class");
Object.defineProperty(exports, "A_OS_Page", { enumerable: true, get: function () { return A_OS_Page_class_1.A_OS_Page; } });
var A_OS_Widget_class_1 = require("./src/lib/entities/widget/A_OS_Widget.class");
Object.defineProperty(exports, "A_OS_Widget", { enumerable: true, get: function () { return A_OS_Widget_class_1.A_OS_Widget; } });
var A_OS_MigrationManager_class_1 = require("./src/lib/tools/A_OS_MigrationManager.class");
Object.defineProperty(exports, "A_OS_MigrationManager", { enumerable: true, get: function () { return A_OS_MigrationManager_class_1.A_OS_MigrationManager; } });
/**
 * ============ TYPES Export ============
 */
// export * from './src/lib/entities/app/A_OS_App.types';
// export * from './src/lib/entities/product/A_OS_Product.types';
// export * from './src/lib/entities/product/A_OS_ProductBranding.types';
// ------------ API TYPES Export ------------
// export * from './src/api/app-interactions/index.types';
// export * from './src/api/server-commands/index.types';
// export * from './src/api/server-delegate/index.types';
// ------------ LIB TYPES Export ------------
__exportStar(require("./src/lib/entities/page/A_OS_Page.types"), exports);
__exportStar(require("./src/lib/entities/widget/A_OS_Widget.types"), exports);
var A_OS_Events_types_1 = require("./src/types/A_OS_Events.types");
Object.defineProperty(exports, "A_OS_TYPES__RequestEvent", { enumerable: true, get: function () { return A_OS_Events_types_1.A_OS_TYPES__RequestEvent; } });
Object.defineProperty(exports, "A_OS_TYPES__ResponseEvent", { enumerable: true, get: function () { return A_OS_Events_types_1.A_OS_TYPES__ResponseEvent; } });
//# sourceMappingURL=index.js.map