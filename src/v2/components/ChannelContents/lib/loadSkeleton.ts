import channelContentsSetQuery from 'v2/components/ChannelContents/queries/channelContentsSet'

import {
  KonnectableCellCollection,
  key,
  normalize,
} from './KonnectableCellCollection'
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
}): Promise<KonnectableCellCollection | void> => {
  const unloadedSkeleton = pageSkeleton.filter(c => !collection[key(c)])

  if (unloadedSkeleton.length === 0) {
    return Promise.resolve()
  }

  const variables = {
    id: channelId,
    connectables: unloadedSkeleton.map(c => ({
      id: c.id,
      type: c.type.toUpperCase(),
    })),
  }

  return client
    .query({ query: channelContentsSetQuery, variables })
    .then(({ data }) => normalize(data.channel.contents))
}
