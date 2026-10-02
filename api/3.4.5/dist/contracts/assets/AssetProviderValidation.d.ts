import type { AssetDecoder, AssetDecoderDescriptor, AssetRealizer, AssetRealizerDescriptor, AssetSourceProvider, AssetSourceProviderDescriptor } from './AssetProviderContract';
export type AssetProviderContractErrorCode = 'invalid-descriptor' | 'unknown-field' | 'invalid-provider-id' | 'incompatible-contract-version' | 'invalid-implementation-version' | 'invalid-capability' | 'duplicate-capability' | 'invalid-kind' | 'duplicate-kind' | 'invalid-factory' | 'invalid-provider-instance' | 'invalid-decoder-instance' | 'invalid-realizer-instance';
export declare class AssetProviderContractError extends Error {
    readonly code: AssetProviderContractErrorCode;
    readonly path: string;
    constructor(code: AssetProviderContractErrorCode, path: string, message: string);
}
export declare function validateAssetSourceProviderDescriptor(value: unknown): AssetSourceProviderDescriptor;
export declare function validateAssetDecoderDescriptor(value: unknown): AssetDecoderDescriptor;
export declare function validateAssetRealizerDescriptor(value: unknown): AssetRealizerDescriptor;
export declare function validateAssetSourceProvider(value: unknown): AssetSourceProvider;
export declare function validateAssetDecoder(value: unknown): AssetDecoder;
export declare function validateAssetRealizer(value: unknown): AssetRealizer;
