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
  id: string;
  term: string | null;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_default_payment_method_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
  card: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_default_payment_method_card | null;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_patron {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
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
  id: number;
  is_canceled: boolean;
  is_lifetime: boolean;
  can_select_lifetime: boolean;
  is_beneficiary: boolean;
  plan: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_plan | null;
  updated_at: string;
  default_payment_method: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_default_payment_method | null;
  patron: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_patron | null;
  current_period_end_at: string | null;
  default_credit_card: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_default_credit_card | null;
  credit_cards: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer_credit_cards[] | null;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_counts {
  __typename: "MeCounts";
  connections: number;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me {
  __typename: "Me";
  id: number;
  non_premium_private_connections_limit: number | null;
  non_premium_connections_limit: number | null;
  customer: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_customer | null;
  counts: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me_counts;
}

export interface SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token {
  __typename: "SubscribeToPremiumWithOptionalTokenMutationPayload";
  me: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token_me;
}

export interface SubscribeToPremiumWithOptionalToken {
  subscribe_to_premium_with_optional_token: SubscribeToPremiumWithOptionalToken_subscribe_to_premium_with_optional_token | null;
}

export interface SubscribeToPremiumWithOptionalTokenVariables {
  plan_id: SupportedPlanEnum;
  coupon_code?: string | null;
  token?: string | null;
}
