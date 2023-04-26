/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AddBlock
// ====================================================

export interface AddBlock_can {
  __typename: "ChannelCan";
  add_to: boolean;
  add_to_as_premium: boolean;
}

export interface AddBlock {
  __typename: "Channel";
  can: AddBlock_can;
  visibility: string;
}
