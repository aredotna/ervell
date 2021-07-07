/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProfileFollowing
// ====================================================

export interface ProfileFollowing_following_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  visibility: string;
  label: string;
  initials: string;
  avatar: string | null;
}

export interface ProfileFollowing_following_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
  initials: string;
  avatar: string | null;
}

export interface ProfileFollowing_following_Channel_counts {
  __typename: "ChannelCounts";
  contents: number | null;
}

export interface ProfileFollowing_following_Channel_owner_Group {
  __typename: "Group";
  id: number;
  name: string;
  visibility: string;
}

export interface ProfileFollowing_following_Channel_owner_User {
  __typename: "User";
  id: number;
  name: string;
}

export type ProfileFollowing_following_Channel_owner = ProfileFollowing_following_Channel_owner_Group | ProfileFollowing_following_Channel_owner_User;

export interface ProfileFollowing_following_Channel_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileFollowing_following_Channel_connection_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface ProfileFollowing_following_Channel_connection {
  __typename: "Connection";
  created_at: string | null;
  user: ProfileFollowing_following_Channel_connection_user | null;
}

export interface ProfileFollowing_following_Channel_source {
  __typename: "ConnectableSource";
  url: string | null;
}

export interface ProfileFollowing_following_Channel {
  __typename: "Channel";
  id: number;
  href: string | null;
  truncatedTitle: string;
  visibility: string;
  updated_at: string | null;
  counts: ProfileFollowing_following_Channel_counts | null;
  owner: ProfileFollowing_following_Channel_owner;
  label: string;
  title: string;
  user: ProfileFollowing_following_Channel_user | null;
  /**
   * Returns the outer channel if we are inside of one
   */
  connection: ProfileFollowing_following_Channel_connection | null;
  source: ProfileFollowing_following_Channel_source | null;
}

export type ProfileFollowing_following = ProfileFollowing_following_Group | ProfileFollowing_following_User | ProfileFollowing_following_Channel;

export interface ProfileFollowing {
  __typename: "User";
  id: number;
  following: ProfileFollowing_following[] | null;
}
