import type { Render2dMaterialDescriptor } from 'forgeng/contracts/2d';
import type { WebGpuFrameAccessV1, WebGpuFrameExtensionV1, WebGpuBackendInteropV1 } from 'forgeng/contracts/render-composition';
export declare const WEBGPU_RENDER_2D_EXTENSION_API_VERSION: 1;
export declare const WEBGPU_RENDER_2D_MATERIAL_SOURCE_LIMIT: 65536;
export declare const WEBGPU_FRAME_INTEROP_EXTENSION: 'forgeng.render:webgpu-frame-v1';
export declare const WEBGPU_RENDER_2D_SPRITE_BINDINGS_V1: readonly Readonly<{
    group: 0;
    binding: 0 | 1 | 2 | 3 | 4;
    role: string;
}>[];
export type WebGpuRender2dFrameAccessV1 = WebGpuFrameAccessV1<GPUDevice, GPUCommandEncoder, GPUTextureView, GPUTextureFormat>;
export type WebGpuRender2dFrameExtensionV1 = WebGpuFrameExtensionV1<GPUDevice, GPUCommandEncoder, GPUTextureView, GPUTextureFormat>;
export interface WebGpuRender2dInterop extends WebGpuBackendInteropV1 {
    requestExtension<T>(id: typeof WEBGPU_FRAME_INTEROP_EXTENSION, version: 1): T | undefined;
}
export interface WebGpuRender2dShaderValidationSnapshotV1 {
    readonly snapshotVersion: 1;
    readonly materialId: string;
    readonly sourceBytes: number;
    readonly vertexEntry: string;
    readonly fragmentEntry: string;
    readonly bindings: typeof WEBGPU_RENDER_2D_SPRITE_BINDINGS_V1;
}
export declare function validateWebGpuRender2dSpriteShaderV1(material: Render2dMaterialDescriptor, source: string): WebGpuRender2dShaderValidationSnapshotV1;
