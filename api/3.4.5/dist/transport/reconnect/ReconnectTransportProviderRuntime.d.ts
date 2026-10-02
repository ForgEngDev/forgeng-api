import { type TransportProviderDescriptor } from 'forgeng/contracts/transport';
import { type ForgeTransportDiagnosticsOptions, type TransportRuntimeMetrics } from './TransportDiagnostics.js';
import { type NormalizedTransportReconnectPolicy } from './TransportReconnectPolicy.js';
import { type TransportHandle } from './TransportProviderRuntime.js';
export interface ResolvedReconnectTransportConfiguration {
    readonly descriptor: TransportProviderDescriptor<unknown>;
    readonly options?: unknown;
    readonly reconnect: NormalizedTransportReconnectPolicy | null;
    readonly diagnostics?: ForgeTransportDiagnosticsOptions;
}
export interface ReconnectTransportHandle extends TransportHandle {
    getMetrics(): TransportRuntimeMetrics;
}
export declare class ReconnectTransportProviderRuntime {
    private readonly configuration;
    private readonly abortController;
    private readonly diagnostics;
    readonly handle: ReconnectTransportHandle;
    private readonly messageHandlers;
    private readonly stateHandlers;
    private readonly providerIdentities;
    private readonly baselineBackpressure;
    private active;
    private state;
    private nextGeneration;
    private reconnectAttempts;
    private scheduledRetries;
    private started;
    private startInProgress;
    private manualClose;
    private destroyed;
    private startPromise;
    private reconnectPromise;
    private destroyPromise;
    private backoff;
    private constructor();
    static initialize(configuration: ResolvedReconnectTransportConfiguration): Promise<ReconnectTransportProviderRuntime>;
    start(): Promise<void>;
    destroy(): Promise<void>;
    private startConnection;
    private retryLoop;
    private beginBackgroundReconnect;
    private createGeneration;
    private attach;
    private isCurrent;
    private connectActive;
    private getState;
    private getBackpressure;
    private getMetrics;
    private emitMetrics;
    private send;
    private close;
    private onMessage;
    private onStateChange;
    private waitBackoff;
    private cancelBackoff;
    private retireActive;
    private destroyGeneration;
    private dispose;
}
export declare function initializeReconnectTransportProviderRuntime(configuration: ResolvedReconnectTransportConfiguration | null): Promise<ReconnectTransportProviderRuntime | null>;
