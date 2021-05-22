/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelCollaboratorsQuery
// ====================================================

export interface ChannelCollaboratorsQuery_channel_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean | null;
}

export interface ChannelCollaboratorsQuery_channel_collaborators_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export interface ChannelCollaboratorsQuery_channel_collaborators_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ChannelCollaboratorsQuery_channel_collaborators_Group_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface ChannelCollaboratorsQuery_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface ChannelCollaboratorsQuery_channel_collaborators_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  description: string | null;
  user: ChannelCollaboratorsQuery_channel_collaborators_Group_user | null;
  users: (ChannelCollaboratorsQuery_channel_collaborators_Group_users | null)[] | null;
  can: ChannelCollaboratorsQuery_channel_collaborators_Group_can | null;
  visibility: string | null;
  label: string | null;
}

export type ChannelCollaboratorsQuery_channel_collaborators = ChannelCollaboratorsQuery_channel_collaborators_User | ChannelCollaboratorsQuery_channel_collaborators_Group;

export interface ChannelCollaboratorsQuery_channel {
  __typename: "Channel";
  id: number | null;
  can: ChannelCollaboratorsQuery_channel_can | null;
  collaborators: (ChannelCollaboratorsQuery_channel_collaborators | null)[] | null;
}

export interface ChannelCollaboratorsQuery {
  /**
   * A single channel
   */
  channel: ChannelCollaboratorsQuery_channel | null;
}

export interface ChannelCollaboratorsQueryVariables {
  channel_id: string;
}
