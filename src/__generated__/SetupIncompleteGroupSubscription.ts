/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SupportedPlanEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SetupIncompleteGroupSubscription
// ====================================================

export interface SetupIncompleteGroupSubscription_setup_incomplete_subscription_for_users_subscription {
  __typename: "StripeSubscription";
  id: string;
  status: string;
}

export interface SetupIncompleteGroupSubscription_setup_incomplete_subscription_for_users {
  __typename: "SetupIncompleteSubscriptionForUsersMutationPayload";
  subscription: SetupIncompleteGroupSubscription_setup_incomplete_subscription_for_users_subscription | null;
  client_secret: string | null;
}

export interface SetupIncompleteGroupSubscription {
  setup_incomplete_subscription_for_users: SetupIncompleteGroupSubscription_setup_incomplete_subscription_for_users | null;
}

export interface SetupIncompleteGroupSubscriptionVariables {
  plan_id: SupportedPlanEnum;
  coupon_code?: string | null;
  group_id: string;
  user_ids: (string | null)[];
}
