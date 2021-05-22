/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MemberAvatar
// ====================================================

export interface MemberAvatar_User {
  __typename: "User";
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface MemberAvatar_Group {
  __typename: "Group";
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export type MemberAvatar = MemberAvatar_User | MemberAvatar_Group;
