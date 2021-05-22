/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReadAllNotificationsMutation
// ====================================================

export interface ReadAllNotificationsMutation_clear_notifications_me {
  __typename: "Me";
  id: number | null;
}

export interface ReadAllNotificationsMutation_clear_notifications {
  __typename: "ClearNotificationsPayload";
  me: ReadAllNotificationsMutation_clear_notifications_me | null;
}

export interface ReadAllNotificationsMutation {
  clear_notifications: ReadAllNotificationsMutation_clear_notifications | null;
}
