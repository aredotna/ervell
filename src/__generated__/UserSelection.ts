/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserSelection
// ====================================================

export interface UserSelection_owner {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface UserSelection_users_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface UserSelection_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  is_canceled: boolean | null;
  is_upgradeable: boolean | null;
  is_approaching_either_connections_limit: boolean | null;
  is_exceeding_either_connections_limit: boolean | null;
  can: UserSelection_users_can | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface UserSelection_subscription_users {
  __typename: "User";
  id: number | null;
}

export interface UserSelection_subscription {
  __typename: "PremiumSubscription";
  id: string | null;
  users: (UserSelection_subscription_users | null)[] | null;
}

export interface UserSelection {
  __typename: "Group";
  name: string | null;
  owner: UserSelection_owner | null;
  users: (UserSelection_users | null)[] | null;
  subscription: UserSelection_subscription | null;
}
