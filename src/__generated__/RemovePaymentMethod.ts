/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemovePaymentMethod
// ====================================================

export interface RemovePaymentMethod_remove_payment_method_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
}

export interface RemovePaymentMethod_remove_payment_method_customer_payment_methods_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface RemovePaymentMethod_remove_payment_method_customer_payment_methods {
  __typename: "PaymentMethod";
  id: string | null;
  card: RemovePaymentMethod_remove_payment_method_customer_payment_methods_card | null;
}

export interface RemovePaymentMethod_remove_payment_method_customer {
  __typename: "Customer";
  id: number;
  default_payment_method: RemovePaymentMethod_remove_payment_method_customer_default_payment_method | null;
  payment_methods: RemovePaymentMethod_remove_payment_method_customer_payment_methods[] | null;
}

export interface RemovePaymentMethod_remove_payment_method {
  __typename: "RemovePaymentMethodMutationPayload";
  customer: RemovePaymentMethod_remove_payment_method_customer;
}

export interface RemovePaymentMethod {
  remove_payment_method: RemovePaymentMethod_remove_payment_method | null;
}

export interface RemovePaymentMethodVariables {
  id: string;
}
