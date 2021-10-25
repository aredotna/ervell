import React, { useMemo } from 'react'
import { useExpanded, useTable } from 'react-table'
import styled from 'styled-components'

import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
  ChannelTableContentsSet_channel_blokks,
} from '__generated__/ChannelTableContentsSet'

import Text from 'v2/components/UI/Text'
import { usePaginatedBlocks } from 'v2/hooks/usePaginatedBlocks'

import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'
import { ChannelRow } from './components/ChannelRow'
import ExpandedBlockRow from './components/ExpandedBlockRow'
import ExpandedChannelRow from './components/ExpandedChannelRow'
import { PotentiallyEditableBlockCell } from './components/PotentiallyEditableBlockCell'
import { ContentCell } from './components/ContentCell'
import { StandardCell } from './components/StandardCell'
import constants from 'v2/styles/constants'

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
  blocks.forEach(block => {
    record[`${block.id.toString()}`] = block.connection.selected
  })

  return record
}

export const FIRST_COLUMN_WIDTH = `35%`

interface ChannelTableQueryProps {
  id: string
}

export const ChannelTableQuery: React.FC<ChannelTableQueryProps> = ({ id }) => {
  const { blocks } = usePaginatedBlocks<
    ChannelTableContentsSet,
    ChannelTableContentsSetVariables
  >({
    channelId: id,
    per: 25,
    channelQuery: CHANNEL_TABLE_CONTENTS_QUERY,
  })

  return <ChannelTableContents blocks={blocks} />
}

interface ChannelTableContentsProps {
  blocks: ChannelTableContentsSet['channel']['blokks']
}

export const ChannelTableContents: React.FC<ChannelTableContentsProps> = ({
  blocks,
}) => {
  const headers = useMemo(
    () => [
      {
        Header: 'Content',
        accessor: block => block,
        Cell: ContentCell,
        width: FIRST_COLUMN_WIDTH,
      },
      {
        Header: 'Title',
        Cell: PotentiallyEditableBlockCell,
        accessor: block => ({ block, attr: 'title' }),
        width: '40%',
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
      },
      {
        Header: 'Connections',
        accessor: 'counts.public_channels',
        Cell: StandardCell,
        width: 200,
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
      data: blocks,
      columns: headers,
      autoResetExpanded: false,
      getRowId: (row, _index) => {
        const typedRowOriginal = row as ChannelTableContentsSet_channel_blokks
        return `${typedRowOriginal.id}`
      },
      initialState: {
        expanded: getInitialExpandedState(blocks),
      },
    },
    useExpanded
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    columns,
  } = tableInstance

  return (
    <Table {...getTableProps()}>
      <THead>
        {headerGroups.map((headerGroup, i) => (
          <HeaderRow key={`header-${i}`} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, j) => {
              return (
                <TH
                  key={`key-${j}`}
                  width={column.width}
                  {...column.getHeaderProps()}
                >
                  <Text f={1}>{column.render('Header')}</Text>
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
