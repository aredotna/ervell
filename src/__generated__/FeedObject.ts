/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedObject
// ====================================================

export interface FeedObject_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface FeedObject_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
}

export type FeedObject_Channel_owner = FeedObject_Channel_owner_User | FeedObject_Channel_owner_Group;

export interface FeedObject_Channel {
  __typename: "Channel";
  id: number;
  truncatedTitle: string;
  href: string;
  visibility: string;
  label: string;
  owner: FeedObject_Channel_owner;
}

export interface FeedObject_User {
  __typename: "User";
  id: number;
  label: string;
  name: string;
  href: string;
}

export interface FeedObject_Connectable {
  __typename: "Connectable";
  id: number;
  label: string;
  href: string;
}

export interface FeedObject_Attachment {
  __typename: "Attachment";
  id: number;
  label: string;
  href: string;
}

export interface FeedObject_Embed {
  __typename: "Embed";
  id: number;
  label: string;
  href: string;
}

export interface FeedObject_Text {
  __typename: "Text";
  id: number;
  label: string;
  href: string;
}

export interface FeedObject_Image {
  __typename: "Image";
  id: number;
  label: string;
  href: string;
}

export interface FeedObject_Link {
  __typename: "Link";
  id: number;
  label: string;
  href: string;
}

export interface FeedObject_Comment {
  __typename: "Comment";
  id: number;
  body: string | null;
  href: string;
}

export interface FeedObject_Group {
  __typename: "Group";
  id: number;
  label: string;
  name: string;
  href: string;
}

export type FeedObject = FeedObject_Channel | FeedObject_User | FeedObject_Connectable | FeedObject_Attachment | FeedObject_Embed | FeedObject_Text | FeedObject_Image | FeedObject_Link | FeedObject_Comment | FeedObject_Group;
