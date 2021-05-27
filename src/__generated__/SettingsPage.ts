/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SettingsPage
// ====================================================

export interface SettingsPage_me_groups {
  __typename: "Group";
  id: number | null;
}

export interface SettingsPage_me {
  __typename: "Me";
  id: number | null;
  name: string | null;
  is_premium: boolean | null;
  is_supporter: boolean | null;
  is_investor: boolean | null;
  groups: (SettingsPage_me_groups | null)[] | null;
}

export interface SettingsPage {
  /**
   * The current logged in user
   */
  me: SettingsPage_me | null;
}
