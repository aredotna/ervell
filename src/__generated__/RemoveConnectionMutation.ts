/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BaseConnectableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: removeConnectionMutation
// ====================================================

export interface removeConnectionMutation_remove_connection {
  __typename: "RemoveConnectionMutationPayload";
  /**
   * A unique identifier for the client performing the mutation.
   */
  clientMutationId: string | null;
  status: string;
}

export interface removeConnectionMutation {
  remove_connection: removeConnectionMutation_remove_connection | null;
}

export interface removeConnectionMutationVariables {
  channel_id: string;
  connectable_id: string;
  connectable_type: BaseConnectableTypeEnum;
}
