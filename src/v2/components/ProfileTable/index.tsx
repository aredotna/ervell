import React, { useCallback, useEffect, useMemo, useReducer } from 'react'
import { Column, useExpanded, useTable } from 'react-table'
import { useQuery } from '@apollo/client'
import InfiniteScroll from 'react-infinite-scroller'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import { ColumnIds, SortAndSortDir } from './lib/types'
import { FIRST_COLUMN_WIDTH } from './lib/constants'

import { ContentCell } from 'v2/components/Table/components/ContentCell'
import { StandardCell } from 'v2/components/Table/components/StandardCell'
import { Table } from 'v2/components/Table/components/TableComponents'
import { PotentiallyEditableBlockCell } from 'v2/components/ChannelTableContents/components/PotentiallyEditableBlockCell'

import profileTableContentsQuery from './queries/profileTableContents'
import {
  ConnectableTypeEnum,
  SearchSorts,
  SortDirection,
} from '__generated__/globalTypes'
import {
  ProfileTableContents,
  ProfileTableContentsVariables,
  ProfileTableContents_user,
  ProfileTableContents_user_contents,
} from '__generated__/ProfileTableContents'
import useWindowDimensions from 'v2/hooks/useWindowDimensions'
import { ProfileTableHeader } from './components/ProfileTableHeader'
import LoadingRow from 'v2/components/Table/components/LoadingRow'
import { ProfileTableBody } from './components/ProfileTableBody'
import { TableData } from 'v2/components/Table/lib/constants'
import { SettingsCell } from '../ChannelTableContents/components/SettingsCell'
import useMergeState from 'v2/hooks/useMergeState'
import usePrevious from 'v2/hooks/usePrevious'

export const STANDARD_HEADERS: Array<Column<TableData>> = [
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
    accessor: block => ({ block, attr: 'title' }),
    width: '25%',
  },
  {
    Header: 'Updated at',
    id: ColumnIds.updatedAt,
    accessor: block => '__typename' in block && block?.updated_at,
    Cell: StandardCell,
    width: '125px',
  },
  {
    Header: 'Created at',
    id: ColumnIds.createdAt,
    accessor: block => '__typename' in block && block?.created_at,
    Cell: StandardCell,
    width: '125px',
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
    width: '125px',
  },
  {
    Header: ColumnIds.addSettings,
    id: ColumnIds.addSettings,
    accessor: block => ('__typename' in block ? block : null),
    Cell: SettingsCell,
    width: '100px',
  },
]

const MEDIUM_BREAKPOINT_HEADERS = [
  ColumnIds.content,
  ColumnIds.title,
  ColumnIds.createdAt,
  ColumnIds.updatedAt,
]

const SMALL_BREAKPOINT_HEADERS = [
  ColumnIds.content,
  ColumnIds.title,
  ColumnIds.createdAt,
]

const InfiniteContainer = styled(InfiniteScroll)``

const sortAndSortDirReducer: React.Reducer<SortAndSortDir, SortAndSortDir> = (
  prevState,
  action
) => {
  if (prevState.sort === action.sort && prevState.dir === action.dir) {
    return {
      sort: SearchSorts.UPDATED_AT,
      dir: SortDirection.DESC,
    }
  }

  return action
}

interface ProfileTableProps {
  loading: boolean
  blocks: ProfileTableContents_user_contents[]
  profile: ProfileTableContents_user
  loadMore: () => void
  hasMore: boolean
  sortAndSortDir: SortAndSortDir
  setSortAndSortDir: React.Dispatch<SortAndSortDir>
}

interface ProfileState {
  page: number
  per: number
  hasMore: boolean
}

