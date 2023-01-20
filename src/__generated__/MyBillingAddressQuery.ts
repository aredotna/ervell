/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyBillingAddressQuery
// ====================================================

export interface MyBillingAddressQuery_me_customer_address {
  __typename: "Address";
  line1: string | null;
  line2: string | null;
  country: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
}

export interface MyBillingAddressQuery_me_customer {
  __typename: "Customer";
  id: number;
  address: MyBillingAddressQuery_me_customer_address | null;
}

export interface MyBillingAddressQuery_me {
  __typename: "Me";
  id: number;
  name: string;
  customer: MyBillingAddressQuery_me_customer | null;
}

export interface MyBillingAddressQuery {
  /**
   * The current logged in user
   */
  me: MyBillingAddressQuery_me | null;
}
