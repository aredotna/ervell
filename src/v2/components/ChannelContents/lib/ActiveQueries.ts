import { ChannelContents_skeleton } from '__generated__/ChannelContents'

export interface ActiveQueries {
  [key: string]: boolean
}

export const key = (pageSkeleton: ChannelContents_skeleton[]) =>
  JSON.stringify(pageSkeleton)
