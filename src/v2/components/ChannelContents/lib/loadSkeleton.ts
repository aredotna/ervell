import { ApolloClient, OperationVariables } from '@apollo/client'

import channelContentsSetQuery from 'v2/components/ChannelContents/queries/channelContentsSet'

import { ChannelContents_skeleton } from '__generated__/ChannelContents'

import * as ConnectableCellsCollection from 'v2/components/ChannelContents/lib/ConnectableCells'

export const loadSkeleton = ({
  client,
  channelId,
  pageSkeleton,
  collection,
  queryOptions,
}: {
  client: ApolloClient<any>
  channelId: string | number
  pageSkeleton: ChannelContents_skeleton[]
  collection: ConnectableCellsCollection.ConnectableCells
  queryOptions?: OperationVariables
}): Promise<ConnectableCellsCollection.ConnectableCells | void> => {
  const unloadedSkeleton = pageSkeleton.filter(
    c => !collection[ConnectableCellsCollection.key(c)]
  )

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
    .query({ query: channelContentsSetQuery, variables, ...queryOptions })
    .then(({ data }) =>
      ConnectableCellsCollection.normalize(data.channel.contents)
    )
}
