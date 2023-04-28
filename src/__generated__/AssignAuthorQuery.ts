/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AssignAuthorQuery
// ====================================================

export interface AssignAuthorQuery_me_groups {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface AssignAuthorQuery_me {
  __typename: "Me";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  groups: AssignAuthorQuery_me_groups[];
}

export interface AssignAuthorQuery {
  /**
   * The current logged in user
   */
  me: AssignAuthorQuery_me | null;
}
