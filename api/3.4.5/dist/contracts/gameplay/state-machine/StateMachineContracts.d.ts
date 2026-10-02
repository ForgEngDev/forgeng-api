import type { GameplayJsonValue } from '../GameplayCommon';
export declare const GAMEPLAY_STATE_MACHINE_SCHEMA_VERSION: 1;
export declare const GAMEPLAY_STATE_MACHINE_ANY: '$any';
export type GameplayStateMachineStateId<T extends string = string> = T;
export type GameplayStateMachineTransitionId<T extends string = string> = T;
export type GameplayStateMachineEventId<T extends string = string> = T;
export type GameplayStateMachineMachineId<T extends string = string> = T;
export interface GameplayStateMachineLimits {
    readonly maxStates: number;
    readonly maxTransitions: number;
    readonly maxEvents: number;
    readonly maxEffectsPerTransition: number;
    readonly maxInstancesPerEntity: number;
    readonly maxEventBatch: number;
    readonly maxHistory: number;
    readonly maxJsonDepth: number;
    readonly maxJsonNodes: number;
    readonly maxPayloadBytes: number;
    readonly minimumPriority: number;
    readonly maximumPriority: number;
}
export declare const DEFAULT_GAMEPLAY_STATE_MACHINE_LIMITS: GameplayStateMachineLimits;
export type GameplayStateMachineErrorOperation = 'state-machine-definition' | 'state-machine-guard' | 'state-machine-effect' | 'state-machine-instance' | 'state-machine-runtime';
export type GameplayStateMachineErrorCode = 'GAMEPLAY_STATE_MACHINE_INVALID_DEFINITION' | 'GAMEPLAY_STATE_MACHINE_INVALID_GUARD' | 'GAMEPLAY_STATE_MACHINE_INVALID_EFFECT' | 'GAMEPLAY_STATE_MACHINE_INVALID_INSTANCE' | 'GAMEPLAY_STATE_MACHINE_INVALID_OPERATION' | 'GAMEPLAY_STATE_MACHINE_REENTRANT_OPERATION' | 'GAMEPLAY_STATE_MACHINE_RUNTIME_DESTROYED' | 'GAMEPLAY_DUPLICATE_DEFINITION' | 'GAMEPLAY_MISSING_REFERENCE' | 'GAMEPLAY_LIMIT_EXCEEDED' | 'GAMEPLAY_INVALID_ID' | 'GAMEPLAY_INVALID_JSON';
export interface GameplayStateMachineErrorInput {
    readonly code: GameplayStateMachineErrorCode;
    readonly operation: GameplayStateMachineErrorOperation;
    readonly message: string;
    readonly path?: string;
    readonly definitionId?: string;
    readonly machineId?: string;
    readonly transitionId?: string;
    readonly cause?: unknown;
}
export declare class GameplayStateMachineError extends Error {
    readonly code: GameplayStateMachineErrorCode;
    readonly operation: GameplayStateMachineErrorOperation;
    readonly path: string | null;
    readonly id: string | null;
    readonly cause: unknown;
    readonly definitionId: string | null;
    readonly machineId: string | null;
    readonly transitionId: string | null;
    constructor(input: GameplayStateMachineErrorInput);
}
export interface GameplayStateMachineGuardArguments<TContext, TParams extends GameplayJsonValue> {
    readonly context: Readonly<TContext>;
    readonly params: TParams;
    readonly stateId: string;
    readonly stateAgeTicks: number;
    readonly event: GameplayStateMachineEventInput | null;
    readonly tick: number;
    readonly machineId: string;
    readonly revision: number;
}
export interface GameplayStateMachineGuardDefinition<TParams extends GameplayJsonValue = GameplayJsonValue, TContext = unknown> {
    readonly kind: 'state-machine-guard';
    readonly id: string;
    readonly validateParams: (value: unknown, path?: string) => TParams;
    readonly evaluate: (arguments_: GameplayStateMachineGuardArguments<TContext, TParams>) => boolean;
}
export interface GameplayStateMachineGuardDefinitionInput<TParams extends GameplayJsonValue, TContext> {
    readonly id: string;
    readonly validateParams?: (value: unknown) => value is TParams;
    readonly evaluate: (arguments_: GameplayStateMachineGuardArguments<TContext, TParams>) => boolean;
}
export interface GameplayStateMachineEffectArguments<TContext, TParams extends GameplayJsonValue> {
    readonly context: Readonly<TContext>;
    readonly params: TParams;
    readonly stateId: string;
    readonly event: GameplayStateMachineEventInput | null;
    readonly tick: number;
    readonly machineId: string;
    readonly fromStateId: string | null;
    readonly toStateId: string;
    readonly transitionId: string | null;
    readonly revision: number;
    readonly phase: 'exit' | 'transition' | 'enter';
}
export interface GameplayStateMachineEffectDefinition<TParams extends GameplayJsonValue = GameplayJsonValue, TOutput extends GameplayJsonValue = GameplayJsonValue, TContext = unknown> {
    readonly kind: 'state-machine-effect';
    readonly id: string;
    readonly validateParams: (value: unknown, path?: string) => TParams;
    readonly prepare: (arguments_: GameplayStateMachineEffectArguments<TContext, TParams>) => TOutput;
}
export interface GameplayStateMachineEffectDefinitionInput<TParams extends GameplayJsonValue, TOutput extends GameplayJsonValue, TContext> {
    readonly id: string;
    readonly validateParams?: (value: unknown) => value is TParams;
    readonly validateOutput?: (value: unknown) => value is TOutput;
    readonly prepare: (arguments_: GameplayStateMachineEffectArguments<TContext, TParams>) => TOutput;
}
export interface GameplayStateMachineRegistry<TContext = unknown> {
    readonly guards?: readonly GameplayStateMachineGuardDefinition<any, TContext>[];
    readonly effects?: readonly GameplayStateMachineEffectDefinition<any, any, TContext>[];
}
export interface GameplayStateMachineGuardReference {
    readonly id: string;
    readonly params?: GameplayJsonValue;
}
export interface GameplayStateMachineEffectReference {
    readonly id: string;
    readonly params?: GameplayJsonValue;
}
export interface GameplayStateMachineStateInput<TState extends string = string> {
    readonly id: TState;
    readonly terminal?: boolean;
    readonly enter?: readonly GameplayStateMachineEffectReference[];
    readonly exit?: readonly GameplayStateMachineEffectReference[];
}
export interface GameplayStateMachineTransitionInput<TState extends string = string, TEvent extends string = string> {
    readonly id: string;
    readonly from: TState | typeof GAMEPLAY_STATE_MACHINE_ANY;
    readonly to: TState;
    readonly event?: TEvent;
    readonly priority?: number;
    readonly minimumAgeTicks?: number;
    readonly guard?: GameplayStateMachineGuardReference;
    readonly effects?: readonly GameplayStateMachineEffectReference[];
    readonly self?: 'internal' | 'reenter';
}
type StateIdOf<TStates extends readonly GameplayStateMachineStateInput[]> = TStates[number]['id'];
type EventIdOf<TEvents extends readonly string[]> = TEvents[number];
export interface GameplayStateMachineDefinitionInput<TStates extends readonly GameplayStateMachineStateInput[] = readonly GameplayStateMachineStateInput[], TEvents extends readonly string[] = readonly string[]> {
    readonly id: string;
    readonly version?: number;
    readonly initialState: StateIdOf<TStates>;
    readonly states: TStates;
    readonly events?: TEvents;
    readonly transitions: readonly GameplayStateMachineTransitionInput<StateIdOf<TStates>, EventIdOf<TEvents>>[];
}
export interface GameplayStateMachineStateManifest {
    readonly id: string;
    readonly terminal: boolean;
    readonly enter: readonly GameplayStateMachineEffectReference[];
    readonly exit: readonly GameplayStateMachineEffectReference[];
}
export interface GameplayStateMachineTransitionManifest {
    readonly id: string;
    readonly from: string | typeof GAMEPLAY_STATE_MACHINE_ANY;
    readonly to: string;
    readonly event: string | null;
    readonly priority: number;
    readonly minimumAgeTicks: number;
    readonly guard: GameplayStateMachineGuardReference | null;
    readonly effects: readonly GameplayStateMachineEffectReference[];
    readonly self: 'internal' | 'reenter' | null;
}
export interface GameplayStateMachineManifest {
    readonly schemaVersion: typeof GAMEPLAY_STATE_MACHINE_SCHEMA_VERSION;
    readonly id: string;
    readonly version: number;
    readonly initialState: string;
    readonly states: readonly GameplayStateMachineStateManifest[];
    readonly events: readonly string[];
    readonly transitions: readonly GameplayStateMachineTransitionManifest[];
}
export type GameplayStateMachineGraphDiagnosticCode = 'unreachable-state' | 'dead-end-nonterminal';
export interface GameplayStateMachineGraphDiagnostic {
    readonly code: GameplayStateMachineGraphDiagnosticCode;
    readonly stateId: string;
    readonly message: string;
}
export interface GameplayStateMachineDefinition<TContext = unknown> {
    readonly kind: 'state-machine';
    readonly id: string;
    readonly version: number;
    readonly fingerprint: string;
    readonly manifest: GameplayStateMachineManifest;
    readonly guards: Readonly<Record<string, GameplayStateMachineGuardDefinition<any, TContext>>>;
    readonly effects: Readonly<Record<string, GameplayStateMachineEffectDefinition<any, any, TContext>>>;
    readonly diagnostics: readonly GameplayStateMachineGraphDiagnostic[];
}
export interface GameplayStateMachineInstanceState {
    readonly machineId: string;
    readonly definitionId: string;
    readonly definitionVersion: number;
    readonly definitionFingerprint: string;
    readonly status: 'not-started' | 'active' | 'terminal';
    readonly currentStateId: string | null;
    readonly enteredAtTick: number | null;
    readonly lastProcessedTick: number | null;
    readonly revision: number;
}
export interface GameplayStateMachineEventInput<TPayload extends GameplayJsonValue = GameplayJsonValue> {
    readonly sequence: number;
    readonly eventId: string;
    readonly payload: TPayload;
}
export interface GameplayStateMachineTransitionRecord {
    readonly definitionId: string;
    readonly machineId: string;
    readonly transitionId: string | null;
    readonly fromStateId: string | null;
    readonly toStateId: string;
    readonly tick: number;
    readonly revision: number;
    readonly reason: 'start' | 'transition' | 'reset' | 'debug';
    readonly consumedEventSequence: number | null;
}
export interface GameplayStateMachineStepInput<TContext = unknown> {
    readonly tick: number;
    readonly instance: GameplayStateMachineInstanceState;
    readonly events: readonly GameplayStateMachineEventInput[];
    readonly context: Readonly<TContext>;
}
export interface GameplayStateMachinePreparedOutput {
    readonly effectId: string;
    readonly payload: GameplayJsonValue;
    readonly phase: 'exit' | 'transition' | 'enter';
}
export interface GameplayStateMachinePendingInputState {
    readonly machineId: string;
    readonly events: readonly GameplayStateMachineEventInput[];
    readonly resetRequested: boolean;
}
export interface GameplayStateMachinesComponentValue {
    readonly version: 1;
    readonly machines: readonly GameplayStateMachineInstanceState[];
    readonly pendingInputs: readonly GameplayStateMachinePendingInputState[];
    readonly nextEventSequence: number;
}
export interface GameplayStateMachineStepResult {
    readonly instance: GameplayStateMachineInstanceState;
    readonly transition: GameplayStateMachineTransitionRecord | null;
    readonly outputs: readonly GameplayStateMachinePreparedOutput[];
    readonly consumedEventSequence: number | null;
}
export {};
