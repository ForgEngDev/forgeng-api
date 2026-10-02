import { type NetworkAuthoritativeSnapshotEnvelope, type NetworkClockEstimate, type NetworkJsonObject, type NetworkSequenceDisposition } from 'forgeng/contracts/network';
export type RemoteInterpolationMode = 'empty' | 'buffering' | 'interpolating' | 'extrapolating' | 'holding' | 'teleport' | 'recovery';
export type RemoteRecoveryPolicy = 'snap' | 'interpolate';
export type RemoteInterpolationErrorCode = 'REMOTE_INTERPOLATION_INVALID_CONFIGURATION' | 'REMOTE_INTERPOLATION_INVALID_SNAPSHOT' | 'REMOTE_INTERPOLATION_CALLBACK_FAILED' | 'REMOTE_INTERPOLATION_INVALID_TIME' | 'REMOTE_INTERPOLATION_LIFECYCLE_INVALID';
export declare class RemoteInterpolationError extends Error {
    readonly code: RemoteInterpolationErrorCode;
    readonly operation: 'create' | 'push' | 'sample' | 'inspect';
    constructor(code: RemoteInterpolationErrorCode, operation: 'create' | 'push' | 'sample' | 'inspect', message: string, options?: Readonly<{
        cause?: unknown;
    }>);
}
export interface RemoteInterpolationOptions<TState extends NetworkJsonObject> {
    readonly sessionId: string;
    readonly interpolationDelayMs?: number;
    readonly maximumInterpolationDelayMs?: number;
    readonly jitterDelayMultiplier?: number;
    readonly maximumExtrapolationMs?: number;
    readonly maximumBufferedSnapshots?: number;
    readonly teleportThreshold?: number;
    readonly recoveryPolicy?: RemoteRecoveryPolicy;
    readonly interpolate: (from: TState, to: TState, alpha: number) => TState;
    readonly extrapolate?: (latest: TState, durationMs: number) => TState;
    readonly measureDistance?: (from: TState, to: TState) => number;
}
export interface RemoteSnapshotDecision {
    readonly accepted: boolean;
    readonly disposition: NetworkSequenceDisposition;
    readonly missingSnapshotCount: number;
    readonly bufferedSnapshotCount: number;
}
export interface RemoteInterpolationSample<TState extends NetworkJsonObject> {
    readonly mode: RemoteInterpolationMode;
    readonly state: TState | null;
    readonly estimatedServerTimeMs: number;
    readonly renderServerTimeMs: number;
    readonly effectiveInterpolationDelayMs: number;
    readonly snapshotAgeMs: number | null;
    readonly alpha: number | null;
    readonly extrapolationMs: number;
    readonly fromSequence: number | null;
    readonly toSequence: number | null;
    readonly bufferedSnapshotCount: number;
}
export interface RemoteInterpolationDiagnostics {
    readonly lifecycle: 'active' | 'destroyed';
    readonly bufferedSnapshotCount: number;
    readonly lastSnapshotSequence: number | null;
    readonly acceptedSnapshotCount: number;
    readonly duplicateSnapshotCount: number;
    readonly staleSnapshotCount: number;
    readonly missingSnapshotCount: number;
    readonly droppedSnapshotCount: number;
    readonly interpolationSampleCount: number;
    readonly extrapolationSampleCount: number;
    readonly holdingSampleCount: number;
    readonly teleportCount: number;
    readonly recoveryCount: number;
    readonly renderTimeClampCount: number;
    readonly maximumObservedSnapshotAgeMs: number;
    readonly maximumObservedExtrapolationMs: number;
    readonly lastMode: RemoteInterpolationMode;
}
export declare class RemoteInterpolationBuffer<TState extends NetworkJsonObject> {
    private readonly sessionId;
    private readonly delayMs;
    private readonly maximumDelayMs;
    private readonly jitterMultiplier;
    private readonly maximumExtrapolationMs;
    private readonly capacity;
    private readonly teleportThreshold;
    private readonly recoveryPolicy;
    private readonly interpolateState;
    private readonly extrapolateState?;
    private readonly measureDistance?;
    private snapshots;
    private lastSnapshotSequence;
    private lastSnapshotTick;
    private lastSnapshotTimeMs;
    private lastRenderServerTimeMs;
    private effectiveDelayMs;
    private lastSampleClientTimeMs;
    private acceptedSnapshotCount;
    private duplicateSnapshotCount;
    private staleSnapshotCount;
    private missingSnapshotCount;
    private droppedSnapshotCount;
    private interpolationSampleCount;
    private extrapolationSampleCount;
    private holdingSampleCount;
    private teleportCount;
    private recoveryCount;
    private renderTimeClampCount;
    private maximumObservedSnapshotAgeMs;
    private maximumObservedExtrapolationMs;
    private lastMode;
    private recoveryPending;
    private starved;
    private lastTeleportToSequence;
    private destroyed;
    constructor(options: RemoteInterpolationOptions<TState>);
    push(snapshot: NetworkAuthoritativeSnapshotEnvelope<TState>): RemoteSnapshotDecision;
    sample(clientTimeMs: number, clock: NetworkClockEstimate): RemoteInterpolationSample<TState>;
    inspect(): RemoteInterpolationDiagnostics;
    destroy(): void;
    private validateSnapshot;
    private callbackState;
    private callbackNumber;
    private result;
    private prune;
    private assertActive;
}
