/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FollowableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: FollowQuery
// ====================================================

export interface FollowQuery_followable_User_counts {
  __typename: "UserCounts";
  followers: number;
}

export interface FollowQuery_followable_User {
  __typename: "User";
  id: number;
  is_followed: boolean;
  counts: FollowQuery_followable_User_counts;
}

export interface FollowQuery_followable_Channel_counts {
  __typename: "ChannelCounts";
  followers: number;
}

export interface FollowQuery_followable_Channel {
  __typename: "Channel";
  id: number;
  is_followed: boolean;
  counts: FollowQuery_followable_Channel_counts;
}

export interface FollowQuery_followable_Group_counts {
  __typename: "GroupCounts";
  followers: number;
}

export interface FollowQuery_followable_Group {
  __typename: "Group";
  id: number;
  is_followed: boolean;
  counts: FollowQuery_followable_Group_counts;
}

export type FollowQuery_followable = FollowQuery_followable_User | FollowQuery_followable_Channel | FollowQuery_followable_Group;

export interface FollowQuery {
  /**
   * Interface for getting the follow status of users or channels
   */
  followable: FollowQuery_followable | null;
}

export interface FollowQueryVariables {
  id: string;
  type?: FollowableTypeEnum | null;
}
