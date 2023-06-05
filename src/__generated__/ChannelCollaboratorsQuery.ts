/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelCollaboratorsQuery
// ====================================================

export interface ChannelCollaboratorsQuery_channel_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean;
}

export interface ChannelCollaboratorsQuery_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  label: string;
}

export interface ChannelCollaboratorsQuery_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ChannelCollaboratorsQuery_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface ChannelCollaboratorsQuery_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface ChannelCollaboratorsQuery_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  description: string | null;
  user: ChannelCollaboratorsQuery_channel_collaborators_Group_user;
  users: ChannelCollaboratorsQuery_channel_collaborators_Group_users[];
  can: ChannelCollaboratorsQuery_channel_collaborators_Group_can;
  visibility: string;
  label: string;
}

export type ChannelCollaboratorsQuery_channel_collaborators = ChannelCollaboratorsQuery_channel_collaborators_User | ChannelCollaboratorsQuery_channel_collaborators_Group;

export interface ChannelCollaboratorsQuery_channel {
  __typename: "Channel";
  id: number;
  can: ChannelCollaboratorsQuery_channel_can;
  collaborators: ChannelCollaboratorsQuery_channel_collaborators[];
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
