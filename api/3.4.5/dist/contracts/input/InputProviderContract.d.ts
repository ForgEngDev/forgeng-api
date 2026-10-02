export declare const INPUT_PROVIDER_CONTRACT_VERSION: '1.0.0';
export declare const INPUT_PROVIDER_CAPABILITY_IDS: Readonly<{
    readonly keyboard: 'keyboard';
    readonly pointer: 'pointer';
    readonly pointerLock: 'pointer-lock';
    readonly wheel: 'wheel';
    readonly touch: 'touch';
    readonly gamepad: 'gamepad';
    readonly focusReset: 'focus-reset';
}>;
export type InputProviderContractVersion = typeof INPUT_PROVIDER_CONTRACT_VERSION;
export type InputProviderCapabilityId = string & {};
export type InputProviderLogMetadata = Readonly<Record<string, unknown>>;
export interface InputProviderLogContext {
    readonly metadata?: InputProviderLogMetadata;
    readonly error?: unknown;
}
export interface InputProviderLogger {
    trace(message: string, context?: InputProviderLogContext): void;
    debug(message: string, context?: InputProviderLogContext): void;
    info(message: string, context?: InputProviderLogContext): void;
    warn(message: string, context?: InputProviderLogContext): void;
    error(message: string, context?: InputProviderLogContext): void;
    fatal(message: string, context?: InputProviderLogContext): void;
    child(category: string, metadata?: InputProviderLogMetadata): InputProviderLogger;
}
export interface InputProviderCapability {
    readonly id: InputProviderCapabilityId;
    readonly version: string;
}
export type InputVector2 = readonly [
    x: number,
    y: number
];
export type InputVector3 = readonly [
    x: number,
    y: number,
    z: number
];
export interface InputKeyboardSnapshot {
    /** Physical key codes, independent of keyboard layout. */
    readonly pressed: readonly string[];
}
export interface InputPointerSnapshot {
    readonly position: InputVector2;
    /** Movement accumulated since the previous provider sample. */
    readonly delta: InputVector2;
    readonly buttons: readonly number[];
    readonly locked: boolean;
}
export interface InputWheelSnapshot {
    /** Wheel deltas accumulated since the previous provider sample. */
    readonly delta: InputVector3;
}
export interface InputTouchSnapshot {
    readonly id: number;
    readonly position: InputVector2;
    readonly pressure: number;
    readonly primary: boolean;
}
export interface InputGamepadButtonSnapshot {
    readonly pressed: boolean;
    readonly touched: boolean;
    readonly value: number;
}
export interface InputGamepadSnapshot {
    readonly index: number;
    readonly id: string;
    readonly connected: boolean;
    readonly mapping: string;
    readonly timestamp: number;
    readonly axes: readonly number[];
    readonly buttons: readonly InputGamepadButtonSnapshot[];
}
export interface InputSnapshot {
    /** Monotonically increasing per-provider sample sequence. */
    readonly sequence: number;
    readonly timestampMs: number;
    readonly focused: boolean;
    readonly visible: boolean;
    readonly keyboard: InputKeyboardSnapshot;
    readonly pointer: InputPointerSnapshot;
    readonly wheel: InputWheelSnapshot;
    readonly touches: readonly InputTouchSnapshot[];
    readonly gamepads: readonly InputGamepadSnapshot[];
}
export interface InputCapturePolicy {
    readonly preventDefaultCodes: readonly string[];
}
export type InputPointerLockRequestResult = 'requested' | 'unsupported' | 'denied';
export interface InputProviderContext {
    readonly logger: InputProviderLogger;
    readonly signal: AbortSignal;
}
/**
 * Platform input owner. Implementations atomically sample current state and
 * drain frame-relative deltas; consumers must share one sampled snapshot per
 * engine frame instead of sampling independently.
 */
export interface InputProvider {
    initialize(context: InputProviderContext): Promise<void>;
    sample(): InputSnapshot;
    setCapturePolicy(policy: InputCapturePolicy): void;
    requestPointerLock(): Promise<InputPointerLockRequestResult>;
    exitPointerLock(): void;
    destroy(): Promise<void>;
}
export interface InputProviderFactory<TOptions = unknown> {
    create(options?: TOptions): InputProvider;
}
export interface InputProviderDescriptor<TOptions = unknown> extends InputProviderFactory<TOptions> {
    readonly id: string;
    readonly contractVersion: InputProviderContractVersion;
    readonly implementationVersion: string;
    readonly capabilities: readonly InputProviderCapability[];
}
