/** Minimal camera surface required by directional shadow calculations. */
export interface ShadowCameraPort {
    readonly position: readonly [
        number,
        number,
        number
    ];
    readonly target: readonly [
        number,
        number,
        number
    ];
    readonly fov: number;
    readonly aspect: number;
    readonly near: number;
    readonly far: number;
    getForward(): [
        number,
        number,
        number
    ];
    getRight(): [
        number,
        number,
        number
    ];
}
export type ShadowLightKind = 'directional' | 'point' | 'spot' | 'other';
/**
 * Renderer-neutral light projection used only for shadow routing. Optional
 * fields become required after narrowing by `shadowKind` inside a backend.
 */
export interface ShadowLightPort {
    readonly shadowKind: ShadowLightKind;
    readonly direction?: ArrayLike<number>;
    readonly range?: number;
    readonly shadowNear?: number;
    readonly shadowFar?: number;
    readonly outerAngle?: number;
    readonly useCubeShadowMap?: boolean;
}
/** Configuration surface consumed by the shadow backend algorithms. */
export interface ShadowSettingsPort {
    readonly enabled: boolean;
    readonly primaryShadowOnly: boolean;
    readonly maxShadowLights: number;
    readonly cascadeCount: number;
    readonly cascadeSplitRatios: [
        number,
        number,
        number
    ];
    readonly cascadeStabilization: boolean;
    readonly cascadeSnapUnits: number;
    readonly cascadeSplitLambda: number;
    readonly cascadeNear: number;
    getCascadeCoverageDistance(): number;
}
