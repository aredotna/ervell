/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserSelector
// ====================================================

export interface UserSelector_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface UserSelector {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  is_upgradeable: boolean;
  is_approaching_either_connections_limit: boolean;
  is_exceeding_either_connections_limit: boolean;
  can: UserSelector_can;
  href: string;
  initials: string;
  avatar: string | null;
}
