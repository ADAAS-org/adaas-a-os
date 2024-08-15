import { A_OS_ContextClass } from "./A_OS_Context.class";
import { A_OS_EventsConnection } from "./A_OS_EventsConnection.class";
export declare class A_OS_Events {
    private context;
    private connections;
    constructor(context: A_OS_ContextClass);
    get root(): A_OS_EventsConnection | undefined;
    init(): Promise<void>;
    /**
     * This method should allow to connect for particular iFrame listener by provided origin and element id
     */
    connect(origin: string, elementId: string): Promise<A_OS_EventsConnection>;
}
