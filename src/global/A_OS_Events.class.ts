import { A_OS_ContextClass } from "@adaas/a-sdk/global/A_OS_Context.class";
import { A_OS_TYPES__RequestEvent, A_OS_TYPES__ResponseEvent } from "../types/A_OS_Events.types";
import { A_SDK_CommonHelper } from "@adaas/a-sdk-types";
import { A_OS_EventsConnection } from "./A_OS_EventsConnection.class";
import { A_OS_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";


export class A_OS_Events {

    private context: A_OS_ContextClass;

    private connections: Map<string, A_OS_EventsConnection> = new Map();

    constructor(
        context: A_OS_ContextClass,

    ) {
        this.context = context;
    }


    get root() {
        return this.connections.get('root');
    }


    async init() {
        if (this.context.environment === 'server') {
            this.context.Logger.warning(
                `Connection creation is not allowed in server environment`,
                ' - Initialization of the Events module skipped'
            );
            return;
        }

        if (this.context.getConfigurationProperty('OS_LOCATION') !== window.origin) {
            const rootConnection = new A_OS_EventsConnection('root', this.context.getConfigurationProperty('OS_LOCATION'), this.context);
            await rootConnection.connect();

            this.connections.set('root', rootConnection);
        }
    }

    /**
     * This method should allow to connect for particular iFrame listener by provided origin and element id 
     */
    async connect(
        origin: string,
        elementId: string
    ): Promise<A_OS_EventsConnection> {
        if (this.context.environment === 'server') {
            return this.context.Errors.throw(A_OS_CONSTANTS__ERROR_CODES.CONNECTION_CREATION_NOT_ALLOWED_IN_SERVER_ENVIRONMENT);
        }

        const connection = new A_OS_EventsConnection(elementId, origin, this.context);

        await connection.connect();

        this.connections.set(origin, connection);

        return connection;
    }

}
