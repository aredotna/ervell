/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UpgradeSelection
// ====================================================

export interface UpgradeSelection_subscription_plan {
  __typename: "Plan";
  id: string | null;
  term: string | null;
}

export interface UpgradeSelection_subscription_users {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface UpgradeSelection_subscription {
  __typename: "PremiumSubscription";
  id: string | null;
  plan: UpgradeSelection_subscription_plan | null;
  users: (UpgradeSelection_subscription_users | null)[] | null;
}

export interface UpgradeSelection_users {
  __typename: "User";
  id: number | null;
  is_premium: boolean | null;
}

export interface UpgradeSelection {
  __typename: "Group";
  id: number | null;
  subscription: UpgradeSelection_subscription | null;
  users: (UpgradeSelection_users | null)[] | null;
}
