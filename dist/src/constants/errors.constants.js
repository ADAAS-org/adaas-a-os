"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_OS_CONSTANTS__DEFAULT_ERRORS = exports.A_OS_CONSTANTS__ERROR_CODES = void 0;
var A_OS_CONSTANTS__ERROR_CODES;
(function (A_OS_CONSTANTS__ERROR_CODES) {
    // UNABLE_TO_REFRESH_TOKEN = 'ERR-401-0001',
    A_OS_CONSTANTS__ERROR_CODES["CONNECTION_CREATION_NOT_ALLOWED_IN_SERVER_ENVIRONMENT"] = "ERR-500-0001";
    A_OS_CONSTANTS__ERROR_CODES["TARGET_IFRAME_NOT_FOUND"] = "ERR-500-0002";
    A_OS_CONSTANTS__ERROR_CODES["TARGET_IFRAME_NOT_CONNECTED"] = "ERR-500-0003";
    A_OS_CONSTANTS__ERROR_CODES["UNABLE_TO_CONNECT_TO_TARGET_IFRAME"] = "ERR-500-0004";
    A_OS_CONSTANTS__ERROR_CODES["UNABLE_TO_CONNECT_TO_TARGET_IFRAME_TIMEOUT"] = "ERR-500-0005";
})(A_OS_CONSTANTS__ERROR_CODES || (exports.A_OS_CONSTANTS__ERROR_CODES = A_OS_CONSTANTS__ERROR_CODES = {}));
;
exports.A_OS_CONSTANTS__DEFAULT_ERRORS = {
    CONNECTION_CREATION_NOT_ALLOWED_IN_SERVER_ENVIRONMENT: {
        serverCode: 500,
        code: A_OS_CONSTANTS__ERROR_CODES.CONNECTION_CREATION_NOT_ALLOWED_IN_SERVER_ENVIRONMENT,
        description: 'Connection creation not allowed in server environment',
        message: 'Connection creation not allowed in server environment'
    },
    TARGET_IFRAME_NOT_FOUND: {
        serverCode: 500,
        code: A_OS_CONSTANTS__ERROR_CODES.TARGET_IFRAME_NOT_FOUND,
        description: 'Target iframe not found',
        message: 'Target iframe not found'
    },
    TARGET_IFRAME_NOT_CONNECTED: {
        serverCode: 500,
        code: A_OS_CONSTANTS__ERROR_CODES.TARGET_IFRAME_NOT_CONNECTED,
        description: 'Target iframe not connected',
        message: 'Target iframe not connected'
    },
    UNABLE_TO_CONNECT_TO_TARGET_IFRAME: {
        serverCode: 500,
        code: A_OS_CONSTANTS__ERROR_CODES.UNABLE_TO_CONNECT_TO_TARGET_IFRAME,
        description: 'Unable to connect to target iframe',
        message: 'Unable to connect to target iframe'
    },
    UNABLE_TO_CONNECT_TO_TARGET_IFRAME_TIMEOUT: {
        serverCode: 500,
        code: A_OS_CONSTANTS__ERROR_CODES.UNABLE_TO_CONNECT_TO_TARGET_IFRAME_TIMEOUT,
        description: 'Unable to connect to target iframe (timeout)',
        message: 'Unable to connect to target iframe (timeout)'
    },
    // UNABLE_TO_REFRESH_TOKEN: {
    //     serverCode: 401,
    //     code: A_OS_CONSTANTS__ERROR_CODES.UNABLE_TO_REFRESH_TOKEN,
    //     description: 'Unable to refresh token',
    //     message: 'Unable to refresh token'
    // },
};
//# sourceMappingURL=errors.constants.js.map