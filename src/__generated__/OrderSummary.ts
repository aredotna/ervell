/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SupportedPlanEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: OrderSummary
// ====================================================

export interface OrderSummary_me_customer_upcoming_invoice_discount_coupon {
  __typename: "Coupon";
  id: string | null;
  description: string | null;
}

export interface OrderSummary_me_customer_upcoming_invoice_discount {
  __typename: "Discount";
  id: string | null;
  coupon: OrderSummary_me_customer_upcoming_invoice_discount_coupon | null;
}

export interface OrderSummary_me_customer_upcoming_invoice_tax_rate {
  __typename: "TaxRate";
  percentage: number | null;
  jurisdiction: string | null;
}

export interface OrderSummary_me_customer_upcoming_invoice {
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
  discount: OrderSummary_me_customer_upcoming_invoice_discount | null;
  tax_rate: OrderSummary_me_customer_upcoming_invoice_tax_rate | null;
}

export interface OrderSummary_me_customer {
  __typename: "Customer";
  upcoming_invoice: OrderSummary_me_customer_upcoming_invoice | null;
}

export interface OrderSummary_me {
  __typename: "Me";
  customer: OrderSummary_me_customer | null;
}

export interface OrderSummary {
  /**
   * The current logged in user
   */
  me: OrderSummary_me | null;
}

export interface OrderSummaryVariables {
  plan_id?: SupportedPlanEnum | null;
  coupon_code?: string | null;
}
