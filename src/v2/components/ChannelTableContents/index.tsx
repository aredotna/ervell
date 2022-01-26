import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { Column, useExpanded, useTable } from 'react-table'
import { SortEndHandler, SortStartHandler } from 'react-sortable-hoc'

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
import { ChannelPage_channel } from '__generated__/ChannelPage'
import { ChannelTableConnectors_channel_connectors } from '__generated__/ChannelTableConnectors'

import Box from 'v2/components/UI/Box'
import { usePaginatedBlocks } from 'v2/hooks/usePaginatedBlocks'

import { ContentCell } from './components/ContentCell'
import { PotentiallyEditableBlockCell } from './components/PotentiallyEditableBlockCell'
import { StandardCell } from './components/StandardCell'
import { Table } from './components/TableComponents'
import ChannelTableHeader from './components/ChannelTableHeader'
import { SettingsCell } from './components/SettingsCell'
import { ChannelTableBody } from './components/ChannelTableBody'
import LoadingRow from './components/LoadingRow'
import { SortableTableContainer } from './components/SortableTableContainer'

import { ColumnIds, SortAndSortDir, TableData } from './lib/types'
import { FIRST_COLUMN_WIDTH } from './lib/constants'
import { parsePayload, PusherPayload, usePusher } from 'v2/hooks/usePusher'
import { getConnectableType } from 'v2/util/getConnectableType'

import {
  ConnectableTableBlokk,
  ConnectableTableBlokkVariables,
} from '__generated__/ConnectableTableBlokk'
import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'
import CONNECTABLE_TABLE_BLOKK_QUERY from './queries/TableConnectableBlokk'
import useWindowDimensions from 'v2/hooks/useWindowDimensions'

interface ChannelTableQueryProps {
  id: string
  channel: ChannelPage_channel
  type?: ConnectableTypeEnum
  user?: ChannelTableConnectors_channel_connectors
}

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
  ColumnIds.addedAt,
  ColumnIds.author,
  ColumnIds.addSettings,
]

const SMALL_BREAKPOINT_HEADERS = [
  ColumnIds.content,
  ColumnIds.title,
  ColumnIds.author,
  ColumnIds.addSettings,
]

const sortAndSortDirReducer: React.Reducer<SortAndSortDir, SortAndSortDir> = (
  prevState,
  action
) => {
  if (prevState.sort === action.sort && prevState.dir === action.dir) {
    return {
      sort: Sorts.POSITION,
      dir: SortDirection.DESC,
    }
  }

  return action
}

