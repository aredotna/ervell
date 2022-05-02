/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MutableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UnmuteProfileMutation
// ====================================================

export interface UnmuteProfileMutation_unmute_mutable_Channel {
  __typename: "Channel";
  id: number;
  is_muted: boolean | null;
}

export interface UnmuteProfileMutation_unmute_mutable_Connectable {
  __typename: "Connectable";
  id: number;
  is_muted: boolean | null;
}

export interface UnmuteProfileMutation_unmute_mutable_User {
  __typename: "User";
  id: number;
  is_muted: boolean | null;
}

export type UnmuteProfileMutation_unmute_mutable = UnmuteProfileMutation_unmute_mutable_Channel | UnmuteProfileMutation_unmute_mutable_Connectable | UnmuteProfileMutation_unmute_mutable_User;

export interface UnmuteProfileMutation_unmute {
  __typename: "UnmuteMutationPayload";
  mutable: UnmuteProfileMutation_unmute_mutable;
}

export interface UnmuteProfileMutation {
  unmute: UnmuteProfileMutation_unmute | null;
}

export interface UnmuteProfileMutationVariables {
  id: string;
  type: MutableTypeEnum;
}
