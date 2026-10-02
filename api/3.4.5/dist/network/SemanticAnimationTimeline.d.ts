import type { NetworkSequenceDisposition } from 'forgeng/contracts/network';
export type SemanticAnimationErrorCode = 'SEMANTIC_ANIMATION_INVALID_CONFIGURATION' | 'SEMANTIC_ANIMATION_INVALID_INTENT' | 'SEMANTIC_ANIMATION_INVALID_TIME' | 'SEMANTIC_ANIMATION_LIFECYCLE_INVALID';
export declare class SemanticAnimationError extends Error {
    readonly code: SemanticAnimationErrorCode;
    readonly operation: 'create' | 'update' | 'sample' | 'inspect';
    constructor(code: SemanticAnimationErrorCode, operation: 'create' | 'update' | 'sample' | 'inspect', message: string);
}
export interface SemanticAnimationIntent {
    readonly revision: number;
    readonly semantic: string;
    readonly startedAtServerTick: number;
    readonly startedAtServerTimeMs: number;
    readonly phaseAtStart: number;
    readonly cyclesPerSecond: number;
    readonly loop: boolean;
}
export interface SemanticAnimationIntentDecision {
    readonly accepted: boolean;
    readonly disposition: NetworkSequenceDisposition;
    readonly revision: number;
    readonly semantic: string;
}
export interface SemanticAnimationSample {
    readonly revision: number;
    readonly semantic: string;
    readonly serverTick: number;
    readonly serverTimeMs: number;
    readonly elapsedServerTimeMs: number;
    readonly phase: number;
    readonly completedCycles: number;
    readonly completed: boolean;
    readonly loop: boolean;
}
export interface SemanticAnimationDiagnostics {
    readonly lifecycle: 'active' | 'destroyed';
    readonly currentRevision: number | null;
    readonly currentSemantic: string | null;
    readonly acceptedIntentCount: number;
    readonly duplicateIntentCount: number;
    readonly staleIntentCount: number;
    readonly missingIntentCount: number;
    readonly transitionCount: number;
    readonly sampleCount: number;
    readonly serverTimeClampCount: number;
    readonly lastSampleServerTimeMs: number | null;
    readonly lastPhase: number | null;
}
export interface SemanticAnimationTimelineOptions {
    readonly tickRateHz?: number;
    readonly initialIntent: SemanticAnimationIntent;
}
export declare class SemanticAnimationTimeline {
    private readonly tickRateHz;
    private intent;
    private acceptedIntentCount;
    private duplicateIntentCount;
    private staleIntentCount;
    private missingIntentCount;
    private transitionCount;
    private sampleCount;
    private serverTimeClampCount;
    private lastSampleServerTimeMs;
    private lastPhase;
    private destroyed;
    constructor(options: SemanticAnimationTimelineOptions);
    update(value: SemanticAnimationIntent): SemanticAnimationIntentDecision;
    sample(serverTimeMs: number): SemanticAnimationSample;
    inspect(): SemanticAnimationDiagnostics;
    destroy(): void;
    private assertActive;
}
export declare function sampleSemanticAnimationFrame(sample: SemanticAnimationSample, frameCount: number): number;
export declare function sampleSemanticAnimationClipTime(sample: SemanticAnimationSample, durationSeconds: number): number;
export declare function measureSemanticAnimationPhaseError(expectedPhase: number, actualPhase: number, loop?: boolean): number;
