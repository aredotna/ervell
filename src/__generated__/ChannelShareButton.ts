/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelShareButton
// ====================================================

export interface ChannelShareButton_share {
  __typename: "ChannelShare";
  url: string | null;
  twitter_url: string | null;
  facebook_url: string | null;
}

export interface ChannelShareButton {
  __typename: "Channel";
  id: number | null;
  visibility: string | null;
  share: ChannelShareButton_share | null;
}
