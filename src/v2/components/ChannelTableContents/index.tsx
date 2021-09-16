import React, { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { useExpanded, useTable } from 'react-table'
import styled from 'styled-components'

import { ContentCell } from './components/ContentCell'
import { StandardCell } from './components/StandardCell'
import Text from 'v2/components/UI/Text'
import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
  ChannelTableContentsSet_channel_blokks,
} from '__generated__/ChannelTableContentsSet'

import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'
import { ChannelRow } from './components/ChannelRow'
import ExpandedBlockRow from './components/ExpandedBlockRow'

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

const TH = styled(TD)`
  font-weight: bold;
  padding: ${x => x.theme.space[2]} ${x => x.theme.space[4]};
  vertical-align: middle;
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

export const FIRST_COLUMN_WIDTH = `35%`

interface ChannelTableQueryProps {
  id: string
}

export const ChannelTableQuery: React.FC<ChannelTableQueryProps> = ({ id }) => {
  const { data } = useQuery<
    ChannelTableContentsSet,
    ChannelTableContentsSetVariables
  >(CHANNEL_TABLE_CONTENTS_QUERY, { variables: { id } })

  if (data?.channel) {
    return <ChannelTableContents data={data} />
  }

  return <div />
}

interface ChannelTableContentsProps {
  data: ChannelTableContentsSet
}

export const ChannelTableContents: React.FC<ChannelTableContentsProps> = ({
  data,
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
        accessor: 'title',
        Cell: StandardCell,
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
      data: data?.channel.blokks,
      columns: headers,
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
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <TR key={`header-${i}`} {...headerGroup.getHeaderGroupProps()}>
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
          </TR>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)

          const typedRowOriginal = row.original as ChannelTableContentsSet_channel_blokks

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

          if (typedRowOriginal.__typename === 'Channel') {
            return <ChannelRow channel={typedRowOriginal} />
          }

          const openRow = () => row.toggleRowExpanded(true)

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
