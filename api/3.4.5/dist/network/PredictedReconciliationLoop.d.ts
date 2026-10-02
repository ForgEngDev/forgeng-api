import { type NetworkAuthoritativeSnapshotEnvelope, type NetworkInputEnvelope, type NetworkJsonObject, type NetworkSequenceDisposition } from 'forgeng/contracts/network';
import type { AuthoritativeReducer } from './AuthoritativeHeadlessLoop';
export type PredictedReconciliationErrorCode = 'PREDICTION_INVALID_CONFIGURATION' | 'PREDICTION_INVALID_INPUT' | 'PREDICTION_INPUT_CAPACITY_EXCEEDED' | 'PREDICTION_REDUCER_FAILED' | 'PREDICTION_INVALID_SNAPSHOT' | 'PREDICTION_CORRECTION_MEASUREMENT_FAILED' | 'PREDICTION_LIFECYCLE_INVALID';
export declare class PredictedReconciliationError extends Error {
    readonly code: PredictedReconciliationErrorCode;
    readonly operation: 'create' | 'predict' | 'reconcile' | 'inspect';
    constructor(code: PredictedReconciliationErrorCode, operation: 'create' | 'predict' | 'reconcile' | 'inspect', message: string, options?: Readonly<{
        cause?: unknown;
    }>);
}
export type PredictionCorrectionMeasure<TState extends NetworkJsonObject> = (before: TState, after: TState, authoritative: TState) => number;
export interface PredictedReconciliationOptions<TState extends NetworkJsonObject, TCommand extends NetworkJsonObject> {
    readonly sessionId: string;
    readonly clientId: string;
    readonly tickRateHz?: number;
    readonly serverEpochMs?: number;
    readonly initialTick?: number;
    readonly maximumPendingInputs?: number;
    readonly maximumReconciliationHistory?: number;
    readonly hardCorrectionMagnitude?: number;
    readonly initialState: TState;
    readonly reducer: AuthoritativeReducer<TState, TCommand>;
    readonly measureCorrection?: PredictionCorrectionMeasure<TState>;
    readonly validateState?: (state: TState) => void;
}
export interface PredictionStepResult<TState extends NetworkJsonObject> {
    readonly tick: number;
    readonly state: TState;
    readonly stateHash: string;
    readonly inputSequence: number;
    readonly pendingInputCount: number;
}
export interface PredictionReconciliationRecord {
    readonly snapshotSequence: number;
    readonly serverTick: number;
    readonly acknowledgedInputSequence: number | null;
    readonly acknowledgedInputTick: number | null;
    readonly acknowledgementDelayTicks: number | null;
    readonly discardedInputCount: number;
    readonly replayedInputCount: number;
    readonly pendingInputCount: number;
    readonly beforeStateHash: string;
    readonly authoritativeStateHash: string;
    readonly reconciledStateHash: string;
    readonly authorityMismatch: boolean;
    readonly predictionChanged: boolean;
    readonly correctionMagnitude: number;
    readonly hardCorrection: boolean;
}
export interface PredictionReconciliationResult<TState extends NetworkJsonObject> {
    readonly applied: boolean;
    readonly disposition: NetworkSequenceDisposition;
    readonly missingSnapshotCount: number;
    readonly state: TState;
    readonly stateHash: string;
    readonly record: PredictionReconciliationRecord | null;
}
export interface PredictedReconciliationDiagnostics<TState extends NetworkJsonObject> {
    readonly lifecycle: 'active' | 'destroyed';
    readonly predictionTick: number;
    readonly state: TState;
    readonly stateHash: string;
    readonly pendingInputCount: number;
    readonly lastGeneratedInputSequence: number | null;
    readonly lastSnapshotSequence: number | null;
    readonly lastServerTick: number | null;
    readonly lastAcknowledgedInputSequence: number | null;
    readonly reconciliationCount: number;
    readonly correctionCount: number;
    readonly hardCorrectionCount: number;
    readonly correctionMagnitudeTotal: number;
    readonly correctionMagnitudeMaximum: number;
    readonly replayedInputCount: number;
    readonly discardedInputCount: number;
    readonly duplicateSnapshotCount: number;
    readonly staleSnapshotCount: number;
    readonly missingSnapshotCount: number;
    readonly reconciliationHistory: readonly PredictionReconciliationRecord[];
}
export declare class PredictedReconciliationLoop<TState extends NetworkJsonObject, TCommand extends NetworkJsonObject> {
    private readonly sessionId;
    private readonly clientId;
    private readonly tickRateHz;
    private readonly fixedDeltaSeconds;
    private readonly serverEpochMs;
    private readonly maximumPendingInputs;
    private readonly maximumReconciliationHistory;
    private readonly hardCorrectionMagnitude;
    private readonly reducer;
    private readonly measureCorrection;
    private readonly validateState;
    private pendingInputs;
    private reconciliationHistory;
    private state;
    private stateHash;
    private predictionTick;
    private lastGeneratedInputSequence;
    private lastSnapshotSequence;
    private lastServerTick;
    private lastAcknowledgedInputSequence;
    private reconciliationCount;
    private correctionCount;
    private hardCorrectionCount;
    private correctionMagnitudeTotal;
    private correctionMagnitudeMaximum;
    private replayedInputCount;
    private discardedInputCount;
    private duplicateSnapshotCount;
    private staleSnapshotCount;
    private missingSnapshotCount;
    private destroyed;
    constructor(options: PredictedReconciliationOptions<TState, TCommand>);
    predict(input: NetworkInputEnvelope<TCommand>): PredictionStepResult<TState>;
    reconcile(snapshot: NetworkAuthoritativeSnapshotEnvelope<TState>): PredictionReconciliationResult<TState>;
    inspect(): PredictedReconciliationDiagnostics<TState>;
    destroy(): void;
    private reduceRange;
    private validateInput;
    private validateSnapshot;
    private assertActive;
}
