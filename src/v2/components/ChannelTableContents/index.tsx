import React, { useMemo } from 'react'
import { useQuery } from 'react-apollo'
import { useTable } from 'react-table'
import styled from 'styled-components'

import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
} from '__generated__/ChannelTableContentsSet'
import { ContentCell } from './components/ContentCell'

import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 ${x => x.theme.space[4]};
  margin-bottom: ${x => x.theme.space[7]};
`

const TR = styled.tr``

const TD = styled.td`
  color: ${x => x.theme.colors.gray.bold};
  border: 1px solid ${x => x.theme.colors.gray.light};
  border-right: none;
  font-size: ${x => x.theme.fontSizesIndexed.sx};
  height: 30px;

  &:last-child {
    border-right: 1px solid ${x => x.theme.colors.gray.light};
  }
`

const TDInner = styled.div`
  padding: ${x => x.theme.space[2]};
`

const TH = styled(TD)`
  font-weight: bold;
  height: 30px;
  padding: ${x => x.theme.space[2]};
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
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Added at',
        accessor: 'connection.created_at',
      },
      {
        Header: 'Author',
        accessor: 'user.name',
      },
      // {
      //   Header: 'Connector',
      //   accessor: 'connection.user.name',
      // },
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
                  {column.render('Header')}
                </TH>
              )
            })}
          </TR>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <TR key={`tr-key-${i}`} {...row.getRowProps()}>
              {row.cells.map((cell, j) => {
                return (
                  <TD key={`td-key-${j}`} {...cell.getCellProps()}>
                    <TDInner>{cell.render('Cell')}</TDInner>
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
