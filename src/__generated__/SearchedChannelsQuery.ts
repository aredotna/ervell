/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchedChannelsQuery
// ====================================================

export interface SearchedChannelsQuery_me_searched_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface SearchedChannelsQuery_me_searched_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type SearchedChannelsQuery_me_searched_channels_owner = SearchedChannelsQuery_me_searched_channels_owner_Group | SearchedChannelsQuery_me_searched_channels_owner_User;

export interface SearchedChannelsQuery_me_searched_channels {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  visibility: string | null;
  owner: SearchedChannelsQuery_me_searched_channels_owner | null;
}

export interface SearchedChannelsQuery_me {
  __typename: "Me";
  id: number | null;
  searched_channels: (SearchedChannelsQuery_me_searched_channels | null)[] | null;
}

export interface SearchedChannelsQuery {
  /**
   * The current logged in user
   */
  me: SearchedChannelsQuery_me | null;
}

export interface SearchedChannelsQueryVariables {
  query: string;
  includeOpenChannels: boolean;
}
