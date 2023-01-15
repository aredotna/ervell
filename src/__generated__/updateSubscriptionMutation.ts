/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateSubscriptionMutation
// ====================================================

export interface updateSubscriptionMutation_update_incomplete_subscription_subscription {
  __typename: "StripeSubscription";
  id: string;
}

export interface updateSubscriptionMutation_update_incomplete_subscription {
  __typename: "UpdateIncompleteSubscriptionMutationPayload";
  subscription: updateSubscriptionMutation_update_incomplete_subscription_subscription | null;
}

export interface updateSubscriptionMutation {
  update_incomplete_subscription: updateSubscriptionMutation_update_incomplete_subscription | null;
}

export interface updateSubscriptionMutationVariables {
  subscription_id: string;
}
