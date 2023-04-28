/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SettingsPage
// ====================================================

export interface SettingsPage_me_groups {
  __typename: "Group";
  id: number;
}

export interface SettingsPage_me {
  __typename: "Me";
  id: number;
  name: string;
  is_premium: boolean;
  is_supporter: boolean;
  is_investor: boolean;
  has_had_recent_birthday: boolean | null;
  groups: SettingsPage_me_groups[];
}

export interface SettingsPage {
  /**
   * The current logged in user
   */
  me: SettingsPage_me | null;
}
