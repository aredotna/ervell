/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MutableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UnmuteMutation
// ====================================================

export interface UnmuteMutation_unmute_mutable_Channel {
  __typename: "Channel";
  id: number | null;
  is_muted: boolean | null;
}

export interface UnmuteMutation_unmute_mutable_Connectable {
  __typename: "Connectable";
  id: number | null;
  is_muted: boolean | null;
}

export type UnmuteMutation_unmute_mutable = UnmuteMutation_unmute_mutable_Channel | UnmuteMutation_unmute_mutable_Connectable;

export interface UnmuteMutation_unmute {
  __typename: "UnmutePayload";
  mutable: UnmuteMutation_unmute_mutable | null;
}

export interface UnmuteMutation {
  unmute: UnmuteMutation_unmute | null;
}

export interface UnmuteMutationVariables {
  id: string;
  type: MutableTypeEnum;
}
