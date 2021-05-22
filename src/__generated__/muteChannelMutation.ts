/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: muteChannelMutation
// ====================================================

export interface muteChannelMutation_mute_channel_channel {
  __typename: "Channel";
  id: number | null;
  is_muted: boolean | null;
}

export interface muteChannelMutation_mute_channel {
  __typename: "MuteChannelPayload";
  channel: muteChannelMutation_mute_channel_channel | null;
}

export interface muteChannelMutation {
  mute_channel: muteChannelMutation_mute_channel | null;
}

export interface muteChannelMutationVariables {
  id: string;
}
