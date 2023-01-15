/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddPaymentMethod
// ====================================================

export interface AddPaymentMethod_add_payment_method_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
}

export interface AddPaymentMethod_add_payment_method_customer_payment_methods_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface AddPaymentMethod_add_payment_method_customer_payment_methods {
  __typename: "PaymentMethod";
  id: string | null;
  card: AddPaymentMethod_add_payment_method_customer_payment_methods_card | null;
}

export interface AddPaymentMethod_add_payment_method_customer {
  __typename: "Customer";
  id: number;
  default_payment_method: AddPaymentMethod_add_payment_method_customer_default_payment_method | null;
  payment_methods: AddPaymentMethod_add_payment_method_customer_payment_methods[] | null;
}

export interface AddPaymentMethod_add_payment_method {
  __typename: "AddPaymentMethodMutationPayload";
  customer: AddPaymentMethod_add_payment_method_customer;
}

export interface AddPaymentMethod {
  add_payment_method: AddPaymentMethod_add_payment_method | null;
}

export interface AddPaymentMethodVariables {
  token: string;
}
