/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Channel
// ====================================================

export interface Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type Channel_owner = Channel_owner_Group | Channel_owner_User;

export interface Channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  truncatedTitle: string | null;
  visibility: string | null;
  updated_at: string | null;
  counts: Channel_counts | null;
  owner: Channel_owner | null;
}
