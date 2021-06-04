/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyCreditCard
// ====================================================

export interface MyCreditCard_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface MyCreditCard_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface MyCreditCard {
  __typename: "Customer";
  id: number | null;
  default_credit_card: MyCreditCard_default_credit_card | null;
  credit_cards: (MyCreditCard_credit_cards | null)[] | null;
}
