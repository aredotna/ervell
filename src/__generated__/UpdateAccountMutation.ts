/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateAccountMutation
// ====================================================

export interface UpdateAccountMutation_update_account_me_settings {
  __typename: "MeSettings";
  receive_email: string | null;
  receive_tips_emails: boolean | null;
  receive_group_premium_emails: boolean | null;
  receive_sunday_review_emails: boolean | null;
  exclude_from_indexes: boolean | null;
  receive_newsletter: boolean | null;
  show_nsfw: boolean | null;
}

export interface UpdateAccountMutation_update_account_me {
  __typename: "Me";
  id: number | null;
  email: string | null;
  name: string | null;
  first_name: string | null;
  bio: string | null;
  home_path: string | null;
  settings: UpdateAccountMutation_update_account_me_settings | null;
}

export interface UpdateAccountMutation_update_account {
  __typename: "UpdateAccountPayload";
  me: UpdateAccountMutation_update_account_me | null;
}

export interface UpdateAccountMutation {
  update_account: UpdateAccountMutation_update_account | null;
}

export interface UpdateAccountMutationVariables {
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  show_nsfw?: boolean | null;
  home_path?: string | null;
  receive_email?: string | null;
  receive_newsletter?: boolean | null;
  receive_tips_emails?: boolean | null;
  receive_group_premium_emails?: boolean | null;
  receive_sunday_review_emails?: boolean | null;
  show_tour?: boolean | null;
  exclude_from_indexes?: boolean | null;
  bio?: string | null;
  custom_badge_url?: string | null;
  password?: string | null;
  password_confirmation?: string | null;
  hide_notification_count?: boolean | null;
}
