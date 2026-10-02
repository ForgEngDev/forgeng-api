import type { RenderDomainProviderDescriptorV1 } from './RenderCompositionContract';
export interface RenderDomainProviderConformanceCaseResult {
    readonly id: 'descriptor' | 'fresh-instance' | 'lifecycle' | 'generation' | 'snapshot' | 'cleanup';
    readonly passed: true;
}
export interface RenderDomainProviderConformanceReport {
    readonly snapshotVersion: 1;
    readonly providerId: string;
    readonly domainId: string;
    readonly cases: readonly RenderDomainProviderConformanceCaseResult[];
    readonly commands: number;
}
export declare function runRenderDomainProviderConformanceV1(descriptor: RenderDomainProviderDescriptorV1): Promise<RenderDomainProviderConformanceReport>;
