/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SupportedPlanEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GroupOrderSummary
// ====================================================

export interface GroupOrderSummary_group_invoice_discount_coupon {
  __typename: "Coupon";
  id: string | null;
  description: string | null;
}

export interface GroupOrderSummary_group_invoice_discount {
  __typename: "Discount";
  id: string | null;
  coupon: GroupOrderSummary_group_invoice_discount_coupon | null;
}

export interface GroupOrderSummary_group_invoice_tax_rate {
  __typename: "TaxRate";
  percentage: number | null;
  jurisdiction: string | null;
}

export interface GroupOrderSummary_group_invoice {
  __typename: "Invoice";
  /**
   * USD cents
   */
  subtotal: number | null;
  /**
   * USD cents
   */
  tax: number | null;
  /**
   * USD cents
   */
  total: number | null;
  /**
   * Dicsount applied to invoice
   */
  discount: GroupOrderSummary_group_invoice_discount | null;
  tax_rate: GroupOrderSummary_group_invoice_tax_rate | null;
}

export interface GroupOrderSummary_group {
  __typename: "Group";
  id: number;
  invoice: GroupOrderSummary_group_invoice | null;
}

export interface GroupOrderSummary {
  group: GroupOrderSummary_group | null;
}

export interface GroupOrderSummaryVariables {
  group_id: string;
  plan_id: SupportedPlanEnum;
  quantity: number;
  coupon_code?: string | null;
}
