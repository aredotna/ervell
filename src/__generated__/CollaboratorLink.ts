/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollaboratorLink
// ====================================================

export interface CollaboratorLink_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
}

export interface CollaboratorLink_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface CollaboratorLink_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface CollaboratorLink_Group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface CollaboratorLink_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  description: string | null;
  user: CollaboratorLink_Group_user;
  users: CollaboratorLink_Group_users[];
  can: CollaboratorLink_Group_can;
  visibility: string;
  label: string;
}

export type CollaboratorLink = CollaboratorLink_User | CollaboratorLink_Group;
