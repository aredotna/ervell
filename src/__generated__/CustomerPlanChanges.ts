/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SupportedPlanEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: CustomerPlanChanges
// ====================================================

export interface CustomerPlanChanges_me_customer_invoice {
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

export interface CustomerPlanChanges_me_customer {
  __typename: "Customer";
  id: number | null;
  invoice: CustomerPlanChanges_me_customer_invoice | null;
}

export interface CustomerPlanChanges_me {
  __typename: "Me";
  id: number | null;
  customer: CustomerPlanChanges_me_customer | null;
}

export interface CustomerPlanChanges {
  /**
   * The current logged in user
   */
  me: CustomerPlanChanges_me | null;
}

export interface CustomerPlanChangesVariables {
  plan_id?: SupportedPlanEnum | null;
  coupon_code?: string | null;
}
