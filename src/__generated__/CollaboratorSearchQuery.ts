/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchesCollaboratorsType } from "./globalTypes";

// ====================================================
// GraphQL query operation: CollaboratorSearchQuery
// ====================================================

export interface CollaboratorSearchQuery_results_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  hidden_email: string;
  initials: string;
  avatar: string | null;
}

export interface CollaboratorSearchQuery_results_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface CollaboratorSearchQuery_results_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: CollaboratorSearchQuery_results_collaborators_Group_user;
}

export type CollaboratorSearchQuery_results_collaborators = CollaboratorSearchQuery_results_collaborators_User | CollaboratorSearchQuery_results_collaborators_Group;

export interface CollaboratorSearchQuery_results {
  __typename: "Searches";
  collaborators: CollaboratorSearchQuery_results_collaborators[] | null;
}

export interface CollaboratorSearchQuery {
  results: CollaboratorSearchQuery_results | null;
}

export interface CollaboratorSearchQueryVariables {
  query: string;
  types?: SearchesCollaboratorsType[] | null;
}
