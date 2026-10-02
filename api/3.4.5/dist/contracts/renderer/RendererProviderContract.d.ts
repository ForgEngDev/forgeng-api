export declare const RENDERER_PROVIDER_API_VERSION: 1;
/** The only renderer mode implemented by the v1 provider contract. */
export type RendererProviderMode = '3d';
export type RendererInitializationProgress = (label: string, totalMs: number) => void;
export type RendererBackendLifecycleState = 'created' | 'initializing-platform' | 'platform-ready' | 'initializing-renderer' | 'ready' | 'destroying' | 'destroyed' | 'failed';
export type RendererBackendOperation = 'initialize-platform' | 'initialize-renderer';
export type RendererProviderLifecycleErrorCode = 'backend-destroyed';
export interface RendererSurface {
    readonly width: number;
    readonly height: number;
}
export interface RendererSurfaceSize {
    readonly width: number;
    readonly height: number;
}
export interface RendererHostSettings {
    readonly shadowBackendId?: string | null;
    readonly shadowAdaptiveCanary?: boolean;
    readonly shadowAdaptiveDefault?: boolean;
    readonly shadowClassicFallbackEnabled?: boolean;
    readonly shadowClassicDeprecationNotice?: boolean;
    readonly observabilityProfile?: 'off' | 'production-lite' | 'diagnostic' | 'lab';
    readonly gpuTimingEnabled?: boolean;
    readonly gpuTimingKillSwitch?: boolean;
}
export interface RendererProviderHostContext {
    readonly surface: RendererSurface;
    readonly logger?: import('../logging').ForgeLogger;
    readonly settings: RendererHostSettings;
}
export interface RendererUpdateCommand {
    readonly dt: number;
    readonly steps: number;
    readonly activeSceneName: string | null;
}
export interface RendererFrameMetadata {
    readonly surface: RendererSurfaceSize;
    readonly activeSceneName: string | null;
    readonly drawCalls: number;
    readonly vertices: number;
    readonly triangles: number;
}
export interface RendererFrameCommand {
    readonly dt: number;
    readonly alpha: number;
    readonly clearColor: Readonly<{
        r: number;
        g: number;
        b: number;
        a: number;
    }>;
    readonly frame: RendererFrameMetadata;
}
export interface RendererEnginePlatformContract {
    init(): void | Promise<void>;
    destroy(): void | Promise<void>;
    getSurfaceSize(): RendererSurfaceSize;
    resize(width: number, height: number): void;
}
export interface RendererEngineRuntimeContract<TUpdateCommand extends RendererUpdateCommand = RendererUpdateCommand, TFrameCommand extends RendererFrameCommand = RendererFrameCommand> {
    init(): void | Promise<void>;
    destroy(): void | Promise<void>;
    update(command: TUpdateCommand): void;
    render(command: TFrameCommand): void;
    setClearColor(r: number, g: number, b: number, a?: number): void;
    getClearColor(): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
}
export declare class RendererProviderLifecycleError extends Error {
    readonly code: RendererProviderLifecycleErrorCode;
    readonly operation: RendererBackendOperation;
    readonly backendId: string;
    constructor(code: RendererProviderLifecycleErrorCode, operation: RendererBackendOperation, backendId: string, message: string);
}
/** Lifecycle owned by a renderer provider instance, independent of its graphics API. */
export interface RendererBackendContract<TPlatform extends RendererEnginePlatformContract = RendererEnginePlatformContract, TRuntime extends RendererEngineRuntimeContract = RendererEngineRuntimeContract> {
    readonly id: string;
    readonly mode: RendererProviderMode;
    readonly state: RendererBackendLifecycleState;
    readonly platform: TPlatform;
    readonly runtime: TRuntime;
    initializePlatform(): Promise<void>;
    initializeRenderer(progress?: RendererInitializationProgress): Promise<void>;
    /** Idempotent retained cleanup. Calls after initialization failure remain valid. */
    destroy(): Promise<void>;
}
/**
 * Neutral renderer slot contract. Concrete providers specialize all platform,
 * capability and creation types without leaking them into the kernel contract.
 */
export interface RendererProviderContract<TCapabilityOptions = unknown, TCapabilityEnvironment = unknown, TCapabilitySnapshot = unknown, TCreateContext = RendererProviderHostContext, TBackend extends RendererBackendContract = RendererBackendContract> {
    readonly apiVersion: typeof RENDERER_PROVIDER_API_VERSION;
    readonly id: string;
    readonly mode: RendererProviderMode;
    probeCapabilities(options?: TCapabilityOptions, environment?: TCapabilityEnvironment): Promise<TCapabilitySnapshot>;
    create(context: TCreateContext): TBackend;
}
/** Public SDK selection token for a runtime-validated renderer provider. */
export type RendererProviderDescriptor = RendererProviderContract;
