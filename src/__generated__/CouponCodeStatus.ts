/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CouponCodeStatus
// ====================================================

export interface CouponCodeStatus_coupon {
  __typename: "Coupon";
  id: string | null;
  description: string | null;
  is_valid: boolean | null;
}

export interface CouponCodeStatus {
  coupon: CouponCodeStatus_coupon | null;
}

export interface CouponCodeStatusVariables {
  code: string;
}
