/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyGroupCheckout
// ====================================================

export interface MyGroupCheckout_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface MyGroupCheckout_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface MyGroupCheckout_customer {
  __typename: "Customer";
  id: number | null;
  default_credit_card: MyGroupCheckout_customer_default_credit_card | null;
  credit_cards: (MyGroupCheckout_customer_credit_cards | null)[] | null;
}

export interface MyGroupCheckout {
  __typename: "Me";
  id: number | null;
  customer: MyGroupCheckout_customer | null;
}
