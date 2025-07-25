import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ContentEntry {
  'id' : bigint,
  'cid' : string,
  'contentType' : string,
  'owner' : Principal,
  'createdAt' : Time,
  'tone' : string,
  'prompt' : string,
}
export type Time = bigint;
export interface _SERVICE {
  'createContent' : ActorMethod<[string, string, string, string], bigint>,
  'getContent' : ActorMethod<[bigint], [] | [ContentEntry]>,
  'listByOwner' : ActorMethod<[Principal], Array<ContentEntry>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
