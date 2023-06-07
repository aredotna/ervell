/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileMetadataFollowingType
// ====================================================

export interface ProfileMetadataFollowingType_Group {
  __typename: "Group";
}

export interface ProfileMetadataFollowingType_User_counts {
  __typename: "UserCounts";
  following_channels: number;
  following_users: number;
  following_groups: number;
}

export interface ProfileMetadataFollowingType_User {
  __typename: "User";
  counts: ProfileMetadataFollowingType_User_counts;
}

export type ProfileMetadataFollowingType = ProfileMetadataFollowingType_Group | ProfileMetadataFollowingType_User;
