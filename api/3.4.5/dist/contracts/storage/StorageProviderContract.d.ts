export declare const STORAGE_PROVIDER_CONTRACT_VERSION: '1.0.0';
export declare const STORAGE_CONCURRENCY_MODEL: 'key-fifo-with-namespace-clear-barrier-v1';
export declare const STORAGE_PROVIDER_CAPABILITY_IDS: Readonly<{
    readonly persistent: 'persistent';
    readonly boundedValueSize: 'bounded-value-size';
}>;
export declare const STORAGE_NAMESPACE_MAX_LENGTH = 255;
export declare const STORAGE_NAMESPACE_MAX_SEGMENTS = 8;
export declare const STORAGE_NAMESPACE_SEGMENT_MAX_LENGTH = 63;
export declare const STORAGE_KEY_MAX_LENGTH = 128;
export type StorageProviderContractVersion = typeof STORAGE_PROVIDER_CONTRACT_VERSION;
export type StorageProviderCapabilityId = string & {};
export type StorageProviderLogMetadata = Readonly<Record<string, unknown>>;
export type StorageBytes = Uint8Array;
export interface StorageProviderLogContext {
    readonly metadata?: StorageProviderLogMetadata;
    readonly error?: unknown;
}
export interface StorageProviderLogger {
    trace(message: string, context?: StorageProviderLogContext): void;
    debug(message: string, context?: StorageProviderLogContext): void;
    info(message: string, context?: StorageProviderLogContext): void;
    warn(message: string, context?: StorageProviderLogContext): void;
    error(message: string, context?: StorageProviderLogContext): void;
    fatal(message: string, context?: StorageProviderLogContext): void;
    child(category: string, metadata?: StorageProviderLogMetadata): StorageProviderLogger;
}
export interface StorageProviderCapability {
    readonly id: StorageProviderCapabilityId;
    readonly version: string;
}
export interface StorageProviderLimits {
    /** Omitted when the backend cannot state a deterministic byte ceiling. */
    readonly maxValueBytes?: number;
}
export interface StorageOperationOptions {
    /** Abort before the commit point rejects without a side effect. */
    readonly signal?: AbortSignal;
}
/**
 * A provider-owned child namespace. Returned byte arrays must be fresh copies,
 * and providers must snapshot set() input before the asynchronous commit.
 *
 * Operations for the same key are observed in invocation order. clear() is a
 * namespace-wide barrier: it follows every earlier operation in this area and
 * precedes every later operation. Different keys may otherwise run in parallel.
 */
export interface StorageArea {
    /** Fully-qualified application/child namespace used by this area. */
    readonly namespace: string;
    /** Returns null only when the key is absent; backend failures reject. */
    get(key: string, options?: StorageOperationOptions): Promise<StorageBytes | null>;
    /** Atomically replaces one value; partial writes must never report success. */
    set(key: string, value: StorageBytes, options?: StorageOperationOptions): Promise<void>;
    /** Returns false only when the key was already absent. */
    remove(key: string, options?: StorageOperationOptions): Promise<boolean>;
    /** Clears only this fully-qualified namespace and acts as the documented barrier. */
    clear(options?: StorageOperationOptions): Promise<void>;
}
export interface StorageProviderContext {
    /** Stable, explicit application identity. Providers must not invent a global default. */
    readonly applicationNamespace: string;
    readonly logger: StorageProviderLogger;
    readonly signal: AbortSignal;
}
export interface StorageProvider {
    readonly limits?: StorageProviderLimits;
    initialize(context: StorageProviderContext): Promise<void>;
    /** Opens a validated child namespace without performing backend I/O. */
    openNamespace(childNamespace: string): StorageArea;
    /**
     * Idempotent retained cleanup. Work that has not crossed its commit point is
     * aborted and settled before destroy resolves; committed work may complete.
     * New work and use-after-destroy fail with provider-destroyed.
     */
    destroy(): Promise<void>;
}
export interface StorageProviderFactory<TOptions = unknown> {
    create(options?: TOptions): StorageProvider;
}
export interface StorageProviderDescriptor<TOptions = unknown> extends StorageProviderFactory<TOptions> {
    readonly id: string;
    readonly contractVersion: StorageProviderContractVersion;
    readonly implementationVersion: string;
    readonly capabilities: readonly StorageProviderCapability[];
}
export type StorageOperation = 'initialize' | 'open-namespace' | 'get' | 'set' | 'remove' | 'clear' | 'destroy';
export type StorageProviderErrorCode = 'unavailable' | 'access-denied' | 'quota-exceeded' | 'corrupt-data' | 'unsupported-data' | 'value-too-large' | 'aborted' | 'provider-destroyed' | 'backend-failure';
/** Runtime/backend failure. It intentionally carries no stored payload. */
export declare class StorageProviderError extends Error {
    readonly code: StorageProviderErrorCode;
    readonly operation: StorageOperation;
    readonly cause?: unknown;
    constructor(code: StorageProviderErrorCode, operation: StorageOperation, message: string, cause?: unknown);
}
