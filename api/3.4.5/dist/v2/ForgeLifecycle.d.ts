export declare const V2_LIFECYCLE_STATES: readonly [
    "new",
    "initializing",
    "ready",
    "starting",
    "running",
    "stopping",
    "stopped",
    "recovering",
    "destroying",
    "destroyed",
    "failed"
];
export type V2LifecycleState = typeof V2_LIFECYCLE_STATES[number];
export declare const V2_LIFECYCLE_EVENTS: readonly [
    "begin-initialize",
    "initialize-succeeded",
    "initialize-failed",
    "begin-start",
    "start-succeeded",
    "start-failed",
    "begin-stop",
    "stop-succeeded",
    "stop-failed",
    "device-lost",
    "recovery-succeeded",
    "recovery-failed",
    "begin-destroy",
    "destroy-succeeded",
    "destroy-failed"
];
export type V2LifecycleEvent = typeof V2_LIFECYCLE_EVENTS[number];
export interface V2LifecycleTransition {
    readonly from: V2LifecycleState;
    readonly event: V2LifecycleEvent;
    readonly to: V2LifecycleState;
}
export declare const V2_LIFECYCLE_TRANSITIONS: readonly [
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>,
    Readonly<V2LifecycleTransition>
];
export type ForgeLifecycleOperation = 'create' | 'initialize' | 'start' | 'stop' | 'scene-transition' | 'frame' | 'device-recovery' | 'destroy' | 'provider-initialize' | 'plugin-initialize' | 'lifecycle';
export declare const V2_LIFECYCLE_ERROR_OPERATIONS: Readonly<{
    readonly ERR_FORGENG_CREATE_FAILED: 'create';
    readonly ERR_FORGENG_INITIALIZATION_FAILED: 'initialize';
    readonly ERR_FORGENG_INVALID_STATE: 'lifecycle';
    readonly ERR_FORGENG_START_FAILED: 'start';
    readonly ERR_FORGENG_STOP_FAILED: 'stop';
    readonly ERR_FORGENG_SCENE_TRANSITION_FAILED: 'scene-transition';
    readonly ERR_FORGENG_SCENE_TRANSITION_CANCELLED: 'scene-transition';
    readonly ERR_FORGENG_FRAME_FAILED: 'frame';
    readonly ERR_FORGENG_DEVICE_LOST: 'device-recovery';
    readonly ERR_FORGENG_DEVICE_RECOVERY_FAILED: 'device-recovery';
    readonly ERR_FORGENG_DESTROY_FAILED: 'destroy';
    readonly ERR_FORGENG_PROVIDER_INITIALIZATION_FAILED: 'provider-initialize';
    readonly ERR_FORGENG_PLUGIN_INITIALIZATION_FAILED: 'plugin-initialize';
}>;
export type ForgeLifecycleDomainErrorCode = keyof typeof V2_LIFECYCLE_ERROR_OPERATIONS;
export type ForgeLifecycleErrorCode = ForgeLifecycleDomainErrorCode | 'ERR_FORGENG_AGGREGATE_FAILURE';
export declare class ForgeLifecycleError extends Error {
    readonly code: ForgeLifecycleErrorCode;
    readonly operation: ForgeLifecycleOperation;
    readonly recoverable: boolean;
    readonly cause: unknown;
    readonly primaryCause: unknown;
    readonly cleanupCauses: readonly unknown[];
    readonly causes: readonly unknown[];
    private constructor();
    static domain(input: {
        code: ForgeLifecycleDomainErrorCode;
        message: string;
        cause?: unknown;
        recoverable?: boolean;
    }): ForgeLifecycleError;
    static aggregate(input: {
        operation: ForgeLifecycleOperation;
        message: string;
        primary: unknown;
        cleanup: readonly unknown[];
    }): ForgeLifecycleError;
}
export declare function createV2LifecycleError(input: {
    readonly code: ForgeLifecycleDomainErrorCode;
    readonly message: string;
    readonly cause?: unknown;
    readonly recoverable?: boolean;
}): ForgeLifecycleError;
export declare function aggregateV2LifecycleError(input: {
    readonly operation: ForgeLifecycleOperation;
    readonly message: string;
    readonly primary: unknown;
    readonly cleanup: readonly unknown[];
}): ForgeLifecycleError;
export declare function transitionV2Lifecycle(state: V2LifecycleState, event: V2LifecycleEvent): V2LifecycleState;
export type V2FrameSkipReason = 'device-lost' | 'surface-hidden' | 'surface-resize-pending' | 'render-completed-without-submit' | 'frame-state-unavailable' | 'post-process-failed';
export type V2FrameEvidence = {
    readonly submission: 'submitted';
    readonly presentation: 'unobservable';
} | {
    readonly submission: 'not-submitted';
    readonly presentation: 'unobservable';
    readonly skipReason: V2FrameSkipReason;
} | {
    readonly submission: 'unobservable';
    readonly presentation: 'unobservable';
};
export type V2FrameOutcome = Readonly<{
    ok: true;
    code: 'FRAME_SUBMITTED';
    submission: 'submitted';
    presentation: 'unobservable';
    firstSuccessfulSubmission: boolean;
}> | Readonly<{
    ok: false;
    code: 'FRAME_NOT_SUBMITTED';
    submission: 'not-submitted';
    presentation: 'unobservable';
    skipReason: V2FrameSkipReason;
    firstSuccessfulSubmission: false;
}> | Readonly<{
    ok: true;
    code: 'FRAME_SUBMISSION_UNOBSERVABLE';
    submission: 'unobservable';
    presentation: 'unobservable';
    firstSuccessfulSubmission: false;
}>;
export declare function classifyV2FrameOutcome(evidence: V2FrameEvidence, firstSuccessfulSubmissionSeen: boolean): V2FrameOutcome;
export type V2LifecycleSuccessCode = 'CREATED' | 'INITIALIZED' | 'STARTED' | 'STOPPED' | 'SCENE_TRANSITIONED' | 'FRAME_SUBMITTED' | 'DEVICE_RECOVERED' | 'DESTROYED' | 'PROVIDER_INITIALIZED' | 'PLUGIN_INITIALIZED';
/**
 * @deprecated Since ForgeNG 2.5.0. Prefer lifecycle methods on the canonical
 * `forgeng` game. Supported through 3.x; removable no earlier than 4.0.0.
 */
