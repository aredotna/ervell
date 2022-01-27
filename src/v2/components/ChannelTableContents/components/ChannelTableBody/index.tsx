import React, { useCallback } from 'react'
import { ColumnInstance, Row } from 'react-table'

import { ConnectableTypeEnum, Sorts } from '__generated__/globalTypes'

import { IntersectionObserverBox } from 'v2/components/UI/IntersectionObserverBox'
import { SortAndSortDir, TableData } from '../../lib/types'
import { ChannelRow } from '../ChannelRow'
import ExpandedBlockRow, { ExpandedBlockRowProps } from '../ExpandedBlockRow'
import ExpandedChannelRow from '../ExpandedChannelRow'
import { SortableTableItem } from '../SortableTableItem'
import { ChannelPage_channel } from '__generated__/ChannelPage'
import { StandardRow } from '../StandardRow'
import { ChannelTableConnectors_channel_connectors } from '__generated__/ChannelTableConnectors'

interface TableBodyProps {
  rows: Row<TableData>[]
  prepareRow: (row: Row<TableData>) => void
  intersectionObserverCallback: (
    itemIndex: number
  ) => (entries: IntersectionObserverEntry[]) => void
  intersectionObserverOptions: IntersectionObserverInit
  columns: ColumnInstance<TableData>[]
  sortAndSortDir: SortAndSortDir
  type?: ConnectableTypeEnum
  user?: ChannelTableConnectors_channel_connectors
  removeBlock: (args: { id: number; type: string }) => void
  moveBlock: (args: { oldIndex: number; newIndex: number }) => void
  channel: ChannelPage_channel
}

export const ChannelTableBody: React.FC<TableBodyProps> = ({
  rows,
  prepareRow,
  intersectionObserverCallback,
  intersectionObserverOptions,
  columns,
  sortAndSortDir,
  removeBlock,
  moveBlock,
  channel,
  type,
  user,
}) => {
  const renderRow = useCallback(
    (row: Row<TableData>) => {
      prepareRow(row)

      const { key: rowKey, ...rowProps } = row.getRowProps()
      const expanded = row.isExpanded // || (!('isNull' in row.original) && row.original.connection.selected)

      const isRowMovable =
        sortAndSortDir.sort === Sorts.POSITION && !expanded && !type && !user

      const sharedIntersectionObserverBoxProps = {
        id: row.index,
        callback: intersectionObserverCallback,
        options: intersectionObserverOptions,
      }

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
        tableItemContent = (
          <IntersectionObserverBox
            {...sharedIntersectionObserverBoxProps}
            Component={ExpandedBlockRow}
            componentProps={componentProps}
          />
        )
      } else if (
        expanded &&
        '__typename' in row.original &&
        row.original.__typename === 'Channel'
      ) {
        /**
         * If the row is an expanded channel
         */

        tableItemContent = (
          <IntersectionObserverBox
            {...sharedIntersectionObserverBoxProps}
            Component={ExpandedChannelRow}
            componentProps={{
              channel: row.original,
              columnLength: columns.length,
              ...rowProps,
              onMinimize,
            }}
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
          <IntersectionObserverBox
            {...sharedIntersectionObserverBoxProps}
            Component={ChannelRow}
            componentProps={{
              row,
              channel,
              connectableChannel: row.original,
              expanded,
              isRowMovable,
              moveBlock,
              removeBlock,
              ...rowProps,
              onClick: onExpand,
            }}
          />
        )
      } else {
        /**
         * If the row is a connectable or null
         */

        tableItemContent = (
          <IntersectionObserverBox
            {...sharedIntersectionObserverBoxProps}
            Component={StandardRow}
            componentProps={{
              ...rowProps,
              row,
              expanded,
              channel,
              moveBlock,
              removeBlock,
              isRowMovable,
            }}
          />
        )
      }

      return (
        <SortableTableItem
          /**
           * There's an issue between react-sortable-hoc
           * and react-table where clicking and dragging
           * after a row is expanded doesn't work. Changing
           * the key every time a row's expanded state changes
           * forces the row to re render and allows dragging to
           * work again
           */
          key={`${rowKey}.${expanded}`}
          index={row.index}
          disabled={!isRowMovable}
        >
          {tableItemContent}
        </SortableTableItem>
      )
    },
    [prepareRow]
  )

  return <>{rows.map(renderRow)}</>
}
