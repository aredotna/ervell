/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteGroupMutation
// ====================================================

export interface deleteGroupMutation_delete_group {
  __typename: "DeleteGroupPayload";
  status: string | null;
}

export interface deleteGroupMutation {
  delete_group: deleteGroupMutation_delete_group | null;
}

export interface deleteGroupMutationVariables {
  id: string;
}
