/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelFollowersPage
// ====================================================

export interface ChannelFollowersPage_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
  is_indexable: boolean;
}

export interface ChannelFollowersPage_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  label: string;
}

export type ChannelFollowersPage_channel_owner = ChannelFollowersPage_channel_owner_User | ChannelFollowersPage_channel_owner_Group;

export interface ChannelFollowersPage_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number;
  followers: number;
}

export interface ChannelFollowersPage_channel_can {
  __typename: "ChannelCan";
  follow: boolean;
  update: boolean;
  destroy: boolean;
  mute: boolean;
  share: boolean;
  manage_collaborators: boolean;
  connect: boolean;
}

export interface ChannelFollowersPage_channel_user {
  __typename: "User";
  id: number;
  href: string;
  name: string;
}

export interface ChannelFollowersPage_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
}

export interface ChannelFollowersPage_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ChannelFollowersPage_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ChannelFollowersPage_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface ChannelFollowersPage_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  description: string | null;
  user: ChannelFollowersPage_channel_collaborators_Group_user;
  users: ChannelFollowersPage_channel_collaborators_Group_users[];
  can: ChannelFollowersPage_channel_collaborators_Group_can;
  visibility: string;
  label: string;
}

export type ChannelFollowersPage_channel_collaborators = ChannelFollowersPage_channel_collaborators_User | ChannelFollowersPage_channel_collaborators_Group;

export interface ChannelFollowersPage_channel_connected_to_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelFollowersPage_channel_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type ChannelFollowersPage_channel_connected_to_channels_owner = ChannelFollowersPage_channel_connected_to_channels_owner_User | ChannelFollowersPage_channel_connected_to_channels_owner_Group;

export interface ChannelFollowersPage_channel_connected_to_channels {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  owner: ChannelFollowersPage_channel_connected_to_channels_owner;
}

export interface ChannelFollowersPage_channel_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface ChannelFollowersPage_channel {
  __typename: "Channel";
  id: number;
  title: string;
  truncatedTitle: string;
  href: string;
  visibility: string;
  owner: ChannelFollowersPage_channel_owner;
  counts: ChannelFollowersPage_channel_counts;
  label: string;
  can: ChannelFollowersPage_channel_can;
  is_muted: boolean;
  info: string | null;
  user: ChannelFollowersPage_channel_user;
  collaborators: ChannelFollowersPage_channel_collaborators[];
  connected_to_channels: ChannelFollowersPage_channel_connected_to_channels[];
  share: ChannelFollowersPage_channel_share | null;
  slug: string;
  meta_title: string;
  meta_description: string | null;
  canonical: string;
  is_nsfw: boolean;
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
