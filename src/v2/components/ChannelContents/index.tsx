import React, { memo, useEffect, useCallback } from 'react'

import { SortableContainer } from 'react-sortable-hoc'

import { ChannelContents as ChannelContentsData } from '__generated__/ChannelContents'

import Grid from 'v2/components/UI/Grid'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import AddBlock from 'v2/components/AddBlock'
import { ChannelContentsItem } from './components/ChannelContentsItem'
import { usePaginatedBlocks } from './lib/usePaginatedBlocks'

import { usePusher } from 'v2/hooks/usePusher'

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
      removeBlock,
      addBlock,
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

    if (pusherChannel) {
      usePusher({
        channel: pusherChannel,
        // onCreated: addBlock,
        onCreated: () => {
          console.log('here')
        },
        onUpdated: () => {},
        parsePayload: () => {},
      })
    }

    useEffect(() => {
      return () => {
        if (pusherChannel) {
          socket.unsubscribe(pusherChannel.name)
          socket.disconnect()
        }
      }
    }, [pusherChannel, socket])

    const handleRemoveBlock = useCallback(
      ({ id, type }: { id: number; type: string }) => {
        removeBlock({ id, type })
      },
      [removeBlock]
    )

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
                onAddBlock={addBlock}
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
                key={
                  block ? `${block.id}.${block.__typename}` : `nullState${i}`
                }
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
