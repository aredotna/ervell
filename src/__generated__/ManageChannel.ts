/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ManageChannel
// ====================================================

export interface ManageChannel_can {
  __typename: "ChannelCan";
  destroy: boolean | null;
  export: boolean | null;
  transfer: boolean | null;
}

export interface ManageChannel_user {
  __typename: "User";
  id: number;
}

export interface ManageChannel_owner_User {
  __typename: "User";
  id: number;
}

export interface ManageChannel_owner_Group {
  __typename: "Group";
  id: number;
}

export type ManageChannel_owner = ManageChannel_owner_User | ManageChannel_owner_Group;

export interface ManageChannel_transfer_request_recipient_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface ManageChannel_transfer_request_recipient_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type ManageChannel_transfer_request_recipient = ManageChannel_transfer_request_recipient_User | ManageChannel_transfer_request_recipient_Group;

export interface ManageChannel_transfer_request {
  __typename: "ChannelTransferRequest";
  recipient: ManageChannel_transfer_request_recipient;
  is_recipient_member: boolean | null;
}

export interface ManageChannel {
  __typename: "Channel";
  id: number;
  href: string | null;
  title: string;
  description: string | null;
  visibility: string;
  content_flag: string | null;
  can: ManageChannel_can | null;
  user: ManageChannel_user | null;
  owner: ManageChannel_owner;
  is_pending_transfer: boolean;
  transfer_request: ManageChannel_transfer_request | null;
}
