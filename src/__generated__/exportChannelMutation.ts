/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExportFormats } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: exportChannelMutation
// ====================================================

export interface exportChannelMutation_export_channel {
  __typename: "ExportChannelPayload";
  /**
   * A unique identifier for the client performing the mutation.
   */
  clientMutationId: string | null;
  status: string | null;
}

export interface exportChannelMutation {
  export_channel: exportChannelMutation_export_channel | null;
}

export interface exportChannelMutationVariables {
  id: string;
  format: ExportFormats;
}
