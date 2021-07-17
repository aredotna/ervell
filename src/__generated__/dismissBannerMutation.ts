/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BannerEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: dismissBannerMutation
// ====================================================

export interface dismissBannerMutation_dismiss_banner_me {
  __typename: "Me";
  id: number;
  banner: BannerEnum | null;
}

export interface dismissBannerMutation_dismiss_banner {
  __typename: "DismissBannerMutationPayload";
  me: dismissBannerMutation_dismiss_banner_me;
}

export interface dismissBannerMutation {
  dismiss_banner: dismissBannerMutation_dismiss_banner | null;
}

export interface dismissBannerMutationVariables {
  banner: BannerEnum;
}
