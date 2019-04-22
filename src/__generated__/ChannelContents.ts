/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ChannelContents
// ====================================================

export interface ChannelContents_skeleton {
  __typename: "SkeletalConnectable";
  id: number | null;
  type: string | null;
}

export interface ChannelContents_can {
  __typename: "ChannelCan";
  add_to: boolean | null;
}

export interface ChannelContents {
  __typename: "Channel";
  id: number | null;
  skeleton: (ChannelContents_skeleton | null)[] | null;
  can: ChannelContents_can | null;
}
