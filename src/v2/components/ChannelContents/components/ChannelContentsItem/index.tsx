import React, { useState, useCallback } from 'react'
import { SortableElement } from 'react-sortable-hoc'

import Cell from 'v2/components/Cell'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import { ConnectableContextMenu } from 'v2/components/ConnectableContextMenu'

const SortableGridItem = SortableElement(GridItem)

interface Props {
  channelCan: any
  connectable: any
  connectableSkeleton: any
  index: number
  context: any
}

export const ChannelContentsItem: React.FC<Props> = ({
  channelCan,
  connectable,
  connectableSkeleton,
  index,
  context,
  ...rest
}) => {
  const [isHovering, setHover] = useState(false)

  const cancelDrag = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const startHover = useCallback(() => setHover(true), [])
  const endHover = useCallback(() => setHover(false), [])

  if (connectable) {
    return (
      <SortableGridItem
        disabled={!channelCan.reorder_connections}
        index={index}
        onMouseEnter={startHover}
        onMouseLeave={endHover}
        onDrag={cancelDrag}
        {...rest}
      >
        <Cell.Konnectable konnectable={connectable} context={context} />

        {isHovering && (
          <ConnectableContextMenu
            channelCan={channelCan}
            connectableCan={connectable.can}
            findOriginalUrl={
              connectable.__typename === 'Image' &&
              connectable.find_original_url
            }
            sourceUrl={connectable.source && connectable.source.url}
          />
        )}
      </SortableGridItem>
    )
  }

  return (
    <SortableGridItem index={index} {...rest}>
      <Cell.Skeletal mode="loading" />
    </SortableGridItem>
  )
}
