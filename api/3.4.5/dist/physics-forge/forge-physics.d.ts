/**
 * ForgePhysics addon declarations.
 *
 * This file is intentionally a hand-curated CDN/package facade. It avoids
 * referencing engine-private source paths while preserving the public plugin
 * contract exported by packages/physics-forge/src/index.ts.
 */
import type { PhysicsProviderDescriptor, } from 'forgeng/contracts/physics';
export type Vec3 = [
    number,
    number,
    number
];
export type Quat = [
    number,
    number,
    number,
    number
];
export type SimulationPhysicsBroadphaseType = 'brute-force' | 'spatial-hash' | 'spatial-hash-on';
export type SimulationPhysicsParallelSolverMode = boolean | 'auto';
export type ForgePluginKind = 'runtime' | 'physics' | (string & {});
export type ForgeLogMetadata = Readonly<Record<string, unknown>>;
export interface ForgeLogContext {
    readonly metadata?: ForgeLogMetadata;
    readonly error?: unknown;
}
export interface ForgeLogger {
    trace(message: string, context?: ForgeLogContext): void;
    debug(message: string, context?: ForgeLogContext): void;
    info(message: string, context?: ForgeLogContext): void;
    warn(message: string, context?: ForgeLogContext): void;
    error(message: string, context?: ForgeLogContext): void;
    fatal(message: string, context?: ForgeLogContext): void;
    child(category: string, metadata?: ForgeLogMetadata): ForgeLogger;
}
export interface ForgePluginAssets {
    resolveUrl(path: string): string;
    fetch(path: string, init?: RequestInit): Promise<Response>;
    fetchJson<T = unknown>(path: string, init?: RequestInit): Promise<T>;
}
export interface ForgePluginContext {
    readonly canvas: HTMLCanvasElement;
    readonly device: GPUDevice;
    readonly assets: ForgePluginAssets;
    readonly timing: {
        readonly fixedDt: number;
    };
    readonly logger: ForgeLogger;
}
export interface ForgePluginDescriptor {
    readonly id: string;
    readonly kind: ForgePluginKind;
    readonly version: string;
    install(context: ForgePluginContext): void | Promise<void>;
    fixedUpdate?(dt: number, stepIndex: number, stepCount: number, context: ForgePluginContext): void | Promise<void>;
    update?(dt: number, context: ForgePluginContext): void | Promise<void>;
    render?(dt: number, alpha: number, context: ForgePluginContext): void;
    destroy?(): void | Promise<void>;
}
export interface BodyAddConfig {
    mass: number;
    shapeType?: number;
    radius?: number;
    height?: number;
    halfExtents?: Vec3;
    position?: Vec3;
    orientation?: Quat;
    linearVelocity?: Vec3;
    angularVelocity?: Vec3;
    friction?: number;
    rollingResistance?: number;
    id?: string;
    dominance?: number;
    colliderFlags?: number;
}
export interface PairData {
    bodyIndexA: number;
    bodyIndexB: number;
}
export interface ContactData {
    bodyIndexA: number;
    bodyIndexB: number;
    normal?: Vec3;
    penetration?: number;
    lambda?: number;
    tangentLambda?: [
        number,
        number
    ];
    contactPoint?: Vec3;
}
export interface ForgePhysicsConfig {
    maxBodies?: number;
    maxPairs?: number;
    maxContacts?: number;
    enableReadbacks?: boolean;
    substeps?: number;
    solverIterations?: number;
    gravity?: Vec3;
    groundHeight?: number;
    groundSlop?: number;
    linearSleepThreshold?: number;
    angularSleepThreshold?: number;
    sleepTimeThreshold?: number;
    restitution?: number;
    stictionEps?: number;
    shockVelocityThreshold?: number;
    defaultFriction?: number;
    rollingResistanceDefault?: number;
    contactSlop?: number;
    warmStartCoefficient?: number;
    velocityDampingThreshold?: number;
    shockPropagationIterations?: number;
    shockPropagationCoefficient?: number;
    broadphaseCellSize?: number;
    velocityDamping?: number;
    airDensity?: number;
    dragCoefficient?: number;
    windVelocity?: Vec3;
    sortContactsByPenetration?: boolean;
    broadphaseType?: SimulationPhysicsBroadphaseType;
    useParallelSolver?: SimulationPhysicsParallelSolverMode;
    parallelSolverAutoMinBodies?: number;
    shockPropagationContactThreshold?: number;
    enableCcd?: number;
    ccdVelocityThreshold?: number;
    maxLinearVelocity?: number;
    wakeRadius?: number;
    baumgarteFactor?: number;
    staticFriction?: number;
    dynamicFriction?: number;
    angularDamping?: number;
    captureContactsBeforeSolver?: boolean;
    debugFlags?: number;
    projectionContactMaxMeters?: number;
    projectionMinSlopMultiplier?: number;
    projectionBodyBudgetMaxMeters?: number;
    projectionStrengthScale?: number;
}
export interface SimulationPhysicsFixedStepOptions {
    tickId?: number;
    alpha?: number;
    [key: string]: unknown;
}
export type SimulationPhysicsConfigPatch = Partial<ForgePhysicsConfig>;
export interface SimulationPhysicsCommand {
    type: string;
    payload?: unknown;
    [key: string]: unknown;
}
export interface SimulationPhysicsBodyData {
    position: Vec3;
    orientation: Quat;
    linearVelocity: Vec3;
    angularVelocity: Vec3;
    invMass: number;
    [key: string]: unknown;
}
export interface SimulationPhysicsColliderData {
    shapeType: number;
    radius: number;
    height: number;
    halfExtents: Vec3;
    colliderFlags?: number;
    [key: string]: unknown;
}
export interface SimulationPhysicsSnapshotOptions {
    deferGpuCopy?: boolean;
    [key: string]: unknown;
}
export interface SimulationPhysicsStateExport {
    bodyCount: number;
    bodies: SimulationPhysicsBodyData[];
    colliders: SimulationPhysicsColliderData[];
    freeIndices: number[];
    bodyIdToIndex: Array<[
        string,
        number
    ]>;
}
export interface SimulationPhysicsSolverStateSnapshot {
    gravity: Vec3;
    substeps: number;
    solverIterations: number;
    broadphaseType: SimulationPhysicsBroadphaseType;
    useParallelSolver: SimulationPhysicsParallelSolverMode;
    wakeRadius: number;
    enableCcd: number;
    maxLinearVelocity: number;
    groundHeight: number;
    groundSlop: number;
    restitution: number;
    defaultFriction: number;
    staticFriction: number;
    dynamicFriction: number;
    rollingResistanceDefault: number;
    constraintCounts: {
        distance: number;
        hinge: number;
    };
    snapshotHistory: {
        capacity: number;
        size: number;
        latestTick: number | null;
        nextSlot: number;
    };
}
export interface SimulationPhysicsRenderSyncState {
    bodyCount: number;
    bodiesBuffer: GPUBuffer | null;
    collidersBuffer: GPUBuffer | null;
    prevBodiesBuffer: GPUBuffer | null;
}
export interface ISimulationPhysicsState {
    fixedStep(dt: number, options?: SimulationPhysicsFixedStepOptions): void | Promise<void>;
    applyCommand(command: SimulationPhysicsCommand | null): void;
    saveStateSnapshot(tickId: number, options?: SimulationPhysicsSnapshotOptions): void;
    loadStateSnapshot(tickId: number, options?: SimulationPhysicsSnapshotOptions): boolean;
    exportState(): SimulationPhysicsStateExport;
    importAuthoritativeState(state: SimulationPhysicsStateExport, options?: SimulationPhysicsSnapshotOptions): void;
    getSolverStateSnapshot(): SimulationPhysicsSolverStateSnapshot;
    getRenderSyncState(): SimulationPhysicsRenderSyncState;
}
export declare class ForgePhysics implements ISimulationPhysicsState {
    readonly maxBodies: number;
    readonly maxPairs: number;
    readonly maxContacts: number;
    constructor(config?: ForgePhysicsConfig);
    init(device: GPUDevice): Promise<void>;
    destroy(): void;
    step(dt: number, options?: SimulationPhysicsFixedStepOptions): void | Promise<void>;
    fixedStep(dt: number, options?: SimulationPhysicsFixedStepOptions): void | Promise<void>;
    applyCommand(command: SimulationPhysicsCommand | null): void;
    addBody(config: BodyAddConfig): void;
    removeBody(id: string): void;
    setGravity(gravity: number[]): void;
    setConfig(config: Record<string, unknown>): void;
    getConfig(): ForgePhysicsConfig;
    saveStateSnapshot(tickId: number, options?: SimulationPhysicsSnapshotOptions): void;
    loadStateSnapshot(tickId: number, options?: SimulationPhysicsSnapshotOptions): boolean;
    exportState(): SimulationPhysicsStateExport;
    importAuthoritativeState(state: SimulationPhysicsStateExport, options?: SimulationPhysicsSnapshotOptions): void;
    setSnapshotHistoryCapacity(capacity: number): void;
    getSnapshotSlotForTick(tickId: number): number | null;
    getSnapshotHistoryInfo(): {
        capacity: number;
        size: number;
        latestTick: number | null;
        nextSlot: number;
    };
    getSolverStateSnapshot(): SimulationPhysicsSolverStateSnapshot;
    getRenderSyncState(): SimulationPhysicsRenderSyncState;
    getMaxPairs(): number;
    getMaxContacts(): number;
    getBodyCount(): number;
    getBodiesBuffer(): GPUBuffer | null;
    getCollidersBuffer(): GPUBuffer | null;
    getPrevBodiesBuffer(): GPUBuffer | null;
    getCollider(index: number): SimulationPhysicsColliderData | null;
    setBodyCollisionEnabled(bodyIndex: number, enabled: boolean): void;
    addDistanceConstraint(bodyA: number, bodyB: number, restLength?: number, compliance?: number): void;
    addHingeConstraint(bodyA: number, bodyB: number, pivotA: Vec3, pivotB: Vec3, axisA: Vec3, axisB: Vec3, compliance?: number): void;
    resetBodyState(bodyIndex: number, partial: {
        linearVelocity?: Vec3;
        angularVelocity?: Vec3;
        sleepState?: number;
    }): void;
    teleportBody(bodyIndex: number, position: Vec3): void;
    getCharacterObstacles(): unknown[];
    readBodiesAsync(): Promise<SimulationPhysicsBodyData[]>;
    readPairsAsync(): Promise<{
        pairs: PairData[];
    }>;
    readContactsAsync(): Promise<{
        count: number;
        contacts: ContactData[];
    }>;
    readContactsBeforeSolverAsync(): Promise<{
        count: number;
        contacts: ContactData[];
    }>;
    readBodyDebugAsync(): Promise<unknown[]>;
}
export declare const FORGE_PHYSICS_PLUGIN_ID: 'forgeng.physics.forge';
export declare const FORGE_PHYSICS_PLUGIN_VERSION: '0.9.2';
export interface ForgePhysicsPluginDescriptor extends ForgePluginDescriptor {
    id: typeof FORGE_PHYSICS_PLUGIN_ID;
    kind: 'physics';
    version: typeof FORGE_PHYSICS_PLUGIN_VERSION;
    create(config?: ForgePhysicsConfig): ForgePhysics;
}
export declare function createForgePhysicsPlugin(config?: ForgePhysicsConfig): ForgePhysics;
export declare function createForgePhysicsPluginDescriptor(config?: ForgePhysicsConfig): ForgePhysicsPluginDescriptor;
export declare const FORGE_PHYSICS_PROVIDER_ID: 'forgeng.physics.forge';
export declare const FORGE_PHYSICS_PROVIDER_IMPLEMENTATION_VERSION: '0.9.2';
export interface ForgePhysicsProviderOptions {
    readonly physics?: ForgePhysicsConfig;
}
export declare function createForgePhysicsProviderDescriptor(defaults?: ForgePhysicsProviderOptions): PhysicsProviderDescriptor<ForgePhysicsProviderOptions>;
export declare const FORGE_PHYSICS_PROVIDER_DESCRIPTOR: PhysicsProviderDescriptor<ForgePhysicsProviderOptions>;
