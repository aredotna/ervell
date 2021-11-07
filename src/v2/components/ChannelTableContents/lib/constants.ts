import { Column } from 'react-table'
import { ContentCell } from '../components/ContentCell'
import { PotentiallyEditableBlockCell } from '../components/PotentiallyEditableBlockCell'
import { StandardCell } from '../components/StandardCell'
import { TableData } from './types'

export const FIRST_COLUMN_WIDTH = `35%`

export const tableColumns: ReadonlyArray<Column<TableData>> = [
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
    accessor: block => ({ block, attr: 'title' }),
    width: '40%',
    disableSortBy: true,
  },
  {
    Header: 'Added at',
    id: 'added at',
    accessor: block => '__typename' in block && block?.connection?.created_at,
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
]
