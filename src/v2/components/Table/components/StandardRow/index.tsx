import React, { forwardRef, useCallback, useState } from 'react'
import { Row } from 'react-table'
import { ChannelPage_channel } from '__generated__/ChannelPage'
import { TableData } from '../../../ChannelTableContents/lib/types'
import { TD, TR } from '../TableComponents'

interface StandardRowProps {
  row: Row<TableData>
  expanded: boolean
  removeBlock: (args: { id: number; type: string }) => void
  moveBlock: (args: { oldIndex: number; newIndex: number }) => void
  channel: ChannelPage_channel
  isRowMovable?: boolean
}

export const StandardRow = forwardRef<HTMLElement, StandardRowProps>(
  ({ row, removeBlock, moveBlock, channel, isRowMovable, ...rest }, ref) => {
    const [mode, setMode] = useState<'resting' | 'active'>('resting')

    const onClick = useCallback(
      (e: React.MouseEvent) => {
        if (mode === 'active') {
          e.stopPropagation()
          e.preventDefault()
          return
        }

        row.toggleRowExpanded(true)
      },
      [mode]
    )

    const cells = row.cells.map(cell => {
      const { key: cellKey, ...cellProps } = cell.getCellProps()
      const isSettings = cellKey.toString().includes('addSettings')
      const isTitle = cellKey.toString().includes('title')
      const extraProps = isSettings
        ? {
            removeBlock,
            channel,
            moveBlock,
            onClickConnect: setMode,
            index: row.index,
            isRowMovable,
          }
        : {}
      return (
        <TD
          key={cellKey}
          width={cell.column.width}
          maxWidth={cell.column.maxWidth}
          bg={isSettings ? 'gray.hint' : 'background'}
          scope={isTitle && 'row'}
          {...cellProps}
        >
          {cell.render('Cell', extraProps)}
        </TD>
      )
    })

    return (
      <TR onClick={onClick} {...rest} ref={ref}>
        {cells}
      </TR>
    )
  }
)
