import type { ForgePluginDescriptor } from 'forgeng';
import type { ForgeLoggingOptions } from 'forgeng';
import type { GameLoopConfig } from 'forgeng';
import type { RendererFeatureGroup } from 'forgeng';
import type { RenderQualityProfile } from 'forgeng';
import type { ShadowBackendId } from 'forgeng';
import type { ForgeCanvasLayoutMode } from 'forgeng/core';
import type { ForgeSceneInput } from 'forgeng/core';
import { type ForgeProvidersConfig, type ForgeAssetsConfig } from 'forgeng';
export type V2CanvasTarget = string | HTMLCanvasElement;
export type V2BootStartPolicy = 'automatic' | 'manual';
export type V2DeviceLossPolicy = 'recover' | 'fail';
export type V2ObservabilityProfile = 'off' | 'production-lite' | 'diagnostic' | 'lab';
export interface V2CanvasComposition {
    readonly target?: V2CanvasTarget;
    readonly id?: string;
    readonly layout?: ForgeCanvasLayoutMode;
}
export interface V2DisplayComposition {
    readonly width?: number;
    readonly height?: number;
    readonly pixelRatio?: number;
    readonly maxPixelRatio?: number;
    readonly autoResize?: boolean;
}
export interface V2BootComposition {
    readonly scenes?: readonly ForgeSceneInput[];
    readonly initialScene?: string;
    readonly start?: V2BootStartPolicy;
}
export interface V2ShadowComposition {
    readonly backend?: ShadowBackendId;
    readonly adaptiveCanary?: boolean;
    readonly adaptiveDefault?: boolean;
    readonly classicFallback?: boolean;
    readonly classicDeprecationNotice?: boolean;
}
export interface V2RendererObservabilityComposition {
    readonly profile?: V2ObservabilityProfile;
    readonly gpuTimingEnabled?: boolean;
    readonly gpuTimingKillSwitch?: boolean;
    readonly sessionId?: string;
    readonly buildId?: string;
    readonly workloadId?: string;
    readonly workloadVersion?: string;
}
export interface V2RendererComposition {
    readonly backgroundColor?: string;
    readonly startupProfile?: RenderQualityProfile;
    readonly shadows?: V2ShadowComposition;
    readonly observability?: V2RendererObservabilityComposition;
}
export interface V2FeatureComposition {
    readonly plugins?: readonly ForgePluginDescriptor[];
    readonly rendererGroups?: readonly RendererFeatureGroup[];
}
export interface V2DiagnosticsComposition {
    readonly logging?: ForgeLoggingOptions;
}
export interface V2LifecycleComposition {
    readonly ownership?: 'game';
    readonly stop?: 'drain';
    readonly destroy?: 'aggregate';
    readonly deviceLoss?: V2DeviceLossPolicy;
    readonly loop?: GameLoopConfig;
}
/**
 * Frozen grouped-composition input retained for ForgeNG 2.x compatibility.
 *
 * @deprecated Since ForgeNG 2.5.0. Use `ForgeCreateOptions` from `forgeng`.
 * Supported through 3.x; removable no earlier than 4.0.0.
 */
export interface V2CompositionDefinition {
    readonly canvas?: V2CanvasComposition;
    readonly display?: V2DisplayComposition;
    readonly boot?: V2BootComposition;
    readonly renderer?: V2RendererComposition;
    readonly providers?: ForgeProvidersConfig;
    readonly assets?: ForgeAssetsConfig;
    readonly features?: V2FeatureComposition;
    readonly diagnostics?: V2DiagnosticsComposition;
    readonly lifecycle?: V2LifecycleComposition;
}
/**
 * @deprecated Since ForgeNG 2.5.0. Use the canonical configuration surface
 * from `forgeng`. Supported through 3.x; removable no earlier than 4.0.0.
 */
export interface V2ResolvedComposition {
    readonly canvas: Readonly<Required<Pick<V2CanvasComposition, 'layout'>> & Omit<V2CanvasComposition, 'layout'>>;
    readonly display: Readonly<Required<Omit<V2DisplayComposition, 'pixelRatio'>> & Pick<V2DisplayComposition, 'pixelRatio'>>;
    readonly boot: Readonly<Required<Pick<V2BootComposition, 'scenes' | 'start'>> & Pick<V2BootComposition, 'initialScene'>>;
    readonly renderer: Readonly<Required<Omit<V2RendererComposition, 'shadows' | 'observability'>> & {
        readonly shadows: Readonly<V2ShadowComposition>;
        readonly observability: Readonly<Required<Pick<V2RendererObservabilityComposition, 'profile' | 'gpuTimingEnabled' | 'gpuTimingKillSwitch'>> & Pick<V2RendererObservabilityComposition, 'sessionId' | 'buildId' | 'workloadId' | 'workloadVersion'>>;
    }>;
    readonly providers: Readonly<ForgeProvidersConfig>;
    readonly assets: Readonly<ForgeAssetsConfig>;
    readonly features: Readonly<Required<V2FeatureComposition>>;
    readonly diagnostics: Readonly<Required<V2DiagnosticsComposition>>;
    readonly lifecycle: Readonly<Required<Omit<V2LifecycleComposition, 'loop'>> & Pick<V2LifecycleComposition, 'loop'>>;
}
/**
 * @deprecated Since ForgeNG 2.5.0. New defaults belong to `forgeng`; this
 * compatibility snapshot is frozen through 3.x and removable no earlier than
 * 4.0.0.
 */
export declare const V2_COMPOSITION_DEFAULTS: Readonly<{
    canvas: Readonly<{
        layout: 'fixed';
    }>;
    display: Readonly<{
        width: 1280;
        height: 720;
        maxPixelRatio: 2;
        autoResize: true;
    }>;
    boot: Readonly<{
        scenes: readonly ForgeSceneInput[];
        start: 'automatic';
    }>;
    renderer: Readonly<{
        backgroundColor: "#05070d";
        startupProfile: 'Balanced';
        shadows: Readonly<{
            adaptiveCanary: false;
            adaptiveDefault: false;
            classicFallback: true;
            classicDeprecationNotice: false;
        }>;
        observability: Readonly<{
            profile: 'production-lite';
            gpuTimingEnabled: false;
            gpuTimingKillSwitch: false;
            sessionId: undefined;
            buildId: undefined;
            workloadId: undefined;
            workloadVersion: undefined;
        }>;
    }>;
    providers: Readonly<ForgeProvidersConfig>;
    assets: Readonly<ForgeAssetsConfig>;
    features: Readonly<{
        plugins: readonly ForgePluginDescriptor[];
        rendererGroups: readonly RendererFeatureGroup[];
    }>;
    diagnostics: Readonly<{
        logging: ForgeLoggingOptions;
    }>;
    lifecycle: Readonly<{
        ownership: 'game';
        stop: 'drain';
        destroy: 'aggregate';
        deviceLoss: 'fail';
    }>;
}>;
/**
 * @deprecated Since ForgeNG 2.5.0. Use the canonical `forgeng` configuration
 * surface. Supported through 3.x; removable no earlier than 4.0.0.
 */
export declare function defineV2Composition(definition: V2CompositionDefinition): V2ResolvedComposition;
