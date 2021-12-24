/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelUiState
// ====================================================

export interface ChannelUiState_cookies {
  __typename: "ClientCookies";
  view: string | null;
}

export interface ChannelUiState {
  cookies: ChannelUiState_cookies | null;
}

export interface ChannelUiStateVariables {
  viewName: string;
}
