export type PhysicsVector3 = readonly [
    number,
    number,
    number
];
export type PhysicsQuaternion = readonly [
    number,
    number,
    number,
    number
];
export interface PhysicsTransform {
    readonly position: PhysicsVector3;
    readonly rotation: PhysicsQuaternion;
}
export interface PhysicsSphereShape {
    readonly kind: 'sphere';
    readonly radius: number;
}
export interface PhysicsBoxShape {
    readonly kind: 'box';
    readonly halfExtents: PhysicsVector3;
}
export interface PhysicsCapsuleShape {
    readonly kind: 'capsule';
    readonly radius: number;
    /** Half the distance between the centers of the two spherical caps. */
    readonly halfHeight: number;
}
export interface PhysicsConvexHullShape {
    readonly kind: 'convex-hull';
    readonly vertices: readonly PhysicsVector3[];
}
export interface PhysicsPlaneShape {
    readonly kind: 'plane';
    readonly normal: PhysicsVector3;
    readonly offset: number;
}
export type PhysicsShapeDefinition = PhysicsSphereShape | PhysicsBoxShape | PhysicsCapsuleShape | PhysicsConvexHullShape | PhysicsPlaneShape;
export interface PhysicsMaterialDefinition {
    readonly friction?: number;
    readonly restitution?: number;
    readonly rollingResistance?: number;
}
export interface PhysicsCollisionFilter {
    readonly group: number;
    readonly mask: number;
}
interface PhysicsBodyDefinitionBase {
    readonly id?: string;
    readonly shape: PhysicsShapeDefinition;
    readonly transform: PhysicsTransform;
    readonly linearVelocity?: PhysicsVector3;
    readonly angularVelocity?: PhysicsVector3;
    readonly material?: PhysicsMaterialDefinition;
    readonly collisionFilter?: PhysicsCollisionFilter;
}
export interface PhysicsDynamicBodyDefinition extends PhysicsBodyDefinitionBase {
    readonly motion: 'dynamic';
    readonly mass: number;
}
export interface PhysicsStaticBodyDefinition extends PhysicsBodyDefinitionBase {
    readonly motion: 'static';
    readonly mass?: never;
}
export interface PhysicsKinematicBodyDefinition extends PhysicsBodyDefinitionBase {
    readonly motion: 'kinematic';
    readonly mass?: never;
}
export type PhysicsBodyDefinition = PhysicsDynamicBodyDefinition | PhysicsStaticBodyDefinition | PhysicsKinematicBodyDefinition;
declare const physicsBodyHandleBrand: unique symbol;
declare const physicsSceneHandleBrand: unique symbol;
export type PhysicsBodyHandle = string & {
    readonly [physicsBodyHandleBrand]: true;
};
export type PhysicsSceneHandle = string & {
    readonly [physicsSceneHandleBrand]: true;
};
export interface PhysicsBodySnapshot {
    readonly handle: PhysicsBodyHandle;
    readonly transform: PhysicsTransform;
    readonly linearVelocity: PhysicsVector3;
    readonly angularVelocity: PhysicsVector3;
    readonly sleeping: boolean;
}
export interface PhysicsSceneDefinition {
    readonly id: string;
    readonly gravity?: PhysicsVector3;
}
export interface PhysicsSceneScope {
    readonly handle: PhysicsSceneHandle;
    createBody(definition: PhysicsBodyDefinition): PhysicsBodyHandle;
    /** Idempotent; true only when this scope owned and removed the handle. */
    removeBody(handle: PhysicsBodyHandle): boolean;
    setBodyTransform(handle: PhysicsBodyHandle, transform: PhysicsTransform): boolean;
    applyBodyImpulse(handle: PhysicsBodyHandle, impulse: PhysicsVector3, worldPoint?: PhysicsVector3): boolean;
    readBodySnapshot(handle: PhysicsBodyHandle): Promise<PhysicsBodySnapshot | null>;
    /** Releases every body still owned by this scene scope. */
    destroy(): Promise<void>;
}
export {};
