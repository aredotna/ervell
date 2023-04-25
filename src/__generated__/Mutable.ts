/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Mutable
// ====================================================

export interface Mutable_Channel {
  __typename: "Channel";
  id: number;
  is_muted: boolean;
}

export interface Mutable_Connectable {
  __typename: "Connectable";
  id: number;
  is_muted: boolean;
}

export interface Mutable_User {
  __typename: "User";
  id: number;
  is_muted: boolean;
}

export type Mutable = Mutable_Channel | Mutable_Connectable | Mutable_User;
