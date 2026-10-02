export declare const ASSET_CONTRACT_VERSION: '1.0.0';
export declare const ASSET_MANIFEST_VERSION: 1;
export type AssetContractVersion = typeof ASSET_CONTRACT_VERSION;
export type AssetManifestVersion = typeof ASSET_MANIFEST_VERSION;
export type AssetId = string & {};
export type AssetLocalId = string & {};
export type AssetNamespace = string & {};
export type AssetKind = string & {};
export type AssetGroupId = string & {};
export type AssetJsonPrimitive = string | number | boolean | null;
export type AssetJsonValue = AssetJsonPrimitive | AssetJsonObject | readonly AssetJsonValue[];
export interface AssetJsonObject {
    readonly [key: string]: AssetJsonValue;
}
export type AssetCachePolicy = 'release-when-unused' | 'retain' | 'pinned';
export type AssetPreloadPolicy = 'none' | 'boot';
export interface AssetLoadPolicyInput {
    readonly cache?: AssetCachePolicy;
    readonly preload?: AssetPreloadPolicy;
    readonly priority?: number;
}
export interface AssetLoadPolicy {
    readonly cache: AssetCachePolicy;
    readonly preload: AssetPreloadPolicy;
    readonly priority: number;
}
export interface AssetSourceDescriptorInput {
    readonly uri: string;
    readonly contentType?: string;
    readonly integrity?: string;
    readonly expectedBytes?: number;
    readonly metadata?: AssetJsonObject;
}
export interface AssetSourceDescriptor {
    readonly uri: string;
    readonly contentType?: string;
    readonly integrity?: string;
    readonly expectedBytes?: number;
    readonly metadata?: AssetJsonObject;
}
export interface AssetDefinitionInput {
    readonly kind: AssetKind;
    readonly source: AssetSourceDescriptorInput;
    readonly dependencies?: readonly string[];
    readonly tags?: readonly string[];
    readonly label?: string;
    readonly options?: AssetJsonObject;
    readonly policy?: AssetLoadPolicyInput;
    readonly metadata?: AssetJsonObject;
}
export interface AssetManifestInput {
    readonly version: AssetManifestVersion;
    readonly namespace: AssetNamespace;
    readonly assets: Readonly<Record<string, AssetDefinitionInput>>;
    readonly groups?: Readonly<Record<string, readonly string[]>>;
    readonly metadata?: AssetJsonObject;
}
export interface AssetDefinition {
    readonly id: AssetId;
    readonly localId: AssetLocalId;
    readonly kind: AssetKind;
    readonly source: AssetSourceDescriptor;
    readonly dependencies: readonly AssetId[];
    readonly tags: readonly string[];
    readonly label?: string;
    readonly options?: AssetJsonObject;
    readonly policy: AssetLoadPolicy;
    readonly metadata?: AssetJsonObject;
}
export interface AssetGroup {
    readonly id: AssetGroupId;
    readonly localId: AssetLocalId;
    readonly assets: readonly AssetId[];
}
export interface AssetManifest {
    readonly version: AssetManifestVersion;
    readonly namespace: AssetNamespace;
    readonly assets: readonly AssetDefinition[];
    readonly groups: readonly AssetGroup[];
    readonly metadata?: AssetJsonObject;
}
export interface AssetManifestBundle {
    readonly manifests: readonly AssetManifest[];
    readonly assets: readonly AssetDefinition[];
    readonly groups: readonly AssetGroup[];
}
declare const ASSET_REFERENCE_VALUE: unique symbol;
export interface AssetReference<TValue = unknown, TKind extends AssetKind = AssetKind> {
    readonly id: AssetId;
    readonly kind: TKind;
    readonly [ASSET_REFERENCE_VALUE]?: TValue;
}
export {};
