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
  destroy: boolean | null;
  export: boolean | null;
  transfer: boolean | null;
}

export interface updateChannelMutation_update_channel_channel_user {
  __typename: "User";
  id: number | null;
}

export interface updateChannelMutation_update_channel_channel_owner_User {
  __typename: "User";
  id: number | null;
}

export interface updateChannelMutation_update_channel_channel_owner_Group {
  __typename: "Group";
  id: number | null;
}

export type updateChannelMutation_update_channel_channel_owner = updateChannelMutation_update_channel_channel_owner_User | updateChannelMutation_update_channel_channel_owner_Group;

export interface updateChannelMutation_update_channel_channel_transfer_request_recipient_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface updateChannelMutation_update_channel_channel_transfer_request_recipient_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type updateChannelMutation_update_channel_channel_transfer_request_recipient = updateChannelMutation_update_channel_channel_transfer_request_recipient_User | updateChannelMutation_update_channel_channel_transfer_request_recipient_Group;

export interface updateChannelMutation_update_channel_channel_transfer_request {
  __typename: "ChannelTransferRequest";
  recipient: updateChannelMutation_update_channel_channel_transfer_request_recipient | null;
  is_recipient_member: boolean | null;
}

export interface updateChannelMutation_update_channel_channel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  title: string | null;
  description: string | null;
  visibility: string | null;
  content_flag: string | null;
  can: updateChannelMutation_update_channel_channel_can | null;
  user: updateChannelMutation_update_channel_channel_user | null;
  owner: updateChannelMutation_update_channel_channel_owner | null;
  is_pending_transfer: boolean | null;
  transfer_request: updateChannelMutation_update_channel_channel_transfer_request | null;
}

export interface updateChannelMutation_update_channel {
  __typename: "UpdateChannelPayload";
  channel: updateChannelMutation_update_channel_channel | null;
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
