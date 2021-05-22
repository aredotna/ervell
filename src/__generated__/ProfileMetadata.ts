/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileMetadata
// ====================================================

export interface ProfileMetadata_Group_can {
  __typename: "GroupCan";
  update: boolean | null;
  follow: boolean | null;
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ProfileMetadata_Group_user {
  __typename: "User";
  name: string | null;
  href: string | null;
  id: number | null;
  label: string | null;
}

export interface ProfileMetadata_Group_counts {
  __typename: "GroupCounts";
  followers: number | null;
}

export interface ProfileMetadata_Group_users {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface ProfileMetadata_Group {
  __typename: "Group";
  id: number | null;
  avatar: string | null;
  can: ProfileMetadata_Group_can | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean | null;
  about: string | null;
  user: ProfileMetadata_Group_user | null;
  counts: ProfileMetadata_Group_counts | null;
  users: (ProfileMetadata_Group_users | null)[] | null;
}

export interface ProfileMetadata_User_can {
  __typename: "UserCan";
  follow: boolean | null;
  manage: boolean | null;
  message: boolean | null;
}

export interface ProfileMetadata_User_counts {
  __typename: "UserCounts";
  followers: number | null;
  following: number | null;
  groups: number | null;
  following_channels: number | null;
  following_users: number | null;
  following_groups: number | null;
}

export interface ProfileMetadata_User {
  __typename: "User";
  name: string | null;
  href: string | null;
  badge: string | null;
  custom_badge: string | null;
  id: number | null;
  can: ProfileMetadata_User_can | null;
  about: string | null;
  counts: ProfileMetadata_User_counts | null;
}

export type ProfileMetadata = ProfileMetadata_Group | ProfileMetadata_User;
