import type { NetworkJsonValue, NetworkSimulationEnvelope } from './NetworkSimulationContract';
export declare function stringifyNetworkSimulationEnvelope(envelope: NetworkSimulationEnvelope): string;
export declare function stringifyNetworkJsonValue(value: NetworkJsonValue): string;
export declare function hashNetworkJsonValue(value: NetworkJsonValue): string;
export declare function serializeNetworkSimulationEnvelope(envelope: NetworkSimulationEnvelope): Uint8Array;
export declare function deserializeNetworkSimulationEnvelope(payload: Uint8Array): NetworkSimulationEnvelope;
