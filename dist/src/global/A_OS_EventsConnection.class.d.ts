import { A_OS_ContextClass } from "./A_OS_Context.class";
import { A_OS_TYPES__EventRequest, A_OS_TYPES__RequestEvent, A_OS_TYPES__ResponseEvent } from "../types/A_OS_Events.types";
export declare class A_OS_EventsConnection {
    id: string;
    origin: string;
    private connected;
    private iFrame?;
    private channel;
    private connectionPromise;
    private handlers;
    private iterations;
    private DEFAULT_TIMEOUT;
    private context;
    constructor(id: string, origin: string, context: A_OS_ContextClass);
    /**
     * This method is used to connect to the channel
     *
     * It will try to connect to the channel with the provided iterations
     *
     */
    connect(): Promise<any>;
    /**
     * This method is used to initialize the default listeners
     * It attaches the listener to the window
     */
    private init;
    /**
     * Synchronous method to send a request to the channel
     *
     */
    request<T extends object>(request: A_OS_TYPES__EventRequest<T>): Promise<MessageEvent>;
    request<T extends object>(request: A_OS_TYPES__EventRequest<T>, callback: (data: MessageEvent) => any): void;
    private handle;
    /**
     * This method is used to send a post message to the channel
     *
     * @param action
     * @param data
     */
    post(action: A_OS_TYPES__RequestEvent, data: any): void;
    /**
     * This method is used to subscribe to a specific event with Default Timeout
     *
     * Comparing to Subscribe method, this method is used to wait for a specific event
     * It creates a separated Listener for the message Event while subscribe use routing
     *
     * @param targetMessage
     * @returns
     */
    expect(targetMessage: A_OS_TYPES__ResponseEvent, timeout?: number): Promise<MessageEvent>;
    /**
     * This method is used to subscribe to a specific event with Default Timeout
     * So that the event is resolved or rejected after the timeout
     */
    subscribe(event: A_OS_TYPES__ResponseEvent, fn: (event: MessageEvent) => void): void;
    /**
     * This method is used to unsubscribe from a specific event
     *
     *
     * @param event
     * @param fn
     */
    unsubscribe(event: A_OS_TYPES__ResponseEvent): void;
    private addListener;
    private removeListener;
    /**
     * This method is used to destroy the listener
     */
    destroy(): void;
}
