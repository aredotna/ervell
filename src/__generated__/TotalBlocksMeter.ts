/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TotalBlocksMeter
// ====================================================

export interface TotalBlocksMeter_counts {
  __typename: "MeCounts";
  connections: number | null;
}

export interface TotalBlocksMeter {
  __typename: "Me";
  id: number | null;
  counts: TotalBlocksMeter_counts | null;
  non_premium_connections_limit: number | null;
}
