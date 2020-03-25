import React from 'react'

import { ConnectableContextMenuChannel as ConnectableContextMenuChannelData } from '__generated__/ConnectableContextMenuChannel'
import { ConnectableContextMenuConnectable as ConnectableContextMenuConnectableData } from '__generated__/ConnectableContextMenuConnectable'

import { ContextMenu } from 'v2/components/ContextMenu'
import { ConnectableContextMenuRemoveConnection } from 'v2/components/ConnectableContextMenu/components/ConnectableContextMenuRemoveConnection'
import { ConnectableContextMenuMuteBlock } from 'v2/components/ConnectableContextMenu/components/ConnectableContextMenuMuteBlock'
import { ConnectableContextMenuReorderConnections } from 'v2/components/ConnectableContextMenu/components/ConnectableContextMenuReorderConnections'

interface Props {
  channel: ConnectableContextMenuChannelData
  connectable: ConnectableContextMenuConnectableData
  onRemove: ({ id, type }: { id: number; type: string }) => any
  onChangePosition: (newIndex: number) => { newIndex: number; oldIndex: number }
}

export const ConnectableContextMenu: React.FC<Props> = ({
  channel,
  connectable,
  onRemove,
  onChangePosition,
  ...rest
}) => {
  const findOriginalUrl =
    connectable.__typename === 'Image' && connectable.find_original_url
  const sourceUrl =
    connectable.__typename !== 'Channel' &&
    connectable.__typename !== 'PendingBlock' &&
    connectable.source &&
    connectable.source.url

  const isDisplayable =
    channel.can.remove_connections ||
    sourceUrl ||
    findOriginalUrl ||
    connectable.can.mute ||
    channel.can.reorder_connections ||
    connectable.connection.can.destroy

  const canRemove =
    channel.can.remove_connections ||
    (connectable.__typename !== 'Channel' && connectable.can.remove) ||
    connectable.connection.can.destroy

  if (!isDisplayable) return null

  return (
    <ContextMenu position="absolute" top={8} right={8} zIndex={1} {...rest}>
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

      {channel.can.reorder_connections && (
        <ConnectableContextMenuReorderConnections
          onChangePosition={onChangePosition}
        />
      )}
    </ContextMenu>
  )
}
