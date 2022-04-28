/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MutableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MuteMutation
// ====================================================

export interface MuteMutation_mute_mutable_User {
  __typename: "User";
}

export interface MuteMutation_mute_mutable_Channel {
  __typename: "Channel";
  id: number;
  is_muted: boolean | null;
}

export interface MuteMutation_mute_mutable_Connectable {
  __typename: "Connectable";
  id: number;
  is_muted: boolean | null;
}

export type MuteMutation_mute_mutable = MuteMutation_mute_mutable_User | MuteMutation_mute_mutable_Channel | MuteMutation_mute_mutable_Connectable;

export interface MuteMutation_mute {
  __typename: "MuteMutationPayload";
  mutable: MuteMutation_mute_mutable;
}

export interface MuteMutation {
  mute: MuteMutation_mute | null;
}

export interface MuteMutationVariables {
  id: string;
  type: MutableTypeEnum;
}
