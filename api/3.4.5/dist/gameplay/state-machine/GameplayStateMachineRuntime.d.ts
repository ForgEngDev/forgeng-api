import type { GameplayStateMachineDefinition, GameplayStateMachineInstanceState, GameplayStateMachineLimits, GameplayStateMachineStepInput, GameplayStateMachineStepResult } from 'forgeng/contracts/gameplay/state-machine';
export interface GameplayStateMachineRuntimeOptions {
    readonly historyCapacity?: number;
    readonly maxPreparedOutputs?: number;
    readonly diagnostics?: false | Readonly<{
        readonly guardProbeCapacity?: number;
        readonly metrics?: boolean;
    }>;
    readonly limits?: Partial<GameplayStateMachineLimits>;
}
/** Renderer-free public facade over the shared deterministic FSM evaluator. */
export declare class GameplayStateMachineRuntime<TContext = unknown> {
    private readonly runtime;
    constructor(definition: GameplayStateMachineDefinition<TContext>, options?: GameplayStateMachineRuntimeOptions);
    createInstance(machineId: string): GameplayStateMachineInstanceState;
    start(instance: GameplayStateMachineInstanceState, tick: number, context: Readonly<TContext>): GameplayStateMachineStepResult;
    step(input: GameplayStateMachineStepInput<TContext>): GameplayStateMachineStepResult;
    restore(instance: GameplayStateMachineInstanceState): GameplayStateMachineInstanceState;
    destroy(): void;
}
