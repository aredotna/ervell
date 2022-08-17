/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileChannels
// ====================================================

export interface ProfileChannels_Group_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannels_Group_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ProfileChannels_Group_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ProfileChannels_Group_channels_owner = ProfileChannels_Group_channels_owner_Group | ProfileChannels_Group_channels_owner_User;

export interface ProfileChannels_Group_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  truncatedTitle: string;
  visibility: string;
  updated_at: string | null;
  counts: ProfileChannels_Group_channels_counts | null;
  owner: ProfileChannels_Group_channels_owner;
  label: string;
}

export interface ProfileChannels_Group_counts {
  __typename: "GroupCounts";
  channels: number | null;
}

export interface ProfileChannels_Group {
  __typename: "Group";
  id: number;
  name: string;
  channels: ProfileChannels_Group_channels[] | null;
  counts: ProfileChannels_Group_counts | null;
}

export interface ProfileChannels_User_counts {
  __typename: "UserCounts";
  channels: number | null;
}

export interface ProfileChannels_User_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannels_User_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ProfileChannels_User_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ProfileChannels_User_channels_owner = ProfileChannels_User_channels_owner_Group | ProfileChannels_User_channels_owner_User;

export interface ProfileChannels_User_channels {
  __typename: "Channel";
  id: number;
  href: string | null;
  truncatedTitle: string;
  visibility: string;
  updated_at: string | null;
  counts: ProfileChannels_User_channels_counts | null;
  owner: ProfileChannels_User_channels_owner;
  label: string;
}

export interface ProfileChannels_User {
  __typename: "User";
  id: number;
  name: string;
  counts: ProfileChannels_User_counts | null;
  channels: ProfileChannels_User_channels[] | null;
}

export type ProfileChannels = ProfileChannels_Group | ProfileChannels_User;
