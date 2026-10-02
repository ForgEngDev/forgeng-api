import type { GraphicsBackendDescriptor, RenderCompositionDescriptor, RenderDomainDescriptor, SurfaceSnapshot } from 'forgeng/contracts/render-composition';
export * from 'forgeng/contracts/render-composition';
export interface WebGpuRender3dCamera {
    readonly id: string;
    readonly viewProjection: readonly number[];
}
export interface WebGpuRender3dMeshProduct {
    readonly id: string;
    readonly vertices: readonly number[];
}
export interface WebGpuRender3dPreparedScene {
    readonly sceneId: string;
    readonly sceneGeneration: number;
    readonly camera: WebGpuRender3dCamera;
    readonly meshes: readonly WebGpuRender3dMeshProduct[];
    destroy?(): void | Promise<void>;
}
export interface WebGpuRender3dSceneSource {
    prepare(context: Readonly<{
        sceneId: string;
        backendGeneration: number;
        surface: SurfaceSnapshot;
    }>): WebGpuRender3dPreparedScene | Promise<WebGpuRender3dPreparedScene>;
}
export interface WebGpuRender3dCompositionOptions {
    readonly id?: string;
    readonly required?: boolean;
    readonly before?: readonly string[];
    readonly after?: readonly string[];
    readonly enabledByDefault?: boolean;
    readonly sceneIds?: readonly string[];
    readonly source: WebGpuRender3dSceneSource;
    readonly surfaceLoad?: 'clear' | 'load';
    readonly clearColor?: readonly [
        number,
        number,
        number,
        number
    ];
    readonly toneMapping?: 'none' | 'aces';
    readonly failAt?: 'create' | 'attach' | 'prepare' | 'contribute' | 'recover' | readonly ('create' | 'attach' | 'prepare' | 'contribute' | 'recover')[];
}
export interface WebGpuRender3dCompositionDescriptor extends RenderDomainDescriptor {
    getInstances(): readonly Readonly<{
        inspect(): unknown;
    }>[];
}
export declare function createWebGpuRender3dCompositionDomain(options: WebGpuRender3dCompositionOptions): WebGpuRender3dCompositionDescriptor;
export interface DefineRenderCompositionOptions {
    readonly id: string;
    readonly backend: GraphicsBackendDescriptor;
    readonly domains: readonly RenderDomainDescriptor[];
    readonly optionalDomainFailurePolicy?: RenderCompositionDescriptor['optionalDomainFailurePolicy'];
}
export declare function defineRenderComposition(options: DefineRenderCompositionOptions): RenderCompositionDescriptor;
