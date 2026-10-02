import type { GameplayCommandId, GameplayComponentId, GameplayErrorCode, GameplayEventId, GameplayJsonValue, GameplayLifecyclePhase, GameplayPrefabId, GameplaySceneId, GameplaySnapshotVersion, GameplaySystemId } from './GameplayCommon';
export * from './GameplayContextContracts';
import type { GameplayInputSnapshot, GameplayWorldInspectionSnapshot } from './GameplayContextContracts';
import type { GameplayAnimationIntentSnapshot } from './GameplayTemporal';
export interface GameplayInputCommandSnapshot {
    readonly tick: number;
    readonly values: GameplayInputSnapshot;
}
export interface GameplaySerializableComponentSnapshot {
    readonly id: GameplayComponentId;
    readonly version: number;
    readonly value: GameplayJsonValue;
}
export interface GameplaySerializableEntitySnapshot {
    readonly localId: string | null;
    readonly prefabId: GameplayPrefabId | null;
    readonly path: string;
    readonly parentPath: string | null;
    readonly tags?: readonly string[];
    readonly groups?: readonly string[];
    readonly components: readonly GameplaySerializableComponentSnapshot[];
}
export interface GameplayTimerSnapshot {
    readonly id: number;
    readonly dueTick: number;
    readonly commandId: GameplayCommandId;
    readonly value: GameplayJsonValue;
    readonly intervalTicks: number;
    readonly remainingRepeats: number | null;
}
export interface GameplayQueuedValueSnapshot {
    readonly sequence: number;
    readonly definitionId: GameplayEventId | GameplayCommandId;
    readonly value: GameplayJsonValue;
}
export interface GameplayWorldSnapshot {
    readonly version: GameplaySnapshotVersion;
    readonly gameId: string;
    readonly sceneId: GameplaySceneId;
    readonly lifecycleGeneration: number;
    readonly tick: number;
    readonly elapsedSeconds: number;
    readonly timeScale: number;
    readonly paused: boolean;
    readonly randomState: number;
    readonly input: GameplayInputSnapshot;
    readonly entities: readonly GameplaySerializableEntitySnapshot[];
    readonly timers: readonly GameplayTimerSnapshot[];
    readonly animationIntents?: readonly GameplayAnimationIntentSnapshot[];
    readonly commands: readonly GameplayQueuedValueSnapshot[];
    readonly events: readonly GameplayQueuedValueSnapshot[];
    readonly hash: string;
}
export interface GameplayCheckpointSnapshot {
    readonly id: string;
    readonly createdAtTick: number;
    readonly state: GameplayWorldSnapshot;
}
export interface GameplaySceneRuntimeSnapshot {
    readonly id: GameplaySceneId;
    readonly lifecycle: GameplayLifecyclePhase;
    readonly generation: number;
    readonly world: GameplayWorldInspectionSnapshot | null;
}
export interface GameplayCatalogInspectionSnapshot {
    readonly gameId: string;
    readonly scenes: readonly GameplaySceneId[];
    readonly prefabs: readonly GameplayPrefabId[];
    readonly components: readonly GameplayComponentId[];
    readonly systems: readonly GameplaySystemId[];
    readonly events: readonly GameplayEventId[];
    readonly commands: readonly GameplayCommandId[];
    readonly schedule: readonly Readonly<{
        id: GameplaySystemId;
        phase: string;
        before: readonly GameplaySystemId[];
        after: readonly GameplaySystemId[];
    }>[];
}
export interface GameplayMetricsSnapshot {
    readonly activeGameId: string;
    readonly activeSceneId: GameplaySceneId | null;
    readonly lifecycleGeneration: number;
    readonly entityCount: number;
    readonly componentCount: number;
    readonly systemCount: number;
    readonly prefabCount: number;
    readonly spawnCount: number;
    readonly despawnCount: number;
    readonly commandCount: number;
    readonly eventCount: number;
    readonly checkpointCount: number;
    readonly restoreCount: number;
    readonly replayCount: number;
    readonly staleHandleFailures: number;
    readonly validationFailures: number;
    readonly capabilityFailures: number;
    readonly lifecycleFailures: number;
    readonly queueOverflowFailures: number;
    readonly trackedEstimateBytes: number;
    readonly prefabPool: Readonly<{
        active: number;
        retained: number;
        reused: number;
        evicted: number;
    }>;
    readonly systemTimings: readonly Readonly<{
        id: GameplaySystemId;
        phase: string;
        samples: number;
        totalMilliseconds: number;
        maxMilliseconds: number;
    }>[];
    readonly operationTimings: Readonly<Record<'scene-preparation' | 'scene-retirement' | 'checkpoint-create' | 'checkpoint-restore' | 'replay', Readonly<{
        samples: number;
        totalMilliseconds: number;
        maxMilliseconds: number;
    }>>>;
    readonly queueHighWaterMarks: Readonly<{
        events: number;
        commands: number;
    }>;
    readonly failures: Readonly<Partial<Record<GameplayErrorCode, number>>>;
}
export interface GameplayGameApi {
    readonly scenes: {
        activate(scene: GameplaySceneId | {
            readonly kind: 'scene';
            readonly id: GameplaySceneId;
        }): Promise<void>;
        current(): GameplaySceneRuntimeSnapshot | null;
        list(): readonly GameplaySceneId[];
    };
    readonly world: {
        inspect(maxEntities?: number): GameplayWorldInspectionSnapshot | null;
    };
    readonly checkpoints: {
        create(id?: string): GameplayCheckpointSnapshot;
        restore(snapshot: GameplayCheckpointSnapshot | GameplayWorldSnapshot): Promise<void>;
        list(): readonly GameplayCheckpointSnapshot[];
        replay(snapshot: GameplayCheckpointSnapshot | GameplayWorldSnapshot, commands: readonly GameplayInputCommandSnapshot[], deltaSeconds?: number): Promise<GameplayWorldSnapshot>;
    };
    inspect(): Readonly<{
        catalog: GameplayCatalogInspectionSnapshot;
        scene: GameplaySceneRuntimeSnapshot | null;
        metrics: GameplayMetricsSnapshot;
    }>;
}
export interface GameplayRuntimeFailure {
    readonly code: GameplayErrorCode;
    readonly message: string;
    readonly cause?: unknown;
}
