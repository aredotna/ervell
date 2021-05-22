/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProfileUiState
// ====================================================

export interface ProfileUiState_cookies {
  __typename: "ClientCookies";
  view: string | null;
  filter: string | null;
  sort: string | null;
  type: string | null;
}

export interface ProfileUiState {
  cookies: ProfileUiState_cookies | null;
}
