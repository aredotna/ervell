/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelPremiumSubscriptions
// ====================================================

export interface CancelPremiumSubscriptions_cancel_premium_subscriptions_users_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface CancelPremiumSubscriptions_cancel_premium_subscriptions_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  is_canceled: boolean | null;
  can: CancelPremiumSubscriptions_cancel_premium_subscriptions_users_can | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface CancelPremiumSubscriptions_cancel_premium_subscriptions {
  __typename: "CancelPremiumSubscriptionsPayload";
  users: (CancelPremiumSubscriptions_cancel_premium_subscriptions_users | null)[] | null;
}

export interface CancelPremiumSubscriptions {
  cancel_premium_subscriptions: CancelPremiumSubscriptions_cancel_premium_subscriptions | null;
}

export interface CancelPremiumSubscriptionsVariables {
  user_ids: (string | null)[];
}
