import { type RendererBackendContract, type RendererProviderContract } from './RendererProviderContract';
export type RendererProviderContractErrorCode = 'invalid-provider' | 'invalid-provider-id' | 'incompatible-api-version' | 'invalid-mode' | 'invalid-probe' | 'invalid-factory' | 'invalid-backend' | 'invalid-lifecycle-state';
export declare class RendererProviderContractError extends Error {
    readonly code: RendererProviderContractErrorCode;
    readonly path: string;
    constructor(code: RendererProviderContractErrorCode, path: string, message: string);
}
export declare function assertRendererProviderContract(value: unknown): asserts value is RendererProviderContract;
export declare function validateRendererProviderContract(value: unknown): RendererProviderContract;
export declare function assertRendererBackendContract(value: unknown): asserts value is RendererBackendContract;
export declare function validateRendererBackendContract(value: unknown): RendererBackendContract;
