/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentRouteQuery
// ====================================================

export interface CurrentRouteQuery_currentRoute {
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

export interface CurrentRouteQuery {
  currentRoute: CurrentRouteQuery_currentRoute | null;
}
