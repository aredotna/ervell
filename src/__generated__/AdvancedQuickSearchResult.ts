/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AdvancedQuickSearchResult
// ====================================================

export interface AdvancedQuickSearchResult_User {
  __typename: "User";
  id: number;
  label: string;
  href: string;
}

export interface AdvancedQuickSearchResult_Group {
  __typename: "Group";
  id: number;
  label: string;
  href: string;
  visibility: string;
}

export interface AdvancedQuickSearchResult_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResult_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export type AdvancedQuickSearchResult_Channel_owner = AdvancedQuickSearchResult_Channel_owner_User | AdvancedQuickSearchResult_Channel_owner_Group;

export interface AdvancedQuickSearchResult_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResult_Channel {
  __typename: "Channel";
  id: number;
  label: string;
  href: string;
  visibility: string;
  owner: AdvancedQuickSearchResult_Channel_owner;
  title: string;
  user: AdvancedQuickSearchResult_Channel_user | null;
}

export interface AdvancedQuickSearchResult_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResult_Attachment {
  __typename: "Attachment";
  id: number;
  title: string;
  href: string;
  user: AdvancedQuickSearchResult_Attachment_user | null;
  src: string | null;
}

export interface AdvancedQuickSearchResult_PendingBlock_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResult_PendingBlock {
  __typename: "PendingBlock";
  id: number;
  title: string;
  href: string;
  user: AdvancedQuickSearchResult_PendingBlock_user | null;
}

export interface AdvancedQuickSearchResult_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResult_Embed {
  __typename: "Embed";
  id: number;
  title: string;
  href: string;
  user: AdvancedQuickSearchResult_Embed_user | null;
  src: string | null;
}

export interface AdvancedQuickSearchResult_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResult_Image {
  __typename: "Image";
  id: number;
  title: string;
  href: string;
  user: AdvancedQuickSearchResult_Image_user | null;
  src: string | null;
}

export interface AdvancedQuickSearchResult_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResult_Link {
  __typename: "Link";
  id: number;
  title: string;
  href: string;
  user: AdvancedQuickSearchResult_Link_user | null;
  src: string | null;
}

export interface AdvancedQuickSearchResult_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResult_Text {
  __typename: "Text";
  id: number;
  title: string;
  href: string;
  user: AdvancedQuickSearchResult_Text_user | null;
  content: string;
}

export type AdvancedQuickSearchResult = AdvancedQuickSearchResult_User | AdvancedQuickSearchResult_Group | AdvancedQuickSearchResult_Channel | AdvancedQuickSearchResult_Attachment | AdvancedQuickSearchResult_PendingBlock | AdvancedQuickSearchResult_Embed | AdvancedQuickSearchResult_Image | AdvancedQuickSearchResult_Link | AdvancedQuickSearchResult_Text;
