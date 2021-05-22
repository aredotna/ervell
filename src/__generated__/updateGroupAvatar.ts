/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateGroupAvatar
// ====================================================

export interface updateGroupAvatar_update_group_group {
  __typename: "Group";
  id: number | null;
  avatar: string | null;
}

export interface updateGroupAvatar_update_group {
  __typename: "UpdateGroupPayload";
  group: updateGroupAvatar_update_group_group | null;
}

export interface updateGroupAvatar {
  update_group: updateGroupAvatar_update_group | null;
}

export interface updateGroupAvatarVariables {
  id: string;
  avatar_url: string;
}
