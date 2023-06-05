/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileChannelIndex
// ====================================================

export interface ProfileChannelIndex_User_channels_index_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ProfileChannelIndex_User_channels_index_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ProfileChannelIndex_User_channels_index_channels_owner = ProfileChannelIndex_User_channels_index_channels_owner_Group | ProfileChannelIndex_User_channels_index_channels_owner_User;

export interface ProfileChannelIndex_User_channels_index_channels_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface ProfileChannelIndex_User_channels_index_channels {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: ProfileChannelIndex_User_channels_index_channels_owner;
  counts: ProfileChannelIndex_User_channels_index_channels_counts;
  label: string;
}

export interface ProfileChannelIndex_User_channels_index {
  __typename: "IndexedChannels";
  key: string;
  channels: ProfileChannelIndex_User_channels_index_channels[];
}

export interface ProfileChannelIndex_User {
  __typename: "User";
  id: number;
  is_me: boolean;
  name: string;
  /**
   * Special channel field that eager loads all the owner and does not do pagination
   */
  channels_index: ProfileChannelIndex_User_channels_index[];
}

export interface ProfileChannelIndex_Group_channels_index_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ProfileChannelIndex_Group_channels_index_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ProfileChannelIndex_Group_channels_index_channels_owner = ProfileChannelIndex_Group_channels_index_channels_owner_Group | ProfileChannelIndex_Group_channels_index_channels_owner_User;

export interface ProfileChannelIndex_Group_channels_index_channels_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface ProfileChannelIndex_Group_channels_index_channels {
  __typename: "Channel";
  id: number;
  href: string;
  visibility: string;
  title: string;
  owner: ProfileChannelIndex_Group_channels_index_channels_owner;
  counts: ProfileChannelIndex_Group_channels_index_channels_counts;
  label: string;
}

export interface ProfileChannelIndex_Group_channels_index {
  __typename: "IndexedChannels";
  key: string;
  channels: ProfileChannelIndex_Group_channels_index_channels[];
}

export interface ProfileChannelIndex_Group {
  __typename: "Group";
  id: number;
  is_current_user_a_member: boolean;
  name: string;
  /**
   * Special channel field that eager loads all the owner and does not do pagination
   */
  channels_index: ProfileChannelIndex_Group_channels_index[];
}

export type ProfileChannelIndex = ProfileChannelIndex_User | ProfileChannelIndex_Group;
