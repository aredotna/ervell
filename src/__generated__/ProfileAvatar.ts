/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileAvatar
// ====================================================

export interface ProfileAvatar_User {
  __typename: "User";
}

export interface ProfileAvatar_Group_can {
  __typename: "GroupCan";
  update: boolean | null;
}

export interface ProfileAvatar_Group {
  __typename: "Group";
  id: number | null;
  avatar: string | null;
  can: ProfileAvatar_Group_can | null;
}

export type ProfileAvatar = ProfileAvatar_User | ProfileAvatar_Group;
