import { A_SDK_Polyfills } from "@adaas/a-sdk-types";
import { A_OS_TYPES__CustomWidgetConstructorParams, A_OS_TYPES__EntityWidgetConstructorParams, A_OS_TYPES__PageWidgetConstructorParams } from "./A_OS_Widget.types";
import { A_PRODUCTS_SERVER_COMMANDS_TYPES__WidgetCreateRequest } from "@adaas/a-products";

export class A_OS_Widget {

    id!: string;

    private params: A_OS_TYPES__CustomWidgetConstructorParams
        | A_OS_TYPES__PageWidgetConstructorParams
        | A_OS_TYPES__EntityWidgetConstructorParams;

    private hash?: string;

    constructor(params: A_OS_TYPES__CustomWidgetConstructorParams)
    constructor(params: A_OS_TYPES__PageWidgetConstructorParams)
    constructor(params: A_OS_TYPES__EntityWidgetConstructorParams)
    constructor(
        params: A_OS_TYPES__CustomWidgetConstructorParams
            | A_OS_TYPES__PageWidgetConstructorParams
            | A_OS_TYPES__EntityWidgetConstructorParams
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



    toJSON(): A_PRODUCTS_SERVER_COMMANDS_TYPES__WidgetCreateRequest {
        return {
            id: this.params.id,
            overline: this.params.overline,
            headline: this.params.headline,
            action: this.params.action,
            content: this.params.content,

            CustomWidget: 'module' in this.params ? {
                source: this.params.module,
                integrity_hash: this.hash!,
                parameters: {
                    query: this.params.params && this.params.params.query ? this.params.params.query.map(param => param.toJSON()) : [],
                    path: this.params.params && this.params.params.path ? this.params.params.path.map(param => param.toJSON()) : [],
                    communication: this.params.params && this.params.params.communication ? this.params.params.communication.map(param => param.toJSON()) : [],
                },
            } : undefined as any,

            PageWidget: 'page_id' in this.params
                ? {
                    page_id: this.params.page_id
                }
                : 'Page' in this.params
                    ? {
                        page_id: this.params.Page.id
                    }
                    : undefined as any,
            EntityWidget: 'entity' in this.params ? {

                list_page_id: 'list_page_id' in this.params
                    ? this.params.list_page_id :
                    'List' in this.params
                        ? this.params.List?.id : undefined,

                creation_page_id: 'creation_page_id' in this.params
                    ? this.params.creation_page_id :
                    'Create' in this.params
                        ? this.params.Create?.id : undefined,

            } : undefined as any,

            Settings: {
                display: this.params.settings?.display,
                background_identity: this.params.settings?.background_identity,
                image_identity: this.params.settings?.image_identity,
                background_color: this.params.settings?.background_color,
            }
        }
    }
}   