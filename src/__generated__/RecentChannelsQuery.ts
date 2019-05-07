/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RecentChannelsQuery
// ====================================================

export interface RecentChannelsQuery_me_searched_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface RecentChannelsQuery_me_searched_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type RecentChannelsQuery_me_searched_channels_owner = RecentChannelsQuery_me_searched_channels_owner_Group | RecentChannelsQuery_me_searched_channels_owner_User;

export interface RecentChannelsQuery_me_searched_channels {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  visibility: string | null;
  owner: RecentChannelsQuery_me_searched_channels_owner | null;
}

export interface RecentChannelsQuery_me {
  __typename: "Me";
  id: number | null;
  searched_channels: (RecentChannelsQuery_me_searched_channels | null)[] | null;
}

export interface RecentChannelsQuery {
  /**
   * The current logged in user
   */
  me: RecentChannelsQuery_me | null;
}

export interface RecentChannelsQueryVariables {
  query: string;
}
