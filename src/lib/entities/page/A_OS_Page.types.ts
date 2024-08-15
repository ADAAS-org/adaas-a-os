import { A_SDK_TYPES__ExtractProperties } from "@adaas/a-sdk-types"
import { A_OS_Param } from "../params/A_OS_Param.class"
import { A_PRODUCTS_TYPES__PageSettings_APIEntity } from "@adaas/a-products"

export type A_OS_TYPES__PageConstructorParams = {
    /**
     * The unique identifier of the page within the application
     * 
     * For creation and migration purposes it can be any string
     */
    id: string

    /**
     * The page title
     */
    title: string


    /**
     * The path that will be used for routing withing the application
     */
    path: string


    /**
     * The page settings
     */
    settings?: Partial<A_SDK_TYPES__ExtractProperties<A_PRODUCTS_TYPES__PageSettings_APIEntity, ['display']>>
}

export type A_OS_TYPES__CustomPageConstructorParams = {


    /**
     * The custom page source
     * It should be a valid path to the umd module file
     * Based on the source, A-OS will generate integrity hash to validate the source
     */
    module: string

    /**
     * The custom page parameters (path, query, communication)
     */
    params?: Partial<{
        path: Array<A_OS_Param>
        query: Array<A_OS_Param>
        communication: Array<A_OS_Param>
    }>



} & A_OS_TYPES__PageConstructorParams

export type A_OS_TYPES__FramePageConstructorParams = {
    /**
     * The frame page URL
     */
    url: string

    /**
     * The frame page parameters (path, query, communication)
     */
    params?: Partial<{
        path: Array<A_OS_Param>
        query: Array<A_OS_Param>
        communication: Array<A_OS_Param>
    }>
} & A_OS_TYPES__PageConstructorParams