/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewsletterSettings
// ====================================================

export interface NewsletterSettings_me_settings {
  __typename: "MeSettings";
  receive_editorial_emails: boolean;
}

export interface NewsletterSettings_me {
  __typename: "Me";
  id: number;
  settings: NewsletterSettings_me_settings | null;
}

export interface NewsletterSettings {
  /**
   * The current logged in user
   */
  me: NewsletterSettings_me | null;
}
