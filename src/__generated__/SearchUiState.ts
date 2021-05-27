/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchUiState
// ====================================================

export interface SearchUiState_cookies {
  __typename: "ClientCookies";
  view: string | null;
  sort: string | null;
  block_filter: string | null;
}

export interface SearchUiState {
  cookies: SearchUiState_cookies | null;
}
