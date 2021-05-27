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

export interface MyHeader_customer {
  __typename: "Customer";
  upcoming_invoice: MyHeader_customer_upcoming_invoice | null;
}

export interface MyHeader {
  __typename: "Me";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  customer: MyHeader_customer | null;
}
