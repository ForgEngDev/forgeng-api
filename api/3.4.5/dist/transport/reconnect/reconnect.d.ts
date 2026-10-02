import { type TransportProviderDescriptor } from 'forgeng/contracts/transport';
import { type ForgeCreateOptions, type ForgeGame } from 'forgeng';
import { type ReconnectTransportHandle } from './ReconnectTransportProviderRuntime.js';
import { type ForgeTransportDiagnosticsOptions } from './TransportDiagnostics.js';
import { type TransportReconnectPolicy } from './TransportReconnectPolicy.js';
export type { ForgeTransportDiagnosticsOptions, TransportRuntimeMetrics, } from './TransportDiagnostics.js';
export type { ReconnectTransportHandle } from './ReconnectTransportProviderRuntime.js';
export type { BoundedTransportReconnectPolicy, TransportReconnectClock, TransportReconnectPolicy, TransportReconnectTimer, } from './TransportReconnectPolicy.js';
type CoreProvidersConfig = NonNullable<ForgeCreateOptions['providers']>;
export interface ForgeReconnectTransportConfig<TOptions = unknown> {
    readonly provider: TransportProviderDescriptor<TOptions>;
    readonly options?: TOptions;
    readonly reconnect?: TransportReconnectPolicy;
    readonly diagnostics?: ForgeTransportDiagnosticsOptions;
}
export type ReconnectTransportProviderSelection<TOptions = unknown> = 'disabled' | TransportProviderDescriptor<TOptions> | ForgeReconnectTransportConfig<TOptions>;
export type ForgeReconnectTransportProvidersConfig<TOptions = unknown> = CoreProvidersConfig & {
    readonly transport?: ReconnectTransportProviderSelection<TOptions>;
};
export type ForgeReconnectTransportCreateOptions<TOptions = unknown> = Omit<ForgeCreateOptions, 'providers'> & {
    readonly providers?: ForgeReconnectTransportProvidersConfig<TOptions>;
};
export type ForgeReconnectTransportGame = ForgeGame & {
    readonly transport: ReconnectTransportHandle | null;
};
export declare function defineForgeReconnectTransportConfig<const TOptions>(options: ForgeReconnectTransportCreateOptions<TOptions>): ForgeReconnectTransportCreateOptions<TOptions>;
export declare function create<TOptions = unknown>(options?: ForgeReconnectTransportCreateOptions<TOptions>): Promise<ForgeReconnectTransportGame>;
export declare const ForgEngReconnectTransport: Readonly<{
    create: typeof create;
    defineForgeReconnectTransportConfig: typeof defineForgeReconnectTransportConfig;
}>;
export default ForgEngReconnectTransport;
