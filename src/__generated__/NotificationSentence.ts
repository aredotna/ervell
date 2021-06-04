/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NotificationSentence
// ====================================================

export interface NotificationSentence_owner_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface NotificationSentence_owner_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  href: string | null;
}

export type NotificationSentence_owner = NotificationSentence_owner_User | NotificationSentence_owner_Group;

export interface NotificationSentence_item_Null {
  __typename: "Null";
}

export interface NotificationSentence_item_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface NotificationSentence_item_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type NotificationSentence_item_Channel_owner = NotificationSentence_item_Channel_owner_User | NotificationSentence_item_Channel_owner_Group;

export interface NotificationSentence_item_Channel {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
  visibility: string | null;
  owner: NotificationSentence_item_Channel_owner | null;
}

export interface NotificationSentence_item_Connectable {
  __typename: "Connectable";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface NotificationSentence_item_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
  is_me: boolean | null;
}

export interface NotificationSentence_item_Comment {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  href: string | null;
}

export interface NotificationSentence_item_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  href: string | null;
}

export type NotificationSentence_item = NotificationSentence_item_Null | NotificationSentence_item_Channel | NotificationSentence_item_Connectable | NotificationSentence_item_User | NotificationSentence_item_Comment | NotificationSentence_item_Group;

export interface NotificationSentence_target_Null {
  __typename: "Null";
}

export interface NotificationSentence_target_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface NotificationSentence_target_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type NotificationSentence_target_Channel_owner = NotificationSentence_target_Channel_owner_User | NotificationSentence_target_Channel_owner_Group;

export interface NotificationSentence_target_Channel {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
  visibility: string | null;
  owner: NotificationSentence_target_Channel_owner | null;
}

export interface NotificationSentence_target_Connectable {
  __typename: "Connectable";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface NotificationSentence_target_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
  is_me: boolean | null;
}

export interface NotificationSentence_target_Comment {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  href: string | null;
}

export interface NotificationSentence_target_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  href: string | null;
}

export type NotificationSentence_target = NotificationSentence_target_Null | NotificationSentence_target_Channel | NotificationSentence_target_Connectable | NotificationSentence_target_User | NotificationSentence_target_Comment | NotificationSentence_target_Group;

export interface NotificationSentence {
  __typename: "Deed";
  id: number | null;
  is_read: boolean | null;
  owner: NotificationSentence_owner | null;
  action: string | null;
  item: NotificationSentence_item | null;
  item_title: string | null;
  connector: string | null;
  target: NotificationSentence_target | null;
  created_at: string | null;
}
