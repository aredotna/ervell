/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CancelPremiumUserSelection
// ====================================================

export interface CancelPremiumUserSelection_user_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface CancelPremiumUserSelection_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  is_canceled: boolean | null;
  can: CancelPremiumUserSelection_user_can | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface CancelPremiumUserSelection_users_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface CancelPremiumUserSelection_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  is_canceled: boolean | null;
  can: CancelPremiumUserSelection_users_can | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface CancelPremiumUserSelection {
  __typename: "Group";
  id: number | null;
  name: string | null;
  user: CancelPremiumUserSelection_user | null;
  users: (CancelPremiumUserSelection_users | null)[] | null;
}
