export declare const ANIMATION_PROVIDER_CONTRACT_VERSION: '1.0.0';
export declare const ANIMATION_PROVIDER_CAPABILITY_IDS: Readonly<{
    readonly linearInterpolation: 'linear-interpolation';
    readonly stepInterpolation: 'step-interpolation';
    readonly crossfade: 'crossfade';
}>;
export declare const ANIMATION_MAX_JOINTS = 1024;
export declare const ANIMATION_MAX_CLIPS = 4096;
export declare const ANIMATION_MAX_CHANNELS_PER_CLIP = 4096;
export declare const ANIMATION_MAX_KEYFRAMES_PER_CHANNEL = 65536;
export declare const ANIMATION_MAX_DURATION_SECONDS = 86400;
export declare const ANIMATION_LOCAL_TRANSFORM_FLOATS = 10;
export declare const ANIMATION_MATRIX_FLOATS = 16;
export type AnimationProviderContractVersion = typeof ANIMATION_PROVIDER_CONTRACT_VERSION;
export type AnimationProviderCapabilityId = string & {};
export type AnimationInterpolation = 'LINEAR' | 'STEP' | 'CUBICSPLINE';
export type AnimationChannelPath = 'translation' | 'rotation' | 'scale';
export interface AnimationProviderCapability {
    readonly id: AnimationProviderCapabilityId;
    readonly version: string;
}
/**
 * Neutral, provider-owned skeleton asset snapshot. All arrays use stable integer
 * joint/node identities; object identity is never part of the contract.
 * restLocalTransforms stores translation xyz, rotation xyzw and scale xyz.
 */
export interface AnimationSkeletonAsset {
    readonly jointCount: number;
    readonly parentIndices: Int32Array;
    readonly jointNodeIds: Uint32Array;
    readonly inverseBindMatrices: Float32Array;
    readonly restLocalTransforms: Float32Array;
    /** One column-major matrix per joint; identity is used when omitted. */
    readonly rootParentMatrices?: Float32Array;
}
export interface AnimationChannelAsset {
    readonly jointIndex: number;
    readonly path: AnimationChannelPath;
    readonly interpolation: AnimationInterpolation;
    readonly times: Float32Array;
    readonly values: Float32Array;
}
export interface AnimationClipAsset {
    readonly id: string;
    readonly durationSeconds: number;
    readonly channels: readonly AnimationChannelAsset[];
}
export interface AnimationInstanceCreateOptions {
    readonly skeleton: AnimationSkeletonAsset;
    readonly clips: readonly AnimationClipAsset[];
}
export interface AnimationPlayOptions {
    readonly loop?: boolean;
    readonly speed?: number;
    readonly blendDurationSeconds?: number;
}
/** Caller-owned reusable target. Providers overwrite only the declared range. */
export interface AnimationPoseTarget {
    readonly jointCount: number;
    readonly jointMatrices: Float32Array;
}
export interface AnimationEvaluationResult {
    readonly clipId: string | null;
    readonly timeSeconds: number;
    readonly finished: boolean;
}
export interface AnimationInstance {
    play(clipId: string, options?: AnimationPlayOptions): void;
    stop(): void;
    evaluate(deltaSeconds: number, target: AnimationPoseTarget): AnimationEvaluationResult;
    /** Idempotent retained cleanup; use-after-destroy must fail explicitly. */
    destroy(): Promise<void>;
}
export type AnimationProviderLogMetadata = Readonly<Record<string, string | number | boolean | null>>;
export interface AnimationProviderLogger {
    trace(message: string, metadata?: AnimationProviderLogMetadata): void;
    debug(message: string, metadata?: AnimationProviderLogMetadata): void;
    info(message: string, metadata?: AnimationProviderLogMetadata): void;
    warn(message: string, metadata?: AnimationProviderLogMetadata): void;
    error(message: string, metadata?: AnimationProviderLogMetadata): void;
    child(category: string, metadata?: AnimationProviderLogMetadata): AnimationProviderLogger;
}
export interface AnimationProviderContext {
    readonly signal: AbortSignal;
    readonly logger: AnimationProviderLogger;
}
export interface AnimationProvider {
    initialize(context: AnimationProviderContext): Promise<void>;
    createInstance(options: AnimationInstanceCreateOptions): AnimationInstance;
    /** Destroys every retained instance, continuing after individual failures. */
    destroy(): Promise<void>;
}
export interface AnimationProviderFactory<TOptions = unknown> {
    create(options?: TOptions): AnimationProvider;
}
export interface AnimationProviderDescriptor<TOptions = unknown> extends AnimationProviderFactory<TOptions> {
    readonly id: string;
    readonly contractVersion: AnimationProviderContractVersion;
    readonly implementationVersion: string;
    readonly capabilities: readonly AnimationProviderCapability[];
}
export type AnimationProviderOperation = 'initialize' | 'create-instance' | 'play' | 'evaluate' | 'destroy-instance' | 'destroy-provider';
export type AnimationProviderErrorCode = 'unsupported-interpolation' | 'clip-not-found' | 'aborted' | 'provider-not-initialized' | 'provider-destroyed' | 'instance-destroyed' | 'backend-failure';
export declare class AnimationProviderError extends Error {
    readonly code: AnimationProviderErrorCode;
    readonly operation: AnimationProviderOperation;
    readonly cause?: unknown;
    constructor(code: AnimationProviderErrorCode, operation: AnimationProviderOperation, message: string, cause?: unknown);
}
