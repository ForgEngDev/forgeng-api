export type ForgeLogMetadata = Readonly<Record<string, unknown>>;
export type ForgeLogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export interface ForgeLogRecord {
    readonly sequence: number;
    readonly timestamp: number;
    readonly level: ForgeLogLevel;
    readonly category: string;
    readonly message: string;
    readonly metadata: ForgeLogMetadata;
    readonly error?: unknown;
}
export interface ForgeLogContext {
    readonly metadata?: ForgeLogMetadata;
    readonly error?: unknown;
}
/**
 * Engine-neutral logging port exposed to providers and feature plugins.
 * Sink ownership, filtering and buffering remain kernel responsibilities.
 */
export interface ForgeLogger {
    trace(message: string, context?: ForgeLogContext): void;
    debug(message: string, context?: ForgeLogContext): void;
    info(message: string, context?: ForgeLogContext): void;
    warn(message: string, context?: ForgeLogContext): void;
    error(message: string, context?: ForgeLogContext): void;
    fatal(message: string, context?: ForgeLogContext): void;
    child(category: string, metadata?: ForgeLogMetadata): ForgeLogger;
}
export interface ForgeLogFilterOptions {
    readonly minLevel?: ForgeLogLevel;
    readonly includeCategories?: readonly string[];
    readonly excludeCategories?: readonly string[];
    readonly categoryLevels?: Readonly<Record<string, ForgeLogLevel>>;
}
export interface ForgeLoggingMemoryOptions {
    readonly capacity?: number;
}
export interface ForgeLoggingRateLimitOptions {
    readonly windowMs: number;
    readonly burstLimit: number;
    readonly maxKeys?: number;
}
export interface ForgeLoggingOptions {
    readonly console?: boolean;
    readonly memory?: false | ForgeLoggingMemoryOptions;
    readonly filter?: ForgeLogFilterOptions;
    readonly rateLimit?: false | ForgeLoggingRateLimitOptions;
}
export interface ForgeLoggingController {
    snapshot(): readonly ForgeLogRecord[];
    clear(): void;
    setConsoleEnabled(enabled: boolean): void;
    getConsoleEnabled(): boolean;
    setFilter(filter: ForgeLogFilterOptions): void;
    flush(): Promise<void>;
}
