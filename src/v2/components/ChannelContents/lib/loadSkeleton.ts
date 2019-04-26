import channelContentsSetQuery from 'v2/components/ChannelContents/queries/channelContentsSet'

import { KonnectableCellCollection } from './collection'
import { ChannelContents_skeleton } from '__generated__/ChannelContents'

interface ActiveQuery {
  [key: string]: boolean
}

const ACTIVE_QUERIES: ActiveQuery = {}

import { key } from './key'

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
  const queryKey = JSON.stringify(pageSkeleton)

  if (ACTIVE_QUERIES[queryKey]) {
    // Already loading
    return
  }

  ACTIVE_QUERIES[queryKey] = true

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
