/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MutableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: MuteProfileMutation
// ====================================================

export interface MuteProfileMutation_mute_mutable_Channel {
  __typename: "Channel";
  id: number;
  is_muted: boolean;
}

export interface MuteProfileMutation_mute_mutable_Connectable {
  __typename: "Connectable";
  id: number;
  is_muted: boolean;
}

export interface MuteProfileMutation_mute_mutable_User {
  __typename: "User";
  id: number;
  is_muted: boolean;
}

export type MuteProfileMutation_mute_mutable = MuteProfileMutation_mute_mutable_Channel | MuteProfileMutation_mute_mutable_Connectable | MuteProfileMutation_mute_mutable_User;

export interface MuteProfileMutation_mute {
  __typename: "MuteMutationPayload";
  mutable: MuteProfileMutation_mute_mutable;
}

export interface MuteProfileMutation {
  mute: MuteProfileMutation_mute | null;
}

export interface MuteProfileMutationVariables {
  id: string;
  type: MutableTypeEnum;
}
