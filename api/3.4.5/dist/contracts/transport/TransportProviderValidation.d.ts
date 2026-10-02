import { type TransportBackpressureSnapshot, type TransportBytes, type TransportCloseOptions, type TransportConnectionState, type TransportDelivery, type TransportProvider, type TransportProviderContext, type TransportProviderDescriptor, type TransportProviderLimits, type TransportSubscription } from './TransportProviderContract';
export type TransportProviderContractErrorCode = 'invalid-descriptor' | 'invalid-provider-id' | 'incompatible-contract-version' | 'invalid-implementation-version' | 'invalid-capability' | 'duplicate-capability' | 'invalid-factory' | 'invalid-provider-instance' | 'invalid-config' | 'invalid-state' | 'illegal-state-transition' | 'invalid-limits' | 'invalid-backpressure' | 'invalid-payload' | 'invalid-close' | 'invalid-subscription';
export declare class TransportProviderContractError extends Error {
    readonly code: TransportProviderContractErrorCode;
    readonly path: string;
    constructor(code: TransportProviderContractErrorCode, path: string, message: string);
}
export declare function validateTransportCapabilityId(value: unknown): string;
export declare function assertTransportProviderDescriptor(value: unknown): asserts value is TransportProviderDescriptor;
export declare function validateTransportProviderDescriptor(value: unknown): TransportProviderDescriptor;
export declare function transportProviderHasCapability(descriptor: unknown, capabilityId: unknown): boolean;
export declare function requireTransportProviderCapability(descriptor: unknown, capabilityId: unknown, operation?: 'connect' | 'send'): void;
export declare function validateTransportConnectionState(value: unknown): TransportConnectionState;
export declare function validateTransportStateTransition(from: unknown, to: unknown): TransportConnectionState;
export declare function validateTransportDelivery(value: unknown): TransportDelivery;
export declare function validateTransportProviderLimits(value: unknown): TransportProviderLimits;
export declare function validateTransportBackpressureSnapshot(value: unknown): TransportBackpressureSnapshot;
export declare function cloneTransportBytes(value: unknown, maximumBytes?: number): TransportBytes;
export declare function validateTransportCloseOptions(value: unknown): TransportCloseOptions;
export declare function assertTransportProviderContext(value: unknown): asserts value is TransportProviderContext;
export declare function validateTransportProviderContext(value: unknown): TransportProviderContext;
export declare function assertTransportSubscription(value: unknown): asserts value is TransportSubscription;
export declare function validateTransportSubscription(value: unknown): TransportSubscription;
export declare function assertTransportProvider(value: unknown): asserts value is TransportProvider;
export declare function validateTransportProvider(value: unknown): TransportProvider;
