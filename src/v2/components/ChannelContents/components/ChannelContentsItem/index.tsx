import React, { memo, useState, useCallback } from 'react'
import { SortableElement } from 'react-sortable-hoc'

import { ChannelContentsConnectable as ChannelContentsConnectableData } from '__generated__/ChannelContentsConnectable'

import { touch as isTouchDevice } from 'v2/util/is'

import Cell from 'v2/components/Cell'
import GridItem from 'v2/components/UI/Grid/components/GridItem'
import { ConnectableContextMenu } from 'v2/components/ConnectableContextMenu'
import { DragHandle } from 'v2/components/UI/DragHandle'

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

    const startHover = useCallback(() => {
      if (isTouchDevice()) return false
      setHover(true)
    }, [])
    const endHover = useCallback(() => {
      if (isTouchDevice()) return false
      setHover(false)
    }, [])

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
        >
          <Cell.Konnectable
            konnectable={connectable}
            context={context}
            onOverlay={endHover}
            onOverlayClose={startHover}
          >
            {isHovering && (
              <>
                {channel.can.reorder_connections && (
                  <DragHandle position="absolute" top={8} left={8} zIndex={1} />
                )}

                <ConnectableContextMenu
                  channel={channel}
                  connectable={connectable}
                  onRemove={onRemove}
                  onChangePosition={handleChangePosition}
                />
              </>
            )}
          </Cell.Konnectable>
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
