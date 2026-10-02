import type { Render2dRect } from '../2d';
import type { Transform2dValue } from '../gameplay';
export declare const PHYSICS_2D_ARCADE_SCENE_API_VERSION: 1;
export declare const FORGE_PLUGIN_PHYSICS_2D_ARCADE_HOST_CAPABILITY: 'forgeng.plugin:physics-2d-arcade-host';
export declare const FORGE_PHYSICS_2D_ARCADE_CAPABILITY: 'forgeng.physics-2d:arcade';
export interface Physics2dEntityHandle {
    readonly entityId: string;
    readonly entityGeneration: number;
    readonly sceneGeneration: number;
    readonly domainGeneration: number;
}
export interface Physics2dCollisionFilter {
    readonly group: number;
    readonly mask: number;
}
export type Physics2dColliderResponseRole = 'solid' | 'trigger' | 'query-only';
export interface Physics2dArcadeMaterial {
    readonly friction?: number;
    readonly restitution?: number;
}
export interface Physics2dArcadeOneWayPlatform {
    readonly enabled?: boolean;
    readonly normal?: readonly [
        number,
        number
    ];
}
export interface Physics2dArcadeBallTuning {
    /** Constant top-down rolling slowdown in world units/s². Defaults to 0. */
    readonly rollingResistance?: number;
    /** Angular velocity drag in inverse seconds. Defaults to 0. */
    readonly angularDrag?: number;
    /** Per-step spin curve strength; positive spin curves clockwise relative to velocity. Defaults to 0. */
    readonly spinCurve?: number;
    /** Absolute angular velocity clamp in radians/s. Defaults to 1000. */
    readonly maxAngularVelocity?: number;
}
export interface Physics2dArcadeImpulseOptions {
    /** Optional contact offset from the body center; circle bodies convert it into spin. */
    readonly contactOffset?: readonly [
        number,
        number
    ];
    /** Additional angular velocity delta in radians/s. */
    readonly spin?: number;
    /** Optional post-impulse speed clamp. */
    readonly maxSpeed?: number;
}
export interface Physics2dArcadeKickOptions {
    readonly direction: readonly [
        number,
        number
    ];
    readonly power: number;
    readonly spin?: number;
    readonly maxSpeed?: number;
}
export interface Physics2dArcadeDribbleOptions {
    readonly target: readonly [
        number,
        number
    ];
    /** Soft steering strength within 0..1. Defaults to 0.35. */
    readonly strength?: number;
    /** Maximum desired dribble speed in world units/s. Defaults to 240. */
    readonly maxSpeed?: number;
    /** Optional angular velocity delta in radians/s. */
    readonly spin?: number;
}
export interface Physics2dAabbShape {
    readonly kind: 'aabb';
    readonly size: readonly [
        number,
        number
    ];
    readonly offset?: readonly [
        number,
        number
    ];
}
export interface Physics2dCircleShape {
    readonly kind: 'circle';
    readonly radius: number;
    readonly offset?: readonly [
        number,
        number
    ];
}
export type Physics2dCollisionShape = Physics2dAabbShape | Physics2dCircleShape;
export interface Physics2dColliderDefinition {
    readonly id: string;
    readonly entityId: string;
    readonly shape: Physics2dCollisionShape;
    readonly sensor?: boolean;
    readonly filter?: Partial<Physics2dCollisionFilter>;
    /** Arcade2D response role. Omitted colliders remain query-only for compatibility. */
    readonly responseRole?: Physics2dColliderResponseRole;
    /** Optional Arcade2D-only material; ignored by query-only/non-Arcade consumers. */
    readonly arcadeMaterial?: Physics2dArcadeMaterial;
    /** Optional Arcade2D-only one-way metadata; default normal is [0, 1]. */
    readonly arcadeOneWay?: Physics2dArcadeOneWayPlatform;
}
export interface Physics2dColliderHandle {
    readonly colliderId: string;
    readonly colliderGeneration: number;
    readonly entity: Physics2dEntityHandle;
    readonly sceneGeneration: number;
    readonly domainGeneration: number;
}
export interface Physics2dColliderSnapshot {
    readonly snapshotVersion: 1;
    readonly handle: Physics2dColliderHandle;
    readonly shape: Physics2dCollisionShape;
    readonly sensor: boolean;
    readonly filter: Physics2dCollisionFilter;
    readonly responseRole: Physics2dColliderResponseRole;
    readonly bounds: Render2dRect;
    readonly arcadeMaterial?: Required<Physics2dArcadeMaterial>;
    readonly arcadeOneWay?: Required<Physics2dArcadeOneWayPlatform>;
}
export interface Physics2dCollisionQuery {
    readonly shape: Physics2dCollisionShape;
    readonly position: readonly [
        number,
        number
    ];
    readonly filter?: Partial<Physics2dCollisionFilter>;
    readonly includeSensors?: boolean;
}
export type Physics2dArcadeQueryMode = 'closest' | 'all';
export type Physics2dArcadeParticipantType = 'body' | 'collider';
export interface Physics2dArcadeQueryOptions {
    readonly filter?: Partial<Physics2dCollisionFilter>;
    readonly responseRoles?: readonly Physics2dColliderResponseRole[];
    readonly participantTypes?: readonly Physics2dArcadeParticipantType[];
    /** Defaults to 64 and is capped by the implementation's public query budget. */
    readonly maxResults?: number;
}
export interface Physics2dArcadeCastOptions extends Physics2dArcadeQueryOptions {
    /** `closest` returns at most one deterministic hit; `all` returns ordered bounded hits. */
    readonly mode?: Physics2dArcadeQueryMode;
}
export interface Physics2dArcadePointQuery extends Physics2dArcadeQueryOptions {
    readonly point: readonly [
        number,
        number
    ];
}
export interface Physics2dArcadeRaycastQuery extends Physics2dArcadeCastOptions {
    readonly origin: readonly [
        number,
        number
    ];
    readonly direction: readonly [
        number,
        number
    ];
    readonly maxDistance?: number;
}
export interface Physics2dArcadeShapeCastQuery extends Physics2dArcadeCastOptions {
    readonly shape: Physics2dCollisionShape;
    readonly origin: readonly [
        number,
        number
    ];
    readonly translation: readonly [
        number,
        number
    ];
}
export interface Physics2dArcadeQueryHit {
    readonly snapshotVersion: 1;
    readonly fraction: number;
    readonly distance: number;
    readonly point: readonly [
        number,
        number
    ];
    readonly normal: readonly [
        number,
        number
    ];
    readonly collider: Physics2dColliderHandle;
    readonly body: Physics2dArcadeBodyHandle | null;
    readonly participantType: Physics2dArcadeParticipantType;
    readonly sensor: boolean;
    readonly responseRole: Physics2dColliderResponseRole;
}
export type Physics2dArcadeMotion = 'static' | 'dynamic' | 'kinematic';
export type Physics2dArcadeCcdMode = 'discrete' | 'swept';
export interface Physics2dArcadeConfig {
    readonly gravity?: readonly [
        number,
        number
    ];
    /** Uniform-grid broadphase cell size in world units. Defaults to 64. */
    readonly broadphaseCellSize?: number;
    /** Bounded deterministic position solver iterations. Defaults to 4. */
    readonly positionIterations?: number;
    /** Bounded deterministic velocity solver iterations. Defaults to 1. */
    readonly velocityIterations?: number;
    /** Minimum normal alignment for grounded/one-way support. Defaults to 0.7. */
    readonly groundNormalThreshold?: number;
    /** Incoming normal speed below this value does not bounce. Defaults to 5 world units/s. */
    readonly restitutionVelocityCutoff?: number;
    /** @deprecated Arcade2D uses the host fixedDeltaSeconds. If supplied, this must exactly match the host fixed step. */
    readonly fixedStepHz?: number;
}
export interface Physics2dArcadeConstraints {
    readonly lockX?: boolean;
    readonly lockY?: boolean;
    readonly maxVelocity?: readonly [
        number,
        number
    ];
}
export interface Physics2dArcadeBodyDefinition {
    readonly id: string;
    readonly entityId: string;
    readonly motion: Physics2dArcadeMotion;
    readonly shape: Physics2dCollisionShape;
    readonly sensor?: boolean;
    readonly filter?: Partial<Physics2dCollisionFilter>;
    readonly velocity?: readonly [
        number,
        number
    ];
    readonly acceleration?: readonly [
        number,
        number
    ];
    readonly gravityScale?: number;
    readonly constraints?: Physics2dArcadeConstraints;
    /** Defaults to `discrete`; use `swept` for bounded anti-tunneling on high-speed bodies. */
    readonly ccdMode?: Physics2dArcadeCcdMode;
    readonly maxCcdImpacts?: number;
    /** Linear drag in inverse seconds, applied during fixed-step integration. Defaults to 0. */
    readonly linearDrag?: number;
    /** Top-down spin state in radians/s; useful for balls/pucks. Defaults to 0. */
    readonly angularVelocity?: number;
    /** Optional top-down ball tuning: rolling resistance, angular drag, spin curve and angular clamp. */
    readonly ballTuning?: Physics2dArcadeBallTuning;
    /** Arcade material response. Friction and restitution default to 0 and combine with max(). */
    readonly material?: Physics2dArcadeMaterial;
    /** Marks this body as a one-way Arcade platform. Default normal is [0, 1]. */
    readonly oneWay?: Physics2dArcadeOneWayPlatform;
    /** Initial drop-through state for one-way platforms. */
    readonly dropThrough?: boolean;
}
export interface Physics2dArcadeBodyHandle {
    readonly bodyId: string;
    readonly bodyGeneration: number;
    readonly entity: Physics2dEntityHandle;
    readonly sceneGeneration: number;
    readonly domainGeneration: number;
}
export interface Physics2dArcadeBlockedState {
    readonly left: boolean;
    readonly right: boolean;
    readonly up: boolean;
    readonly down: boolean;
}
export interface Physics2dArcadeBodySnapshot {
    readonly snapshotVersion: 1;
    readonly handle: Physics2dArcadeBodyHandle;
    readonly motion: Physics2dArcadeMotion;
    readonly collider: Physics2dColliderHandle;
    readonly shape: Physics2dCollisionShape;
    readonly filter: Required<Physics2dCollisionFilter>;
    readonly sensor: boolean;
    readonly enabled: boolean;
    readonly velocity: readonly [
        number,
        number
    ];
    readonly acceleration: readonly [
        number,
        number
    ];
    readonly gravityScale: number;
    readonly constraints: Required<Physics2dArcadeConstraints>;
    readonly blocked: Physics2dArcadeBlockedState;
    readonly ccdMode: Physics2dArcadeCcdMode;
    readonly maxCcdImpacts: number;
    readonly linearDrag: number;
    readonly angularVelocity: number;
    readonly ballTuning: Required<Physics2dArcadeBallTuning>;
    readonly material: Required<Physics2dArcadeMaterial>;
    readonly oneWay: Required<Physics2dArcadeOneWayPlatform> | null;
    readonly dropThrough: boolean;
    readonly contacts: readonly string[];
}
export type Physics2dArcadeContactPhase = 'enter' | 'stay' | 'exit';
export type Physics2dArcadeContactKind = 'collision' | 'trigger';
export interface Physics2dArcadeBodyContactParticipant {
    readonly kind: 'body';
    readonly bodyId: string;
}
export interface Physics2dArcadeColliderContactParticipant {
    readonly kind: 'collider';
    readonly colliderId: string;
}
export type Physics2dArcadeContactParticipant = Physics2dArcadeBodyContactParticipant | Physics2dArcadeColliderContactParticipant;
export interface Physics2dArcadeContactEvent {
    readonly snapshotVersion: 1;
    readonly sequence: number;
    readonly tick: number;
    readonly phase: Physics2dArcadeContactPhase;
    readonly kind: Physics2dArcadeContactKind;
    readonly first: Physics2dArcadeContactParticipant;
    readonly second: Physics2dArcadeContactParticipant;
    /** @deprecated Use `first` and `second`; null when the participant is not a body. */
    readonly firstBodyId: string | null;
    /** @deprecated Use `first` and `second`; null when the participant is not a body. */
    readonly secondBodyId: string | null;
    readonly normal: readonly [
        number,
        number
    ];
}
export interface Physics2dArcadeInspection {
    readonly snapshotVersion: 1;
    readonly tick: number;
    readonly fixedDeltaSeconds: number;
    readonly deprecatedFixedStepHz: number | null;
    readonly bodies: number;
    readonly activeContacts: number;
    readonly queuedEvents: number;
    readonly destroyed: boolean;
    readonly broadphaseCellSize: number;
    readonly broadphaseStaticProxies: number;
    readonly broadphaseMovingProxies: number;
    readonly broadphaseExternalProxies: number;
    readonly broadphaseOccupiedCells: number;
    readonly broadphaseCandidatePairs: number;
    readonly broadphaseRejectedByFilter: number;
    readonly broadphaseRejectedByBounds: number;
    readonly broadphaseOversizedProxies: number;
    readonly broadphaseRebuilds: number;
    readonly narrowphasePairs: number;
    readonly ccdSweptBodies: number;
    readonly ccdCandidatePairs: number;
    readonly ccdImpacts: number;
    readonly ccdBudgetExhaustions: number;
    readonly solverPositionIterations: number;
    readonly solverVelocityIterations: number;
    readonly solverContacts: number;
    readonly queryCount: number;
    readonly queryResultsTruncated: number;
    readonly teleportCount: number;
    readonly debugSnapshots: number;
}
export interface Physics2dArcadeDebugColliderSnapshot {
    readonly collider: Physics2dColliderHandle;
    readonly body: Physics2dArcadeBodyHandle | null;
    readonly participantType: Physics2dArcadeParticipantType;
    readonly shape: Physics2dCollisionShape;
    readonly bounds: Render2dRect;
    readonly sweptBounds: Render2dRect;
    readonly sensor: boolean;
    readonly responseRole: Physics2dColliderResponseRole;
}
export interface Physics2dArcadeDebugContactSnapshot {
    readonly key: string;
    readonly first: Physics2dArcadeContactParticipant;
    readonly second: Physics2dArcadeContactParticipant;
    readonly kind: Physics2dArcadeContactKind;
    readonly normal: readonly [
        number,
        number
    ];
    readonly contactPoints: readonly (readonly [
        number,
        number
    ])[];
}
export interface Physics2dArcadeDebugCellSnapshot {
    readonly key: string;
    readonly x: number;
    readonly y: number;
    readonly colliderIds: readonly string[];
}
export interface Physics2dArcadeDebugSnapshot {
    readonly snapshotVersion: 1;
    readonly tick: number;
    readonly fixedDeltaSeconds: number;
    readonly cellSize: number;
    readonly colliders: readonly Physics2dArcadeDebugColliderSnapshot[];
    readonly contacts: readonly Physics2dArcadeDebugContactSnapshot[];
    readonly broadphaseCells: readonly Physics2dArcadeDebugCellSnapshot[];
}
export interface Physics2dArcadeContactSnapshot {
    readonly first: Physics2dArcadeContactParticipant;
    readonly second: Physics2dArcadeContactParticipant;
    /** @deprecated Use `first` and `second`; null when the participant is not a body. */
    readonly firstBodyId: string | null;
    /** @deprecated Use `first` and `second`; null when the participant is not a body. */
    readonly secondBodyId: string | null;
    readonly kind: Physics2dArcadeContactKind;
    readonly normal: readonly [
        number,
        number
    ];
}
export interface Physics2dArcadeCheckpoint {
    readonly snapshotVersion: 1;
    readonly tick: number;
    readonly fixedDeltaSeconds: number;
    readonly nextEventSequence: number;
    readonly bodies: readonly Physics2dArcadeBodySnapshot[];
    readonly activeContacts: readonly Physics2dArcadeContactSnapshot[];
    readonly events: readonly Physics2dArcadeContactEvent[];
}
export interface Physics2dCollisionWorldPort {
    create(definition: Physics2dColliderDefinition): Physics2dColliderHandle;
    get(colliderId: string): Physics2dColliderSnapshot | null;
    destroy(handle: Physics2dColliderHandle): void;
    overlap(handle: Physics2dColliderHandle, includeSensors?: boolean): readonly Physics2dColliderSnapshot[];
    responseColliders(): readonly Physics2dColliderSnapshot[];
    snapshots(): readonly Physics2dColliderSnapshot[];
}
export interface Physics2dArcadeSceneOptions {
    readonly sceneGeneration: number;
    readonly domainGeneration: number;
    readonly initialTick: number;
    readonly fixedDeltaSeconds: number;
    readonly config?: Physics2dArcadeConfig;
    readonly collisions: Physics2dCollisionWorldPort;
    readonly entityHandle: (entityId: string) => Physics2dEntityHandle;
    readonly validateEntity: (handle: Physics2dEntityHandle) => void;
    readonly isRootEntity: (handle: Physics2dEntityHandle) => boolean;
    readonly getTransform: (handle: Physics2dEntityHandle) => Transform2dValue | null;
    readonly setTransform: (handle: Physics2dEntityHandle, value: Transform2dValue) => void;
    readonly synchronize: () => void;
    readonly definitions?: readonly Physics2dArcadeBodyDefinition[];
}
export interface Physics2dArcadeSceneScope {
    create(definition: Physics2dArcadeBodyDefinition): Physics2dArcadeBodyHandle;
    get(id: string): Physics2dArcadeBodySnapshot | null;
    destroy(handle: Physics2dArcadeBodyHandle): void;
    removeEntity(entity: Physics2dEntityHandle): void;
    setVelocity(handle: Physics2dArcadeBodyHandle, value: readonly [
        number,
        number
    ]): Physics2dArcadeBodySnapshot;
    setAcceleration(handle: Physics2dArcadeBodyHandle, value: readonly [
        number,
        number
    ]): Physics2dArcadeBodySnapshot;
    setGravityScale(handle: Physics2dArcadeBodyHandle, value: number): Physics2dArcadeBodySnapshot;
    setTransform(handle: Physics2dArcadeBodyHandle, value: Transform2dValue): Physics2dArcadeBodySnapshot;
    teleport(handle: Physics2dArcadeBodyHandle, position: readonly [
        number,
        number
    ]): Physics2dArcadeBodySnapshot;
    setLinearDrag(handle: Physics2dArcadeBodyHandle, value: number): Physics2dArcadeBodySnapshot;
    setMaterial(handle: Physics2dArcadeBodyHandle, value: Physics2dArcadeMaterial): Physics2dArcadeBodySnapshot;
    setCcdMode(handle: Physics2dArcadeBodyHandle, value: Physics2dArcadeCcdMode, maxImpacts?: number): Physics2dArcadeBodySnapshot;
    setOneWay(handle: Physics2dArcadeBodyHandle, value: Physics2dArcadeOneWayPlatform | null): Physics2dArcadeBodySnapshot;
    setAngularVelocity(handle: Physics2dArcadeBodyHandle, value: number): Physics2dArcadeBodySnapshot;
    setBallTuning(handle: Physics2dArcadeBodyHandle, value: Physics2dArcadeBallTuning): Physics2dArcadeBodySnapshot;
    applyImpulse(handle: Physics2dArcadeBodyHandle, impulse: readonly [
        number,
        number
    ], options?: Physics2dArcadeImpulseOptions): Physics2dArcadeBodySnapshot;
    kick(handle: Physics2dArcadeBodyHandle, options: Physics2dArcadeKickOptions): Physics2dArcadeBodySnapshot;
    dribble(handle: Physics2dArcadeBodyHandle, options: Physics2dArcadeDribbleOptions): Physics2dArcadeBodySnapshot;
    setEnabled(handle: Physics2dArcadeBodyHandle, enabled: boolean): Physics2dArcadeBodySnapshot;
    setDropThrough(handle: Physics2dArcadeBodyHandle, enabled: boolean): Physics2dArcadeBodySnapshot;
    pointQuery(query: Physics2dArcadePointQuery): readonly Physics2dArcadeQueryHit[];
    raycast(query: Physics2dArcadeRaycastQuery): readonly Physics2dArcadeQueryHit[];
    shapeCast(query: Physics2dArcadeShapeCastQuery): readonly Physics2dArcadeQueryHit[];
    debugSnapshot(): Physics2dArcadeDebugSnapshot;
    advance(tick: number, deltaTicks: number, fixedDeltaSeconds: number): void;
    drainEvents(): readonly Physics2dArcadeContactEvent[];
    inspect(): Physics2dArcadeInspection;
    snapshots(): readonly Physics2dArcadeBodySnapshot[];
    assertColliderExternal(colliderId: string): void;
    removeExternalCollider(colliderId: string): void;
    checkpoint(): Physics2dArcadeCheckpoint;
    validateRestore(checkpoint: Physics2dArcadeCheckpoint): void;
    restore(checkpoint: Physics2dArcadeCheckpoint): void;
    clear(): void;
}
export interface Physics2dArcadeSceneFactory {
    readonly apiVersion: typeof PHYSICS_2D_ARCADE_SCENE_API_VERSION;
    create(options: Physics2dArcadeSceneOptions): Physics2dArcadeSceneScope;
}
export interface Physics2dArcadePluginRegistration {
    readonly active: boolean;
    dispose(): void;
}
export interface Physics2dArcadePluginHostAccessV1 {
    readonly apiVersion: 1;
    register(pluginId: string, factory: Physics2dArcadeSceneFactory): Physics2dArcadePluginRegistration;
}
