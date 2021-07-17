/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollaboratorsList
// ====================================================

export interface CollaboratorsList_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean;
}

export interface CollaboratorsList_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
  label: string;
}

export interface CollaboratorsList_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface CollaboratorsList_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string | null;
}

export interface CollaboratorsList_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface CollaboratorsList_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string | null;
  description: string | null;
  user: CollaboratorsList_collaborators_Group_user;
  users: CollaboratorsList_collaborators_Group_users[] | null;
  can: CollaboratorsList_collaborators_Group_can | null;
  visibility: string;
  label: string;
}

export type CollaboratorsList_collaborators = CollaboratorsList_collaborators_User | CollaboratorsList_collaborators_Group;

export interface CollaboratorsList {
  __typename: "Channel";
  id: number;
  can: CollaboratorsList_can | null;
  collaborators: CollaboratorsList_collaborators[] | null;
}
