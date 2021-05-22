/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Billing
// ====================================================

export interface Billing_customer_plan {
  __typename: "Plan";
  id: string | null;
  term: string | null;
}

export interface Billing_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface Billing_customer_patron {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
}

export interface Billing_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface Billing_customer_upcoming_invoice {
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

export interface Billing_customer {
  __typename: "Customer";
  id: number | null;
  is_canceled: boolean | null;
  is_lifetime: boolean | null;
  can_select_lifetime: boolean | null;
  is_beneficiary: boolean | null;
  plan: Billing_customer_plan | null;
  updated_at: string | null;
  default_credit_card: Billing_customer_default_credit_card | null;
  patron: Billing_customer_patron | null;
  current_period_end_at: string | null;
  credit_cards: (Billing_customer_credit_cards | null)[] | null;
  upcoming_invoice: Billing_customer_upcoming_invoice | null;
}

export interface Billing_counts {
  __typename: "MeCounts";
  private_connections: number | null;
  connections: number | null;
}

export interface Billing {
  __typename: "Me";
  id: number | null;
  non_premium_private_connections_limit: number | null;
  non_premium_connections_limit: number | null;
  customer: Billing_customer | null;
  counts: Billing_counts | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}
