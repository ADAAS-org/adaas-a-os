import { A_OS_TYPES__CustomWidgetConstructorParams, A_OS_TYPES__EntityWidgetConstructorParams, A_OS_TYPES__PageWidgetConstructorParams } from "./A_OS_Widget.types";
import { A_PRODUCTS_SERVER_COMMANDS_TYPES__WidgetCreateRequest } from "@adaas/a-products";
export declare class A_OS_Widget {
    id: string;
    private params;
    private hash?;
    constructor(params: A_OS_TYPES__CustomWidgetConstructorParams);
    constructor(params: A_OS_TYPES__PageWidgetConstructorParams);
    constructor(params: A_OS_TYPES__EntityWidgetConstructorParams);
    compile(): Promise<void>;
    toJSON(): A_PRODUCTS_SERVER_COMMANDS_TYPES__WidgetCreateRequest;
}