export const ChannelTableQuery: React.FC<ChannelTableQueryProps> = ({
  id,
  channel,
  type: typeParam,
  user: userParam,
}) => {
  const [sortAndSortDir, setSortAndSortDir] = useReducer(
    sortAndSortDirReducer,
    { sort: Sorts.POSITION, dir: SortDirection.DESC }
  )
  const [type, setType] = useState<ConnectableTypeEnum | null>(typeParam)
  useEffect(() => {
    setType(typeParam)
  }, [typeParam, setType])

  const [
    user,
    setUser,
  ] = useState<ChannelTableConnectors_channel_connectors | null>(userParam)
  useEffect(() => {
    setUser(userParam)
  }, [userParam])

  console.log({ type, user_id: user?.id.toString() })

  const {
    blocks,
    getPage,
    getPageFromIndex,
    hasQueriedPage,
    contentCount,
    addBlock,
    updateBlock,
    getBlocksFromCache,
    moveBlock,
    removeBlock,
    loading,
  } = usePaginatedBlocks<
    ChannelTableContentsSet,
    ChannelTableContentsSetVariables,
    ConnectableTableBlokk,
    ConnectableTableBlokkVariables
  >({
    channelQuery: CHANNEL_TABLE_CONTENTS_QUERY,
    direction: sortAndSortDir.dir,
    sort: sortAndSortDir.sort,
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
      sortAndSortDir={sortAndSortDir}
      setSortAndSortDir={setSortAndSortDir}
      loading={loading}
      type={type}
      user={user}
      onItemIntersected={onItemIntersected}
      addBlock={addBlock}
      updateBlock={updateBlock}
      getBlocksFromCache={getBlocksFromCache}
      moveBlock={moveBlock}
      removeBlock={removeBlock}
    />
  )
}

interface ChannelTableContentsProps {
  blocks: Array<ChannelTableContentsSet_channel_blokks | null>
  channel: ChannelPage_channel
  contentCount: number
  sortAndSortDir: SortAndSortDir
  setSortAndSortDir: React.Dispatch<SortAndSortDir>
  type?: ConnectableTypeEnum
  user?: ChannelTableConnectors_channel_connectors
  onItemIntersected: (index: number) => void
  addBlock: () => void
  loading: boolean
  updateBlock: (args: {
    id: string
    type: BaseConnectableTypeEnum | false
  }) => Promise<void>
  getBlocksFromCache: () => Array<ChannelTableContentsSet_channel_blokks | null> | null
  moveBlock: (args: { oldIndex: number; newIndex: number }) => void
  removeBlock: (args: { id: number; type: string }) => void
}

export const ChannelTableContents: React.FC<ChannelTableContentsProps> = ({
  blocks,
  channel,
  contentCount,
  sortAndSortDir,
  setSortAndSortDir,
  type,
  user,
  onItemIntersected,
  addBlock,
  updateBlock,
  getBlocksFromCache,
  moveBlock,
  removeBlock,
  loading,
}) => {
  /**
   * Build the table rows
   */
  const tableData = useMemo<Array<TableData>>(() => {
    const data: Array<TableData> = []
    for (let i = 0; i < contentCount; i++) {
      const block = blocks[i]
      data.push(
        { ...block, expanded: block?.connection?.selected } ?? { isNull: true }
      )
    }
    return data
  }, [blocks, contentCount])

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

  const initialExpandedState = useMemo(() => {
    if (!tableData.length) {
      return {}
    }

    const newState = {}
    tableData.forEach(row => {
      if ('__typename' in row && row.connection) {
        newState[row.id.toString()] = row.connection.selected
      }
    })

    return newState
  }, [tableData])

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
        expanded: initialExpandedState,
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

      if (!cacheBlocks) return

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

  const onSortEnd = useCallback<SortEndHandler>(
    ({ oldIndex, newIndex }) => {
      if (sortAndSortDir.sort === Sorts.POSITION) {
        moveBlock({ oldIndex, newIndex })
      }
    },
    [moveBlock, sortAndSortDir.sort]
  )

  const onSortStart = useCallback<SortStartHandler>((sort: any, event: any) => {
    event.preventDefault()

    const { node, helper } = sort

    node.childNodes.forEach((td: HTMLTableCellElement, index: number) => {
      const cs = getComputedStyle(td)
      const br = td.getBoundingClientRect()
      const width =
        br.width +
        parseFloat(cs.getPropertyValue('margin-left')) +
        parseFloat(cs.getPropertyValue('margin-right')) +
        parseFloat(cs.getPropertyValue('border-right-width')) +
        parseFloat(cs.getPropertyValue('border-left-width'))
      helper.childNodes[index].style.width = `${width}px`
    })
  }, [])

  const tableRef = useRef<HTMLTableSectionElement>()

  return (
    <Box>
      <Table {...getTableProps()}>
        <ChannelTableHeader
          headerGroups={headerGroups}
          channel={channel}
          setSortAndSortDir={setSortAndSortDir}
          sortAndSortDir={sortAndSortDir}
          type={type}
          user={user}
          addBlock={addBlock}
        />

        {loading && (
          <tbody {...getTableBodyProps()}>
            <LoadingRow columnLength={STANDARD_HEADERS.length} />
          </tbody>
        )}

        {!loading && (
          <SortableTableContainer
            transitionDuration={0}
            distance={1}
            useDragHandle
            helperClass="dragging"
            axis="y"
            lockAxis="y"
            useWindowAsScrollContainer
            helperContainer={tableRef.current}
            onSortEnd={onSortEnd}
            onSortStart={onSortStart}
          >
            <tbody {...getTableBodyProps()} ref={tableRef}>
              <ChannelTableBody
                key={`${sortAndSortDir.sort}.${sortAndSortDir.dir}`}
                rows={rows}
                prepareRow={prepareRow}
                channel={channel}
                intersectionObserverCallback={intersectionObserverCallback}
                columns={columns}
                intersectionObserverOptions={intersectionObserverOptions}
                sortAndSortDir={sortAndSortDir}
                moveBlock={moveBlock}
                removeBlock={removeBlock}
                type={type}
                user={user}
              />
            </tbody>
          </SortableTableContainer>
        )}
      </Table>
    </Box>
  )
}
