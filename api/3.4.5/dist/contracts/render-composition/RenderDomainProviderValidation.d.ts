import { type JsonValue, type RenderCapabilitySnapshot, type RenderDomainDescriptor, type RenderDomainProviderDescriptorV1, type RenderDomainProviderMetadataV1, type RenderDomainRuntime } from './RenderCompositionContract';
export type RenderDomainProviderErrorCode = 'RDP_VALUE_INVALID' | 'RDP_VERSION_UNSUPPORTED' | 'RDP_ID_INVALID' | 'RDP_FACTORY_INVALID' | 'RDP_SINGLETON_REUSED' | 'RDP_LIFECYCLE_INVALID' | 'RDP_STALE_GENERATION' | 'RDP_COMMAND_INVALID' | 'RDP_LIMIT_EXCEEDED' | 'RDP_NATIVE_VALUE_FORBIDDEN';
export declare class RenderDomainProviderContractError extends TypeError {
    readonly code: RenderDomainProviderErrorCode;
    readonly path: string;
    constructor(code: RenderDomainProviderErrorCode, path: string, message: string);
}
export interface DefineRenderDomainProviderV1Options {
    readonly id: string;
    readonly providerId: string;
    readonly kind?: RenderDomainProviderMetadataV1['kind'];
    readonly capabilities?: readonly RenderCapabilitySnapshot[];
    readonly limits?: Partial<RenderDomainProviderMetadataV1['limits']>;
    readonly targets?: Partial<RenderDomainProviderMetadataV1['targets']>;
    readonly required?: boolean;
    readonly requirements?: RenderDomainDescriptor['requirements'];
    readonly order?: RenderDomainDescriptor['order'];
    readonly surface?: RenderDomainDescriptor['surface'];
    readonly attachment?: RenderDomainDescriptor['attachment'];
    create(): RenderDomainRuntime | Promise<RenderDomainRuntime>;
}
export declare const RENDER_DOMAIN_PROVIDER_LIFECYCLE_V1: Readonly<{
    instanceOwnership: 'fresh-per-composition';
    generationOwnership: 'compositor';
    cleanup: 'reverse-aggregate';
    nativeAccess: 'backend-extension-only';
}>;
export declare function validateRenderDomainNeutralJson(value: unknown, path?: string, seen?: ReadonlySet<object>, depth?: number): JsonValue;
export declare function validateRenderDomainProviderMetadataV1(value: unknown, path?: string): RenderDomainProviderMetadataV1;
export declare function defineRenderDomainProviderV1(options: DefineRenderDomainProviderV1Options): RenderDomainProviderDescriptorV1;
