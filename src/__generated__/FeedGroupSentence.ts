/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedGroupSentence
// ====================================================

export interface FeedGroupSentence_user {
  __typename: "User";
  id: number | null;
  label: string | null;
  name: string | null;
  href: string | null;
}

export interface FeedGroupSentence_owner_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  name: string | null;
  href: string | null;
}

export interface FeedGroupSentence_owner_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  name: string | null;
}

export type FeedGroupSentence_owner = FeedGroupSentence_owner_User | FeedGroupSentence_owner_Group;

export interface FeedGroupSentence_item_Null {
  __typename: "Null";
}

export interface FeedGroupSentence_item_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupSentence_item_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type FeedGroupSentence_item_Channel_owner = FeedGroupSentence_item_Channel_owner_User | FeedGroupSentence_item_Channel_owner_Group;

export interface FeedGroupSentence_item_Channel {
  __typename: "Channel";
  id: number | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  label: string | null;
  owner: FeedGroupSentence_item_Channel_owner | null;
}

export interface FeedGroupSentence_item_Connectable {
  __typename: "Connectable";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface FeedGroupSentence_item_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  name: string | null;
  href: string | null;
}

export interface FeedGroupSentence_item_Comment {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  href: string | null;
}

export interface FeedGroupSentence_item_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  name: string | null;
  href: string | null;
}

export type FeedGroupSentence_item = FeedGroupSentence_item_Null | FeedGroupSentence_item_Channel | FeedGroupSentence_item_Connectable | FeedGroupSentence_item_User | FeedGroupSentence_item_Comment | FeedGroupSentence_item_Group;

export interface FeedGroupSentence_target_Null {
  __typename: "Null";
}

export interface FeedGroupSentence_target_Channel_owner_User {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface FeedGroupSentence_target_Channel_owner_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
}

export type FeedGroupSentence_target_Channel_owner = FeedGroupSentence_target_Channel_owner_User | FeedGroupSentence_target_Channel_owner_Group;

export interface FeedGroupSentence_target_Channel {
  __typename: "Channel";
  id: number | null;
  truncatedTitle: string | null;
  href: string | null;
  visibility: string | null;
  label: string | null;
  owner: FeedGroupSentence_target_Channel_owner | null;
}

export interface FeedGroupSentence_target_Connectable {
  __typename: "Connectable";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface FeedGroupSentence_target_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  name: string | null;
  href: string | null;
}

export interface FeedGroupSentence_target_Comment {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  href: string | null;
}

export interface FeedGroupSentence_target_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  name: string | null;
  href: string | null;
}

export type FeedGroupSentence_target = FeedGroupSentence_target_Null | FeedGroupSentence_target_Channel | FeedGroupSentence_target_Connectable | FeedGroupSentence_target_User | FeedGroupSentence_target_Comment | FeedGroupSentence_target_Group;

export interface FeedGroupSentence {
  __typename: "DeedGroup";
  id: string | null;
  key: string | null;
  length: number | null;
  user: FeedGroupSentence_user | null;
  owner: FeedGroupSentence_owner | null;
  action: string | null;
  item: FeedGroupSentence_item | null;
  item_phrase: string | null;
  connector: string | null;
  target: FeedGroupSentence_target | null;
  target_phrase: string | null;
  created_at: string | null;
  is_private: boolean | null;
}
