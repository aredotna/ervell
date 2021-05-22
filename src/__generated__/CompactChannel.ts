/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CompactChannel
// ====================================================

export interface CompactChannel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface CompactChannel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type CompactChannel_owner = CompactChannel_owner_Group | CompactChannel_owner_User;

export interface CompactChannel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface CompactChannel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  visibility: string | null;
  title: string | null;
  owner: CompactChannel_owner | null;
  counts: CompactChannel_counts | null;
  label: string | null;
}
