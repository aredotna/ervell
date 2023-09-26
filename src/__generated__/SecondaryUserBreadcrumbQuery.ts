/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SecondaryUserBreadcrumbQuery
// ====================================================

export interface SecondaryUserBreadcrumbQuery_user {
  __typename: "User";
  id: number;
  name: string;
  slug: string;
  href: string;
}

export interface SecondaryUserBreadcrumbQuery {
  /**
   * A single user
   */
  user: SecondaryUserBreadcrumbQuery_user | null;
}

export interface SecondaryUserBreadcrumbQueryVariables {
  user_id: string;
}
