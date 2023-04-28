/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelFollowers
// ====================================================

export interface ChannelFollowers_channel_followers {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export interface ChannelFollowers_channel {
  __typename: "Channel";
  id: number;
  followers: ChannelFollowers_channel_followers[] | null;
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
