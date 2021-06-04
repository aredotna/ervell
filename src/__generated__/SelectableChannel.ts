/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SelectableChannel
// ====================================================

export interface SelectableChannel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  visibility: string | null;
}

export interface SelectableChannel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export type SelectableChannel_owner = SelectableChannel_owner_Group | SelectableChannel_owner_User;

export interface SelectableChannel {
  __typename: "Channel";
  id: number | null;
  title: string | null;
  visibility: string | null;
  owner: SelectableChannel_owner | null;
}
