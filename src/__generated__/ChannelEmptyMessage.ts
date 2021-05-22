/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelEmptyMessage
// ====================================================

export interface ChannelEmptyMessage_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ChannelEmptyMessage_can {
  __typename: "ChannelCan";
  add_to: boolean | null;
  add_to_as_premium: boolean | null;
}

export interface ChannelEmptyMessage_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ChannelEmptyMessage_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
}

export type ChannelEmptyMessage_owner = ChannelEmptyMessage_owner_User | ChannelEmptyMessage_owner_Group;

export interface ChannelEmptyMessage {
  __typename: "Channel";
  id: number | null;
  counts: ChannelEmptyMessage_counts | null;
  can: ChannelEmptyMessage_can | null;
  owner: ChannelEmptyMessage_owner | null;
}
