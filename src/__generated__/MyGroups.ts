/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyGroups
// ====================================================

export interface MyGroups_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
}

export interface MyGroups_customer_payment_methods_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface MyGroups_customer_payment_methods {
  __typename: "PaymentMethod";
  id: string | null;
  card: MyGroups_customer_payment_methods_card | null;
}

export interface MyGroups_customer {
  __typename: "Customer";
  id: number;
  default_payment_method: MyGroups_customer_default_payment_method | null;
  payment_methods: MyGroups_customer_payment_methods[] | null;
}

export interface MyGroups_groups_counts {
  __typename: "GroupCounts";
  users: number;
}

export interface MyGroups_groups_subscription_plan {
  __typename: "Plan";
  id: string;
  term: string | null;
}

export interface MyGroups_groups_subscription_users {
  __typename: "User";
  id: number;
  name: string;
}

export interface MyGroups_groups_subscription {
  __typename: "PremiumSubscription";
  id: string;
  plan: MyGroups_groups_subscription_plan | null;
  users: MyGroups_groups_subscription_users[] | null;
}

export interface MyGroups_groups_user_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface MyGroups_groups_user {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: MyGroups_groups_user_can;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface MyGroups_groups_users_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface MyGroups_groups_users {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: MyGroups_groups_users_can;
  href: string;
  initials: string;
  avatar: string | null;
  is_upgradeable: boolean;
  is_approaching_either_connections_limit: boolean;
  is_exceeding_either_connections_limit: boolean;
}

export interface MyGroups_groups_owner {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface MyGroups_groups {
  __typename: "Group";
  id: number;
  counts: MyGroups_groups_counts;
  /**
   * Is *every* user in the group Premium?
   */
  is_premium: boolean;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean;
  subscription: MyGroups_groups_subscription | null;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  user: MyGroups_groups_user;
  users: MyGroups_groups_users[];
  owner: MyGroups_groups_owner;
}

export interface MyGroups {
  __typename: "Me";
  id: number;
  customer: MyGroups_customer | null;
  groups: MyGroups_groups[];
}
