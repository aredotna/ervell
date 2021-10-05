/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlanSelection
// ====================================================

export interface PlanSelection_customer_plan {
  __typename: "Plan";
  id: string;
}

export interface PlanSelection_customer {
  __typename: "Customer";
  id: number;
  is_canceled: boolean;
  is_lifetime: boolean;
  can_select_lifetime: boolean;
  is_beneficiary: boolean;
  plan: PlanSelection_customer_plan | null;
}

export interface PlanSelection_counts {
  __typename: "MeCounts";
  connections: number | null;
}

export interface PlanSelection {
  __typename: "Me";
  non_premium_private_connections_limit: number | null;
  non_premium_connections_limit: number | null;
  customer: PlanSelection_customer | null;
  id: number;
  counts: PlanSelection_counts | null;
}
