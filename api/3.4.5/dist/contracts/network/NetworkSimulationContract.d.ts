export declare const NETWORK_SIMULATION_PROTOCOL_VERSION: 1;
export type NetworkSimulationProtocolVersion = typeof NETWORK_SIMULATION_PROTOCOL_VERSION;
export type NetworkJsonPrimitive = null | boolean | number | string;
export type NetworkJsonValue = NetworkJsonPrimitive | readonly NetworkJsonValue[] | NetworkJsonObject;
export type NetworkJsonObject = Readonly<{
    [key: string]: NetworkJsonValue;
}>;
export interface NetworkInputAcknowledgement {
    readonly clientId: string;
    readonly sequence: number;
    readonly tick: number;
}
export interface NetworkInputEnvelope<TCommand extends NetworkJsonObject = NetworkJsonObject> {
    readonly kind: 'input';
    readonly protocolVersion: NetworkSimulationProtocolVersion;
    readonly sessionId: string;
    readonly clientId: string;
    readonly sequence: number;
    readonly clientTick: number;
    readonly sentAtServerEstimateMs: number;
    readonly command: TCommand;
}
export interface NetworkSnapshotBaseline {
    readonly sequence: number;
    readonly tick: number;
}
export interface NetworkAuthoritativeSnapshotEnvelope<TState extends NetworkJsonObject = NetworkJsonObject> {
    readonly kind: 'snapshot';
    readonly protocolVersion: NetworkSimulationProtocolVersion;
    readonly sessionId: string;
    readonly serverId: string;
    readonly sequence: number;
    readonly serverTick: number;
    readonly serverTimeMs: number;
    readonly acknowledgedInput: NetworkInputAcknowledgement | null;
    readonly stateHash: string;
    readonly state: TState;
    readonly baseline: NetworkSnapshotBaseline | null;
}
export type NetworkSimulationEnvelope<TCommand extends NetworkJsonObject = NetworkJsonObject, TState extends NetworkJsonObject = NetworkJsonObject> = NetworkInputEnvelope<TCommand> | NetworkAuthoritativeSnapshotEnvelope<TState>;
export type NetworkSequenceDisposition = 'accept' | 'gap' | 'duplicate' | 'stale';
export interface NetworkSequenceDecision {
    readonly disposition: NetworkSequenceDisposition;
    readonly candidateSequence: number;
    readonly lastAcceptedSequence: number | null;
    readonly missingSequenceCount: number;
}
export interface NetworkClockObservation {
    readonly clientSendMs: number;
    readonly clientReceiveMs: number;
    readonly serverTimeMs: number;
}
export interface NetworkClockSample {
    readonly roundTripMs: number;
    readonly offsetMs: number;
}
export interface NetworkClockEstimate {
    readonly sampleCount: number;
    readonly offsetMs: number;
    readonly roundTripMs: number;
    readonly jitterMs: number;
    readonly samples: readonly NetworkClockSample[];
}
export interface NetworkProtocolDiagnostics {
    readonly acceptedEnvelopeCount: number;
    readonly duplicateEnvelopeCount: number;
    readonly staleEnvelopeCount: number;
    readonly missingSequenceCount: number;
    readonly lastAcceptedInputSequence: number | null;
    readonly lastAcceptedSnapshotSequence: number | null;
    readonly lastAcknowledgedInputTick: number | null;
    readonly clock: NetworkClockEstimate;
}
