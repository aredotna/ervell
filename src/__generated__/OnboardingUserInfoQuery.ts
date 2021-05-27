/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OnboardingUserInfoQuery
// ====================================================

export interface OnboardingUserInfoQuery_me {
  __typename: "Me";
  slug: string | null;
}

export interface OnboardingUserInfoQuery {
  /**
   * The current logged in user
   */
  me: OnboardingUserInfoQuery_me | null;
}
