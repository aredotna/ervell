/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupProfileFollowers
// ====================================================

export interface GroupProfileFollowers_followers {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface GroupProfileFollowers {
  __typename: "Group";
  id: number | null;
  followers: (GroupProfileFollowers_followers | null)[] | null;
}
