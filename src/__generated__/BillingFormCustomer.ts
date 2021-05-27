/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BillingFormCustomer
// ====================================================

export interface BillingFormCustomer_plan {
  __typename: "Plan";
  id: string | null;
  term: string | null;
}

export interface BillingFormCustomer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface BillingFormCustomer_patron {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
}

export interface BillingFormCustomer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface BillingFormCustomer {
  __typename: "Customer";
  id: number | null;
  updated_at: string | null;
  is_lifetime: boolean | null;
  plan: BillingFormCustomer_plan | null;
  default_credit_card: BillingFormCustomer_default_credit_card | null;
  is_canceled: boolean | null;
  is_beneficiary: boolean | null;
  patron: BillingFormCustomer_patron | null;
  current_period_end_at: string | null;
  credit_cards: (BillingFormCustomer_credit_cards | null)[] | null;
}
