/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: AdvancedQuickSearchResultBlock
// ====================================================

export interface AdvancedQuickSearchResultBlock_Group {
  __typename: "Group" | "User";
  id: number;
}

export interface AdvancedQuickSearchResultBlock_Attachment_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResultBlock_Attachment {
  __typename: "Attachment";
  id: number;
  title: string;
  href: string | null;
  user: AdvancedQuickSearchResultBlock_Attachment_user | null;
  src: string | null;
}

export interface AdvancedQuickSearchResultBlock_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResultBlock_Channel {
  __typename: "Channel" | "PendingBlock";
  id: number;
  title: string;
  href: string | null;
  user: AdvancedQuickSearchResultBlock_Channel_user | null;
}

export interface AdvancedQuickSearchResultBlock_Embed_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResultBlock_Embed {
  __typename: "Embed";
  id: number;
  title: string;
  href: string | null;
  user: AdvancedQuickSearchResultBlock_Embed_user | null;
  src: string | null;
}

export interface AdvancedQuickSearchResultBlock_Image_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResultBlock_Image {
  __typename: "Image";
  id: number;
  title: string;
  href: string | null;
  user: AdvancedQuickSearchResultBlock_Image_user | null;
  src: string | null;
}

export interface AdvancedQuickSearchResultBlock_Link_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResultBlock_Link {
  __typename: "Link";
  id: number;
  title: string;
  href: string | null;
  user: AdvancedQuickSearchResultBlock_Link_user | null;
  src: string | null;
}

export interface AdvancedQuickSearchResultBlock_Text_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface AdvancedQuickSearchResultBlock_Text {
  __typename: "Text";
  id: number;
  title: string;
  href: string | null;
  user: AdvancedQuickSearchResultBlock_Text_user | null;
  content: string;
}

export type AdvancedQuickSearchResultBlock = AdvancedQuickSearchResultBlock_Group | AdvancedQuickSearchResultBlock_Attachment | AdvancedQuickSearchResultBlock_Channel | AdvancedQuickSearchResultBlock_Embed | AdvancedQuickSearchResultBlock_Image | AdvancedQuickSearchResultBlock_Link | AdvancedQuickSearchResultBlock_Text;
