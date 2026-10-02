import type { GameplayActionMapId, GameplayCapabilityId, GameplayCommandId, GameplayComponentId, GameplayComponentReference, GameplayEventId, GameplayEntityGroupId, GameplayEntityTagId, GameplayEventReference, GameplayGameId, GameplayJsonObject, GameplayJsonValue, GameplayPrefabId, GameplayPrefabReference, GameplaySceneId, GameplaySceneReference, GameplaySystemId, GameplaySystemReference } from './GameplayCommon';
import type { GameplayCommandContext, GameplayComponentInitializeContext, GameplaySceneSetupContext, GameplaySystemContext } from './GameplayContextContracts';
export type { ActionDefinitionInput, ActionMapDefinition, ActionMapDefinitionBase, ActionReference, ActionValueForKind, ActionValueKind, } from '../actions';
import type { ActionMapDefinition } from '../actions';
export type GameplaySystemPhase = 'fixed-simulation' | 'post-simulation-sync' | 'frame' | 'render-sync';
export type GameplayComponentSchema = Readonly<{
    kind: 'number';
    minimum?: number;
    maximum?: number;
    integer?: boolean;
}> | Readonly<{
    kind: 'boolean';
}> | Readonly<{
    kind: 'string';
    minimumLength?: number;
    maximumLength?: number;
    pattern?: string;
}> | Readonly<{
    kind: 'json';
    schemaVersion: number;
}>;
export interface ComponentDefinitionInput<T = GameplayJsonValue> {
    readonly id: GameplayComponentId;
    readonly version?: number;
    readonly schema: GameplayComponentSchema;
    readonly default: T;
    readonly serializable?: boolean;
    readonly validate?: (value: unknown) => value is T;
    readonly initialize?: (context: GameplayComponentInitializeContext<T>) => void | (() => void | Promise<void>);
    readonly serialize?: (value: T) => GameplayJsonValue;
    readonly deserialize?: (value: GameplayJsonValue) => T;
    readonly migrations?: Readonly<Record<number, (value: GameplayJsonValue) => GameplayJsonValue>>;
}
export interface ComponentInitializer<T = GameplayJsonValue> {
    readonly kind: 'component-initializer';
    readonly component: ComponentDefinition<T>;
    readonly value: T;
}
export interface ComponentDefinition<T = GameplayJsonValue> {
    (value?: T): ComponentInitializer<T>;
    readonly kind: 'component';
    readonly id: GameplayComponentId;
    readonly version: number;
    readonly schema: GameplayComponentSchema;
    readonly default: T;
    readonly serializable: boolean;
    readonly validateValue: (value: unknown, path?: string) => T;
    readonly initialize?: ComponentDefinitionInput<T>['initialize'];
    readonly serialize?: ComponentDefinitionInput<T>['serialize'];
    readonly deserialize?: ComponentDefinitionInput<T>['deserialize'];
    readonly migrations: Readonly<Record<number, (value: GameplayJsonValue) => GameplayJsonValue>>;
    readonly reference: GameplayComponentReference;
}
export interface NumberComponentDefinitionInput extends Omit<ComponentDefinitionInput<number>, 'schema'> {
    readonly minimum?: number;
    readonly maximum?: number;
    readonly integer?: boolean;
}
export interface BooleanComponentDefinitionInput extends Omit<ComponentDefinitionInput<boolean>, 'schema'> {
}
export interface StringComponentDefinitionInput extends Omit<ComponentDefinitionInput<string>, 'schema'> {
    readonly minimumLength?: number;
    readonly maximumLength?: number;
    readonly pattern?: string;
}
export interface ComponentAuthoringApi {
    number(input: NumberComponentDefinitionInput): ComponentDefinition<number>;
    boolean(input: BooleanComponentDefinitionInput): ComponentDefinition<boolean>;
    string(input: StringComponentDefinitionInput): ComponentDefinition<string>;
    json<T>(input: Omit<ComponentDefinitionInput<T>, 'schema'> & {
        readonly schemaVersion?: number;
    }): ComponentDefinition<T>;
}
export interface EventDefinitionInput<T = GameplayJsonValue> {
    readonly id: GameplayEventId;
    readonly version?: number;
    readonly validate?: (value: unknown) => value is T;
    readonly replayPolicy?: 'deliver' | 'suppress';
}
export interface EventDefinition<T = GameplayJsonValue> {
    readonly kind: 'event';
    readonly id: GameplayEventId;
    readonly version: number;
    readonly replayPolicy: 'deliver' | 'suppress';
    readonly validateValue: (value: unknown, path?: string) => T;
    readonly reference: GameplayEventReference;
}
export interface CommandDefinitionInput<T = GameplayJsonValue> {
    readonly id: GameplayCommandId;
    readonly version?: number;
    readonly validate?: (value: unknown) => value is T;
    readonly replayPolicy?: 'deliver' | 'suppress';
    readonly handle?: (context: GameplayCommandContext, value: T) => void;
}
export interface CommandDefinition<T = GameplayJsonValue> {
    readonly kind: 'command';
    readonly id: GameplayCommandId;
    readonly version: number;
    readonly replayPolicy: 'deliver' | 'suppress';
    readonly validateValue: (value: unknown, path?: string) => T;
    readonly handle?: CommandDefinitionInput<T>['handle'];
    readonly reference: {
        readonly kind: 'command';
        readonly id: GameplayCommandId;
    };
}
export interface SystemDefinitionInput {
    readonly id: GameplaySystemId;
    readonly version?: number;
    readonly phase: GameplaySystemPhase;
    readonly before?: readonly (GameplaySystemReference | SystemDefinition)[];
    readonly after?: readonly (GameplaySystemReference | SystemDefinition)[];
    readonly reads?: readonly (ComponentDefinition<any> | GameplayComponentReference | ActionMapDefinition)[];
    readonly writes?: readonly (ComponentDefinition<any> | GameplayComponentReference)[];
    readonly failurePolicy?: 'fail-scene' | 'disable-system';
    readonly initialize?: (context: GameplaySystemContext) => void | Promise<void>;
    readonly start?: (context: GameplaySystemContext) => void | Promise<void>;
    readonly run: (context: GameplaySystemContext) => void | Promise<void>;
    readonly stop?: (context: GameplaySystemContext) => void | Promise<void>;
    readonly destroy?: (context: GameplaySystemContext) => void | Promise<void>;
}
export interface SystemDefinition extends Omit<SystemDefinitionInput, 'version' | 'before' | 'after' | 'reads' | 'writes' | 'failurePolicy'> {
    readonly kind: 'system';
    readonly version: number;
    readonly before: readonly GameplaySystemReference[];
    readonly after: readonly GameplaySystemReference[];
    readonly reads: readonly (GameplayComponentReference | {
        readonly kind: 'action-map';
        readonly id: GameplayActionMapId;
    })[];
    readonly writes: readonly GameplayComponentReference[];
    readonly failurePolicy: 'fail-scene' | 'disable-system';
    readonly reference: GameplaySystemReference;
}
export interface PrefabChildInput {
    readonly path: string;
    readonly prefab: PrefabDefinition | GameplayPrefabReference;
    readonly components?: readonly ComponentInitializer<any>[];
}
export interface GameplayPrefabPoolPolicy {
    readonly maxRetained: number;
}
export interface PrefabDefinitionInput {
    readonly id: GameplayPrefabId;
    readonly version?: number;
    readonly components?: readonly ComponentInitializer<any>[];
    readonly children?: readonly PrefabChildInput[];
    readonly variantOf?: PrefabDefinition | GameplayPrefabReference;
    readonly assets?: readonly {
        readonly id: string;
        readonly kind?: string;
    }[];
    readonly capabilities?: readonly GameplayCapabilityId[];
    readonly entityCapabilities?: readonly GameplayCapabilityId[];
    readonly tags?: readonly GameplayEntityTagId[];
    readonly groups?: readonly GameplayEntityGroupId[];
    readonly pool?: GameplayPrefabPoolPolicy;
    readonly metadata?: GameplayJsonObject;
}
export interface PrefabDefinition {
    readonly kind: 'prefab';
    readonly id: GameplayPrefabId;
    readonly version: number;
    readonly components: readonly ComponentInitializer<any>[];
    readonly children: readonly Readonly<{
        path: string;
        prefab: GameplayPrefabReference;
        definition?: PrefabDefinition;
        components: readonly ComponentInitializer<any>[];
    }>[];
    readonly variantOf: GameplayPrefabReference | null;
    readonly variantDefinition?: PrefabDefinition;
    readonly assets: readonly Readonly<{
        id: string;
        kind?: string;
    }>[];
    readonly capabilities: readonly GameplayCapabilityId[];
    readonly entityCapabilities: readonly GameplayCapabilityId[];
    readonly tags: readonly GameplayEntityTagId[];
    readonly groups: readonly GameplayEntityGroupId[];
    readonly pool: GameplayPrefabPoolPolicy | null;
    readonly metadata?: GameplayJsonObject;
    readonly reference: GameplayPrefabReference;
}
export interface SceneEntityDeclaration {
    readonly prefab: PrefabDefinition | GameplayPrefabReference;
    readonly id?: string;
    readonly components?: readonly ComponentInitializer<any>[];
}
export interface SceneDefinitionInput {
    readonly id: GameplaySceneId;
    readonly version?: number;
    readonly assets?: {
        readonly preload?: readonly string[];
        readonly startup?: 'critical' | 'deferred';
    };
    readonly input?: {
        readonly maps?: readonly ActionMapDefinition[];
    };
    readonly capabilities?: {
        readonly required?: readonly GameplayCapabilityId[];
        readonly optional?: readonly GameplayCapabilityId[];
    };
    readonly components?: readonly ComponentDefinition<any>[];
    readonly prefabs?: readonly PrefabDefinition[];
    readonly systems?: readonly SystemDefinition[];
    readonly events?: readonly EventDefinition<any>[];
    readonly commands?: readonly CommandDefinition<any>[];
    readonly entities?: readonly SceneEntityDeclaration[];
    readonly setup?: (context: GameplaySceneSetupContext) => void | Promise<void>;
    readonly deferred?: (context: GameplaySceneSetupContext) => void | Promise<void>;
    readonly metadata?: GameplayJsonObject;
}
export interface SceneDefinition extends Omit<SceneDefinitionInput, 'version' | 'assets' | 'input' | 'capabilities' | 'components' | 'prefabs' | 'systems' | 'events' | 'commands' | 'entities' | 'metadata'> {
    readonly kind: 'scene';
    readonly version: number;
    readonly assets: Readonly<{
        preload: readonly string[];
        startup: 'critical' | 'deferred';
    }>;
    readonly input: Readonly<{
        maps: readonly ActionMapDefinition[];
    }>;
    readonly capabilities: Readonly<{
        required: readonly GameplayCapabilityId[];
        optional: readonly GameplayCapabilityId[];
    }>;
    readonly components: readonly ComponentDefinition<any>[];
    readonly prefabs: readonly PrefabDefinition[];
    readonly systems: readonly SystemDefinition[];
    readonly events: readonly EventDefinition<any>[];
    readonly commands: readonly CommandDefinition<any>[];
    readonly entities: readonly Readonly<{
        prefab: GameplayPrefabReference;
        definition?: PrefabDefinition;
        id?: string;
        components: readonly ComponentInitializer<any>[];
    }>[];
    readonly metadata?: GameplayJsonObject;
    readonly reference: GameplaySceneReference;
}
export interface GameDefinitionInput {
    readonly id: GameplayGameId;
    readonly version?: number;
    readonly scenes: readonly SceneDefinition[];
    readonly initialScene: SceneDefinition | GameplaySceneReference;
    readonly components?: readonly ComponentDefinition<any>[];
    readonly prefabs?: readonly PrefabDefinition[];
    readonly systems?: readonly SystemDefinition[];
    readonly events?: readonly EventDefinition<any>[];
    readonly commands?: readonly CommandDefinition<any>[];
    readonly actionMaps?: readonly ActionMapDefinition[];
    readonly randomSeed?: number;
    readonly metadata?: GameplayJsonObject;
}
export interface GameDefinition extends Omit<GameDefinitionInput, 'version' | 'initialScene' | 'components' | 'prefabs' | 'systems' | 'events' | 'commands' | 'actionMaps' | 'randomSeed' | 'metadata'> {
    readonly kind: 'game';
    readonly version: number;
    readonly initialScene: GameplaySceneReference;
    readonly components: readonly ComponentDefinition<any>[];
    readonly prefabs: readonly PrefabDefinition[];
    readonly systems: readonly SystemDefinition[];
    readonly events: readonly EventDefinition<any>[];
    readonly commands: readonly CommandDefinition<any>[];
    readonly actionMaps: readonly ActionMapDefinition[];
    readonly randomSeed: number;
    readonly metadata?: GameplayJsonObject;
}
