import { ChannelContentsConnectable } from '__generated__/ChannelContentsConnectable'

export interface KonnectableCellCollection {
  [key: string]: ChannelContentsConnectable
}

export const key = ({ id, type }: { id: string | number; type: string }) =>
  `${id}:${type}`

export const normalize = (
  contents: ChannelContentsConnectable[]
): KonnectableCellCollection =>
  contents.reduce(
    (memo, connectable) => ({
      [key({
        id: connectable.id,
        type: connectable.__typename === 'Channel' ? 'Channel' : 'Block',
      })]: connectable,
      ...memo,
    }),
    {}
  )
