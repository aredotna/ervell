/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CustomerPaymentMethods
// ====================================================

export interface CustomerPaymentMethods_me_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
}

export interface CustomerPaymentMethods_me_customer_payment_methods_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface CustomerPaymentMethods_me_customer_payment_methods {
  __typename: "PaymentMethod";
  id: string | null;
  card: CustomerPaymentMethods_me_customer_payment_methods_card | null;
}

export interface CustomerPaymentMethods_me_customer {
  __typename: "Customer";
  id: number;
  default_payment_method: CustomerPaymentMethods_me_customer_default_payment_method | null;
  payment_methods: CustomerPaymentMethods_me_customer_payment_methods[] | null;
}

export interface CustomerPaymentMethods_me {
  __typename: "Me";
  id: number;
  customer: CustomerPaymentMethods_me_customer | null;
}

export interface CustomerPaymentMethods {
  /**
   * The current logged in user
   */
  me: CustomerPaymentMethods_me | null;
}
