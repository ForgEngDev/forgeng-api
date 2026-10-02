import { type NeutralSceneDefinition } from './SceneContract';
export type NeutralSceneContractErrorCode = 'SCENE_VALUE_INVALID' | 'SCENE_VERSION_UNSUPPORTED' | 'SCENE_ID_INVALID' | 'SCENE_REQUIREMENT_DUPLICATE' | 'SCENE_CAPABILITY_INVALID' | 'SCENE_FACTORY_INVALID';
export declare class NeutralSceneContractError extends TypeError {
    readonly code: NeutralSceneContractErrorCode;
    readonly path: string;
    constructor(code: NeutralSceneContractErrorCode, path: string, message: string);
}
export declare function assertNeutralNamespacedId(value: unknown, path?: string): asserts value is string;
export declare function assertNeutralCapabilityId(value: unknown, path: string): asserts value is string;
export declare function validateNeutralSceneDefinition(value: unknown, path?: string): NeutralSceneDefinition;
