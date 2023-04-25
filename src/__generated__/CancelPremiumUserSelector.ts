/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CancelPremiumUserSelector
// ====================================================

export interface CancelPremiumUserSelector_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface CancelPremiumUserSelector {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: CancelPremiumUserSelector_can;
  href: string;
  initials: string;
  avatar: string | null;
}
