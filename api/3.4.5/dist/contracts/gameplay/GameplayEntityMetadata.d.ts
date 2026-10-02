import { type GameplayContractLimits, type GameplayEntityGroupId, type GameplayEntityTagId } from './GameplayCommon';
export interface GameplayEntityMetadataInput {
    readonly tags?: readonly GameplayEntityTagId[];
    readonly groups?: readonly GameplayEntityGroupId[];
}
export interface GameplayEntityMetadataSnapshot {
    readonly tags: readonly GameplayEntityTagId[];
    readonly groups: readonly GameplayEntityGroupId[];
}
export declare function assertGameplayEntityLabel(value: unknown, path: string): asserts value is string;
export declare function normalizeGameplayEntityLabels(values: readonly string[] | undefined, path: string, maximum: number): readonly string[];
export declare function normalizeGameplayEntityMetadata(input: GameplayEntityMetadataInput | undefined, limits: Pick<GameplayContractLimits, 'maxEntityTags' | 'maxEntityGroups'>, path?: string): GameplayEntityMetadataSnapshot;
