/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileMetadataActions
// ====================================================

export interface ProfileMetadataActions_User_can {
  __typename: "UserCan";
  follow: boolean | null;
  manage: boolean | null;
  message: boolean | null;
}

export interface ProfileMetadataActions_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  can: ProfileMetadataActions_User_can | null;
}

export interface ProfileMetadataActions_Group_can {
  __typename: "GroupCan";
  follow: boolean | null;
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ProfileMetadataActions_Group {
  __typename: "Group";
  id: number | null;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean | null;
  can: ProfileMetadataActions_Group_can | null;
}

export type ProfileMetadataActions = ProfileMetadataActions_User | ProfileMetadataActions_Group;
