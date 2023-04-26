/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupProfileFollowers
// ====================================================

export interface GroupProfileFollowers_followers {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export interface GroupProfileFollowers {
  __typename: "Group";
  id: number;
  followers: GroupProfileFollowers_followers[] | null;
}
