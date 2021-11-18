/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: InitialAppDataFragment
// ====================================================

export interface InitialAppDataFragment_currentRoute {
  __typename: "ClientCurrentRoute";
  protocol: string | null;
  slashes: boolean | null;
  auth: string | null;
  host: string | null;
  port: string | null;
  hostname: string | null;
  hash: string | null;
  search: string | null;
  query: string | null;
  pathname: string | null;
  path: string | null;
  href: string | null;
}

export interface InitialAppDataFragment_loginStatus {
  __typename: "ClientLoginStatus";
  isLoggedIn: boolean | null;
}

export interface InitialAppDataFragment_cookies {
  __typename: "ClientCookies";
  get: string | null;
}

export interface InitialAppDataFragment_serializedMe {
  __typename: "ClientSerializedMe";
  id: string | null;
  initials: string | null;
  name: string | null;
  avatar: string | null;
  authentication_token: string | null;
  is_premium: boolean | null;
  is_lifetime_premium: boolean | null;
  is_supporter: boolean | null;
  slug: string | null;
  hide_notification_count: boolean | null;
}

export interface InitialAppDataFragment_sharify {
  __typename: "ClientSharify";
  get: string | null;
  IS_SPIDER: boolean | null;
  IS_OUTSIDE_MAIN_ROUTER: boolean | null;
  THEME: string | null;
}

export interface InitialAppDataFragment {
  __typename: "Query";
  currentRoute: InitialAppDataFragment_currentRoute | null;
  loginStatus: InitialAppDataFragment_loginStatus | null;
  cookies: InitialAppDataFragment_cookies | null;
  serializedMe: InitialAppDataFragment_serializedMe | null;
  sharify: InitialAppDataFragment_sharify | null;
}
