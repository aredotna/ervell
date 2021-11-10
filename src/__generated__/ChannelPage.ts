/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelPage
// ====================================================

export interface ChannelPage_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
  is_indexable: boolean;
}

export interface ChannelPage_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export type ChannelPage_channel_owner = ChannelPage_channel_owner_User | ChannelPage_channel_owner_Group;

export interface ChannelPage_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
  followers: number;
  contents: number | null;
  blocks: number | null;
  channels: number | null;
}

export interface ChannelPage_channel_can {
  __typename: "ChannelCan";
  follow: boolean | null;
  update: boolean | null;
  destroy: boolean | null;
  mute: boolean | null;
  share: boolean | null;
  manage_collaborators: boolean;
  connect: boolean | null;
  add_to: boolean | null;
  add_to_as_premium: boolean | null;
}

export interface ChannelPage_channel_user {
  __typename: "User";
  id: number;
  href: string | null;
  name: string;
}

export interface ChannelPage_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export interface ChannelPage_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface ChannelPage_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface ChannelPage_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ChannelPage_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  description: string | null;
  user: ChannelPage_channel_collaborators_Group_user;
  users: ChannelPage_channel_collaborators_Group_users[] | null;
  can: ChannelPage_channel_collaborators_Group_can | null;
  visibility: string;
  label: string;
}

export type ChannelPage_channel_collaborators = ChannelPage_channel_collaborators_User | ChannelPage_channel_collaborators_Group;

export interface ChannelPage_channel_connected_to_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface ChannelPage_channel_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type ChannelPage_channel_connected_to_channels_owner = ChannelPage_channel_connected_to_channels_owner_User | ChannelPage_channel_connected_to_channels_owner_Group;

export interface ChannelPage_channel_connected_to_channels {
  __typename: "Channel";
  id: number;
  label: string;
  href: string | null;
  owner: ChannelPage_channel_connected_to_channels_owner;
}

export interface ChannelPage_channel_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface ChannelPage_channel {
  __typename: "Channel";
  id: number;
  title: string;
  truncatedTitle: string;
  href: string | null;
  visibility: string;
  owner: ChannelPage_channel_owner;
  counts: ChannelPage_channel_counts | null;
  label: string;
  can: ChannelPage_channel_can | null;
  is_muted: boolean | null;
  info: string | null;
  user: ChannelPage_channel_user | null;
  collaborators: ChannelPage_channel_collaborators[] | null;
  connected_to_channels: ChannelPage_channel_connected_to_channels[] | null;
  share: ChannelPage_channel_share | null;
  meta_title: string;
  meta_description: string | null;
  canonical: string | null;
  is_nsfw: boolean;
  image_url: string | null;
}

export interface ChannelPage {
  /**
   * A single channel
   */
  channel: ChannelPage_channel | null;
}

export interface ChannelPageVariables {
  id: string;
}
