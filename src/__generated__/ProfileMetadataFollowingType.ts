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
  following_channels: number | null;
  following_users: number | null;
  following_groups: number | null;
}

export interface ProfileMetadataFollowingType_User {
  __typename: "User";
  counts: ProfileMetadataFollowingType_User_counts | null;
}

export type ProfileMetadataFollowingType = ProfileMetadataFollowingType_Group | ProfileMetadataFollowingType_User;
