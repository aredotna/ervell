/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Channel
// ====================================================

export interface Channel_channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export interface Channel_channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export type Channel_channel_owner = Channel_channel_owner_User | Channel_channel_owner_Group;

export interface Channel_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
  followers: number | null;
}

export interface Channel_channel_can {
  __typename: "ChannelCan";
  follow: boolean | null;
  update: boolean | null;
  destroy: boolean | null;
  mute: boolean | null;
  share: boolean | null;
  manage_collaborators: boolean | null;
  connect: boolean | null;
}

export interface Channel_channel_user {
  __typename: "User";
  id: number | null;
  href: string | null;
  name: string | null;
}

export interface Channel_channel_collaborators_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export interface Channel_channel_collaborators_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface Channel_channel_collaborators_Group_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface Channel_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface Channel_channel_collaborators_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  description: string | null;
  user: Channel_channel_collaborators_Group_user | null;
  users: (Channel_channel_collaborators_Group_users | null)[] | null;
  can: Channel_channel_collaborators_Group_can | null;
  visibility: string | null;
  label: string | null;
}

export type Channel_channel_collaborators = Channel_channel_collaborators_User | Channel_channel_collaborators_Group;

export interface Channel_channel_connected_to_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface Channel_channel_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type Channel_channel_connected_to_channels_owner = Channel_channel_connected_to_channels_owner_User | Channel_channel_connected_to_channels_owner_Group;

export interface Channel_channel_connected_to_channels {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
  owner: Channel_channel_connected_to_channels_owner | null;
}

export interface Channel_channel_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface Channel_channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  owner: Channel_channel_owner | null;
  counts: Channel_channel_counts | null;
  label: string | null;
  can: Channel_channel_can | null;
  is_muted: boolean | null;
  info: string | null;
  user: Channel_channel_user | null;
  collaborators: (Channel_channel_collaborators | null)[] | null;
  connected_to_channels: (Channel_channel_connected_to_channels | null)[] | null;
  share: Channel_channel_share | null;
}

export interface Channel {
  /**
   * A single channel
   */
  channel: Channel_channel | null;
}

export interface ChannelVariables {
  id: string;
}
