import { DocumentNode, useQuery } from '@apollo/client'
import { useRef, useCallback, useMemo } from 'react'

import { ChannelContentsConnectable } from '__generated__/ChannelContentsConnectable'
import {
  moveConnectableMutationVariables,
  moveConnectableMutation as moveConnectableMutationData,
} from '__generated__/moveConnectableMutation'
import {
  BaseConnectableTypeEnum,
  SortDirection,
  Sorts,
} from '__generated__/globalTypes'
import {
  ChannelContentCount,
  ChannelContentCountVariables,
} from '__generated__/ChannelContentCount'

import moveConnectableMutation from 'v2/components/ChannelContents/mutations/moveConnectable'
import { getConnectableType } from 'v2/util/getConnectableType'
import { CHANNEL_CONTENT_COUNT } from './ChannelContentCount'

/**
 * The minimum required shape for the channel query
 */
type RequiredChannelQueryData = {
  channel: null | {
    __typename: 'Channel'
    id: number
    blokks: null | Array<{
      __typename: ChannelContentsConnectable['__typename']
      id: number
    } | null>
    counts: null | {
      __typename: 'ChannelCounts'
      contents: number | null
      blocks: number | null
      channels: number | null
    }
  }
}

/**
 * The minimum required shape for the channel query variables
 */
type RequiredChannelQueryVariables = {
  id: string
  page: number
  per: number
  sort?: Sorts | null
  direction?: SortDirection | null
}

/**
 * The minimum required shape for the block query
 */
type RequiredBlockQueryData = {
  blokk: null | {
    __typename: ChannelContentsConnectable['__typename']
    id: number
  }
}

/**
 * The minimum required shape for the block query variables
 */
type RequiredBlockQueryVariables = {
  id: string
}

/**
 * The base arguments for usePaginatedBlocks
 */
type UsePaginatedBlocksBaseArgs = {
  channelId: string
  channelQuery: DocumentNode
  per: number
  sort?: Sorts | null
  direction?: SortDirection | null
  ssr?: boolean
}

/**
 * The full arguments for usePaginatedBlocks
 */
type UsePaginatedBlocksArgs = UsePaginatedBlocksBaseArgs & {
  blockquery: DocumentNode
}

/**
 * The contents of the blokks field
 */
type Block<ChannelQueryData extends RequiredChannelQueryData> = NonNullable<
  NonNullable<ChannelQueryData['channel']>['blokks']
>[number]

/**
 * The base return type for usePaginatedBlocks
 */
type UsePaginatedBlocksBaseApi<
  ChannelQueryData extends RequiredChannelQueryData
> = {
  blocks: Array<Block<ChannelQueryData>>
  getPage: (pageNumber: number) => void
  hasQueriedPage: (pageNumber: number) => boolean
  getPageFromIndex: (index: number) => number
  removeBlock: (args: { id: number; type: string }) => void
  moveBlock: (args: { oldIndex: number; newIndex: number }) => void
  addBlock: () => void
  getBlocksFromCache: () => Array<Block<ChannelQueryData>>
}

/**
 * The full return type for usePaginatedBlocks
 */
type UsePaginatedBlocksApi<
  ChannelQueryData extends RequiredChannelQueryData
> = UsePaginatedBlocksBaseApi<ChannelQueryData> & {
  updateBlock: (args: {
    id: string
    type: BaseConnectableTypeEnum | false
  }) => Promise<void>
}

/**
 * The base overload of usePaginatedBlocks which doesn't support
 * the updateBlock function
 */
export function usePaginatedBlocks<
  ChannelQueryData extends RequiredChannelQueryData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ChannelQueryVariables extends RequiredChannelQueryVariables
>(
  unsafeArgs: UsePaginatedBlocksBaseArgs
): UsePaginatedBlocksBaseApi<ChannelQueryData>

/**
 * The full overload of usePaginatedBlocks
 */
export function usePaginatedBlocks<
  ChannelQueryData extends RequiredChannelQueryData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ChannelQueryVariables extends RequiredChannelQueryVariables,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  BlockQueryData extends RequiredBlockQueryData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  BlockQueryVariables extends RequiredBlockQueryVariables
