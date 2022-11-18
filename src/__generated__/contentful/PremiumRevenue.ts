/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PremiumRevenue
// ====================================================

export interface PremiumRevenue_roadmap_sys {
  __typename: "Sys";
  id: string;
}

export interface PremiumRevenue_roadmap {
  __typename: "Roadmap";
  sys: PremiumRevenue_roadmap_sys;
  rawMrr: string | null;
}

export interface PremiumRevenue {
  roadmap: PremiumRevenue_roadmap | null;
}
