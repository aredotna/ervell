/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RecentChannelsQuery
// ====================================================

export interface RecentChannelsQuery_me_recent_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface RecentChannelsQuery_me_recent_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type RecentChannelsQuery_me_recent_channels_owner = RecentChannelsQuery_me_recent_channels_owner_Group | RecentChannelsQuery_me_recent_channels_owner_User;

export interface RecentChannelsQuery_me_recent_channels {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  visibility: string | null;
  owner: RecentChannelsQuery_me_recent_channels_owner | null;
}

export interface RecentChannelsQuery_me {
  __typename: "Me";
  id: number | null;
  recent_channels: (RecentChannelsQuery_me_recent_channels | null)[] | null;
}

export interface RecentChannelsQuery {
  /**
   * The current logged in user
   */
  me: RecentChannelsQuery_me | null;
}
