import type { GraphicsBackendDescriptor } from 'forgeng/contracts/render-composition';
export declare const WEBGPU_COMPOSITION_BACKEND_ID: 'forgeng.backend:webgpu-composition';
export declare const WEBGPU_COMPOSITION_CAPABILITY: 'forgeng.render:webgpu-composition';
export declare const WEBGPU_FRAME_INTEROP_CAPABILITY: 'forgeng.render:webgpu-frame-interop';
export interface WebGpuCompositionBackendOptions {
    readonly canvas: HTMLCanvasElement | OffscreenCanvas;
    readonly gpu?: GPU;
    readonly format?: GPUTextureFormat;
    readonly alphaMode?: GPUCanvasAlphaMode;
    readonly powerPreference?: GPUPowerPreference;
    readonly maximumPixelRatio?: number;
    readonly onDeviceLost?: (reason: string) => void;
    readonly onDeviceReady?: (generation: number, device: GPUDevice, format: GPUTextureFormat) => void;
}
export interface WebGpuCompositionBackendSnapshot {
    readonly snapshotVersion: 1;
    readonly generation: number;
    readonly state: 'created' | 'ready' | 'destroyed';
    readonly submittedFrames: number;
    readonly presentedFrames: number;
    readonly uncapturedErrors: number;
    readonly commands: number;
}
export interface WebGpuCompositionBackendDescriptor extends GraphicsBackendDescriptor {
    getInstances(): readonly Readonly<{
        inspect(): WebGpuCompositionBackendSnapshot;
    }>[];
}
export declare function createWebGpuCompositionBackendDescriptor(options: WebGpuCompositionBackendOptions): WebGpuCompositionBackendDescriptor;
export { createWebGpuCompositionBackendDescriptor as webGpuBackend };
