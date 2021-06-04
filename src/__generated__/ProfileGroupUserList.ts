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
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface ProfileGroupUserList_Group_users {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface ProfileGroupUserList_Group_can {
  __typename: "GroupCan";
  manage_users: boolean | null;
}

export interface ProfileGroupUserList_Group {
  __typename: "Group";
  id: number | null;
  user: ProfileGroupUserList_Group_user | null;
  users: (ProfileGroupUserList_Group_users | null)[] | null;
  can: ProfileGroupUserList_Group_can | null;
}

export type ProfileGroupUserList = ProfileGroupUserList_User | ProfileGroupUserList_Group;
