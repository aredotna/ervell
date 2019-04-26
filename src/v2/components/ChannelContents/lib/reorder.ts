import { ChannelContents_skeleton as ChannelContents_skeletonInterface } from '__generated__/ChannelContents'

export const reorder = ({
  list,
  startIndex,
  endIndex,
}: {
  list: ChannelContents_skeletonInterface[]
  startIndex: number
  endIndex: number
}) => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}
