/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CustomerCount
// ====================================================

export interface CustomerCount_roadmap_sys {
  __typename: "Sys";
  id: string;
}

export interface CustomerCount_roadmap {
  __typename: "Roadmap";
  sys: CustomerCount_roadmap_sys;
  statsRawCustomers: string | null;
}

export interface CustomerCount {
  roadmap: CustomerCount_roadmap | null;
}
