/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserProfileFollowers
// ====================================================

export interface UserProfileFollowers_followers {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export interface UserProfileFollowers {
  __typename: "User";
  id: number;
  followers: UserProfileFollowers_followers[] | null;
}
