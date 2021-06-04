/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createUserMessageChannelMutation
// ====================================================

export interface createUserMessageChannelMutation_create_user_message_channel_channel {
  __typename: "Channel";
  href: string | null;
}

export interface createUserMessageChannelMutation_create_user_message_channel {
  __typename: "CreateUserMessageChannelPayload";
  channel: createUserMessageChannelMutation_create_user_message_channel_channel | null;
}

export interface createUserMessageChannelMutation {
  create_user_message_channel: createUserMessageChannelMutation_create_user_message_channel | null;
}

export interface createUserMessageChannelMutationVariables {
  id: string;
}
