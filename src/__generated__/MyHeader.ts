/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyHeader
// ====================================================

export interface MyHeader_customer_upcoming_invoice {
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

export interface MyHeader_customer_address {
  __typename: "Address";
  line1: string | null;
  line2: string | null;
  country: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
}

export interface MyHeader_customer_default_payment_method_card {
  __typename: "CreditCard";
  last4: string | null;
  brand: string | null;
  exp_month: string | null;
  exp_year: string | null;
}

export interface MyHeader_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
  card: MyHeader_customer_default_payment_method_card | null;
}

export interface MyHeader_customer {
  __typename: "Customer";
  status: string | null;
  upcoming_invoice: MyHeader_customer_upcoming_invoice | null;
  address: MyHeader_customer_address | null;
  default_payment_method: MyHeader_customer_default_payment_method | null;
}

export interface MyHeader {
  __typename: "Me";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  customer: MyHeader_customer | null;
}
