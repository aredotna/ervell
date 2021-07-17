/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateCustomBadge
// ====================================================

export interface updateCustomBadge_update_account_me {
  __typename: "Me";
  id: number;
  custom_badge: string | null;
}

export interface updateCustomBadge_update_account {
  __typename: "UpdateAccountMutationPayload";
  me: updateCustomBadge_update_account_me;
}

export interface updateCustomBadge {
  update_account: updateCustomBadge_update_account | null;
}

export interface updateCustomBadgeVariables {
  custom_badge_url: string;
}
