/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelFollowers
// ====================================================

export interface ChannelFollowers_channel_followers {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ChannelFollowers_channel {
  __typename: "Channel";
  id: number | null;
  followers: (ChannelFollowers_channel_followers | null)[] | null;
}

export interface ChannelFollowers {
  /**
   * A single channel
   */
  channel: ChannelFollowers_channel | null;
}

export interface ChannelFollowersVariables {
  id: string;
  page?: number | null;
  per?: number | null;
}
