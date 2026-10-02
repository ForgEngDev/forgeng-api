import type { ForgePluginV2Descriptor } from 'forgeng/contracts/plugin-v2';
import type { Physics2dArcadeSceneFactory } from 'forgeng/contracts/physics-2d';
export declare const ARCADE_2D_PLUGIN_ID: "forgeng.physics-2d-arcade:plugin";
export declare const ARCADE_2D_SCENE_FACTORY: Physics2dArcadeSceneFactory;
export declare function createArcade2dPlugin(): ForgePluginV2Descriptor;
export { FORGE_PHYSICS_2D_ARCADE_CAPABILITY } from 'forgeng/contracts/physics-2d';
export type * from 'forgeng/contracts/physics-2d';
