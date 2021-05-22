/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NotificationObject
// ====================================================

export interface NotificationObject_Null {
  __typename: "Null";
}

export interface NotificationObject_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface NotificationObject_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type NotificationObject_Channel_owner = NotificationObject_Channel_owner_User | NotificationObject_Channel_owner_Group;

export interface NotificationObject_Channel {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
  visibility: string | null;
  owner: NotificationObject_Channel_owner | null;
}

export interface NotificationObject_Connectable {
  __typename: "Connectable";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface NotificationObject_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
  is_me: boolean | null;
}

export interface NotificationObject_Comment {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  href: string | null;
}

export interface NotificationObject_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  href: string | null;
}

export type NotificationObject = NotificationObject_Null | NotificationObject_Channel | NotificationObject_Connectable | NotificationObject_User | NotificationObject_Comment | NotificationObject_Group;
