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
  id: number | null;
  href: string | null;
}

export interface confirmAccountMutation_confirm_account {
  __typename: "ConfirmAccountPayload";
  status: ConfirmedStatus | null;
  user: confirmAccountMutation_confirm_account_user | null;
}

export interface confirmAccountMutation {
  confirm_account: confirmAccountMutation_confirm_account | null;
}

export interface confirmAccountMutationVariables {
  token: string;
}
