/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChannelOwnerTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: initiateChannelTransferMutation
// ====================================================

export interface initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request_channel_can {
  __typename: "ChannelCan";
  transfer: boolean | null;
}

export interface initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request_channel_transfer_request_recipient_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request_channel_transfer_request_recipient_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request_channel_transfer_request_recipient = initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request_channel_transfer_request_recipient_User | initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request_channel_transfer_request_recipient_Group;

export interface initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request_channel_transfer_request {
  __typename: "ChannelTransferRequest";
  recipient: initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request_channel_transfer_request_recipient | null;
  is_recipient_member: boolean | null;
}

export interface initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request_channel {
  __typename: "Channel";
  id: number | null;
  can: initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request_channel_can | null;
  is_pending_transfer: boolean | null;
  transfer_request: initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request_channel_transfer_request | null;
  visibility: string | null;
}

export interface initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request {
  __typename: "ChannelTransferRequest";
  channel: initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request_channel | null;
}

export interface initiateChannelTransferMutation_initiate_channel_transfer {
  __typename: "InitiateChannelTransferPayload";
  channel_transfer_request: initiateChannelTransferMutation_initiate_channel_transfer_channel_transfer_request | null;
}

export interface initiateChannelTransferMutation {
  initiate_channel_transfer: initiateChannelTransferMutation_initiate_channel_transfer | null;
}

export interface initiateChannelTransferMutationVariables {
  channel_id: string;
  owner_id: string;
  owner_type: ChannelOwnerTypeEnum;
}
