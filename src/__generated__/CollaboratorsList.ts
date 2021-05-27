/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CollaboratorsList
// ====================================================

export interface CollaboratorsList_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean | null;
}

export interface CollaboratorsList_collaborators_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  label: string | null;
}

export interface CollaboratorsList_collaborators_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface CollaboratorsList_collaborators_Group_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface CollaboratorsList_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface CollaboratorsList_collaborators_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  description: string | null;
  user: CollaboratorsList_collaborators_Group_user | null;
  users: (CollaboratorsList_collaborators_Group_users | null)[] | null;
  can: CollaboratorsList_collaborators_Group_can | null;
  visibility: string | null;
  label: string | null;
}

export type CollaboratorsList_collaborators = CollaboratorsList_collaborators_User | CollaboratorsList_collaborators_Group;

export interface CollaboratorsList {
  __typename: "Channel";
  id: number | null;
  can: CollaboratorsList_can | null;
  collaborators: (CollaboratorsList_collaborators | null)[] | null;
}
