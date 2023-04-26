/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileGroupUserList
// ====================================================

export interface ProfileGroupUserList_User {
  __typename: "User";
}

export interface ProfileGroupUserList_Group_user {
  __typename: "User";
  id: number;
  label: string;
  href: string;
}

export interface ProfileGroupUserList_Group_users {
  __typename: "User";
  id: number;
  label: string;
  href: string;
}

export interface ProfileGroupUserList_Group_can {
  __typename: "GroupCan";
  manage_users: boolean;
}

export interface ProfileGroupUserList_Group {
  __typename: "Group";
  id: number;
  user: ProfileGroupUserList_Group_user;
  users: ProfileGroupUserList_Group_users[] | null;
  can: ProfileGroupUserList_Group_can;
}

export type ProfileGroupUserList = ProfileGroupUserList_User | ProfileGroupUserList_Group;
