/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PremiumPlans
// ====================================================

export interface PremiumPlans_plans {
  __typename: "Plan";
  id: string;
  /**
   * USD cents
   */
  amount: number | null;
}

export interface PremiumPlans {
  plans: PremiumPlans_plans[] | null;
}
