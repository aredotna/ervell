import { Reference, StoreObject, useQuery } from '@apollo/client'
import { Modifier } from '@apollo/client/cache/core/types/common'
import { useRef, useCallback } from 'react'

import { ChannelContentsConnectable } from '__generated__/ChannelContentsConnectable'
import { ChannelContentsCount } from '__generated__/ChannelContentsCount'
import {
  ChannelBlokksPaginated,
  ChannelBlokksPaginatedVariables,
  ChannelBlokksPaginated_channel_blokks,
} from '__generated__/ChannelBlokksPaginated'
import {
  moveConnectableMutationVariables,
  moveConnectableMutation as moveConnectableMutationData,
} from '__generated__/moveConnectableMutation'

import moveConnectableMutation from '../mutations/moveConnectable'
import channelContentsCount from '../fragments/channelContentsCount'
import channelBlokksPaginatedQuery, {
  channelBlokksPaginatedPerPage,
} from '../queries/channelBlokksPaginated'
import { getConnectableType } from './getConnectableType'

type UsePaginatedBlocksApi = {
  blocks: ChannelBlokksPaginated_channel_blokks[]
  contentCount: number
  getPage: (pageNumber: number) => void
  hasQueriedPage: (pageNumber: number) => boolean
  getPageFromIndex: (index: number) => number
  removeBlock: (args: { id: number; type: string }) => void
  moveBlock: (args: { oldIndex: number; newIndex: number }) => void
  addBlock: () => void
  getBlocksFromCache: () => ChannelBlokksPaginated_channel_blokks[]
}

/**
 * A hook to easily work with a collection of blocks from a channel.
 * Returns the channel's blocks as well as utility methods to fetch more,
 * move blocks around, add blocks, and delete blocks.
 */
