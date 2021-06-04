/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileChannelIndex
// ====================================================

export interface ProfileChannelIndex_User_channels_index_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ProfileChannelIndex_User_channels_index_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ProfileChannelIndex_User_channels_index_channels_owner = ProfileChannelIndex_User_channels_index_channels_owner_Group | ProfileChannelIndex_User_channels_index_channels_owner_User;

export interface ProfileChannelIndex_User_channels_index_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelIndex_User_channels_index_channels {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  visibility: string | null;
  title: string | null;
  owner: ProfileChannelIndex_User_channels_index_channels_owner | null;
  counts: ProfileChannelIndex_User_channels_index_channels_counts | null;
  label: string | null;
}

export interface ProfileChannelIndex_User_channels_index {
  __typename: "IndexedChannels";
  key: string | null;
  channels: (ProfileChannelIndex_User_channels_index_channels | null)[] | null;
}

export interface ProfileChannelIndex_User {
  __typename: "User";
  id: number | null;
  is_me: boolean | null;
  name: string | null;
  /**
   * Special channel field that eager loads all the owner and does not do pagination
   */
  channels_index: (ProfileChannelIndex_User_channels_index | null)[] | null;
}

export interface ProfileChannelIndex_Group_channels_index_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ProfileChannelIndex_Group_channels_index_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ProfileChannelIndex_Group_channels_index_channels_owner = ProfileChannelIndex_Group_channels_index_channels_owner_Group | ProfileChannelIndex_Group_channels_index_channels_owner_User;

export interface ProfileChannelIndex_Group_channels_index_channels_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileChannelIndex_Group_channels_index_channels {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  visibility: string | null;
  title: string | null;
  owner: ProfileChannelIndex_Group_channels_index_channels_owner | null;
  counts: ProfileChannelIndex_Group_channels_index_channels_counts | null;
  label: string | null;
}

export interface ProfileChannelIndex_Group_channels_index {
  __typename: "IndexedChannels";
  key: string | null;
  channels: (ProfileChannelIndex_Group_channels_index_channels | null)[] | null;
}

export interface ProfileChannelIndex_Group {
  __typename: "Group";
  id: number | null;
  is_current_user_a_member: boolean | null;
  name: string | null;
  /**
   * Special channel field that eager loads all the owner and does not do pagination
   */
  channels_index: (ProfileChannelIndex_Group_channels_index | null)[] | null;
}

export type ProfileChannelIndex = ProfileChannelIndex_User | ProfileChannelIndex_Group;
