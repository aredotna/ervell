import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Column, Row, useExpanded, useTable } from 'react-table'

import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
  ChannelTableContentsSet_channel_blokks,
} from '__generated__/ChannelTableContentsSet'
import {
  BaseConnectableTypeEnum,
  ConnectableTypeEnum,
  SortDirection,
  Sorts,
} from '__generated__/globalTypes'

import Box from 'v2/components/UI/Box'

import { usePaginatedBlocks } from 'v2/hooks/usePaginatedBlocks'

import { ContentCell } from './components/ContentCell'
import { PotentiallyEditableBlockCell } from './components/PotentiallyEditableBlockCell'
import { StandardCell } from './components/StandardCell'
import { Table } from './components/TableComponents'
import ChannelTableHeader from './components/ChannelTableHeader'

import { TableData } from './lib/types'
import { FIRST_COLUMN_WIDTH } from './lib/constants'
import { parsePayload, PusherPayload, usePusher } from 'v2/hooks/usePusher'
import { getConnectableType } from 'v2/util/getConnectableType'

import { ChannelPage_channel } from '__generated__/ChannelPage'
import {
  ConnectableTableBlokk,
  ConnectableTableBlokkVariables,
} from '__generated__/ConnectableTableBlokk'
import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'
import CONNECTABLE_TABLE_BLOKK_QUERY from './queries/TableConnectableBlokk'
import { ChannelTableBody } from './components/ChannelTableBody'
import LoadingRow from './components/LoadingRow'
import { ChannelTableConnectors_channel_connectors } from '__generated__/ChannelTableConnectors'

interface ChannelTableQueryProps {
  id: string
  channel: ChannelPage_channel
}

export enum ColumnIds {
  content = 'content',
  title = 'title',
  addedAt = 'addedAt',
  author = 'author',
  connections = 'connections',
  addSettings = 'addSettings',
}

export const STANDARD_HEADERS = [
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
    accessor: block => ({ block, attr: 'title' } as const),
    width: '30%',
  },
  {
    Header: 'Added at',
    id: ColumnIds.addedAt,
    accessor: block => '__typename' in block && block?.connection?.created_at,
    Cell: StandardCell,
    width: '200px',
  },
  {
    Header: 'Author',
    id: ColumnIds.author,
    accessor: block => '__typename' in block && block?.user?.name,
    Cell: StandardCell,
    width: '200px',
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
    width: '200px',
  },
  {
    Header: ColumnIds.addSettings,
    id: ColumnIds.addSettings,
    Cell: StandardCell,
    width: '100px',
  },
]

/**
 * If we want to allow a column to be sortable,
 * add the column's ID to this object with the Sorts
 * value it should control
 */
export const columnIdsToSorts: { [key in ColumnIds]?: Sorts } = {
  [ColumnIds.addedAt]: Sorts.CREATED_AT,
}

export const ChannelTableQuery: React.FC<ChannelTableQueryProps> = ({
  id,
  channel,
}) => {
  const [sort, setSort] = useState<Sorts>(Sorts.CREATED_AT)
  const [direction, setDirection] = useState<SortDirection>(SortDirection.DESC)
  const [type, setType] = useState<ConnectableTypeEnum | null>(null)
  const [
    user,
    setUser,
  ] = useState<ChannelTableConnectors_channel_connectors | null>(null)

  console.log({
    channelQuery: CHANNEL_TABLE_CONTENTS_QUERY,
    direction,
    sort,
    channelId: id,
    type,
    user_id: user?.id.toString(),
    per: 25,
    blockquery: CONNECTABLE_TABLE_BLOKK_QUERY,
  })

  const {
    blocks,
    getPage,
    getPageFromIndex,
    hasQueriedPage,
    contentCount,
    addBlock,
    updateBlock,
    getBlocksFromCache,
    loading,
  } = usePaginatedBlocks<
    ChannelTableContentsSet,
    ChannelTableContentsSetVariables,
    ConnectableTableBlokk,
    ConnectableTableBlokkVariables
  >({
    channelQuery: CHANNEL_TABLE_CONTENTS_QUERY,
    direction,
    sort,
    channelId: id,
    type,
    user_id: user?.id.toString(),
    per: 25,
    blockquery: CONNECTABLE_TABLE_BLOKK_QUERY,
  })

  const onItemIntersected = useCallback(
    (index: number) => {
      const page = getPageFromIndex(index)
      if (!hasQueriedPage(page)) {
        getPage(page)
      }
    },
    [getPage, getPageFromIndex, hasQueriedPage]
  )

  return (
    <ChannelTableContents
      contentCount={contentCount}
      blocks={blocks}
      channel={channel}
      sort={sort}
      setSort={setSort}
      loading={loading}
      direction={direction}
      setDirection={setDirection}
      setType={setType}
      setUser={setUser}
      onItemIntersected={onItemIntersected}
      addBlock={addBlock}
      updateBlock={updateBlock}
      getBlocksFromCache={getBlocksFromCache}
    />
  )
}

