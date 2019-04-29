import channelContentsSetQuery from 'v2/components/ChannelContents/queries/channelContentsSet'

import { KonnectableCellCollection, key } from './KonnectableCellCollection'
import { ChannelContents_skeleton } from '__generated__/ChannelContents'

export const loadSkeleton = ({
  client,
  channelId,
  pageSkeleton,
  collection,
}: {
  client: any
  channelId: string | number
  pageSkeleton: ChannelContents_skeleton[]
  collection: KonnectableCellCollection
}): Promise<KonnectableCellCollection> => {
  const unloadedSkeleton = pageSkeleton.filter(c => !collection[key(c)])
  const variables = {
    id: channelId,
    connectables: unloadedSkeleton.map(c => ({
      id: c.id,
      type: c.type.toUpperCase(),
    })),
  }

  return client
    .query({ query: channelContentsSetQuery, variables })
    .then(({ data }) => {
      return data.channel.contents.reduce(
        (memo, connectable) => ({
          [key(connectable)]: connectable,
          ...memo,
        }),
        {}
      )
    })
    .catch(console.error.bind(console))
}
