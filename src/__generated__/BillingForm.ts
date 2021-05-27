/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BillingForm
// ====================================================

export interface BillingForm_customer_plan {
  __typename: "Plan";
  id: string | null;
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
  id: number | null;
  name: string | null;
  hidden_email: string | null;
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
  id: number | null;
  is_canceled: boolean | null;
  is_lifetime: boolean | null;
  can_select_lifetime: boolean | null;
  is_beneficiary: boolean | null;
  plan: BillingForm_customer_plan | null;
  updated_at: string | null;
  default_credit_card: BillingForm_customer_default_credit_card | null;
  patron: BillingForm_customer_patron | null;
  current_period_end_at: string | null;
  credit_cards: (BillingForm_customer_credit_cards | null)[] | null;
}

export interface BillingForm_counts {
  __typename: "MeCounts";
  private_connections: number | null;
  connections: number | null;
}

export interface BillingForm {
  __typename: "Me";
  id: number | null;
  non_premium_private_connections_limit: number | null;
  non_premium_connections_limit: number | null;
  customer: BillingForm_customer | null;
  counts: BillingForm_counts | null;
}
