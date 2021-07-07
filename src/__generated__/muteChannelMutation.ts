/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: muteChannelMutation
// ====================================================

export interface muteChannelMutation_mute_channel_channel {
  __typename: "Channel";
  id: number;
  is_muted: boolean | null;
}

export interface muteChannelMutation_mute_channel {
  __typename: "MuteChannelMutationPayload";
  channel: muteChannelMutation_mute_channel_channel;
}

export interface muteChannelMutation {
  mute_channel: muteChannelMutation_mute_channel | null;
}

export interface muteChannelMutationVariables {
  id: string;
}
