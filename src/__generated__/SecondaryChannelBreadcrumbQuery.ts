/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SecondaryChannelBreadcrumbQuery
// ====================================================

export interface SecondaryChannelBreadcrumbQuery_channel {
  __typename: "Channel";
  id: number;
  title: string;
  slug: string;
}

export interface SecondaryChannelBreadcrumbQuery {
  /**
   * A single channel
   */
  channel: SecondaryChannelBreadcrumbQuery_channel | null;
}

export interface SecondaryChannelBreadcrumbQueryVariables {
  channel_id: string;
}
