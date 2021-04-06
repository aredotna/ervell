/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelTableContentsSet
// ====================================================

export interface ChannelTableContentsSet_channel_blokks_Channel_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Channel_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Channel {
  __typename: "Channel" | "PendingBlock";
  created_at: string | null;
  updated_at: string | null;
  title: string | null;
  user: ChannelTableContentsSet_channel_blokks_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Channel_connection | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Attachment_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Attachment {
  __typename: "Attachment";
  created_at: string | null;
  updated_at: string | null;
  file_url: string | null;
  image_url: string | null;
  title: string | null;
  user: ChannelTableContentsSet_channel_blokks_Attachment_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Attachment_connection | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Embed_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Embed {
  __typename: "Embed";
  created_at: string | null;
  updated_at: string | null;
  embed_html: string | null;
  title: string | null;
  user: ChannelTableContentsSet_channel_blokks_Embed_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Embed_connection | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Link_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Link {
  __typename: "Link";
  created_at: string | null;
  updated_at: string | null;
  image_url: string | null;
  title: string | null;
  user: ChannelTableContentsSet_channel_blokks_Link_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Link_connection | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Image_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Image {
  __typename: "Image";
  created_at: string | null;
  updated_at: string | null;
  image_url: string | null;
  title: string | null;
  user: ChannelTableContentsSet_channel_blokks_Image_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Image_connection | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_connection_user {
  __typename: "User";
  name: string | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text_connection {
  __typename: "Connection";
  position: number | null;
  created_at: string | null;
  user: ChannelTableContentsSet_channel_blokks_Text_connection_user | null;
}

export interface ChannelTableContentsSet_channel_blokks_Text {
  __typename: "Text";
  created_at: string | null;
  updated_at: string | null;
  content: string | null;
  title: string | null;
  user: ChannelTableContentsSet_channel_blokks_Text_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ChannelTableContentsSet_channel_blokks_Text_connection | null;
}

export type ChannelTableContentsSet_channel_blokks = ChannelTableContentsSet_channel_blokks_Channel | ChannelTableContentsSet_channel_blokks_Attachment | ChannelTableContentsSet_channel_blokks_Embed | ChannelTableContentsSet_channel_blokks_Link | ChannelTableContentsSet_channel_blokks_Image | ChannelTableContentsSet_channel_blokks_Text;

export interface ChannelTableContentsSet_channel {
  __typename: "Channel";
  id: number | null;
  blokks: (ChannelTableContentsSet_channel_blokks | null)[] | null;
}

export interface ChannelTableContentsSet {
  /**
   * A single channel
   */
  channel: ChannelTableContentsSet_channel | null;
}

export interface ChannelTableContentsSetVariables {
  id: string;
}
