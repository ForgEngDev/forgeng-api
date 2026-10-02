import type { AssetSourceProvider, AssetSourceProviderDescriptor } from 'forgeng/contracts/assets';
export type BrowserAssetProtocol = 'https:' | 'http:' | 'data:' | 'blob:';
export type BrowserAssetFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
export interface BrowserAssetSourceProviderOptions {
    readonly baseUrl?: string;
    readonly fetch?: BrowserAssetFetch;
    readonly allowedProtocols?: readonly BrowserAssetProtocol[];
    readonly allowedOrigins?: readonly string[];
    readonly credentials?: RequestCredentials;
    readonly headers?: Readonly<Record<string, string>>;
    readonly allowRangeRequests?: boolean;
    readonly maxBytes?: number;
    readonly timeoutMs?: number;
}
export interface BrowserAssetSourcePolicy {
    readonly baseUrl?: string;
    readonly allowedProtocols: readonly BrowserAssetProtocol[];
    readonly allowedOrigins: readonly string[];
    readonly credentials: RequestCredentials;
    readonly headers: Readonly<Record<string, string>>;
    readonly maxBytes: number;
    readonly timeoutMs: number;
    readonly allowRangeRequests: boolean;
    readonly fetch: BrowserAssetFetch | null;
}
export declare const BROWSER_ASSET_DEFAULT_MAX_BYTES: number;
export declare const BROWSER_ASSET_DEFAULT_TIMEOUT_MS: number;
export declare function normalizeBrowserAssetSourcePolicy(options?: BrowserAssetSourceProviderOptions): BrowserAssetSourcePolicy;
export declare class BrowserAssetSourceProvider implements AssetSourceProvider {
    constructor(options?: BrowserAssetSourceProviderOptions);
    initialize: AssetSourceProvider['initialize'];
    resolve: AssetSourceProvider['resolve'];
    read: AssetSourceProvider['read'];
    destroy: AssetSourceProvider['destroy'];
}
export declare const BROWSER_ASSET_SOURCE_PROVIDER_DESCRIPTOR: AssetSourceProviderDescriptor<BrowserAssetSourceProviderOptions>;
