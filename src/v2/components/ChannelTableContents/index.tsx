import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Column, Row, useExpanded, useSortBy, useTable } from 'react-table'

import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
  ChannelTableContentsSet_channel_blokks,
} from '__generated__/ChannelTableContentsSet'
import { SortDirection, Sorts } from '__generated__/globalTypes'

import Box from 'v2/components/UI/Box'
import { IntersectionObserverBox } from 'v2/components/UI/IntersectionObserverBox'
import SortArrows from 'v2/components/UI/SortArrows'
import Text from 'v2/components/UI/Text'
import { usePaginatedBlocks } from 'v2/hooks/usePaginatedBlocks'

import { ChannelRow } from './components/ChannelRow'
import { ContentCell } from './components/ContentCell'
import ExpandedBlockRow, {
  ExpandedBlockRowProps,
} from './components/ExpandedBlockRow'
import ExpandedChannelRow from './components/ExpandedChannelRow'
import { PotentiallyEditableBlockCell } from './components/PotentiallyEditableBlockCell'
import { StandardCell } from './components/StandardCell'
import {
  Table,
  THead,
  HeaderRow,
  TH,
  TR,
  TD,
} from './components/TableComponents'

import { TableData } from './lib/types'
import { mapSort } from './lib/mapSort'
import { FIRST_COLUMN_WIDTH } from './lib/constants'

import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'

interface ChannelTableQueryProps {
  id: string
}

const devSetSort = () => {}
const devSetDirection = () => {}

export const ChannelTableQuery: React.FC<ChannelTableQueryProps> = ({ id }) => {
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
      setSort={devSetSort}
      setDirection={devSetDirection}
      onItemIntersected={onItemIntersected}
    />
  )
}

interface ChannelTableContentsProps {
  blocks: Array<ChannelTableContentsSet_channel_blokks | null>
  contentCount: number
  setSort: (value: Sorts | null) => void
  setDirection: (value: SortDirection | null) => void
  onItemIntersected: (index: number) => void
}

export const ChannelTableContents: React.FC<ChannelTableContentsProps> = ({
  blocks,
  contentCount,
  setSort,
  setDirection,
  onItemIntersected,
}) => {
  const tableData = useMemo<Array<TableData>>(() => {
    const data: Array<TableData> = []
    for (let i = 0; i < contentCount; i++) {
      const block = blocks[i]
      data.push(block ?? { isNull: true })
    }
    return data
  }, [blocks, contentCount])

  const tableColumns = useMemo<Array<Column<TableData>>>(() => {
    function guard<
      T extends Column<TableData> & {
        Cell: React.FC<{ value: any }>
        accessor?: (row: TableData) => React.ComponentProps<T['Cell']>['value']
      }
    >(columns: Array<T>) {
      return columns
    }

    return guard([
      {
        Header: 'Content',
        id: 'content',
        accessor: block => block,
        Cell: ContentCell,
        width: FIRST_COLUMN_WIDTH,
        disableSortBy: true,
      },
      {
        Header: 'Title',
        id: 'title',
        Cell: PotentiallyEditableBlockCell,
        accessor: block => ({ block, attr: 'title' } as const),
        width: '40%',
        disableSortBy: true,
      },
      {
        Header: 'Added at',
        id: 'added at',
        accessor: block =>
          '__typename' in block && block?.connection?.created_at,
        Cell: StandardCell,
        maxWidth: 200,
      },
      {
        Header: 'Author',
        id: 'author',
        accessor: block => '__typename' in block && block?.user?.name,
        Cell: StandardCell,
        maxWidth: 200,
        disableSortBy: true,
      },
      {
        Header: 'Connections',
        id: 'connections',
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
        disableSortBy: true,
      },
      {
        Header: '',
        id: 'id',
        Cell: StandardCell,
        width: 70,
      },
    ])
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
    state,
  } = useTable<TableData>(
    {
      data: tableData,
      columns: tableColumns,
      autoResetExpanded: false,
      autoResetSortBy: true,
      manualSortBy: true,
      getRowId: getRowId,
      initialState: {
        expanded: initialExpandedStateRef.current,
      },
    },
    useSortBy,
    useExpanded
  )

  useEffect(() => {
    if (state.sortBy.length > 0) {
      const [{ id, desc }] = state.sortBy
      setSort(mapSort(id))
      setDirection(desc ? SortDirection.DESC : SortDirection.ASC)
    } else {
      setDirection(null)
      setSort(null)
    }
  }, [state, setDirection, setSort])

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
    <Table {...getTableProps()}>
      <THead>
        {headerGroups.map(headerGroup => {
          const {
            key: headerGroupKey,
            ...headerGroupProps
          } = headerGroup.getHeaderGroupProps()
          return (
            <HeaderRow key={headerGroupKey} {...headerGroupProps}>
              {headerGroup.headers.map(column => {
                const sortState = column.isSorted
                  ? column.isSortedDesc
                    ? 'down'
                    : 'up'
                  : 'off'
                const {
                  key: headerKey,
                  ...headerProps
                } = column.getHeaderProps()
                return (
                  <TH key={headerKey} width={column.width} {...headerProps}>
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Text f={1} mr={5}>
                        {column.render('Header')}
                      </Text>
                      {column.canSort && (
                        <SortArrows
                          state={sortState}
                          onDown={() =>
                            column.isSortedDesc
                              ? column.clearSortBy()
                              : column.toggleSortBy(true)
                          }
                          onUp={() =>
                            column.isSorted
                              ? column.clearSortBy()
                              : column.toggleSortBy()
                          }
                        />
                      )}
                    </Box>
                  </TH>
                )
              })}
            </HeaderRow>
          )
        })}
      </THead>
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
  )
}
