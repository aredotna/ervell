/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelPremiumSubscriptions
// ====================================================

export interface CancelPremiumSubscriptions_cancel_premium_subscriptions_users_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface CancelPremiumSubscriptions_cancel_premium_subscriptions_users {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: CancelPremiumSubscriptions_cancel_premium_subscriptions_users_can;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface CancelPremiumSubscriptions_cancel_premium_subscriptions {
  __typename: "CancelPremiumSubscriptionsMutationPayload";
  users: CancelPremiumSubscriptions_cancel_premium_subscriptions_users[];
}

export interface CancelPremiumSubscriptions {
  cancel_premium_subscriptions: CancelPremiumSubscriptions_cancel_premium_subscriptions | null;
}

export interface CancelPremiumSubscriptionsVariables {
  user_ids: (string | null)[];
}
