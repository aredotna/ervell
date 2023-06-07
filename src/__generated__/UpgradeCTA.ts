/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UpgradeCTA
// ====================================================

export interface UpgradeCTA_subscription_plan {
  __typename: "Plan";
  id: string;
  term: string | null;
}

export interface UpgradeCTA_subscription_users {
  __typename: "User";
  id: number;
  name: string;
}

export interface UpgradeCTA_subscription {
  __typename: "PremiumSubscription";
  id: string;
  plan: UpgradeCTA_subscription_plan | null;
  users: UpgradeCTA_subscription_users[] | null;
}

export interface UpgradeCTA_users {
  __typename: "User";
  id: number;
  is_premium: boolean;
}

export interface UpgradeCTA {
  __typename: "Group";
  id: number;
  subscription: UpgradeCTA_subscription | null;
  users: UpgradeCTA_users[];
}
