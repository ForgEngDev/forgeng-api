import { ForgeGame, type ForgeCreateOptions } from 'forgeng';
import { type TransportHandle, type TransportProviderConfiguration } from './TransportProviderRuntime.js';
export type { ForgeTransportConfig, TransportHandle, TransportProviderConfiguration, TransportProviderSelection, } from './TransportProviderRuntime.js';
type CoreProvidersConfig = NonNullable<ForgeCreateOptions['providers']>;
export type ForgeTransportProvidersConfig<TOptions = unknown> = CoreProvidersConfig & {
    readonly transport?: TransportProviderConfiguration<TOptions>;
};
export type ForgeTransportCreateOptions<TOptions = unknown> = Omit<ForgeCreateOptions, 'providers'> & {
    readonly providers?: ForgeTransportProvidersConfig<TOptions>;
};
export type ForgeTransportGame = ForgeGame & {
    readonly transport: TransportHandle | null;
};
export declare function defineForgeTransportConfig<const TOptions>(options: ForgeTransportCreateOptions<TOptions>): ForgeTransportCreateOptions<TOptions>;
export declare function create<TOptions = unknown>(options?: ForgeTransportCreateOptions<TOptions>): Promise<ForgeTransportGame>;
export declare const ForgEngTransport: Readonly<{
    create: typeof create;
    defineForgeTransportConfig: typeof defineForgeTransportConfig;
}>;
export default ForgEngTransport;
