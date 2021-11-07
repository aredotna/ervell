import React, { memo, useCallback } from 'react'
import { SortableContainer } from 'react-sortable-hoc'

import { ChannelContents as ChannelContentsData } from '__generated__/ChannelContents'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'
import {
  ChannelBlokksPaginated,
  ChannelBlokksPaginatedVariables,
} from '__generated__/ChannelBlokksPaginated'
import {
  ConnectableBlokk,
  ConnectableBlokkVariables,
} from '__generated__/ConnectableBlokk'

import Grid from 'v2/components/UI/Grid'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import AddBlock from 'v2/components/AddBlock'
import { usePusher } from 'v2/hooks/usePusher'
import { usePaginatedBlocks } from 'v2/hooks/usePaginatedBlocks'
import WithIsSpiderRequesting from 'v2/hocs/WithIsSpiderRequesting'
import { getConnectableType } from 'v2/util/getConnectableType'

import { ChannelContentsItem } from './components/ChannelContentsItem'
import channelBlokksPaginatedQuery from './queries/channelBlokksPaginated'
import ConnectableBlockQuery from './queries/connectableBlokk'

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
      updateBlock,
      getBlocksFromCache,
    } = usePaginatedBlocks<
      ChannelBlokksPaginated,
      ChannelBlokksPaginatedVariables,
      ConnectableBlokk,
      ConnectableBlokkVariables
    >({
      channelId: channel.id.toString(),
      ssr: isSpiderRequesting,
      channelQuery: channelBlokksPaginatedQuery,
      per: 10,
      blockquery: ConnectableBlockQuery,
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
        updateBlock({ id, type })
      },
      [updateBlock]
    )

    const createdConnectable = useCallback(
      ({ id, type }: PusherPayload) => {
        //
        // This method can be called in a few different cases:
        // - When a block is added via add block either by you or from another person (via pusher)
        // - When a block is connected into the channel from another person
        // - AND when a block in the current channel is connected into another channel
        // We need to first check if the block already exists in this channel,
        // if it does, do nothing. Otherwise, proceed.
        //
        const cacheBlocks = getBlocksFromCache()

        const blockIndex = cacheBlocks.findIndex(
          block =>
            block &&
            block.id === parseInt(id) &&
            getConnectableType(block.__typename) === type
        )

        // If the block already exists, early return
        if (blockIndex > 0) return

        // Otherwise proceed.
        addBlock()
      },
      [getBlocksFromCache, addBlock]
    )

    usePusher({
      channelId: channel.id,
      shouldSubscribe: !isSpiderRequesting && (channel?.can?.add_to ?? false),
      onCreated: createdConnectable,
      onUpdated: updateConnectable,
      parsePayload: parsePayload,
    })

    // For the lightbox, we need to filter out channels
    const lightboxConnectables = blocks.filter(
      block =>
        !!block &&
        getConnectableType(block.__typename) === BaseConnectableTypeEnum.BLOCK
    )

    const blocksJsx = blocks.map((block, i) => (
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
    ))

    return (
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
        {(channel?.can?.add_to || channel?.can?.add_to_as_premium) && (
          <GridItem>
            <AddBlock
              channel_id={channel.id}
              onAddBlock={addBlock}
              isElligbleForPremium={
                !channel.can.add_to && !!channel.can.add_to_as_premium
              }
            />
          </GridItem>
        )}

        {blocksJsx}
      </SortableGrid>
    )
  })
)

export default ChannelContents
