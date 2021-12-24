/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BaseConnectableTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveTableConnectionMutation
// ====================================================

export interface RemoveTableConnectionMutation_remove_connection {
  __typename: "RemoveConnectionMutationPayload";
  /**
   * A unique identifier for the client performing the mutation.
   */
  clientMutationId: string | null;
  status: string;
}

export interface RemoveTableConnectionMutation {
  remove_connection: RemoveTableConnectionMutation_remove_connection | null;
}

export interface RemoveTableConnectionMutationVariables {
  channelId: string;
  connectableId: string;
  connectableType: BaseConnectableTypeEnum;
}
