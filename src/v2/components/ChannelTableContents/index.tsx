import React, { useEffect, useState } from 'react'
import { useExpanded, useSortBy, useTable } from 'react-table'
import { useQuery } from '@apollo/client'

import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
  ChannelTableContentsSet_channel_blokks,
} from '__generated__/ChannelTableContentsSet'
import { SortDirection, Sorts } from '__generated__/globalTypes'

import Text from 'v2/components/UI/Text'
import Box from 'v2/components/UI/Box'
import SortArrows from 'v2/components/UI/SortArrows'

import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'
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
import { mapSort } from './lib/mapSort'
import { tableColumns } from './lib/constants'

interface ChannelTableQueryProps {
  id: string
}

export const ChannelTableQuery: React.FC<ChannelTableQueryProps> = ({ id }) => {
  const [sort, setSort] = useState<Sorts | null>(null)
  const [direction, setDirection] = useState<SortDirection | null>(null)

  const { data } = useQuery<
    ChannelTableContentsSet,
    ChannelTableContentsSetVariables
  >(CHANNEL_TABLE_CONTENTS_QUERY, {
    variables: {
      id,
      per: 25,
      page: 1,
      sort,
      direction,
    },
  })

  return (
    <ChannelTableContents
      blocks={data?.channel?.blokks ?? []}
      setSort={setSort}
      setDirection={setDirection}
    />
  )
}

interface ChannelTableContentsProps {
  blocks: Array<ChannelTableContentsSet_channel_blokks>
  setSort: React.Dispatch<React.SetStateAction<Sorts | null>>
  setDirection: React.Dispatch<React.SetStateAction<SortDirection | null>>
}

export const ChannelTableContents: React.FC<ChannelTableContentsProps> = ({
  blocks,
  setSort,
  setDirection,
}) => {
  const tableInstance = useTable<TableData>(
    {
      data: blocks,
      columns: tableColumns,
      autoResetExpanded: false,
      autoResetSortBy: true,
      manualSortBy: true,
      getRowId: (row, _index) => {
        const typedRowOriginal = row as ChannelTableContentsSet_channel_blokks
        return `${typedRowOriginal.id}`
      },
      initialState: {
        expanded: getInitialExpandedState(blocks),
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

          const typedRowOriginal = row.original as ChannelTableContentsSet_channel_blokks
          const openRow = () => row.toggleRowExpanded(true)

          if (row.isExpanded && typedRowOriginal.__typename !== 'Channel') {
            return (
              <ExpandedBlockRow
                block={typedRowOriginal}
                columnLength={columns.length}
                {...row.getRowProps()}
                onMinimize={() => row.toggleRowExpanded(false)}
              />
            )
          }

          if (row.isExpanded && typedRowOriginal.__typename === 'Channel') {
            return (
              <ExpandedChannelRow
                channel={typedRowOriginal}
                columnLength={columns.length}
                {...row.getRowProps()}
                onMinimize={() => row.toggleRowExpanded(false)}
              />
            )
          }

          if (typedRowOriginal.__typename === 'Channel') {
            return (
              <ChannelRow
                channel={typedRowOriginal}
                {...row.getRowProps()}
                onClick={openRow}
              />
            )
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
