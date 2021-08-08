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
      // eslint-disable-next-line react-hooks/rules-of-hooks
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

    // For the lightbox, we need to filter out channels
    const lightboxConnectables = []

    const blocksJsx: JSX.Element[] = []

    console.log(blocks)

    for (let i = 0; i < Math.max(channel.counts.contents, blocks.length); i++) {
      const block = blocks[i]

      blocksJsx.push(
        <ChannelContentsItem
          key={block ? `${block.id}.${block.__typename}` : `nullState${i}`}
          index={i}
          channel={channel}
          connectable={block}
          context={lightboxConnectables}
          onRemove={removeBlock}
          onChangePosition={moveBlock}
          onItemIntersected={onItemIntersected}
        />
      )
    }

    return (
      <>
        <SortableGrid
          axis="xy"
          useWindowAsScrollContainer
          transitionDuration={0}
          onSortEnd={moveBlock}
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

          {blocksJsx}
        </SortableGrid>
      </>
    )
  }
)

export default ChannelContents
