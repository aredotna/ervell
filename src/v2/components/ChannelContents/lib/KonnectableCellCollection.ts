import { ChannelContentsConnectable } from '__generated__/ChannelContentsConnectable'

export interface KonnectableCellCollection {
  [key: string]: ChannelContentsConnectable
}

export const key = ({
  id,
  type,
  __typename,
}: {
  id: string | number
  type?: string
  __typename?: string
}) =>
  __typename
    ? `${id}:${__typename === 'Channel' ? 'Channel' : 'Block'}`
    : `${id}:${type}`

export const normalize = (
  contents: ChannelContentsConnectable[]
): KonnectableCellCollection =>
  contents.reduce(
    (memo, connectable) => ({
      [key(connectable)]: connectable,
      ...memo,
    }),
    {}
  )
