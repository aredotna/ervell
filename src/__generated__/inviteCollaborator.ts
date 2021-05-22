/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: inviteCollaborator
// ====================================================

export interface inviteCollaborator_invite_collaborator_channel_counts {
  __typename: "ChannelCounts";
  collaborators: number | null;
}

export interface inviteCollaborator_invite_collaborator_channel_collaborators_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  label: string | null;
}

export interface inviteCollaborator_invite_collaborator_channel_collaborators_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface inviteCollaborator_invite_collaborator_channel_collaborators_Group_users {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
}

export interface inviteCollaborator_invite_collaborator_channel_collaborators_Group_can {
  __typename: "GroupCan";
  manage: boolean | null;
  manage_users: boolean | null;
}

export interface inviteCollaborator_invite_collaborator_channel_collaborators_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  visibility: string | null;
  user: inviteCollaborator_invite_collaborator_channel_collaborators_Group_user | null;
  description: string | null;
  users: (inviteCollaborator_invite_collaborator_channel_collaborators_Group_users | null)[] | null;
  can: inviteCollaborator_invite_collaborator_channel_collaborators_Group_can | null;
  label: string | null;
}

export type inviteCollaborator_invite_collaborator_channel_collaborators = inviteCollaborator_invite_collaborator_channel_collaborators_User | inviteCollaborator_invite_collaborator_channel_collaborators_Group;

export interface inviteCollaborator_invite_collaborator_channel_memberships_member_User {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface inviteCollaborator_invite_collaborator_channel_memberships_member_Group_user {
  __typename: "User";
  id: number | null;
  name: string | null;
}

export interface inviteCollaborator_invite_collaborator_channel_memberships_member_Group {
  __typename: "Group";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
  visibility: string | null;
  user: inviteCollaborator_invite_collaborator_channel_memberships_member_Group_user | null;
}

export type inviteCollaborator_invite_collaborator_channel_memberships_member = inviteCollaborator_invite_collaborator_channel_memberships_member_User | inviteCollaborator_invite_collaborator_channel_memberships_member_Group;

export interface inviteCollaborator_invite_collaborator_channel_memberships_can {
  __typename: "ChannelMembershipCan";
  manage: boolean | null;
}

export interface inviteCollaborator_invite_collaborator_channel_memberships {
  __typename: "ChannelMembership";
  id: number | null;
  member: inviteCollaborator_invite_collaborator_channel_memberships_member | null;
  can: inviteCollaborator_invite_collaborator_channel_memberships_can | null;
}

export interface inviteCollaborator_invite_collaborator_channel_can {
  __typename: "ChannelCan";
  manage_collaborators: boolean | null;
}

export interface inviteCollaborator_invite_collaborator_channel {
  __typename: "Channel";
  id: number | null;
  counts: inviteCollaborator_invite_collaborator_channel_counts | null;
  collaborators: (inviteCollaborator_invite_collaborator_channel_collaborators | null)[] | null;
  memberships: (inviteCollaborator_invite_collaborator_channel_memberships | null)[] | null;
  can: inviteCollaborator_invite_collaborator_channel_can | null;
}

export interface inviteCollaborator_invite_collaborator {
  __typename: "InviteCollaboratorPayload";
  channel: inviteCollaborator_invite_collaborator_channel | null;
}

export interface inviteCollaborator {
  invite_collaborator: inviteCollaborator_invite_collaborator | null;
}

export interface inviteCollaboratorVariables {
  email: string;
  channel_id: string;
}
