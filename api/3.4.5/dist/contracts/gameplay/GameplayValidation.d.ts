import { type GameplayJsonObject } from './GameplayCommon';
import type { ActionDefinitionInput, ActionMapDefinition, CommandDefinition, CommandDefinitionInput, ComponentAuthoringApi, ComponentDefinition, ComponentDefinitionInput, EventDefinition, EventDefinitionInput, PrefabDefinition, PrefabDefinitionInput, SceneDefinition, SceneDefinitionInput, SystemDefinition, SystemDefinitionInput } from './GameplayDefinitions';
export declare function defineComponent<T>(input: ComponentDefinitionInput<T>): ComponentDefinition<T>;
export declare const component: ComponentAuthoringApi;
export declare function defineActionMap<const T extends Readonly<Record<string, ActionDefinitionInput>>>(input: {
    readonly id: string;
    readonly actions: T;
    readonly enabledByDefault?: boolean;
    readonly priority?: number;
    readonly consume?: boolean;
    readonly metadata?: GameplayJsonObject;
}): ActionMapDefinition<T>;
export declare const actionMap: typeof defineActionMap;
export declare function defineEvent<T>(input: EventDefinitionInput<T>): EventDefinition<T>;
export declare function defineCommand<T>(input: CommandDefinitionInput<T>): CommandDefinition<T>;
export declare function defineSystem(input: SystemDefinitionInput): SystemDefinition;
export declare function definePrefab(input: PrefabDefinitionInput): PrefabDefinition;
export declare function defineScene(input: SceneDefinitionInput): SceneDefinition;
export declare function sceneRef(id: string): Readonly<{
    kind: 'scene';
    id: string;
}>;
export declare function prefabRef(id: string): Readonly<{
    kind: 'prefab';
    id: string;
}>;
export declare function systemRef(id: string): Readonly<{
    kind: 'system';
    id: string;
}>;
