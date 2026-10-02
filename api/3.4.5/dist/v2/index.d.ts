import { defineV2Composition, type V2CompositionDefinition } from './ForgeComposition.js';
import { type ForgeRuntime } from './ForgeRuntime.js';
import { type ForgeGameLifecycleResults, type V2LifecycleResult } from './ForgeLifecycle.js';
export * from './ForgeComposition.js';
export type { ForgeRuntime, ForgeRuntimeClearColor, ForgeRuntimeDisplay, ForgeRuntimeFrames, ForgeRuntimeFrameStep, ForgeRuntimeRendering, ForgeRuntimeScenes, } from './ForgeRuntime.js';
export { ForgeLifecycleError, V2_LIFECYCLE_ERROR_OPERATIONS, V2_LIFECYCLE_EVENTS, V2_LIFECYCLE_STATES, V2_LIFECYCLE_TRANSITIONS, aggregateV2LifecycleError, classifyV2FrameOutcome, createV2LifecycleError, failureV2LifecycleResult, successV2LifecycleResult, transitionV2Lifecycle, type ForgeGameLifecycleResults, type ForgeLifecycleDomainErrorCode, type ForgeLifecycleErrorCode, type ForgeLifecycleOperation, type V2FrameEvidence, type V2FrameOutcome, type V2FrameResult, type V2FrameSkipReason, type V2LifecycleEvent, type V2LifecycleResult, type V2LifecycleState, type V2LifecycleSuccessCode, type V2LifecycleTransition, } from './ForgeLifecycle.js';
/**
 * Frozen ForgeNG 2.x compatibility facade.
 *
 * @deprecated Since ForgeNG 2.5.0. Import `ForgeGame` from `forgeng` for all
 * new work. This facade remains supported through 3.x and may be removed no
 * earlier than 4.0.0.
 */
export declare class ForgeGame {
    #private;
    readonly runtime: ForgeRuntime;
    readonly lifecycle: ForgeGameLifecycleResults;
    private constructor();
    static create(definition?: V2CompositionDefinition): Promise<ForgeGame>;
    start(sceneName?: string): Promise<void>;
    stop(): void;
    destroy(): Promise<void>;
}
/**
 * @deprecated Since ForgeNG 2.5.0. Use `ForgeGame.create()` or `create()` from
 * `forgeng`. Supported through 3.x; removable no earlier than 4.0.0.
 */
export declare function create(definition?: V2CompositionDefinition): Promise<ForgeGame>;
/**
 * @deprecated Since ForgeNG 2.5.0. Prefer the canonical `forgeng` lifecycle.
 * Supported through 3.x; removable no earlier than 4.0.0.
 */
export declare function createResult(definition?: V2CompositionDefinition): Promise<V2LifecycleResult<ForgeGame>>;
/**
 * @deprecated Since ForgeNG 2.5.0. Use the default export from `forgeng`.
 * Supported through 3.x; removable no earlier than 4.0.0.
 */
export declare const ForgEngV2: Readonly<{
    create: typeof create;
    createResult: typeof createResult;
    defineComposition: typeof defineV2Composition;
}>;
export default ForgEngV2;
