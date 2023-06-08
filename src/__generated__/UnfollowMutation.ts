/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FollowableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UnfollowMutation
// ====================================================

export interface UnfollowMutation_unfollow_followable_User_counts {
  __typename: "UserCounts";
  followers: number;
}

export interface UnfollowMutation_unfollow_followable_User {
  __typename: "User";
  id: number;
  is_followed: boolean;
  counts: UnfollowMutation_unfollow_followable_User_counts;
}

export interface UnfollowMutation_unfollow_followable_Channel_counts {
  __typename: "ChannelCounts";
  followers: number;
}

export interface UnfollowMutation_unfollow_followable_Channel {
  __typename: "Channel";
  id: number;
  is_followed: boolean;
  counts: UnfollowMutation_unfollow_followable_Channel_counts;
}

export interface UnfollowMutation_unfollow_followable_Group_counts {
  __typename: "GroupCounts";
  followers: number;
}

export interface UnfollowMutation_unfollow_followable_Group {
  __typename: "Group";
  id: number;
  is_followed: boolean;
  counts: UnfollowMutation_unfollow_followable_Group_counts;
}

export type UnfollowMutation_unfollow_followable = UnfollowMutation_unfollow_followable_User | UnfollowMutation_unfollow_followable_Channel | UnfollowMutation_unfollow_followable_Group;

export interface UnfollowMutation_unfollow {
  __typename: "UnfollowMutationPayload";
  followable: UnfollowMutation_unfollow_followable;
}

export interface UnfollowMutation {
  unfollow: UnfollowMutation_unfollow | null;
}

export interface UnfollowMutationVariables {
  id: string;
  type: FollowableTypeEnum;
}
