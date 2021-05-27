/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveCreditCard
// ====================================================

export interface RemoveCreditCard_remove_credit_card_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface RemoveCreditCard_remove_credit_card_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface RemoveCreditCard_remove_credit_card_customer {
  __typename: "Customer";
  id: number | null;
  default_credit_card: RemoveCreditCard_remove_credit_card_customer_default_credit_card | null;
  credit_cards: (RemoveCreditCard_remove_credit_card_customer_credit_cards | null)[] | null;
}

export interface RemoveCreditCard_remove_credit_card {
  __typename: "RemoveCreditCardPayload";
  customer: RemoveCreditCard_remove_credit_card_customer | null;
}

export interface RemoveCreditCard {
  remove_credit_card: RemoveCreditCard_remove_credit_card | null;
}

export interface RemoveCreditCardVariables {
  id: string;
}
