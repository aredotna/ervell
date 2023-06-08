/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FollowableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: FollowMutation
// ====================================================

export interface FollowMutation_follow_followable_User_counts {
  __typename: "UserCounts";
  followers: number;
}

export interface FollowMutation_follow_followable_User {
  __typename: "User";
  id: number;
  is_followed: boolean;
  counts: FollowMutation_follow_followable_User_counts;
}

export interface FollowMutation_follow_followable_Channel_counts {
  __typename: "ChannelCounts";
  followers: number;
}

export interface FollowMutation_follow_followable_Channel {
  __typename: "Channel";
  id: number;
  is_followed: boolean;
  counts: FollowMutation_follow_followable_Channel_counts;
}

export interface FollowMutation_follow_followable_Group_counts {
  __typename: "GroupCounts";
  followers: number;
}

export interface FollowMutation_follow_followable_Group {
  __typename: "Group";
  id: number;
  is_followed: boolean;
  counts: FollowMutation_follow_followable_Group_counts;
}

export type FollowMutation_follow_followable = FollowMutation_follow_followable_User | FollowMutation_follow_followable_Channel | FollowMutation_follow_followable_Group;

export interface FollowMutation_follow {
  __typename: "FollowMutationPayload";
  followable: FollowMutation_follow_followable;
}

export interface FollowMutation {
  follow: FollowMutation_follow | null;
}

export interface FollowMutationVariables {
  id: string;
  type: FollowableTypeEnum;
}
