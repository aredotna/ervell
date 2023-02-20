/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateGroupSubscriptionMutation
// ====================================================

export interface updateGroupSubscriptionMutation_update_incomplete_subscription_subscription {
  __typename: "StripeSubscription";
  id: string;
}

export interface updateGroupSubscriptionMutation_update_incomplete_subscription {
  __typename: "UpdateIncompleteSubscriptionMutationPayload";
  subscription: updateGroupSubscriptionMutation_update_incomplete_subscription_subscription | null;
}

export interface updateGroupSubscriptionMutation {
  update_incomplete_subscription: updateGroupSubscriptionMutation_update_incomplete_subscription | null;
}

export interface updateGroupSubscriptionMutationVariables {
  subscription_id: string;
}
