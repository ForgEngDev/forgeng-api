import { type GameplayCapabilityId } from './GameplayCommon';
export interface GameplayEntityCapabilityDefinitionInput<T> {
    readonly id: GameplayCapabilityId;
    readonly validate: (value: unknown) => value is T;
}
export interface GameplayEntityCapabilityDefinition<T> {
    readonly kind: 'entity-capability';
    readonly id: GameplayCapabilityId;
    readonly validateValue: (value: unknown, path?: string) => T;
}
export interface GameplayEntityCapabilityAttachOptions<T> {
    readonly release?: (value: T) => void | Promise<void>;
}
export declare function defineEntityCapability<T>(input: GameplayEntityCapabilityDefinitionInput<T>): GameplayEntityCapabilityDefinition<T>;
