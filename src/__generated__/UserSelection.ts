/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserSelection
// ====================================================

export interface UserSelection_owner {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface UserSelection_users_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface UserSelection_users {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  is_upgradeable: boolean;
  is_approaching_either_connections_limit: boolean;
  is_exceeding_either_connections_limit: boolean;
  can: UserSelection_users_can;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface UserSelection_subscription_users {
  __typename: "User";
  id: number;
}

export interface UserSelection_subscription {
  __typename: "PremiumSubscription";
  id: string;
  users: UserSelection_subscription_users[] | null;
}

export interface UserSelection {
  __typename: "Group";
  name: string;
  owner: UserSelection_owner;
  users: UserSelection_users[];
  subscription: UserSelection_subscription | null;
}
