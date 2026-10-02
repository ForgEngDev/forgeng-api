export declare const TRANSPORT_PROVIDER_CONTRACT_VERSION: '1.0.0';
export declare const TRANSPORT_PROVIDER_CAPABILITY_IDS: Readonly<{
    readonly reliableDelivery: 'reliable-delivery';
    readonly unreliableDelivery: 'unreliable-delivery';
    readonly orderedDelivery: 'ordered-delivery';
    readonly unorderedDelivery: 'unordered-delivery';
}>;
export declare const TRANSPORT_CONNECTION_STATES: readonly [
    "idle",
    "connecting",
    "open",
    "closing",
    "closed",
    "failed"
];
export declare const TRANSPORT_CLOSE_REASON_MAX_BYTES = 123;
export type TransportProviderContractVersion = typeof TRANSPORT_PROVIDER_CONTRACT_VERSION;
export type TransportProviderCapabilityId = string & {};
export type TransportConnectionState = typeof TRANSPORT_CONNECTION_STATES[number];
export type TransportReliability = 'reliable' | 'unreliable';
export type TransportOrdering = 'ordered' | 'unordered';
export type TransportBytes = Uint8Array;
export type TransportLogMetadata = Readonly<Record<string, unknown>>;
export interface TransportDelivery {
    readonly reliability: TransportReliability;
    readonly ordering: TransportOrdering;
}
export interface TransportProviderCapability {
    readonly id: TransportProviderCapabilityId;
    readonly version: string;
}
export interface TransportProviderLimits {
    /** Maximum accepted payload size before provider framing. */
    readonly maxMessageBytes: number;
    /** Maximum combined provider-queued and backend-buffered payload bytes. */
    readonly maxQueuedBytes: number;
    readonly maxQueuedMessages?: number;
}
export interface TransportBackpressureSnapshot extends TransportProviderLimits {
    readonly queuedBytes: number;
    readonly queuedMessages: number;
    readonly backendBufferedBytes: number;
    readonly saturated: boolean;
}
export interface TransportOperationOptions {
    readonly signal?: AbortSignal;
}
export interface TransportSendOptions extends TransportOperationOptions {
    /** Omitted means the provider's documented default delivery class. */
    readonly delivery?: TransportDelivery;
}
export interface TransportCloseOptions extends TransportOperationOptions {
    readonly code?: number;
    /** Public diagnostic text only. Credentials, endpoint queries and payloads are forbidden. */
    readonly reason?: string;
}
export interface TransportCloseInfo {
    readonly code?: number;
    readonly reason?: string;
    readonly wasClean: boolean;
}
export interface TransportMessage {
    /** Fresh snapshot owned by the receiver. */
    readonly payload: TransportBytes;
    readonly delivery: TransportDelivery;
}
export interface TransportStateChange {
    readonly previous: TransportConnectionState;
    readonly current: TransportConnectionState;
    readonly close?: TransportCloseInfo;
}
export interface TransportSubscription {
    readonly closed: boolean;
    /** Idempotent; after unsubscribe no later event may reach the handler. */
    unsubscribe(): void;
}
export interface TransportProviderLogContext {
    readonly metadata?: TransportLogMetadata;
    readonly error?: unknown;
}
export interface TransportProviderLogger {
    trace(message: string, context?: TransportProviderLogContext): void;
    debug(message: string, context?: TransportProviderLogContext): void;
    info(message: string, context?: TransportProviderLogContext): void;
    warn(message: string, context?: TransportProviderLogContext): void;
    error(message: string, context?: TransportProviderLogContext): void;
    fatal(message: string, context?: TransportProviderLogContext): void;
    child(category: string, metadata?: TransportLogMetadata): TransportProviderLogger;
}
export interface TransportProviderContext {
    readonly logger: TransportProviderLogger;
    /** Aborting the owner signal permanently cancels this provider instance. */
    readonly signal: AbortSignal;
}
export interface TransportProvider {
    readonly limits: TransportProviderLimits;
    getState(): TransportConnectionState;
    getBackpressure(): TransportBackpressureSnapshot;
    initialize(context: TransportProviderContext): Promise<void>;
    connect(options?: TransportOperationOptions): Promise<void>;
    /** Resolves only after the provider accepts the snapshotted payload into its bounded send path. */
    send(payload: TransportBytes, options?: TransportSendOptions): Promise<void>;
    close(options?: TransportCloseOptions): Promise<void>;
    onMessage(handler: (message: TransportMessage) => void): TransportSubscription;
    onStateChange(handler: (change: TransportStateChange) => void): TransportSubscription;
    /** Retained, idempotent cleanup. Pending non-committed work must settle before it resolves. */
    destroy(): Promise<void>;
}
export interface TransportProviderFactory<TOptions = unknown> {
    create(options?: TOptions): TransportProvider;
}
export interface TransportProviderDescriptor<TOptions = unknown> extends TransportProviderFactory<TOptions> {
    readonly id: string;
    readonly contractVersion: TransportProviderContractVersion;
    readonly implementationVersion: string;
    readonly capabilities: readonly TransportProviderCapability[];
}
export type TransportOperation = 'initialize' | 'connect' | 'send' | 'close' | 'destroy';
export type TransportProviderErrorCode = 'unsupported-capability' | 'unavailable' | 'connect-failed' | 'connect-timeout' | 'access-denied' | 'backpressure-overflow' | 'message-too-large' | 'aborted' | 'not-open' | 'provider-destroyed' | 'protocol-error' | 'backend-failure';
/** Provider/backend failure. Message and cause must not contain payloads or secret endpoint data. */
export declare class TransportProviderError extends Error {
    readonly code: TransportProviderErrorCode;
    readonly operation: TransportOperation;
    readonly cause?: unknown;
    constructor(code: TransportProviderErrorCode, operation: TransportOperation, message: string, cause?: unknown);
}
