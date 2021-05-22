/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelVisibility } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createChannelMutation
// ====================================================

export interface createChannelMutation_create_channel_channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
}

export interface createChannelMutation_create_channel {
  __typename: "CreateChannelPayload";
  channel: createChannelMutation_create_channel_channel | null;
}

export interface createChannelMutation {
  create_channel: createChannelMutation_create_channel | null;
}

export interface createChannelMutationVariables {
  title: string;
  description?: string | null;
  visibility?: ChannelVisibility | null;
  group_id?: string | null;
}
