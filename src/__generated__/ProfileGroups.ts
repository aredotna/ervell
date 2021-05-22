/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileGroups
// ====================================================

export interface ProfileGroups_groups {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
  label: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ProfileGroups {
  __typename: "User";
  id: number | null;
  groups: (ProfileGroups_groups | null)[] | null;
}
