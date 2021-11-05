import React, { useEffect, useMemo, useState } from 'react'
import { useExpanded, useSortBy, useTable } from 'react-table'
import styled from 'styled-components'

import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
  ChannelTableContentsSet_channel_blokks,
} from '__generated__/ChannelTableContentsSet'

import Text from 'v2/components/UI/Text'
import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'
import { ChannelRow } from './components/ChannelRow'
import ExpandedBlockRow from './components/ExpandedBlockRow'
import ExpandedChannelRow from './components/ExpandedChannelRow'
import { PotentiallyEditableBlockCell } from './components/PotentiallyEditableBlockCell'
import { ContentCell } from './components/ContentCell'
import { StandardCell } from './components/StandardCell'
import constants from 'v2/styles/constants'
import SortArrows from '../UI/SortArrows'
import Box from '../UI/Box'
import { SortDirection, Sorts } from '__generated__/globalTypes'
import { useQuery } from '@apollo/client'

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 ${x => x.theme.space[4]};
  margin-bottom: ${x => x.theme.space[7]};
  table-layout: fixed;
`

export const TD = styled.td`
  color: ${x => x.theme.colors.gray.bold};
  border: 1px solid ${x => x.theme.colors.gray.light};
  border-right: none;
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  height: 30px;
  line-height: 0;
  padding: 0;
  width: ${x => x.width};
  max-width: ${x => x.maxWidth || 0};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:last-child {
    border-right: 1px solid ${x => x.theme.colors.gray.light};
  }
`

const THead = styled.thead``

const TH = styled(TD)`
  font-weight: bold;
  padding: ${x => x.theme.space[2]} ${x => x.theme.space[4]};
  vertical-align: middle;
  position: sticky;
  top: ${constants.headerHeight};
  background: ${x => x.theme.colors.background};
  z-index: 1;
`

const TR = styled.tr`
  cursor: zoom-in;

  &:hover ${TD} {
    border-top-color: ${x => x.theme.colors.gray.regular};
    border-bottom-color: ${x => x.theme.colors.gray.regular};
  }

  &:hover ${TD}:first-child {
    border-left-color: ${x => x.theme.colors.gray.regular};
  }

  &:hover ${TD}:last-child {
    border-right-color: ${x => x.theme.colors.gray.regular};
  }

  &:hover ${TH} {
    border-color: ${x => x.theme.colors.gray.light};
  }
`

const HeaderRow = styled(TR)`
  cursor: text;
`

function getInitialExpandedState(
  blocks: ChannelTableContentsSet_channel_blokks[]
) {
  const record = {}
  blocks?.forEach(block => {
    record[`${block.id.toString()}`] = block.connection.selected
  })

  return record
}

function mapSort(id: string) {
  const sort = {
    'connection.created_at': Sorts.CREATED_AT,
  }[id]

  return sort
}

export const FIRST_COLUMN_WIDTH = `35%`

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
      blocks={data?.channel.blokks}
      setSort={setSort}
      setDirection={setDirection}
    />
  )
}

interface ChannelTableContentsProps {
  blocks: ChannelTableContentsSet['channel']['blokks']
  setSort: React.Dispatch<React.SetStateAction<Sorts>>
  setDirection: React.Dispatch<React.SetStateAction<SortDirection>>
}

export const ChannelTableContents: React.FC<ChannelTableContentsProps> = ({
  blocks,
  setSort,
  setDirection,
}) => {
  const headers = useMemo(
    () => [
      {
        Header: 'Content',
        accessor: block => block,
        Cell: ContentCell,
        width: FIRST_COLUMN_WIDTH,
        disableSortBy: true,
      },
      {
        Header: 'Title',
        Cell: PotentiallyEditableBlockCell,
        accessor: block => ({ block, attr: 'title' }),
        width: '40%',
        disableSortBy: true,
      },
      {
        Header: 'Added at',
        accessor: 'connection.created_at',
        Cell: StandardCell,
        maxWidth: 200,
      },
      {
        Header: 'Author',
        accessor: 'user.name',
        Cell: StandardCell,
        maxWidth: 200,
        disableSortBy: true,
      },
      {
        Header: 'Connections',
        accessor: 'counts.public_channels',
        Cell: StandardCell,
        width: 200,
        disableSortBy: true,
      },
      {
        Header: '',
        Cell: StandardCell,
        id: 'id',
        width: 70,
      },
    ],
    []
  ) as any

  const tableInstance = useTable(
    {
      data: blocks || [],
      columns: headers,
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
        {headerGroups.map((headerGroup, i) => (
          <HeaderRow key={`header-${i}`} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, j) => {
              const sortState = column.isSorted
                ? column.isSortedDesc
                  ? 'down'
                  : 'up'
                : 'off'
              return (
                <TH
                  key={`key-${j}`}
                  width={column.width}
                  {...column.getHeaderProps()}
                >
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
        ))}
      </THead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
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

          return (
            <TR key={`tr-key-${i}`} {...row.getRowProps()} onClick={openRow}>
              {row.cells.map((cell, j) => {
                return (
                  <TD
                    width={cell.column.width}
                    maxWidth={cell.column.maxWidth}
                    key={`td-key-${j}`}
                    {...cell.getCellProps()}
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
