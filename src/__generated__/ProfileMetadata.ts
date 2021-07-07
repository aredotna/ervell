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
  name: string;
  href: string | null;
  id: number;
  label: string;
}

export interface ProfileMetadata_Group_counts {
  __typename: "GroupCounts";
  followers: number;
}

export interface ProfileMetadata_Group_users {
  __typename: "User";
  id: number;
  label: string;
  href: string | null;
}

export interface ProfileMetadata_Group {
  __typename: "Group";
  id: number;
  avatar: string | null;
  can: ProfileMetadata_Group_can | null;
  name: string;
  href: string | null;
  visibility: string;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean | null;
  about: string | null;
  user: ProfileMetadata_Group_user;
  counts: ProfileMetadata_Group_counts | null;
  users: ProfileMetadata_Group_users[] | null;
}

export interface ProfileMetadata_User_can {
  __typename: "UserCan";
  follow: boolean | null;
  manage: boolean | null;
  message: boolean | null;
}

export interface ProfileMetadata_User_counts {
  __typename: "UserCounts";
  followers: number;
  following: number;
  groups: number | null;
  following_channels: number;
  following_users: number;
  following_groups: number;
}

export interface ProfileMetadata_User {
  __typename: "User";
  name: string;
  href: string | null;
  badge: string | null;
  custom_badge: string | null;
  id: number;
  can: ProfileMetadata_User_can | null;
  about: string | null;
  counts: ProfileMetadata_User_counts | null;
}

export type ProfileMetadata = ProfileMetadata_Group | ProfileMetadata_User;
