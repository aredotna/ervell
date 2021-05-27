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
  id: number | null;
}

export interface ManageChannel_owner_User {
  __typename: "User";
  id: number | null;
}

export interface ManageChannel_owner_Group {
  __typename: "Group";
  id: number | null;
}

export type ManageChannel_owner = ManageChannel_owner_User | ManageChannel_owner_Group;

export interface ManageChannel_transfer_request_recipient_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface ManageChannel_transfer_request_recipient_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type ManageChannel_transfer_request_recipient = ManageChannel_transfer_request_recipient_User | ManageChannel_transfer_request_recipient_Group;

export interface ManageChannel_transfer_request {
  __typename: "ChannelTransferRequest";
  recipient: ManageChannel_transfer_request_recipient | null;
  is_recipient_member: boolean | null;
}

export interface ManageChannel {
  __typename: "Channel";
  id: number | null;
  href: string | null;
  title: string | null;
  description: string | null;
  visibility: string | null;
  content_flag: string | null;
  can: ManageChannel_can | null;
  user: ManageChannel_user | null;
  owner: ManageChannel_owner | null;
  is_pending_transfer: boolean | null;
  transfer_request: ManageChannel_transfer_request | null;
}
