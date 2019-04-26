import React, { FunctionComponent, useState } from 'react'
import Waypoint from 'react-waypoint'
import { graphql, withApollo } from 'react-apollo'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'

import chunk from 'v2/util/chunk'
import { key } from 'v2/components/ChannelContents/lib/key'
import { KonnectableCellCollection } from 'v2/components/ChannelContents/lib/collection'
import { reorder } from 'v2/components/ChannelContents/lib/reorder'
import { loadSkeleton } from 'v2/components/ChannelContents/lib/loadSkeleton'

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

  const handleOnEnter = pageSkeleton => () => {
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

      {chunked.map((pageSkeleton, pageIndex) => (
        <React.Fragment key={JSON.stringify(pageSkeleton)}>
          <Waypoint
            onEnter={handleOnEnter(pageSkeleton)}
            fireOnRapidScroll={false}
            topOffset="-100%"
            bottomOffset="-100%"
          />

          {pageSkeleton.map((connectableSkeleton, connectableIndex) => {
            const _key = key(connectableSkeleton)
            const connectable = collection[_key]
            if (connectable) {
              return (
                <SortableGridItem
                  key={_key}
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
                key={_key}
                index={connectableIndex + pageIndex * chunkSize}
              >
                <Cell.Skeletal mode="loading" />
              </SortableGridItem>
            )
          })}

          <Waypoint
            onEnter={handleOnEnter(pageSkeleton)}
            fireOnRapidScroll={false}
            topOffset="-100%"
            bottomOffset="-100%"
          />
        </React.Fragment>
      ))}
    </SortableGrid>
  )
}

export default graphql<Props>(moveConnectableMutation, {
  name: 'moveConnectable',
})(withApollo(ChannelContents))
