/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CancelPremiumSubscription
// ====================================================

export interface CancelPremiumSubscription_cancel_premium_subscription_me_customer_plan {
  __typename: "Plan";
  id: string;
  term: string | null;
}

export interface CancelPremiumSubscription_cancel_premium_subscription_me_customer_default_payment_method_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
}

export interface CancelPremiumSubscription_cancel_premium_subscription_me_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
  card: CancelPremiumSubscription_cancel_premium_subscription_me_customer_default_payment_method_card | null;
}

export interface CancelPremiumSubscription_cancel_premium_subscription_me_customer_patron {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
}

export interface CancelPremiumSubscription_cancel_premium_subscription_me_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface CancelPremiumSubscription_cancel_premium_subscription_me_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface CancelPremiumSubscription_cancel_premium_subscription_me_customer {
  __typename: "Customer";
  id: number;
  is_canceled: boolean;
  is_lifetime: boolean;
  can_select_lifetime: boolean;
  is_beneficiary: boolean;
  plan: CancelPremiumSubscription_cancel_premium_subscription_me_customer_plan | null;
  updated_at: string;
  default_payment_method: CancelPremiumSubscription_cancel_premium_subscription_me_customer_default_payment_method | null;
  patron: CancelPremiumSubscription_cancel_premium_subscription_me_customer_patron | null;
  current_period_end_at: string | null;
  default_credit_card: CancelPremiumSubscription_cancel_premium_subscription_me_customer_default_credit_card | null;
  credit_cards: CancelPremiumSubscription_cancel_premium_subscription_me_customer_credit_cards[] | null;
}

export interface CancelPremiumSubscription_cancel_premium_subscription_me_counts {
  __typename: "MeCounts";
  connections: number;
}

export interface CancelPremiumSubscription_cancel_premium_subscription_me {
  __typename: "Me";
  id: number;
  non_premium_private_connections_limit: number | null;
  non_premium_connections_limit: number | null;
  customer: CancelPremiumSubscription_cancel_premium_subscription_me_customer | null;
  counts: CancelPremiumSubscription_cancel_premium_subscription_me_counts;
}

export interface CancelPremiumSubscription_cancel_premium_subscription {
  __typename: "CancelPremiumSubscriptionMutationPayload";
  me: CancelPremiumSubscription_cancel_premium_subscription_me;
}

export interface CancelPremiumSubscription {
  cancel_premium_subscription: CancelPremiumSubscription_cancel_premium_subscription | null;
}