interface ChannelTableContentsProps {
  blocks: Array<ChannelTableContentsSet_channel_blokks | null>
  channel: ChannelPage_channel
  contentCount: number
  sort: Sorts
  setSort: (value: Sorts) => void
  direction: SortDirection
  setDirection: (value: SortDirection) => void
  setType: (value: ConnectableTypeEnum) => void
  setUser: (value: ChannelTableConnectors_channel_connectors) => void
  onItemIntersected: (index: number) => void
  addBlock: () => void
  loading: boolean
  updateBlock: (args: {
    id: string
    type: BaseConnectableTypeEnum | false
  }) => Promise<void>
  getBlocksFromCache: () => ChannelTableContentsSet_channel_blokks[]
}

export const ChannelTableContents: React.FC<ChannelTableContentsProps> = ({
  blocks,
  channel,
  contentCount,
  sort,
  setSort,
  direction,
  setDirection,
  setType,
  setUser,
  onItemIntersected,
  addBlock,
  updateBlock,
  getBlocksFromCache,
  loading,
}) => {
  /**
   * Build the table rows
   */
  const tableData = useMemo<Array<TableData>>(() => {
    const data: Array<TableData> = []
    for (let i = 0; i < contentCount; i++) {
      const block = blocks[i]
      data.push(block ?? { isNull: true })
    }
    return data
  }, [blocks, contentCount])

  const tableColumns = useMemo<Array<Column<TableData>>>(() => {
    /**
     * This function doesn't have any runtime purpose,
     * but we're using the advanced control of
     * generic types available to us in functions
     * to assert that every Cell component is
     * correctly typed to match the return value
     * of its column's accessor function.
     *
     * This is only called once, so the overhead
     * is very low for the safety it provides.
     */
    function guard<
      T extends Column<TableData> & {
        Cell: React.FC<{ value: any }>
        accessor?: (row: TableData) => React.ComponentProps<T['Cell']>['value']
        id: ColumnIds
      }
    >(columns: Array<T>) {
      return columns
    }

    return guard(STANDARD_HEADERS)
  }, [])

  const getRowId = useCallback((row: TableData, index: number): string => {
    const rowId = '__typename' in row ? row.id.toString() : `nullRow${index}`
    return `${rowId}`
  }, [])

  const initialExpandedStateRef = useRef<Record<string, boolean> | undefined>()
  if (!initialExpandedStateRef.current) {
    const initialState = {}
    tableData.forEach(row => {
      if ('__typename' in row && row.connection) {
        initialState[row.id.toString()] = row.connection.selected
      }
    })
    initialExpandedStateRef.current = initialState
  }

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
      initialState: {
        expanded: initialExpandedStateRef.current,
      },
    },
    useExpanded
  )

  const intersectionObserverCallback = useCallback<
    (itemIndex: number) => (entries: IntersectionObserverEntry[]) => void
  >(
    itemIndex => entries => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        onItemIntersected(itemIndex)
      }
    },
    [onItemIntersected]
  )

  const updateConnectable = useCallback(
    ({ id, type }: PusherPayload) => {
      updateBlock({ id, type })
    },
    [updateBlock]
  )

  const createdConnectable = useCallback(
    ({ id, type }: PusherPayload) => {
      //
      // This method can be called in a few different cases:
      // - When a block is added via add block either by you or from another person (via pusher)
      // - When a block is connected into the channel from another person
      // - AND when a block in the current channel is connected into another channel
      // We need to first check if the block already exists in this channel,
      // if it does, do nothing. Otherwise, proceed.
      //
      const cacheBlocks = getBlocksFromCache()

      const blockIndex = cacheBlocks.findIndex(
        block =>
          block &&
          block.id === parseInt(id) &&
          getConnectableType(block.__typename) === type
      )

      // If the block already exists, early return
      if (blockIndex > 0) return

      // Otherwise proceed.
      addBlock()
    },
    [getBlocksFromCache, addBlock]
  )

  usePusher({
    channelId: channel.id,
    shouldSubscribe: !!channel?.can?.add_to,
    onCreated: createdConnectable,
    onUpdated: updateConnectable,
    parsePayload: parsePayload,
  })

  const intersectionObserverOptions = useMemo<IntersectionObserverInit>(
    () => ({ rootMargin: '200px' }),
    []
  )

  return (
    <Box>
      <Table {...getTableProps()}>
        <ChannelTableHeader
          headerGroups={headerGroups}
          sort={sort}
          channel={channel}
          direction={direction}
          setSort={setSort}
          setDirection={setDirection}
          setType={setType}
          setUser={setUser}
          addBlock={addBlock}
        />
        <tbody {...getTableBodyProps()}>
          {loading && <LoadingRow columnLength={STANDARD_HEADERS.length} />}

          {!loading && (
            <ChannelTableBody
              rows={rows}
              prepareRow={prepareRow}
              intersectionObserverCallback={intersectionObserverCallback}
              columns={columns}
              intersectionObserverOptions={intersectionObserverOptions}
            />
          )}
        </tbody>
      </Table>
    </Box>
  )
}
