/** Shared compat-neutral ForgeNG runtime boundary. */
export { GameLoop, Scene, SceneCamera, DirectionalLight, PointLight, SpotLight, LightingSettings, ShadowQuality, ShadowSettings, GameObject, InstancedMesh, MeshRenderer, StandardMesh, SceneAddFacade, WEB_AUDIO_PROVIDER_DESCRIPTOR, NULL_AUDIO_PROVIDER_DESCRIPTOR, defineForgeConfig, AssetFormatCompositionError, defineAssetFormatBundle, SHADOW_SHADER_ABI_VERSION, shadowShaderContract } from '../forge';
export type { GameLoopConfig, RenderQualityProfile, ShadowBackendId, ForgeCanvasLayoutMode, ForgeLoggingController, ForgeLoggingOptions, ForgeLogger, ForgePluginDescriptor, ForgeProvidersConfig, ForgeConfigDefinition, AudioProviderSelection, PhysicsProviderSelection, UiProviderSelection, InputProviderSelection, StorageProviderSelection, StorageProviderConfiguration, AnimationProviderSelection, RendererProviderSelection, ForgeStorageConfig, RendererProviderDescriptor, PhysicsProviderDescriptor, AudioProviderDescriptor, UiShellProviderDescriptor, InputProviderDescriptor, StorageProviderDescriptor, AnimationProviderDescriptor, PhysicsProvider, UiShell, StorageProvider, CapabilityProbeOptions, CapabilityProbeSnapshot, RendererFeatureGroup, ShadowShaderContract, ForgeAssetsConfig, AssetManifestInput, AssetFormatBundle, WorldForge } from '../forge';
import type { GameLoop, GameLoopConfig, RenderQualityProfile, ShadowBackendId, ForgeCanvasLayoutMode, ForgeLoggingController, ForgeLoggingOptions, ForgePluginDescriptor, ForgeProvidersConfig, RendererProviderDescriptor, PhysicsProviderDescriptor, AudioProviderDescriptor, UiShellProviderDescriptor, InputProviderDescriptor, StorageProviderConfiguration, AnimationProviderDescriptor, PhysicsProvider, UiShell, StorageProvider, Scene, WorldForge, ForgeAssetsConfig, AssetManifestInput } from '../forge';
export type ForgeSceneConstructor = new (key?: string) => Scene;
export type ForgeSceneFactory = (key?: string) => Scene;
export type ForgeSceneSource = Scene | ForgeSceneConstructor | ForgeSceneFactory;
export interface ForgeSceneConfig {
    readonly key?: string;
    readonly scene: ForgeSceneSource;
}
export type ForgeSceneInput = ForgeSceneSource | ForgeSceneConfig;
export interface ForgeCreateSizeOptions {
    readonly width?: number;
    readonly height?: number;
    readonly pixelRatio?: number;
    readonly maxPixelRatio?: number;
    readonly autoResize?: boolean;
}
export interface ForgeCreateRenderOptions {
    readonly backgroundColor?: string;
    readonly startupRenderProfile?: RenderQualityProfile;
    readonly shadowBackend?: ShadowBackendId;
    readonly shadowAdaptiveCanary?: boolean;
    readonly shadowAdaptiveDefault?: boolean;
    readonly shadowClassicFallbackEnabled?: boolean;
    readonly shadowClassicDeprecationNotice?: boolean;
    readonly observabilityProfile?: 'off' | 'production-lite' | 'diagnostic' | 'lab';
    readonly gpuTimingEnabled?: boolean;
    readonly gpuTimingKillSwitch?: boolean;
}
export interface ForgeCreateBootOptions {
    readonly scene?: string;
    readonly autoStart?: boolean;
}
export interface ForgeCoreResolvedCreateOptions {
    readonly canvas?: string | HTMLCanvasElement;
    readonly canvasId?: string;
    readonly canvasLayout: ForgeCanvasLayoutMode;
    readonly width: number;
    readonly height: number;
    readonly pixelRatio?: number;
    readonly maxPixelRatio: number;
    readonly backgroundColor: string;
    readonly autoStart: boolean;
    readonly autoResize: boolean;
    readonly scenes: readonly Scene[];
    readonly bootScene?: string;
    readonly startupRenderProfile: RenderQualityProfile;
    readonly gameLoop?: GameLoopConfig;
    readonly logging: ForgeLoggingOptions;
    readonly runtimePlugins: readonly ForgePluginDescriptor[];
    readonly physicsProviderDescriptor: PhysicsProviderDescriptor | null;
    readonly audioProviderDescriptor?: AudioProviderDescriptor;
    readonly uiShellProviderDescriptor: UiShellProviderDescriptor | null;
    readonly rendererProviderDescriptor: RendererProviderDescriptor;
    readonly inputProviderSelection: 'default' | InputProviderDescriptor;
    readonly storageProviderConfiguration?: StorageProviderConfiguration;
    readonly animation: AnimationProviderDescriptor | null;
    readonly shadowBackend?: ShadowBackendId;
    readonly shadowAdaptiveCanary: boolean;
    readonly shadowAdaptiveDefault: boolean;
    readonly shadowClassicFallbackEnabled: boolean;
    readonly shadowClassicDeprecationNotice: boolean;
    readonly observabilityProfile: 'off' | 'production-lite' | 'diagnostic' | 'lab';
    readonly gpuTimingEnabled: boolean;
    readonly gpuTimingKillSwitch: boolean;
    readonly deprecationDiagnostics: readonly unknown[];
}
export interface ForgeCoreGame {
    readonly canvas: HTMLCanvasElement;
    readonly engine: WorldForge;
    readonly loop: GameLoop;
    readonly logs: ForgeLoggingController;
    readonly physics: PhysicsProvider | null;
    readonly ui: UiShell | null;
    readonly storage: StorageProvider | null;
    addScenes(scenes: readonly ForgeSceneInput[]): void;
    start(sceneName?: string): Promise<void>;
    stop(): void;
    startScene(sceneName: string): Promise<void>;
    getActiveSceneName(): string | null;
    resize(): {
        width: number;
        height: number;
        pixelRatio: number;
    };
    destroy(): Promise<void>;
    inspectPresentation(): import('forgeng/contracts/render-composition').RenderCompositionSnapshot | null;
}
export interface ForgeNormalizedAssetsConfig {
    readonly manifests: readonly AssetManifestInput[];
    readonly preload: readonly string[];
    readonly formats: NonNullable<ForgeAssetsConfig['formats']>;
    readonly decoders: NonNullable<ForgeAssetsConfig['decoders']>;
    readonly realizers: NonNullable<ForgeAssetsConfig['realizers']>;
    readonly codecPolicy: Readonly<NonNullable<ForgeAssetsConfig['codecPolicy']>>;
}
export declare const WorldForge: abstract new (...args: never[]) => WorldForge;
export declare function resolveSceneInputs(inputs?: readonly ForgeSceneInput[]): Scene[];
export declare function resolveForgeCoreProviders(providers: Readonly<ForgeProvidersConfig>, runtimePlugins: readonly ForgePluginDescriptor[]): Readonly<Record<string, unknown>>;
export declare function resolveForgeCoreAssets(config?: ForgeAssetsConfig): ForgeNormalizedAssetsConfig;
export declare function createForgeCoreGame(options: ForgeCoreResolvedCreateOptions): Promise<ForgeCoreGame>;
export declare function createForgeCoreOwner(options: ForgeCoreResolvedCreateOptions, acquireEngine?: unknown): Promise<unknown>;
export declare function createBrowserInputProviderDescriptor(canvas: HTMLCanvasElement): unknown;
export declare const DEFAULT_WEBGPU_RENDERER_PROVIDER_DESCRIPTOR: RendererProviderDescriptor;
export declare function resolveRendererProviderDescriptor(selection?: ForgeProvidersConfig['renderer']): RendererProviderDescriptor;
export declare function probeRendererCapabilities<T>(descriptor: RendererProviderDescriptor, options?: unknown, environment?: unknown): Promise<T>;
export declare function resolvePublicAssetUrl(assetPath: string): string;
export declare function selectPointShadowCubeFace(direction: ArrayLike<number>): number;
