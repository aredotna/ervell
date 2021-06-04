/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: clearNotifications
// ====================================================

export interface clearNotifications_clear_notifications_me_counts {
  __typename: "MeCounts";
  notifications: number | null;
}

export interface clearNotifications_clear_notifications_me {
  __typename: "Me";
  id: number | null;
  counts: clearNotifications_clear_notifications_me_counts | null;
}

export interface clearNotifications_clear_notifications {
  __typename: "ClearNotificationsPayload";
  me: clearNotifications_clear_notifications_me | null;
}

export interface clearNotifications {
  clear_notifications: clearNotifications_clear_notifications | null;
}
