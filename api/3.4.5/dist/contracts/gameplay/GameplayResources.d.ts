import type { GameplayEntityHandle, GameplayJsonValue } from './GameplayCommon';
export interface GameplayAssetLeasePort<TValue = unknown> {
    readonly id: string;
    readonly released: boolean;
    readonly value: TValue;
    release(): void | Promise<void>;
}
export interface GameplayAssetScopePort {
    readonly id: string;
    readonly state: 'active' | 'destroying' | 'destroyed';
    preload(groupId: string): Promise<void>;
    acquire<TValue = unknown>(assetId: string): Promise<GameplayAssetLeasePort<TValue>>;
    createChild(id: string): GameplayAssetScopePort;
    destroy(): Promise<void>;
}
export interface GameplayAssetRuntimePort {
    createScope(id: string): GameplayAssetScopePort;
}
export type GameplayAudioAction = 'play' | 'stop' | 'set-gain';
export interface GameplayAudioIntentInput {
    readonly action: GameplayAudioAction;
    readonly cueId: string;
    readonly voiceId: string;
    readonly gain?: number;
    readonly loop?: boolean;
    readonly fadeTicks?: number;
    readonly metadata?: GameplayJsonValue;
}
export interface GameplayAudioIntent {
    readonly version: 1;
    readonly sequence: number;
    readonly tick: number;
    readonly action: GameplayAudioAction;
    readonly cueId: string;
    readonly voiceId: string;
    readonly gain: number;
    readonly loop: boolean;
    readonly fadeTicks: number;
    readonly metadata?: GameplayJsonValue;
}
export interface GameplayAudioAdapterPort {
    emit(intent: GameplayAudioIntent): void;
    destroy?(): void | Promise<void>;
}
export interface GameplayAudioIntentReceipt {
    readonly intent: GameplayAudioIntent;
    readonly delivered: boolean;
    readonly suppressed: boolean;
}
export interface GameplayAudioApi {
    emit(input: GameplayAudioIntentInput, tick: number, mode?: 'live' | 'replay'): GameplayAudioIntentReceipt;
    trace(): readonly GameplayAudioIntent[];
}
export interface GameplayResourcePreloadResult {
    readonly available: boolean;
    readonly groups: readonly string[];
}
export interface GameplayResourceInspectionSnapshot {
    readonly assetAvailable: boolean;
    readonly audioAvailable: boolean;
    readonly preloadedGroups: readonly string[];
    readonly sceneLeaseCount: number;
    readonly entityScopeCount: number;
    readonly entityLeaseCount: number;
    readonly audioIntentCount: number;
    readonly audioDeliveredCount: number;
    readonly audioSuppressedCount: number;
    readonly destroyed: boolean;
}
export interface GameplayResourcesApi {
    readonly audio: GameplayAudioApi;
    preload(groupIds: readonly string[]): Promise<GameplayResourcePreloadResult>;
    acquireScene<TValue = unknown>(assetId: string): Promise<GameplayAssetLeasePort<TValue>>;
    acquireEntity<TValue = unknown>(entity: GameplayEntityHandle, assetId: string): Promise<GameplayAssetLeasePort<TValue>>;
    inspect(): GameplayResourceInspectionSnapshot;
}
