import { A_OS_TYPES__CustomPageConstructorParams, A_OS_TYPES__FramePageConstructorParams } from "./A_OS_Page.types";
import { A_PRODUCTS_SERVER_COMMANDS_TYPES__PageCreateRequest } from "@adaas/a-products";
export declare class A_OS_Page {
    id: string;
    private params;
    private hash?;
    constructor(params: A_OS_TYPES__CustomPageConstructorParams);
    constructor(params: A_OS_TYPES__FramePageConstructorParams);
    compile(): Promise<void>;
    toJSON(): A_PRODUCTS_SERVER_COMMANDS_TYPES__PageCreateRequest;
}
