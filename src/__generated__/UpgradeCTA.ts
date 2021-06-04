/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UpgradeCTA
// ====================================================

export interface UpgradeCTA_subscription_plan {
  __typename: "Plan";
  id: string | null;
  term: string | null;
}

export interface UpgradeCTA_subscription_users {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface UpgradeCTA_subscription {
  __typename: "PremiumSubscription";
  id: string | null;
  plan: UpgradeCTA_subscription_plan | null;
  users: (UpgradeCTA_subscription_users | null)[] | null;
}

export interface UpgradeCTA_users {
  __typename: "User";
  id: number | null;
  is_premium: boolean | null;
}

export interface UpgradeCTA {
  __typename: "Group";
  id: number | null;
  subscription: UpgradeCTA_subscription | null;
  users: (UpgradeCTA_users | null)[] | null;
}
