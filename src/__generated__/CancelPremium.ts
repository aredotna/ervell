/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelPremium
// ====================================================

export interface CancelPremium_cancel_premium_subscription_me_customer_plan {
  __typename: "Plan";
  id: string | null;
  term: string | null;
}

export interface CancelPremium_cancel_premium_subscription_me_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface CancelPremium_cancel_premium_subscription_me_customer_patron {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
}

export interface CancelPremium_cancel_premium_subscription_me_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface CancelPremium_cancel_premium_subscription_me_customer {
  __typename: "Customer";
  id: number | null;
  is_canceled: boolean | null;
  is_lifetime: boolean | null;
  can_select_lifetime: boolean | null;
  is_beneficiary: boolean | null;
  plan: CancelPremium_cancel_premium_subscription_me_customer_plan | null;
  updated_at: string | null;
  default_credit_card: CancelPremium_cancel_premium_subscription_me_customer_default_credit_card | null;
  patron: CancelPremium_cancel_premium_subscription_me_customer_patron | null;
  current_period_end_at: string | null;
  credit_cards: (CancelPremium_cancel_premium_subscription_me_customer_credit_cards | null)[] | null;
}

export interface CancelPremium_cancel_premium_subscription_me_counts {
  __typename: "MeCounts";
  private_connections: number | null;
  connections: number | null;
}

export interface CancelPremium_cancel_premium_subscription_me {
  __typename: "Me";
  id: number | null;
  non_premium_private_connections_limit: number | null;
  non_premium_connections_limit: number | null;
  customer: CancelPremium_cancel_premium_subscription_me_customer | null;
  counts: CancelPremium_cancel_premium_subscription_me_counts | null;
}

export interface CancelPremium_cancel_premium_subscription {
  __typename: "CancelPremiumSubscriptionPayload";
  me: CancelPremium_cancel_premium_subscription_me | null;
}

export interface CancelPremium {
  cancel_premium_subscription: CancelPremium_cancel_premium_subscription | null;
}
