/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedGroupSentence
// ====================================================

export interface FeedGroupSentence_user {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string | null;
}

export interface FeedGroupSentence_owner_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string | null;
}

export interface FeedGroupSentence_owner_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string | null;
  name: string;
}

export type FeedGroupSentence_owner = FeedGroupSentence_owner_User | FeedGroupSentence_owner_Group;

export interface FeedGroupSentence_item_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroupSentence_item_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type FeedGroupSentence_item_Channel_owner = FeedGroupSentence_item_Channel_owner_User | FeedGroupSentence_item_Channel_owner_Group;

export interface FeedGroupSentence_item_Channel {
  __typename: "Channel";
  id: number;
  truncatedTitle: string;
  href: string | null;
  visibility: string;
  label: string;
  owner: FeedGroupSentence_item_Channel_owner;
}

export interface FeedGroupSentence_item_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string | null;
}

export interface FeedGroupSentence_item_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroupSentence_item_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroupSentence_item_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroupSentence_item_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroupSentence_item_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroupSentence_item_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroupSentence_item_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string | null;
}

export interface FeedGroupSentence_item_Group {
  __typename: "Group";
  id: number;
  label: string;
  name: string;
  href: string | null;
}

export type FeedGroupSentence_item = FeedGroupSentence_item_Channel | FeedGroupSentence_item_User | FeedGroupSentence_item_Connectable | FeedGroupSentence_item_Attachment | FeedGroupSentence_item_Embed | FeedGroupSentence_item_Text | FeedGroupSentence_item_Image | FeedGroupSentence_item_Link | FeedGroupSentence_item_Comment | FeedGroupSentence_item_Group;

export interface FeedGroupSentence_target_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedGroupSentence_target_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type FeedGroupSentence_target_Channel_owner = FeedGroupSentence_target_Channel_owner_User | FeedGroupSentence_target_Channel_owner_Group;

export interface FeedGroupSentence_target_Channel {
  __typename: "Channel";
  id: number;
  truncatedTitle: string;
  href: string | null;
  visibility: string;
  label: string;
  owner: FeedGroupSentence_target_Channel_owner;
}

export interface FeedGroupSentence_target_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string | null;
}

export interface FeedGroupSentence_target_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroupSentence_target_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroupSentence_target_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroupSentence_target_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroupSentence_target_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroupSentence_target_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string | null;
}

export interface FeedGroupSentence_target_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string | null;
}

export interface FeedGroupSentence_target_Group {
  __typename: "Group";
  id: number;
  label: string;
  name: string;
  href: string | null;
}

export type FeedGroupSentence_target = FeedGroupSentence_target_Channel | FeedGroupSentence_target_User | FeedGroupSentence_target_Connectable | FeedGroupSentence_target_Attachment | FeedGroupSentence_target_Embed | FeedGroupSentence_target_Text | FeedGroupSentence_target_Image | FeedGroupSentence_target_Link | FeedGroupSentence_target_Comment | FeedGroupSentence_target_Group;

export interface FeedGroupSentence {
  __typename: "DeedGroup";
  id: string;
  key: string;
  length: number;
  user: FeedGroupSentence_user | null;
  owner: FeedGroupSentence_owner;
  action: string;
  item: FeedGroupSentence_item | null;
  item_phrase: string;
  connector: string | null;
  target: FeedGroupSentence_target | null;
  target_phrase: string;
  created_at: string | null;
  is_private: boolean;
}
