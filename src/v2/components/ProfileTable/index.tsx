import React from 'react'
import { Column } from 'react-table'
import { useQuery } from '@apollo/client'

import Box from '../UI/Box'
import { ColumnIds } from './lib/types'
import { FIRST_COLUMN_WIDTH } from './lib/constants'
import { TableData } from '../ChannelTableContents/lib/types'

import { ContentCell } from '../Table/components/ContentCell'
import { StandardCell } from '../Table/components/StandardCell'
import { Table } from '../Table/components/TableComponents'
import { PotentiallyEditableBlockCell } from '../ChannelTableContents/components/PotentiallyEditableBlockCell'

import profileTableContentsQuery from './queries/profileTableContents'
import { ConnectableTypeEnum, SearchSorts } from '__generated__/globalTypes'
import {
  ProfileTableContents,
  ProfileTableContentsVariables,
} from '__generated__/ProfileTableContents'

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
    Header: 'Added at',
    id: ColumnIds.addedAt,
    accessor: block => '__typename' in block && block?.connection?.created_at,
    Cell: StandardCell,
    width: '125px',
  },
  {
    Header: 'Author',
    id: ColumnIds.author,
    accessor: block => '__typename' in block && block?.user?.name,
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
]

interface ProfileTableContentsProps {
  id: string
  sort?: SearchSorts
  type?: ConnectableTypeEnum
}

export const ProfileTable: React.FC<ProfileTableContentsProps> = ({
  id,
  sort,
  type,
}) => {
  const { data, loading, error } = useQuery<
    ProfileTableContents,
    ProfileTableContentsVariables
  >(profileTableContentsQuery, { variables: { id, sort, type } })

  return <Box>ProfileTable</Box>
}

export default ProfileTable
