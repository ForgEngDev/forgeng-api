import { type PhysicsProviderCapabilityNegotiation, type PhysicsProviderCapabilityRequirement, type PhysicsProviderDescriptor, type PhysicsProvider } from './PhysicsProviderContract';
export type PhysicsProviderContractErrorCode = 'invalid-descriptor' | 'invalid-provider-id' | 'incompatible-contract-version' | 'invalid-implementation-version' | 'invalid-capability' | 'duplicate-capability' | 'invalid-factory' | 'invalid-provider-instance' | 'invalid-shape' | 'invalid-body' | 'invalid-scene' | 'invalid-scene-scope' | 'invalid-requirement';
export declare class PhysicsProviderContractError extends Error {
    readonly code: PhysicsProviderContractErrorCode;
    readonly path: string;
    constructor(code: PhysicsProviderContractErrorCode, path: string, message: string);
}
export declare function assertPhysicsProviderDescriptor(value: unknown): asserts value is PhysicsProviderDescriptor;
export declare function validatePhysicsProviderDescriptor(value: unknown): PhysicsProviderDescriptor;
export declare function assertPhysicsProvider(value: unknown): asserts value is PhysicsProvider;
export declare function validatePhysicsProvider(value: unknown): PhysicsProvider;
export declare function negotiatePhysicsProviderCapabilities(descriptorValue: unknown, requirements: readonly PhysicsProviderCapabilityRequirement[]): PhysicsProviderCapabilityNegotiation;
