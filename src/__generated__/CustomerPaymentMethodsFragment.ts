/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CustomerPaymentMethodsFragment
// ====================================================

export interface CustomerPaymentMethodsFragment_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
}

export interface CustomerPaymentMethodsFragment_payment_methods_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface CustomerPaymentMethodsFragment_payment_methods {
  __typename: "PaymentMethod";
  id: string | null;
  card: CustomerPaymentMethodsFragment_payment_methods_card | null;
}

export interface CustomerPaymentMethodsFragment {
  __typename: "Customer";
  id: number;
  default_payment_method: CustomerPaymentMethodsFragment_default_payment_method | null;
  payment_methods: CustomerPaymentMethodsFragment_payment_methods[] | null;
}