export type V2LifecycleResult<T = void> = Readonly<{
    ok: true;
    code: V2LifecycleSuccessCode;
    state: V2LifecycleState;
    value: T;
}> | Readonly<{
    ok: false;
    code: ForgeLifecycleErrorCode;
    state: V2LifecycleState;
    error: ForgeLifecycleError;
}>;
export type V2FrameResult = V2FrameOutcome | Extract<V2LifecycleResult<never>, {
    ok: false;
}>;
export declare function successV2LifecycleResult<T>(state: V2LifecycleState, code: V2LifecycleSuccessCode, value: T): Extract<V2LifecycleResult<T>, {
    ok: true;
}>;
export declare function failureV2LifecycleResult(state: V2LifecycleState, error: ForgeLifecycleError): Extract<V2LifecycleResult<never>, {
    ok: false;
}>;
export declare function lifecycleFailureResult(input: {
    readonly state: V2LifecycleState;
    readonly code: ForgeLifecycleDomainErrorCode;
    readonly message: string;
    readonly cause: unknown;
    readonly recoverable?: boolean;
}): Extract<V2LifecycleResult<never>, {
    ok: false;
}>;
export declare function isV2SceneCancellation(cause: unknown): boolean;
/**
 * @deprecated Since ForgeNG 2.5.0. Prefer lifecycle methods on the canonical
 * `forgeng` game. Supported through 3.x; removable no earlier than 4.0.0.
 */
export interface ForgeGameLifecycleResults {
    state(): V2LifecycleState;
    lastError(): ForgeLifecycleError | null;
    start(sceneName?: string): Promise<V2LifecycleResult<void>>;
    stop(): Promise<V2LifecycleResult<void>>;
    destroy(): Promise<V2LifecycleResult<void>>;
}
export interface V2LifecycleAdapterPort {
    isRunning(): boolean;
    start(sceneName?: string): Promise<void>;
    stop(): void;
    stopAndDrain(): Promise<void>;
    destroy(): Promise<void>;
}
/** @internal Result projection over the existing game/loop lifecycle owner. */
export declare class V2LifecycleResultAdapter {
    #private;
    constructor(port: V2LifecycleAdapterPort);
    get results(): ForgeGameLifecycleResults;
    start(sceneName?: string): Promise<void>;
    stop(): void;
    destroy(): Promise<void>;
    deviceLost(cause: unknown): ForgeLifecycleError;
    private startResult;
    private stopResult;
    private destroyResult;
}
export interface V2DeviceLossPort {
    setOnDeviceLost(callback: (info: GPUDeviceLostInfo) => void): void;
    getDeviceLossTelemetrySnapshot(): {
        readonly deviceCurrentlyLost: boolean;
        readonly lastEvent: unknown;
    };
}
export declare function bindV2TerminalDeviceLoss(adapter: V2LifecycleResultAdapter, port: V2DeviceLossPort): void;
export declare function captureV2CreateResult<T>(operation: () => Promise<T>, state: (value: T) => V2LifecycleState): Promise<V2LifecycleResult<T>>;
