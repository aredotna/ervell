/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollaboratorSearchResults
// ====================================================

export interface CollaboratorSearchResults_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  hidden_email: string;
  initials: string;
  avatar: string | null;
}

export interface CollaboratorSearchResults_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface CollaboratorSearchResults_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: CollaboratorSearchResults_collaborators_Group_user;
}

export type CollaboratorSearchResults_collaborators = CollaboratorSearchResults_collaborators_User | CollaboratorSearchResults_collaborators_Group;

export interface CollaboratorSearchResults {
  __typename: "Searches";
  collaborators: CollaboratorSearchResults_collaborators[] | null;
}
