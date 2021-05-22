/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeDefaultCreditCard
// ====================================================

export interface ChangeDefaultCreditCard_update_customer_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface ChangeDefaultCreditCard_update_customer_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface ChangeDefaultCreditCard_update_customer_customer {
  __typename: "Customer";
  id: number | null;
  default_credit_card: ChangeDefaultCreditCard_update_customer_customer_default_credit_card | null;
  credit_cards: (ChangeDefaultCreditCard_update_customer_customer_credit_cards | null)[] | null;
}

export interface ChangeDefaultCreditCard_update_customer {
  __typename: "UpdateCustomerPayload";
  customer: ChangeDefaultCreditCard_update_customer_customer | null;
}

export interface ChangeDefaultCreditCard {
  update_customer: ChangeDefaultCreditCard_update_customer | null;
}

export interface ChangeDefaultCreditCardVariables {
  default_credit_card_id: string;
}
