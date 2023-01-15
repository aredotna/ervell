/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateAddressMutation
// ====================================================

export interface UpdateAddressMutation_update_address_customer_address {
  __typename: "Address";
  postal_code: string | null;
  country: string | null;
}

export interface UpdateAddressMutation_update_address_customer {
  __typename: "Customer";
  id: number;
  address: UpdateAddressMutation_update_address_customer_address | null;
}

export interface UpdateAddressMutation_update_address {
  __typename: "UpdateAddressMutationPayload";
  customer: UpdateAddressMutation_update_address_customer | null;
}

export interface UpdateAddressMutation {
  update_address: UpdateAddressMutation_update_address | null;
}

export interface UpdateAddressMutationVariables {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  postal_code?: string | null;
  country?: string | null;
  state?: string | null;
}
