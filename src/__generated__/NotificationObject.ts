/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: NotificationObject
// ====================================================

export interface NotificationObject_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface NotificationObject_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type NotificationObject_Channel_owner = NotificationObject_Channel_owner_User | NotificationObject_Channel_owner_Group;

export interface NotificationObject_Channel {
  __typename: "Channel";
  id: number;
  label: string;
  href: string | null;
  visibility: string;
  owner: NotificationObject_Channel_owner;
}

export interface NotificationObject_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string | null;
}

export interface NotificationObject_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string | null;
}

export interface NotificationObject_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string | null;
}

export interface NotificationObject_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string | null;
}

export interface NotificationObject_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string | null;
}

export interface NotificationObject_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string | null;
}

export interface NotificationObject_User {
  __typename: "User";
  id: number;
  label: string;
  href: string | null;
  is_me: boolean | null;
}

export interface NotificationObject_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string | null;
}

export interface NotificationObject_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string | null;
}

export type NotificationObject = NotificationObject_Channel | NotificationObject_Connectable | NotificationObject_Attachment | NotificationObject_Embed | NotificationObject_Text | NotificationObject_Image | NotificationObject_Link | NotificationObject_User | NotificationObject_Comment | NotificationObject_Group;
