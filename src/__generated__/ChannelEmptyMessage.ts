/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelEmptyMessage
// ====================================================

export interface ChannelEmptyMessage_counts {
  __typename: "ChannelCounts";
  contents: number;
}

export interface ChannelEmptyMessage_can {
  __typename: "ChannelCan";
  add_to: boolean;
  add_to_as_premium: boolean;
}

export interface ChannelEmptyMessage_owner_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ChannelEmptyMessage_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
}

export type ChannelEmptyMessage_owner = ChannelEmptyMessage_owner_User | ChannelEmptyMessage_owner_Group;

export interface ChannelEmptyMessage {
  __typename: "Channel";
  id: number;
  counts: ChannelEmptyMessage_counts;
  can: ChannelEmptyMessage_can;
  owner: ChannelEmptyMessage_owner;
}
