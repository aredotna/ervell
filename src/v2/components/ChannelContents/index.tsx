import React, { memo, useCallback } from 'react'
import { SortableContainer } from 'react-sortable-hoc'

import { ChannelContents as ChannelContentsData } from '__generated__/ChannelContents'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'

import Grid from 'v2/components/UI/Grid'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import AddBlock from 'v2/components/AddBlock'
import { usePusher } from 'v2/hooks/usePusher'
import WithIsSpiderRequesting from 'v2/hocs/WithIsSpiderRequesting'

import { ChannelContentsItem } from './components/ChannelContentsItem'
import { usePaginatedBlocks } from './lib/usePaginatedBlocks'
import { getConnectableType } from './lib/getConnectableType'

const SortableGrid = SortableContainer(({ onSortEnd: _onSortEnd, ...rest }) => (
  <Grid {...rest} />
))

interface Props {
  channel: ChannelContentsData
}

interface ExtendedProps extends Props {
  isSpiderRequesting: boolean
}

type PusherPayload = {
  id: string
  type: BaseConnectableTypeEnum | false
}

const parsePayload = (payload: any): PusherPayload => {
  let type: BaseConnectableTypeEnum | false = false
  switch (payload.base_class.toUpperCase()) {
    case 'BLOCK':
      type = BaseConnectableTypeEnum.BLOCK
      break
    case 'CHANNEL':
      type = BaseConnectableTypeEnum.CHANNEL
      break
  }

  return {
    id: payload.id.toString(),
    type: type,
  }
}

const ChannelContents: React.FC<Props> = WithIsSpiderRequesting<ExtendedProps>(
  memo(({ channel, isSpiderRequesting, ...rest }) => {
    const {
      blocks,
      getPage,
      getPageFromIndex,
      hasQueriedPage,
      moveBlock,
      removeBlock,
      addBlock,
      contentCount,
      getBlocksFromCache,
    } = usePaginatedBlocks({
      channelId: channel.id,
      ssr: isSpiderRequesting,
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

    const updateConnectable = useCallback(
      ({ id, type }: PusherPayload) => {
        // Call getBlocksFromCache instead of using standard
        // "blocks" value so that this useCallback can have a
        // reference-stable value, even if the "blocks" value
        // changes.
        const cacheBlocks = getBlocksFromCache()

        // Get the index of the block that was updated
        const blockIndex = cacheBlocks.findIndex(block => {
          return (
            block &&
            block.id.toString() === id &&
            getConnectableType(block.__typename) === type
          )
        })

        // Early exit if the block can't be found
        if (blockIndex === -1) {
          return
        }

        // Revalidate the page that the block is contained in
        getPage(getPageFromIndex(blockIndex))
      },
      [getBlocksFromCache, getPage, getPageFromIndex]
    )

    usePusher({
      channelId: channel.id,
      shouldSubscribe: !isSpiderRequesting && channel.can.add_to,
      onCreated: addBlock,
      onUpdated: updateConnectable,
      parsePayload: parsePayload,
    })

    // For the lightbox, we need to filter out channels
    const lightboxConnectables = blocks.filter(
      block =>
        !!block &&
        getConnectableType(block.__typename) === BaseConnectableTypeEnum.BLOCK
    )

    const blocksJsx: JSX.Element[] = []
    for (let i = 0; i < (contentCount || channel.counts.contents); i++) {
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
  })
)

export default ChannelContents
