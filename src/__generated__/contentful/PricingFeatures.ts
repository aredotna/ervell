/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PricingFeatures
// ====================================================

export interface PricingFeatures_planFeaturesCollection_items {
  __typename: "PlanFeatures";
  feature: string | null;
}

export interface PricingFeatures_planFeaturesCollection {
  __typename: "PlanFeaturesCollection";
  items: (PricingFeatures_planFeaturesCollection_items | null)[];
}

export interface PricingFeatures {
  planFeaturesCollection: PricingFeatures_planFeaturesCollection | null;
}
