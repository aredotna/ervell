/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SupportedPlanEnum } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: SetupIncompleteSubscription
// ====================================================

export interface SetupIncompleteSubscription_setup_incomplete_subscription_subscription {
  __typename: "StripeSubscription";
  id: string;
  status: string;
}

export interface SetupIncompleteSubscription_setup_incomplete_subscription {
  __typename: "SetupIncompleteSubscriptionMutationPayload";
  subscription: SetupIncompleteSubscription_setup_incomplete_subscription_subscription | null;
  client_secret: string | null;
}

export interface SetupIncompleteSubscription {
  setup_incomplete_subscription: SetupIncompleteSubscription_setup_incomplete_subscription | null;
}

export interface SetupIncompleteSubscriptionVariables {
  plan_id: SupportedPlanEnum;
}
