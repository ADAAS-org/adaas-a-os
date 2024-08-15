"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A_OS_Param = void 0;
class A_OS_Param {
    constructor(name, type, required) {
        this._required = false;
        this._name = name;
        this._type = type;
        if (required) {
            this._required = required;
        }
    }
    toJSON() {
        return {
            name: this._name,
            type: this._type,
            required: this._required
        };
    }
}
exports.A_OS_Param = A_OS_Param;
//# sourceMappingURL=A_OS_Param.class.js.map