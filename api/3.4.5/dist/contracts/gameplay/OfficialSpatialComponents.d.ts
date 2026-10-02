export interface Transform2dValue {
    readonly position: readonly [
        number,
        number
    ];
    readonly rotation: number;
    readonly scale: readonly [
        number,
        number
    ];
}
export interface Transform3dValue {
    readonly position: readonly [
        number,
        number,
        number
    ];
    readonly rotation: readonly [
        number,
        number,
        number,
        number
    ];
    readonly scale: readonly [
        number,
        number,
        number
    ];
}
export declare const Transform2d: import("./GameplayDefinitions").ComponentDefinition<Transform2dValue>;
export declare const Transform3d: import("./GameplayDefinitions").ComponentDefinition<Transform3dValue>;
export declare const transform2d: (value?: Transform2dValue) => import("./GameplayDefinitions").ComponentInitializer<Transform2dValue>;
export declare const transform3d: (value?: Transform3dValue) => import("./GameplayDefinitions").ComponentInitializer<Transform3dValue>;
