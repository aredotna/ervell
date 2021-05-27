/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsLoggedInQuery
// ====================================================

export interface IsLoggedInQuery_loginStatus {
  __typename: "ClientLoginStatus";
  isLoggedIn: boolean | null;
}

export interface IsLoggedInQuery {
  loginStatus: IsLoggedInQuery_loginStatus | null;
}
