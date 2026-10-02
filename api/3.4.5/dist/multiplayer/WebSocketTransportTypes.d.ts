import type { TransportProviderLimits } from 'forgeng/contracts/transport';
export interface WebSocketTransportTimer {
    cancel(): void;
}
export interface WebSocketTransportScheduler {
    schedule(callback: () => void, delayMs: number): WebSocketTransportTimer;
}
export type WebSocketTransportFactory = (endpoint: string, protocols?: string | readonly string[]) => WebSocket;
export interface WebSocketTransportProviderOptions {
    /** Caller-owned runtime endpoint. Secure production contexts should use wss://. */
    readonly endpoint: string;
    readonly protocols?: string | readonly string[];
    readonly limits?: Partial<TransportProviderLimits>;
    /** Poll cadence used only while bufferedAmount prevents FIFO queue progress. */
    readonly backpressurePollMs?: number;
    /** Injectable browser boundary for deterministic tests; never invoked before connect(). */
    readonly webSocketFactory?: WebSocketTransportFactory;
    readonly scheduler?: WebSocketTransportScheduler;
}
