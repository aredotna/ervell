import React, { useState, useCallback } from 'react'
import { SortableElement } from 'react-sortable-hoc'

import Cell from 'v2/components/Cell'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import { ConnectableContextMenu } from 'v2/components/ConnectableContextMenu'

const SortableGridItem = SortableElement(GridItem)

interface Props {
  channel: any
  connectable: any
  connectableSkeleton: any
  index: number
  context: any
  onRemove: (props: any) => any
}

export const ChannelContentsItem: React.FC<Props> = ({
  channel,
  connectable,
  connectableSkeleton,
  index,
  context,
  onRemove,
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
        disabled={!channel.can.reorder_connections}
        index={index}
        onMouseEnter={startHover}
        onMouseLeave={endHover}
        onDrag={cancelDrag}
        {...rest}
      >
        <Cell.Konnectable konnectable={connectable} context={context} />

        {isHovering && (
          <ConnectableContextMenu
            channel={channel}
            connectable={connectable}
            onRemove={onRemove}
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
