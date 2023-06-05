/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfilePage
// ====================================================

export interface ProfilePage_identity_identifiable_Group_can {
  __typename: "GroupCan";
  update: boolean;
  follow: boolean;
  manage: boolean;
  manage_users: boolean;
}

export interface ProfilePage_identity_identifiable_Group_user {
  __typename: "User";
  name: string;
  href: string;
  id: number;
  label: string;
}

export interface ProfilePage_identity_identifiable_Group_counts {
  __typename: "GroupCounts";
  followers: number;
  channels: number;
}

export interface ProfilePage_identity_identifiable_Group_users {
  __typename: "User";
  id: number;
  label: string;
  href: string;
}

export interface ProfilePage_identity_identifiable_Group {
  __typename: "Group";
  id: number;
  avatar: string | null;
  can: ProfilePage_identity_identifiable_Group_can;
  name: string;
  label: string;
  href: string;
  visibility: string;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean;
  about: string | null;
  user: ProfilePage_identity_identifiable_Group_user;
  counts: ProfilePage_identity_identifiable_Group_counts;
  users: ProfilePage_identity_identifiable_Group_users[];
  is_current_user_a_member: boolean;
  is_current_user_the_owner: boolean;
  title: string;
  description: string | null;
  canonical: string;
}

export interface ProfilePage_identity_identifiable_User_can {
  __typename: "UserCan";
  follow: boolean;
  manage: boolean;
  message: boolean;
}

export interface ProfilePage_identity_identifiable_User_counts {
  __typename: "UserCounts";
  followers: number;
  following: number;
  groups: number;
  following_channels: number;
  following_users: number;
  following_groups: number;
  channels: number;
  blocks: number;
}

export interface ProfilePage_identity_identifiable_User {
  __typename: "User";
  name: string;
  label: string;
  href: string;
  badge: string | null;
  custom_badge: string | null;
  id: number;
  can: ProfilePage_identity_identifiable_User_can;
  about: string | null;
  counts: ProfilePage_identity_identifiable_User_counts;
  is_me: boolean;
  title: string;
  description: string | null;
  canonical: string;
  is_indexable: boolean;
}

export type ProfilePage_identity_identifiable = ProfilePage_identity_identifiable_Group | ProfilePage_identity_identifiable_User;

export interface ProfilePage_identity {
  __typename: "Identity";
  identifiable: ProfilePage_identity_identifiable;
}

export interface ProfilePage {
  identity: ProfilePage_identity | null;
}

export interface ProfilePageVariables {
  id: string;
}
