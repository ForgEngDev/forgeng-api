import { type NetworkClockEstimate, type NetworkClockObservation, type NetworkJsonObject, type NetworkJsonValue, type NetworkSequenceDecision, type NetworkSimulationEnvelope } from './NetworkSimulationContract';
export type NetworkSimulationErrorCode = 'NETWORK_INVALID_ENVELOPE' | 'NETWORK_INVALID_CLOCK_SAMPLE' | 'NETWORK_INVALID_SEQUENCE';
export declare class NetworkSimulationContractError extends Error {
    readonly code: NetworkSimulationErrorCode;
    readonly path: string;
    constructor(code: NetworkSimulationErrorCode, path: string, message: string);
}
export declare function validateNetworkJsonValue(value: unknown, path?: string): NetworkJsonValue;
export declare function validateNetworkJsonObject(value: unknown, path?: string): NetworkJsonObject;
export declare function validateNetworkSimulationEnvelope(input: unknown): NetworkSimulationEnvelope;
export declare function classifyNetworkSequence(lastAcceptedSequence: number | null, candidateSequence: number): NetworkSequenceDecision;
export declare const EMPTY_NETWORK_CLOCK_ESTIMATE: NetworkClockEstimate;
export declare function observeNetworkClock(previous: NetworkClockEstimate, observation: NetworkClockObservation, maximumSamples?: number): NetworkClockEstimate;
export declare function estimateNetworkServerTime(clock: NetworkClockEstimate, clientTimeMs: number): number;
