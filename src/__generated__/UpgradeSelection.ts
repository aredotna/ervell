/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UpgradeSelection
// ====================================================

export interface UpgradeSelection_subscription_plan {
  __typename: "Plan";
  id: string;
  term: string | null;
}

export interface UpgradeSelection_subscription_users {
  __typename: "User";
  id: number;
  name: string;
}

export interface UpgradeSelection_subscription {
  __typename: "PremiumSubscription";
  id: string;
  plan: UpgradeSelection_subscription_plan | null;
  users: UpgradeSelection_subscription_users[] | null;
}

export interface UpgradeSelection_users {
  __typename: "User";
  id: number;
  is_premium: boolean;
}

export interface UpgradeSelection {
  __typename: "Group";
  id: number;
  subscription: UpgradeSelection_subscription | null;
  users: UpgradeSelection_users[] | null;
}
