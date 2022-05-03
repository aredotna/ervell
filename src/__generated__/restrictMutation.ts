/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: restrictMutation
// ====================================================

export interface restrictMutation_restrict_user {
  __typename: "User";
  id: number;
}

export interface restrictMutation_restrict {
  __typename: "RestrictMutationPayload";
  user: restrictMutation_restrict_user;
}

export interface restrictMutation {
  restrict: restrictMutation_restrict | null;
}

export interface restrictMutationVariables {
  id: string;
}
