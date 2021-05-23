/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: InitialExtensionDataFragment
// ====================================================

export interface InitialExtensionDataFragment_loginStatus {
  __typename: "ClientLoginStatus";
  isLoggedIn: boolean | null;
}

export interface InitialExtensionDataFragment {
  __typename: "Query";
  loginStatus: InitialExtensionDataFragment_loginStatus | null;
}
