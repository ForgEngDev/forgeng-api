import type { TransportBackpressureSnapshot, TransportCloseOptions, TransportConnectionState, TransportMessage, TransportOperationOptions, TransportProviderLimits, TransportSendOptions, TransportStateChange, TransportSubscription } from 'forgeng/contracts/transport';
import { type NetworkJsonObject } from 'forgeng/contracts/network';
import { RemoteInterpolationBuffer } from 'forgeng/network';
import { type Data, type Entities, type Role, type ServerMessage, type Snapshot } from './protocol.js';
/** A full provider or the public handle exposed by ForgeNG transport compositions. */
export interface MultiplayerTransport {
    readonly limits: TransportProviderLimits;
    getState(): TransportConnectionState;
    getBackpressure(): TransportBackpressureSnapshot;
    connect?(options?: TransportOperationOptions): Promise<void>;
    send(payload: Uint8Array, options?: TransportSendOptions): Promise<void>;
    close(options?: TransportCloseOptions): Promise<void>;
    onMessage(handler: (message: TransportMessage) => void): TransportSubscription;
    onStateChange(handler: (change: TransportStateChange) => void): TransportSubscription;
    destroy?(): Promise<void>;
}
export interface ClientOptions {
    schema: string;
    transport: MultiplayerTransport;
    /** Set false when the transport lifecycle is owned by a ForgeNG game composition. */
    ownsTransport?: boolean;
    handshakeTimeoutMs?: number;
    onMessage?(message: ServerMessage): void;
    onError?(code: string): void;
}
/** Supply the existing ForgeNG WebSocket provider (or SDK transport-compatible port). */
export declare class MultiplayerClient {
    private readonly options;
    session: string | null;
    resume: string | null;
    room: string | null;
    role: Role | null;
    entities: Entities;
    owners: Record<string, string>;
    tick: number;
    time: number;
    processed: number;
    private next;
    private sequence;
    private eventSequence;
    private resyncPending;
    private readonly subscription;
    private readonly stateSubscription;
    private readonly snapshots;
    private connecting?;
    private credential;
    private startingTransport;
    private destroyed;
    constructor(options: ClientOptions);
    private fail;
    connect(credential: string, resume?: string): Promise<void>;
    private handshake;
    private settleConnect;
    private disconnected;
    private send;
    join(room: string, role: Role): Promise<void>;
    leave(): Promise<void>;
    command(entity: string, name: string, data: Data): Promise<void>;
    resync(): Promise<void>;
    private reset;
    private receive;
    destroy(): Promise<void>;
}
export interface MultiplayerInterpolationOptions {
    readonly interpolationDelayMs?: number;
    readonly maximumInterpolationDelayMs?: number;
    readonly jitterDelayMultiplier?: number;
    readonly maximumExtrapolationMs?: number;
    readonly clockSampleCapacity?: number;
    readonly extrapolate?: (previous: Entities, latest: Entities, durationMs: number, snapshotIntervalMs: number) => Entities;
}
export interface MultiplayerInterpolationDiagnostics {
    readonly clockSampleCount: number;
    readonly clockOffsetMs: number;
    readonly clockJitterMs: number;
    readonly snapshotIntervalMs: number;
    readonly presentation: ReturnType<RemoteInterpolationBuffer<NetworkJsonObject>['inspect']>;
}
/** Reuses the engine's tested interpolation; game supplies dimension-specific projection. */
export declare class MultiplayerInterpolation {
    readonly room: string;
    private readonly buffer;
    private readonly clockSampleCapacity;
    private readonly clockOffsets;
    private clock;
    private previousEntities;
    private latestEntities;
    private latestSnapshotTimeMs;
    private snapshotIntervalMs;
    constructor(room: string, interpolate: (from: Entities, to: Entities, alpha: number) => Entities, delayOrOptions?: number | MultiplayerInterpolationOptions);
    push(message: Snapshot, reconstructed: Entities, clientReceiveTimeMs?: number): void;
    sample(estimatedServerTimeMs: number): Entities | null;
    sampleClientTime(clientTimeMs?: number): Entities | null;
    inspect(): MultiplayerInterpolationDiagnostics;
    destroy(): void;
}
