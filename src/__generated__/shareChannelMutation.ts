/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: shareChannelMutation
// ====================================================

export interface shareChannelMutation_share_channel_channel_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface shareChannelMutation_share_channel_channel {
  __typename: "Channel";
  id: number | null;
  visibility: string | null;
  share: shareChannelMutation_share_channel_channel_share | null;
}

export interface shareChannelMutation_share_channel {
  __typename: "ShareChannelPayload";
  channel: shareChannelMutation_share_channel_channel | null;
}

export interface shareChannelMutation {
  share_channel: shareChannelMutation_share_channel | null;
}

export interface shareChannelMutationVariables {
  id: string;
  enable: boolean;
}
