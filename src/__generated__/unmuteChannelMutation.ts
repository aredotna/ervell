/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: unmuteChannelMutation
// ====================================================

export interface unmuteChannelMutation_unmute_channel_channel {
  __typename: "Channel";
  id: number;
  is_muted: boolean;
}

export interface unmuteChannelMutation_unmute_channel {
  __typename: "UnmuteChannelMutationPayload";
  channel: unmuteChannelMutation_unmute_channel_channel;
}

export interface unmuteChannelMutation {
  unmute_channel: unmuteChannelMutation_unmute_channel | null;
}

export interface unmuteChannelMutationVariables {
  id: string;
}
