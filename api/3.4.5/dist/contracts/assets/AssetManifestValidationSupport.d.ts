import type { AssetId, AssetJsonObject, AssetKind, AssetLoadPolicy, AssetSourceDescriptor } from './AssetManifestContract';
import type { AssetContractLimits } from './AssetRuntimeContract';
export type AssetContractErrorCode = 'manifest-invalid' | 'unknown-field' | 'invalid-version' | 'invalid-namespace' | 'invalid-id' | 'invalid-kind' | 'invalid-source' | 'invalid-policy' | 'invalid-json' | 'duplicate-asset' | 'duplicate-group' | 'duplicate-value' | 'missing-dependency' | 'missing-group-asset' | 'dependency-cycle' | 'invalid-limits' | 'limit-exceeded';
export declare class AssetContractError extends Error {
    readonly code: AssetContractErrorCode;
    readonly path: string;
    constructor(code: AssetContractErrorCode, path: string, message: string);
}
export declare function fail(code: AssetContractErrorCode, path: string, message: string): never;
export declare function assertPlainRecord(value: unknown, path: string, code: AssetContractErrorCode): asserts value is Record<string, unknown>;
export declare function assertKnownKeys(value: Record<string, unknown>, allowed: readonly string[], path: string): void;
export declare function assertText(value: unknown, path: string, code: AssetContractErrorCode): asserts value is string;
export declare function assertLocalId(value: string, path: string): void;
export declare function assertNamespace(value: unknown, path: string): asserts value is string;
export declare function assertKind(value: unknown, path: string): asserts value is AssetKind;
export declare function canonicalAssetId(namespace: string, value: string, path: string): AssetId;
export declare function cloneJsonObject(value: unknown, path: string): AssetJsonObject;
export declare function normalizeUniqueStrings(value: unknown, path: string, validate: (item: string, itemPath: string) => string): readonly string[];
export declare function normalizeAssetSource(value: unknown, path: string, limits: AssetContractLimits): AssetSourceDescriptor;
export declare function normalizeAssetPolicy(value: unknown, path: string): AssetLoadPolicy;
