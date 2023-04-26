/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyGroupHeader
// ====================================================

export interface MyGroupHeader_user_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface MyGroupHeader_user {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: MyGroupHeader_user_can;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface MyGroupHeader_users_can {
  __typename: "UserCan";
  cancel_premium: boolean;
}

export interface MyGroupHeader_users {
  __typename: "User";
  id: number;
  name: string;
  hidden_email: string;
  is_premium: boolean;
  is_canceled: boolean;
  can: MyGroupHeader_users_can;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface MyGroupHeader {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  user: MyGroupHeader_user;
  users: MyGroupHeader_users[] | null;
}
