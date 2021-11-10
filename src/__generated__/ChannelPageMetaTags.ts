/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelPageMetaTags
// ====================================================

export interface ChannelPageMetaTags_owner_Group {
  __typename: "Group";
}

export interface ChannelPageMetaTags_owner_User {
  __typename: "User";
  is_indexable: boolean;
}

export type ChannelPageMetaTags_owner = ChannelPageMetaTags_owner_Group | ChannelPageMetaTags_owner_User;

export interface ChannelPageMetaTags {
  __typename: "Channel";
  id: number;
  meta_title: string;
  meta_description: string | null;
  canonical: string | null;
  is_nsfw: boolean;
  image_url: string | null;
  visibility: string;
  owner: ChannelPageMetaTags_owner;
}
