/** Application protocol, independent of transport, renderer, ECS and coordinates. */
export declare const MULTIPLAYER_VERSION: 1;
export declare const CHANNELS: Readonly<{
    control: "reliable-ordered";
    command: "reliable-ordered";
    event: "reliable-ordered";
    state: "sequenced-replaceable";
}>;
export type Json = null | boolean | number | string | Json[] | {
    [key: string]: Json;
};
export type Data = {
    [key: string]: Json;
};
export type Role = 'controller' | 'spectator';
export type Entities = Record<string, Record<string, Data>>;
export interface Command {
    entity: string;
    name: string;
    data: Data;
    sequence: number;
    tick: number;
}
export type ClientMessage = {
    kind: 'hello';
    version: number;
    schema: string;
    encoding: 'json';
    credential: string;
    resume?: string;
} | {
    kind: 'join';
    room: string;
    role: Role;
} | {
    kind: 'command';
    command: Command;
} | {
    kind: 'ack';
    sequence: number;
} | {
    kind: 'leave' | 'resync';
};
export type ServerMessage = {
    kind: 'welcome';
    version: 1;
    schema: string;
    encoding: 'json';
    session: string;
    resume: string;
    nextSequence: number;
} | {
    kind: 'joined';
    room: string;
    role: Role;
} | {
    kind: 'left';
} | {
    kind: 'error';
    code: string;
} | {
    kind: 'event';
    room: string;
    tick: number;
    sequence: number;
    name: string;
    data: Data;
} | Snapshot;
export interface Snapshot {
    kind: 'snapshot';
    room: string;
    sequence: number;
    tick: number;
    time: number;
    base: number | null;
    entities: Entities;
    removed: string[];
    owners: Record<string, string>;
    processed: number;
}
export interface DecodeLimits {
    bytes: number;
    depth: number;
    nodes: number;
}
export declare const DEFAULT_DECODE_LIMITS: DecodeLimits;
export declare class ProtocolError extends Error {
    readonly code: string;
    constructor(code?: string);
}
export declare const isId: (v: unknown) => v is string;
export declare const isData: (v: unknown) => v is Data;
/** Depth preflight occurs BEFORE JSON.parse; structural budget also protects object encoders. */
export declare function decodeJson(text: string, limits?: DecodeLimits): Json;
export declare function encodeMessage(value: ClientMessage | ServerMessage, limits?: DecodeLimits): Uint8Array;
export declare function decodeClient(text: string, limits?: DecodeLimits): ClientMessage;
export declare function decodeServer(text: string, limits?: DecodeLimits): ServerMessage;
