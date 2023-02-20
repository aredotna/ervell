/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyGroupUpcomingInvoice
// ====================================================

export interface MyGroupUpcomingInvoice_group_upcoming_invoice {
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

export interface MyGroupUpcomingInvoice_group_subscription {
  __typename: "PremiumSubscription";
  id: string;
  plan_id: string;
  is_canceled: boolean;
}

export interface MyGroupUpcomingInvoice_group {
  __typename: "Group";
  id: number;
  upcoming_invoice: MyGroupUpcomingInvoice_group_upcoming_invoice | null;
  subscription: MyGroupUpcomingInvoice_group_subscription | null;
}

export interface MyGroupUpcomingInvoice_me_customer_address {
  __typename: "Address";
  line1: string | null;
  line2: string | null;
  country: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
}

export interface MyGroupUpcomingInvoice_me_customer_default_payment_method_card {
  __typename: "CreditCard";
  last4: string | null;
  brand: string | null;
  exp_month: string | null;
  exp_year: string | null;
}

export interface MyGroupUpcomingInvoice_me_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
  card: MyGroupUpcomingInvoice_me_customer_default_payment_method_card | null;
}

export interface MyGroupUpcomingInvoice_me_customer {
  __typename: "Customer";
  id: number;
  address: MyGroupUpcomingInvoice_me_customer_address | null;
  default_payment_method: MyGroupUpcomingInvoice_me_customer_default_payment_method | null;
}

export interface MyGroupUpcomingInvoice_me {
  __typename: "Me";
  id: number;
  customer: MyGroupUpcomingInvoice_me_customer | null;
}

export interface MyGroupUpcomingInvoice {
  group: MyGroupUpcomingInvoice_group | null;
  /**
   * The current logged in user
   */
  me: MyGroupUpcomingInvoice_me | null;
}

export interface MyGroupUpcomingInvoiceVariables {
  id: string;
}
