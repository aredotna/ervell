/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Plans
// ====================================================

export interface Plans_plans {
  __typename: "Plan";
  id: string;
  /**
   * USD cents
   */
  amount: number | null;
}

export interface Plans {
  plans: Plans_plans[] | null;
}
