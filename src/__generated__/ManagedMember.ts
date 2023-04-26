/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ManagedMember
// ====================================================

export interface ManagedMember_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface ManagedMember_Group_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ManagedMember_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: ManagedMember_Group_user;
}

export type ManagedMember = ManagedMember_User | ManagedMember_Group;
