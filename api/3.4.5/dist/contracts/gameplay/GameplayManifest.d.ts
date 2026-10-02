import { type GameplayJsonObject } from './GameplayCommon';
import type { GameDefinition } from './GameplayDefinitions';
export interface GameplayManifest {
    readonly manifestVersion: 1;
    readonly contractVersion: '1.0.0';
    readonly id: string;
    readonly version: number;
    readonly initialScene: string;
    readonly randomSeed: number;
    readonly metadata?: GameplayJsonObject;
    readonly components: readonly GameplayJsonObject[];
    readonly prefabs: readonly GameplayJsonObject[];
    readonly systems: readonly GameplayJsonObject[];
    readonly events: readonly GameplayJsonObject[];
    readonly commands: readonly GameplayJsonObject[];
    readonly actionMaps: readonly GameplayJsonObject[];
    readonly scenes: readonly GameplayJsonObject[];
}
export declare function toGameplayManifest(game: GameDefinition): GameplayManifest;
