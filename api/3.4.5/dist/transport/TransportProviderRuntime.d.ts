import { type TransportProvider, type TransportProviderDescriptor } from 'forgeng/contracts/transport';
export type TransportHandle = Pick<TransportProvider, 'limits' | 'getState' | 'getBackpressure' | 'send' | 'close' | 'onMessage' | 'onStateChange'>;
export interface ForgeTransportConfig<TOptions = unknown> {
    readonly provider: TransportProviderDescriptor<TOptions>;
    readonly options?: TOptions;
}
export type TransportProviderSelection<TOptions = unknown> = 'disabled' | TransportProviderDescriptor<TOptions>;
export type TransportProviderConfiguration<TOptions = unknown> = TransportProviderSelection<TOptions> | ForgeTransportConfig<TOptions>;
interface ResolvedTransportProviderConfiguration {
    readonly descriptor: TransportProviderDescriptor<unknown>;
    readonly options?: unknown;
}
export declare function aggregateLifecycleErrors(errors: readonly unknown[], message: string): Error;
export declare function resolveTransportProviderConfiguration(value: unknown): ResolvedTransportProviderConfiguration | null;
export declare class TransportProviderRuntime {
    private readonly provider;
    readonly handle: TransportHandle;
    private readonly abortController;
    private startPromise;
    private destroyPromise;
    constructor(provider: TransportProvider);
    initialize(): Promise<void>;
    start(): Promise<void>;
    destroy(): Promise<void>;
}
export declare function initializeTransportProviderRuntime(configuration: ResolvedTransportProviderConfiguration | null): Promise<TransportProviderRuntime | null>;
export {};
