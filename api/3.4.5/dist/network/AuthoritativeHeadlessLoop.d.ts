import { type NetworkAuthoritativeSnapshotEnvelope, type NetworkInputEnvelope, type NetworkJsonObject, type NetworkSequenceDisposition } from 'forgeng/contracts/network';
export type AuthoritativeHeadlessLoopErrorCode = 'HEADLESS_INVALID_CONFIGURATION' | 'HEADLESS_INVALID_INPUT' | 'HEADLESS_INPUT_CAPACITY_EXCEEDED' | 'HEADLESS_REDUCER_FAILED' | 'HEADLESS_LIFECYCLE_INVALID';
export declare class AuthoritativeHeadlessLoopError extends Error {
    readonly code: AuthoritativeHeadlessLoopErrorCode;
    readonly operation: 'create' | 'enqueue' | 'step' | 'inspect';
    constructor(code: AuthoritativeHeadlessLoopErrorCode, operation: 'create' | 'enqueue' | 'step' | 'inspect', message: string, options?: Readonly<{
        cause?: unknown;
    }>);
}
export interface AuthoritativeStepContext {
    readonly tick: number;
    readonly fixedDeltaSeconds: number;
    readonly serverTimeMs: number;
}
export type AuthoritativeReducer<TState extends NetworkJsonObject, TCommand extends NetworkJsonObject> = (state: TState, inputs: readonly NetworkInputEnvelope<TCommand>[], context: AuthoritativeStepContext) => TState;
export interface AuthoritativeHeadlessLoopOptions<TState extends NetworkJsonObject, TCommand extends NetworkJsonObject> {
    readonly sessionId: string;
    readonly serverId: string;
    readonly tickRateHz?: number;
    readonly snapshotIntervalTicks?: number;
    readonly serverEpochMs?: number;
    readonly maximumQueuedInputs?: number;
    readonly maximumFutureInputTicks?: number;
    readonly maximumHashHistory?: number;
    readonly initialState: TState;
    readonly reducer: AuthoritativeReducer<TState, TCommand>;
    readonly validateState?: (state: TState) => void;
}
export interface AuthoritativeInputDecision {
    readonly accepted: boolean;
    readonly disposition: NetworkSequenceDisposition | 'late' | 'too-far-ahead';
    readonly clientId: string;
    readonly sequence: number;
    readonly clientTick: number;
    readonly missingSequenceCount: number;
}
export interface AuthoritativeTickResult<TState extends NetworkJsonObject> {
    readonly tick: number;
    readonly state: TState;
    readonly stateHash: string;
    readonly processedInputCount: number;
    readonly snapshots: readonly NetworkAuthoritativeSnapshotEnvelope<TState>[];
}
export interface AuthoritativeHeadlessDiagnostics {
    readonly lifecycle: 'active' | 'destroyed';
    readonly tick: number;
    readonly tickRateHz: number;
    readonly queuedInputCount: number;
    readonly knownClientCount: number;
    readonly acceptedInputCount: number;
    readonly processedInputCount: number;
    readonly duplicateInputCount: number;
    readonly staleInputCount: number;
    readonly lateInputCount: number;
    readonly futureRejectedInputCount: number;
    readonly missingSequenceCount: number;
    readonly emittedSnapshotCount: number;
    readonly lastSnapshotSequence: number | null;
    readonly stateHash: string;
    readonly hashHistory: readonly Readonly<{
        tick: number;
        stateHash: string;
    }>[];
}
export declare class AuthoritativeHeadlessLoop<TState extends NetworkJsonObject, TCommand extends NetworkJsonObject> {
    private readonly sessionId;
    private readonly serverId;
    private readonly tickRateHz;
    private readonly fixedDeltaSeconds;
    private readonly snapshotIntervalTicks;
    private readonly serverEpochMs;
    private readonly maximumQueuedInputs;
    private readonly maximumFutureInputTicks;
    private readonly maximumHashHistory;
    private readonly reducer;
    private readonly validateState;
    private readonly queuedByTick;
    private readonly lastAcceptedSequenceByClient;
    private readonly lastProcessedInputByClient;
    private hashHistory;
    private state;
    private stateHash;
    private tick;
    private queuedInputCount;
    private nextSnapshotSequence;
    private acceptedInputCount;
    private processedInputCount;
    private duplicateInputCount;
    private staleInputCount;
    private lateInputCount;
    private futureRejectedInputCount;
    private missingSequenceCount;
    private emittedSnapshotCount;
    private destroyed;
    constructor(options: AuthoritativeHeadlessLoopOptions<TState, TCommand>);
    enqueueInput(input: NetworkInputEnvelope<TCommand>): AuthoritativeInputDecision;
    step(): AuthoritativeTickResult<TState>;
    runUntil(targetTick: number): readonly AuthoritativeTickResult<TState>[];
    inspect(): AuthoritativeHeadlessDiagnostics;
    destroy(): void;
    private createSnapshots;
    private inputDecision;
    private assertActive;
}
