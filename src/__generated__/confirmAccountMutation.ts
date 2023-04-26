/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ConfirmedStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: confirmAccountMutation
// ====================================================

export interface confirmAccountMutation_confirm_account_user {
  __typename: "Me";
  id: number;
  href: string;
}

export interface confirmAccountMutation_confirm_account {
  __typename: "ConfirmAccountMutationPayload";
  status: ConfirmedStatus;
  user: confirmAccountMutation_confirm_account_user;
}

export interface confirmAccountMutation {
  confirm_account: confirmAccountMutation_confirm_account | null;
}

export interface confirmAccountMutationVariables {
  token: string;
}
