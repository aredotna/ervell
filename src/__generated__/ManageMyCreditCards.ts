/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ManageMyCreditCards
// ====================================================

export interface ManageMyCreditCards_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
}

export interface ManageMyCreditCards_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface ManageMyCreditCards {
  __typename: "Customer";
  id: number | null;
  default_credit_card: ManageMyCreditCards_default_credit_card | null;
  credit_cards: (ManageMyCreditCards_credit_cards | null)[] | null;
}
