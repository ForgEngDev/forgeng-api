import type { NeutralLifetimeSignal } from '../scene';
import type { JsonValue } from '../render-composition';
export declare const FORGE_PLUGIN_V2_API_VERSION: 2;
export declare const FORGE_PLUGIN_RENDER_2D_CAPABILITY: 'forgeng.plugin:render-2d';
export interface ForgePluginRender2dSnapshotV1 {
    readonly snapshotVersion: 1;
    readonly requestedDomainIds: readonly string[];
    readonly activeDomainIds: readonly string[];
    readonly backendGeneration: number;
    readonly capabilities: readonly string[];
}
/** Read-only 2D access. It deliberately exposes no native or mutable renderer handle. */
export interface ForgePluginRender2dAccessV1 {
    readonly apiVersion: 1;
    hasCapability(id: string): boolean;
    snapshot(): ForgePluginRender2dSnapshotV1;
}
export interface ForgePluginV2CapabilityRequest {
    readonly id: string;
    readonly optional?: boolean;
}
export interface ForgePluginV2Context {
    readonly pluginId: string;
    readonly signal: NeutralLifetimeSignal;
    has(id: string): boolean;
    get<T>(id: string): T;
    getOptional<T>(id: string): T | undefined;
    snapshot(): Readonly<Record<string, JsonValue>>;
}
export interface ForgePluginV2Descriptor {
    readonly apiVersion: typeof FORGE_PLUGIN_V2_API_VERSION;
    readonly id: string;
    readonly capabilities?: readonly ForgePluginV2CapabilityRequest[];
    initialize(context: ForgePluginV2Context): void | Promise<void>;
    fixedUpdate?(dt: number, steps: number): void;
    frameUpdate?(dt: number, alpha: number): void;
    destroy?(): void | Promise<void>;
}
