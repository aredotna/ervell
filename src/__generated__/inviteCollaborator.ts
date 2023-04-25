/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: inviteCollaborator
// ====================================================

export interface inviteCollaborator_invite_collaborator_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number;
}

export interface inviteCollaborator_invite_collaborator_channel_collaborators_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  label: string;
}

export interface inviteCollaborator_invite_collaborator_channel_collaborators_Group_user {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface inviteCollaborator_invite_collaborator_channel_collaborators_Group_users {
  __typename: "User";
  id: number;
  name: string;
  href: string;
}

export interface inviteCollaborator_invite_collaborator_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean;
  manage_users: boolean;
}

export interface inviteCollaborator_invite_collaborator_channel_collaborators_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: inviteCollaborator_invite_collaborator_channel_collaborators_Group_user;
  description: string | null;
  users: inviteCollaborator_invite_collaborator_channel_collaborators_Group_users[] | null;
  can: inviteCollaborator_invite_collaborator_channel_collaborators_Group_can;
  label: string;
}

export type inviteCollaborator_invite_collaborator_channel_collaborators = inviteCollaborator_invite_collaborator_channel_collaborators_User | inviteCollaborator_invite_collaborator_channel_collaborators_Group;

export interface inviteCollaborator_invite_collaborator_channel_memberships_member_User {
  __typename: "User";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
}

export interface inviteCollaborator_invite_collaborator_channel_memberships_member_Group_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface inviteCollaborator_invite_collaborator_channel_memberships_member_Group {
  __typename: "Group";
  id: number;
  name: string;
  href: string;
  initials: string;
  avatar: string | null;
  visibility: string;
  user: inviteCollaborator_invite_collaborator_channel_memberships_member_Group_user;
}

export type inviteCollaborator_invite_collaborator_channel_memberships_member = inviteCollaborator_invite_collaborator_channel_memberships_member_User | inviteCollaborator_invite_collaborator_channel_memberships_member_Group;

export interface inviteCollaborator_invite_collaborator_channel_memberships_can {
  __typename: "ChannelMembershipCan";
  manage: boolean;
}

export interface inviteCollaborator_invite_collaborator_channel_memberships {
  __typename: "ChannelMembership";
  id: number;
  member: inviteCollaborator_invite_collaborator_channel_memberships_member | null;
  can: inviteCollaborator_invite_collaborator_channel_memberships_can;
}

export interface inviteCollaborator_invite_collaborator_channel_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean;
}

export interface inviteCollaborator_invite_collaborator_channel {
  __typename: "Channel";
  id: number;
  counts: inviteCollaborator_invite_collaborator_channel_counts;
  collaborators: inviteCollaborator_invite_collaborator_channel_collaborators[];
  memberships: inviteCollaborator_invite_collaborator_channel_memberships[];
  can: inviteCollaborator_invite_collaborator_channel_can;
}

export interface inviteCollaborator_invite_collaborator {
  __typename: "InviteCollaboratorMutationPayload";
  channel: inviteCollaborator_invite_collaborator_channel;
}

export interface inviteCollaborator {
  invite_collaborator: inviteCollaborator_invite_collaborator | null;
}

export interface inviteCollaboratorVariables {
  email: string;
  channel_id: string;
}
