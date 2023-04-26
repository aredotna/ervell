/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TransferChannel
// ====================================================

export interface TransferChannel_can {
  __typename: "ChannelCan";
  transfer: boolean;
}

export interface TransferChannel_transfer_request_recipient_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface TransferChannel_transfer_request_recipient_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type TransferChannel_transfer_request_recipient = TransferChannel_transfer_request_recipient_User | TransferChannel_transfer_request_recipient_Group;

export interface TransferChannel_transfer_request {
  __typename: "ChannelTransferRequest";
  recipient: TransferChannel_transfer_request_recipient;
  is_recipient_member: boolean;
}

export interface TransferChannel {
  __typename: "Channel";
  id: number;
  can: TransferChannel_can;
  is_pending_transfer: boolean;
  transfer_request: TransferChannel_transfer_request | null;
  visibility: string;
}
