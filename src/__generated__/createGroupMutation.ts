/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createGroupMutation
// ====================================================

export interface createGroupMutation_create_group_group {
  __typename: "Group";
  id: number;
  href: string;
}

export interface createGroupMutation_create_group {
  __typename: "CreateGroupMutationPayload";
  group: createGroupMutation_create_group_group;
}

export interface createGroupMutation {
  create_group: createGroupMutation_create_group | null;
}

export interface createGroupMutationVariables {
  name: string;
  description?: string | null;
}
