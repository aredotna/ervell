import React from 'react'

import { ContextMenu } from 'v2/components/ContextMenu'

interface Props {
  channelCan: any
  connectableCan: any
  sourceUrl: any
  findOriginalUrl: any
}

export const ConnectableContextMenu: React.FC<Props> = ({
  channelCan,
  connectableCan,
  sourceUrl,
  findOriginalUrl,
  ...rest
}) => {
  const isDisplayable =
    channelCan.remove_connections ||
    sourceUrl ||
    findOriginalUrl ||
    connectableCan.mute ||
    channelCan.reorder_connections

  if (!isDisplayable) return null

  return (
    <ContextMenu position="absolute" top={8} right={8} zIndex={1} {...rest}>
      {channelCan.remove_connections && (
        <ContextMenu.Option iconName="Garbage">
          Remove connection
        </ContextMenu.Option>
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

      {connectableCan.mute && (
        <ContextMenu.Option iconName="Mute">Mute block</ContextMenu.Option>
      )}

      <ContextMenu.Divider />

      {channelCan.reorder_connections && (
        <>
          <ContextMenu.Option iconName="UpArrow">
            Move to top
          </ContextMenu.Option>

          <ContextMenu.Option iconName="DownArrow">
            Move to bottom
          </ContextMenu.Option>
        </>
      )}
    </ContextMenu>
  )
}
