import React, { useEffect, useMemo, useCallback, useRef } from 'react'
import { Column, Row, useExpanded, useSortBy, useTable } from 'react-table'

import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'
import { SortDirection, Sorts } from '__generated__/globalTypes'

import Box from 'v2/components/UI/Box'
import SortArrows from 'v2/components/UI/SortArrows'
import Text from 'v2/components/UI/Text'

import { mapSort } from '../../lib/mapSort'
import { TableData } from '../../lib/types'
import { FIRST_COLUMN_WIDTH } from '../../lib/constants'

import { ChannelRow } from '../ChannelRow'
import ExpandedBlockRow from '../ExpandedBlockRow'
import ExpandedChannelRow from '../ExpandedChannelRow'
import { HeaderRow, Table, TD, TH, THead, TR } from '../TableComponents'
import { ContentCell } from '../ContentCell'
import { PotentiallyEditableBlockCell } from '../PotentiallyEditableBlockCell'
import { StandardCell } from '../StandardCell'

interface ChannelTableContentsProps {
  blocks: Array<ChannelTableContentsSet_channel_blokks | null>
  setSort: (value: Sorts | null) => void
  setDirection: (value: SortDirection | null) => void
}

export const ChannelTableContents: React.FC<ChannelTableContentsProps> = ({
  blocks,
  setSort,
  setDirection,
}) => {
  const tableData = useMemo<Array<TableData>>(() => {
    return blocks.map(block => {
      return block ?? { isNull: true }
    })
  }, [blocks])

  const tableColumns = useMemo<Array<Column<TableData>>>(() => {
    function guard<
      T extends Column<TableData> & {
        Cell: React.FC<{ value: any }>
        accessor?: (row: TableData) => React.ComponentProps<T['Cell']>['value']
      }
    >(valueToCheck: Array<T>) {
      return valueToCheck
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

  const tableInstance = useTable<TableData>(
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    columns,
    state,
  } = tableInstance

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

          const openRow = () => row.toggleRowExpanded(true)

          if ('__typename' in row.original) {
            if (row.isExpanded && row.original.__typename !== 'Channel') {
              return (
                <ExpandedBlockRow
                  block={row.original}
                  columnLength={columns.length}
                  {...row.getRowProps()}
                  onMinimize={() => row.toggleRowExpanded(false)}
                />
              )
            }

            if (row.isExpanded && row.original.__typename === 'Channel') {
              return (
                <ExpandedChannelRow
                  channel={row.original}
                  columnLength={columns.length}
                  {...row.getRowProps()}
                  onMinimize={() => row.toggleRowExpanded(false)}
                />
              )
            }

            if (row.original.__typename === 'Channel') {
              return (
                <ChannelRow
                  channel={row.original}
                  {...row.getRowProps()}
                  onClick={openRow}
                />
              )
            }
          }

          const { key: rowKey, ...rowProps } = row.getRowProps()
          return (
            <TR key={rowKey} {...rowProps} onClick={openRow}>
              {row.cells.map(cell => {
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
              })}
            </TR>
          )
        })}
      </tbody>
    </Table>
  )
}
