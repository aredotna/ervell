/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CustomerAddress
// ====================================================

export interface CustomerAddress_me_customer_address {
  __typename: "Address";
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
}

export interface CustomerAddress_me_customer {
  __typename: "Customer";
  address: CustomerAddress_me_customer_address | null;
}

export interface CustomerAddress_me {
  __typename: "Me";
  customer: CustomerAddress_me_customer | null;
}

export interface CustomerAddress {
  /**
   * The current logged in user
   */
  me: CustomerAddress_me | null;
}
