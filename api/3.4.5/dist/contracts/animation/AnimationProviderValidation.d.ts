import { type AnimationClipAsset, type AnimationInstanceCreateOptions, type AnimationPlayOptions, type AnimationPoseTarget, type AnimationProvider, type AnimationProviderContext, type AnimationProviderDescriptor, type AnimationSkeletonAsset } from './AnimationProviderContract';
export type AnimationProviderContractErrorCode = 'invalid-descriptor' | 'invalid-provider-id' | 'incompatible-contract-version' | 'invalid-implementation-version' | 'invalid-capability' | 'duplicate-capability' | 'invalid-factory' | 'invalid-provider-instance' | 'invalid-context' | 'invalid-skeleton' | 'skeleton-cycle' | 'invalid-clip' | 'invalid-channel' | 'unsupported-interpolation' | 'invalid-playback' | 'invalid-pose-target' | 'invalid-delta-time';
export declare class AnimationProviderContractError extends Error {
    readonly code: AnimationProviderContractErrorCode;
    readonly path: string;
    constructor(code: AnimationProviderContractErrorCode, path: string, message: string);
}
export declare function assertAnimationProviderDescriptor(value: unknown): asserts value is AnimationProviderDescriptor;
export declare function validateAnimationProviderDescriptor(value: unknown): AnimationProviderDescriptor;
export declare function assertAnimationProvider(value: unknown): asserts value is AnimationProvider;
export declare function validateAnimationProvider(value: unknown): AnimationProvider;
export declare function validateAnimationProviderContext(value: unknown): AnimationProviderContext;
export declare function validateAnimationSkeletonAsset(value: unknown): AnimationSkeletonAsset;
export declare function snapshotAnimationSkeletonAsset(value: unknown): AnimationSkeletonAsset;
export interface AnimationClipValidationOptions {
    readonly allowCubicSpline?: boolean;
}
export declare function validateAnimationClipAsset(value: unknown, jointCount: number, options?: AnimationClipValidationOptions): AnimationClipAsset;
export declare function snapshotAnimationClipAsset(value: unknown, jointCount: number, options?: AnimationClipValidationOptions): AnimationClipAsset;
export declare function snapshotAnimationInstanceCreateOptions(value: unknown): AnimationInstanceCreateOptions;
export declare function validateAnimationPlayOptions(value: unknown): Required<AnimationPlayOptions>;
export declare function validateAnimationDeltaSeconds(value: unknown): number;
export declare function validateAnimationPoseTarget(value: unknown, jointCount?: number): AnimationPoseTarget;
export declare function createAnimationPoseTarget(jointCount: number): AnimationPoseTarget;
