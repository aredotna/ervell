/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollaboratorSearchResult
// ====================================================

export interface CollaboratorSearchResult_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  hidden_email: string;
  initials: string;
  avatar: string | null;
}

export interface CollaboratorSearchResult_Group_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface CollaboratorSearchResult_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: CollaboratorSearchResult_Group_user;
}

export type CollaboratorSearchResult = CollaboratorSearchResult_User | CollaboratorSearchResult_Group;
