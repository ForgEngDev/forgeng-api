import { type InputProvider, type InputProviderDescriptor, type InputSnapshot } from './InputProviderContract';
export type InputProviderContractErrorCode = 'invalid-descriptor' | 'invalid-provider-id' | 'incompatible-contract-version' | 'invalid-implementation-version' | 'invalid-capability' | 'duplicate-capability' | 'invalid-factory' | 'invalid-provider-instance' | 'invalid-snapshot';
export declare class InputProviderContractError extends Error {
    readonly code: InputProviderContractErrorCode;
    readonly path: string;
    constructor(code: InputProviderContractErrorCode, path: string, message: string);
}
export declare function assertInputProviderDescriptor(value: unknown): asserts value is InputProviderDescriptor;
export declare function validateInputProviderDescriptor(value: unknown): InputProviderDescriptor;
export declare function assertInputProvider(value: unknown): asserts value is InputProvider;
export declare function validateInputProvider(value: unknown): InputProvider;
export declare function assertInputSnapshot(value: unknown): asserts value is InputSnapshot;
export declare function validateInputSnapshot(value: unknown): InputSnapshot;
