/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileFollowers
// ====================================================

export interface ProfileFollowers_identity_identifiable_User_followers {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ProfileFollowers_identity_identifiable_User {
  __typename: "User";
  id: number | null;
  followers: (ProfileFollowers_identity_identifiable_User_followers | null)[] | null;
}

export interface ProfileFollowers_identity_identifiable_Group_followers {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ProfileFollowers_identity_identifiable_Group {
  __typename: "Group";
  id: number | null;
  followers: (ProfileFollowers_identity_identifiable_Group_followers | null)[] | null;
}

export type ProfileFollowers_identity_identifiable = ProfileFollowers_identity_identifiable_User | ProfileFollowers_identity_identifiable_Group;

export interface ProfileFollowers_identity {
  __typename: "Identity";
  identifiable: ProfileFollowers_identity_identifiable;
}

export interface ProfileFollowers {
  identity: ProfileFollowers_identity | null;
}

export interface ProfileFollowersVariables {
  id: string;
  page?: number | null;
  per?: number | null;
}
