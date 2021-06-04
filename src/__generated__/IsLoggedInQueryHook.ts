/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsLoggedInQueryHook
// ====================================================

export interface IsLoggedInQueryHook_loginStatus {
  __typename: "ClientLoginStatus";
  isLoggedIn: boolean | null;
}

export interface IsLoggedInQueryHook {
  loginStatus: IsLoggedInQueryHook_loginStatus | null;
}
