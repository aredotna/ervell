/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CancelPremiumUserSelection
// ====================================================

export interface CancelPremiumUserSelection_user_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface CancelPremiumUserSelection_user {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: CancelPremiumUserSelection_user_can;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface CancelPremiumUserSelection_users_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface CancelPremiumUserSelection_users {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: CancelPremiumUserSelection_users_can;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface CancelPremiumUserSelection {
  __typename: "Group";
  id: number;
  name: string;
  user: CancelPremiumUserSelection_user;
  users: CancelPremiumUserSelection_users[] | null;
}
