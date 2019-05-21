import React, { useState, useMemo, useCallback } from 'react'
import Waypoint from 'react-waypoint'
import { ApolloClient } from 'apollo-client'
import { graphql, withApollo } from 'react-apollo'
import { SortableContainer } from 'react-sortable-hoc'
import sharify from 'sharify'

import { chunk } from 'v2/util/chunk'
import { reorder } from 'v2/components/ChannelContents/lib/reorder'
import { loadSkeleton } from 'v2/components/ChannelContents/lib/loadSkeleton'
import * as ConnectableCellsCollection from 'v2/components/ChannelContents/lib/ConnectableCells'
import * as ActiveQueriesCollection from 'v2/components/ChannelContents/lib/ActiveQueries'

import moveConnectableMutation from 'v2/components/ChannelContents/mutations/moveConnectable'

import { ChannelContents as ChannelContentsData } from '__generated__/ChannelContents'

import Grid from 'v2/components/UI/Grid'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import AddBlock from 'v2/components/AddBlock'
import { ChannelContentsItem } from './components/ChannelContentsItem'
import { ChannelContentsThumbnail } from './components/ChannelContentsThumbnail'

import { usePusher } from 'v2/hooks/usePusher'

const {
  data: { NODE_ENV },
} = sharify

const SortableGrid = SortableContainer(({ onSortEnd: _onSortEnd, ...rest }) => (
  <Grid {...rest} />
))

interface Props {
  chunkSize?: number
  channel: ChannelContentsData
}

interface ChannelContentsProps extends Props {
  moveConnectable: (props: any) => Promise<any>
  client: ApolloClient<any>
}

const ChannelContents: React.FC<ChannelContentsProps> = ({
  chunkSize = 10,
  channel,
  client,
  moveConnectable,
  ...rest
}) => {
  // Used to load/unload waypoints
  const [activeQueries, setActiveQueries] = useState<
    ActiveQueriesCollection.ActiveQueries
  >({})

  // Handles ordering of block grid items
  const [connectables, setConnectables] = useState(channel.skeleton)

  // Handles actual contents of block grid items
  const [collection, setCollection] = useState(
    ConnectableCellsCollection.normalize(channel.initial_contents)
  )

  const addConnectable = useCallback(newConnectable => {
    setConnectables(prevConnectables => {
      if (
        !prevConnectables.some(
          c =>
            c.id === newConnectable.id &&
            c.type.toUpperCase() === newConnectable.type.toUpperCase()
        )
      ) {
        return [
          {
            id: newConnectable.id,
            type: { BLOCK: 'Block', CHANNEL: 'Channel' }[
              newConnectable.type.toUpperCase()
            ],
            __typename: 'SkeletalConnectable',
          },
          ...prevConnectables,
        ]
      }

      return prevConnectables
    })
  }, [])

  const updateConnectable = useCallback(
    connectable => {
      loadSkeleton({
        client,
        channelId: channel.id,
        pageSkeleton: [connectable],
        collection,
        queryOptions: {
          fetchPolicy: 'network-only',
        },
      }).then(contents => {
        if (!contents) return
        setCollection(prevCollection => ({ ...prevCollection, ...contents }))
      })
    },
    [channel.id, client, collection]
  )

  const parsePayload = useCallback(
    ({ id, base_class }) => ({
      id,
      type: base_class.toUpperCase(),
    }),
    []
  )

  usePusher({
    socketId: `channel-${NODE_ENV}-${channel.id}`,
    onCreated: addConnectable,
    onUpdated: updateConnectable,
    parsePayload,
  })

  const chunked = useMemo(() => chunk(connectables, chunkSize), [
    connectables,
    chunkSize,
  ])

  const handleAddBlock = useCallback(
    ({ id }: { id: number }) => {
      addConnectable({ id, type: 'Block' })
    },
    [addConnectable]
  )

  const handleRemoveBlock = useCallback(
    ({ id, type }: { id: number; type: string }) => {
      setConnectables(prevConnectables => {
        return prevConnectables.filter(
          connectable => connectable.id !== id && connectable.type !== type
        )
      })
    },
    []
  )

  const handleSortEnd = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      const connectable = connectables[oldIndex]

      let startIndex = oldIndex
      let endIndex = newIndex

      if (newIndex === -1) {
        // Moving to the "bottom"
        startIndex = oldIndex
        endIndex = connectables.length - 1
      }

      const sorted = reorder({
        list: connectables,
        startIndex,
        endIndex,
      })

      setConnectables(sorted)

      const insertAt = connectables.length - endIndex

      moveConnectable({
        variables: {
          channel_id: channel.id,
          connectable: {
            id: connectable.id,
            type: connectable.type.toUpperCase(),
          },
          insert_at: insertAt,
        },
      })
    },
    [channel.id, connectables, moveConnectable]
  )

  const handleOnEnter = useCallback(
    pageSkeleton => (): void => {
      const queryKey = ActiveQueriesCollection.key(pageSkeleton)

      if (activeQueries[queryKey]) {
        // Already loading
        return
      }

      setActiveQueries(prevActiveQuerys => ({
        ...prevActiveQuerys,
        [queryKey]: true,
      }))

      loadSkeleton({
        client,
        channelId: channel.id,
        pageSkeleton,
        collection,
      }).then(contents => {
        if (!contents) return
        setCollection(prevCollection => ({ ...prevCollection, ...contents }))
      })
    },
    [activeQueries, client, collection, channel.id]
  )

  return (
    <>
      <ChannelContentsThumbnail initialContents={channel.initial_contents} />

      <SortableGrid
        axis="xy"
        useWindowAsScrollContainer
        transitionDuration={0}
        onSortEnd={handleSortEnd}
        wrapChildren={false}
        distance={1}
        {...rest}
      >
        {(channel.can.add_to || channel.can.add_to_as_premium) && (
          <GridItem>
            <AddBlock
              channel_id={channel.id}
              onAddBlock={handleAddBlock}
              isElligbleForPremium={
                !channel.can.add_to && channel.can.add_to_as_premium
              }
            />
          </GridItem>
        )}

        {chunked.map((pageSkeleton, pageIndex: number) => {
          const pageKey = ActiveQueriesCollection.key(pageSkeleton)

          return (
            <React.Fragment key={pageKey}>
              {!activeQueries[pageKey] && (
                <Waypoint
                  onEnter={handleOnEnter(pageSkeleton)}
                  fireOnRapidScroll={false}
                  topOffset="-100%"
                  bottomOffset="-100%"
                />
              )}

              {pageSkeleton.map((connectableSkeleton, connectableIndex) => {
                const connectableKey = ConnectableCellsCollection.key(
                  connectableSkeleton
                )
                const connectable = collection[connectableKey]

                return (
                  <ChannelContentsItem
                    key={connectableKey}
                    index={connectableIndex + pageIndex * chunkSize}
                    channel={channel}
                    connectable={connectable}
                    context={connectables}
                    onRemove={handleRemoveBlock}
                    onChangePosition={handleSortEnd}
                  />
                )
              })}

              {!activeQueries[pageKey] && (
                <Waypoint
                  onEnter={handleOnEnter(pageSkeleton)}
                  fireOnRapidScroll={false}
                  topOffset="-100%"
                  bottomOffset="-100%"
                />
              )}
            </React.Fragment>
          )
        })}
      </SortableGrid>
    </>
  )
}

export default graphql<Props>(moveConnectableMutation, {
  name: 'moveConnectable',
})(withApollo(ChannelContents))
