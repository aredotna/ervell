/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleConnectionExpandedMutation
// ====================================================

export interface ToggleConnectionExpandedMutation_toggle_connection_selection_connection {
  __typename: "Connection";
  id: number;
  selected: boolean;
}

export interface ToggleConnectionExpandedMutation_toggle_connection_selection {
  __typename: "ToggleConnectionSelectionMutationPayload";
  connection: ToggleConnectionExpandedMutation_toggle_connection_selection_connection;
}

export interface ToggleConnectionExpandedMutation {
  toggle_connection_selection: ToggleConnectionExpandedMutation_toggle_connection_selection | null;
}

export interface ToggleConnectionExpandedMutationVariables {
  id: string;
}
