import { ChannelContentsConnectable as ChannelContentsConnectableData } from '__generated__/ChannelContentsConnectable'

export interface ConnectableCells {
  [key: string]: ChannelContentsConnectableData
}

export const key = ({ id, type }: { id: string | number; type: string }) =>
  `${id}:${type}`

export const normalize = (
  contents: ChannelContentsConnectableData[]
): ConnectableCells =>
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
