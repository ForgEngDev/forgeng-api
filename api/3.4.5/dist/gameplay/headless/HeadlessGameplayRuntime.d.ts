import { type GameDefinition, type GameplayCapabilitySnapshot, type GameplayCheckpointSnapshot, type GameplayContractLimits, type GameplayInputCommandSnapshot, type GameplayInputSnapshot, type GameplayMetricsSnapshot, type GameplaySceneRuntimeSnapshot, type GameplayWorldSnapshot, type SceneDefinition } from 'forgeng/contracts/gameplay';
export interface HeadlessGameplayRuntimeOptions {
    readonly game: GameDefinition;
    readonly scene?: SceneDefinition | string;
    readonly lifecycleGeneration?: number;
    readonly fixedDeltaSeconds?: number;
    readonly capabilities?: readonly GameplayCapabilitySnapshot[];
    readonly limits?: GameplayContractLimits;
}
export interface HeadlessGameplayInspection {
    readonly scene: GameplaySceneRuntimeSnapshot;
    readonly metrics: GameplayMetricsSnapshot;
    readonly checkpointCount: number;
    readonly input: GameplayInputSnapshot;
}
/** Renderer-free deterministic gameplay owner for servers, replay verification and tests. */
export declare class HeadlessGameplayRuntime {
    private readonly cancellation;
    private readonly input;
    private readonly metrics;
    private readonly runtime;
    private readonly fixedDeltaSeconds;
    private started;
    private destroyed;
    constructor(options: HeadlessGameplayRuntimeOptions);
    start(): Promise<void>;
    setInput(values: GameplayInputSnapshot): void;
    step(values?: GameplayInputSnapshot, deltaSeconds?: number): Promise<GameplayWorldSnapshot>;
    snapshot(): GameplayWorldSnapshot;
    checkpoint(id?: string): GameplayCheckpointSnapshot;
    checkpoints(): readonly GameplayCheckpointSnapshot[];
    restore(value: GameplayCheckpointSnapshot | GameplayWorldSnapshot): Promise<void>;
    replay(value: GameplayCheckpointSnapshot | GameplayWorldSnapshot, commands: readonly GameplayInputCommandSnapshot[], deltaSeconds?: number): Promise<GameplayWorldSnapshot>;
    inspect(): HeadlessGameplayInspection;
    destroy(): Promise<void>;
    private requireAvailable;
    private requireRunning;
}
