import React, { forwardRef, useCallback, useState } from 'react'
import { Row } from 'react-table'
import { ChannelPage_channel } from '__generated__/ChannelPage'
import { TableData } from '../../lib/types'
import { TD, TR } from '../TableComponents'

interface StandardRowProps {
  row: Row<TableData>
  expanded: boolean
  removeBlock: (args: { id: number; type: string }) => void
  moveBlock: (args: { oldIndex: number; newIndex: number }) => void
  channel: ChannelPage_channel
}

export const StandardRow = forwardRef<HTMLElement, StandardRowProps>(
  ({ row, removeBlock, moveBlock, channel, ...rest }, ref) => {
    const [mode, setMode] = useState<'resting' | 'active'>('resting')

    const onClick = useCallback(
      (e: React.MouseEvent) => {
        console.log('onClick', { mode })
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
      const extraProps = isSettings
        ? {
            removeBlock,
            channel,
            moveBlock,
            onClickConnect: setMode,
            index: row.index,
          }
        : {}
      return (
        <TD
          key={cellKey}
          width={cell.column.width}
          maxWidth={cell.column.maxWidth}
          bg={isSettings ? 'gray.hint' : 'background'}
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
