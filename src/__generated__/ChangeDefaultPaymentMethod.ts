/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeDefaultPaymentMethod
// ====================================================

export interface ChangeDefaultPaymentMethod_update_customer_customer_default_payment_method {
  __typename: "PaymentMethod";
  id: string | null;
}

export interface ChangeDefaultPaymentMethod_update_customer_customer_payment_methods_card {
  __typename: "CreditCard";
  id: string | null;
  brand: string | null;
  last4: string | null;
  exp_year: string | null;
  exp_month: string | null;
}

export interface ChangeDefaultPaymentMethod_update_customer_customer_payment_methods {
  __typename: "PaymentMethod";
  id: string | null;
  card: ChangeDefaultPaymentMethod_update_customer_customer_payment_methods_card | null;
}

export interface ChangeDefaultPaymentMethod_update_customer_customer {
  __typename: "Customer";
  id: number;
  default_payment_method: ChangeDefaultPaymentMethod_update_customer_customer_default_payment_method | null;
  payment_methods: ChangeDefaultPaymentMethod_update_customer_customer_payment_methods[] | null;
}

export interface ChangeDefaultPaymentMethod_update_customer {
  __typename: "UpdateCustomerMutationPayload";
  customer: ChangeDefaultPaymentMethod_update_customer_customer;
}

export interface ChangeDefaultPaymentMethod {
  update_customer: ChangeDefaultPaymentMethod_update_customer | null;
}

export interface ChangeDefaultPaymentMethodVariables {
  default_payment_method_id: string;
}
