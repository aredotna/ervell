/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BannerEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: dismissMonthlyBannerMutation
// ====================================================

export interface dismissMonthlyBannerMutation_dismiss_banner_me {
  __typename: "Me";
  id: number;
  banner: BannerEnum | null;
}

export interface dismissMonthlyBannerMutation_dismiss_banner {
  __typename: "DismissBannerMutationPayload";
  me: dismissMonthlyBannerMutation_dismiss_banner_me;
}

export interface dismissMonthlyBannerMutation {
  dismiss_banner: dismissMonthlyBannerMutation_dismiss_banner | null;
}

export interface dismissMonthlyBannerMutationVariables {
  banner: BannerEnum;
}
