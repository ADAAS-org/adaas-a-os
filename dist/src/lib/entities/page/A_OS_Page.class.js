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
exports.A_OS_Page = void 0;
const a_sdk_types_1 = require("@adaas/a-sdk-types");
class A_OS_Page {
    constructor(params) {
        this.params = params;
        this.id = params.id;
    }
    compile() {
        return __awaiter(this, void 0, void 0, function* () {
            if ('module' in this.params) {
                const crypto = yield a_sdk_types_1.A_SDK_Polyfills.crypto();
                this.hash = yield crypto.createFileHash(this.params.module, 'sha384');
            }
        });
    }
    toJSON() {
        var _a;
        return {
            id: this.params.id,
            title: this.params.title,
            path: this.params.path,
            parameters: {
                query: this.params.params && this.params.params.query ? this.params.params.query.map(param => param.toJSON()) : [],
                path: this.params.params && this.params.params.path ? this.params.params.path.map(param => param.toJSON()) : [],
                communication: this.params.params && this.params.params.communication ? this.params.params.communication.map(param => param.toJSON()) : [],
            },
            CustomPage: 'module' in this.params ? {
                source: this.params.module,
                integrity_hash: this.hash,
            } : undefined,
            FramePage: 'url' in this.params ? {
                url: this.params.url
            } : undefined,
            Settings: {
                display: (_a = this.params.settings) === null || _a === void 0 ? void 0 : _a.display
            }
        };
    }
}
exports.A_OS_Page = A_OS_Page;
//# sourceMappingURL=A_OS_Page.class.js.map