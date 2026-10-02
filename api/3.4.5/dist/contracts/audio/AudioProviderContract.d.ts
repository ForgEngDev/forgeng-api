import type { UiShell } from 'forgeng/contracts/ui';
export declare const AUDIO_PROVIDER_CONTRACT_VERSION: '1.0.0';
export declare const AUDIO_PROVIDER_CAPABILITY_IDS: Readonly<{
    readonly playback: 'playback';
    readonly spatialAudio: 'spatial-audio';
    readonly voiceVirtualization: 'voice-virtualization';
    readonly uiContribution: 'ui-contribution';
}>;
export type AudioProviderContractVersion = typeof AUDIO_PROVIDER_CONTRACT_VERSION;
export type AudioProviderCapabilityId = string & {};
export type AudioProviderLogMetadata = Readonly<Record<string, unknown>>;
export interface AudioProviderLogContext {
    readonly metadata?: AudioProviderLogMetadata;
    readonly error?: unknown;
}
export interface AudioProviderLogger {
    trace(message: string, context?: AudioProviderLogContext): void;
    debug(message: string, context?: AudioProviderLogContext): void;
    info(message: string, context?: AudioProviderLogContext): void;
    warn(message: string, context?: AudioProviderLogContext): void;
    error(message: string, context?: AudioProviderLogContext): void;
    fatal(message: string, context?: AudioProviderLogContext): void;
    child(category: string, metadata?: AudioProviderLogMetadata): AudioProviderLogger;
}
export interface AudioProviderCapability {
    readonly id: AudioProviderCapabilityId;
    readonly version: string;
}
export type AudioVector3 = readonly [
    x: number,
    y: number,
    z: number
];
export interface AudioListenerSnapshot {
    readonly position: AudioVector3;
    readonly forward: AudioVector3;
    readonly up: AudioVector3;
}
export interface AudioProviderClip {
    readonly duration: number;
}
export interface AudioProviderSpatialOptions {
    readonly position?: AudioVector3;
    readonly panningModel?: 'equalpower' | 'HRTF';
    readonly distanceModel?: 'linear' | 'inverse' | 'exponential';
    readonly refDistance?: number;
    readonly maxDistance?: number;
    readonly rolloffFactor?: number;
    readonly coneInnerAngle?: number;
    readonly coneOuterAngle?: number;
    readonly coneOuterGain?: number;
}
export interface AudioProviderPlaybackOptions {
    readonly volume: number;
    readonly loop: boolean;
    readonly startOffsetSeconds: number;
    readonly enforceCooldown: boolean;
    readonly spatial?: AudioProviderSpatialOptions;
    readonly metadata?: Readonly<Record<string, unknown>>;
}
export interface AudioProviderVoice {
    readonly ended: Promise<void>;
    setGain(value: number, rampMs?: number): void;
    setPosition(position: AudioVector3): void;
    stop(fadeOutMs?: number): void;
    destroy(): void;
}
export interface AudioProviderBackend {
    readonly available: boolean;
    loadClip(url: string, signal?: AbortSignal): Promise<AudioProviderClip>;
    play(clip: AudioProviderClip, options: AudioProviderPlaybackOptions): AudioProviderVoice | null;
    setMasterVolume(volume: number): void;
    resume(): Promise<void>;
    suspend(): Promise<void>;
    updateListener(snapshot: AudioListenerSnapshot): void;
}
export interface AudioUiSettingContribution {
    readonly id: string;
    readonly label: string;
    readonly kind: 'boolean' | 'number' | 'command' | 'status';
    readonly minimum?: number;
    readonly maximum?: number;
    readonly step?: number;
}
export interface AudioUiContribution {
    readonly id: string;
    readonly title: string;
    readonly settings: readonly AudioUiSettingContribution[];
}
export interface AudioUiContributionHandle {
    dispose(): void | Promise<void>;
}
export interface AudioUiContributionPort {
    register(contribution: AudioUiContribution): AudioUiContributionHandle;
}
export interface AudioProviderContext {
    readonly logger: AudioProviderLogger;
    readonly signal: AbortSignal;
    /** @deprecated 1.x compatibility port. New providers use `uiShell`. */
    readonly ui?: AudioUiContributionPort;
    readonly uiShell?: UiShell;
}
export interface AudioProvider {
    readonly backend: AudioProviderBackend;
    initialize(context: AudioProviderContext): Promise<void>;
    destroy(): Promise<void>;
}
export interface AudioProviderFactory<TOptions = unknown> {
    create(options?: TOptions): AudioProvider;
}
export interface AudioProviderDescriptor<TOptions = unknown> extends AudioProviderFactory<TOptions> {
    readonly id: string;
    readonly contractVersion: AudioProviderContractVersion;
    readonly implementationVersion: string;
    readonly capabilities: readonly AudioProviderCapability[];
}
