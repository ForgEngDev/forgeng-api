import { type UiShellCapabilityDescriptor, type UiContribution, type UiSettingsSchema, type UiShell, type UiShellProviderDescriptor } from './UiShellContract';
export type UiShellContractErrorCode = 'invalid-descriptor' | 'invalid-provider-id' | 'incompatible-contract-version' | 'invalid-implementation-version' | 'invalid-factory' | 'invalid-shell-instance' | 'invalid-contribution' | 'invalid-settings-schema';
export declare class UiShellContractError extends Error {
    readonly code: UiShellContractErrorCode;
    readonly path: string;
    constructor(code: UiShellContractErrorCode, path: string, message: string);
}
export declare function isUiShellContractVersionCompatible(version: string): boolean;
export declare function getUiShellProviderCapability(descriptor: Pick<UiShellProviderDescriptor, 'capabilities'>, capabilityId: string): UiShellCapabilityDescriptor | null;
export declare function hasUiShellProviderCapability(descriptor: Pick<UiShellProviderDescriptor, 'capabilities'>, capabilityId: string): boolean;
export declare function requireUiShellProviderCapability(descriptor: Pick<UiShellProviderDescriptor, 'id' | 'capabilities'>, capabilityId: string): UiShellCapabilityDescriptor;
export declare function assertUiShellProviderDescriptor(value: unknown): asserts value is UiShellProviderDescriptor;
export declare function validateUiShellProviderDescriptor(value: unknown): UiShellProviderDescriptor;
export declare function assertUiContribution(value: unknown): asserts value is UiContribution;
export declare function assertUiSettingsSchema(value: unknown): asserts value is UiSettingsSchema;
export declare function assertUiShell(value: unknown): asserts value is UiShell;
export declare function validateUiShell(value: unknown): UiShell;
