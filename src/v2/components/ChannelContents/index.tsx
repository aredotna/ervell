import React, { memo, useEffect, useCallback } from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import { useApolloClient } from '@apollo/client'

import { ChannelContents as ChannelContentsData } from '__generated__/ChannelContents'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'
import {
  ConnectableBlokk,
  ConnectableBlokkVariables,
} from '__generated__/ConnectableBlokk'

import Grid from 'v2/components/UI/Grid'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import AddBlock from 'v2/components/AddBlock'
import { usePusher } from 'v2/hooks/usePusher'
import WithIsSpiderRequesting from 'v2/hocs/WithIsSpiderRequesting'

import { ChannelContentsItem } from './components/ChannelContentsItem'
import { usePaginatedBlocks } from './lib/usePaginatedBlocks'
import { getConnectableType } from './lib/getConnectableType'
import connectableBlokk from './queries/connectableBlokk'

const SortableGrid = SortableContainer(({ onSortEnd: _onSortEnd, ...rest }) => (
  <Grid {...rest} />
))

interface Props {
  channel: ChannelContentsData
  pusherChannel?: any
  socket?: any
}

interface ExtendedProps extends Props {
  isSpiderRequesting: boolean
}

const ChannelContents: React.FC<Props> = WithIsSpiderRequesting<ExtendedProps>(
  memo(({ channel, pusherChannel, socket, isSpiderRequesting, ...rest }) => {
    const {
      blocks,
      getPage,
      getPageFromIndex,
      hasQueriedPage,
      moveBlock,
      removeBlock,
      addBlock,
      contentCount,
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

    const parsePayload = useCallback(
      ({ id }) => ({
        id: id.toString(),
      }),
      []
    )

    const client = useApolloClient()

    const updateConnectable = useCallback(
      ({ id }: { id: string | number }) => {
        client.query<ConnectableBlokk, ConnectableBlokkVariables>({
          query: connectableBlokk,
          variables: {
            id: id.toString(),
          },
          fetchPolicy: 'network-only',
        })
      },
      [client]
    )

    usePusher({
      channel: pusherChannel,
      onCreated: addBlock,
      onUpdated: updateConnectable,
      parsePayload: parsePayload,
    })

    useEffect(() => {
      return () => {
        if (pusherChannel) {
          socket.unsubscribe(pusherChannel.name)
          socket.disconnect()
        }
      }
    }, [pusherChannel, socket])

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
