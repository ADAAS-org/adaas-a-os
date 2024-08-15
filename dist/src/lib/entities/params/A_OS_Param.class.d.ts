import { A_PRODUCTS_TYPES__PageParameter } from "@adaas/a-products";
export declare class A_OS_Param {
    private _name;
    private _type;
    private _required;
    constructor(name: string, type: 'string' | 'number' | 'boolean' | 'object' | 'array', required?: boolean);
    toJSON(): A_PRODUCTS_TYPES__PageParameter;
}
