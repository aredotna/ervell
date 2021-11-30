import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Column, Row, useExpanded, useTable } from 'react-table'
import styled from 'styled-components'

import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
  ChannelTableContentsSet_channel_blokks,
} from '__generated__/ChannelTableContentsSet'
import { SortDirection, Sorts } from '__generated__/globalTypes'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

import { IntersectionObserverBox } from 'v2/components/UI/IntersectionObserverBox'
import { usePaginatedBlocks } from 'v2/hooks/usePaginatedBlocks'

import { ChannelRow } from './components/ChannelRow'
import { ContentCell } from './components/ContentCell'
import ExpandedBlockRow, {
  ExpandedBlockRowProps,
} from './components/ExpandedBlockRow'
import ExpandedChannelRow from './components/ExpandedChannelRow'
import { PotentiallyEditableBlockCell } from './components/PotentiallyEditableBlockCell'
import { StandardCell } from './components/StandardCell'
import { Table, TR, TD } from './components/TableComponents'

import { TableData } from './lib/types'
import { FIRST_COLUMN_WIDTH } from './lib/constants'

import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'
import ChannelTableHeader from './components/ChannelTableHeader'
import constants from 'v2/styles/constants'
import { Sticky } from '../UI/Sticky'

interface ChannelTableQueryProps {
  id: string
}

export enum ColumnIds {
  content = 'content',
  title = 'title',
  addedAt = 'addedAt',
  author = 'author',
  connections = 'connections',
  addSettings = 'addSettings',
}

export const STANDARD_HEADERS = [
  {
    Header: 'Content',
    id: ColumnIds.content,
    accessor: block => block,
    Cell: ContentCell,
    width: FIRST_COLUMN_WIDTH,
  },
  {
    Header: 'Title',
    id: ColumnIds.title,
    Cell: PotentiallyEditableBlockCell,
    accessor: block => ({ block, attr: 'title' } as const),
    width: '40%',
  },
  {
    Header: 'Added at',
    id: ColumnIds.addedAt,
    accessor: block => '__typename' in block && block?.connection?.created_at,
    Cell: StandardCell,
    maxWidth: 200,
  },
  {
    Header: 'Author',
    id: ColumnIds.author,
    accessor: block => '__typename' in block && block?.user?.name,
    Cell: StandardCell,
    maxWidth: 200,
  },
  {
    Header: 'Connections',
    id: ColumnIds.connections,
    accessor: block => {
      if ('isNull' in block) {
        return null
      }

      return block.counts?.__typename === 'BlockCounts'
        ? block.counts.public_channels
        : block.counts?.connected_to_channels
    },
    Cell: StandardCell,
    width: 200,
  },
  {
    Header: ColumnIds.addSettings,
    id: ColumnIds.addSettings,
    Cell: StandardCell,
    width: 70,
  },
]

/**
 * If we want to allow a column to be sortable,
 * add the column's ID to this object with the Sorts
 * value it should control
 */
export const columnIdsToSorts: { [key in ColumnIds]?: Sorts } = {
  [ColumnIds.addedAt]: Sorts.CREATED_AT,
}

export const ChannelTableQuery: React.FC<ChannelTableQueryProps> = ({ id }) => {
  const [sort, setSort] = useState<Sorts>(Sorts.CREATED_AT)
  const [direction, setDirection] = useState<SortDirection>(SortDirection.DESC)

  const {
    blocks,
    getPage,
    getPageFromIndex,
    hasQueriedPage,
    contentCount,
  } = usePaginatedBlocks<
    ChannelTableContentsSet,
    ChannelTableContentsSetVariables
  >({
    channelQuery: CHANNEL_TABLE_CONTENTS_QUERY,
    direction,
    sort,
    channelId: id,
    per: 25,
  })

  const onItemIntersected = useCallback(
    (index: number) => {
      const page = getPageFromIndex(index)
      if (!hasQueriedPage(page)) {
        getPage(page)
      }
    },
    [getPage, getPageFromIndex, hasQueriedPage]
  )

  return (
    <ChannelTableContents
      contentCount={contentCount}
      blocks={blocks}
      sort={sort}
      setSort={setSort}
      direction={direction}
      setDirection={setDirection}
      onItemIntersected={onItemIntersected}
    />
  )
}

interface ChannelTableContentsProps {
  blocks: Array<ChannelTableContentsSet_channel_blokks | null>
  contentCount: number
  sort: Sorts
  setSort: (value: Sorts) => void
  direction: SortDirection
  setDirection: (value: SortDirection) => void
  onItemIntersected: (index: number) => void
}

const AddRow = styled(Box)`
  width: 100%;
  height: 38px;
  background: green;
`

export const ChannelTableContents: React.FC<ChannelTableContentsProps> = ({
  blocks,
  contentCount,
  sort,
  setSort,
  direction,
  setDirection,
  onItemIntersected,
}) => {
  /**
   * Build the table rows
   */
  const tableData = useMemo<Array<TableData>>(() => {
    const data: Array<TableData> = []
    for (let i = 0; i < contentCount; i++) {
      const block = blocks[i]
      data.push(block ?? { isNull: true })
    }
    return data
  }, [blocks, contentCount])

  const tableColumns = useMemo<Array<Column<TableData>>>(() => {
    /**
     * This function doesn't have any runtime purpose,
     * but we're using the advanced control of
     * generic types available to us in functions
     * to assert that every Cell component is
     * correctly typed to match the return value
     * of its column's accessor function.
     *
     * This is only called once, so the overhead
     * is very low for the safety it provides.
     */
    function guard<
      T extends Column<TableData> & {
        Cell: React.FC<{ value: any }>
        accessor?: (row: TableData) => React.ComponentProps<T['Cell']>['value']
        id: ColumnIds
      }
    >(columns: Array<T>) {
      return columns
    }

    return guard(STANDARD_HEADERS)
  }, [])

  const getRowId = useCallback(
    (
      row: TableData,
      index: number,
      parent?: Row<TableData> | undefined
    ): string => {
      const parentId = parent?.id ?? 'noParent'
      const rowId = '__typename' in row ? row.id.toString() : `nullRow${index}`
      return `${parentId},${rowId}`
    },
    []
  )

  const initialExpandedStateRef = useRef<Record<string, boolean> | undefined>()
  if (!initialExpandedStateRef.current) {
    const initialState = {}
    tableData.forEach(row => {
      if ('__typename' in row && row.connection) {
        initialState[row.id.toString()] = row.connection.selected
      }
    })
    initialExpandedStateRef.current = initialState
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    columns,
  } = useTable<TableData>(
    {
      data: tableData,
      columns: tableColumns,
      autoResetExpanded: false,
      getRowId: getRowId,
      initialState: {
        expanded: initialExpandedStateRef.current,
      },
    },
    useExpanded
  )

  const intersectionObserverCallback = useCallback<
    (itemIndex: number) => (entries: IntersectionObserverEntry[]) => void
  >(
    itemIndex => entries => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        onItemIntersected(itemIndex)
      }
    },
    [onItemIntersected]
  )

  const intersectionObserverOptions = useMemo<IntersectionObserverInit>(
    () => ({ rootMargin: '200px' }),
    []
  )

  return (
    <Box>
      <Table {...getTableProps()}>
        <ChannelTableHeader
          headerGroups={headerGroups}
          sort={sort}
          direction={direction}
          setSort={setSort}
          setDirection={setDirection}
        />
        <tbody {...getTableBodyProps()}>
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
        </tbody>
      </Table>
    </Box>
  )
}
