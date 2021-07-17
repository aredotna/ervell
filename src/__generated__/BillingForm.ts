/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BillingForm
// ====================================================

export interface BillingForm_customer_plan {
  __typename: "Plan";
  id: string;
  term: string | null;
}

export interface BillingForm_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface BillingForm_customer_patron {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
}

export interface BillingForm_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface BillingForm_customer {
  __typename: "Customer";
  id: number;
  is_canceled: boolean;
  is_lifetime: boolean;
  can_select_lifetime: boolean;
  is_beneficiary: boolean;
  plan: BillingForm_customer_plan | null;
  updated_at: string | null;
  default_credit_card: BillingForm_customer_default_credit_card | null;
  patron: BillingForm_customer_patron | null;
  current_period_end_at: string | null;
  credit_cards: BillingForm_customer_credit_cards[] | null;
}

export interface BillingForm_counts {
  __typename: "MeCounts";
  private_connections: number | null;
  connections: number | null;
}

export interface BillingForm {
  __typename: "Me";
  id: number;
  non_premium_private_connections_limit: number | null;
  non_premium_connections_limit: number | null;
  customer: BillingForm_customer | null;
  counts: BillingForm_counts | null;
}
