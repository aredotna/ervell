/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createUserMessageChannelMutation
// ====================================================

export interface createUserMessageChannelMutation_create_user_message_channel_channel {
  __typename: "Channel";
  href: string;
}

export interface createUserMessageChannelMutation_create_user_message_channel {
  __typename: "CreateUserMessageChannelMutationPayload";
  channel: createUserMessageChannelMutation_create_user_message_channel_channel;
}

export interface createUserMessageChannelMutation {
  create_user_message_channel: createUserMessageChannelMutation_create_user_message_channel | null;
}

export interface createUserMessageChannelMutationVariables {
  id: string;
}
