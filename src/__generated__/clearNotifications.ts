/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: clearNotifications
// ====================================================

export interface clearNotifications_clear_notifications_me_counts {
  __typename: "MeCounts";
  notifications: number;
}

export interface clearNotifications_clear_notifications_me {
  __typename: "Me";
  id: number;
  counts: clearNotifications_clear_notifications_me_counts;
}

export interface clearNotifications_clear_notifications {
  __typename: "ClearNotificationsMutationPayload";
  me: clearNotifications_clear_notifications_me;
}

export interface clearNotifications {
  clear_notifications: clearNotifications_clear_notifications | null;
}
