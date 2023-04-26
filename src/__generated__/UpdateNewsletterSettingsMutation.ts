/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateNewsletterSettingsMutation
// ====================================================

export interface UpdateNewsletterSettingsMutation_update_account_me_settings {
  __typename: "MeSettings";
  receive_editorial_emails: boolean;
}

export interface UpdateNewsletterSettingsMutation_update_account_me {
  __typename: "Me";
  id: number;
  settings: UpdateNewsletterSettingsMutation_update_account_me_settings | null;
}

export interface UpdateNewsletterSettingsMutation_update_account {
  __typename: "UpdateAccountMutationPayload";
  me: UpdateNewsletterSettingsMutation_update_account_me;
}

export interface UpdateNewsletterSettingsMutation {
  update_account: UpdateNewsletterSettingsMutation_update_account | null;
}

export interface UpdateNewsletterSettingsMutationVariables {
  receive_editorial_emails?: boolean | null;
}
