import React from 'react'
import { ColumnInstance, Row } from 'react-table'

import { IntersectionObserverBox } from 'v2/components/UI/IntersectionObserverBox'
import { TableData } from '../../lib/types'
import { ChannelRow } from '../ChannelRow'
import ExpandedBlockRow, { ExpandedBlockRowProps } from '../ExpandedBlockRow'
import ExpandedChannelRow from '../ExpandedChannelRow'
import { TD, TR } from '../TableComponents'

interface TableBodyProps {
  rows: Row<TableData>[]
  prepareRow: (row: Row<TableData>) => void
  intersectionObserverCallback: (
    itemIndex: number
  ) => (entries: IntersectionObserverEntry[]) => void
  intersectionObserverOptions: IntersectionObserverInit
  columns: ColumnInstance<TableData>[]
}

export const ChannelTableBody: React.FC<TableBodyProps> = ({
  rows,
  prepareRow,
  intersectionObserverCallback,
  intersectionObserverOptions,
  columns,
}) => {
  return (
    <>
      {rows.map(row => {
        prepareRow(row)

        const { key: rowKey, ...rowProps } = row.getRowProps()
        const sharedIntersectionObserverBoxProps = {
          key: rowKey,
          id: row.index,
          callback: intersectionObserverCallback,
          options: intersectionObserverOptions,
        }

        if ('__typename' in row.original) {
          if (row.isExpanded && row.original.__typename !== 'Channel') {
            const componentProps: ExpandedBlockRowProps = {
              block: row.original,
              columnLength: columns.length,
              ...rowProps,
              onMinimize: () => row.toggleRowExpanded(false),
            }
            return (
              <IntersectionObserverBox
                {...sharedIntersectionObserverBoxProps}
                Component={ExpandedBlockRow}
                componentProps={componentProps}
              />
            )
          }

          if (row.isExpanded && row.original.__typename === 'Channel') {
            return (
              <IntersectionObserverBox
                {...sharedIntersectionObserverBoxProps}
                Component={ExpandedChannelRow}
                componentProps={{
                  channel: row.original,
                  columnLength: columns.length,
                  ...rowProps,
                  onMinimize: () => row.toggleRowExpanded(false),
                }}
              />
            )
          }

          if (row.original.__typename === 'Channel') {
            return (
              <IntersectionObserverBox
                {...sharedIntersectionObserverBoxProps}
                Component={ChannelRow}
                componentProps={{
                  channel: row.original,
                  ...rowProps,
                  onClick: () => row.toggleRowExpanded(true),
                }}
              />
            )
          }
        }

        return (
          <IntersectionObserverBox
            {...sharedIntersectionObserverBoxProps}
            key={rowKey}
            Component={TR}
            componentProps={{
              ...rowProps,
              onClick: () => row.toggleRowExpanded(true),
              children: row.cells.map(cell => {
                const { key: cellKey, ...cellProps } = cell.getCellProps()
                return (
                  <TD
                    key={cellKey}
                    width={cell.column.width}
                    maxWidth={cell.column.maxWidth}
                    {...cellProps}
                  >
                    {cell.render('Cell')}
                  </TD>
                )
              }),
            }}
          />
        )
      })}
    </>
  )
}
