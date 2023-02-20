/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GroupBilling
// ====================================================

export interface GroupBilling_me_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
}

export interface GroupBilling_me_customer_payment_methods_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface GroupBilling_me_customer_payment_methods {
  __typename: "PaymentMethod";
  id: string | null;
  card: GroupBilling_me_customer_payment_methods_card | null;
}

export interface GroupBilling_me_customer {
  __typename: "Customer";
  id: number;
  default_payment_method: GroupBilling_me_customer_default_payment_method | null;
  payment_methods: GroupBilling_me_customer_payment_methods[] | null;
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
