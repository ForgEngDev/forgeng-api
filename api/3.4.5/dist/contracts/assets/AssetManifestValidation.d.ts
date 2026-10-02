import { type AssetId, type AssetKind, type AssetManifest, type AssetManifestBundle, type AssetManifestInput, type AssetReference } from './AssetManifestContract';
import { type AssetContractLimits } from './AssetRuntimeContract';
export { AssetContractError, type AssetContractErrorCode } from './AssetManifestValidationSupport';
export declare function normalizeAssetContractLimits(input?: Partial<AssetContractLimits>): AssetContractLimits;
export declare function normalizeAssetManifests(inputs: readonly AssetManifestInput[], limitsInput?: Partial<AssetContractLimits>): AssetManifestBundle;
export declare function normalizeAssetManifest(input: AssetManifestInput, limits?: Partial<AssetContractLimits>): AssetManifest;
export declare const defineAssetManifest: typeof normalizeAssetManifest;
export declare function createAssetReference<TValue = unknown, TKind extends AssetKind = AssetKind>(id: AssetId, kind: TKind): AssetReference<TValue, TKind>;
