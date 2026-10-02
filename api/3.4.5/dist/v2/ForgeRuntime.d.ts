import type { ForgeCoreGame, ForgeSceneInput, RendererFeatureGroup } from 'forgeng/core';
import { type ForgeLifecycleError, type V2FrameResult, type V2LifecycleResult, type V2LifecycleState } from './ForgeLifecycle.js';
export interface ForgeRuntimeScenes {
    add(scenes: readonly ForgeSceneInput[]): void;
    activate(sceneName: string): Promise<void>;
    activateResult(sceneName: string): Promise<V2LifecycleResult<void>>;
    currentName(): string | null;
}
export interface ForgeRuntimeDisplay {
    readonly canvas: HTMLCanvasElement;
    resize(width: number, height: number): void;
}
export interface ForgeRuntimeFrameStep {
    readonly deltaSeconds: number;
    readonly simulationSteps?: number;
    readonly interpolationAlpha?: number;
}
export interface ForgeRuntimeFrames {
    step(frame: ForgeRuntimeFrameStep): Promise<void>;
    stepResult(frame: ForgeRuntimeFrameStep): Promise<V2FrameResult>;
}
export interface ForgeRuntimeClearColor {
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a?: number;
}
export interface ForgeRuntimeRendering {
    setClearColor(color: ForgeRuntimeClearColor): void;
    loadFeatureGroup(group: RendererFeatureGroup, options?: {
        readonly signal?: AbortSignal;
    }): Promise<void>;
}
/**
 * Frozen narrow runtime retained for ForgeNG 2.x compatibility.
 *
 * @deprecated Since ForgeNG 2.5.0. Use the `ForgeGame` API from `forgeng`.
 * Supported through 3.x; removable no earlier than 4.0.0.
 */
export interface ForgeRuntime {
    readonly scenes: ForgeRuntimeScenes;
    readonly display: ForgeRuntimeDisplay;
    readonly frames: ForgeRuntimeFrames;
    readonly rendering: ForgeRuntimeRendering;
}
export interface ForgeRuntimeOptions {
    readonly manualFrames: boolean;
    readonly lifecycleState: () => V2LifecycleState;
    readonly lifecycleError: () => ForgeLifecycleError | null;
}
export declare function createForgeRuntime(game: ForgeCoreGame, options: ForgeRuntimeOptions): ForgeRuntime;
