/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExploreUiState
// ====================================================

export interface ExploreUiState_cookies {
  __typename: "ClientCookies";
  view: string | null;
  sort: string | null;
  block_filter: string | null;
}

export interface ExploreUiState {
  cookies: ExploreUiState_cookies | null;
}
