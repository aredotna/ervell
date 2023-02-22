/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateGroupSubscriptionMutation
// ====================================================

export interface updateGroupSubscriptionMutation_update_incomplete_subscription_for_group_subscription {
  __typename: "StripeSubscription";
  id: string;
}

export interface updateGroupSubscriptionMutation_update_incomplete_subscription_for_group {
  __typename: "UpdateIncompleteSubscriptionForGroupMutationPayload";
  subscription: updateGroupSubscriptionMutation_update_incomplete_subscription_for_group_subscription | null;
}

export interface updateGroupSubscriptionMutation {
  update_incomplete_subscription_for_group: updateGroupSubscriptionMutation_update_incomplete_subscription_for_group | null;
}

export interface updateGroupSubscriptionMutationVariables {
  subscription_id: string;
  group_id: string;
  user_ids: (string | null)[];
}
