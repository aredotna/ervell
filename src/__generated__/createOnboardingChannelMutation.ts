/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelVisibility } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createOnboardingChannelMutation
// ====================================================

export interface createOnboardingChannelMutation_create_channel_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
}

export interface createOnboardingChannelMutation_create_channel_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  label: string;
}

export type createOnboardingChannelMutation_create_channel_channel_owner = createOnboardingChannelMutation_create_channel_channel_owner_User | createOnboardingChannelMutation_create_channel_channel_owner_Group;

export interface createOnboardingChannelMutation_create_channel_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number;
  followers: number;
}

export interface createOnboardingChannelMutation_create_channel_channel_can {
  __typename: "ChannelCan";
  follow: boolean;
  update: boolean;
  destroy: boolean;
  mute: boolean;
  share: boolean;
  manage_collaborators: boolean;
  connect: boolean;
}

export interface createOnboardingChannelMutation_create_channel_channel_user {
  __typename: "User";
  id: number;
  href: string;
  name: string;
}

export interface createOnboardingChannelMutation_create_channel_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
}

export interface createOnboardingChannelMutation_create_channel_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface createOnboardingChannelMutation_create_channel_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface createOnboardingChannelMutation_create_channel_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface createOnboardingChannelMutation_create_channel_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  description: string | null;
  user: createOnboardingChannelMutation_create_channel_channel_collaborators_Group_user;
  users: createOnboardingChannelMutation_create_channel_channel_collaborators_Group_users[];
  can: createOnboardingChannelMutation_create_channel_channel_collaborators_Group_can;
  visibility: string;
  label: string;
}

export type createOnboardingChannelMutation_create_channel_channel_collaborators = createOnboardingChannelMutation_create_channel_channel_collaborators_User | createOnboardingChannelMutation_create_channel_channel_collaborators_Group;

export interface createOnboardingChannelMutation_create_channel_channel_connected_to_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface createOnboardingChannelMutation_create_channel_channel_connected_to_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type createOnboardingChannelMutation_create_channel_channel_connected_to_channels_owner = createOnboardingChannelMutation_create_channel_channel_connected_to_channels_owner_User | createOnboardingChannelMutation_create_channel_channel_connected_to_channels_owner_Group;

export interface createOnboardingChannelMutation_create_channel_channel_connected_to_channels {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  owner: createOnboardingChannelMutation_create_channel_channel_connected_to_channels_owner;
}

export interface createOnboardingChannelMutation_create_channel_channel_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface createOnboardingChannelMutation_create_channel_channel {
  __typename: "Channel";
  id: number;
  title: string;
  truncatedTitle: string;
  href: string;
  visibility: string;
  owner: createOnboardingChannelMutation_create_channel_channel_owner;
  counts: createOnboardingChannelMutation_create_channel_channel_counts;
  label: string;
  can: createOnboardingChannelMutation_create_channel_channel_can;
  is_muted: boolean;
  info: string | null;
  user: createOnboardingChannelMutation_create_channel_channel_user | null;
  collaborators: createOnboardingChannelMutation_create_channel_channel_collaborators[];
  connected_to_channels: createOnboardingChannelMutation_create_channel_channel_connected_to_channels[];
  share: createOnboardingChannelMutation_create_channel_channel_share | null;
  slug: string;
}

export interface createOnboardingChannelMutation_create_channel {
  __typename: "CreateChannelPayload";
  channel: createOnboardingChannelMutation_create_channel_channel;
}

export interface createOnboardingChannelMutation {
  create_channel: createOnboardingChannelMutation_create_channel | null;
}

export interface createOnboardingChannelMutationVariables {
  title: string;
  visibility?: ChannelVisibility | null;
}
