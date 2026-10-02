import { type ForgePluginV2Context, type ForgePluginV2Descriptor } from 'forgeng/contracts/plugin-v2';
import type { MultiplayerClient } from './client.js';
export declare const MULTIPLAYER_PLUGIN_ID: 'forgeng.multiplayer:client';
export interface MultiplayerPluginOptions {
    /** Game-owned client configured with an explicit transport provider. */
    readonly client: MultiplayerClient;
    readonly id?: string;
    /** Game-owned activation, typically connect and then join an application room. */
    readonly activate?: (client: MultiplayerClient, context: ForgePluginV2Context) => void | Promise<void>;
    readonly fixedUpdate?: (client: MultiplayerClient, dt: number, steps: number) => void;
}
/** Adapts a generic multiplayer client to Forge Plugin V2 lifecycle ownership. */
export declare function createMultiplayerPlugin(options: MultiplayerPluginOptions): ForgePluginV2Descriptor;
