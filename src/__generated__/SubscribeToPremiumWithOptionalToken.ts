/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SupportedPlanEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SubscribeToPremiumWithOptionalToken
// ====================================================

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_plan {
  __typename: "Plan";
  id: string | null;
  term: string | null;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_patron {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer {
  __typename: "Customer";
  id: number | null;
  is_canceled: boolean | null;
  is_lifetime: boolean | null;
  can_select_lifetime: boolean | null;
  is_beneficiary: boolean | null;
  plan: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_plan | null;
  updated_at: string | null;
  default_credit_card: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_default_credit_card | null;
  patron: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_patron | null;
  current_period_end_at: string | null;
  credit_cards: (SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_credit_cards | null)[] | null;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_counts {
  __typename: "MeCounts";
  private_connections: number | null;
  connections: number | null;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me {
  __typename: "Me";
  id: number | null;
  non_premium_private_connections_limit: number | null;
  non_premium_connections_limit: number | null;
  customer: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer | null;
  counts: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_counts | null;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token {
  __typename: "SubscribeToPremiumWithOptionalTokenPayload";
  me: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me | null;
}

export interface SubscribeToPremiumWithOptionalToken {
  subscribe_to_premium_with_optional_token: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token | null;
}

export interface SubscribeToPremiumWithOptionalTokenVariables {
  plan_id: SupportedPlanEnum;
  coupon_code?: string | null;
  token?: string | null;
}
