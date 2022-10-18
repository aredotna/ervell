/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CreateGroupModal
// ====================================================

export interface CreateGroupModal_me {
  __typename: "Me";
  id: number;
  has_seen_new_group_explanation: boolean | null;
}

export interface CreateGroupModal {
  /**
   * The current logged in user
   */
  me: CreateGroupModal_me | null;
}
