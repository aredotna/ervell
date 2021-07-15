/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchedChannelsQuery
// ====================================================

export interface SearchedChannelsQuery_me_searched_channels_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface SearchedChannelsQuery_me_searched_channels_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type SearchedChannelsQuery_me_searched_channels_owner = SearchedChannelsQuery_me_searched_channels_owner_Group | SearchedChannelsQuery_me_searched_channels_owner_User;

export interface SearchedChannelsQuery_me_searched_channels {
  __typename: "Channel";
  id: number;
  title: string;
  visibility: string;
  owner: SearchedChannelsQuery_me_searched_channels_owner;
}

export interface SearchedChannelsQuery_me {
  __typename: "Me";
  id: number;
  searched_channels: SearchedChannelsQuery_me_searched_channels[] | null;
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
