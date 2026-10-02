import type { AnimationInstance, AnimationInstanceCreateOptions, AnimationProvider, AnimationProviderContext, AnimationProviderDescriptor, } from 'forgeng/contracts/animation';
export declare class SkeletalAnimationProvider implements AnimationProvider {
    initialize(context: AnimationProviderContext): Promise<void>;
    createInstance(options: AnimationInstanceCreateOptions): AnimationInstance;
    destroy(): Promise<void>;
}
export declare const SKELETAL_ANIMATION_PROVIDER_DESCRIPTOR: AnimationProviderDescriptor;
