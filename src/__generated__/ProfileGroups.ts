/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileGroups
// ====================================================

export interface ProfileGroups_groups {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  visibility: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export interface ProfileGroups {
  __typename: "User";
  id: number;
  groups: ProfileGroups_groups[] | null;
}
