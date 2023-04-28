/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileMetadata
// ====================================================

export interface ProfileMetadata_Group_can {
  __typename: "GroupCan";
  update: boolean;
  follow: boolean;
  manage: boolean;
  manage_users: boolean;
}

export interface ProfileMetadata_Group_user {
  __typename: "User";
  name: string;
  href: string;
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
  href: string;
}

export interface ProfileMetadata_Group {
  __typename: "Group";
  id: number;
  avatar: string | null;
  can: ProfileMetadata_Group_can;
  name: string;
  label: string;
  href: string;
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
  follow: boolean;
  manage: boolean;
  message: boolean;
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
  label: string;
  href: string;
  badge: string | null;
  custom_badge: string | null;
  id: number;
  can: ProfileMetadata_User_can;
  about: string | null;
  counts: ProfileMetadata_User_counts | null;
}

export type ProfileMetadata = ProfileMetadata_Group | ProfileMetadata_User;
