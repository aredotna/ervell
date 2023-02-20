/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyGroupCheckout
// ====================================================

export interface MyGroupCheckout_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
}

export interface MyGroupCheckout_customer_payment_methods_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface MyGroupCheckout_customer_payment_methods {
  __typename: "PaymentMethod";
  id: string | null;
  card: MyGroupCheckout_customer_payment_methods_card | null;
}

export interface MyGroupCheckout_customer {
  __typename: "Customer";
  id: number;
  default_payment_method: MyGroupCheckout_customer_default_payment_method | null;
  payment_methods: MyGroupCheckout_customer_payment_methods[] | null;
}

export interface MyGroupCheckout {
  __typename: "Me";
  id: number;
  customer: MyGroupCheckout_customer | null;
}
