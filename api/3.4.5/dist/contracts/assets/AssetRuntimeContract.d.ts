import type { AssetDefinition, AssetGroup, AssetGroupId, AssetId, AssetKind, AssetReference } from './AssetManifestContract';
import type { AssetCancellationSignal, AssetPipelinePhase, AssetProgressUpdate } from './AssetProviderContract';
export declare const DEFAULT_ASSET_CONTRACT_LIMITS: AssetContractLimits;
export interface AssetContractLimits {
    readonly maxManifests: number;
    readonly maxAssets: number;
    readonly maxGroups: number;
    readonly maxDependenciesPerAsset: number;
    readonly maxDependencyDepth: number;
    readonly maxSourceBytes: number;
    readonly maxConcurrentReads: number;
    readonly maxConcurrentDecodes: number;
    readonly maxConcurrentRealizations: number;
}
export type AssetRuntimeState = 'registered' | 'queued' | 'loading' | 'ready' | 'failed' | 'released' | 'evicted';
export interface AssetStateSnapshot {
    readonly id: AssetId;
    readonly kind: AssetKind;
    readonly state: AssetRuntimeState;
    readonly phase?: AssetPipelinePhase;
    readonly consumers: number;
    readonly sourceBytes: number;
    readonly decodedBytes: number;
    readonly realizedBytes: number;
    readonly generation: number;
    readonly errorCode?: AssetPipelineErrorCode;
}
export interface AssetCatalogSnapshot {
    readonly revision: number;
    readonly assets: readonly AssetStateSnapshot[];
    readonly sourceBytes: number;
    readonly decodedBytes: number;
    readonly realizedBytes: number;
}
export interface AssetCatalogInspectionSnapshot {
    readonly assets: readonly AssetDefinition[];
    readonly groups: readonly AssetGroup[];
    readonly topologicalOrder: readonly AssetId[];
}
type AssetResourceOwner = 'assets-core.source-cache' | 'assets-core.decoded-cache' | 'assets-core.realized-cache';
interface AssetResourceSnapshot {
    readonly resources: number;
    readonly trackedBytes: number;
}
interface AssetResourceAccountingSnapshot {
    readonly semantics: 'tracked-estimate';
    readonly byOwner: Readonly<Record<AssetResourceOwner, AssetResourceSnapshot>>;
    readonly resources: number;
    readonly trackedBytes: number;
}
type AssetRuntimeCounter = 'started' | 'ready' | 'failed' | 'cancelled' | 'cacheHits' | 'inflightJoins';
interface AssetPhaseTimingSnapshot {
    readonly samples: number;
    readonly totalMs: number;
    readonly maximumMs: number;
}
interface AssetRuntimeMetricsSnapshot {
    readonly counters: Readonly<Record<AssetRuntimeCounter, number>>;
    readonly phaseTimings: Readonly<Partial<Record<AssetPipelinePhase, AssetPhaseTimingSnapshot>>>;
    readonly resources: AssetResourceAccountingSnapshot;
}
export interface AssetFormatDiagnosticEntry {
    readonly id: string;
    readonly implementationVersion: string;
    readonly kinds: readonly AssetKind[];
    readonly active: boolean;
    readonly operations: number;
    readonly totalMs: number;
    readonly maximumMs: number;
}
export interface AssetCodecDiagnosticEntry {
    readonly id: string;
    readonly implementationVersion: string;
    readonly active: boolean;
    readonly operations: number;
    readonly totalMs: number;
    readonly maximumMs: number;
    readonly workerQueueDepthHighWater: number;
    readonly failures: number;
}
export interface AssetFormatFailureDiagnostic {
    readonly code: string;
    readonly stage: 'decode' | 'transcode' | 'realize' | 'worker' | 'lifecycle';
    readonly formatId?: string;
    readonly codecId?: string;
}
export interface AssetFormatDiagnosticsSnapshot {
    readonly formats: readonly AssetFormatDiagnosticEntry[];
    readonly codecs: readonly AssetCodecDiagnosticEntry[];
    readonly progress: {
        readonly registered: number;
        readonly active: number;
        readonly ready: number;
        readonly failed: number;
        readonly cancelled: number;
    };
    readonly bytes: {
        readonly source: number;
        readonly decoded: number;
        readonly realized: number;
    };
    readonly selectedTextureTarget: string | null;
    readonly selectedTextureTargets: readonly string[];
    /** Newest-first and bounded by the runtime implementation. */
    readonly failures: readonly AssetFormatFailureDiagnostic[];
}
export interface AssetRuntimeInspectionSnapshot {
    readonly catalog: AssetCatalogInspectionSnapshot;
    readonly runtime: AssetCatalogSnapshot;
    readonly metrics: AssetRuntimeMetricsSnapshot;
    readonly formatDiagnostics?: AssetFormatDiagnosticsSnapshot;
    readonly realized2d?: AssetRealized2dInspectionSnapshot;
}
export interface AssetRealized2dInspectionEntry {
    readonly assetId: AssetId;
    readonly kind: AssetKind;
    readonly generation: number;
    readonly category: string;
    readonly logicalBytes: number;
    readonly allocatedBytes: number;
    readonly format?: string;
    readonly colorSpace?: string;
    readonly alphaMode?: string;
    readonly mipLevels?: number;
    readonly dependencyIds: readonly AssetId[];
}
export interface AssetRealized2dInspectionSnapshot {
    readonly values: readonly AssetRealized2dInspectionEntry[];
    readonly logicalBytes: number;
    readonly allocatedBytes: number;
}
export interface AssetAcquireOptions {
    readonly signal?: AssetCancellationSignal;
}
export interface AssetLease<TValue = unknown> {
    readonly id: AssetId;
    readonly kind: AssetKind;
    readonly released: boolean;
    readonly value: TValue;
    release(): Promise<void>;
}
export interface AssetRuntimeClient {
    acquire<TValue>(reference: AssetReference<TValue> | AssetId, options?: AssetAcquireOptions): Promise<AssetLease<TValue>>;
    preload(group: AssetGroupId | string, options?: AssetAcquireOptions): Promise<void>;
    subscribeProgress(listener: (update: AssetProgressUpdate) => void): {
        readonly disposed: boolean;
        dispose(): void;
    };
    snapshot(): AssetCatalogSnapshot;
    inspect?(): AssetRuntimeInspectionSnapshot;
}
export type AssetPipelineErrorCode = 'aborted' | 'manifest-invalid' | 'duplicate-asset' | 'missing-dependency' | 'dependency-cycle' | 'unsupported-kind' | 'provider-unavailable' | 'source-not-found' | 'source-access-denied' | 'source-too-large' | 'source-read-failed' | 'integrity-failed' | 'mime-mismatch' | 'decode-failed' | 'realize-failed' | 'dependency-failed' | 'limit-exceeded' | 'invalid-state' | 'lease-released' | 'scope-destroyed' | 'provider-destroyed' | 'pipeline-destroyed' | 'backend-failure';
export interface AssetPipelineErrorOptions {
    readonly operation: string;
    readonly phase: AssetPipelinePhase;
    readonly assetId?: AssetId;
    readonly cause?: unknown;
}
export declare class AssetPipelineError extends Error {
    readonly code: AssetPipelineErrorCode;
    readonly operation: string;
    readonly phase: AssetPipelinePhase;
    readonly assetId?: AssetId;
    readonly cause?: unknown;
    constructor(code: AssetPipelineErrorCode, message: string, options: AssetPipelineErrorOptions);
}
export {};
