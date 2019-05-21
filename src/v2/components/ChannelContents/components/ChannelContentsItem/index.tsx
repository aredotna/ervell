import React, { memo, useState, useCallback } from 'react'
import { SortableElement } from 'react-sortable-hoc'

import { ChannelContentsConnectable as ChannelContentsConnectableData } from '__generated__/ChannelContentsConnectable'

import Cell from 'v2/components/Cell'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import { ConnectableContextMenu } from 'v2/components/ConnectableContextMenu'

const SortableGridItem = SortableElement(GridItem)

interface Props {
  channel: any
  connectable: ChannelContentsConnectableData
  index: number
  context: any[]
  onRemove: ({ id, type }: { id: number; type: string }) => any
  onChangePosition: ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => any
}

export const ChannelContentsItem: React.FC<Props> = memo(
  ({ channel, connectable, index, context, onRemove, onChangePosition }) => {
    const [isHovering, setHover] = useState(false)

    const cancelDrag = useCallback(e => {
      e.preventDefault()
      e.stopPropagation()
    }, [])

    const startHover = useCallback(() => setHover(true), [])
    const endHover = useCallback(() => setHover(false), [])
    const handleChangePosition = useCallback(
      (newIndex: number) => onChangePosition({ oldIndex: index, newIndex }),
      [index, onChangePosition]
    )

    if (connectable) {
      return (
        <SortableGridItem
          disabled={!channel.can.reorder_connections}
          index={index}
          onMouseEnter={startHover}
          onMouseLeave={endHover}
          onDrag={cancelDrag}
        >
          <Cell.Konnectable konnectable={connectable} context={context} />

          {isHovering && (
            <ConnectableContextMenu
              channel={channel}
              connectable={connectable}
              onRemove={onRemove}
              onChangePosition={handleChangePosition}
            />
          )}
        </SortableGridItem>
      )
    }

    return (
      <GridItem>
        <Cell.Skeletal />
      </GridItem>
    )
  }
)
