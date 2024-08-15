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
exports.A_OS_Widget = void 0;
const a_sdk_types_1 = require("@adaas/a-sdk-types");
class A_OS_Widget {
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
        var _a, _b, _c, _d, _e, _f;
        return {
            id: this.params.id,
            overline: this.params.overline,
            headline: this.params.headline,
            action: this.params.action,
            content: this.params.content,
            CustomWidget: 'module' in this.params ? {
                source: this.params.module,
                integrity_hash: this.hash,
                parameters: {
                    query: this.params.params && this.params.params.query ? this.params.params.query.map(param => param.toJSON()) : [],
                    path: this.params.params && this.params.params.path ? this.params.params.path.map(param => param.toJSON()) : [],
                    communication: this.params.params && this.params.params.communication ? this.params.params.communication.map(param => param.toJSON()) : [],
                },
            } : undefined,
            PageWidget: 'page_id' in this.params
                ? {
                    page_id: this.params.page_id
                }
                : 'Page' in this.params
                    ? {
                        page_id: this.params.Page.id
                    }
                    : undefined,
            EntityWidget: 'entity' in this.params ? {
                list_page_id: 'list_page_id' in this.params
                    ? this.params.list_page_id :
                    'List' in this.params
                        ? (_a = this.params.List) === null || _a === void 0 ? void 0 : _a.id : undefined,
                creation_page_id: 'creation_page_id' in this.params
                    ? this.params.creation_page_id :
                    'Create' in this.params
                        ? (_b = this.params.Create) === null || _b === void 0 ? void 0 : _b.id : undefined,
            } : undefined,
            Settings: {
                display: (_c = this.params.settings) === null || _c === void 0 ? void 0 : _c.display,
                background_identity: (_d = this.params.settings) === null || _d === void 0 ? void 0 : _d.background_identity,
                image_identity: (_e = this.params.settings) === null || _e === void 0 ? void 0 : _e.image_identity,
                background_color: (_f = this.params.settings) === null || _f === void 0 ? void 0 : _f.background_color,
            }
        };
    }
}
exports.A_OS_Widget = A_OS_Widget;
//# sourceMappingURL=A_OS_Widget.class.js.map