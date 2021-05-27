/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateAvatar
// ====================================================

export interface updateAvatar_update_account_me {
  __typename: "Me";
  id: number | null;
  avatar: string | null;
}

export interface updateAvatar_update_account {
  __typename: "UpdateAccountPayload";
  me: updateAvatar_update_account_me | null;
}

export interface updateAvatar {
  update_account: updateAvatar_update_account | null;
}

export interface updateAvatarVariables {
  avatar_url: string;
}
