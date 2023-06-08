/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileSearchPageQuery
// ====================================================

export interface ProfileSearchPageQuery_identity_identifiable_Group_can {
  __typename: "GroupCan";
  update: boolean;
  follow: boolean;
  manage: boolean;
  manage_users: boolean;
}

export interface ProfileSearchPageQuery_identity_identifiable_Group_user {
  __typename: "User";
  name: string;
  href: string;
  id: number;
  label: string;
}

export interface ProfileSearchPageQuery_identity_identifiable_Group_counts {
  __typename: "GroupCounts";
  followers: number;
}

export interface ProfileSearchPageQuery_identity_identifiable_Group_users {
  __typename: "User";
  id: number;
  label: string;
  href: string;
}

export interface ProfileSearchPageQuery_identity_identifiable_Group {
  __typename: "Group";
  id: number;
  avatar: string | null;
  can: ProfileSearchPageQuery_identity_identifiable_Group_can;
  name: string;
  label: string;
  href: string;
  visibility: string;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean;
  about: string | null;
  user: ProfileSearchPageQuery_identity_identifiable_Group_user;
  counts: ProfileSearchPageQuery_identity_identifiable_Group_counts;
  users: ProfileSearchPageQuery_identity_identifiable_Group_users[];
  title: string;
  description: string | null;
  canonical: string;
}

export interface ProfileSearchPageQuery_identity_identifiable_User_can {
  __typename: "UserCan";
  follow: boolean;
  manage: boolean;
  message: boolean;
}

export interface ProfileSearchPageQuery_identity_identifiable_User_counts {
  __typename: "UserCounts";
  followers: number;
  following: number;
  groups: number;
  following_channels: number;
  following_users: number;
  following_groups: number;
}

export interface ProfileSearchPageQuery_identity_identifiable_User {
  __typename: "User";
  name: string;
  label: string;
  href: string;
  badge: string | null;
  custom_badge: string | null;
  id: number;
  can: ProfileSearchPageQuery_identity_identifiable_User_can;
  about: string | null;
  counts: ProfileSearchPageQuery_identity_identifiable_User_counts;
  title: string;
  description: string | null;
  canonical: string;
  is_indexable: boolean;
}

export type ProfileSearchPageQuery_identity_identifiable = ProfileSearchPageQuery_identity_identifiable_Group | ProfileSearchPageQuery_identity_identifiable_User;

export interface ProfileSearchPageQuery_identity {
  __typename: "Identity";
  identifiable: ProfileSearchPageQuery_identity_identifiable;
}

export interface ProfileSearchPageQuery {
  identity: ProfileSearchPageQuery_identity | null;
}

export interface ProfileSearchPageQueryVariables {
  id: string;
}
