/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addGroupUsersMutation
// ====================================================

export interface addGroupUsersMutation_add_group_users_group_users {
  __typename: "User";
  id: number;
}

export interface addGroupUsersMutation_add_group_users_group {
  __typename: "Group";
  id: number;
  users: addGroupUsersMutation_add_group_users_group_users[] | null;
}

export interface addGroupUsersMutation_add_group_users {
  __typename: "AddGroupUsersMutationPayload";
  group: addGroupUsersMutation_add_group_users_group;
}

export interface addGroupUsersMutation {
  add_group_users: addGroupUsersMutation_add_group_users | null;
}

export interface addGroupUsersMutationVariables {
  user_ids: (string | null)[];
  id: string;
}
