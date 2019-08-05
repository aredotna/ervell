/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FeedObject
// ====================================================

export interface FeedObject_Null {
  __typename: "Null";
}

export interface FeedObject_Channel {
  __typename: "Channel";
  id: number | null;
  label: string | null;
  href: string | null;
  visibility: string | null;
}

export interface FeedObject_Connectable {
  __typename: "Connectable";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface FeedObject_User {
  __typename: "User";
  id: number | null;
  label: string | null;
  href: string | null;
}

export interface FeedObject_Comment {
  __typename: "Comment";
  id: number | null;
  body: string | null;
  href: string | null;
}

export interface FeedObject_Group {
  __typename: "Group";
  id: number | null;
  label: string | null;
  href: string | null;
}

export type FeedObject = FeedObject_Null | FeedObject_Channel | FeedObject_Connectable | FeedObject_User | FeedObject_Comment | FeedObject_Group;
