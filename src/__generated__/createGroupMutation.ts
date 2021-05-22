/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createGroupMutation
// ====================================================

export interface createGroupMutation_create_group_group {
  __typename: "Group";
  id: number | null;
  href: string | null;
}

export interface createGroupMutation_create_group {
  __typename: "CreateGroupPayload";
  group: createGroupMutation_create_group_group | null;
}

export interface createGroupMutation {
  create_group: createGroupMutation_create_group | null;
}

export interface createGroupMutationVariables {
  name: string;
  description?: string | null;
}