export const usePaginatedBlocks = (unsafeArgs: {
  channelId: number
  ssr?: boolean
}): UsePaginatedBlocksApi => {
  // =============================
  // "Private" fields of this hook
  // =============================

  /**
   * This hook doesn't support updating the initially passed-in args in any way.
   * So to make that clear we are creating a ref of the initial argsObject and
   * only accessing the args this way. This will assert that the args won't
   * change from under us, while also making it so that we don't needs to pass
   * any of these values into dependency arrays for useCallback, useEffect, etc.
   */
  const args = useRef(unsafeArgs)

  /**
   * The current blocks that we have for a channel
   */
  const { data: unsafeData, fetchMore, client } = useQuery<
    ChannelBlokksPaginated,
    ChannelBlokksPaginatedVariables
  >(channelBlokksPaginatedQuery, {
    variables: {
      id: args.current.channelId.toString(),
      page: 1,
      per: channelBlokksPaginatedPerPage,
    },
    ssr: args.current.ssr,
    context: { queryDeduplication: false },
  })

  /**
   * A function that allows you to directly modify the channel's "blokks"
   * cache value. If the length of blokks changes, the channel.counts.contents
   * field will be updated to the new value.
   */
  const updateCache: (
    updater: (args: {
      blockArgs: Parameters<Modifier<Array<StoreObject | Reference>>>
      prevCount: number
    }) => {
      newBlocks?: Array<StoreObject | Reference>
      newCount?: number
    } | null
  ) => void = useCallback(
    updater => {
      // The normalized cache name of the channel
      const id = client.cache.identify({
        __typename: 'Channel',
        id: args.current.channelId,
      })

      // Read the current contentCount of the channel instead
      // of passing it in as a useCallback dependency to reduce
      // re renders
      const prevCount =
        client.readFragment<ChannelContentsCount>({
          fragment: channelContentsCount,
          id: id,
        })?.counts?.contents ?? 0

      // Values we'll be saving during the first cache.modify call
      let newBlocks: Array<any>
      let newCount = 0

      // This is a dry run of the cache modification that sets the
      // newBlocks and blockLengthDiff. We need to do a dry run
      // Because the updated counts.contents value requires knowing
      // both the previous and next values of blokks
      client.cache.modify({
        id: id,
        fields: {
          blokks(b, options) {
            const res = updater({
              blockArgs: [b, options],
              prevCount: prevCount,
            })
            console.log('[b, options]', [b, options])
            newBlocks = res?.newBlocks ?? b
            newCount = res?.newCount ?? prevCount

            return b
          },
        },
      })

      // Do the actual modification of blokks and counts
      client.cache.modify({
        id: id,
        fields: {
          blokks(b) {
            return newBlocks || b
          },
          counts(countsCache) {
            return {
              ...countsCache,
              contents: newCount,
            }
          },
        },
      })
    },
    [client]
  )

  /**
   * A set that keeps track of which pages have already been queried for
   */
  const queriedPageNumbersRef = useRef(new Set<number>())

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
  const blocks: UsePaginatedBlocksApi['blocks'] =
    unsafeData?.channel?.blokks ?? []

  /**
   * The total number of blocks that a channel has. Note that this
   * could be different than the current length of the "blocks" array
   * due to not downloading all the block information from a channel
   */
  const contentCount: UsePaginatedBlocksApi['contentCount'] =
    unsafeData?.channel?.counts?.contents ?? 0

  /**
   * Gets block data from a given page
   */
  const getPage: UsePaginatedBlocksApi['getPage'] = useCallback(
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
  const hasQueriedPage: UsePaginatedBlocksApi['hasQueriedPage'] = useCallback(
    pageNember => {
      return queriedPageNumbersRef.current.has(pageNember)
    },
    []
  )

  /**
   * Returns the page number that a block's index would be in
   */
  const getPageFromIndex: UsePaginatedBlocksApi['getPageFromIndex'] = useCallback(
    index => {
      return Math.floor(index / channelBlokksPaginatedPerPage) + 1
    },
    []
  )

  /**
   * Removes a block from a channel ONLY on the frontend. Does not do any
   * actual mutation/network request.
   */
  const removeBlock: UsePaginatedBlocksApi['removeBlock'] = useCallback(
    ({ id, type }) => {
      updateCache(({ blockArgs: [prevBlocks, { readField }], prevCount }) => {
        // Find the block in the blocks array
        const blockIndex = prevBlocks.findIndex(
          block =>
            block &&
            readField('id', block) === id &&
            readField('__typename', block) === type
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
  const moveBlock: UsePaginatedBlocksApi['moveBlock'] = useCallback(
    ({ oldIndex, newIndex }) => {
      updateCache(({ blockArgs: [prevBlocks, { readField }], prevCount }) => {
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

        // Get the id and typename from the cache. Early exit if we
        // cant read any of those values
        const id = readField('id', block) || undefined
        const typename = readField('__typename', block) || undefined
        if (id === undefined || typename === undefined) {
          return null
        }

        // Fire the mutation
        client.mutate<
          moveConnectableMutationData,
          moveConnectableMutationVariables
        >({
          mutation: moveConnectableMutation,
          variables: {
            channel_id: args.current.channelId.toString(),
            connectable: {
              id: id.toString(),
              type: getConnectableType(
                typename as ChannelContentsConnectable['__typename']
              ),
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
    [client, updateCache]
  )

  /**
   * A helper function to pull the most recent block data from the cache,
   * instead of passing the blocks data in as a dependency that will change
   * whenever the blocks are mutated
   */
  const getBlocksFromCache: UsePaginatedBlocksApi['getBlocksFromCache'] = useCallback(() => {
    const unsafeResult = client.readQuery<
      ChannelBlokksPaginated,
      ChannelBlokksPaginatedVariables
    >({
      query: channelBlokksPaginatedQuery,
      variables: {
        id: args.current.channelId.toString(),
        page: 1,
        per: channelBlokksPaginatedPerPage,
      },
    })

    return unsafeResult?.channel?.blokks || []
  }, [client])

  /**
   * Refetch query and wipe queriedPageNumbersRef
   */
  const addBlock: UsePaginatedBlocksApi['addBlock'] = useCallback(() => {
    queriedPageNumbersRef.current = new Set()
    client.refetchQueries({
      include: [channelBlokksPaginatedQuery],
      optimistic: true,
    })
  }, [client])

  // ==============================
  // Build and return the final api
  // ==============================

  const api: UsePaginatedBlocksApi = {
    blocks,
    contentCount,
    getPage,
    hasQueriedPage,
    getPageFromIndex,
    moveBlock,
    removeBlock,
    addBlock,
    getBlocksFromCache,
  }

  return api
}
