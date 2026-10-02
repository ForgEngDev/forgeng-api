import { type AudioProvider, type AudioProviderBackend, type AudioProviderDescriptor } from './AudioProviderContract';
export type AudioProviderContractErrorCode = 'invalid-descriptor' | 'invalid-provider-id' | 'incompatible-contract-version' | 'invalid-implementation-version' | 'invalid-capability' | 'duplicate-capability' | 'invalid-factory' | 'invalid-provider-instance' | 'invalid-backend';
export declare class AudioProviderContractError extends Error {
    readonly code: AudioProviderContractErrorCode;
    readonly path: string;
    constructor(code: AudioProviderContractErrorCode, path: string, message: string);
}
export declare function assertAudioProviderDescriptor(value: unknown): asserts value is AudioProviderDescriptor;
export declare function validateAudioProviderDescriptor(value: unknown): AudioProviderDescriptor;
export declare function assertAudioProviderBackend(value: unknown): asserts value is AudioProviderBackend;
export declare function assertAudioProvider(value: unknown): asserts value is AudioProvider;
export declare function validateAudioProvider(value: unknown): AudioProvider;
