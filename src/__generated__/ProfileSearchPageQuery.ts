/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileSearchPageQuery
// ====================================================

export interface ProfileSearchPageQuery_identity_identifiable_Group_can {
  __typename: "GroupCan";
  update: boolean | null;
  follow: boolean | null;
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ProfileSearchPageQuery_identity_identifiable_Group_user {
  __typename: "User";
  name: string;
  href: string | null;
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
  href: string | null;
}

export interface ProfileSearchPageQuery_identity_identifiable_Group {
  __typename: "Group";
  id: number;
  avatar: string | null;
  can: ProfileSearchPageQuery_identity_identifiable_Group_can | null;
  name: string;
  href: string | null;
  visibility: string;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean | null;
  about: string | null;
  user: ProfileSearchPageQuery_identity_identifiable_Group_user;
  counts: ProfileSearchPageQuery_identity_identifiable_Group_counts | null;
  users: ProfileSearchPageQuery_identity_identifiable_Group_users[] | null;
}

export interface ProfileSearchPageQuery_identity_identifiable_User_can {
  __typename: "UserCan";
  follow: boolean | null;
  manage: boolean | null;
  message: boolean | null;
}

export interface ProfileSearchPageQuery_identity_identifiable_User_counts {
  __typename: "UserCounts";
  followers: number;
  following: number;
  groups: number | null;
  following_channels: number;
  following_users: number;
  following_groups: number;
}

export interface ProfileSearchPageQuery_identity_identifiable_User {
  __typename: "User";
  name: string;
  href: string | null;
  badge: string | null;
  custom_badge: string | null;
  id: number;
  can: ProfileSearchPageQuery_identity_identifiable_User_can | null;
  about: string | null;
  counts: ProfileSearchPageQuery_identity_identifiable_User_counts | null;
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
