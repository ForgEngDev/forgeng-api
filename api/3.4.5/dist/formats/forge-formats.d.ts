export type CompressedGltfTextureCodec = 'ktx2' | 'none';
export type CompressedGltfGeometryCodec = 'meshopt' | 'draco';
export type AssetTextureTranscodeTarget = 'astc-4x4' | 'bc7' | 'bc5' | 'etc2-rgba8' | 'rgba8';
export interface AssetCodecPolicy {
    readonly deployment?: 'self-hosted' | 'offline' | 'cdn';
    readonly artifactBaseUrl?: string;
    readonly allowedOrigins?: readonly string[];
    readonly textureTargets?: readonly AssetTextureTranscodeTarget[];
    readonly allowRgbaFallback?: boolean;
    readonly maxWorkers?: number;
}
export interface CompressedGltfPresetOptions {
    readonly textures?: CompressedGltfTextureCodec;
    readonly geometry?: readonly CompressedGltfGeometryCodec[];
    readonly standaloneKtx2?: boolean;
}
export interface OfficialGltfFormatBundle {
    readonly id: string;
    readonly implementationVersion: '1.0.0';
    readonly capabilities: readonly {
        readonly id: string;
        readonly version: string;
    }[];
    readonly requires: readonly never[];
    readonly decoders: readonly never[];
    readonly realizers: readonly never[];
    readonly replaces: {
        readonly decoders: readonly never[];
        readonly realizers: readonly never[];
    };
}
export declare const OFFICIAL_GLTF_FORMAT_PRESET_IDS: Readonly<{
    compressed: 'forgeng.formats.compressed-gltf';
    standaloneKtx2: 'forgeng.formats.standalone-ktx2';
}>;
export declare const OFFICIAL_GLTF_FORMAT_CAPABILITIES: Readonly<Record<'ktx2' | 'meshopt' | 'draco' | 'standaloneKtx2', string>>;
export declare function compressedGltf(options?: CompressedGltfPresetOptions): OfficialGltfFormatBundle;
export declare function standaloneKtx2(): OfficialGltfFormatBundle;
