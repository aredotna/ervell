/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CanConnectBlockQuery
// ====================================================

export interface CanConnectBlockQuery_connectable_Text_can {
  __typename: "BlockCan";
  connect: boolean | null;
}

export interface CanConnectBlockQuery_connectable_Text {
  __typename: "Text" | "Image" | "Link" | "Embed" | "Attachment" | "PendingBlock";
  id: number | null;
  can: CanConnectBlockQuery_connectable_Text_can | null;
}

export interface CanConnectBlockQuery_connectable_Channel_can {
  __typename: "ChannelCan";
  connect: boolean | null;
}

export interface CanConnectBlockQuery_connectable_Channel {
  __typename: "Channel";
  id: number | null;
  can: CanConnectBlockQuery_connectable_Channel_can | null;
}

export type CanConnectBlockQuery_connectable = CanConnectBlockQuery_connectable_Text | CanConnectBlockQuery_connectable_Channel;

export interface CanConnectBlockQuery {
  connectable: CanConnectBlockQuery_connectable | null;
}

export interface CanConnectBlockQueryVariables {
  id: string;
}
