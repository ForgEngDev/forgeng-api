export interface TransportReconnectTimer {
    cancel(): void;
}
export interface TransportReconnectClock {
    schedule(callback: () => void, delayMs: number): TransportReconnectTimer;
}
export interface BoundedTransportReconnectPolicy {
    readonly maxAttempts: number;
    readonly initialDelayMs: number;
    readonly maxDelayMs?: number;
    readonly multiplier?: number;
    readonly jitterRatio?: number;
    readonly clock?: TransportReconnectClock;
    readonly random?: () => number;
}
export type TransportReconnectPolicy = 'none' | BoundedTransportReconnectPolicy;
export interface NormalizedTransportReconnectPolicy {
    readonly maxAttempts: number;
    readonly initialDelayMs: number;
    readonly maxDelayMs: number;
    readonly multiplier: number;
    readonly jitterRatio: number;
    readonly clock: TransportReconnectClock;
    readonly random: () => number;
}
export declare function normalizeTransportReconnectPolicy(value: unknown): NormalizedTransportReconnectPolicy | null;
export declare function transportReconnectDelay(policy: NormalizedTransportReconnectPolicy, attempt: number): number;
