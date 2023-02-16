/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupBilling
// ====================================================

export interface GroupBilling_me_customer_default_credit_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface GroupBilling_me_customer_credit_cards {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface GroupBilling_me_customer {
  __typename: "Customer";
  id: number;
  default_credit_card: GroupBilling_me_customer_default_credit_card | null;
  credit_cards: GroupBilling_me_customer_credit_cards[] | null;
}

export interface GroupBilling_me_groups {
  __typename: "Group";
  id: number;
}

export interface GroupBilling_me {
  __typename: "Me";
  id: number;
  customer: GroupBilling_me_customer | null;
  groups: GroupBilling_me_groups[];
}

export interface GroupBilling {
  /**
   * The current logged in user
   */
  me: GroupBilling_me | null;
}
