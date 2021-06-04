/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CancelPremiumUserSelector
// ====================================================

export interface CancelPremiumUserSelector_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface CancelPremiumUserSelector {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  is_canceled: boolean | null;
  can: CancelPremiumUserSelector_can | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}
