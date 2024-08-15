"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_OS_Events = void 0;
const A_OS_EventsConnection_class_1 = require("./A_OS_EventsConnection.class");
const errors_constants_1 = require("../constants/errors.constants");
class A_OS_Events {
    constructor(context) {
        this.connections = new Map();
        this.context = context;
    }
    get root() {
        return this.connections.get('root');
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.context.environment === 'server') {
                this.context.Logger.warning(`Connection creation is not allowed in server environment`, ' - Initialization of the Events module skipped');
                return;
            }
            if (this.context.getConfigurationProperty('OS_LOCATION') !== window.origin) {
                const rootConnection = new A_OS_EventsConnection_class_1.A_OS_EventsConnection('root', this.context.getConfigurationProperty('OS_LOCATION'), this.context);
                yield rootConnection.connect();
                this.connections.set('root', rootConnection);
            }
        });
    }
    /**
     * This method should allow to connect for particular iFrame listener by provided origin and element id
     */
    connect(origin, elementId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.context.environment === 'server') {
                return this.context.Errors.throw(errors_constants_1.A_OS_CONSTANTS__ERROR_CODES.CONNECTION_CREATION_NOT_ALLOWED_IN_SERVER_ENVIRONMENT);
            }
            const connection = new A_OS_EventsConnection_class_1.A_OS_EventsConnection(elementId, origin, this.context);
            yield connection.connect();
            this.connections.set(origin, connection);
            return connection;
        });
    }
}
exports.A_OS_Events = A_OS_Events;
//# sourceMappingURL=A_OS_Events.class.js.map