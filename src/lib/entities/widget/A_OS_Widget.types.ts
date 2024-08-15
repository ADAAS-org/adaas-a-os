import { A_SDK_TYPES__DeepPartial, A_SDK_TYPES__ExtractProperties } from "@adaas/a-sdk-types"
import { A_OS_Param } from "../params/A_OS_Param.class"
import { A_PRODUCTS_TYPES__WidgetSettings_APIEntity } from "@adaas/a-products"
import { A_OS_Page } from "../page/A_OS_Page.class"

export type A_OS_TYPES__WidgetConstructorParams = {
    /**
     * The unique identifier of the widget within the application
     * 
     * For creation and migration purposes it can be any string
     */
    id: string

    /**
     * The widget overline
     */
    overline: string

    /**
     * The widget headline
     */
    headline: string

    /**
     * The widget action
     */
    action: string

    /**
     * The widget content
     */
    content: string

    /**
     * The widget settings
     */
    settings?: A_SDK_TYPES__DeepPartial<A_PRODUCTS_TYPES__WidgetSettings_APIEntity>
}

export type A_OS_TYPES__CustomWidgetConstructorParams = {


    /**
     * The custom widget source
     * It should be a valid path to the umd module file
     * Based on the source, A-OS will generate integrity hash to validate the source
     */
    module: string

    /**
     * The custom widget parameters (path, query, communication)
     */
    params?: Partial<{
        path: Array<A_OS_Param>
        query: Array<A_OS_Param>
        communication: Array<A_OS_Param>
    }>



} & A_OS_TYPES__WidgetConstructorParams

export type A_OS_TYPES__PageWidgetConstructorParams = (
    {
        /**
         * The frame widget URL
         */
        page_id?: string
    } | {
        /**
         * The entity widget entity
         */
        Page: A_OS_Page
    }
) & {

    /**
     * The frame widget parameters (path, query, communication)
     */
    params?: Partial<{
        path: Array<A_OS_Param>
        query: Array<A_OS_Param>
        communication: Array<A_OS_Param>
    }>
} & A_OS_TYPES__WidgetConstructorParams




export type A_OS_TYPES__EntityWidgetConstructorParams = {

    entity: string

    list_page_id?: string
    creation_page_id?: string

    List?: A_OS_Page
    Create?: A_OS_Page

    /**
     * The frame widget parameters (path, query, communication)
     */
    params?: Partial<{
        path: Array<A_OS_Param>
        query: Array<A_OS_Param>
        communication: Array<A_OS_Param>
    }>
} & A_OS_TYPES__WidgetConstructorParams