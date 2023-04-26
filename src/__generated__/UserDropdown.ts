/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDropdown
// ====================================================

export interface UserDropdown_me_groups {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  visibility: string;
  initials: string;
  avatar: string | null;
}

export interface UserDropdown_me {
  __typename: "Me";
  id: number;
  name: string;
  href: string;
  is_premium: boolean;
  is_confirmed: boolean;
  created_at: string;
  is_my_groups_dropdown_hidden: boolean;
  groups: UserDropdown_me_groups[];
}

export interface UserDropdown {
  /**
   * The current logged in user
   */
  me: UserDropdown_me | null;
}
