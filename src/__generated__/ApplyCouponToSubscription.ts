/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SupportedPlanEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ApplyCouponToSubscription
// ====================================================

export interface ApplyCouponToSubscription_apply_coupon_to_subscription_me_customer_plan {
  __typename: "Plan";
  id: string | null;
  term: string | null;
}

export interface ApplyCouponToSubscription_apply_coupon_to_subscription_me_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface ApplyCouponToSubscription_apply_coupon_to_subscription_me_customer_patron {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
}

export interface ApplyCouponToSubscription_apply_coupon_to_subscription_me_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface ApplyCouponToSubscription_apply_coupon_to_subscription_me_customer {
  __typename: "Customer";
  id: number | null;
  is_canceled: boolean | null;
  is_lifetime: boolean | null;
  can_select_lifetime: boolean | null;
  is_beneficiary: boolean | null;
  plan: ApplyCouponToSubscription_apply_coupon_to_subscription_me_customer_plan | null;
  updated_at: string | null;
  default_credit_card: ApplyCouponToSubscription_apply_coupon_to_subscription_me_customer_default_credit_card | null;
  patron: ApplyCouponToSubscription_apply_coupon_to_subscription_me_customer_patron | null;
  current_period_end_at: string | null;
  credit_cards: (ApplyCouponToSubscription_apply_coupon_to_subscription_me_customer_credit_cards | null)[] | null;
}

export interface ApplyCouponToSubscription_apply_coupon_to_subscription_me_counts {
  __typename: "MeCounts";
  private_connections: number | null;
  connections: number | null;
}

export interface ApplyCouponToSubscription_apply_coupon_to_subscription_me {
  __typename: "Me";
  id: number | null;
  non_premium_private_connections_limit: number | null;
  non_premium_connections_limit: number | null;
  customer: ApplyCouponToSubscription_apply_coupon_to_subscription_me_customer | null;
  counts: ApplyCouponToSubscription_apply_coupon_to_subscription_me_counts | null;
}

export interface ApplyCouponToSubscription_apply_coupon_to_subscription_upcoming_customer_invoice {
  __typename: "Invoice";
  /**
   * USD cents
   */
  subtotal: number | null;
  /**
   * USD cents
   */
  total: number | null;
  /**
   * Can be `null` in cases where there is a manually sent invoice
   */
  next_payment_attempt_at: string | null;
}

export interface ApplyCouponToSubscription_apply_coupon_to_subscription_upcoming_customer {
  __typename: "Customer";
  id: number | null;
  invoice: ApplyCouponToSubscription_apply_coupon_to_subscription_upcoming_customer_invoice | null;
}

export interface ApplyCouponToSubscription_apply_coupon_to_subscription_upcoming {
  __typename: "Me";
  customer: ApplyCouponToSubscription_apply_coupon_to_subscription_upcoming_customer | null;
}

export interface ApplyCouponToSubscription_apply_coupon_to_subscription {
  __typename: "ApplyCouponToSubscriptionPayload";
  me: ApplyCouponToSubscription_apply_coupon_to_subscription_me | null;
  upcoming: ApplyCouponToSubscription_apply_coupon_to_subscription_upcoming | null;
}

export interface ApplyCouponToSubscription {
  apply_coupon_to_subscription: ApplyCouponToSubscription_apply_coupon_to_subscription | null;
}

export interface ApplyCouponToSubscriptionVariables {
  coupon_code: string;
  plan_id?: SupportedPlanEnum | null;
}
