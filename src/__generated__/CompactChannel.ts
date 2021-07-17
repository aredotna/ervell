/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CompactChannel
// ====================================================

export interface CompactChannel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface CompactChannel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type CompactChannel_owner = CompactChannel_owner_Group | CompactChannel_owner_User;

export interface CompactChannel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface CompactChannel {
  __typename: "Channel";
  id: number;
  href: string | null;
  visibility: string;
  title: string;
  owner: CompactChannel_owner;
  counts: CompactChannel_counts | null;
  label: string;
}
