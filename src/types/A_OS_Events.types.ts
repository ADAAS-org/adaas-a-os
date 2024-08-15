export enum A_OS_TYPES__RequestEvent {
    INIT = 'INIT',
}

export enum A_OS_TYPES__ResponseEvent {
    READY = 'READY',
}


export type A_OS_TYPES__EventRequest<T extends any = any> = {
    event: {
        request: A_OS_TYPES__RequestEvent,
        response: A_OS_TYPES__ResponseEvent
    },
    data?: T,
    timeout?: number
}