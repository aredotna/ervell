/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createPrivateChannelMutation
// ====================================================

export interface createPrivateChannelMutation_create_channel_channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface createPrivateChannelMutation_create_channel_channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type createPrivateChannelMutation_create_channel_channel_owner = createPrivateChannelMutation_create_channel_channel_owner_Group | createPrivateChannelMutation_create_channel_channel_owner_User;

export interface createPrivateChannelMutation_create_channel_channel {
  __typename: "Channel";
  id: number;
  title: string;
  visibility: string;
  owner: createPrivateChannelMutation_create_channel_channel_owner;
}

export interface createPrivateChannelMutation_create_channel {
  __typename: "CreateChannelPayload";
  /**
   * A unique identifier for the client performing the mutation.
   */
  clientMutationId: string | null;
  channel: createPrivateChannelMutation_create_channel_channel;
}

export interface createPrivateChannelMutation {
  create_channel: createPrivateChannelMutation_create_channel | null;
}

export interface createPrivateChannelMutationVariables {
  title: string;
}