export const ProfileTable: React.FC<ProfileTableProps> = ({
  loading,
  blocks,
  profile,
  loadMore,
  hasMore,
  setSortAndSortDir,
  sortAndSortDir,
}) => {
  const tableData = useMemo<Array<TableData>>(() => {
    const data: Array<TableData> = []
    for (let i = 0; i < blocks?.length; i++) {
      const block = blocks[i]
      data.push({ ...block } ?? { isNull: true })
    }
    return data
  }, [blocks, blocks?.length])

  const { width } = useWindowDimensions()

  const tableColumns = useMemo<Array<Column<TableData>>>(() => {
    if (!width) {
      return STANDARD_HEADERS
    }

    if (width > 1024) {
      return STANDARD_HEADERS
    }

    if (width <= 1024 && width >= 690) {
      const headers = STANDARD_HEADERS.filter(header => {
        return MEDIUM_BREAKPOINT_HEADERS.map(h => h.toString()).includes(
          header.id
        )
      })
      return headers
    }

    if (width < 690) {
      const headers = STANDARD_HEADERS.filter(header => {
        return SMALL_BREAKPOINT_HEADERS.map(h => h.toString()).includes(
          header.id
        )
      })
      return headers
    }

    return STANDARD_HEADERS
  }, [width])

  const getRowId = useCallback((row: TableData, index: number): string => {
    const rowId = '__typename' in row ? row.id.toString() : `nullRow${index}`
    return `${rowId}`
  }, [])

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
    },
    useExpanded
  )

  return (
    <Box>
      <Table {...getTableProps()}>
        <ProfileTableHeader
          headerGroups={headerGroups}
          profile={profile}
          sortAndSortDir={sortAndSortDir}
          setSortAndSortDir={setSortAndSortDir}
        />

        {loading && (
          <tbody {...getTableBodyProps()}>
            <LoadingRow columnLength={STANDARD_HEADERS.length} />
          </tbody>
        )}

        {!loading && (
          <InfiniteContainer
            initialLoad={false}
            loadMore={loadMore}
            element={'tbody'}
            hasMore={hasMore}
            loader={<LoadingRow columnLength={STANDARD_HEADERS.length} />}
          >
            <ProfileTableBody
              rows={rows}
              columns={columns}
              prepareRow={prepareRow}
            />
          </InfiniteContainer>
        )}
      </Table>
    </Box>
  )
}

interface ProfileTableQueryProps {
  id: string
  sort?: SearchSorts
  type?: ConnectableTypeEnum
}

const ProfileTableQuery: React.FC<ProfileTableQueryProps> = ({ id, type }) => {
  const prevType = usePrevious(type)

  const [sortAndSortDir, setSortAndSortDir] = useReducer(
    sortAndSortDirReducer,
    { sort: SearchSorts.UPDATED_AT, dir: SortDirection.DESC }
  )

  const prevSort = usePrevious(sortAndSortDir)

  const [state, setState] = useMergeState<ProfileState>({
    page: 1,
    per: 12,
    hasMore: true,
  })

  const { per, page, hasMore } = state

  const { data, loading, fetchMore } = useQuery<
    ProfileTableContents,
    ProfileTableContentsVariables
  >(profileTableContentsQuery, {
    variables: {
      id,
      sort: sortAndSortDir.sort,
      direction: sortAndSortDir.dir,
      type,
      page,
      per,
      includeConnection: false,
    },
  })

  const loadMore = useCallback(() => {
    fetchMore({
      variables: { page: page + 1 },
    }).then(({ errors, data }) => {
      const {
        user: {
          contents: { length },
        },
      } = data

      const hasMore = !errors && length > 0 && length >= per

      setState({
        page: page + 1,
        hasMore,
      })
    })
  }, [fetchMore, state, setState])

  useEffect(() => {
    if (type != prevType || prevSort != sortAndSortDir) {
      setState({
        page: 1,
        hasMore: true,
      })
    }
  }, [type, prevType, sortAndSortDir, prevSort])

  return (
    <ProfileTable
      loading={loading}
      blocks={data?.user?.contents}
      profile={data?.user}
      loadMore={loadMore}
      hasMore={hasMore}
      sortAndSortDir={sortAndSortDir}
      setSortAndSortDir={setSortAndSortDir}
    />
  )
}

export default ProfileTableQuery
