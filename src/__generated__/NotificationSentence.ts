/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NotificationSentence
// ====================================================

export interface NotificationSentence_owner_User {
  __typename: "User";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_owner_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string;
}

export type NotificationSentence_owner = NotificationSentence_owner_User | NotificationSentence_owner_Group;

export interface NotificationSentence_item_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface NotificationSentence_item_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type NotificationSentence_item_Channel_owner = NotificationSentence_item_Channel_owner_User | NotificationSentence_item_Channel_owner_Group;

export interface NotificationSentence_item_Channel {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  visibility: string;
  owner: NotificationSentence_item_Channel_owner;
}

export interface NotificationSentence_item_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_item_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_item_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_item_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_item_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_item_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_item_User {
  __typename: "User";
  id: number;
  label: string;
  href: string;
  is_me: boolean;
}

export interface NotificationSentence_item_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string;
}

export interface NotificationSentence_item_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string;
}

export type NotificationSentence_item = NotificationSentence_item_Channel | NotificationSentence_item_Connectable | NotificationSentence_item_Attachment | NotificationSentence_item_Embed | NotificationSentence_item_Text | NotificationSentence_item_Image | NotificationSentence_item_Link | NotificationSentence_item_User | NotificationSentence_item_Comment | NotificationSentence_item_Group;

export interface NotificationSentence_target_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface NotificationSentence_target_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type NotificationSentence_target_Channel_owner = NotificationSentence_target_Channel_owner_User | NotificationSentence_target_Channel_owner_Group;

export interface NotificationSentence_target_Channel {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  visibility: string;
  owner: NotificationSentence_target_Channel_owner;
}

export interface NotificationSentence_target_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_target_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_target_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_target_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_target_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_target_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string;
}

export interface NotificationSentence_target_User {
  __typename: "User";
  id: number;
  label: string;
  href: string;
  is_me: boolean;
}

export interface NotificationSentence_target_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string;
}

export interface NotificationSentence_target_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string;
}

export type NotificationSentence_target = NotificationSentence_target_Channel | NotificationSentence_target_Connectable | NotificationSentence_target_Attachment | NotificationSentence_target_Embed | NotificationSentence_target_Text | NotificationSentence_target_Image | NotificationSentence_target_Link | NotificationSentence_target_User | NotificationSentence_target_Comment | NotificationSentence_target_Group;

export interface NotificationSentence {
  __typename: "Deed";
  id: number;
  is_read: boolean;
  owner: NotificationSentence_owner;
  action: string;
  item: NotificationSentence_item;
  item_title: string | null;
  connector: string | null;
  target: NotificationSentence_target | null;
  created_at: string;
}
