/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BannerEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GlobalNavElements
// ====================================================

export interface GlobalNavElements_me_counts {
  __typename: "MeCounts";
  notifications: number;
}

export interface GlobalNavElements_me {
  __typename: "Me";
  id: number;
  banner: BannerEnum | null;
  counts: GlobalNavElements_me_counts;
}

export interface GlobalNavElements {
  /**
   * The current logged in user
   */
  me: GlobalNavElements_me | null;
}
