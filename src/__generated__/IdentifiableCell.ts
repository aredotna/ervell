/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: IdentifiableCell
// ====================================================

export interface IdentifiableCell_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface IdentifiableCell_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
  initials: string | null;
  avatar: string | null;
}

export type IdentifiableCell = IdentifiableCell_User | IdentifiableCell_Group;
