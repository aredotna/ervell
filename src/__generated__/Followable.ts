/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Followable
// ====================================================

export interface Followable_User_counts {
  __typename: "UserCounts";
  followers: number;
}

export interface Followable_User {
  __typename: "User";
  id: number;
  is_followed: boolean;
  counts: Followable_User_counts;
}

export interface Followable_Channel_counts {
  __typename: "ChannelCounts";
  followers: number;
}

export interface Followable_Channel {
  __typename: "Channel";
  id: number;
  is_followed: boolean;
  counts: Followable_Channel_counts;
}

export interface Followable_Group_counts {
  __typename: "GroupCounts";
  followers: number;
}

export interface Followable_Group {
  __typename: "Group";
  id: number;
  is_followed: boolean;
  counts: Followable_Group_counts;
}

export type Followable = Followable_User | Followable_Channel | Followable_Group;
