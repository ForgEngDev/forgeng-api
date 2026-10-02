import { type NetworkAuthoritativeSnapshotEnvelope, type NetworkInputEnvelope, type NetworkJsonObject, type NetworkSimulationEnvelope } from 'forgeng/contracts/network';
export type NetworkTransportAdapterRole = 'client' | 'authority';
export type NetworkTransportAdapterErrorCode = 'NETWORK_TRANSPORT_ADAPTER_INVALID_CONFIGURATION' | 'NETWORK_TRANSPORT_ADAPTER_INVALID_ENVELOPE' | 'NETWORK_TRANSPORT_ADAPTER_LIFECYCLE_INVALID';
export declare class NetworkTransportAdapterError extends Error {
    readonly code: NetworkTransportAdapterErrorCode;
    readonly operation: 'create' | 'send' | 'subscribe' | 'inspect';
    constructor(code: NetworkTransportAdapterErrorCode, operation: 'create' | 'send' | 'subscribe' | 'inspect', message: string);
}
export interface NetworkTransportAdapterMessage {
    readonly payload: Uint8Array;
}
export interface NetworkTransportAdapterSubscription {
    readonly closed: boolean;
    unsubscribe(): void;
}
/** Minimal structural boundary implemented by ForgeNG transport handles and providers. */
export interface NetworkTransportAdapterPort {
    send(payload: Uint8Array): Promise<void>;
    onMessage(handler: (message: NetworkTransportAdapterMessage) => void): NetworkTransportAdapterSubscription;
}
export interface NetworkTransportAdapterOptions {
    readonly role: NetworkTransportAdapterRole;
    readonly sessionId: string;
    readonly transport: NetworkTransportAdapterPort;
}
export interface NetworkTransportAdapterDiagnostics {
    readonly lifecycle: 'active' | 'destroyed';
    readonly role: NetworkTransportAdapterRole;
    readonly sessionId: string;
    readonly sentEnvelopeCount: number;
    readonly sendFailureCount: number;
    readonly receivedEnvelopeCount: number;
    readonly invalidPayloadCount: number;
    readonly foreignSessionCount: number;
    readonly unexpectedDirectionCount: number;
    readonly callbackErrorCount: number;
    readonly subscriberCount: number;
}
type EnvelopeHandler = (envelope: NetworkSimulationEnvelope) => void;
export declare class NetworkSimulationTransportAdapter {
    private readonly role;
    private readonly sessionId;
    private readonly transport;
    private readonly handlers;
    private readonly transportSubscription;
    private sentEnvelopeCount;
    private sendFailureCount;
    private receivedEnvelopeCount;
    private invalidPayloadCount;
    private foreignSessionCount;
    private unexpectedDirectionCount;
    private callbackErrorCount;
    private destroyed;
    constructor(options: NetworkTransportAdapterOptions);
    sendInput<TCommand extends NetworkJsonObject>(envelope: NetworkInputEnvelope<TCommand>): Promise<void>;
    sendSnapshot<TState extends NetworkJsonObject>(envelope: NetworkAuthoritativeSnapshotEnvelope<TState>): Promise<void>;
    onEnvelope(handler: EnvelopeHandler): NetworkTransportAdapterSubscription;
    inspect(): NetworkTransportAdapterDiagnostics;
    destroy(): void;
    private send;
    private receive;
    private assertActive;
}
export {};
