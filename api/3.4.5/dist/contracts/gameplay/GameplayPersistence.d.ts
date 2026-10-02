import type { GameplayCheckpointSnapshot, GameplayInputCommandSnapshot, GameplayWorldSnapshot } from './GameplayRuntimeContracts';
export interface GameplayPersistenceBytePort {
    get(key: string): Promise<Uint8Array | null>;
    set(key: string, value: Uint8Array): Promise<void>;
    remove(key: string): Promise<boolean>;
}
export interface GameplaySaveInspectionSnapshot {
    readonly available: boolean;
    readonly slots: readonly string[];
    readonly pendingOperations: number;
    readonly destroyed: boolean;
}
export interface GameplaySaveApi {
    readonly available: boolean;
    save(slot: string, checkpoint?: GameplayCheckpointSnapshot): Promise<GameplayCheckpointSnapshot>;
    load(slot: string): Promise<GameplayCheckpointSnapshot>;
    replay(slot: string, commands: readonly GameplayInputCommandSnapshot[], deltaSeconds?: number): Promise<GameplayWorldSnapshot>;
    remove(slot: string): Promise<boolean>;
    list(): Promise<readonly string[]>;
    inspect(): GameplaySaveInspectionSnapshot;
}
