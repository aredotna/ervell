import React, { useCallback, useMemo, useReducer, useRef } from 'react'
import { Column, Row, useExpanded, useTable } from 'react-table'

import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
  ChannelTableContentsSet_channel_blokks,
} from '__generated__/ChannelTableContentsSet'
import {
  BaseConnectableTypeEnum,
  SortDirection,
  Sorts,
} from '__generated__/globalTypes'
import { ChannelPage_channel } from '__generated__/ChannelPage'

import Box from 'v2/components/UI/Box'
import { IntersectionObserverBox } from 'v2/components/UI/IntersectionObserverBox'
import { usePaginatedBlocks } from 'v2/hooks/usePaginatedBlocks'

import { ChannelRow } from './components/ChannelRow'
import { ContentCell } from './components/ContentCell'
import ExpandedBlockRow, {
  ExpandedBlockRowProps,
} from './components/ExpandedBlockRow'
import ExpandedChannelRow from './components/ExpandedChannelRow'
import { PotentiallyEditableBlockCell } from './components/PotentiallyEditableBlockCell'
import { StandardCell } from './components/StandardCell'
import { Table, TR, TD } from './components/TableComponents'
import ChannelTableHeader from './components/ChannelTableHeader'
import { SettingsCell } from './components/SettingsCell'
import { SortableTableContainer } from './components/SortableTableContainer'
import { SortableTableItem } from './components/SortableTableItem'

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
import { SortEndHandler } from 'react-sortable-hoc'

interface ChannelTableQueryProps {
  id: string
  channel: ChannelPage_channel
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
    accessor: block => ('__typename' in block ? block?.id : null),
    Cell: SettingsCell,
    width: '70px',
  },
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
}) => {
  const [sortAndSortDir, setSortAndSortDir] = useReducer(
    sortAndSortDirReducer,
    { sort: Sorts.POSITION, dir: SortDirection.DESC }
  )

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
      onItemIntersected={onItemIntersected}
      addBlock={addBlock}
      updateBlock={updateBlock}
      getBlocksFromCache={getBlocksFromCache}
      moveBlock={moveBlock}
    />
  )
}

interface ChannelTableContentsProps {
  blocks: Array<ChannelTableContentsSet_channel_blokks | null>
  channel: ChannelPage_channel
  contentCount: number
  sortAndSortDir: SortAndSortDir
  setSortAndSortDir: React.Dispatch<SortAndSortDir>
  onItemIntersected: (index: number) => void
  addBlock: () => void
  updateBlock: (args: {
    id: string
    type: BaseConnectableTypeEnum | false
  }) => Promise<void>
  getBlocksFromCache: () => Array<ChannelTableContentsSet_channel_blokks | null> | null
  moveBlock: (args: { oldIndex: number; newIndex: number }) => void
}

export const ChannelTableContents: React.FC<ChannelTableContentsProps> = ({
  blocks,
  channel,
  contentCount,
  sortAndSortDir,
  setSortAndSortDir,
  onItemIntersected,
  addBlock,
  updateBlock,
  getBlocksFromCache,
  moveBlock,
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
    return STANDARD_HEADERS
  }, [])

  const getRowId = useCallback(
    (
      row: TableData,
      index: number,
      parent?: Row<TableData> | undefined
    ): string => {
      const parentId = parent?.id ?? 'noParent'
      const rowId = '__typename' in row ? row.id.toString() : `nullRow${index}`
      return `${parentId},${rowId}`
    },
    []
  )

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

  return (
    <Box>
      <Table {...getTableProps()}>
        <ChannelTableHeader
          headerGroups={headerGroups}
          channel={channel}
          sortAndSortDir={sortAndSortDir}
          setSortAndSortDir={setSortAndSortDir}
          addBlock={addBlock}
        />
        <SortableTableContainer
          transitionDuration={0}
          distance={1}
          useDragHandle
          axis="y"
          useWindowAsScrollContainer
          onSortEnd={onSortEnd}
        >
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)

              const { key: rowKey, ...rowProps } = row.getRowProps()
              const sharedIntersectionObserverBoxProps = {
                id: row.index,
                callback: intersectionObserverCallback,
                options: intersectionObserverOptions,
              }

              let tableItemContent: JSX.Element | null = null
              if (
                row.isExpanded &&
                '__typename' in row.original &&
                row.original.__typename !== 'Channel'
              ) {
                /**
                 * If the row is an expanded connectable
                 */

                const componentProps: ExpandedBlockRowProps = {
                  block: row.original,
                  columnLength: columns.length,
                  ...rowProps,
                  onMinimize: () => row.toggleRowExpanded(false),
                }
                tableItemContent = (
                  <IntersectionObserverBox
                    {...sharedIntersectionObserverBoxProps}
                    Component={ExpandedBlockRow}
                    componentProps={componentProps}
                  />
                )
              } else if (
                row.isExpanded &&
                '__typename' in row.original &&
                row.original.__typename === 'Channel'
              ) {
                /**
                 * If the row is an expanded channel
                 */

                tableItemContent = (
                  <IntersectionObserverBox
                    {...sharedIntersectionObserverBoxProps}
                    Component={ExpandedChannelRow}
                    componentProps={{
                      channel: row.original,
                      columnLength: columns.length,
                      ...rowProps,
                      onMinimize: () => row.toggleRowExpanded(false),
                    }}
                  />
                )
              } else if (
                '__typename' in row.original &&
                row.original.__typename === 'Channel'
              ) {
                /**
                 * If the row is a channel
                 */

                tableItemContent = (
                  <IntersectionObserverBox
                    {...sharedIntersectionObserverBoxProps}
                    Component={ChannelRow}
                    componentProps={{
                      channel: row.original,
                      ...rowProps,
                      onClick: () => row.toggleRowExpanded(true),
                    }}
                  />
                )
              } else {
                /**
                 * If the row is a connectable or null
                 */

                tableItemContent = (
                  <IntersectionObserverBox
                    {...sharedIntersectionObserverBoxProps}
                    Component={TR}
                    componentProps={{
                      ...rowProps,
                      onClick: () => row.toggleRowExpanded(true),
                      children: row.cells.map(cell => {
                        const {
                          key: cellKey,
                          ...cellProps
                        } = cell.getCellProps()
                        return (
                          <TD
                            key={cellKey}
                            width={cell.column.width}
                            maxWidth={cell.column.maxWidth}
                            {...cellProps}
                          >
                            {cell.render('Cell')}
                          </TD>
                        )
                      }),
                    }}
                  />
                )
              }

              const isRowMovable =
                sortAndSortDir.sort === Sorts.POSITION && !row.isExpanded

              return (
                <SortableTableItem
                  /**
                   * There's an issue between react-sortable-hoc
                   * and react-table where clicking and dragging
                   * after a row is expanded doesn't work. Changing
                   * the key every time a row's expanded state changes
                   * forces the row to re render and allows dragging to
                   * work again
                   */
                  key={`${rowKey}.${row.isExpanded}`}
                  index={row.index}
                  disabled={!isRowMovable}
                >
                  {tableItemContent}
                </SortableTableItem>
              )
            })}
          </tbody>
        </SortableTableContainer>
      </Table>
    </Box>
  )
}
