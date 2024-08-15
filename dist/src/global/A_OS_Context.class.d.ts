import { A_SDK_TYPES__DeepPartial } from "@adaas/a-sdk-types";
import { A_AUTH_TYPES__IAuthenticator, A_AUTH_ContextClass } from "@adaas/a-auth";
import { A_OS_TYPES__ContextConfigurations } from "../types/A_OS_Context.types";
import { A_OS_Events } from "./A_OS_Events.class";
/**
 * Global Context for a-os sdk
 */
export declare class A_OS_ContextClass extends A_AUTH_ContextClass {
    /**
     * Global AUTH Context for the SDKs
     */
    auth: A_AUTH_ContextClass;
    Events: A_OS_Events;
    protected OS_LOCATION: string;
    protected productsContextAllowedProperties: readonly ["CONFIG_SDK_VALIDATION", "CONFIG_VERBOSE", "CONFIG_IGNORE_ERRORS", "SSO_LOCATION", "ENABLE_AUTH", "OS_LOCATION"];
    constructor();
    init(): Promise<void>;
    getConfigurationProperty<T = any>(property: typeof this.productsContextAllowedProperties[number]): T;
    /**
     *  Configure the A_OS_Context with provided configurations
     *
     * @param config
     */
    configure(config: A_SDK_TYPES__DeepPartial<A_OS_TYPES__ContextConfigurations>): void;
    getAuthenticator(userASEID?: string | undefined, userScope?: string): A_AUTH_TYPES__IAuthenticator;
    protected loadExtendedConfigurationsFromEnvironment(): Promise<void>;
    protected loadExtendedConfigurationsFromFile<T = any>(config: T): Promise<void>;
}
export declare const A_OS_Context: A_OS_ContextClass;
