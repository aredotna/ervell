import React, { useEffect, useMemo } from 'react'
import { useExpanded, useSortBy, useTable } from 'react-table'
import { usePaginatedBlocks } from 'v2/hooks/usePaginatedBlocks'

import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
  ChannelTableContentsSet_channel_blokks,
} from '__generated__/ChannelTableContentsSet'
import { SortDirection, Sorts } from '__generated__/globalTypes'

import Text from 'v2/components/UI/Text'
import Box from 'v2/components/UI/Box'
import SortArrows from 'v2/components/UI/SortArrows'

import { ChannelRow } from './components/ChannelRow'
import ExpandedBlockRow from './components/ExpandedBlockRow'
import ExpandedChannelRow from './components/ExpandedChannelRow'
import {
  HeaderRow,
  Table,
  TD,
  TH,
  THead,
  TR,
} from './components/TableComponents'
import { TableData } from './lib/types'
import { getInitialExpandedState } from './lib/getInitialExpandedState'
import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'
import { mapSort } from './lib/mapSort'
import { tableColumns } from './lib/constants'

interface ChannelTableQueryProps {
  id: string
}

export const ChannelTableQuery: React.FC<ChannelTableQueryProps> = ({ id }) => {
  const { blocks } = usePaginatedBlocks<
    ChannelTableContentsSet,
    ChannelTableContentsSetVariables
  >({
    channelQuery: CHANNEL_TABLE_CONTENTS_QUERY,
    channelId: id,
    per: 25,
  })

  return (
    <ChannelTableContents
      blocks={blocks}
      setSort={() => {}}
      setDirection={() => {}}
    />
  )
}

interface ChannelTableContentsProps {
  blocks: Array<ChannelTableContentsSet_channel_blokks | null>
  setSort: React.Dispatch<React.SetStateAction<Sorts | null>>
  setDirection: React.Dispatch<React.SetStateAction<SortDirection | null>>
}

const ChannelTableContents: React.FC<ChannelTableContentsProps> = ({
  blocks,
  setSort,
  setDirection,
}) => {
  const tableData = useMemo<Array<TableData>>(() => {
    return blocks.map(block => {
      return block ?? { isNull: true }
    })
  }, [blocks])

  const tableInstance = useTable<TableData>(
    {
      data: tableData,
      columns: tableColumns,
      autoResetExpanded: false,
      autoResetSortBy: true,
      manualSortBy: true,
      getRowId: (row, index) => {
        return '__typename' in row ? row.id.toString() : `nullRow${index}`
      },
      initialState: {
        expanded: getInitialExpandedState(tableData),
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
                const { key: colKey, ...colProps } = cell.getCellProps()
                return (
                  <TD
                    key={colKey}
                    width={cell.column.width}
                    maxWidth={cell.column.maxWidth}
                    {...colProps}
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
