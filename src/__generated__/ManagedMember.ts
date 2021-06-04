/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ManagedMember
// ====================================================

export interface ManagedMember_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface ManagedMember_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ManagedMember_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  visibility: string | null;
  user: ManagedMember_Group_user | null;
}

export type ManagedMember = ManagedMember_User | ManagedMember_Group;
