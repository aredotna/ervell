import React, { useMemo } from 'react'
import { useQuery } from 'react-apollo'
import { useTable } from 'react-table'
import styled from 'styled-components'

import { ContentCell } from './components/ContentCell'
import { StandardCell } from './components/StandardCell'
import Text from 'v2/components/UI/Text'
import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
} from '__generated__/ChannelTableContentsSet'

import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'
import { ChannelRow } from './components/ChannelRow'

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 ${x => x.theme.space[4]};
  margin-bottom: ${x => x.theme.space[7]};
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
        width: 420,
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: StandardCell,
        maxWidth: 200,
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
        maxWidth: 200,
      },
    ],
    []
  ) as any

  const tableInstance = useTable({
    data: data?.channel.blokks,
    columns: headers,
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <TR key={`header-${i}`} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, j) => {
              return (
                <TH key={`key-${j}`} {...column.getHeaderProps()}>
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

          if (row.original.__typename === 'Channel') {
            return <ChannelRow channel={row.original} />
          }

          return (
            <TR key={`tr-key-${i}`} {...row.getRowProps()}>
              {row.cells.map((cell, j) => {
                return (
                  <TD
                    width={cell.column.maxWidth}
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
