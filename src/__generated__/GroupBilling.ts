/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GroupBilling
// ====================================================

export interface GroupBilling_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface GroupBilling_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface GroupBilling_customer {
  __typename: "Customer";
  id: number;
  default_credit_card: GroupBilling_customer_default_credit_card | null;
  credit_cards: GroupBilling_customer_credit_cards[] | null;
}

export interface GroupBilling_groups_counts {
  __typename: "GroupCounts";
  users: number | null;
}

export interface GroupBilling_groups_subscription_plan {
  __typename: "Plan";
  id: string;
  term: string | null;
}

export interface GroupBilling_groups_subscription_users {
  __typename: "User";
  id: number;
  name: string;
}

export interface GroupBilling_groups_subscription {
  __typename: "PremiumSubscription";
  id: string;
  plan: GroupBilling_groups_subscription_plan | null;
  users: GroupBilling_groups_subscription_users[] | null;
}

export interface GroupBilling_groups_user_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface GroupBilling_groups_user {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: GroupBilling_groups_user_can | null;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface GroupBilling_groups_users_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface GroupBilling_groups_users {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: GroupBilling_groups_users_can | null;
  href: string | null;
  initials: string;
  avatar: string | null;
  is_upgradeable: boolean;
  is_approaching_either_connections_limit: boolean;
  is_exceeding_either_connections_limit: boolean;
}

export interface GroupBilling_groups_owner {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  href: string | null;
  initials: string;
  avatar: string | null;
}

export interface GroupBilling_groups {
  __typename: "Group";
  id: number;
  counts: GroupBilling_groups_counts | null;
  /**
   * Is *every* user in the group Premium?
   */
  is_premium: boolean | null;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean | null;
  subscription: GroupBilling_groups_subscription | null;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
  user: GroupBilling_groups_user;
  users: GroupBilling_groups_users[] | null;
  owner: GroupBilling_groups_owner;
}

export interface GroupBilling {
  __typename: "Me";
  id: number;
  customer: GroupBilling_customer | null;
  groups: GroupBilling_groups[];
}
