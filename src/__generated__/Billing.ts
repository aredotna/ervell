/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Billing
// ====================================================

export interface Billing_customer_plan {
  __typename: "Plan";
  id: string;
  term: string | null;
}

export interface Billing_customer_default_payment_method_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_month: string | null;
  exp_year: string | null;
}

export interface Billing_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
  card: Billing_customer_default_payment_method_card | null;
}

export interface Billing_customer_patron {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
}

export interface Billing_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
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

export interface Billing_customer_address {
  __typename: "Address";
  line1: string | null;
  line2: string | null;
  country: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
}

export interface Billing_customer {
  __typename: "Customer";
  id: number;
  is_canceled: boolean;
  is_lifetime: boolean;
  can_select_lifetime: boolean;
  is_beneficiary: boolean;
  plan: Billing_customer_plan | null;
  updated_at: string | null;
  default_payment_method: Billing_customer_default_payment_method | null;
  patron: Billing_customer_patron | null;
  current_period_end_at: string | null;
  default_credit_card: Billing_customer_default_credit_card | null;
  credit_cards: Billing_customer_credit_cards[] | null;
  status: string | null;
  upcoming_invoice: Billing_customer_upcoming_invoice | null;
  address: Billing_customer_address | null;
}

export interface Billing_counts {
  __typename: "MeCounts";
  connections: number | null;
}

export interface Billing {
  __typename: "Me";
  id: number;
  non_premium_private_connections_limit: number | null;
  non_premium_connections_limit: number | null;
  customer: Billing_customer | null;
  counts: Billing_counts | null;
  name: string;
  href: string | null;
  initials: string;
  avatar: string | null;
}
