import { type TransportBackpressureSnapshot, type TransportConnectionState, type TransportProviderLogger } from 'forgeng/contracts/transport';
export interface TransportRuntimeMetrics {
    readonly generation: number;
    readonly reconnectAttempts: number;
    readonly scheduledRetries: number;
    readonly state: TransportConnectionState;
    readonly backpressure: TransportBackpressureSnapshot;
}
export interface ForgeTransportDiagnosticsOptions {
    readonly logger?: TransportProviderLogger;
    readonly onMetrics?: (metrics: TransportRuntimeMetrics) => void;
}
export declare function validateTransportDiagnosticsOptions(value: unknown): ForgeTransportDiagnosticsOptions | undefined;
export declare class TransportDiagnostics {
    private readonly options;
    readonly providerLogger: TransportProviderLogger;
    private readonly logger;
    constructor(providerId: string, options: ForgeTransportDiagnosticsOptions | undefined);
    event(level: 'debug' | 'info' | 'warn', message: string, metadata: Readonly<Record<string, string | number | boolean>>): void;
    metrics(snapshot: TransportRuntimeMetrics): void;
}
