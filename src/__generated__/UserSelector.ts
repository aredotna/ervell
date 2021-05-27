/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserSelector
// ====================================================

export interface UserSelector_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface UserSelector {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  is_canceled: boolean | null;
  is_upgradeable: boolean | null;
  is_approaching_either_connections_limit: boolean | null;
  is_exceeding_either_connections_limit: boolean | null;
  can: UserSelector_can | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}
