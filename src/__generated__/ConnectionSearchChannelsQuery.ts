/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConnectionSearchChannelsQuery
// ====================================================

export interface ConnectionSearchChannelsQuery_me_searched_channels_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface ConnectionSearchChannelsQuery_me_searched_channels_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type ConnectionSearchChannelsQuery_me_searched_channels_owner = ConnectionSearchChannelsQuery_me_searched_channels_owner_Group | ConnectionSearchChannelsQuery_me_searched_channels_owner_User;

export interface ConnectionSearchChannelsQuery_me_searched_channels {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  visibility: string | null;
  owner: ConnectionSearchChannelsQuery_me_searched_channels_owner | null;
}

export interface ConnectionSearchChannelsQuery_me {
  __typename: "Me";
  id: number | null;
  searched_channels: (ConnectionSearchChannelsQuery_me_searched_channels | null)[] | null;
}

export interface ConnectionSearchChannelsQuery {
  /**
   * The current logged in user
   */
  me: ConnectionSearchChannelsQuery_me | null;
}

export interface ConnectionSearchChannelsQueryVariables {
  query: string;
}
