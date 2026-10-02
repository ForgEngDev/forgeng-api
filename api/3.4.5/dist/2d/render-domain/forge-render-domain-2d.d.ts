import type { AssetAcquireOptions, AssetId, AssetLease } from 'forgeng/contracts/assets';
import type { NormalizedRender2dDefinition, Render2dColor, Render2dDomainInspectionSnapshotV1, Render2dInspectionOptions, Render2dSceneAttachment } from 'forgeng/contracts/2d';
import type { RenderDomainDescriptor, RenderDomainRuntime, SurfaceSnapshot } from 'forgeng/contracts/render-composition';
export declare const WEBGPU_RENDER_2D_DOMAIN_ID: 'forgeng.render:webgpu-2d';
export interface WebGpuRender2dCancellation {
    readonly cancelled: boolean;
    readonly reason: unknown;
    throwIfCancelled(): void;
    subscribe(listener: (reason: unknown) => void): () => void;
}
export interface WebGpuRender2dPreparedScene {
    readonly sceneId: string;
    readonly sceneGeneration: number;
    readonly definition: NormalizedRender2dDefinition;
    readonly attachment: Render2dSceneAttachment;
    destroy?(): void | Promise<void>;
}
export interface WebGpuRender2dSceneSource {
    prepare(context: Readonly<{
        sceneId: string;
        backendGeneration: number;
        surface: SurfaceSnapshot;
        cancellation: WebGpuRender2dCancellation;
    }>): WebGpuRender2dPreparedScene | Promise<WebGpuRender2dPreparedScene>;
}
export interface WebGpuRender2dAssetSource {
    acquire<TValue>(reference: AssetId, options?: AssetAcquireOptions): Promise<AssetLease<TValue>>;
    recover?(generation: number, options?: AssetAcquireOptions): Promise<void>;
}
export type WebGpuRender2dFailurePoint = 'create' | 'probe' | 'attach' | 'shader-module' | 'bind-group-layout' | 'pipeline-layout' | 'pipeline' | 'sampler' | 'fallback-texture' | 'camera-buffer' | 'instance-buffer' | 'prepare' | 'extract' | 'encode' | 'submit-result' | 'loss' | 'recover' | 'detach' | 'destroy';
export interface WebGpuRender2dOptions {
    readonly id?: string;
    readonly required?: boolean;
    readonly before?: readonly string[];
    readonly after?: readonly string[];
    readonly enabledByDefault?: boolean;
    readonly sceneIds?: readonly string[];
    readonly surfacePhase?: 'background' | 'world' | 'overlay';
    readonly surfaceLoad?: 'clear' | 'load';
    readonly surfaceAlpha?: 'opaque' | 'premultiplied';
    readonly source: WebGpuRender2dSceneSource;
    readonly assets?: WebGpuRender2dAssetSource;
    readonly clearColor?: Render2dColor;
    readonly maximumPixelRatio?: number;
    readonly customShaderSources?: Readonly<Record<string, string>>;
    readonly customMaterialFallback?: 'reject' | 'builtin-sprite';
    readonly textCacheRuns?: number;
    readonly inspection?: Render2dInspectionOptions;
    readonly failAt?: WebGpuRender2dFailurePoint | readonly WebGpuRender2dFailurePoint[];
}
export interface WebGpuRender2dDomainDescriptor extends RenderDomainDescriptor {
    create(): RenderDomainRuntime;
    getInstances(): readonly Readonly<{
        id: number;
        inspect(): unknown;
        inspect2d(): Render2dDomainInspectionSnapshotV1;
        getFrames(): readonly unknown[];
    }>[];
}
export declare function createWebGpuRender2dDomainDescriptor(options: WebGpuRender2dOptions): WebGpuRender2dDomainDescriptor;
export { createWebGpuRender2dDomainDescriptor as renderDomain2d };
