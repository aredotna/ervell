/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UpcomingInvoice
// ====================================================

export interface UpcomingInvoice_upcoming_invoice {
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

export interface UpcomingInvoice {
  __typename: "Customer";
  upcoming_invoice: UpcomingInvoice_upcoming_invoice | null;
}
