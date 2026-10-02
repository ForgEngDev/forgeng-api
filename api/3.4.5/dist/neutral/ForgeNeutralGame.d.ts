import type { ForgePluginV2Descriptor } from 'forgeng/contracts/plugin-v2';
import type { RenderCompositionDescriptor, RenderCompositionSnapshot, SurfaceSnapshot } from 'forgeng/contracts/render-composition';
import type { NeutralSceneDefinition, NeutralSceneOwnerSnapshot } from 'forgeng/contracts/scene';
export interface ForgeNeutralSurfaceOptions {
    readonly logicalWidth?: number;
    readonly logicalHeight?: number;
    readonly pixelRatio?: number;
    readonly safeArea?: readonly [
        number,
        number,
        number,
        number
    ];
    readonly visible?: boolean;
}
export interface ForgeNeutralCreateOptions {
    readonly presentation: RenderCompositionDescriptor;
    readonly scenes?: readonly NeutralSceneDefinition[];
    readonly bootScene?: string;
    readonly surface?: ForgeNeutralSurfaceOptions;
    readonly services?: ReadonlyMap<string, unknown> | Readonly<Record<string, unknown>>;
    readonly plugins?: readonly ForgePluginV2Descriptor[];
}
export interface ForgeNeutralFrameInput {
    readonly dt: number;
    readonly steps?: number;
    readonly alpha?: number;
}
export interface ForgeNeutralGameSnapshot {
    readonly snapshotVersion: 1;
    readonly state: 'ready' | 'destroying' | 'destroyed';
    readonly surface: SurfaceSnapshot;
    readonly scenes: NeutralSceneOwnerSnapshot;
    readonly presentation: RenderCompositionSnapshot;
}
export declare class ForgeNeutralGame {
    private readonly surfaceAdapter;
    private readonly surfaceHost;
    private readonly sceneOwner;
    private readonly presentationOwner;
    private readonly plugins;
    private state;
    private simulationTick;
    private destroyPromise;
    private presentationRecovery;
    private constructor();
    static create(options: ForgeNeutralCreateOptions): Promise<ForgeNeutralGame>;
    startScene(sceneId: string): Promise<void>;
    pauseScene(): Promise<void>;
    resumeScene(): Promise<void>;
    stopScene(): Promise<void>;
    step(input: ForgeNeutralFrameInput): void;
    resize(options: ForgeNeutralSurfaceOptions): SurfaceSnapshot;
    recoverPresentation(reason?: string): Promise<void>;
    inspect(): ForgeNeutralGameSnapshot;
    destroy(): Promise<void>;
    private destroyInternal;
    private recoverPresentationInternal;
    private assertReady;
}
export declare function isForgeNeutralCreateOptions(value: unknown): value is ForgeNeutralCreateOptions;
export declare const createNeutralGame: (options: ForgeNeutralCreateOptions) => Promise<ForgeNeutralGame>;
