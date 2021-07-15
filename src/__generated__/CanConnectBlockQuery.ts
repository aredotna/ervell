/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CanConnectBlockQuery
// ====================================================

export interface CanConnectBlockQuery_connectable_Attachment_can {
  __typename: "BlockCan";
  connect: boolean | null;
}

export interface CanConnectBlockQuery_connectable_Attachment {
  __typename: "Attachment" | "Embed" | "Image" | "Link" | "PendingBlock" | "Text";
  id: number;
  can: CanConnectBlockQuery_connectable_Attachment_can | null;
}

export interface CanConnectBlockQuery_connectable_Channel_can {
  __typename: "ChannelCan";
  connect: boolean | null;
}

export interface CanConnectBlockQuery_connectable_Channel {
  __typename: "Channel";
  id: number;
  can: CanConnectBlockQuery_connectable_Channel_can | null;
}

export type CanConnectBlockQuery_connectable = CanConnectBlockQuery_connectable_Attachment | CanConnectBlockQuery_connectable_Channel;

export interface CanConnectBlockQuery {
  connectable: CanConnectBlockQuery_connectable | null;
}

export interface CanConnectBlockQueryVariables {
  id: string;
}
