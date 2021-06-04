/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelFollowersPage
// ====================================================

export interface ChannelFollowersPage_channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export interface ChannelFollowersPage_channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export type ChannelFollowersPage_channel_owner = ChannelFollowersPage_channel_owner_User | ChannelFollowersPage_channel_owner_Group;

export interface ChannelFollowersPage_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
  followers: number | null;
}

export interface ChannelFollowersPage_channel_can {
  __typename: "ChannelCan";
  follow: boolean | null;
  update: boolean | null;
  destroy: boolean | null;
  mute: boolean | null;
  share: boolean | null;
  manage_collaborators: boolean | null;
  connect: boolean | null;
}

export interface ChannelFollowersPage_channel_user {
  __typename: "User";
  id: number | null;
  href: string | null;
  name: string | null;
}

export interface ChannelFollowersPage_channel_collaborators_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export interface ChannelFollowersPage_channel_collaborators_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ChannelFollowersPage_channel_collaborators_Group_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ChannelFollowersPage_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ChannelFollowersPage_channel_collaborators_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  description: string | null;
  user: ChannelFollowersPage_channel_collaborators_Group_user | null;
  users: (ChannelFollowersPage_channel_collaborators_Group_users | null)[] | null;
  can: ChannelFollowersPage_channel_collaborators_Group_can | null;
  visibility: string | null;
  label: string | null;
}

export type ChannelFollowersPage_channel_collaborators = ChannelFollowersPage_channel_collaborators_User | ChannelFollowersPage_channel_collaborators_Group;

export interface ChannelFollowersPage_channel_connected_to_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ChannelFollowersPage_channel_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type ChannelFollowersPage_channel_connected_to_channels_owner = ChannelFollowersPage_channel_connected_to_channels_owner_User | ChannelFollowersPage_channel_connected_to_channels_owner_Group;

export interface ChannelFollowersPage_channel_connected_to_channels {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
  owner: ChannelFollowersPage_channel_connected_to_channels_owner | null;
}

export interface ChannelFollowersPage_channel_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface ChannelFollowersPage_channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  owner: ChannelFollowersPage_channel_owner | null;
  counts: ChannelFollowersPage_channel_counts | null;
  label: string | null;
  can: ChannelFollowersPage_channel_can | null;
  is_muted: boolean | null;
  info: string | null;
  user: ChannelFollowersPage_channel_user | null;
  collaborators: (ChannelFollowersPage_channel_collaborators | null)[] | null;
  connected_to_channels: (ChannelFollowersPage_channel_connected_to_channels | null)[] | null;
  share: ChannelFollowersPage_channel_share | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical: string | null;
  is_nsfw: boolean | null;
  image_url: string | null;
}

export interface ChannelFollowersPage {
  /**
   * A single channel
   */
  channel: ChannelFollowersPage_channel | null;
}

export interface ChannelFollowersPageVariables {
  id: string;
}
