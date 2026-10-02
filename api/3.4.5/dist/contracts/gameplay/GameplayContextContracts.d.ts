import type { GameplayCancellationSignal, GameplayCapabilityId, GameplayCommandId, GameplayComponentId, GameplayEventId, GameplayEntityGroupId, GameplayEntityHandle, GameplayEntityTagId, GameplayJsonValue, GameplayPrefabId, GameplaySceneId } from './GameplayCommon';
import type { GameplayEntityMetadataInput, GameplayEntityMetadataSnapshot } from './GameplayEntityMetadata';
import type { GameplayEntityCapabilityAttachOptions, GameplayEntityCapabilityDefinition } from './GameplayEntityCapabilities';
import type { GameplayInteractionRouterApi } from './GameplayInteractions';
import type { GameplayAnimationApi, GameplayClockDomain, GameplayClockDomainSnapshot, GameplayTimerScheduleOptions } from './GameplayTemporal';
import type { GameplayResourcesApi } from './GameplayResources';
export interface GameplayComponentDefinitionLike<T = unknown> {
    readonly kind: 'component';
    readonly id: GameplayComponentId;
    readonly validateValue: (value: unknown, path?: string) => T;
}
export interface GameplayComponentInitializerLike<T = unknown> {
    readonly kind: 'component-initializer';
    readonly component: GameplayComponentDefinitionLike<T>;
    readonly value: T;
}
export interface GameplayPrefabDefinitionLike {
    readonly kind: 'prefab';
    readonly id: GameplayPrefabId;
}
export interface GameplayActionReferenceLike<T> {
    readonly kind: 'action';
    readonly id: string;
    readonly default: T;
}
export type GameplayActionValue = boolean | number | readonly [
    number,
    number
];
export type GameplayInputSnapshot = Readonly<Record<string, GameplayActionValue>>;
export interface GameplayEventDefinitionLike<T> {
    readonly kind: 'event';
    readonly id: GameplayEventId;
    readonly validateValue: (value: unknown, path?: string) => T;
}
export interface GameplayCommandDefinitionLike<T> {
    readonly kind: 'command';
    readonly id: GameplayCommandId;
    readonly validateValue: (value: unknown, path?: string) => T;
}
export interface GameplayQueryResult extends Iterable<GameplayEntityHandle> {
    readonly size: number;
    toArray(): readonly GameplayEntityHandle[];
}
export interface GameplayEntityCreateOptions extends GameplayEntityMetadataInput {
    readonly id?: string;
}
export interface GameplayEntityQuery {
    readonly components?: readonly GameplayComponentDefinitionLike<any>[];
    readonly allTags?: readonly GameplayEntityTagId[];
    readonly anyTags?: readonly GameplayEntityTagId[];
    readonly allGroups?: readonly GameplayEntityGroupId[];
    readonly anyGroups?: readonly GameplayEntityGroupId[];
    readonly prefabIds?: readonly GameplayPrefabId[];
    readonly parent?: GameplayEntityHandle | null;
    readonly descendantOf?: GameplayEntityHandle;
}
export interface GameplaySpawnOverrides extends GameplayEntityMetadataInput {
    readonly id?: string;
    readonly components?: readonly GameplayComponentInitializerLike<any>[];
}
export interface GameplaySpawnRequest {
    readonly prefab: GameplayPrefabDefinitionLike;
    readonly overrides?: GameplaySpawnOverrides;
}
export interface GameplayEntityInspectionSnapshot {
    readonly handle: GameplayEntityHandle;
    readonly localId: string | null;
    readonly prefabId: GameplayPrefabId | null;
    readonly path: string;
    readonly parent: GameplayEntityHandle | null;
    readonly tags: readonly GameplayEntityTagId[];
    readonly groups: readonly GameplayEntityGroupId[];
    readonly capabilityIds: readonly GameplayCapabilityId[];
    readonly components: Readonly<Record<GameplayComponentId, GameplayJsonValue>>;
}
export interface GameplayWorldInspectionSnapshot {
    readonly worldId: string;
    readonly sceneId: GameplaySceneId;
    readonly lifecycleGeneration: number;
    readonly revision: number;
    readonly disposed: boolean;
    readonly entityCount: number;
    readonly componentCount: number;
    readonly entities: readonly GameplayEntityInspectionSnapshot[];
    readonly truncated: boolean;
    readonly prefabPool: GameplayPrefabPoolSnapshot;
}
export interface GameplayPrefabPoolSnapshot {
    readonly active: number;
    readonly retained: number;
    readonly reused: number;
    readonly evicted: number;
}
export interface GameplayEntityDirectoryApi {
    select(filter?: GameplayEntityQuery): GameplayQueryResult;
    find(localId: string): GameplayEntityHandle | null;
    metadata(entity: GameplayEntityHandle): GameplayEntityMetadataSnapshot;
    parent(entity: GameplayEntityHandle): GameplayEntityHandle | null;
    children(entity: GameplayEntityHandle): GameplayQueryResult;
    descendants(entity: GameplayEntityHandle): GameplayQueryResult;
    addTag(entity: GameplayEntityHandle, tag: GameplayEntityTagId): boolean;
    removeTag(entity: GameplayEntityHandle, tag: GameplayEntityTagId): boolean;
    joinGroup(entity: GameplayEntityHandle, group: GameplayEntityGroupId): boolean;
    leaveGroup(entity: GameplayEntityHandle, group: GameplayEntityGroupId): boolean;
}
export interface GameplayEntityCapabilitiesApi {
    attach<T>(entity: GameplayEntityHandle, capability: GameplayEntityCapabilityDefinition<T>, value: T, options?: GameplayEntityCapabilityAttachOptions<T>): void;
    has<T>(entity: GameplayEntityHandle, capability: GameplayEntityCapabilityDefinition<T>): boolean;
    get<T>(entity: GameplayEntityHandle, capability: GameplayEntityCapabilityDefinition<T>): T;
    detach<T>(entity: GameplayEntityHandle, capability: GameplayEntityCapabilityDefinition<T>): Promise<boolean>;
    ids(entity: GameplayEntityHandle): readonly GameplayCapabilityId[];
}
export interface GameplayWorldApi {
    readonly entities: GameplayEntityDirectoryApi;
    readonly entityCapabilities: GameplayEntityCapabilitiesApi;
    readonly interactions: GameplayInteractionRouterApi;
    readonly animations: GameplayAnimationApi;
    readonly resources: GameplayResourcesApi;
    create(initializers?: readonly GameplayComponentInitializerLike<any>[], options?: GameplayEntityCreateOptions): GameplayEntityHandle;
    spawn(prefab: GameplayPrefabDefinitionLike, overrides?: GameplaySpawnOverrides): Promise<GameplayEntityHandle>;
    spawnBatch(requests: readonly GameplaySpawnRequest[]): Promise<readonly GameplayEntityHandle[]>;
    despawn(entity: GameplayEntityHandle): Promise<boolean>;
    has(entity: GameplayEntityHandle): boolean;
    hasComponent<T>(entity: GameplayEntityHandle, component: GameplayComponentDefinitionLike<T>): boolean;
    get<T>(entity: GameplayEntityHandle, component: GameplayComponentDefinitionLike<T>): T;
    set<T>(entity: GameplayEntityHandle, component: GameplayComponentDefinitionLike<T>, value: T): void;
    patch<T>(entity: GameplayEntityHandle, component: GameplayComponentDefinitionLike<T>, patch: (current: T) => T): void;
    remove<T>(entity: GameplayEntityHandle, component: GameplayComponentDefinitionLike<T>): Promise<boolean>;
    query(...components: readonly GameplayComponentDefinitionLike<any>[]): GameplayQueryResult;
    clear(): Promise<void>;
    inspect(maxEntities?: number): GameplayWorldInspectionSnapshot;
}
export interface GameplayInputApi {
    value<T>(action: GameplayActionReferenceLike<T>): T;
    snapshot(): GameplayInputSnapshot;
}
export interface GameplayEventSubscription {
    readonly disposed: boolean;
    dispose(): void;
}
export interface GameplayEventsApi {
    emit<T>(event: GameplayEventDefinitionLike<T>, value: T): void;
    subscribe<T>(event: GameplayEventDefinitionLike<T>, listener: (value: T) => void): GameplayEventSubscription;
}
export interface GameplayCommandsApi {
    emit<T>(command: GameplayCommandDefinitionLike<T>, value: T): void;
}
export interface GameplayTimerHandle {
    readonly id: number;
    readonly cancelled: boolean;
    cancel(): void;
}
export interface GameplayTimeApi {
    readonly tick: number;
    readonly deltaSeconds: number;
    readonly elapsedSeconds: number;
    readonly scale: number;
    readonly paused: boolean;
    schedule<T>(delaySeconds: number, command: GameplayCommandDefinitionLike<T>, value: T): GameplayTimerHandle;
    scheduleTicks<T>(delayTicks: number, command: GameplayCommandDefinitionLike<T>, value: T, options?: GameplayTimerScheduleOptions): GameplayTimerHandle;
}
export interface GameplayRandomApi {
    next(): number;
    integer(minimum: number, maximum: number): number;
    state(): number;
}
export interface GameplayCapabilitySnapshot {
    readonly id: string;
    readonly version: string;
    readonly available: boolean;
}
export interface GameplayCapabilitiesApi {
    has(id: string): boolean;
    require(id: string): GameplayCapabilitySnapshot;
    list(): readonly GameplayCapabilitySnapshot[];
}
export interface GameplayPresentationApi {
    publish(channel: string, value: GameplayJsonValue): void;
}
export interface GameplaySystemTime extends GameplayTimeApi {
    readonly domain: GameplayClockDomain;
    readonly simulation: GameplayClockDomainSnapshot;
    readonly presentation: GameplayClockDomainSnapshot;
    readonly phase: 'fixed-simulation' | 'post-simulation-sync' | 'frame' | 'render-sync';
    readonly stepIndex: number;
    readonly stepCount: number;
    readonly mode: 'live' | 'replay';
}
export interface GameplaySystemContext {
    readonly world: GameplayWorldApi;
    readonly input: GameplayInputApi;
    readonly events: GameplayEventsApi;
    readonly commands: GameplayCommandsApi;
    readonly time: GameplaySystemTime;
    readonly random: GameplayRandomApi;
    readonly capabilities: GameplayCapabilitiesApi;
    readonly presentation: GameplayPresentationApi;
}
export interface GameplayComponentInitializeContext<T = unknown> {
    readonly entity: GameplayEntityHandle;
    readonly world: GameplayWorldApi;
    readonly value: T;
    readonly capabilities: GameplayCapabilitiesApi;
    readonly signal: GameplayCancellationSignal;
}
export interface GameplayCommandContext extends GameplaySystemContext {
}
export interface GameplaySceneSetupContext extends GameplaySystemContext {
}
