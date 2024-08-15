import { A_SDK_CommonHelper } from "@adaas/a-sdk-types";
import { A_OS_ContextClass } from "@adaas/a-sdk/global/A_OS_Context.class";
import { A_OS_TYPES__EventRequest, A_OS_TYPES__RequestEvent, A_OS_TYPES__ResponseEvent } from "../types/A_OS_Events.types";
import { A_OS_CONSTANTS__ERROR_CODES } from "../constants/errors.constants";

export class A_OS_EventsConnection {

    id: string;
    origin: string;

    private connected: boolean = false;

    private iFrame?: HTMLIFrameElement;

    private channel!: Window;

    private connectionPromise: Promise<any> | undefined;

    private handlers: Map<any, (event: MessageEvent) => void> = new Map();

    private iterations: Array<number> = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    ];
    private DEFAULT_TIMEOUT: number = 5000;


    private context: A_OS_ContextClass;

    constructor(
        id: string,
        origin: string,
        context: A_OS_ContextClass
    ) {
        this.id = id;
        this.origin = origin;
        this.context = context;
    }


    /**
     * This method is used to connect to the channel
     * 
     * It will try to connect to the channel with the provided iterations
     *
     */
    async connect() {

        if (this.connected || this.connectionPromise)
            return this.connectionPromise;

        this.connectionPromise = new Promise<void>(async (resolve, reject) => {
            this.context.Logger.log(
                `Attempt to connect ...`,
                ` - Origin: ${this.origin}`,
                ` - Element ID: ${this.id}`
            );

            if (window.origin === this.origin) {
                this.context.Logger.warning(
                    `Origin is the same as the current window`,
                    `[!] Please ensure that there no recursive connections`,
                );
            }

            if (window.origin !== this.context.getConfigurationProperty('OS_LOCATION')) {
                this.context.Logger.warning(
                    `Origin is not equal to the OS_LOCATION`,
                    `The connection is child to the parent`,
                    `[!] Connection initialization will be skipped`,
                );
                return resolve();
            }

            for (const iterator of this.iterations) {
                if (this.connected)
                    return;

                this.context.Logger.log(
                    `${iterator} attempt to connect ...`,
                );

                try {
                    const iFrame = document.getElementById(this.id);

                    if (!iFrame) {
                        return this.context.Errors.throw(A_OS_CONSTANTS__ERROR_CODES.TARGET_IFRAME_NOT_FOUND)
                    }

                    this.iFrame = iFrame as HTMLIFrameElement;

                    const channel = this.iFrame.contentWindow;

                    if (!channel) {
                        return this.context.Errors.throw(A_OS_CONSTANTS__ERROR_CODES.TARGET_IFRAME_NOT_CONNECTED)
                    }

                    this.channel = channel;

                    this.connected = !!await this.request({
                        event: {
                            request: A_OS_TYPES__RequestEvent.INIT,
                            response: A_OS_TYPES__ResponseEvent.READY
                        },
                        timeout: 200 * iterator
                    });

                    if (this.connected) {
                        this.context.Logger.log(
                            `Connection established`,
                            `On attempt ${iterator}`,
                            ` - Origin: ${this.origin}`,
                            ` - Element ID: ${this.id}`
                        );
                        return resolve();
                    }
                } catch (error) {

                    this.context.Logger.error(
                        `Connection Attempt Failed ...`,
                        'Retrying ...',
                        ` - Origin: ${this.origin}`,
                        ` - Element ID: ${this.id}`
                    )

                    await A_SDK_CommonHelper.delay(200 * iterator)
                }
            }

            return reject(this.context.Errors.getError(A_OS_CONSTANTS__ERROR_CODES.UNABLE_TO_CONNECT_TO_TARGET_IFRAME));
        });

        this.init();

        return this.connectionPromise;
    }


    /**
     * This method is used to initialize the default listeners
     * It attaches the listener to the window
     */
    private init() {

        if (window.origin !== this.context.getConfigurationProperty('OS_LOCATION'))
            this.handlers.set(A_OS_TYPES__ResponseEvent.READY, (event) => {
                this.context.Logger.log(
                    `[!] A-OS Connection Ready`,
                );
                this.channel = event.source as Window;
            });

        this.addListener(this.handle.bind(this));
    }


    /**
     * Synchronous method to send a request to the channel
     * 
     */
    request<T extends object>(request: A_OS_TYPES__EventRequest<T>): Promise<MessageEvent>
    request<T extends object>(request: A_OS_TYPES__EventRequest<T>, callback: (data: MessageEvent) => any): void
    request<T extends object>(request: A_OS_TYPES__EventRequest<T>, callback?: (event: MessageEvent) => any): Promise<MessageEvent> | void {

        const promise = new Promise<MessageEvent>(async (resolve, reject) => {
            try {
                this.post(
                    request.event.request,
                    request.data
                );

                const event = await this.expect(request.event.response)

                return resolve(event);

            } catch (error) {
                return reject(error);
            }
        });

        if (callback)
            promise.then(callback);
        else
            return promise;
    }


    private async handle(
        event: MessageEvent
    ) {
        if (event.origin !== this.origin) {
            this.context.Logger.warning(`${event.origin} : Origin not allowed`)
            return;
        }

        if (!(event.data && event.data.message)) {
            this.context.Logger.warning(`Message not allowed ${event.data}`)
            return;
        }

        const targetHandler = this.handlers.get(event.data.message);

        if (targetHandler)
            targetHandler(event);
    }


    /**
     * This method is used to send a post message to the channel
     * 
     * @param action 
     * @param data 
     */
    post(
        action: A_OS_TYPES__RequestEvent,
        data: any
    ) {
        this.channel.postMessage({
            message: action,
            data
        }, this.origin);
    }


    /**
     * This method is used to subscribe to a specific event with Default Timeout
     * 
     * Comparing to Subscribe method, this method is used to wait for a specific event
     * It creates a separated Listener for the message Event while subscribe use routing
     * 
     * @param targetMessage 
     * @returns 
     */
    expect(
        targetMessage: A_OS_TYPES__ResponseEvent,
        timeout: number = this.DEFAULT_TIMEOUT
    ): Promise<MessageEvent> {
        return new Promise<MessageEvent>((resolve, reject) => {
            const fnWrapper = (event: MessageEvent) => {

                const tm = setTimeout(() => {
                    this.removeListener(fnWrapper);

                    return reject(this.context.Errors.getError(A_OS_CONSTANTS__ERROR_CODES.UNABLE_TO_CONNECT_TO_TARGET_IFRAME_TIMEOUT));
                }, timeout);

                /**
                 * Check if the origin is the same
                 * If not - just ignore the message
                 */
                if (event.origin !== this.origin) return;

                /**
                 * Check if the message is the target message
                 * If not - just ignore the message
                 */
                if (event.data.message === targetMessage) {
                    clearTimeout(tm);

                    this.removeListener(fnWrapper);

                    return resolve(event);
                }
            };

            this.addListener(fnWrapper);
        });
    }



    /**
     * This method is used to subscribe to a specific event with Default Timeout
     * So that the event is resolved or rejected after the timeout
     */
    subscribe(
        event: A_OS_TYPES__ResponseEvent,
        fn: (event: MessageEvent) => void
    ) {
        this.handlers.set(event, fn);
    }

    /**
     * This method is used to unsubscribe from a specific event
     * 
     * 
     * @param event 
     * @param fn 
     */
    unsubscribe(
        event: A_OS_TYPES__ResponseEvent,
    ) {
        this.handlers.delete(event);
    }


    private addListener(
        handler: (event: MessageEvent) => void
    ) {
        window.addEventListener(
            "message",
            handler,
            false
        );
    }

    private removeListener(
        handler: (event: MessageEvent) => void
    ) {
        window.removeEventListener(
            "message",
            handler,
            false
        );
    }


    /**
     * This method is used to destroy the listener
     */
    destroy() {
        const handlers = Array.from(this.handlers.keys());

        handlers.forEach((handler) => {
            this.handlers.delete(handler);
        });


        window.removeEventListener(
            "message",
            this.handle,
            false
        );
    }
}