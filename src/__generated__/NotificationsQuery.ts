/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NotificationsQuery
// ====================================================

export interface NotificationsQuery_me_feed_notifications_owner_User {
  __typename: "User";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_owner_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string;
}

export type NotificationsQuery_me_feed_notifications_owner = NotificationsQuery_me_feed_notifications_owner_User | NotificationsQuery_me_feed_notifications_owner_Group;

export interface NotificationsQuery_me_feed_notifications_item_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface NotificationsQuery_me_feed_notifications_item_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type NotificationsQuery_me_feed_notifications_item_Channel_owner = NotificationsQuery_me_feed_notifications_item_Channel_owner_User | NotificationsQuery_me_feed_notifications_item_Channel_owner_Group;

export interface NotificationsQuery_me_feed_notifications_item_Channel {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  visibility: string;
  owner: NotificationsQuery_me_feed_notifications_item_Channel_owner;
}

export interface NotificationsQuery_me_feed_notifications_item_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_item_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_item_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_item_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_item_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_item_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_item_User {
  __typename: "User";
  id: number;
  label: string;
  href: string;
  is_me: boolean;
}

export interface NotificationsQuery_me_feed_notifications_item_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_item_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string;
}

export type NotificationsQuery_me_feed_notifications_item = NotificationsQuery_me_feed_notifications_item_Channel | NotificationsQuery_me_feed_notifications_item_Connectable | NotificationsQuery_me_feed_notifications_item_Attachment | NotificationsQuery_me_feed_notifications_item_Embed | NotificationsQuery_me_feed_notifications_item_Text | NotificationsQuery_me_feed_notifications_item_Image | NotificationsQuery_me_feed_notifications_item_Link | NotificationsQuery_me_feed_notifications_item_User | NotificationsQuery_me_feed_notifications_item_Comment | NotificationsQuery_me_feed_notifications_item_Group;

export interface NotificationsQuery_me_feed_notifications_target_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface NotificationsQuery_me_feed_notifications_target_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type NotificationsQuery_me_feed_notifications_target_Channel_owner = NotificationsQuery_me_feed_notifications_target_Channel_owner_User | NotificationsQuery_me_feed_notifications_target_Channel_owner_Group;

export interface NotificationsQuery_me_feed_notifications_target_Channel {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  visibility: string;
  owner: NotificationsQuery_me_feed_notifications_target_Channel_owner;
}

export interface NotificationsQuery_me_feed_notifications_target_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_target_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_target_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_target_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_target_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_target_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_target_User {
  __typename: "User";
  id: number;
  label: string;
  href: string;
  is_me: boolean;
}

export interface NotificationsQuery_me_feed_notifications_target_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string;
}

export interface NotificationsQuery_me_feed_notifications_target_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string;
}

export type NotificationsQuery_me_feed_notifications_target = NotificationsQuery_me_feed_notifications_target_Channel | NotificationsQuery_me_feed_notifications_target_Connectable | NotificationsQuery_me_feed_notifications_target_Attachment | NotificationsQuery_me_feed_notifications_target_Embed | NotificationsQuery_me_feed_notifications_target_Text | NotificationsQuery_me_feed_notifications_target_Image | NotificationsQuery_me_feed_notifications_target_Link | NotificationsQuery_me_feed_notifications_target_User | NotificationsQuery_me_feed_notifications_target_Comment | NotificationsQuery_me_feed_notifications_target_Group;

export interface NotificationsQuery_me_feed_notifications {
  __typename: "Deed";
  id: number;
  is_read: boolean;
  owner: NotificationsQuery_me_feed_notifications_owner;
  action: string;
  item: NotificationsQuery_me_feed_notifications_item;
  item_title: string;
  connector: string | null;
  target: NotificationsQuery_me_feed_notifications_target | null;
  created_at: string;
}

export interface NotificationsQuery_me_feed {
  __typename: "Feed";
  notifications: NotificationsQuery_me_feed_notifications[];
}

export interface NotificationsQuery_me_counts {
  __typename: "MeCounts";
  notifications: number;
}

export interface NotificationsQuery_me {
  __typename: "Me";
  id: number;
  feed: NotificationsQuery_me_feed | null;
  counts: NotificationsQuery_me_counts;
}

export interface NotificationsQuery {
  /**
   * The current logged in user
   */
  me: NotificationsQuery_me | null;
}

export interface NotificationsQueryVariables {
  offset?: number | null;
  limit?: number | null;
}
