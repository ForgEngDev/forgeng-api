import { type StorageBytes, type StorageProvider, type StorageProviderContext, type StorageProviderDescriptor } from './StorageProviderContract';
export type StorageProviderContractErrorCode = 'invalid-descriptor' | 'invalid-provider-id' | 'incompatible-contract-version' | 'invalid-implementation-version' | 'invalid-capability' | 'duplicate-capability' | 'invalid-factory' | 'invalid-provider-instance' | 'invalid-config' | 'invalid-namespace' | 'invalid-key' | 'invalid-value';
export declare class StorageProviderContractError extends Error {
    readonly code: StorageProviderContractErrorCode;
    readonly path: string;
    constructor(code: StorageProviderContractErrorCode, path: string, message: string);
}
export declare function assertStorageProviderDescriptor(value: unknown): asserts value is StorageProviderDescriptor;
export declare function validateStorageProviderDescriptor(value: unknown): StorageProviderDescriptor;
export declare function assertStorageProvider(value: unknown): asserts value is StorageProvider;
export declare function validateStorageProvider(value: unknown): StorageProvider;
export declare function assertStorageProviderContext(value: unknown): asserts value is StorageProviderContext;
export declare function validateStorageProviderContext(value: unknown): StorageProviderContext;
export declare function validateStorageNamespace(value: unknown): string;
export declare function joinStorageNamespace(applicationNamespace: unknown, childNamespace: unknown): string;
export declare function validateStorageKey(value: unknown): string;
export declare function validateStorageBytes(value: unknown): StorageBytes;
export declare function cloneStorageBytes(value: unknown): StorageBytes;
