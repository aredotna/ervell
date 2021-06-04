/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ToolsPage
// ====================================================

export interface ToolsPage_me {
  __typename: "Me";
  id: number | null;
  post_address: string | null;
}

export interface ToolsPage {
  /**
   * The current logged in user
   */
  me: ToolsPage_me | null;
}
