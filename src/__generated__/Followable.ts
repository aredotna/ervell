/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Followable
// ====================================================

export interface Followable_User_counts {
  __typename: "UserCounts";
  followers: number | null;
}

export interface Followable_User {
  __typename: "User";
  id: number | null;
  is_followed: boolean | null;
  counts: Followable_User_counts | null;
}

export interface Followable_Channel_counts {
  __typename: "ChannelCounts";
  followers: number | null;
}

export interface Followable_Channel {
  __typename: "Channel";
  id: number | null;
  is_followed: boolean | null;
  counts: Followable_Channel_counts | null;
}

export interface Followable_Group_counts {
  __typename: "GroupCounts";
  followers: number | null;
}

export interface Followable_Group {
  __typename: "Group";
  id: number | null;
  is_followed: boolean | null;
  counts: Followable_Group_counts | null;
}

export type Followable = Followable_User | Followable_Channel | Followable_Group;
