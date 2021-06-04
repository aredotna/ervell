/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MyGroupHeader
// ====================================================

export interface MyGroupHeader_user_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface MyGroupHeader_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  is_canceled: boolean | null;
  can: MyGroupHeader_user_can | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface MyGroupHeader_users_can {
  __typename: "UserCan";
  cancel_premium: boolean | null;
}

export interface MyGroupHeader_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  hidden_email: string | null;
  is_premium: boolean | null;
  is_canceled: boolean | null;
  can: MyGroupHeader_users_can | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface MyGroupHeader {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  user: MyGroupHeader_user | null;
  users: (MyGroupHeader_users | null)[] | null;
}
