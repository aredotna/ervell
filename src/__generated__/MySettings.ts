/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MySettings
// ====================================================

export interface MySettings_me_can {
  __typename: "UserCan";
  edit_profile_description: boolean;
}

export interface MySettings_me_settings {
  __typename: "MeSettings";
  exclude_from_indexes: boolean;
  show_nsfw: boolean;
  receive_email: string;
  receive_tips_emails: boolean;
  receive_newsletter: boolean;
  receive_group_premium_emails: boolean;
  receive_sunday_review_emails: boolean;
  receive_editorial_emails: boolean;
  hide_notification_count: boolean;
  dark_mode: boolean;
}

export interface MySettings_me {
  __typename: "Me";
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  slug: string | null;
  unconfirmed_email: string | null;
  bio: string | null;
  is_premium: boolean;
  home_path: string | null;
  can: MySettings_me_can;
  settings: MySettings_me_settings | null;
}

export interface MySettings {
  /**
   * The current logged in user
   */
  me: MySettings_me | null;
}
