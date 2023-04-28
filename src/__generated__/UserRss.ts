/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserRss
// ====================================================

export interface UserRss_user_contents_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface UserRss_user_contents_Channel {
  __typename: "Channel" | "PendingBlock";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: UserRss_user_contents_Channel_source | null;
}

export interface UserRss_user_contents_Image_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface UserRss_user_contents_Image {
  __typename: "Image";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: UserRss_user_contents_Image_source | null;
  image_url: string | null;
}

export interface UserRss_user_contents_Embed_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface UserRss_user_contents_Embed {
  __typename: "Embed";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: UserRss_user_contents_Embed_source | null;
  embed_html: string | null;
}

export interface UserRss_user_contents_Attachment_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface UserRss_user_contents_Attachment {
  __typename: "Attachment";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: UserRss_user_contents_Attachment_source | null;
  file_url: string | null;
}

export interface UserRss_user_contents_Link_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface UserRss_user_contents_Link {
  __typename: "Link";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: UserRss_user_contents_Link_source | null;
  description: string | null;
  image_url: string | null;
}

export interface UserRss_user_contents_Text_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface UserRss_user_contents_Text {
  __typename: "Text";
  id: number;
  updated_at: string;
  title: string;
  href: string;
  source: UserRss_user_contents_Text_source | null;
  content: string;
}

export type UserRss_user_contents = UserRss_user_contents_Channel | UserRss_user_contents_Image | UserRss_user_contents_Embed | UserRss_user_contents_Attachment | UserRss_user_contents_Link | UserRss_user_contents_Text;

export interface UserRss_user {
  __typename: "User";
  name: string;
  href: string;
  contents: UserRss_user_contents[];
}

export interface UserRss {
  /**
   * A single user
   */
  user: UserRss_user | null;
}

export interface UserRssVariables {
  id: string;
}
