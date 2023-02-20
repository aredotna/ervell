/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateSubscriptionMutation
// ====================================================

export interface updateSubscriptionMutation_update_incomplete_subscription_for_users_subscription {
  __typename: "StripeSubscription";
  id: string;
}

export interface updateSubscriptionMutation_update_incomplete_subscription_for_users {
  __typename: "UpdateIncompleteSubscriptionForUsersMutationPayload";
  subscription: updateSubscriptionMutation_update_incomplete_subscription_for_users_subscription | null;
}

export interface updateSubscriptionMutation {
  update_incomplete_subscription_for_users: updateSubscriptionMutation_update_incomplete_subscription_for_users | null;
}

export interface updateSubscriptionMutationVariables {
  subscription_id: string;
  group_id: string;
  user_ids: (string | null)[];
}
