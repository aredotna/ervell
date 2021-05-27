/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PrivateBlocksMeter
// ====================================================

export interface PrivateBlocksMeter_counts {
  __typename: "MeCounts";
  private_connections: number | null;
}

export interface PrivateBlocksMeter {
  __typename: "Me";
  id: number | null;
  counts: PrivateBlocksMeter_counts | null;
  non_premium_private_connections_limit: number | null;
}
