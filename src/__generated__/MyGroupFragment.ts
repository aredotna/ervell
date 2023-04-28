/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyGroupFragment
// ====================================================

export interface MyGroupFragment_subscription_plan {
  __typename: "Plan";
  id: string;
  term: string | null;
}

export interface MyGroupFragment_subscription_users {
  __typename: "User";
  id: number;
  name: string;
}

export interface MyGroupFragment_subscription {
  __typename: "PremiumSubscription";
  id: string;
  plan: MyGroupFragment_subscription_plan | null;
  users: MyGroupFragment_subscription_users[] | null;
}

export interface MyGroupFragment_user_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface MyGroupFragment_user {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: MyGroupFragment_user_can;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface MyGroupFragment_users_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface MyGroupFragment_users {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: MyGroupFragment_users_can;
  href: string;
  initials: string;
  avatar: string | null;
  is_upgradeable: boolean;
  is_approaching_either_connections_limit: boolean;
  is_exceeding_either_connections_limit: boolean;
}

export interface MyGroupFragment_owner {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface MyGroupFragment {
  __typename: "Group";
  id: number;
  /**
   * Is *every* user in the group Premium?
   */
  is_premium: boolean | null;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean | null;
  subscription: MyGroupFragment_subscription | null;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  user: MyGroupFragment_user;
  users: MyGroupFragment_users[] | null;
  owner: MyGroupFragment_owner;
}
