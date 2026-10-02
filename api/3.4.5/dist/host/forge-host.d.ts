/**
 * ForgEng host declarations.
 *
 * The host entry contains the legacy App/Config boot shell and is intentionally
 * separate from both the core SDK and the smaller devtools entry.
 */
import type { ForgeCoreGame, GameLoopConfig, RenderQualityProfile, Scene, ShadowBackendId, UiShellProviderDescriptor, WorldForge } from 'forgeng/core';
export interface ConfigOptions {
    canvasId?: string;
    canvas?: HTMLCanvasElement;
    width?: number;
    height?: number;
    pixelRatio?: number;
    maxPixelRatio?: number;
    backgroundColor?: string;
    autoStart?: boolean;
    autoResize?: boolean;
    scenes?: Scene[];
    lazyInitialScenes?: () => Promise<Scene[]>;
    bootSceneName?: string;
    startupRenderProfile?: RenderQualityProfile;
    gameLoop?: GameLoopConfig;
    shadowBackend?: ShadowBackendId;
    shadowAdaptiveCanary?: boolean;
    shadowAdaptiveDefault?: boolean;
    shadowClassicFallbackEnabled?: boolean;
    shadowClassicDeprecationNotice?: boolean;
    gameConsole?: Record<string, unknown>;
    ui?: UiShellProviderDescriptor | 'disabled';
}
export type GameConsoleConfigOptions = Record<string, unknown>;
export declare class Config {
    canvasId: string;
    canvas?: HTMLCanvasElement;
    width: number;
    height: number;
    pixelRatio: number;
    maxPixelRatio: number;
    backgroundColor: string;
    autoStart: boolean;
    autoResize: boolean;
    scenes: Scene[];
    lazyInitialScenes?: () => Promise<Scene[]>;
    bootSceneName?: string;
    startupRenderProfile?: RenderQualityProfile;
    gameLoop?: GameLoopConfig;
    shadowBackend?: ShadowBackendId;
    shadowAdaptiveCanary?: boolean;
    shadowAdaptiveDefault?: boolean;
    shadowClassicFallbackEnabled?: boolean;
    shadowClassicDeprecationNotice?: boolean;
    gameConsole?: Record<string, unknown>;
    ui?: UiShellProviderDescriptor | 'disabled';
    constructor(options?: ConfigOptions);
}
export interface AppRuntimeDeps {
    createGame: (config: Config, canvas: HTMLCanvasElement, scenes: readonly Scene[], uiDescriptor: UiShellProviderDescriptor | null) => Promise<ForgeCoreGame>;
    resolveCanvas: (config: Config) => HTMLCanvasElement;
    resizeCanvasToDisplaySize: (canvas: HTMLCanvasElement, config: Config) => void;
    hexToRgba01: (hex: string) => {
        r: number;
        g: number;
        b: number;
        a: number;
    };
}
export declare class App {
    constructor(config: Config, deps?: Partial<AppRuntimeDeps>);
    whenReady(): Promise<void>;
    destroy(): Promise<void>;
    getEngine(): WorldForge;
    getActiveSceneName(): string | null;
    captureRenderBaselineSnapshot(label?: string): unknown;
    captureHardeningGateRegressionBaselineSnapshot(label?: string): unknown;
    captureBootBaselineTelemetryReport(label?: string): unknown;
    captureStartupResizeStabilityReport(label?: string): unknown;
    captureStartupResizeStabilityMarkdown(label?: string): string;
    captureResizeSteadyStateMemoryReport(label?: string): unknown;
    captureResizeSteadyStateMemoryMarkdown(label?: string): string;
    captureHardeningDefinitionOfDoneReport(label?: string): unknown;
    captureHardeningDefinitionOfDoneMarkdown(label?: string): string;
    captureCurrentBootAndResourceInventoryMarkdown(label?: string): string;
    loadDiagnostics(options?: {
        readonly signal?: AbortSignal;
    }): Promise<Readonly<Record<string, (source: WorldForge, label?: string) => unknown>>>;
    setClearColor(r: number, g: number, b: number, a?: number): void;
    getClearColor(): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
}
/** @deprecated Configure Config.ui with DOM_UI_SHELL_PROVIDER_DESCRIPTOR. Removal: 2.0. */
export declare function registerDefaultSceneChromeProvider(): void;
export declare const version: string;
export declare const ForgEngHost: Readonly<{
    version: string;
    App: typeof App;
    Config: typeof Config;
    registerDefaultSceneChromeProvider: typeof registerDefaultSceneChromeProvider;
}>;
export default ForgEngHost;
