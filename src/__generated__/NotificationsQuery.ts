/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NotificationsQuery
// ====================================================

export interface NotificationsQuery_me_feed_notifications_owner_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface NotificationsQuery_me_feed_notifications_owner_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  href: string | null;
}

export type NotificationsQuery_me_feed_notifications_owner = NotificationsQuery_me_feed_notifications_owner_User | NotificationsQuery_me_feed_notifications_owner_Group;

export interface NotificationsQuery_me_feed_notifications_item_Null {
  __typename: "Null";
}

export interface NotificationsQuery_me_feed_notifications_item_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface NotificationsQuery_me_feed_notifications_item_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type NotificationsQuery_me_feed_notifications_item_Channel_owner = NotificationsQuery_me_feed_notifications_item_Channel_owner_User | NotificationsQuery_me_feed_notifications_item_Channel_owner_Group;

export interface NotificationsQuery_me_feed_notifications_item_Channel {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
  visibility: string | null;
  owner: NotificationsQuery_me_feed_notifications_item_Channel_owner | null;
}

export interface NotificationsQuery_me_feed_notifications_item_Connectable {
  __typename: "Connectable";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface NotificationsQuery_me_feed_notifications_item_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
  is_me: boolean | null;
}

export interface NotificationsQuery_me_feed_notifications_item_Comment {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  href: string | null;
}

export interface NotificationsQuery_me_feed_notifications_item_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  href: string | null;
}

export type NotificationsQuery_me_feed_notifications_item = NotificationsQuery_me_feed_notifications_item_Null | NotificationsQuery_me_feed_notifications_item_Channel | NotificationsQuery_me_feed_notifications_item_Connectable | NotificationsQuery_me_feed_notifications_item_User | NotificationsQuery_me_feed_notifications_item_Comment | NotificationsQuery_me_feed_notifications_item_Group;

export interface NotificationsQuery_me_feed_notifications_target_Null {
  __typename: "Null";
}

export interface NotificationsQuery_me_feed_notifications_target_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface NotificationsQuery_me_feed_notifications_target_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type NotificationsQuery_me_feed_notifications_target_Channel_owner = NotificationsQuery_me_feed_notifications_target_Channel_owner_User | NotificationsQuery_me_feed_notifications_target_Channel_owner_Group;

export interface NotificationsQuery_me_feed_notifications_target_Channel {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
  visibility: string | null;
  owner: NotificationsQuery_me_feed_notifications_target_Channel_owner | null;
}

export interface NotificationsQuery_me_feed_notifications_target_Connectable {
  __typename: "Connectable";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface NotificationsQuery_me_feed_notifications_target_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
  is_me: boolean | null;
}

export interface NotificationsQuery_me_feed_notifications_target_Comment {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  href: string | null;
}

export interface NotificationsQuery_me_feed_notifications_target_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  href: string | null;
}

export type NotificationsQuery_me_feed_notifications_target = NotificationsQuery_me_feed_notifications_target_Null | NotificationsQuery_me_feed_notifications_target_Channel | NotificationsQuery_me_feed_notifications_target_Connectable | NotificationsQuery_me_feed_notifications_target_User | NotificationsQuery_me_feed_notifications_target_Comment | NotificationsQuery_me_feed_notifications_target_Group;

export interface NotificationsQuery_me_feed_notifications {
  __typename: "Deed";
  id: number | null;
  is_read: boolean | null;
  owner: NotificationsQuery_me_feed_notifications_owner | null;
  action: string | null;
  item: NotificationsQuery_me_feed_notifications_item | null;
  item_title: string | null;
  connector: string | null;
  target: NotificationsQuery_me_feed_notifications_target | null;
  created_at: string | null;
}

export interface NotificationsQuery_me_feed {
  __typename: "Feed";
  notifications: (NotificationsQuery_me_feed_notifications | null)[] | null;
}

export interface NotificationsQuery_me_counts {
  __typename: "MeCounts";
  notifications: number | null;
}

export interface NotificationsQuery_me {
  __typename: "Me";
  id: number | null;
  feed: NotificationsQuery_me_feed | null;
  counts: NotificationsQuery_me_counts | null;
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
