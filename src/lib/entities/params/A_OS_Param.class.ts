import { A_PRODUCTS_TYPES__PageParameter } from "@adaas/a-products";


export class A_OS_Param {

    private _name: string;
    private _type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    private _required: boolean = false;

    constructor(
        name: string,
        type: 'string' | 'number' | 'boolean' | 'object' | 'array',
        required?: boolean,
    ) {

        this._name = name;
        this._type = type;
        if (required) {
            this._required = required;
        }
    }


    toJSON(): A_PRODUCTS_TYPES__PageParameter {
        return {
            name: this._name,
            type: this._type,
            required: this._required
        }
    }
}