>(unsafeArgs: UsePaginatedBlocksArgs): UsePaginatedBlocksApi<ChannelQueryData>

/**
 * A hook to easily work with a collection of blocks from a channel.
 * Returns the channel's blocks as well as utility methods to fetch more,
 * move blocks around, add blocks, and delete blocks.
 */
export function usePaginatedBlocks<
  ChannelQueryData extends RequiredChannelQueryData,
  ChannelQueryVariables extends RequiredChannelQueryVariables,
  BlockQueryData extends RequiredBlockQueryData,
  BlockQueryVariables extends RequiredBlockQueryVariables
>(
  args: UsePaginatedBlocksBaseArgs & Partial<UsePaginatedBlocksArgs>
): UsePaginatedBlocksBaseApi<ChannelQueryData> &
  Partial<UsePaginatedBlocksApi<ChannelQueryData>> {
  // =============================
  // "Private" fields of this hook
  // =============================

  /**
   * A set that keeps track of which pages have already been queried for
   */
  const queriedPageNumbersRef = useRef(new Set<number>())

  /**
   * A variable that stores all the identifiable information of
   * to the current query. If any of this data changes, reset
   * the queriedPageNumbersRef.
   */
  const channelQueryData: {
    query: DocumentNode
    variables: ChannelQueryVariables
  } = useMemo(() => {
    queriedPageNumbersRef.current = new Set()

    return {
      query: args.channelQuery,
      variables: {
        id: args.channelId,
        page: 1,
        per: args.per,
        sort: args.sort,
        direction: args.direction,
      } as ChannelQueryVariables,
    }
  }, [args.channelQuery, args.channelId, args.per, args.sort, args.direction])

  /**
   * The current blocks that we have for a channel
   */
  const { data: unsafeData, fetchMore, client } = useQuery<
    ChannelQueryData,
    ChannelQueryVariables
  >(channelQueryData.query, {
    variables: channelQueryData.variables,
    ssr: args.ssr,
    context: { queryDeduplication: false },
  })

  /**
   * The total number of blocks/channels that a channel has. Note that this
   * could be different than the current length of the "blocks" array
   * due to not downloading all the block information from a channel
   */
  const contentCount: number =
    useQuery<ChannelContentCount, ChannelContentCountVariables>(
      CHANNEL_CONTENT_COUNT,
      {
        fetchPolicy: 'cache-only',
        variables: {
          id: channelQueryData.variables.id,
        },
      }
    )?.data?.channel?.counts?.contents ?? 0

  /**
   * A function to get the currently cached query data. Useful if
   * you want to use this data in a memoized function without re-memoizing
   * every time the query data changes (which happens a lot)
   */
  const getQueryFromCache: () => ChannelQueryData | null = useCallback(() => {
    return client.readQuery<ChannelQueryData, ChannelQueryVariables>({
      query: channelQueryData.query,
      variables: channelQueryData.variables,
    })
  }, [client, channelQueryData])

  /**
   * A function that allows you to directly modify the channel's "blokks"
   * cache value. If the length of blokks changes, the channel.counts.contents
   * field will be updated to the new value.
   */
  const updateCache: (
    updater: (args: {
      prevBlocks: Array<Block<ChannelQueryData>> | null
      prevCount: number
    }) => {
      newBlocks?: Array<Block<ChannelQueryData>> | null
      newCount?: number
    } | null
  ) => void = useCallback(
    updater => {
      // Read current blocks and count from the cache
      const cachedQuery = getQueryFromCache()
      const prevBlocks = cachedQuery?.channel?.blokks ?? null
      const prevCount =
        client.readQuery<ChannelContentCount, ChannelContentCountVariables>({
          query: CHANNEL_CONTENT_COUNT,
          variables: { id: channelQueryData.variables.id },
        })?.channel?.counts?.contents ?? 0

      // Run the updater callback and get the new data
      const newData = updater({ prevBlocks, prevCount })

      // Early exit if no new data was given
      if (!newData) {
        return
      }

      // Assign the new data, falling back to old values if a new
      // value wasn't given
      const newBlocks = newData.newBlocks ?? prevBlocks
      const newCount = newData.newCount ?? prevCount

      // Build the new cache object. Note: We need to do
      // a spread at every level in the object because
      // we do not know what the actual shape of this query
      // is, we only know that it extends RequiredChannelQueryData
      const data: ChannelQueryData = {
        ...cachedQuery,
        channel: {
          ...cachedQuery?.channel,
          counts: {
            ...cachedQuery?.channel?.counts,
            contents: newCount,
          },
          blokks: newBlocks,
        },
      } as ChannelQueryData

      // Write the data to cache. Note: we need to set overwrite to
      // true because we don't want this new data to be merged
      // in with the cache's previous data (what normally happens).
      // This is a complete overwrite of what was there before.
      client.cache.writeQuery<ChannelQueryData, ChannelQueryVariables>({
        query: channelQueryData.query,
        variables: channelQueryData.variables,
        data: data,
        overwrite: true,
      })
    },
    [getQueryFromCache, client, channelQueryData]
  )

  /**
   * A helper function to re-query for pages that have already been
   * queried. This is used after a mutation updates the blocks array.
   */
  const revalidatePages = useCallback(
    (fromPage: number, toPage: number) => {
      const dir = toPage > fromPage ? 1 : -1
      for (let page = fromPage; page !== toPage + dir; page += dir) {
        if (queriedPageNumbersRef.current.has(page)) {
          fetchMore({
            variables: {
              page: page,
            },
          })
        }
      }
    },
    [fetchMore]
  )

  // =====================
  // The hook's public api
  // =====================

  /**
   * An array of blocks that apollo currently has cached
   */
  const blocks: UsePaginatedBlocksApi<
    ChannelQueryData
  >['blocks'] = useMemo(() => {
    const partialBlocks = unsafeData?.channel?.blokks ?? []

    const fullBlocks: Array<Block<ChannelQueryData>> = []
    for (let i = 0; i < contentCount; i++) {
      fullBlocks.push(partialBlocks[i] ?? null)
    }

    return fullBlocks
  }, [unsafeData, contentCount])

  /**
   * Gets block data from a given page
   */
  const getPage: UsePaginatedBlocksApi<
    ChannelQueryData
  >['getPage'] = useCallback(
    pageNumber => {
      queriedPageNumbersRef.current.add(pageNumber)

      fetchMore({
        variables: {
          page: pageNumber,
        },
      })
    },
    [fetchMore]
  )

  /**
   * Returns if a given page has already been queried for or not
   */
  const hasQueriedPage: UsePaginatedBlocksApi<
    ChannelQueryData
  >['hasQueriedPage'] = useCallback(pageNember => {
    return queriedPageNumbersRef.current.has(pageNember)
  }, [])

  /**
   * Returns the page number that a block's index would be in
   */
  const getPageFromIndex: UsePaginatedBlocksApi<
    ChannelQueryData
  >['getPageFromIndex'] = useCallback(
    index => {
      return Math.floor(index / channelQueryData.variables.per) + 1
    },
    [channelQueryData.variables.per]
  )

  /**
   * Removes a block from a channel ONLY on the frontend. Does not do any
   * actual mutation/network request.
   */
  const removeBlock: UsePaginatedBlocksApi<
    ChannelQueryData
  >['removeBlock'] = useCallback(
    ({ id, type }) => {
      updateCache(({ prevBlocks, prevCount }) => {
        // Early exit if there aren't any blocks in the cache yet
        if (!prevBlocks) {
          return null
        }

        // Find the block in the blocks array
        const blockIndex = prevBlocks.findIndex(
          block => block?.id === id && block.__typename === type
        )

        // Early exit if the block can't be found
        if (blockIndex === -1) {
          return null
        }

        // Build the new cache data
        const newCount = prevCount - 1
        const newBlocks = [...prevBlocks]
        newBlocks.splice(blockIndex, 1)

        // Revalidate pages between the block index that was removed and
        // the end of the blocks array
        revalidatePages(
          getPageFromIndex(blockIndex),
          getPageFromIndex(newCount - 1)
        )

        return {
          newBlocks: newBlocks,
          newCount: newCount,
        }
      })
    },
    [getPageFromIndex, revalidatePages, updateCache]
  )

  /**
   * Moves a block from an old index to a new index and triggers an
   * apollo mutation
   */
  const moveBlock: UsePaginatedBlocksApi<
    ChannelQueryData
  >['moveBlock'] = useCallback(
    ({ oldIndex, newIndex }) => {
      updateCache(({ prevBlocks, prevCount }) => {
        // Early exit if there aren't any blocks in the cache yet
        if (!prevBlocks) {
          return null
        }

        // Moving to the "bottom". Convert a -1 newIndex value to a
        // synonymous "count - 1" value that the mutation can understand
        if (newIndex === -1) {
          newIndex = prevCount - 1
        }

        // Get the block reference in the cache. Early exit if we can't
        // read it
        const block = prevBlocks[oldIndex]
        if (!block) {
          return null
        }

        // Fire the mutation
        client.mutate<
          moveConnectableMutationData,
          moveConnectableMutationVariables
        >({
          mutation: moveConnectableMutation,
          variables: {
            channel_id: channelQueryData.variables.id,
            connectable: {
              id: block.id.toString(),
              type: getConnectableType(block.__typename),
            },
            insert_at: prevCount - newIndex,
          },
        })

        // Return the updated cache of the blocks array
        const newBlocks: typeof prevBlocks = []
        for (let i = 0; i < Math.max(prevBlocks.length, newIndex + 1); i++) {
          newBlocks.push(prevBlocks[i] ?? null)
        }
        const [removed] = newBlocks.splice(oldIndex, 1)
        newBlocks.splice(newIndex, 0, removed)
        return { newBlocks }
      })
    },
    [channelQueryData.variables.id, client, updateCache]
  )

  /**
   * A helper function to pull the most recent block data from the cache,
   * instead of passing the blocks data in as a dependency that will change
   * whenever the blocks are mutated
   */
  const getBlocksFromCache: UsePaginatedBlocksApi<
    ChannelQueryData
  >['getBlocksFromCache'] = useCallback(() => {
    const cachedQuery = getQueryFromCache()

    return cachedQuery?.channel?.blokks ?? []
  }, [getQueryFromCache])

  /**
   * Refetch block and update cache
   */
  const updateBlock: UsePaginatedBlocksApi<
    ChannelQueryData
  >['updateBlock'] = useCallback(
    async ({ id, type }) => {
      if (!args.blockquery) {
        return
      }

      // No need to update a channel block, just return early
      if (type === BaseConnectableTypeEnum.CHANNEL) {
        return
      }

      // Refetch the block
      let block: BlockQueryData['blokk'] | null = null
      try {
        const result = await client.query<BlockQueryData, BlockQueryVariables>({
          query: args.blockquery,
          variables: {
            id: id.toString(),
          } as BlockQueryVariables,
          fetchPolicy: 'network-only',
        })

        block = result.data.blokk
      } catch {
        // do nothing
      }

      // Early exit if we can't find a block
      if (!block) {
        return
      }

      // Update the cache to replace the previous block with the new block
      updateCache(({ prevBlocks }) => {
        // Early exit if there aren't any blocks in the cache yet
        if (!prevBlocks) {
          return null
        }

        // Find the block in the blocks array
        const blockIndex = prevBlocks.findIndex(b => {
          return b?.id.toString() === id
        })

        // Early exit if the block can't be found
        if (blockIndex === -1) {
          return null
        }

        // Build the new blocks array
        const newBlocks = prevBlocks.map((prevBlock, i) =>
          block && i === blockIndex ? block : prevBlock
        )

        return {
          newBlocks,
        }
      })
    },
    [args.blockquery, updateCache, client]
  )

  /**
   * Refetch query and wipe queriedPageNumbersRef
   */
  const addBlock: UsePaginatedBlocksApi<
    ChannelQueryData
  >['addBlock'] = useCallback(() => {
    queriedPageNumbersRef.current = new Set()
    client.refetchQueries({
      include: [args.channelQuery],
      optimistic: true,
    })
  }, [args.channelQuery, client])

  // ==============================
  // Build and return the final api
  // ==============================

  const api: UsePaginatedBlocksApi<ChannelQueryData> = {
    blocks,
    getPage,
    hasQueriedPage,
    getPageFromIndex,
    moveBlock,
    removeBlock,
    addBlock,
    updateBlock,
    getBlocksFromCache,
  }

  return api
}
