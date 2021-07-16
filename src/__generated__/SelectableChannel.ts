/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SelectableChannel
// ====================================================

export interface SelectableChannel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface SelectableChannel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type SelectableChannel_owner = SelectableChannel_owner_Group | SelectableChannel_owner_User;

export interface SelectableChannel {
  __typename: "Channel";
  id: number;
  title: string;
  visibility: string;
  owner: SelectableChannel_owner;
}
