/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfilePageIdentifiable
// ====================================================

export interface ProfilePageIdentifiable_Group_can {
  __typename: "GroupCan";
  update: boolean;
  follow: boolean;
  manage: boolean;
  manage_users: boolean;
}

export interface ProfilePageIdentifiable_Group_user {
  __typename: "User";
  name: string;
  href: string;
  id: number;
  label: string;
}

export interface ProfilePageIdentifiable_Group_counts {
  __typename: "GroupCounts";
  followers: number;
  channels: number | null;
}

export interface ProfilePageIdentifiable_Group_users {
  __typename: "User";
  id: number;
  label: string;
  href: string;
}

export interface ProfilePageIdentifiable_Group {
  __typename: "Group";
  id: number;
  avatar: string | null;
  can: ProfilePageIdentifiable_Group_can;
  name: string;
  label: string;
  href: string;
  visibility: string;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean | null;
  about: string | null;
  user: ProfilePageIdentifiable_Group_user;
  counts: ProfilePageIdentifiable_Group_counts | null;
  users: ProfilePageIdentifiable_Group_users[] | null;
  is_current_user_a_member: boolean;
  is_current_user_the_owner: boolean;
  title: string;
  description: string | null;
  canonical: string;
}

export interface ProfilePageIdentifiable_User_can {
  __typename: "UserCan";
  follow: boolean;
  manage: boolean;
  message: boolean;
}

export interface ProfilePageIdentifiable_User_counts {
  __typename: "UserCounts";
  followers: number;
  following: number;
  groups: number | null;
  following_channels: number;
  following_users: number;
  following_groups: number;
  channels: number | null;
  blocks: number | null;
}

export interface ProfilePageIdentifiable_User {
  __typename: "User";
  name: string;
  label: string;
  href: string;
  badge: string | null;
  custom_badge: string | null;
  id: number;
  can: ProfilePageIdentifiable_User_can;
  about: string | null;
  counts: ProfilePageIdentifiable_User_counts | null;
  is_me: boolean;
  title: string;
  description: string | null;
  canonical: string;
  is_indexable: boolean;
}

export type ProfilePageIdentifiable = ProfilePageIdentifiable_Group | ProfilePageIdentifiable_User;
