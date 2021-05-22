/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlanSelection
// ====================================================

export interface PlanSelection_customer_plan {
  __typename: "Plan";
  id: string | null;
}

export interface PlanSelection_customer {
  __typename: "Customer";
  id: number | null;
  is_canceled: boolean | null;
  is_lifetime: boolean | null;
  can_select_lifetime: boolean | null;
  is_beneficiary: boolean | null;
  plan: PlanSelection_customer_plan | null;
}

export interface PlanSelection_counts {
  __typename: "MeCounts";
  private_connections: number | null;
  connections: number | null;
}

export interface PlanSelection {
  __typename: "Me";
  non_premium_private_connections_limit: number | null;
  non_premium_connections_limit: number | null;
  customer: PlanSelection_customer | null;
  id: number | null;
  counts: PlanSelection_counts | null;
}
