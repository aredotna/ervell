import React, { useCallback } from 'react'
import { ColumnInstance, Row } from 'react-table'

import { ChannelRow } from '../../../Table/components/ChannelRow'
import { StandardRow } from '../../../Table/components/StandardRow'
import ExpandedBlockRow, {
  ExpandedBlockRowProps,
} from 'v2/components/Table/components/ExpandedBlockRow'
import ExpandedChannelRow from 'v2/components/Table/components/ExpandedChannelRow'
import { TableData } from 'v2/components/Table/lib/constants'

interface ProfileTableBodyProps {
  rows: Row<TableData>[]
  prepareRow: (row: Row<TableData>) => void
  columns: ColumnInstance<TableData>[]
}

export const ProfileTableBody: React.FC<ProfileTableBodyProps> = ({
  rows,
  prepareRow,
  columns,
}) => {
  const renderRow = useCallback(
    (row: Row<TableData>) => {
      prepareRow(row)

      const { key: rowKey, ...rowProps } = row.getRowProps()
      const expanded = row.isExpanded // || (!('isNull' in row.original) && row.original.connection.selected)

      const onMinimize = () => row.toggleRowExpanded(false)
      const onExpand = () => row.toggleRowExpanded(true)

      let tableItemContent: JSX.Element | null = null
      if (
        expanded &&
        '__typename' in row.original &&
        row.original.__typename !== 'Channel'
      ) {
        /**
         * If the row is an expanded connectable
         */

        const componentProps: ExpandedBlockRowProps = {
          block: row.original,
          columnLength: columns.length,
          ...rowProps,
          onMinimize,
        }
        tableItemContent = <ExpandedBlockRow key={rowKey} {...componentProps} />
      } else if (
        expanded &&
        '__typename' in row.original &&
        row.original.__typename === 'Channel'
      ) {
        /**
         * If the row is an expanded channel
         */
        tableItemContent = (
          <ExpandedChannelRow
            key={rowKey}
            channel={row.original}
            columnLength={columns.length}
            onMinimize={onMinimize}
            {...rowProps}
          />
        )
      } else if (
        '__typename' in row.original &&
        row.original.__typename === 'Channel'
      ) {
        /**
         * If the row is a channel
         */
        tableItemContent = (
          <ChannelRow
            key={rowKey}
            row={row}
            connectableChannel={row.original}
            expanded={expanded}
            onClick={onExpand}
            {...rowProps}
          />
        )
      } else {
        /**
         * If the row is a connectable or null
         */
        tableItemContent = (
          <StandardRow key={rowKey} row={row} expanded={expanded} />
        )
      }

      return tableItemContent
    },
    [prepareRow]
  )

  return <>{rows.map(renderRow)}</>
}
