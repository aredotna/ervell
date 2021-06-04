/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserDropdown
// ====================================================

export interface UserDropdown_me_groups {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  visibility: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface UserDropdown_me {
  __typename: "Me";
  id: number | null;
  name: string | null;
  href: string | null;
  is_premium: boolean | null;
  is_confirmed: boolean | null;
  created_at: string | null;
  is_my_groups_dropdown_hidden: boolean | null;
  groups: (UserDropdown_me_groups | null)[] | null;
}

export interface UserDropdown {
  /**
   * The current logged in user
   */
  me: UserDropdown_me | null;
}
