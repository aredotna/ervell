/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EmbeddedChannelHeader
// ====================================================

export interface EmbeddedChannelHeader_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface EmbeddedChannelHeader_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
}

export type EmbeddedChannelHeader_owner = EmbeddedChannelHeader_owner_User | EmbeddedChannelHeader_owner_Group;

export interface EmbeddedChannelHeader {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  owner: EmbeddedChannelHeader_owner | null;
}
