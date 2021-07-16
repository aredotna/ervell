/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RecentChannelsQuery
// ====================================================

export interface RecentChannelsQuery_me_recent_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface RecentChannelsQuery_me_recent_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type RecentChannelsQuery_me_recent_channels_owner = RecentChannelsQuery_me_recent_channels_owner_Group | RecentChannelsQuery_me_recent_channels_owner_User;

export interface RecentChannelsQuery_me_recent_channels {
  __typename: "Channel";
  id: number;
  title: string;
  visibility: string;
  owner: RecentChannelsQuery_me_recent_channels_owner;
}

export interface RecentChannelsQuery_me {
  __typename: "Me";
  id: number;
  recent_channels: RecentChannelsQuery_me_recent_channels[] | null;
}

export interface RecentChannelsQuery {
  /**
   * The current logged in user
   */
  me: RecentChannelsQuery_me | null;
}
