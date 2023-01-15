/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BillingFormCustomer
// ====================================================

export interface BillingFormCustomer_plan {
  __typename: "Plan";
  id: string;
  term: string | null;
}

export interface BillingFormCustomer_default_payment_method_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
}

export interface BillingFormCustomer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
  card: BillingFormCustomer_default_payment_method_card | null;
}

export interface BillingFormCustomer_patron {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
}

export interface BillingFormCustomer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
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
  id: number;
  updated_at: string | null;
  is_lifetime: boolean;
  plan: BillingFormCustomer_plan | null;
  default_payment_method: BillingFormCustomer_default_payment_method | null;
  is_canceled: boolean;
  is_beneficiary: boolean;
  patron: BillingFormCustomer_patron | null;
  current_period_end_at: string | null;
  default_credit_card: BillingFormCustomer_default_credit_card | null;
  credit_cards: BillingFormCustomer_credit_cards[] | null;
}
