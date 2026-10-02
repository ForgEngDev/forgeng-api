export declare const GAMEPLAY_CONTRACT_VERSION: '1.0.0';
export declare const GAMEPLAY_MANIFEST_VERSION: 1;
export declare const GAMEPLAY_SNAPSHOT_VERSION: 1;
export type GameplayContractVersion = typeof GAMEPLAY_CONTRACT_VERSION;
export type GameplayManifestVersion = typeof GAMEPLAY_MANIFEST_VERSION;
export type GameplaySnapshotVersion = typeof GAMEPLAY_SNAPSHOT_VERSION;
export type GameplayGameId = string & {};
export type GameplaySceneId = string & {};
export type GameplayPrefabId = string & {};
export type GameplayComponentId = string & {};
export type GameplaySystemId = string & {};
export type GameplayEventId = string & {};
export type GameplayCommandId = string & {};
export type GameplayActionMapId = string & {};
export type GameplayActionId = string & {};
export type GameplayCapabilityId = string & {};
export type GameplayEntityTagId = string & {};
export type GameplayEntityGroupId = string & {};
export interface GameplayEntityHandle {
    readonly worldId: string;
    readonly id: number;
    readonly generation: number;
}
export type GameplayJsonPrimitive = string | number | boolean | null;
export type GameplayJsonValue = GameplayJsonPrimitive | GameplayJsonObject | readonly GameplayJsonValue[];
export interface GameplayJsonObject {
    readonly [key: string]: GameplayJsonValue;
}
/** Minimal platform-neutral cancellation view; platform adapters may bridge their native signal internally. */
export interface GameplayCancellationSignal {
    readonly aborted: boolean;
    readonly reason: unknown;
    throwIfAborted(): void;
    subscribe(listener: (reason: unknown) => void): {
        dispose(): void;
    };
}
export type GameplayLifecyclePhase = 'registered' | 'preparing' | 'prepared' | 'activating' | 'active' | 'retiring' | 'failed' | 'cancelling' | 'destroyed';
export type GameplayOperation = 'validate' | 'normalize' | 'catalog' | 'world' | 'component' | 'query' | 'schedule' | 'system-lifecycle' | 'event' | 'command' | 'timer' | 'spawn' | 'checkpoint' | 'restore' | 'replay' | 'capability' | 'scene-lifecycle' | 'interaction' | 'resource' | 'audio' | 'persistence' | 'destroy';
export type GameplayErrorCode = 'GAMEPLAY_INVALID_ID' | 'GAMEPLAY_INVALID_VERSION' | 'GAMEPLAY_INVALID_DEFINITION' | 'GAMEPLAY_UNKNOWN_FIELD' | 'GAMEPLAY_DUPLICATE_DEFINITION' | 'GAMEPLAY_AMBIGUOUS_OWNERSHIP' | 'GAMEPLAY_MISSING_REFERENCE' | 'GAMEPLAY_DEPENDENCY_CYCLE' | 'GAMEPLAY_LIMIT_EXCEEDED' | 'GAMEPLAY_INVALID_JSON' | 'GAMEPLAY_INVALID_COMPONENT_VALUE' | 'GAMEPLAY_UNSUPPORTED_COMPONENT_VERSION' | 'GAMEPLAY_UNSUPPORTED_PHASE' | 'GAMEPLAY_INVALID_CAPABILITY' | 'GAMEPLAY_CAPABILITY_UNAVAILABLE' | 'GAMEPLAY_WORLD_DISPOSED' | 'GAMEPLAY_STALE_WORLD' | 'GAMEPLAY_STALE_ENTITY' | 'GAMEPLAY_STALE_PREFAB' | 'GAMEPLAY_ILLEGAL_STRUCTURAL_MUTATION' | 'GAMEPLAY_QUEUE_OVERFLOW' | 'GAMEPLAY_ASYNC_FIXED_SYSTEM' | 'GAMEPLAY_SYSTEM_FAILED' | 'GAMEPLAY_SPAWN_CANCELLED' | 'GAMEPLAY_SPAWN_FAILED' | 'GAMEPLAY_INVALID_SNAPSHOT' | 'GAMEPLAY_MIGRATION_MISSING' | 'GAMEPLAY_RESTORE_FAILED' | 'GAMEPLAY_LIFECYCLE_INVALID';
export interface GameplayErrorInput {
    readonly code: GameplayErrorCode;
    readonly operation: GameplayOperation;
    readonly message: string;
    readonly path?: string;
    readonly id?: string;
    readonly lifecyclePhase?: GameplayLifecyclePhase;
    readonly cause?: unknown;
}
export declare class GameplayError extends Error {
    readonly code: GameplayErrorCode;
    readonly operation: GameplayOperation;
    readonly path: string | null;
    readonly id: string | null;
    readonly lifecyclePhase: GameplayLifecyclePhase | null;
    readonly cause: unknown;
    constructor(input: GameplayErrorInput);
}
export interface GameplayContractLimits {
    readonly maxDefinitions: number;
    readonly maxScenes: number;
    readonly maxPrefabs: number;
    readonly maxComponents: number;
    readonly maxSystems: number;
    readonly maxEvents: number;
    readonly maxCommands: number;
    readonly maxActionMaps: number;
    readonly maxPrefabDepth: number;
    readonly maxComponentsPerEntity: number;
    readonly maxEntityTags: number;
    readonly maxEntityGroups: number;
    readonly maxEntityCapabilities: number;
    readonly maxEntities: number;
    readonly maxSystemDependencyDepth: number;
    readonly maxEventQueue: number;
    readonly maxCommandQueue: number;
    readonly maxTimers: number;
    readonly maxSnapshotBytes: number;
    readonly maxSnapshotHistory: number;
    readonly maxReplayCommands: number;
}
export declare const DEFAULT_GAMEPLAY_CONTRACT_LIMITS: GameplayContractLimits;
export interface GameplayReference<TKind extends string, TId extends string = string> {
    readonly kind: TKind;
    readonly id: TId;
}
export type GameplaySceneReference = GameplayReference<'scene', GameplaySceneId>;
export type GameplayPrefabReference = GameplayReference<'prefab', GameplayPrefabId>;
export type GameplayComponentReference = GameplayReference<'component', GameplayComponentId>;
export type GameplaySystemReference = GameplayReference<'system', GameplaySystemId>;
export type GameplayEventReference = GameplayReference<'event', GameplayEventId>;
export type GameplayCommandReference = GameplayReference<'command', GameplayCommandId>;
