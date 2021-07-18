import React, { memo, useEffect, useCallback } from 'react'

import { SortableContainer } from 'react-sortable-hoc'

import {
  ChannelContents as ChannelContentsData,
  // ChannelContents_skeleton,
} from '__generated__/ChannelContents'

import Grid from 'v2/components/UI/Grid'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import AddBlock from 'v2/components/AddBlock'
import { ChannelContentsItem } from './components/ChannelContentsItem'
import { usePaginatedBlocks } from './lib/usePaginatedBlocks'

// import { usePusher } from 'v2/hooks/usePusher'

const SortableGrid = SortableContainer(({ onSortEnd: _onSortEnd, ...rest }) => (
  <Grid {...rest} />
))

interface Props {
  channel: ChannelContentsData
  pusherChannel?: any
  socket?: any
}

const ChannelContents: React.FC<Props> = memo(
  ({ channel, pusherChannel, socket, ...rest }) => {
    const {
      blocks,
      getPage,
      getPageFromIndex,
      hasQueriedPage,
      moveBlock,
    } = usePaginatedBlocks({
      channelId: channel.id,
      initialData: channel.blokks,
      initialBlockCount: channel.counts.contents,
    })

    useEffect(() => {
      getPage(1)
    }, [getPage])

    const onItemIntersected = useCallback(
      (index: number) => {
        const page = getPageFromIndex(index)
        if (!hasQueriedPage(page)) {
          getPage(page)
        }
      },
      [getPage, getPageFromIndex, hasQueriedPage]
    )

    // Used to load/unload waypoints
    // const [activeQueries, setActiveQueries] = useState<
    //   ActiveQueriesCollection.ActiveQueries
    // >({})

    // Handles ordering of block grid items
    // const [connectables, setConnectables] = useState(channel.skeleton)

    // Handles actual contents of block grid items
    // const [collection, setCollection] = useState(
    //   ConnectableCellsCollection.normalize(channel.blokks)
    // )

    // const addConnectable = useCallback(newConnectable => {
    //   setConnectables(prevConnectables => {
    //     if (
    //       !prevConnectables.some(
    //         c =>
    //           c.id === newConnectable.id &&
    //           c.type.toUpperCase() === newConnectable.type.toUpperCase()
    //       )
    //     ) {
    //       return [
    //         {
    //           id: newConnectable.id,
    //           type: { BLOCK: 'Block', CHANNEL: 'Channel' }[
    //             newConnectable.type.toUpperCase()
    //           ],
    //           __typename: 'SkeletalConnectable',
    //         },
    //         ...prevConnectables,
    //       ]
    //     }

    //     return prevConnectables
    //   })
    // }, [])

    // const updateConnectable = useCallback(
    //   connectable => {
    //     loadSkeleton({
    //       client,
    //       channelId: channel.id,
    //       pageSkeleton: [connectable],
    //       collection,
    //       queryOptions: {
    //         fetchPolicy: 'network-only',
    //       },
    //     }).then(contents => {
    //       if (!contents) return
    //       setCollection(prevCollection => ({ ...prevCollection, ...contents }))
    //     })
    //   },
    //   [channel.id, client, collection]
    // )

    // const parsePayload = useCallback(
    //   ({ id, base_class }) => ({
    //     id,
    //     type: base_class.toUpperCase(),
    //   }),
    //   []
    // )

    // if (pusherChannel) {
    //   usePusher({
    //     channel: pusherChannel,
    //     onCreated: addConnectable,
    //     onUpdated: updateConnectable,
    //     parsePayload,
    //   })
    // }

    useEffect(() => {
      return () => {
        if (pusherChannel) {
          socket.unsubscribe(pusherChannel.name)
          socket.disconnect()
        }
      }
    }, [pusherChannel, socket])

    // const handleAddBlock = useCallback(
    //   ({ id }: { id: number }) => {
    //     addConnectable({ id, type: 'Block' })
    //   },
    //   [addConnectable]
    // )
    const handleAddBlock = () => {}

    // const handleRemoveBlock = useCallback(
    //   ({ id, type }: { id: number; type: string }) => {
    //     setConnectables(prevConnectables => {
    //       return prevConnectables.filter(
    //         connectable => connectable.id !== id && connectable.type !== type
    //       )
    //     })
    //   },
    //   []
    // )
    const handleRemoveBlock = () => {}

    // const handleSortEnd = useCallback(
    //   ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    //     const connectable = connectables[oldIndex]

    //     let startIndex = oldIndex
    //     let endIndex = newIndex

    //     if (newIndex === -1) {
    //       // Moving to the "bottom"
    //       startIndex = oldIndex
    //       endIndex = connectables.length - 1
    //     }

    //     const sorted = reorder({
    //       list: connectables,
    //       startIndex,
    //       endIndex,
    //     })

    //     setConnectables(sorted)

    //     const insertAt = connectables.length - endIndex

    //     moveConnectable({
    //       variables: {
    //         channel_id: channel.id,
    //         connectable: {
    //           id: connectable.id,
    //           type: connectable.type.toUpperCase(),
    //         },
    //         insert_at: insertAt,
    //       },
    //     })
    //   },
    //   [channel.id, connectables, moveConnectable]
    // )
    const handleSortEnd = useCallback(
      ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
        moveBlock({ oldIndex, newIndex })
      },
      [moveBlock]
    )

    // For the lightbox, we need to filter out channels
    const lightboxConnectables = []

    return (
      <>
        <SortableGrid
          axis="xy"
          useWindowAsScrollContainer
          transitionDuration={0}
          onSortEnd={handleSortEnd}
          wrapChildren={false}
          distance={1}
          useDragHandle
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

          {/* DEV */}
          {blocks.map((block, i) => {
            return (
              <ChannelContentsItem
                key={block?.id ?? `nullState${i}`}
                index={i}
                channel={channel}
                connectable={block}
                context={lightboxConnectables}
                onRemove={handleRemoveBlock}
                onChangePosition={handleSortEnd}
                onItemIntersected={onItemIntersected}
              />
            )
          })}

          {/* {chunked.map((pageSkeleton, pageIndex: number) => {
            const pageKey = ActiveQueriesCollection.key(pageSkeleton)

            return (
              <React.Fragment key={pageKey}>
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
                      context={lightboxConnectables}
                      onRemove={handleRemoveBlock}
                      onChangePosition={handleSortEnd}
                    />
                  )
                })}
              </React.Fragment>
            )
          })} */}
        </SortableGrid>
      </>
    )
  }
)

export default ChannelContents
