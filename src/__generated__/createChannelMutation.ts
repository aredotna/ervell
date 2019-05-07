/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ChannelVisibility } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createChannelMutation
// ====================================================

export interface createChannelMutation_create_channel_channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface createChannelMutation_create_channel_channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
}

export type createChannelMutation_create_channel_channel_owner = createChannelMutation_create_channel_channel_owner_User | createChannelMutation_create_channel_channel_owner_Group;

export interface createChannelMutation_create_channel_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
  followers: number | null;
}

export interface createChannelMutation_create_channel_channel_can {
  __typename: "ChannelCan";
  follow: boolean | null;
  update: boolean | null;
  destroy: boolean | null;
  mute: boolean | null;
  share: boolean | null;
  manage_collaborators: boolean | null;
  connect: boolean | null;
}

export interface createChannelMutation_create_channel_channel_user {
  __typename: "User";
  id: number | null;
  href: string | null;
  name: string | null;
}

export interface createChannelMutation_create_channel_channel_collaborators_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface createChannelMutation_create_channel_channel_collaborators_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface createChannelMutation_create_channel_channel_collaborators_Group_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface createChannelMutation_create_channel_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface createChannelMutation_create_channel_channel_collaborators_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  description: string | null;
  user: createChannelMutation_create_channel_channel_collaborators_Group_user | null;
  users: (createChannelMutation_create_channel_channel_collaborators_Group_users | null)[] | null;
  can: createChannelMutation_create_channel_channel_collaborators_Group_can | null;
  visibility: string | null;
}

export type createChannelMutation_create_channel_channel_collaborators = createChannelMutation_create_channel_channel_collaborators_User | createChannelMutation_create_channel_channel_collaborators_Group;

export interface createChannelMutation_create_channel_channel_connected_to_channels {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface createChannelMutation_create_channel_channel_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface createChannelMutation_create_channel_channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  owner: createChannelMutation_create_channel_channel_owner | null;
  counts: createChannelMutation_create_channel_channel_counts | null;
  can: createChannelMutation_create_channel_channel_can | null;
  is_muted: boolean | null;
  info: string | null;
  user: createChannelMutation_create_channel_channel_user | null;
  collaborators: (createChannelMutation_create_channel_channel_collaborators | null)[] | null;
  connected_to_channels: (createChannelMutation_create_channel_channel_connected_to_channels | null)[] | null;
  share: createChannelMutation_create_channel_channel_share | null;
}

export interface createChannelMutation_create_channel {
  __typename: "CreateChannelPayload";
  channel: createChannelMutation_create_channel_channel | null;
}

export interface createChannelMutation {
  create_channel: createChannelMutation_create_channel | null;
}

export interface createChannelMutationVariables {
  title: string;
  visibility?: ChannelVisibility | null;
}
