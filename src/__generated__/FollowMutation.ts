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
  followers: number | null;
}

export interface FollowMutation_follow_followable_User {
  __typename: "User";
  id: number | null;
  is_followed: boolean | null;
  counts: FollowMutation_follow_followable_User_counts | null;
}

export interface FollowMutation_follow_followable_Channel_counts {
  __typename: "ChannelCounts";
  followers: number | null;
}

export interface FollowMutation_follow_followable_Channel {
  __typename: "Channel";
  id: number | null;
  is_followed: boolean | null;
  counts: FollowMutation_follow_followable_Channel_counts | null;
}

export interface FollowMutation_follow_followable_Group_counts {
  __typename: "GroupCounts";
  followers: number | null;
}

export interface FollowMutation_follow_followable_Group {
  __typename: "Group";
  id: number | null;
  is_followed: boolean | null;
  counts: FollowMutation_follow_followable_Group_counts | null;
}

export type FollowMutation_follow_followable = FollowMutation_follow_followable_User | FollowMutation_follow_followable_Channel | FollowMutation_follow_followable_Group;

export interface FollowMutation_follow {
  __typename: "FollowPayload";
  followable: FollowMutation_follow_followable | null;
}

export interface FollowMutation {
  follow: FollowMutation_follow | null;
}

export interface FollowMutationVariables {
  id: string;
  type: FollowableTypeEnum;
}
