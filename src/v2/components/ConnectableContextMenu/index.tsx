import React from 'react'
import styled from 'styled-components'

import { ConnectableContextMenuChannel as ConnectableContextMenuChannelData } from '__generated__/ConnectableContextMenuChannel'

import { ContextMenu } from 'v2/components/ContextMenu'
import { ConnectableContextMenuRemoveConnection } from 'v2/components/ConnectableContextMenu/components/ConnectableContextMenuRemoveConnection'
import { ConnectableContextMenuMuteBlock } from 'v2/components/ConnectableContextMenu/components/ConnectableContextMenuMuteBlock'
import { ConnectableContextMenuReorderConnections } from 'v2/components/ConnectableContextMenu/components/ConnectableContextMenuReorderConnections'
import { BoxProps } from '../UI/Box'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'

import { useQuery } from '@apollo/client'
import {
  BlokkContextMenu,
  BlokkContextMenuVariables,
  BlokkContextMenu_blokk,
} from '__generated__/BlokkContextMenu'
import { blokkContextMenu } from './queries/blokkContextMenu'
import { toBaseConnectableType } from 'v2/util/transformConnectableTypes'
import {
  ChannelContextMenu as ChannelContextMenuType,
  ChannelContextMenuVariables,
} from '__generated__/ChannelContextMenu'
import { channelContextMenu } from './queries/channelContextMenu'

const Loader = styled(LoadingIndicator).attrs({
  f: 3,
  px: 8,
  py: 4,
})``

interface Props {
  channel: ConnectableContextMenuChannelData
  connectable: {
    __typename: string
    id: number
  }
  onRemove: ({ id, type }: { id: number; type: string }) => any
  onChangePosition: (newIndex: number) => void
  zIndex?: number
}

export const ConnectableContextMenu: React.FC<Props & BoxProps> = ({
  channel,
  connectable,
  onRemove,
  onChangePosition,
  zIndex = 1,
  ...rest
}) => {
  const type = toBaseConnectableType(connectable.__typename as any)

  return (
    <ContextMenu
      position="absolute"
      top={8}
      right={8}
      zIndex={zIndex}
      {...rest}
    >
      {type === 'BLOCK' && (
        <BlockContextMenu
          id={connectable.id.toString()}
          connectable={connectable}
          channel={channel}
          onRemove={onRemove}
          onChangePosition={onChangePosition}
        />
      )}
      {type === 'CHANNEL' && (
        <ChannelContextMenu
          id={connectable.id.toString()}
          connectable={connectable}
          channel={channel}
          onRemove={onRemove}
          onChangePosition={onChangePosition}
        />
      )}
    </ContextMenu>
  )
}

interface BlockContextMenuContentsProps {
  id: string
}

const BlockContextMenu: React.FC<Props & BlockContextMenuContentsProps> = ({
  id,
  channel,
  onRemove,
  onChangePosition,
}) => {
  const { data, loading, error } = useQuery<
    BlokkContextMenu,
    BlokkContextMenuVariables
  >(blokkContextMenu, {
    variables: {
      id,
    },
  })

  if (loading) return <Loader />
  if (error) return <></>

  const connectable = data?.blokk

  return (
    <ContextMenuContents
      channel={channel}
      connectable={connectable}
      onRemove={onRemove}
      onChangePosition={onChangePosition}
    />
  )
}

interface ChannelContextMenuContentsProps {
  id: string
}

const ChannelContextMenu: React.FC<Props & ChannelContextMenuContentsProps> = ({
  id,
  channel,
  onRemove,
  onChangePosition,
}) => {
  const { data, loading, error } = useQuery<
    ChannelContextMenuType,
    ChannelContextMenuVariables
  >(channelContextMenu, {
    variables: {
      id,
    },
  })

  if (loading) return <Loader />
  if (error) return <></>

  const connectable = data?.channel

  return (
    <ContextMenuContents
      channel={channel}
      connectable={connectable}
      onRemove={onRemove}
      onChangePosition={onChangePosition}
    />
  )
}

interface ContextMenuContentsProps extends Omit<Props, 'connectable'> {
  connectable: BlokkContextMenu_blokk
}

const ContextMenuContents: React.FC<ContextMenuContentsProps> = ({
  connectable,
  channel,
  onRemove,
  onChangePosition,
}) => {
  const findOriginalUrl =
    connectable.__typename === 'Image' && connectable.find_original_url
  const sourceUrl =
    connectable.__typename !== 'Channel' &&
    connectable.__typename !== 'PendingBlock' &&
    connectable.source &&
    connectable.source.url

  const isDisplayable =
    channel.can.update ||
    sourceUrl ||
    findOriginalUrl ||
    connectable.can.mute ||
    channel.can.update ||
    connectable.connection?.can?.destroy

  const canRemove =
    channel.can.update ||
    (connectable.__typename !== 'Channel' && connectable.can.remove) ||
    connectable.connection?.can?.destroy

  if (!isDisplayable) return null

  return (
    <>
      {canRemove && (
        <ConnectableContextMenuRemoveConnection
          channelId={channel.id}
          connectableId={connectable.id}
          connectableType={connectable.__typename}
          onRemove={onRemove}
        />
      )}

      {sourceUrl && (
        <ContextMenu.Option iconName="Link" href={sourceUrl}>
          View source
        </ContextMenu.Option>
      )}

      {findOriginalUrl && (
        <ContextMenu.Option iconName="Globe" href={findOriginalUrl}>
          Find original
        </ContextMenu.Option>
      )}

      {connectable.can.mute && (
        <ConnectableContextMenuMuteBlock
          connectableId={connectable.id}
          connectableType={connectable.__typename}
        />
      )}

      {channel.can.update && (
        <ConnectableContextMenuReorderConnections
          onChangePosition={onChangePosition}
        />
      )}
    </>
  )
}
