/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelVisibility, ContentFlag, ChannelMemberInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateChannelMutation
// ====================================================

export interface updateChannelMutation_update_channel_channel_can {
  __typename: "ChannelCan";
  destroy: boolean;
  export: boolean;
  transfer: boolean;
}

export interface updateChannelMutation_update_channel_channel_user {
  __typename: "User";
  id: number;
}

export interface updateChannelMutation_update_channel_channel_owner_User {
  __typename: "User";
  id: number;
}

export interface updateChannelMutation_update_channel_channel_owner_Group {
  __typename: "Group";
  id: number;
}

export type updateChannelMutation_update_channel_channel_owner = updateChannelMutation_update_channel_channel_owner_User | updateChannelMutation_update_channel_channel_owner_Group;

export interface updateChannelMutation_update_channel_channel_transfer_request_recipient_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface updateChannelMutation_update_channel_channel_transfer_request_recipient_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type updateChannelMutation_update_channel_channel_transfer_request_recipient = updateChannelMutation_update_channel_channel_transfer_request_recipient_User | updateChannelMutation_update_channel_channel_transfer_request_recipient_Group;

export interface updateChannelMutation_update_channel_channel_transfer_request {
  __typename: "ChannelTransferRequest";
  recipient: updateChannelMutation_update_channel_channel_transfer_request_recipient;
  is_recipient_member: boolean;
}

export interface updateChannelMutation_update_channel_channel {
  __typename: "Channel";
  id: number;
  href: string;
  title: string;
  description: string | null;
  visibility: string;
  content_flag: string | null;
  can: updateChannelMutation_update_channel_channel_can;
  user: updateChannelMutation_update_channel_channel_user;
  owner: updateChannelMutation_update_channel_channel_owner;
  is_pending_transfer: boolean;
  transfer_request: updateChannelMutation_update_channel_channel_transfer_request | null;
}

export interface updateChannelMutation_update_channel {
  __typename: "UpdateChannelMutationPayload";
  channel: updateChannelMutation_update_channel_channel;
}

export interface updateChannelMutation {
  update_channel: updateChannelMutation_update_channel | null;
}

export interface updateChannelMutationVariables {
  id: string;
  title?: string | null;
  description?: string | null;
  visibility?: ChannelVisibility | null;
  content_flag?: ContentFlag | null;
  owner?: ChannelMemberInput | null;
}
