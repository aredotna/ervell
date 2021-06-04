/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserProfileFollowers
// ====================================================

export interface UserProfileFollowers_followers {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface UserProfileFollowers {
  __typename: "User";
  id: number | null;
  followers: (UserProfileFollowers_followers | null)[] | null;
}
