/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetFirstChannel
// ====================================================

export interface GetFirstChannel_me_channels {
  __typename: "Channel";
  href: string | null;
}

export interface GetFirstChannel_me {
  __typename: "Me";
  channels: GetFirstChannel_me_channels[] | null;
}

export interface GetFirstChannel {
  /**
   * The current logged in user
   */
  me: GetFirstChannel_me | null;
}
