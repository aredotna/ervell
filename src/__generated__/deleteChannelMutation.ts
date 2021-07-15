/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteChannelMutation
// ====================================================

export interface deleteChannelMutation_delete_channel {
  __typename: "DeleteChannelMutationPayload";
  /**
   * A unique identifier for the client performing the mutation.
   */
  clientMutationId: string | null;
  status: string;
}

export interface deleteChannelMutation {
  delete_channel: deleteChannelMutation_delete_channel | null;
}

export interface deleteChannelMutationVariables {
  id: string;
}
