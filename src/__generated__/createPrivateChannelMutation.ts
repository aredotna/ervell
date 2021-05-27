/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPrivateChannelMutation
// ====================================================

export interface createPrivateChannelMutation_create_channel_channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface createPrivateChannelMutation_create_channel_channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type createPrivateChannelMutation_create_channel_channel_owner = createPrivateChannelMutation_create_channel_channel_owner_Group | createPrivateChannelMutation_create_channel_channel_owner_User;

export interface createPrivateChannelMutation_create_channel_channel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  visibility: string | null;
  owner: createPrivateChannelMutation_create_channel_channel_owner | null;
}

export interface createPrivateChannelMutation_create_channel {
  __typename: "CreateChannelPayload";
  /**
   * A unique identifier for the client performing the mutation.
   */
  clientMutationId: string | null;
  channel: createPrivateChannelMutation_create_channel_channel | null;
}

export interface createPrivateChannelMutation {
  create_channel: createPrivateChannelMutation_create_channel | null;
}

export interface createPrivateChannelMutationVariables {
  title: string;
}
