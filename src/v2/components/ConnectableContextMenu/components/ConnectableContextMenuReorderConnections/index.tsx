import React, { useCallback } from 'react'

import { ContextMenu } from 'v2/components/ContextMenu'

export const ConnectableContextMenuReorderConnections = ({
  onChangePosition,
}: {
  onChangePosition: (newIndex: number) => void
}) => {
  const moveToTop = useCallback(
    e => {
      e.preventDefault()
      onChangePosition(0)
    },
    [onChangePosition]
  )

  const moveToBottom = useCallback(
    e => {
      e.preventDefault()
      onChangePosition(-1)
    },
    [onChangePosition]
  )

  return (
    <>
      <ContextMenu.Divider />

      <ContextMenu.Option iconName="UpArrow" onClick={moveToTop}>
        Move to top
      </ContextMenu.Option>

      <ContextMenu.Option iconName="DownArrow" onClick={moveToBottom}>
        Move to bottom
      </ContextMenu.Option>
    </>
  )
}
