export declare const RENDER_COMPOSITION_API_VERSION: 1;
export declare const RENDER_DOMAIN_PROVIDER_API_VERSION: 1;
export declare const WEBGPU_FRAME_INTEROP_CAPABILITY: 'forgeng.render:webgpu-frame';
export declare const WEBGPU_FRAME_INTEROP_EXTENSION: 'forgeng.render:webgpu-frame-v1';
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | readonly JsonValue[] | {
    readonly [key: string]: JsonValue;
};
export type RenderCapabilityId = string;
export type BackendGeneration = number;
/**
 * Bounded, additive startup telemetry shared by orchestration and render providers.
 * A sink is optional: callers that do not request it execute no tracing work.
 */
export type StartupTraceLaneV1 = 'cold' | 'warm' | 'unspecified';
export type StartupTraceCompletionV1 = 'running' | 'complete' | 'failed' | 'cancelled';
export type StartupTraceAttributeV1 = string | number | boolean;
export interface StartupTraceSpanSnapshotV1 {
    readonly snapshotVersion: 1;
    readonly sequence: number;
    readonly id: string;
    readonly owner: string;
    readonly parentId: string | null;
    readonly startedAtMs: number;
    readonly endedAtMs: number | null;
    readonly durationMs: number | null;
    readonly completion: StartupTraceCompletionV1;
    readonly attributes: Readonly<Record<string, StartupTraceAttributeV1>>;
}
export interface StartupTraceSnapshotV1 {
    readonly snapshotVersion: 1;
    readonly lane: StartupTraceLaneV1;
    readonly startedAtMs: number;
    readonly endedAtMs: number | null;
    readonly durationMs: number | null;
    readonly spans: readonly StartupTraceSpanSnapshotV1[];
    readonly spanCount: number;
    readonly droppedSpans: number;
    readonly completion: StartupTraceCompletionV1;
    readonly coverage: Readonly<{
        readonly assignedMs: number;
        readonly residualMs: number;
        readonly assignedPercent: number;
    }>;
}
export interface StartupTraceSpanV1 {
    end(completion?: Exclude<StartupTraceCompletionV1, 'running'>, attributes?: Readonly<Record<string, StartupTraceAttributeV1>>): void;
}
export interface StartupTraceSinkV1 {
    readonly apiVersion: 1;
    start(id: string, owner: string, parentId?: string, attributes?: Readonly<Record<string, StartupTraceAttributeV1>>): StartupTraceSpanV1;
    finish(completion?: Exclude<StartupTraceCompletionV1, 'running'>): void;
    inspect(): StartupTraceSnapshotV1;
}
export type GraphicsBackendLifecycleState = 'created' | 'initializing' | 'ready' | 'lost' | 'recovering' | 'failed' | 'destroying' | 'destroyed';
export type RenderDomainLifecycleState = 'created' | 'attaching' | 'ready' | 'disabled' | 'failed' | 'destroying' | 'destroyed';
export type CompositorLifecycleState = 'created' | 'initializing' | 'ready' | 'framing' | 'lost' | 'recovering' | 'failed' | 'destroying' | 'destroyed';
export interface SurfaceSnapshot {
    readonly snapshotVersion: 1;
    readonly revision: number;
    readonly logicalWidth: number;
    readonly logicalHeight: number;
    readonly physicalWidth: number;
    readonly physicalHeight: number;
    readonly pixelRatio: number;
    /** Logical CSS-pixel insets in left, top, right, bottom order. */
    readonly safeArea?: readonly [
        number,
        number,
        number,
        number
    ];
    readonly visible: boolean;
}
export interface RenderCapabilitySnapshot {
    readonly id: RenderCapabilityId;
    readonly version: number;
    readonly extensions?: Readonly<Record<string, JsonValue>>;
}
export interface RenderRequirement {
    readonly capability: RenderCapabilityId;
    readonly minimumVersion?: number;
    readonly optional?: boolean;
}
export interface RenderOrderingConstraints {
    readonly before?: readonly string[];
    readonly after?: readonly string[];
}
export type RenderSurfacePhase = 'background' | 'world' | 'overlay';
/** Declarative surface contract. Domains still own all resources they encode. */
export interface RenderSurfaceInteraction {
    readonly target: 'surface';
    readonly phase: RenderSurfacePhase;
    readonly alpha: 'opaque' | 'premultiplied';
    readonly colorSpace: 'srgb';
    readonly colorLoad: 'clear' | 'load';
    readonly colorStore: 'store';
    readonly depth: 'none' | 'domain-private';
}
/** A scene filter never transfers resource ownership between render domains. */
export interface RenderDomainAttachmentPolicy {
    readonly enabledByDefault?: boolean;
    readonly sceneIds?: readonly string[];
}
export interface RenderFrameMetadata {
    readonly snapshotVersion: 1;
    readonly frame: number;
    readonly simulationTick: number;
    readonly dt: number;
    readonly alpha: number;
    readonly backendGeneration: BackendGeneration;
    readonly sceneId: string | null;
    readonly surface: SurfaceSnapshot;
    readonly extensions?: Readonly<Record<string, JsonValue>>;
}
export interface RenderCommand {
    readonly domainId: string;
    readonly type: string;
    readonly payload?: JsonValue;
}
export interface GraphicsFrameTransaction {
    readonly metadata: RenderFrameMetadata;
    add(command: RenderCommand): void;
    abort?(reason: unknown): void;
}
export interface GraphicsBackendRuntime {
    initialize(): void | Promise<void>;
    resize(surface: SurfaceSnapshot): void;
    beginFrame(metadata: RenderFrameMetadata): GraphicsFrameTransaction;
    submit(transaction: GraphicsFrameTransaction): void;
    present(): void;
    getInterop?(): WebGpuBackendInteropV1 | undefined;
    recover?(): void | Promise<void>;
    destroy(): void | Promise<void>;
}
export interface GraphicsBackendCreateContext {
    readonly generation: BackendGeneration;
    readonly surface: SurfaceSnapshot;
}
export interface GraphicsBackendDescriptor {
    readonly apiVersion: typeof RENDER_COMPOSITION_API_VERSION;
    readonly id: string;
    readonly capabilities: readonly RenderCapabilitySnapshot[];
    create(context: GraphicsBackendCreateContext): GraphicsBackendRuntime | Promise<GraphicsBackendRuntime>;
}
export interface RenderDomainAttachmentContext {
    readonly domainId: string;
    readonly backendId: string;
    readonly backendGeneration: BackendGeneration;
    readonly capabilities: readonly RenderCapabilitySnapshot[];
    readonly sceneId: string | null;
    readonly surface?: SurfaceSnapshot;
    readonly backendInterop?: WebGpuBackendInteropV1;
}
export interface RenderDomainFrameContext {
    readonly frame: GraphicsFrameTransaction;
    readonly metadata: RenderFrameMetadata;
}
export interface RenderDomainSubmitResult {
    readonly snapshotVersion: 1;
    readonly frame: number;
    readonly backendGeneration: BackendGeneration;
    readonly submitted: boolean;
    readonly presented: boolean;
    readonly errorCode?: string;
}
export interface RenderDomainLossContext {
    readonly snapshotVersion: 1;
    readonly backendGeneration: BackendGeneration;
    readonly reason: string;
}
export interface RenderDomainRecoveryContext {
    readonly snapshotVersion: 1;
    readonly previousBackendGeneration: BackendGeneration;
    readonly backendGeneration: BackendGeneration;
    readonly capabilities: readonly RenderCapabilitySnapshot[];
}
export interface RenderDomainRuntime {
    attach(context: RenderDomainAttachmentContext): void | Promise<void>;
    contribute(context: RenderDomainFrameContext): void;
    resize?(surface: SurfaceSnapshot): void;
    submitResult?(result: RenderDomainSubmitResult): void;
    lose?(context: RenderDomainLossContext): void;
    recover?(context: RenderDomainRecoveryContext): void | Promise<void>;
    switchScene?(sceneId: string | null): void | Promise<void>;
    detach?(): void | Promise<void>;
    destroy(): void | Promise<void>;
}
export interface RenderDomainDescriptor {
    readonly apiVersion: typeof RENDER_COMPOSITION_API_VERSION;
    readonly id: string;
    readonly required?: boolean;
    readonly requirements?: readonly RenderRequirement[];
    readonly order?: RenderOrderingConstraints;
    readonly surface?: RenderSurfaceInteraction;
    readonly attachment?: RenderDomainAttachmentPolicy;
    /** Present only for domains published through the versioned extension API. */
    readonly provider?: RenderDomainProviderMetadataV1;
    /** Immutable descriptor-level ownership snapshot for tooling and conformance. */
    getProviderSnapshot?(): RenderDomainProviderSnapshotV1;
    create(): RenderDomainRuntime | Promise<RenderDomainRuntime>;
}
export interface RenderDomainProviderLimitsV1 {
    readonly maxCommandsPerFrame: number;
    readonly maxOwnedResources: number;
    readonly maxTrackedBytes: number;
    readonly maxTargets: number;
}
export interface RenderDomainProviderTargetRulesV1 {
    readonly surface: boolean;
    readonly offscreen: boolean;
    readonly formats: readonly string[];
}
export interface RenderDomainProviderLifecycleRulesV1 {
    readonly instanceOwnership: 'fresh-per-composition';
    readonly generationOwnership: 'compositor';
    readonly cleanup: 'reverse-aggregate';
    readonly nativeAccess: 'backend-extension-only';
}
/** Neutral, serializable metadata. Native backend objects are never valid here. */
export interface RenderDomainProviderMetadataV1 {
    readonly apiVersion: typeof RENDER_DOMAIN_PROVIDER_API_VERSION;
    readonly id: string;
    readonly kind: '2d' | '3d' | 'custom';
    readonly capabilities: readonly RenderCapabilitySnapshot[];
    readonly limits: RenderDomainProviderLimitsV1;
    readonly targets: RenderDomainProviderTargetRulesV1;
    readonly lifecycle: RenderDomainProviderLifecycleRulesV1;
}
export interface RenderDomainProviderSnapshotV1 {
    readonly snapshotVersion: 1;
    readonly providerId: string;
    readonly domainId: string;
    readonly instancesCreated: number;
    readonly liveInstances: number;
    readonly destroyedInstances: number;
    readonly failures: number;
}
export interface RenderDomainProviderDescriptorV1 extends RenderDomainDescriptor {
    readonly provider: RenderDomainProviderMetadataV1;
    getProviderSnapshot(): RenderDomainProviderSnapshotV1;
}
export type OptionalDomainFailurePolicy = 'disable-domain' | 'fail-composition';
export interface RenderCompositionDescriptor {
    readonly apiVersion: typeof RENDER_COMPOSITION_API_VERSION;
    readonly id: string;
    readonly backend: GraphicsBackendDescriptor;
    readonly domains: readonly RenderDomainDescriptor[];
    readonly optionalDomainFailurePolicy?: OptionalDomainFailurePolicy;
}
export interface GraphicsBackendSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly generation: BackendGeneration;
    readonly state: GraphicsBackendLifecycleState;
    readonly capabilities: readonly RenderCapabilitySnapshot[];
}
export interface RenderDomainSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly required: boolean;
    readonly state: RenderDomainLifecycleState;
    readonly enabled: boolean;
    readonly sceneAttached: boolean;
    readonly active: boolean;
    readonly failureCode?: string;
}
export interface RenderCompositionSnapshot {
    readonly snapshotVersion: 1;
    readonly id: string;
    readonly state: CompositorLifecycleState;
    readonly requestedDomainIds: readonly string[];
    readonly effectiveDomainIds: readonly string[];
    readonly committedDomainIds: readonly string[];
    readonly activeDomainIds: readonly string[];
    readonly backend: GraphicsBackendSnapshot;
    readonly domains: readonly RenderDomainSnapshot[];
    readonly frame: number;
    readonly presentations: number;
    readonly sceneId: string | null;
}
export interface RenderCompatibilityRejection {
    readonly code: 'RC_CAPABILITY_MISSING' | 'RC_CAPABILITY_VERSION_UNSUPPORTED';
    readonly path: string;
    readonly domainId: string;
    readonly capability: string;
    readonly requestedVersion: number;
    readonly availableVersion: number | null;
}
export interface RenderCompatibilityResult {
    readonly compatible: boolean;
    readonly rejections: readonly RenderCompatibilityRejection[];
}
/** Versioned interop value; native handles are opaque unless a backend subpath specializes them. */
export interface WebGpuBackendInteropV1 {
    readonly apiVersion: 1;
    readonly generation: BackendGeneration;
    readonly capabilities: readonly RenderCapabilitySnapshot[];
    requestExtension<T>(id: string, version: number): T | undefined;
}
/** Neutral shape specialized with native WebGPU types only inside WebGPU packages. */
export interface WebGpuFrameAccessV1<TDevice = unknown, TCommandEncoder = unknown, TTextureView = unknown, TTextureFormat = string> {
    readonly apiVersion: 1;
    readonly frame: number;
    readonly generation: BackendGeneration;
    readonly device: TDevice;
    readonly encoder: TCommandEncoder;
    readonly colorView: TTextureView;
    readonly format: TTextureFormat;
    readonly physicalWidth: number;
    readonly physicalHeight: number;
}
export interface WebGpuFrameExtensionV1<TDevice = unknown, TCommandEncoder = unknown, TTextureView = unknown, TTextureFormat = string> {
    readonly apiVersion: 1;
    readonly generation: BackendGeneration;
    readonly device: TDevice;
    readonly format: TTextureFormat;
    getFrame(frame: number): WebGpuFrameAccessV1<TDevice, TCommandEncoder, TTextureView, TTextureFormat>;
}
export declare const HYBRID_RENDER_RESOURCE_POLICY_V1: Readonly<{
    snapshotVersion: 1;
    simulationTimeline: 'shared-fixed-update';
    sceneCommit: 'shared';
    presentation: 'single-transaction';
    assetSharing: 'decoded-source-or-product';
    realizedTextureSharing: 'versioned-backend-interop-only';
    resourceMutation: 'owning-domain-only';
}>;
