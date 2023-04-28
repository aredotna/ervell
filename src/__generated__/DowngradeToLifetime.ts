/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DowngradeToLifetime
// ====================================================

export interface DowngradeToLifetime_downgrade_to_lifetime_me_customer_plan {
  __typename: "Plan";
  id: string;
  term: string | null;
}

export interface DowngradeToLifetime_downgrade_to_lifetime_me_customer_default_payment_method_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
}

export interface DowngradeToLifetime_downgrade_to_lifetime_me_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
  card: DowngradeToLifetime_downgrade_to_lifetime_me_customer_default_payment_method_card | null;
}

export interface DowngradeToLifetime_downgrade_to_lifetime_me_customer_patron {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
}

export interface DowngradeToLifetime_downgrade_to_lifetime_me_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface DowngradeToLifetime_downgrade_to_lifetime_me_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface DowngradeToLifetime_downgrade_to_lifetime_me_customer {
  __typename: "Customer";
  id: number;
  is_canceled: boolean;
  is_lifetime: boolean;
  can_select_lifetime: boolean;
  is_beneficiary: boolean;
  plan: DowngradeToLifetime_downgrade_to_lifetime_me_customer_plan | null;
  updated_at: string;
  default_payment_method: DowngradeToLifetime_downgrade_to_lifetime_me_customer_default_payment_method | null;
  patron: DowngradeToLifetime_downgrade_to_lifetime_me_customer_patron | null;
  current_period_end_at: string | null;
  default_credit_card: DowngradeToLifetime_downgrade_to_lifetime_me_customer_default_credit_card | null;
  credit_cards: DowngradeToLifetime_downgrade_to_lifetime_me_customer_credit_cards[] | null;
}

export interface DowngradeToLifetime_downgrade_to_lifetime_me_counts {
  __typename: "MeCounts";
  connections: number | null;
}

export interface DowngradeToLifetime_downgrade_to_lifetime_me {
  __typename: "Me";
  id: number;
  non_premium_private_connections_limit: number | null;
  non_premium_connections_limit: number | null;
  customer: DowngradeToLifetime_downgrade_to_lifetime_me_customer | null;
  counts: DowngradeToLifetime_downgrade_to_lifetime_me_counts | null;
}

export interface DowngradeToLifetime_downgrade_to_lifetime {
  __typename: "DowngradeToLifetimeMutationPayload";
  me: DowngradeToLifetime_downgrade_to_lifetime_me;
}

export interface DowngradeToLifetime {
  downgrade_to_lifetime: DowngradeToLifetime_downgrade_to_lifetime | null;
}
