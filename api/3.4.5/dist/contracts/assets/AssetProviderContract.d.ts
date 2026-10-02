import type { AssetDefinition, AssetId, AssetJsonObject, AssetKind, AssetSourceDescriptor } from './AssetManifestContract';
export declare const ASSET_CAPABILITY_IDS: Readonly<{
    readonly sourceRangeReads: 'source.range-reads';
    readonly sourceIntegrity: 'source.integrity';
    readonly decoderDependencies: 'decoder.dependencies';
    readonly realizerRecovery: 'realizer.recovery';
}>;
export type AssetCapabilityId = string & {};
export type AssetProviderLogMetadata = Readonly<Record<string, unknown>>;
export interface AssetProviderLogContext {
    readonly metadata?: AssetProviderLogMetadata;
    readonly error?: unknown;
}
export interface AssetProviderLogger {
    trace(message: string, context?: AssetProviderLogContext): void;
    debug(message: string, context?: AssetProviderLogContext): void;
    info(message: string, context?: AssetProviderLogContext): void;
    warn(message: string, context?: AssetProviderLogContext): void;
    error(message: string, context?: AssetProviderLogContext): void;
    fatal(message: string, context?: AssetProviderLogContext): void;
    child(category: string, metadata?: AssetProviderLogMetadata): AssetProviderLogger;
}
export interface AssetCapability {
    readonly id: AssetCapabilityId;
    readonly version: string;
}
export interface AssetProgressReporter {
    report(progress: AssetProgressUpdate): void;
}
export interface AssetAbortEvent {
    readonly type: 'abort';
}
export type AssetAbortListener = (event: AssetAbortEvent) => void;
export interface AssetCancellationSignal {
    readonly aborted: boolean;
    readonly reason?: unknown;
    addEventListener(type: 'abort', listener: AssetAbortListener, options?: {
        readonly once?: boolean;
    }): void;
    removeEventListener(type: 'abort', listener: AssetAbortListener): void;
}
export interface AssetProviderContext {
    readonly logger: AssetProviderLogger;
    readonly signal: AssetCancellationSignal;
    readonly progress: AssetProgressReporter;
}
export interface AssetSourceResolveRequest {
    readonly assetId: AssetId;
    readonly source: AssetSourceDescriptor;
    readonly parent?: AssetSourceDescriptor;
    readonly signal: AssetCancellationSignal;
}
export interface AssetResolvedSource {
    readonly uri: string;
    readonly contentType?: string;
    readonly integrity?: string;
    readonly expectedBytes?: number;
    readonly metadata?: AssetJsonObject;
}
export interface AssetSourceReadRange {
    readonly offset: number;
    readonly length: number;
}
export interface AssetSourceReadRequest {
    readonly assetId: AssetId;
    readonly source: AssetResolvedSource;
    readonly range?: AssetSourceReadRange;
    readonly signal: AssetCancellationSignal;
}
export interface AssetSourceResult {
    readonly source: AssetResolvedSource;
    readonly bytes: Uint8Array;
    readonly contentType?: string;
    readonly etag?: string;
    readonly integrity?: string;
}
export interface AssetSourceProvider {
    initialize(context: AssetProviderContext): Promise<void>;
    resolve(request: AssetSourceResolveRequest): AssetResolvedSource | Promise<AssetResolvedSource>;
    read(request: AssetSourceReadRequest): Promise<AssetSourceResult>;
    destroy(): Promise<void>;
}
export interface AssetDecodeContext {
    readonly logger: AssetProviderLogger;
    readonly signal: AssetCancellationSignal;
    readonly progress: AssetProgressReporter;
    read(source: AssetSourceDescriptor, signal: AssetCancellationSignal): Promise<AssetSourceResult>;
}
export interface AssetDecodeRequest {
    readonly asset: AssetDefinition;
    readonly source: AssetSourceResult;
    readonly dependencies: Readonly<Record<AssetId, unknown>>;
    readonly signal: AssetCancellationSignal;
}
export interface AssetDecodedValue<TValue = unknown> {
    readonly value: TValue;
    readonly byteLength?: number;
    readonly dependencies?: readonly AssetSourceDescriptor[];
    readonly dispose?: () => void | Promise<void>;
}
export interface AssetDecoder<TValue = unknown> {
    initialize(context: AssetDecodeContext): Promise<void>;
    decode(request: AssetDecodeRequest): Promise<AssetDecodedValue<TValue>>;
    destroy(): Promise<void>;
}
export interface AssetRealizerContext {
    readonly logger: AssetProviderLogger;
    readonly signal: AssetCancellationSignal;
    readonly progress: AssetProgressReporter;
}
export interface AssetRealizeRequest<TDecoded = unknown> {
    readonly asset: AssetDefinition;
    readonly decoded: TDecoded;
    readonly dependencies: Readonly<Record<AssetId, unknown>>;
    readonly generation: number;
    readonly signal: AssetCancellationSignal;
}
export interface AssetRealizedInspection {
    readonly category: string;
    readonly logicalBytes: number;
    readonly allocatedBytes: number;
    readonly format?: string;
    readonly colorSpace?: string;
    readonly alphaMode?: string;
    readonly mipLevels?: number;
    readonly dependencyIds?: readonly AssetId[];
}
export interface AssetRealizedValue<TValue = unknown> {
    readonly value: TValue;
    readonly byteLength?: number;
    readonly generation: number;
    /** Immutable, handle-free metadata exposed by Asset Pipeline inspection. */
    readonly inspection?: AssetRealizedInspection;
    readonly dispose?: () => void | Promise<void>;
}
export interface AssetRealizer<TDecoded = unknown, TValue = unknown> {
    initialize(context: AssetRealizerContext): Promise<void>;
    realize(request: AssetRealizeRequest<TDecoded>): Promise<AssetRealizedValue<TValue>>;
    destroy(): Promise<void>;
}
export interface AssetSourceProviderDescriptor<TOptions = unknown> {
    readonly id: string;
    readonly contractVersion: '1.0.0';
    readonly implementationVersion: string;
    readonly capabilities: readonly AssetCapability[];
    create(options?: TOptions): AssetSourceProvider;
}
export interface AssetDecoderDescriptor<TOptions = unknown, TValue = unknown> {
    readonly id: string;
    readonly contractVersion: '1.0.0';
    readonly implementationVersion: string;
    readonly capabilities: readonly AssetCapability[];
    readonly kinds: readonly AssetKind[];
    create(options?: TOptions): AssetDecoder<TValue>;
}
export interface AssetRealizerDescriptor<TOptions = unknown, TDecoded = unknown, TValue = unknown> {
    readonly id: string;
    readonly contractVersion: '1.0.0';
    readonly implementationVersion: string;
    readonly capabilities: readonly AssetCapability[];
    readonly kinds: readonly AssetKind[];
    create(options?: TOptions): AssetRealizer<TDecoded, TValue>;
}
export type AssetPipelinePhase = 'queued' | 'resolving' | 'fetching' | 'decoding' | 'realizing' | 'committing' | 'ready' | 'releasing' | 'evicting' | 'failed' | 'cancelled';
export interface AssetProgressUpdate {
    readonly operationId: string;
    readonly assetId: AssetId;
    readonly phase: AssetPipelinePhase;
    readonly loadedBytes?: number;
    readonly totalBytes?: number;
    readonly ratio?: number;
    readonly message?: string;
    readonly timestampMs: number;
}
