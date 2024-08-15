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
exports.A_OS_EventsConnection = void 0;
const a_sdk_types_1 = require("@adaas/a-sdk-types");
const A_OS_Events_types_1 = require("../types/A_OS_Events.types");
const errors_constants_1 = require("../constants/errors.constants");
class A_OS_EventsConnection {
    constructor(id, origin, context) {
        this.connected = false;
        this.handlers = new Map();
        this.iterations = [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ];
        this.DEFAULT_TIMEOUT = 5000;
        this.id = id;
        this.origin = origin;
        this.context = context;
    }
    /**
     * This method is used to connect to the channel
     *
     * It will try to connect to the channel with the provided iterations
     *
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connected || this.connectionPromise)
                return this.connectionPromise;
            this.connectionPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.context.Logger.log(`Attempt to connect ...`, ` - Origin: ${this.origin}`, ` - Element ID: ${this.id}`);
                if (window.origin === this.origin) {
                    this.context.Logger.warning(`Origin is the same as the current window`, `[!] Please ensure that there no recursive connections`);
                }
                if (window.origin !== this.context.getConfigurationProperty('OS_LOCATION')) {
                    this.context.Logger.warning(`Origin is not equal to the OS_LOCATION`, `The connection is child to the parent`, `[!] Connection initialization will be skipped`);
                    return resolve();
                }
                for (const iterator of this.iterations) {
                    if (this.connected)
                        return;
                    this.context.Logger.log(`${iterator} attempt to connect ...`);
                    try {
                        const iFrame = document.getElementById(this.id);
                        if (!iFrame) {
                            return this.context.Errors.throw(errors_constants_1.A_OS_CONSTANTS__ERROR_CODES.TARGET_IFRAME_NOT_FOUND);
                        }
                        this.iFrame = iFrame;
                        const channel = this.iFrame.contentWindow;
                        if (!channel) {
                            return this.context.Errors.throw(errors_constants_1.A_OS_CONSTANTS__ERROR_CODES.TARGET_IFRAME_NOT_CONNECTED);
                        }
                        this.channel = channel;
                        this.connected = !!(yield this.request({
                            event: {
                                request: A_OS_Events_types_1.A_OS_TYPES__RequestEvent.INIT,
                                response: A_OS_Events_types_1.A_OS_TYPES__ResponseEvent.READY
                            },
                            timeout: 200 * iterator
                        }));
                        if (this.connected) {
                            this.context.Logger.log(`Connection established`, `On attempt ${iterator}`, ` - Origin: ${this.origin}`, ` - Element ID: ${this.id}`);
                            return resolve();
                        }
                    }
                    catch (error) {
                        this.context.Logger.error(`Connection Attempt Failed ...`, 'Retrying ...', ` - Origin: ${this.origin}`, ` - Element ID: ${this.id}`);
                        yield a_sdk_types_1.A_SDK_CommonHelper.delay(200 * iterator);
                    }
                }
                return reject(this.context.Errors.getError(errors_constants_1.A_OS_CONSTANTS__ERROR_CODES.UNABLE_TO_CONNECT_TO_TARGET_IFRAME));
            }));
            this.init();
            return this.connectionPromise;
        });
    }
    /**
     * This method is used to initialize the default listeners
     * It attaches the listener to the window
     */
    init() {
        if (window.origin !== this.context.getConfigurationProperty('OS_LOCATION'))
            this.handlers.set(A_OS_Events_types_1.A_OS_TYPES__ResponseEvent.READY, (event) => {
                this.context.Logger.log(`[!] A-OS Connection Ready`);
                this.channel = event.source;
            });
        this.addListener(this.handle.bind(this));
    }
    request(request, callback) {
        const promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                this.post(request.event.request, request.data);
                const event = yield this.expect(request.event.response);
                return resolve(event);
            }
            catch (error) {
                return reject(error);
            }
        }));
        if (callback)
            promise.then(callback);
        else
            return promise;
    }
    handle(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (event.origin !== this.origin) {
                this.context.Logger.warning(`${event.origin} : Origin not allowed`);
                return;
            }
            if (!(event.data && event.data.message)) {
                this.context.Logger.warning(`Message not allowed ${event.data}`);
                return;
            }
            const targetHandler = this.handlers.get(event.data.message);
            if (targetHandler)
                targetHandler(event);
        });
    }
    /**
     * This method is used to send a post message to the channel
     *
     * @param action
     * @param data
     */
    post(action, data) {
        this.channel.postMessage({
            message: action,
            data
        }, this.origin);
    }
    /**
     * This method is used to subscribe to a specific event with Default Timeout
     *
     * Comparing to Subscribe method, this method is used to wait for a specific event
     * It creates a separated Listener for the message Event while subscribe use routing
     *
     * @param targetMessage
     * @returns
     */
    expect(targetMessage, timeout = this.DEFAULT_TIMEOUT) {
        return new Promise((resolve, reject) => {
            const fnWrapper = (event) => {
                const tm = setTimeout(() => {
                    this.removeListener(fnWrapper);
                    return reject(this.context.Errors.getError(errors_constants_1.A_OS_CONSTANTS__ERROR_CODES.UNABLE_TO_CONNECT_TO_TARGET_IFRAME_TIMEOUT));
                }, timeout);
                /**
                 * Check if the origin is the same
                 * If not - just ignore the message
                 */
                if (event.origin !== this.origin)
                    return;
                /**
                 * Check if the message is the target message
                 * If not - just ignore the message
                 */
                if (event.data.message === targetMessage) {
                    clearTimeout(tm);
                    this.removeListener(fnWrapper);
                    return resolve(event);
                }
            };
            this.addListener(fnWrapper);
        });
    }
    /**
     * This method is used to subscribe to a specific event with Default Timeout
     * So that the event is resolved or rejected after the timeout
     */
    subscribe(event, fn) {
        this.handlers.set(event, fn);
    }
    /**
     * This method is used to unsubscribe from a specific event
     *
     *
     * @param event
     * @param fn
     */
    unsubscribe(event) {
        this.handlers.delete(event);
    }
    addListener(handler) {
        window.addEventListener("message", handler, false);
    }
    removeListener(handler) {
        window.removeEventListener("message", handler, false);
    }
    /**
     * This method is used to destroy the listener
     */
    destroy() {
        const handlers = Array.from(this.handlers.keys());
        handlers.forEach((handler) => {
            this.handlers.delete(handler);
        });
        window.removeEventListener("message", this.handle, false);
    }
}
exports.A_OS_EventsConnection = A_OS_EventsConnection;
//# sourceMappingURL=A_OS_EventsConnection.class.js.map