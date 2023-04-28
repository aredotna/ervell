/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EmbeddedChannelHeader
// ====================================================

export interface EmbeddedChannelHeader_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface EmbeddedChannelHeader_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
}

export type EmbeddedChannelHeader_owner = EmbeddedChannelHeader_owner_User | EmbeddedChannelHeader_owner_Group;

export interface EmbeddedChannelHeader {
  __typename: "Channel";
  id: number;
  title: string;
  truncatedTitle: string;
  href: string;
  visibility: string;
  owner: EmbeddedChannelHeader_owner;
}
