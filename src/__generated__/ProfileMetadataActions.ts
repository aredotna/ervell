/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileMetadataActions
// ====================================================

export interface ProfileMetadataActions_User_can {
  __typename: "UserCan";
  follow: boolean;
  manage: boolean;
  message: boolean;
}

export interface ProfileMetadataActions_User {
  __typename: "User";
  id: number;
  name: string;
  can: ProfileMetadataActions_User_can;
}

export interface ProfileMetadataActions_Group_can {
  __typename: "GroupCan";
  follow: boolean;
  manage: boolean;
  manage_users: boolean;
}

export interface ProfileMetadataActions_Group {
  __typename: "Group";
  id: number;
  /**
   * Are *any* users in the group upgradeable to Premium?
   */
  is_upgradeable: boolean;
  can: ProfileMetadataActions_Group_can;
}

export type ProfileMetadataActions = ProfileMetadataActions_User | ProfileMetadataActions_Group;
