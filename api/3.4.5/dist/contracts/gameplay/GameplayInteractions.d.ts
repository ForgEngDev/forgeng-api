import { type GameplayEntityHandle } from './GameplayCommon';
export declare const GAMEPLAY_INTERACTION_CONTRACT_VERSION: 1;
export type GameplayInteractionEdge = 'performed' | 'canceled';
export type GameplayInteractionPropagationPhase = 'target' | 'bubble';
export type GameplayInteractionOutcome = 'unhandled' | 'handled' | 'stopped' | 'canceled';
export type GameplayInteractionVector2 = readonly [
    number,
    number
];
export interface GameplayInteractionModifiers {
    readonly alt: boolean;
    readonly control: boolean;
    readonly meta: boolean;
    readonly shift: boolean;
}
export interface GameplayInteractionAttempt {
    readonly version: 1;
    readonly sequence: number;
    readonly tick: number;
    readonly intent: string;
    readonly actionId: string;
    readonly edge: GameplayInteractionEdge;
    readonly contactId: string;
    readonly position: GameplayInteractionVector2 | null;
    readonly delta: GameplayInteractionVector2;
    readonly button: number | null;
    readonly modifiers: GameplayInteractionModifiers;
}
export interface GameplayInteractionCandidate {
    readonly target: GameplayEntityHandle;
    readonly priority: number;
    readonly distance: number;
}
export interface GameplayInteractionEvent {
    readonly attempt: GameplayInteractionAttempt;
    readonly target: GameplayEntityHandle;
    readonly currentTarget: GameplayEntityHandle;
    readonly path: readonly GameplayEntityHandle[];
    readonly phase: GameplayInteractionPropagationPhase;
    readonly candidateRank: number;
}
export type GameplayInteractionFocusKind = 'focus-enter' | 'focus-leave';
export interface GameplayInteractionFocusEvent {
    readonly kind: GameplayInteractionFocusKind;
    readonly attempt: GameplayInteractionAttempt;
    readonly contactId: string;
    readonly target: GameplayEntityHandle;
    readonly currentTarget: GameplayEntityHandle;
    readonly path: readonly GameplayEntityHandle[];
    readonly phase: GameplayInteractionPropagationPhase;
}
export interface GameplayInteractionFocusResult {
    readonly sequence: number;
    readonly previous: GameplayEntityHandle | null;
    readonly current: GameplayEntityHandle | null;
    readonly deliveredTo: readonly GameplayEntityHandle[];
}
export interface GameplayInteractionResult {
    readonly sequence: number;
    readonly outcome: GameplayInteractionOutcome;
    readonly target: GameplayEntityHandle | null;
    readonly deliveredTo: readonly GameplayEntityHandle[];
}
export type GameplayInteractionHandlerOutcome = 'unhandled' | 'handled' | 'stopped' | 'canceled';
export type GameplayInteractionHandler = (event: GameplayInteractionEvent) => GameplayInteractionHandlerOutcome | void;
export type GameplayInteractionFocusHandler = (event: GameplayInteractionFocusEvent) => void;
export interface GameplayInteractionTargetOptions {
    readonly priority?: number;
    readonly handler: GameplayInteractionHandler;
    readonly focusHandler?: GameplayInteractionFocusHandler;
}
export interface GameplayInteractionTargetRegistration {
    readonly disposed: boolean;
    dispose(): void;
}
export interface GameplayInteractionRouterInspectionSnapshot {
    readonly targetCount: number;
    readonly activeDispatches: number;
    readonly captureCount: number;
    readonly focusCount: number;
}
export interface GameplayInteractionRouterApi {
    register(entity: GameplayEntityHandle, options: GameplayInteractionTargetOptions): GameplayInteractionTargetRegistration;
    has(entity: GameplayEntityHandle): boolean;
    dispatch(attempt: GameplayInteractionAttempt, candidates: readonly GameplayInteractionCandidate[]): GameplayInteractionResult;
    capture(contactId: string, entity: GameplayEntityHandle): void;
    releaseCapture(contactId: string): boolean;
    captured(contactId: string): GameplayEntityHandle | null;
    updateFocus(attempt: GameplayInteractionAttempt, candidates: readonly GameplayInteractionCandidate[]): GameplayInteractionFocusResult;
    focused(contactId: string): GameplayEntityHandle | null;
    clearContact(attempt: GameplayInteractionAttempt): GameplayInteractionFocusResult;
    inspect(): GameplayInteractionRouterInspectionSnapshot;
}
export interface GameplayInteractionActionBinding {
    readonly actionId: string;
    readonly intent: string;
    readonly positionActionId?: string;
    readonly contactId?: string;
    readonly button?: number | null;
}
export type GameplayInteractionPickStatus = 'resolved' | 'unavailable' | 'canceled';
export interface GameplayInteractionPickAdapterResponse {
    readonly status: 'resolved' | 'canceled';
    readonly candidates: readonly GameplayInteractionCandidate[];
}
export interface GameplayInteractionPickAdapter {
    readonly id: string;
    pick(attempt: GameplayInteractionAttempt): GameplayInteractionPickAdapterResponse;
    dispose?(): void;
}
export interface GameplayInteractionPickResult {
    readonly sequence: number;
    readonly adapterId: string | null;
    readonly status: GameplayInteractionPickStatus;
    readonly candidates: readonly GameplayInteractionCandidate[];
}
export interface GameplayInteractionPickAdapterRegistration {
    readonly disposed: boolean;
    dispose(): void;
}
export interface GameplayInteractionPickerInspectionSnapshot {
    readonly adapterId: string | null;
    readonly activeResolutions: number;
    readonly destroyed: boolean;
}
export interface GameplayInteractionPickerApi {
    replace(adapter: GameplayInteractionPickAdapter | null): GameplayInteractionPickAdapterRegistration | null;
    resolve(attempt: GameplayInteractionAttempt): GameplayInteractionPickResult;
    inspect(): GameplayInteractionPickerInspectionSnapshot;
    destroy(): void;
}
export declare function snapshotGameplayInteractionAttempt(value: unknown): GameplayInteractionAttempt;
export declare function snapshotGameplayInteractionCandidates(values: unknown, maximum?: number): readonly GameplayInteractionCandidate[];
export declare function serializeGameplayInteractionAttempt(value: GameplayInteractionAttempt): string;
export declare function hashGameplayInteractionAttempt(value: GameplayInteractionAttempt): string;
