/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { SupportedPlanEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SubscribeToPremium
// ====================================================

export interface SubscribeToPremium_subscribe_to_premium_me_customer_plan {
  __typename: "Plan";
  id: string | null;
  term: string | null;
}

export interface SubscribeToPremium_subscribe_to_premium_me_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface SubscribeToPremium_subscribe_to_premium_me_customer_patron {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
}

export interface SubscribeToPremium_subscribe_to_premium_me_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface SubscribeToPremium_subscribe_to_premium_me_customer {
  __typename: "Customer";
  id: number | null;
  is_canceled: boolean | null;
  is_lifetime: boolean | null;
  is_beneficiary: boolean | null;
  plan: SubscribeToPremium_subscribe_to_premium_me_customer_plan | null;
  updated_at: string | null;
  default_credit_card: SubscribeToPremium_subscribe_to_premium_me_customer_default_credit_card | null;
  patron: SubscribeToPremium_subscribe_to_premium_me_customer_patron | null;
  current_period_end_at: string | null;
  credit_cards: (SubscribeToPremium_subscribe_to_premium_me_customer_credit_cards | null)[] | null;
}

export interface SubscribeToPremium_subscribe_to_premium_me_counts {
  __typename: "MeCounts";
  private_connections: number | null;
}

export interface SubscribeToPremium_subscribe_to_premium_me {
  __typename: "Me";
  id: number | null;
  non_premium_private_connections_limit: number | null;
  customer: SubscribeToPremium_subscribe_to_premium_me_customer | null;
  counts: SubscribeToPremium_subscribe_to_premium_me_counts | null;
}

export interface SubscribeToPremium_subscribe_to_premium {
  __typename: "SubscribeToPremiumPayload";
  me: SubscribeToPremium_subscribe_to_premium_me | null;
}

export interface SubscribeToPremium {
  subscribe_to_premium: SubscribeToPremium_subscribe_to_premium | null;
}

export interface SubscribeToPremiumVariables {
  token: string;
  plan_id: SupportedPlanEnum;
  coupon_code?: string | null;
}
