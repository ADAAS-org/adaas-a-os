import { A_SDK_Polyfills } from "@adaas/a-sdk-types";
import { A_OS_TYPES__CustomPageConstructorParams, A_OS_TYPES__FramePageConstructorParams } from "./A_OS_Page.types";
import { A_PRODUCTS_SERVER_COMMANDS_TYPES__PageCreateRequest } from "@adaas/a-products";

export class A_OS_Page {

    id!: string;

    private params: A_OS_TYPES__CustomPageConstructorParams | A_OS_TYPES__FramePageConstructorParams;

    private hash?: string;

    constructor(params: A_OS_TYPES__CustomPageConstructorParams)
    constructor(params: A_OS_TYPES__FramePageConstructorParams)
    constructor(
        params: A_OS_TYPES__CustomPageConstructorParams | A_OS_TYPES__FramePageConstructorParams
    ) {
        this.params = params;

        this.id = params.id;
    }


    async compile() {
        if ('module' in this.params) {
            const crypto = await A_SDK_Polyfills.crypto();
            this.hash = await crypto.createFileHash(this.params.module, 'sha384');
        }
    }



    toJSON(): A_PRODUCTS_SERVER_COMMANDS_TYPES__PageCreateRequest {
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
                integrity_hash: this.hash!,
            } : undefined as any,
            FramePage: 'url' in this.params ? {
                url: this.params.url
            } : undefined as any,
            Settings: {
                display: this.params.settings?.display
            }
        }
    }
}   