/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: KonnectableChannel
// ====================================================

export interface KonnectableChannel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface KonnectableChannel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface KonnectableChannel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type KonnectableChannel_owner = KonnectableChannel_owner_Group | KonnectableChannel_owner_User;

export interface KonnectableChannel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  truncatedTitle: string | null;
  visibility: string | null;
  updated_at: string | null;
  counts: KonnectableChannel_counts | null;
  owner: KonnectableChannel_owner | null;
  label: string | null;
}
