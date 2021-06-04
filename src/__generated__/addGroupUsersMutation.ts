/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addGroupUsersMutation
// ====================================================

export interface addGroupUsersMutation_add_group_users_group_users {
  __typename: "User";
  id: number | null;
}

export interface addGroupUsersMutation_add_group_users_group {
  __typename: "Group";
  id: number | null;
  users: (addGroupUsersMutation_add_group_users_group_users | null)[] | null;
}

export interface addGroupUsersMutation_add_group_users {
  __typename: "AddGroupUsersPayload";
  group: addGroupUsersMutation_add_group_users_group | null;
}

export interface addGroupUsersMutation {
  add_group_users: addGroupUsersMutation_add_group_users | null;
}

export interface addGroupUsersMutationVariables {
  user_ids: (string | null)[];
  id: string;
}
