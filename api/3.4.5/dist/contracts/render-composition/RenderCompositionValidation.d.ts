import { type RenderCapabilitySnapshot, type RenderCompatibilityResult, type RenderCompositionDescriptor, type RenderDomainDescriptor } from './RenderCompositionContract';
export type RenderCompositionErrorCode = 'RC_VALUE_INVALID' | 'RC_VERSION_UNSUPPORTED' | 'RC_ID_INVALID' | 'RC_ID_DUPLICATE' | 'RC_ORDER_ANCHOR_MISSING' | 'RC_ORDER_CYCLE' | 'RC_CAPABILITY_DUPLICATE' | 'RC_CAPABILITY_MISSING' | 'RC_CAPABILITY_VERSION_UNSUPPORTED' | 'RC_STATE_INVALID';
export declare class RenderCompositionContractError extends TypeError {
    readonly code: RenderCompositionErrorCode;
    readonly path: string;
    constructor(code: RenderCompositionErrorCode, path: string, message: string);
}
export declare function orderRenderDomains(domains: readonly RenderDomainDescriptor[], path?: string): readonly RenderDomainDescriptor[];
export declare function negotiateRenderCompatibility(backendCapabilities: readonly RenderCapabilitySnapshot[], domains: readonly RenderDomainDescriptor[]): RenderCompatibilityResult;
export declare function validateRenderCompositionDescriptor(value: unknown, path?: string): RenderCompositionDescriptor;
