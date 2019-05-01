import React, { FunctionComponent, useState } from 'react'
import Waypoint from 'react-waypoint'
import { graphql, withApollo } from 'react-apollo'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import chunk from 'v2/util/chunk'
import { reorder } from 'v2/components/ChannelContents/lib/reorder'
import { loadSkeleton } from 'v2/components/ChannelContents/lib/loadSkeleton'
import {
  KonnectableCellCollection,
  key as konnectableCellCollectionKey,
} from 'v2/components/ChannelContents/lib/KonnectableCellCollection'
import {
  ActiveQueries,
  key as activeQueriesKey,
} from 'v2/components/ChannelContents/lib/ActiveQueries'

import moveConnectableMutation from 'v2/components/ChannelContents/mutations/moveConnectable'

import { ChannelContents as ChannelContentsInterface } from '__generated__/ChannelContents'

import Grid from 'v2/components/UI/Grid'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import AddBlock from 'v2/components/AddBlock'
import Cell from 'v2/components/Cell'

const SortableGrid = SortableContainer(Grid)
const SortableGridItem = SortableElement(GridItem)

interface Props {
  chunkSize: number
  channel: ChannelContentsInterface
  client: any
}

interface ChannelContentsProps extends Props {
  moveConnectable: (props: any) => Promise<any>
}

const ChannelContents: FunctionComponent<ChannelContentsProps> = ({
  chunkSize = 10,
  channel,
  client,
  moveConnectable,
  ...rest
}) => {
  const { id, skeleton, can } = channel
  const [activeQueries, setActiveQueries] = useState<ActiveQueries>({})
  const [connectables, setConnectables] = useState(skeleton)
  const [collection, setCollection] = useState<KonnectableCellCollection>({})

  const chunked = chunk(connectables, chunkSize)

  const handleAddBlock = ({ id }) => {
    setConnectables(prevConnectables => [
      { __typename: 'SkeletalConnectable', id, type: 'Block' },
      ...prevConnectables,
    ])
  }

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const connectable = connectables[oldIndex]

    const sorted = reorder({
      list: connectables,
      startIndex: oldIndex,
      endIndex: newIndex,
    })

    setConnectables(sorted)

    const insertAt = connectables.length - newIndex

    moveConnectable({
      variables: {
        channel_id: id,
        connectable: {
          id: connectable.id,
          type: connectable.type.toUpperCase(),
        },
        insert_at: insertAt,
      },
    }).catch(console.error.bind(console))
  }

  const handleOnEnter = pageSkeleton => (): void => {
    const queryKey = JSON.stringify(pageSkeleton)

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
      channelId: id,
      pageSkeleton,
      collection,
    }).then(contents => {
      setCollection(prevCollection => ({ ...prevCollection, ...contents }))
    })
  }

  return (
    <SortableGrid
      axis="xy"
      useWindowAsScrollContainer
      transitionDuration={0}
      onSortEnd={handleSortEnd}
      wrapChildren={false}
      distance={1}
      {...rest}
    >
      {can.add_to && (
        <React.Fragment>
          <GridItem>
            <AddBlock channel_id={id} onAddBlock={handleAddBlock} />
          </GridItem>
        </React.Fragment>
      )}

      {chunked.map((pageSkeleton, pageIndex) => {
        const pageKey = activeQueriesKey(pageSkeleton)

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
              const connectableKey = konnectableCellCollectionKey(
                connectableSkeleton
              )
              const connectable = collection[connectableKey]

              if (connectable) {
                return (
                  <SortableGridItem
                    key={connectableKey}
                    index={connectableIndex + pageIndex * chunkSize}
                    onDrag={e => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                  >
                    <Cell.Konnectable konnectable={connectable} />
                  </SortableGridItem>
                )
              }

              return (
                <SortableGridItem
                  key={connectableKey}
                  index={connectableIndex + pageIndex * chunkSize}
                >
                  <Cell.Skeletal mode="loading" />
                </SortableGridItem>
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
  )
}

export default graphql<Props>(moveConnectableMutation, {
  name: 'moveConnectable',
})(withApollo(ChannelContents))