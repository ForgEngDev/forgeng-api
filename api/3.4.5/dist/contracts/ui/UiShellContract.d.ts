export declare const UI_SHELL_CONTRACT_VERSION: '1.1.0';
export declare const UI_SHELL_MINIMUM_COMPATIBLE_VERSION: '1.0.0';
export declare const UI_SHELL_COMPATIBLE_MAJOR_VERSION: 1;
export declare const UI_CONTRIBUTION_SLOTS: readonly [
    "top-bar",
    "side-panel",
    "bottom-status",
    "floating-overlay"
];
export type UiShellContractVersion = typeof UI_SHELL_MINIMUM_COMPATIBLE_VERSION | typeof UI_SHELL_CONTRACT_VERSION;
export type UiContributionSlot = typeof UI_CONTRIBUTION_SLOTS[number];
export type UiSettingValue = string | number | boolean | null;
export type UiTheme = 'system' | 'light' | 'dark';
export interface UiDisposable {
    dispose(): void | Promise<void>;
}
export interface UiShellLogContext {
    readonly metadata?: Readonly<Record<string, unknown>>;
    readonly error?: unknown;
}
export interface UiShellLogger {
    trace(message: string, context?: UiShellLogContext): void;
    debug(message: string, context?: UiShellLogContext): void;
    info(message: string, context?: UiShellLogContext): void;
    warn(message: string, context?: UiShellLogContext): void;
    error(message: string, context?: UiShellLogContext): void;
    fatal(message: string, context?: UiShellLogContext): void;
    child(category: string, metadata?: Readonly<Record<string, unknown>>): UiShellLogger;
}
export interface UiMountedContentContext {
    readonly target: unknown;
    readonly registerDispose: (dispose: () => void | Promise<void>) => void;
}
export interface UiMountedContent {
    mount(context: UiMountedContentContext): void | UiDisposable;
}
export interface UiContribution {
    readonly id: string;
    readonly title: string;
    readonly slot: UiContributionSlot;
    readonly order?: number;
    readonly presentation?: 'card' | 'mount-only';
    readonly settingsSchemaId?: string;
    readonly content?: UiMountedContent;
}
export interface UiContributionRegistry {
    register(contribution: UiContribution): UiDisposable;
    list(slot?: UiContributionSlot): readonly UiContribution[];
    subscribe(listener: () => void): UiDisposable;
    getMountTarget(contributionId: string): unknown | null;
}
export interface UiCommand<TPayload = unknown, TResult = unknown> {
    readonly id: string;
    readonly title: string;
    readonly execute: (payload: TPayload) => TResult | Promise<TResult>;
}
export interface UiCommandService {
    register<TPayload = unknown, TResult = unknown>(command: UiCommand<TPayload, TResult>): UiDisposable;
    execute<TResult = unknown>(commandId: string, payload?: unknown): Promise<TResult>;
    list(): readonly Pick<UiCommand, 'id' | 'title'>[];
}
export type UiNotificationLevel = 'info' | 'success' | 'warning' | 'error';
export interface UiNotificationInput {
    readonly id?: string;
    readonly level: UiNotificationLevel;
    readonly title: string;
    readonly message?: string;
    readonly durationMs?: number;
}
export interface UiNotification extends UiNotificationInput {
    readonly id: string;
    readonly createdAt: number;
}
export interface UiNotificationService {
    publish(notification: UiNotificationInput): UiDisposable;
    list(): readonly UiNotification[];
    dismiss(notificationId: string): void;
    subscribe(listener: () => void): UiDisposable;
}
export interface UiDialogAction {
    readonly id: string;
    readonly label: string;
    readonly kind?: 'primary' | 'secondary' | 'danger';
}
export interface UiDialogRequest {
    readonly id: string;
    readonly title: string;
    readonly message?: string;
    readonly actions: readonly UiDialogAction[];
}
export interface UiDialogResult {
    readonly actionId: string | null;
}
export interface UiDialogService {
    open(request: UiDialogRequest): Promise<UiDialogResult>;
    dismiss(dialogId: string): void;
}
export interface UiSettingOption {
    readonly value: string;
    readonly label: string;
}
export interface UiSettingField {
    readonly id: string;
    readonly label: string;
    readonly kind: 'boolean' | 'number' | 'text' | 'select' | 'command' | 'status';
    readonly minimum?: number;
    readonly maximum?: number;
    readonly step?: number;
    readonly options?: readonly UiSettingOption[];
    readonly commandId?: string;
    readonly read?: () => UiSettingValue;
    readonly write?: (value: UiSettingValue) => void | Promise<void>;
}
export interface UiSettingsSchema {
    readonly id: string;
    readonly title: string;
    readonly fields: readonly UiSettingField[];
}
export interface UiSettingsService {
    register(schema: UiSettingsSchema): UiDisposable;
    get(schemaId: string): UiSettingsSchema | null;
    list(): readonly UiSettingsSchema[];
    subscribe(listener: () => void): UiDisposable;
    refresh(schemaId?: string): void;
}
export interface UiLayoutState {
    readonly sidePanelWidth: number;
    readonly sidePanelCollapsed: boolean;
    readonly hiddenSlots: readonly UiContributionSlot[];
}
export interface UiPreferenceSnapshot {
    readonly version: 1;
    readonly theme: UiTheme;
    readonly layout: UiLayoutState;
}
export interface UiPreferencePatch {
    readonly theme?: UiTheme;
    readonly layout?: Partial<UiLayoutState>;
}
export interface UiPreferenceService {
    get(): UiPreferenceSnapshot;
    update(patch: UiPreferencePatch): UiPreferenceSnapshot;
    reset(): UiPreferenceSnapshot;
    subscribe(listener: (snapshot: UiPreferenceSnapshot) => void): UiDisposable;
}
export interface UiShellInitializeContext {
    readonly host: unknown;
    readonly logger: UiShellLogger;
    readonly signal: AbortSignal;
}
export interface UiShell {
    readonly contributions: UiContributionRegistry;
    readonly commands: UiCommandService;
    readonly notifications: UiNotificationService;
    readonly dialogs: UiDialogService;
    readonly settings: UiSettingsService;
    readonly preferences: UiPreferenceService;
    readonly surfaces?: UiSurfaceService;
    initialize(context: UiShellInitializeContext): Promise<void>;
    destroy(): Promise<void>;
}
export interface UiShellCapabilityDescriptor {
    readonly id: typeof UI_SURFACE_CAPABILITY_ID | (string & {});
    readonly version: string;
}
export interface UiShellProviderDescriptor<TOptions = unknown> {
    readonly id: string;
    readonly contractVersion: UiShellContractVersion;
    readonly implementationVersion: string;
    readonly capabilities?: readonly UiShellCapabilityDescriptor[];
    create(options?: TOptions): UiShell;
}
export declare const UI_SURFACE_CAPABILITY_ID: 'forgeng.ui.surfaces';
export type UiSurfaceCapabilityId = typeof UI_SURFACE_CAPABILITY_ID;
export type UiSurfaceRole = 'generic' | 'container' | 'banner' | 'complementary' | 'navigation' | 'toolbar' | 'status' | 'dialog' | 'button' | 'text';
export type UiSurfaceOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
export type UiSurfaceBoxSizing = 'content-box' | 'border-box';
export type UiSurfaceDirection = 'row' | 'column';
export type UiSurfaceWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type UiSurfaceLayoutMode = 'stack' | 'row' | 'column' | 'grid' | 'overlay';
export type UiSurfacePositionMode = 'relative' | 'absolute' | 'fixed';
export type UiSurfaceAnchor = 'top-left' | 'top' | 'top-right' | 'left' | 'center' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';
export type UiSurfaceAlignment = 'start' | 'center' | 'end' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
export type UiSurfacePointerPolicy = 'auto' | 'none' | 'painted';
export type UiSurfaceVisibility = 'visible' | 'hidden';
export declare const UI_SURFACE_BINDING_VERSION: 1;
export type UiSurfaceBindingVersion = typeof UI_SURFACE_BINDING_VERSION;
export type UiLength = number | 'auto' | `${number}px` | `${number}%` | `${number}rem` | `${number}vw` | `${number}vh` | `${number}fr`;
export interface UiInsets {
    readonly top?: UiLength;
    readonly right?: UiLength;
    readonly bottom?: UiLength;
    readonly left?: UiLength;
}
export interface UiSurfaceBorderStyle {
    readonly color?: string;
    readonly width?: UiLength;
    readonly radius?: UiLength;
    readonly shadow?: string;
}
export interface UiSurfaceTypographyStyle {
    readonly family?: string;
    readonly size?: UiLength;
    readonly weight?: number | string;
    readonly lineHeight?: UiLength;
    readonly color?: string;
    readonly align?: 'start' | 'center' | 'end' | 'justify';
}
export interface UiSurfacePlacement {
    readonly mode?: UiSurfacePositionMode;
    readonly anchor?: UiSurfaceAnchor;
    readonly zLayer?: number;
    readonly inset?: UiInsets;
}
export interface UiSurfaceGridTrack {
    readonly size: UiLength;
}
export interface UiSurfaceGridPlacement {
    readonly column?: number;
    readonly columnSpan?: number;
    readonly row?: number;
    readonly rowSpan?: number;
}
export interface UiSurfaceResponsiveRule {
    readonly query: {
        readonly minWidth?: number;
        readonly maxWidth?: number;
        readonly minHeight?: number;
        readonly maxHeight?: number;
    };
    readonly layout?: UiSurfaceLayoutPatch;
    readonly style?: UiSurfaceStylePatch;
}
export interface UiSurfaceLayout {
    readonly mode?: UiSurfaceLayoutMode;
    readonly direction?: UiSurfaceDirection;
    readonly wrap?: UiSurfaceWrap;
    readonly width?: UiLength;
    readonly height?: UiLength;
    readonly minWidth?: UiLength;
    readonly minHeight?: UiLength;
    readonly maxWidth?: UiLength;
    readonly maxHeight?: UiLength;
    readonly margin?: UiInsets;
    readonly padding?: UiInsets;
    readonly gap?: UiLength;
    readonly boxSizing?: UiSurfaceBoxSizing;
    readonly gridColumns?: readonly UiSurfaceGridTrack[];
    readonly gridRows?: readonly UiSurfaceGridTrack[];
    readonly gridPlacement?: UiSurfaceGridPlacement;
    readonly alignItems?: UiSurfaceAlignment;
    readonly justifyItems?: UiSurfaceAlignment;
    readonly alignContent?: UiSurfaceAlignment;
    readonly justifyContent?: UiSurfaceAlignment;
    readonly alignSelf?: UiSurfaceAlignment;
    readonly justifySelf?: UiSurfaceAlignment;
    readonly placement?: UiSurfacePlacement;
    readonly overflow?: UiSurfaceOverflow;
    readonly clip?: boolean;
    readonly responsive?: readonly UiSurfaceResponsiveRule[];
    readonly safeArea?: boolean;
}
export interface UiSurfaceStyle {
    readonly background?: string;
    readonly opacity?: number;
    readonly visibility?: UiSurfaceVisibility;
    readonly pointerEvents?: UiSurfacePointerPolicy;
    readonly border?: UiSurfaceBorderStyle;
    readonly font?: UiSurfaceTypographyStyle;
    readonly tokens?: Readonly<Record<string, string | number>>;
}
export interface UiSurfaceActionHandlers {
    readonly onPress?: () => void | Promise<void>;
}
export interface UiSurfaceContentText {
    readonly kind: 'text';
    readonly value: string;
}
export interface UiSurfaceContentNone {
    readonly kind?: 'none';
}
export type UiSurfaceContent = UiSurfaceContentNone | UiSurfaceContentText;
export interface UiSurfaceBindingSnapshot<TSnapshot> {
    readonly version: UiSurfaceBindingVersion;
    readonly value: TSnapshot;
}
export interface UiSurfaceBindingPort<TSnapshot> {
    getSnapshot(): UiSurfaceBindingSnapshot<TSnapshot>;
    subscribe(listener: (snapshot: UiSurfaceBindingSnapshot<TSnapshot>) => void): {
        dispose(): void;
    };
}
export interface UiSurfaceDescriptor<TBindingSnapshot = never> {
    readonly id: string;
    readonly parentId?: string;
    readonly order?: number;
    readonly role?: UiSurfaceRole;
    readonly accessibleLabel?: string;
    readonly focusable?: boolean;
    readonly hidden?: boolean;
    readonly layout?: UiSurfaceLayout;
    readonly style?: UiSurfaceStyle;
    readonly content?: UiSurfaceContent;
    readonly actions?: UiSurfaceActionHandlers;
    readonly binding?: UiSurfaceBindingPort<TBindingSnapshot>;
    readonly mountContent?: {
        mount(context: {
            target: unknown;
            registerDispose: (dispose: () => void | Promise<void>) => void;
        }): void | {
            dispose(): void | Promise<void>;
        };
    };
}
export interface UiSurfacePatch<TBindingSnapshot = never> {
    readonly parentId?: string | null;
    readonly order?: number;
    readonly role?: UiSurfaceRole;
    readonly accessibleLabel?: string | null;
    readonly focusable?: boolean;
    readonly hidden?: boolean;
    readonly layout?: UiSurfaceLayoutPatch;
    readonly style?: UiSurfaceStylePatch;
    readonly content?: UiSurfaceContent | null;
    readonly actions?: UiSurfaceActionHandlers | null;
    readonly binding?: UiSurfaceBindingPort<TBindingSnapshot> | null;
    readonly mountContent?: UiSurfaceDescriptor<TBindingSnapshot>['mountContent'] | null;
}
export interface UiSurfaceLayoutPatch {
    readonly mode?: UiSurfaceLayoutMode;
    readonly direction?: UiSurfaceDirection;
    readonly wrap?: UiSurfaceWrap;
    readonly width?: UiLength;
    readonly height?: UiLength;
    readonly minWidth?: UiLength;
    readonly minHeight?: UiLength;
    readonly maxWidth?: UiLength;
    readonly maxHeight?: UiLength;
    readonly margin?: Partial<UiInsets> | null;
    readonly padding?: Partial<UiInsets> | null;
    readonly gap?: UiLength;
    readonly boxSizing?: UiSurfaceBoxSizing;
    readonly gridColumns?: readonly UiSurfaceGridTrack[];
    readonly gridRows?: readonly UiSurfaceGridTrack[];
    readonly gridPlacement?: Partial<UiSurfaceGridPlacement> | null;
    readonly alignItems?: UiSurfaceAlignment;
    readonly justifyItems?: UiSurfaceAlignment;
    readonly alignContent?: UiSurfaceAlignment;
    readonly justifyContent?: UiSurfaceAlignment;
    readonly alignSelf?: UiSurfaceAlignment;
    readonly justifySelf?: UiSurfaceAlignment;
    readonly placement?: Partial<UiSurfacePlacement> | null;
    readonly overflow?: UiSurfaceOverflow;
    readonly clip?: boolean;
    readonly responsive?: readonly UiSurfaceResponsiveRule[] | null;
    readonly safeArea?: boolean;
}
export interface UiSurfaceStylePatch {
    readonly background?: string;
    readonly opacity?: number;
    readonly visibility?: UiSurfaceVisibility;
    readonly pointerEvents?: UiSurfacePointerPolicy;
    readonly border?: Partial<UiSurfaceBorderStyle> | null;
    readonly font?: Partial<UiSurfaceTypographyStyle> | null;
    readonly tokens?: Readonly<Record<string, string | number>> | null;
}
export interface UiSurfaceSnapshot<TBindingSnapshot = never> extends UiSurfaceDescriptor<TBindingSnapshot> {
    readonly parentId?: string;
    readonly visible: boolean;
    readonly disposed: boolean;
}
export interface UiSurfaceHandle<TBindingSnapshot = never> {
    readonly id: string;
    getSnapshot(): UiSurfaceSnapshot<TBindingSnapshot>;
    update(patch: UiSurfacePatch<TBindingSnapshot>): UiSurfaceSnapshot<TBindingSnapshot>;
    show(): UiSurfaceSnapshot<TBindingSnapshot>;
    hide(): UiSurfaceSnapshot<TBindingSnapshot>;
    dispose(): Promise<void>;
}
export interface UiSurfaceService {
    create<TBindingSnapshot = never>(descriptor: UiSurfaceDescriptor<TBindingSnapshot>): UiSurfaceHandle<TBindingSnapshot>;
    get(surfaceId: string): UiSurfaceHandle | null;
    list(parentId?: string): readonly UiSurfaceSnapshot[];
    subscribe(listener: () => void): {
        dispose(): void;
    };
    getMountTarget?(surfaceId: string): unknown | null;
}
