/**
 * ForgEng devtools declarations.
 *
 * This entry intentionally stays small: it registers optional scene chrome
 * providers without pulling the legacy App/Config host shell.
 */
import type { SceneChromeProvider } from '../sdk/forge';
import type { UiShell, UiShellInitializeContext, UiShellProviderDescriptor } from 'forgeng/contracts/ui';
import type { RenderCompositionSnapshot } from 'forgeng/contracts/render-composition';
import type { Render2dBatchSplitReason, Render2dInspectionSnapshotV2, Render2dSelectionReferenceV1 } from 'forgeng/contracts/2d';
import type { AssetRuntimeInspectionSnapshot } from 'forgeng/contracts/assets';
export declare const defaultSceneChromeProvider: SceneChromeProvider;
export interface DomUiShellOptions {
    readonly document?: Document;
    readonly storage?: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'> | null;
    readonly storageKey?: string;
}
export declare class DomUiShell implements UiShell {
    constructor(options?: DomUiShellOptions);
    readonly contributions: UiShell['contributions'];
    readonly commands: UiShell['commands'];
    readonly notifications: UiShell['notifications'];
    readonly dialogs: UiShell['dialogs'];
    readonly settings: UiShell['settings'];
    readonly preferences: UiShell['preferences'];
    initialize(context: UiShellInitializeContext): Promise<void>;
    destroy(): Promise<void>;
}
export declare function createDomUiShellProviderDescriptor(defaults?: DomUiShellOptions): UiShellProviderDescriptor<DomUiShellOptions>;
export declare const DOM_UI_SHELL_PROVIDER_DESCRIPTOR: UiShellProviderDescriptor<DomUiShellOptions>;
export interface PerformancePanelSource {
    getPerformanceSessionReport(): unknown;
}
export interface PerformancePanelReadModelOptions {
    readonly cadenceMs?: number;
    readonly historyLimit?: number;
}
export interface PerformancePanelSnapshot {
    readonly capturedAtMs: number;
    readonly sessionId: string;
    readonly workloadId: string;
    readonly qualityProfile: string;
    readonly availability: readonly {
        readonly sourceId: string;
        readonly availability: string;
        readonly sampleAgeMs: number | null;
        readonly coverageLabel: string;
    }[];
    readonly frame: {
        readonly p50Ms: number | null;
        readonly p95Ms: number | null;
        readonly p99Ms: number | null;
        readonly maxMs: number | null;
        readonly deadlineMissCount: number | null;
        readonly fpsAverage: number | null;
    };
    readonly cpu: {
        readonly gameLoopMeanMs: number | null;
        readonly updateMeanMs: number | null;
        readonly renderEncodeSubmitP95Ms: number | null;
    };
    readonly gpuTiming: {
        readonly availability: string;
        readonly summaryLabel: string;
    };
    readonly resources: {
        readonly trackedEstimatedBytes: number | null;
        readonly physicalDeviceBytes: number | null;
    };
    readonly stability: {
        readonly lifecycleEventCount: number;
        readonly stabilityEventCount: number;
    };
    readonly hardware: {
        readonly present: boolean;
        readonly synchronizationQuality: string | null;
        readonly summaryWindowCount: number;
    };
}
export declare class PerformancePanelReadModel {
    constructor(source: PerformancePanelSource, options?: PerformancePanelReadModelOptions);
    read(nowMs: number): Readonly<PerformancePanelSnapshot>;
    history(): readonly Readonly<PerformancePanelSnapshot>[];
}
export interface AssetFormatPanelSource {
    inspect(): AssetRuntimeInspectionSnapshot;
}
export interface AssetFormatPanelSnapshot {
    readonly formats: readonly string[];
    readonly codecs: readonly string[];
    readonly progress: string;
    readonly timings: string;
    readonly textureTarget: string;
    readonly failures: readonly string[];
}
export declare class AssetFormatPanelReadModel {
    constructor(source: AssetFormatPanelSource);
    snapshot(): AssetFormatPanelSnapshot;
}
export interface PresentationPanelSource {
    inspectPresentation(): RenderCompositionSnapshot | null;
}
export interface PresentationPanelSnapshot {
    readonly composition: string;
    readonly state: string;
    readonly backend: string;
    readonly generation: number;
    readonly domains: readonly Readonly<{
        id: string;
        state: string;
        required: boolean;
    }>[];
    readonly frame: number;
    readonly presentations: number;
    readonly scene: string;
}
export declare class PresentationPanelReadModel {
    constructor(source: PresentationPanelSource);
    snapshot(): PresentationPanelSnapshot | null;
}
export interface Render2dInspectionPanelSource {
    inspect2dDetailed(selection?: Render2dSelectionReferenceV1): Render2dInspectionSnapshotV2;
}
export interface Render2dInspectionPanelSnapshot {
    readonly profile: string;
    readonly state: string;
    readonly scene: string;
    readonly generation: number;
    readonly cameras: readonly Readonly<{
        id: string;
        target: string;
        items: number;
        draws: number;
    }>[];
    readonly layers: readonly Readonly<{
        id: string;
        items: number;
        batches: number;
    }>[];
    readonly targets: readonly Readonly<{
        id: string;
        size: string;
        format: string;
        bytes: number;
    }>[];
    readonly features: readonly Readonly<{
        id: string;
        status: string;
        resources: number;
    }>[];
    readonly assets: readonly string[];
    readonly tileChunks: Readonly<{
        visible: number;
        retained: number;
        buffers: number;
    }>;
    readonly glyphCache: Readonly<{
        glyphs: number;
        retainedRuns: number;
        hits: number;
        evictions: number;
    }>;
    readonly effects: Readonly<{
        passes: number;
        visibleLights: number;
        shadowSegments: number;
    }>;
    readonly generations: Readonly<{
        backend: number;
        scene: number;
    }>;
    readonly sampling: Readonly<{
        mode: string;
        observed: number;
        retained: number;
        dropped: number;
    }>;
    readonly failures: readonly Readonly<{
        code: string;
        path: string;
        count: number;
        lastFrame: number;
    }>[];
    readonly selection: string;
    readonly truncated: boolean;
}
export declare class Render2dInspectionPanel {
    constructor(source: Render2dInspectionPanelSource);
    snapshot(selection?: Render2dSelectionReferenceV1): Render2dInspectionPanelSnapshot;
}
export interface Render2dMetricsPanelSource {
    inspect2dDetailed(): Render2dInspectionSnapshotV2;
}
export interface Render2dMetricsPanelSnapshot {
    readonly frame: number;
    readonly draws: number;
    readonly batches: number;
    readonly pipelineChanges: number;
    readonly bindGroupChanges: number;
    readonly splitReasons: Readonly<Record<Render2dBatchSplitReason, number>>;
    readonly trackedCpuBytes: number;
    readonly trackedGpuBytes: number;
    readonly resources: number;
    readonly failures: number;
    readonly uploads: Readonly<{
        operations: number;
        reuses: number;
        dirtyBytes: number;
    }>;
    readonly caches: Readonly<{
        textLayoutBuilds: number;
        textLayoutHits: number;
        textLayoutEvictions: number;
    }>;
    readonly pools: Readonly<{
        instanceCapacity: number;
        instanceGrowths: number;
        instanceWraps: number;
        retainedBuffers: number;
    }>;
    readonly timings: Readonly<{
        extraction: number | null;
        planning: number | null;
        encoding: number | null;
        contribution: number | null;
        gpu: number | null;
    }>;
    readonly overheadMicros: number;
    readonly overheadWithinBudget: boolean;
}
export declare class Render2dMetricsPanel {
    constructor(source: Render2dMetricsPanelSource);
    snapshot(): Render2dMetricsPanelSnapshot;
}
export type GameLayerDiagnosticValue = null | boolean | number | string | readonly GameLayerDiagnosticValue[] | Readonly<{
    [key: string]: GameLayerDiagnosticValue;
}>;
export type GameLayerInspectionChannel = 'scenes' | 'entities' | 'owners' | 'clocks' | 'input' | 'renderAttachments' | 'network';
export type GameLayerInspectionReader = () => unknown;
export interface GameLayerInspectorSources {
    readonly engineVersion: string;
    readonly scenes: GameLayerInspectionReader;
    readonly entities: GameLayerInspectionReader;
    readonly owners: GameLayerInspectionReader;
    readonly clocks: GameLayerInspectionReader;
    readonly input: GameLayerInspectionReader;
    readonly renderAttachments: GameLayerInspectionReader;
    readonly network: GameLayerInspectionReader;
}
export interface GameLayerInspectorSnapshot {
    readonly schema: 'forgeng.game-layer-inspection';
    readonly schemaVersion: 1;
    readonly engineVersion: string;
    readonly mode: 'read-only';
    readonly scenes: GameLayerDiagnosticValue;
    readonly entities: GameLayerDiagnosticValue;
    readonly owners: GameLayerDiagnosticValue;
    readonly clocks: GameLayerDiagnosticValue;
    readonly input: GameLayerDiagnosticValue;
    readonly renderAttachments: GameLayerDiagnosticValue;
    readonly network: GameLayerDiagnosticValue;
}
export declare class GameLayerInspector {
    constructor(sources: GameLayerInspectorSources);
    snapshot(): GameLayerInspectorSnapshot;
}
export declare function snapshotDiagnosticValue(value: unknown, path?: string): GameLayerDiagnosticValue;
export type GameLayerDiagnosticCode = 'DX_LIFECYCLE_OWNER_INVALID' | 'DX_INPUT_ROUTE_INVALID' | 'DX_ASSET_LEASE_INVALID' | 'DX_NETWORK_STATE_INVALID' | 'DX_COMMAND_INVALID';
export interface GameLayerDiagnosticIdentity {
    readonly ownerId: string;
    readonly sceneId?: string;
    readonly entityId?: string;
    readonly providerId?: string;
    readonly state?: string;
}
export interface GameLayerDiagnosticOptions {
    readonly code: GameLayerDiagnosticCode;
    readonly message: string;
    readonly identity: GameLayerDiagnosticIdentity;
    readonly suggestedAction: string;
    readonly context?: unknown;
    readonly cause?: unknown;
}
export interface GameLayerDiagnosticRecord {
    readonly code: GameLayerDiagnosticCode;
    readonly message: string;
    readonly identity: Readonly<GameLayerDiagnosticIdentity>;
    readonly suggestedAction: string;
    readonly context: GameLayerDiagnosticValue;
    readonly causeCode: string | null;
}
export declare class GameLayerDiagnosticError extends Error {
    readonly code: GameLayerDiagnosticCode;
    readonly identity: Readonly<GameLayerDiagnosticIdentity>;
    readonly suggestedAction: string;
    readonly context: GameLayerDiagnosticValue;
    readonly causeCode: string | null;
    constructor(options: GameLayerDiagnosticOptions);
    toRecord(): GameLayerDiagnosticRecord;
}
export interface GameLayerEvidenceBundle {
    readonly schema: 'forgeng.game-layer-diagnostic-evidence';
    readonly schemaVersion: 1;
    readonly engineVersion: string;
    readonly capturedAt: string;
    readonly diagnostic: GameLayerDiagnosticRecord;
    readonly inspection: GameLayerInspectorSnapshot;
    readonly replay: GameLayerDiagnosticValue;
}
export declare function exportGameLayerEvidence(input: Readonly<{
    diagnostic: GameLayerDiagnosticError;
    inspection: GameLayerInspectorSnapshot;
    capturedAt: string;
    replay?: unknown;
}>): GameLayerEvidenceBundle;
export declare function validateGameLayerEvidence(bundle: GameLayerEvidenceBundle): readonly string[];
export interface GameLayerAuthoringDocument {
    readonly schema: 'forgeng.game-layer-authoring';
    readonly schemaVersion: 1;
    readonly id: string;
    readonly imports: readonly string[];
    readonly publicApisOnly: true;
    readonly ownership: Readonly<{
        readonly ownerId: string;
        readonly teardown: string;
    }>;
    readonly definition: GameLayerDiagnosticValue;
}
export interface GameLayerAuthoringTemplate<Parameters> {
    readonly id: string;
    readonly version: string;
    materialize(parameters: Parameters): GameLayerAuthoringDocument;
}
export declare function defineGameLayerTemplate<Parameters>(input: Readonly<{
    id: string;
    version: string;
    create(parameters: Parameters): GameLayerAuthoringDocument;
}>): GameLayerAuthoringTemplate<Parameters>;
export declare function roundTripGameLayerAuthoringDocument(document: GameLayerAuthoringDocument): GameLayerAuthoringDocument;
export declare function validateGameLayerAuthoringDocument(document: GameLayerAuthoringDocument): readonly string[];
export interface GameLayerAuthoringCommand<State extends GameLayerDiagnosticValue> {
    readonly id: string;
    apply(state: State): State;
}
export interface GameLayerCommandReceipt {
    readonly commandId: string;
    readonly before: string;
    readonly after: string;
    readonly historyDepth: number;
}
export interface GameLayerCommandHistorySnapshot<State extends GameLayerDiagnosticValue> {
    readonly state: State;
    readonly undoDepth: number;
    readonly redoDepth: number;
    readonly maximumDepth: number;
}
export declare class GameLayerCommandHistory<State extends GameLayerDiagnosticValue> {
    constructor(initial: State, validate: (state: State) => readonly string[], maximumDepth?: number);
    execute(command: GameLayerAuthoringCommand<State>): GameLayerCommandReceipt;
    undo(): State;
    redo(): State;
    snapshot(): GameLayerCommandHistorySnapshot<State>;
}
export declare const version: string;
export declare const ForgEngDevtools: Readonly<{
    version: string;
    defaultSceneChromeProvider: SceneChromeProvider;
    DOM_UI_SHELL_PROVIDER_DESCRIPTOR: UiShellProviderDescriptor<DomUiShellOptions>;
    createDomUiShellProviderDescriptor: typeof createDomUiShellProviderDescriptor;
}>;
export default ForgEngDevtools;
