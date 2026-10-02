import type { PhysicsSceneDefinition, PhysicsSceneScope } from './PhysicsBodyContract';
import type { UiShell } from 'forgeng/contracts/ui';
export declare const PHYSICS_PROVIDER_CONTRACT_VERSION: '1.0.0';
export declare const PHYSICS_PROVIDER_CAPABILITY_IDS: Readonly<{
    readonly rigidBodies: 'rigid-bodies';
    readonly stateSnapshots: 'state-snapshots';
    readonly sphereShape: 'shape.sphere';
    readonly boxShape: 'shape.box';
    readonly capsuleShape: 'shape.capsule';
    readonly convexHullShape: 'shape.convex-hull';
    readonly planeShape: 'shape.plane';
}>;
export type PhysicsProviderContractVersion = typeof PHYSICS_PROVIDER_CONTRACT_VERSION;
export type PhysicsProviderCapabilityId = string & {};
export type PhysicsProviderLogMetadata = Readonly<Record<string, unknown>>;
export interface PhysicsProviderLogContext {
    readonly metadata?: PhysicsProviderLogMetadata;
    readonly error?: unknown;
}
export interface PhysicsProviderLogger {
    debug(message: string, context?: PhysicsProviderLogContext): void;
    info(message: string, context?: PhysicsProviderLogContext): void;
    warn(message: string, context?: PhysicsProviderLogContext): void;
    error(message: string, context?: PhysicsProviderLogContext): void;
    child(category: string, metadata?: PhysicsProviderLogMetadata): PhysicsProviderLogger;
}
export interface PhysicsProviderCapability {
    readonly id: PhysicsProviderCapabilityId;
    readonly version: string;
}
export interface PhysicsProviderContext {
    readonly device: GPUDevice;
    readonly logger: PhysicsProviderLogger;
    readonly signal: AbortSignal;
    readonly uiShell?: UiShell;
}
export interface PhysicsProviderStep {
    readonly deltaSeconds: number;
    readonly stepIndex: number;
    readonly stepCount: number;
}
export interface PhysicsProvider {
    initialize(context: PhysicsProviderContext): Promise<void>;
    createScene(definition: PhysicsSceneDefinition): PhysicsSceneScope;
    step(step: PhysicsProviderStep): void | Promise<void>;
    destroy(): Promise<void>;
}
export interface PhysicsProviderFactory<TOptions = unknown> {
    create(options?: TOptions): PhysicsProvider;
}
export interface PhysicsProviderDescriptor<TOptions = unknown> extends PhysicsProviderFactory<TOptions> {
    readonly id: string;
    readonly contractVersion: PhysicsProviderContractVersion;
    readonly implementationVersion: string;
    readonly capabilities: readonly PhysicsProviderCapability[];
}
export interface PhysicsProviderCapabilityRequirement {
    readonly id: PhysicsProviderCapabilityId;
    readonly version: string;
    readonly optional?: boolean;
}
export interface PhysicsProviderCapabilityNegotiation {
    readonly accepted: boolean;
    readonly satisfied: readonly PhysicsProviderCapabilityRequirement[];
    readonly missingRequired: readonly PhysicsProviderCapabilityRequirement[];
    readonly missingOptional: readonly PhysicsProviderCapabilityRequirement[];
}
