import { type ForgeCoreGame, type AnimationProviderDescriptor, type AudioProviderDescriptor, type ForgeCreateBootOptions, type ForgeCreateRenderOptions, type ForgeCreateSizeOptions, type ForgeLogger, type ForgeLoggingOptions, type ForgePluginDescriptor, type ForgeSceneInput, type GameLoopConfig, type InputProviderDescriptor, type PhysicsProviderDescriptor, type RendererProviderDescriptor, type StorageProviderDescriptor, type UiShellProviderDescriptor, type AssetsProviderSelection, type ForgeAssetsConfig, type AssetSourceProviderDescriptor } from 'forgeng/core';
export declare const FORGE_ADVANCED_LIFECYCLE_POLICY: Readonly<{
    readonly ownership: 'game';
    readonly deviceLoss: 'caller-recreate';
}>;
export interface ForgeAdvancedStorageConfiguration {
    readonly provider: 'memory' | 'disabled' | StorageProviderDescriptor<unknown>;
    readonly applicationNamespace?: string;
}
export interface ForgeAdvancedProviderSelections {
    readonly renderer: RendererProviderDescriptor;
    readonly physics: PhysicsProviderDescriptor<unknown>;
    readonly audio: 'disabled' | AudioProviderDescriptor<unknown>;
    readonly ui: 'disabled' | UiShellProviderDescriptor<unknown>;
    readonly input: InputProviderDescriptor<unknown>;
    readonly storage: 'memory' | 'disabled' | StorageProviderDescriptor<unknown> | ForgeAdvancedStorageConfiguration;
    readonly animation: 'disabled' | AnimationProviderDescriptor<unknown>;
    readonly assets?: Exclude<AssetsProviderSelection, 'default'> | AssetSourceProviderDescriptor<unknown>;
}
export interface ForgeAdvancedCreateDefinition {
    readonly canvas: HTMLCanvasElement;
    readonly size?: ForgeCreateSizeOptions;
    readonly render?: ForgeCreateRenderOptions;
    readonly scenes?: readonly ForgeSceneInput[];
    readonly boot?: ForgeCreateBootOptions;
    readonly gameLoop?: GameLoopConfig;
    readonly logging?: ForgeLoggingOptions;
    readonly providers: ForgeAdvancedProviderSelections;
    readonly assets?: ForgeAssetsConfig;
    readonly plugins?: readonly ForgePluginDescriptor[];
    readonly lifecycle: typeof FORGE_ADVANCED_LIFECYCLE_POLICY;
}
export interface ForgeAdvancedRuntimeAccess {
    readonly tier: 'advanced-supported';
    readonly lifecycle: typeof FORGE_ADVANCED_LIFECYCLE_POLICY;
    readonly game: ForgeCoreGame;
    readonly engine: ForgeCoreGame['engine'];
}
export declare function defineAdvancedCreate(definition: ForgeAdvancedCreateDefinition): Readonly<ForgeAdvancedCreateDefinition>;
export declare function create(definition: ForgeAdvancedCreateDefinition): Promise<ForgeAdvancedRuntimeAccess>;
export declare const ForgEngAdvanced: Readonly<{
    tier: 'advanced-supported';
    lifecycle: Readonly<{
        readonly ownership: 'game';
        readonly deviceLoss: 'caller-recreate';
    }>;
    create: typeof create;
    defineCreate: typeof defineAdvancedCreate;
}>;
export default ForgEngAdvanced;
export type ForgeAdvancedLogger = ForgeLogger;
