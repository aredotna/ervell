/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SupportedPlanEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GroupPlanChanges
// ====================================================

export interface GroupPlanChanges_group_invoice {
  __typename: "Invoice";
  /**
   * USD cents
   */
  subtotal: number | null;
  /**
   * USD cents
   */
  total: number | null;
  /**
   * Can be `null` in cases where there is a manually sent invoice
   */
  next_payment_attempt_at: string | null;
}

export interface GroupPlanChanges_group {
  __typename: "Group";
  id: number | null;
  invoice: GroupPlanChanges_group_invoice | null;
}

export interface GroupPlanChanges {
  group: GroupPlanChanges_group | null;
}

export interface GroupPlanChangesVariables {
  group_id: string;
  plan_id: SupportedPlanEnum;
  quantity: number;
  coupon_code?: string | null;
}
