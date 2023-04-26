/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: IdentifiableCell
// ====================================================

export interface IdentifiableCell_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export interface IdentifiableCell_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  visibility: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export type IdentifiableCell = IdentifiableCell_User | IdentifiableCell_Group;
