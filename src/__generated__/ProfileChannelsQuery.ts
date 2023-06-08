/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelsSort } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProfileChannelsQuery
// ====================================================

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ProfileChannelsQuery_identity_identifiable_Group_channels_owner = ProfileChannelsQuery_identity_identifiable_Group_channels_owner_Group | ProfileChannelsQuery_identity_identifiable_Group_channels_owner_User;

export interface ProfileChannelsQuery_identity_identifiable_Group_channels {
  __typename: "Channel";
  id: number;
  href: string;
  truncatedTitle: string;
  visibility: string;
  updated_at: string;
  counts: ProfileChannelsQuery_identity_identifiable_Group_channels_counts;
  owner: ProfileChannelsQuery_identity_identifiable_Group_channels_owner;
  label: string;
}

export interface ProfileChannelsQuery_identity_identifiable_Group_counts {
  __typename: "GroupCounts";
  channels: number;
}

export interface ProfileChannelsQuery_identity_identifiable_Group {
  __typename: "Group";
  id: number;
  name: string;
  channels: ProfileChannelsQuery_identity_identifiable_Group_channels[];
  counts: ProfileChannelsQuery_identity_identifiable_Group_counts;
}

export interface ProfileChannelsQuery_identity_identifiable_User_counts {
  __typename: "UserCounts";
  channels: number;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ProfileChannelsQuery_identity_identifiable_User_channels_owner = ProfileChannelsQuery_identity_identifiable_User_channels_owner_Group | ProfileChannelsQuery_identity_identifiable_User_channels_owner_User;

export interface ProfileChannelsQuery_identity_identifiable_User_channels {
  __typename: "Channel";
  id: number;
  href: string;
  truncatedTitle: string;
  visibility: string;
  updated_at: string;
  counts: ProfileChannelsQuery_identity_identifiable_User_channels_counts;
  owner: ProfileChannelsQuery_identity_identifiable_User_channels_owner;
  label: string;
}

export interface ProfileChannelsQuery_identity_identifiable_User {
  __typename: "User";
  id: number;
  name: string;
  counts: ProfileChannelsQuery_identity_identifiable_User_counts;
  channels: ProfileChannelsQuery_identity_identifiable_User_channels[] | null;
}

export type ProfileChannelsQuery_identity_identifiable = ProfileChannelsQuery_identity_identifiable_Group | ProfileChannelsQuery_identity_identifiable_User;

export interface ProfileChannelsQuery_identity {
  __typename: "Identity";
  identifiable: ProfileChannelsQuery_identity_identifiable;
}

export interface ProfileChannelsQuery {
  identity: ProfileChannelsQuery_identity | null;
}

export interface ProfileChannelsQueryVariables {
  id: string;
  page?: number | null;
  per?: number | null;
  sort?: ChannelsSort | null;
}
