/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyGroups
// ====================================================

export interface MyGroups_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface MyGroups_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface MyGroups_customer {
  __typename: "Customer";
  id: number | null;
  default_credit_card: MyGroups_customer_default_credit_card | null;
  credit_cards: (MyGroups_customer_credit_cards | null)[] | null;
}

export interface MyGroups_groups_counts {
  __typename: "GroupCounts";
  users: number | null;
}

export interface MyGroups_groups_subscription_plan {
  __typename: "Plan";
  id: string | null;
  term: string | null;
}

export interface MyGroups_groups_subscription_users {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface MyGroups_groups_subscription {
  __typename: "PremiumSubscription";
  id: string | null;
  plan: MyGroups_groups_subscription_plan | null;
  users: (MyGroups_groups_subscription_users | null)[] | null;
}

export interface MyGroups_groups_user_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface MyGroups_groups_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  is_canceled: boolean | null;
  can: MyGroups_groups_user_can | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface MyGroups_groups_users_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface MyGroups_groups_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  is_canceled: boolean | null;
  can: MyGroups_groups_users_can | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  is_upgradeable: boolean | null;
  is_approaching_either_connections_limit: boolean | null;
  is_exceeding_either_connections_limit: boolean | null;
}

export interface MyGroups_groups_owner {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface MyGroups_groups {
  __typename: "Group";
  id: number | null;
  counts: MyGroups_groups_counts | null;
  /**
   * Is *every* user in the group Premium?
   */
  is_premium: boolean | null;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean | null;
  subscription: MyGroups_groups_subscription | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  user: MyGroups_groups_user | null;
  users: (MyGroups_groups_users | null)[] | null;
  owner: MyGroups_groups_owner | null;
}

export interface MyGroups {
  __typename: "Me";
  id: number | null;
  customer: MyGroups_customer | null;
  groups: (MyGroups_groups | null)[] | null;
}
