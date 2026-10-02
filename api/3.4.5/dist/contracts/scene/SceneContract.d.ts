export declare const NEUTRAL_SCENE_API_VERSION: 1;
export type NeutralSceneLifecycleState = 'registered' | 'preparing' | 'prepared' | 'active' | 'paused' | 'retiring' | 'destroying' | 'destroyed' | 'failed';
export interface NeutralLifetimeSignal {
    readonly aborted: boolean;
    readonly reason?: unknown;
    throwIfAborted(): void;
    subscribe(listener: (reason?: unknown) => void): () => void;
}
export interface NeutralSceneRequirement {
    readonly capability: string;
    readonly optional?: boolean;
}
export interface NeutralSceneServiceAccess {
    has(capability: string): boolean;
    get<T>(capability: string): T;
    getOptional<T>(capability: string): T | undefined;
}
export interface NeutralSceneActivationContext {
    readonly activation: number;
    readonly signal: NeutralLifetimeSignal;
    readonly services: NeutralSceneServiceAccess;
}
export interface NeutralSceneFrameContext {
    readonly frame: number;
    readonly dt: number;
    readonly steps: number;
    readonly alpha: number;
}
export interface NeutralSceneRuntime {
    prepare?(): void | Promise<void>;
    activate?(): void | Promise<void>;
    pause?(): void | Promise<void>;
    resume?(): void | Promise<void>;
    fixedUpdate?(context: NeutralSceneFrameContext): void;
    frameUpdate?(context: NeutralSceneFrameContext): void;
    presentationSync?(context: NeutralSceneFrameContext): void;
    retire?(): void | Promise<void>;
    destroy(): void | Promise<void>;
}
export interface NeutralSceneDefinition {
    readonly apiVersion: typeof NEUTRAL_SCENE_API_VERSION;
    readonly id: string;
    readonly requirements?: readonly NeutralSceneRequirement[];
    readonly extensions?: Readonly<Record<string, unknown>>;
    create(context: NeutralSceneActivationContext): NeutralSceneRuntime | Promise<NeutralSceneRuntime>;
}
export interface NeutralSceneLifecycleSnapshot {
    readonly snapshotVersion: 1;
    readonly sceneId: string;
    readonly activation: number;
    readonly state: NeutralSceneLifecycleState;
    readonly failureCode?: string;
}
export interface NeutralSceneOwnerSnapshot {
    readonly snapshotVersion: 1;
    readonly state: 'idle' | 'transitioning' | 'destroying' | 'destroyed';
    readonly active: NeutralSceneLifecycleSnapshot | null;
    readonly queuedSceneIds: readonly string[];
    readonly registeredSceneIds: readonly string[];
}
