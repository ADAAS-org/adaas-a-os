import { A_SDK_CONSTANTS__ERROR_CODES, A_SDK_TYPES__DeepPartial, A_SDK_TYPES__Required } from "@adaas/a-sdk-types";
import { A_OS_CONSTANTS__DEFAULT_ERRORS } from "../constants/errors.constants";
import { A_AUTH_TYPES__IAuthenticator, A_AUTH_Context, A_AUTH_ContextClass } from "@adaas/a-auth";
import { A_OS_TYPES__ContextConfigurations } from "../types/A_OS_Context.types";
import { A_OS_Events } from "./A_OS_Events.class";

/**
 * Global Context for a-os sdk
 */
export class A_OS_ContextClass extends A_AUTH_ContextClass {

    /**
     * Global AUTH Context for the SDKs
     */
    auth: A_AUTH_ContextClass = A_AUTH_Context

    Events: A_OS_Events = new A_OS_Events(this);


    protected OS_LOCATION: string = 'https://os.adaas.org';


    protected productsContextAllowedProperties = [
        ...this.authContextAllowedProperties,
        "OS_LOCATION"
    ] as const;


    constructor() {
        super({
            namespace: 'a-os',
            errors: A_OS_CONSTANTS__DEFAULT_ERRORS
        });
    }


    async init(): Promise<void> {
        if (!this.ready)
            this.ready = new Promise(async (resolve, reject) => {
                try {
                    await super.init();
                    await this.Events.init();
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        else
            await this.ready;
    }


    getConfigurationProperty<T = any>(
        property: typeof this.productsContextAllowedProperties[number]
    ): T {
        if (this.productsContextAllowedProperties.includes(property as any))
            return this[property as string] as T;
        else
            this.Errors.throw(A_SDK_CONSTANTS__ERROR_CODES.CONFIGURATION_PROPERTY_NOT_EXISTS_OR_NOT_ALLOWED_TO_READ);
    }


    /**
     *  Configure the A_OS_Context with provided configurations
     * 
     * @param config 
     */
    configure(config: A_SDK_TYPES__DeepPartial<A_OS_TYPES__ContextConfigurations>) {

        this.Logger.log('Configuring A_OS_Context with provided configurations', config);

        this.OS_LOCATION = config.os?.location || this.OS_LOCATION;

        super.configure(config);

        this.auth.configure(config);
    }


    getAuthenticator(userASEID?: string | undefined, userScope?: string): A_AUTH_TYPES__IAuthenticator {
        /**
         * In case when the CLIENT_ID and CLIENT_SECRET provided 
         * And their ENV NAMES comes from the ENV CORRESPONDING to the Context NAMESPACE    
         * 
         */
        if (this.CLIENT_ID && this.CLIENT_SECRET)
            return super.getAuthenticator(userASEID, userScope);
        /**
         * Otherwise Use the fallback to the A_AUTH Context
         */
        else
            return this.auth.getAuthenticator(userASEID, userScope);
    }


    protected async loadExtendedConfigurationsFromEnvironment(): Promise<void> {
        this.OS_LOCATION = process.env[this.getConfigurationProperty_ENV_Alias('OS_LOCATION')] || this.OS_LOCATION;
    }

    protected async loadExtendedConfigurationsFromFile<T = any>(config: T): Promise<void> {
        this.OS_LOCATION = config[this.getConfigurationProperty_File_Alias('OS_LOCATION')] || this.OS_LOCATION;
    }
}


export const A_OS_Context = new A_OS_ContextClass()