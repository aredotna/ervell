/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AssignAuthorQuery
// ====================================================

export interface AssignAuthorQuery_me_groups {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface AssignAuthorQuery_me {
  __typename: "Me";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  groups: (AssignAuthorQuery_me_groups | null)[] | null;
}

export interface AssignAuthorQuery {
  /**
   * The current logged in user
   */
  me: AssignAuthorQuery_me | null;
}
