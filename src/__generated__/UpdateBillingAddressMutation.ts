/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateBillingAddressMutation
// ====================================================

export interface UpdateBillingAddressMutation_update_address_customer_address {
  __typename: "Address";
  postal_code: string | null;
  country: string | null;
}

export interface UpdateBillingAddressMutation_update_address_customer {
  __typename: "Customer";
  id: number;
  address: UpdateBillingAddressMutation_update_address_customer_address | null;
}

export interface UpdateBillingAddressMutation_update_address {
  __typename: "UpdateAddressMutationPayload";
  customer: UpdateBillingAddressMutation_update_address_customer | null;
}

export interface UpdateBillingAddressMutation {
  update_address: UpdateBillingAddressMutation_update_address | null;
}

export interface UpdateBillingAddressMutationVariables {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  postal_code?: string | null;
  country?: string | null;
  state?: string | null;
}
