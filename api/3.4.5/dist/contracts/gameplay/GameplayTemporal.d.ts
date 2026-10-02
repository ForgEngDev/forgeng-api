import type { GameplayEntityHandle, GameplayJsonValue } from './GameplayCommon';
export type GameplayClockDomain = 'simulation' | 'presentation' | 'wall';
export interface GameplayClockDomainSnapshot {
    readonly domain: GameplayClockDomain;
    readonly tick: number;
    readonly deltaSeconds: number;
    readonly elapsedSeconds: number;
    readonly scale: number;
    readonly paused: boolean;
}
export interface GameplayWallClockPort {
    snapshot(): GameplayClockDomainSnapshot;
}
export interface GameplayTimerScheduleOptions {
    /** Number of additional firings after the first, or an explicitly unbounded cadence. */
    readonly repeat?: number | 'forever';
    readonly intervalTicks?: number;
}
export type GameplayTweenEasing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
export interface GameplayTweenDefinition {
    readonly from: number;
    readonly to: number;
    readonly startTick: number;
    readonly delayTicks?: number;
    readonly durationTicks: number;
    readonly easing?: GameplayTweenEasing;
    readonly repeat?: number | 'forever';
    readonly yoyo?: boolean;
}
export interface GameplayTweenSample {
    readonly tick: number;
    readonly cycle: number;
    readonly progress: number;
    readonly easedProgress: number;
    readonly value: number;
    readonly completed: boolean;
}
export interface GameplayAnimationIntent {
    readonly revision: number;
    readonly semantic: string;
    readonly startedAtTick: number;
    readonly phaseAtStart: number;
    readonly durationTicks: number;
    readonly rate: number;
    readonly loop: boolean;
    readonly metadata?: GameplayJsonValue;
}
export interface GameplayAnimationIntentDecision {
    readonly accepted: boolean;
    readonly disposition: 'accepted' | 'duplicate' | 'stale';
    readonly revision: number;
    readonly semantic: string;
}
export interface GameplayAnimationSample {
    readonly revision: number;
    readonly semantic: string;
    readonly tick: number;
    readonly elapsedTicks: number;
    readonly phase: number;
    readonly completedCycles: number;
    readonly completed: boolean;
    readonly loop: boolean;
    readonly metadata?: GameplayJsonValue;
}
export interface GameplayAnimationIntentSnapshot {
    readonly entityPath: string;
    readonly intent: GameplayAnimationIntent;
}
export interface GameplayAnimationInspectionSnapshot {
    readonly intentCount: number;
    readonly acceptedCount: number;
    readonly duplicateCount: number;
    readonly staleCount: number;
}
export interface GameplayAnimationApi {
    set(entity: GameplayEntityHandle, intent: GameplayAnimationIntent): GameplayAnimationIntentDecision;
    current(entity: GameplayEntityHandle): GameplayAnimationIntent | null;
    sample(entity: GameplayEntityHandle, tick: number): GameplayAnimationSample | null;
    clear(entity: GameplayEntityHandle): boolean;
    inspect(): GameplayAnimationInspectionSnapshot;
}
