/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unmuteChannelMutation
// ====================================================

export interface unmuteChannelMutation_unmute_channel_channel {
  __typename: "Channel";
  id: number | null;
  is_muted: boolean | null;
}

export interface unmuteChannelMutation_unmute_channel {
  __typename: "UnmuteChannelPayload";
  channel: unmuteChannelMutation_unmute_channel_channel | null;
}

export interface unmuteChannelMutation {
  unmute_channel: unmuteChannelMutation_unmute_channel | null;
}

export interface unmuteChannelMutationVariables {
  id: string;
}
