import { ChannelContentsConnectable } from '__generated__/ChannelContentsConnectable'
import { useRef, useCallback } from 'react'
import { Reference, StoreObject, useQuery } from '@apollo/client'
import {
  ChannelBlokksPaginated,
  ChannelBlokksPaginatedVariables,
} from '__generated__/ChannelBlokksPaginated'
import channelBlokksPaginatedQuery, {
  channelBlokksPaginatedPerPage,
} from '../queries/channelBlokksPaginated'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'
import {
  moveConnectableMutationVariables,
  moveConnectableMutation as moveConnectableMutationData,
} from '__generated__/moveConnectableMutation'
import moveConnectableMutation from 'v2/components/ChannelContents/mutations/moveConnectable'
import { ChannelContentsCount } from '__generated__/ChannelContentsCount'
import channelContentsCount from '../fragments/channelContentsCount'
import { Modifier } from '@apollo/client/cache/core/types/common'

/**
 * Resolves a block's type to a connectable type.
 * If a block is a channel the connectable type is
 * BaseConnectableTypeEnum.CHANNEL. Otherwise,
 * BaseConnectableTypeEnum.BLOCK
 */
function getConnectableType(
  blockType: ChannelContentsConnectable['__typename']
): BaseConnectableTypeEnum {
  if (blockType === 'Channel') {
    return BaseConnectableTypeEnum.CHANNEL
  }

  return BaseConnectableTypeEnum.BLOCK
}

/**
 * A hook to easily work with a collection of blocks from a channel.
 * Returns the channel's blocks as well as utility methods to fetch more,
 * move blocks around, add blocks, and delete blocks.
 */
export const usePaginatedBlocks = (unsafeArgs: { channelId: number }) => {
  /**
   * This hook doesn't support updating the intiially passed-in args in any way.
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
  })
  const blocks = unsafeData?.channel?.blokks ?? []
  const contentCount = unsafeData?.channel?.counts?.contents ?? 0

  /**
   * A function that allows you to directly modify the channel's "blokks"
   * cache value. If the length of blokks changes, the channel.counts.contents
   * field will be updated to the new value.
   */
  const updateBlocks = useCallback(
    (updateBlocksFn: Modifier<Array<StoreObject | Reference>>) => {
      // The normalized cache name of the channel
      const id = client.cache.identify({
        __typename: 'Channel',
        id: args.current.channelId,
      })

      // Values we'll be saving during the first cache.modify call
      let newBlocks: Array<any>
      let blockLengthDiff = 0

      // This is a dry run of the cache modification that sets the
      // newBlocks and blockLengthDiff. We need to do a dry run
      // Because the updated counts.contents value requires knowing
      // both the previous and next values of blokks
      client.cache.modify({
        id: id,
        fields: {
          blokks(b, options) {
            newBlocks = updateBlocksFn(b, options)
            blockLengthDiff = newBlocks.length - b.length
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
            if (blockLengthDiff !== 0) {
              return {
                ...countsCache,
                contents: countsCache.contents + blockLengthDiff,
              }
            } else {
              return countsCache
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
   * Gets block data from a given page
   */
  const getPage = useCallback(
    (pageNumber: number) => {
      if (queriedPageNumbersRef.current.has(pageNumber)) {
        return
      }

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
  const hasQueriedPage = useCallback((pageNember: number): boolean => {
    return queriedPageNumbersRef.current.has(pageNember)
  }, [])

  /**
   * Returns the page number that a block's index would be in
   */
  const getPageFromIndex = useCallback((index: number): number => {
    return Math.floor(index / channelBlokksPaginatedPerPage) + 1
  }, [])

  /**
   * Removes a block from a channel ONLY on the frontend. Does not do any
   * actual mutation/network request.
   */
  const removeBlock = useCallback(
    ({ id, type }: { id: number; type: string }) => {
      updateBlocks((b, { readField }) => {
        return b.filter(
          block =>
            !(
              readField('id', block) === id &&
              readField('__typename', block) === type
            )
        )
      })
    },
    [updateBlocks]
  )

  /**
   * Moves a block from an old index to a new index and triggers an
   * apollo mutation
   */
  const moveBlock = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      updateBlocks((b, { readField }) => {
        // Read the current contentCount of the channel instead
        // of passing it in as a useCallback dependency to reduce
        // re renders
        const count = client.readFragment<ChannelContentsCount>({
          fragment: channelContentsCount,
          id: client.cache.identify({
            id: args.current.channelId,
            __typename: 'Channel',
          }),
        })?.counts?.contents

        // Early exit if we can't read the count
        if (!count) {
          return b
        }

        // Moving to the "bottom". Convert a -1 newIndex value to a
        // synonymous "count - 1" value that the mutation can understand
        if (newIndex === -1) {
          newIndex = count - 1
        }

        // Get the block reference in the cache. Early exit if we can't
        // read it
        const block = b[oldIndex]
        if (!block) {
          return b
        }

        // Get the id and typename from the cache. Early exit if we
        // cant read any of those values
        const id = readField('id', block) || undefined
        const typename = readField('__typename', block) || undefined
        if (id === undefined || typename === undefined) {
          return b
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
            insert_at: count - newIndex,
          },
        })

        // Return the updated cache of the blocks array
        const newBlocks = [...b]
        const [removed] = newBlocks.splice(oldIndex, 1)
        newBlocks.splice(newIndex, 0, removed)
        return newBlocks
      })
    },
    [client, updateBlocks]
  )

  /**
   * Adds a null block placeholder to the begining of the blocks cache
   * and fires a query to get the block's actua data
   */
  const addBlock = useCallback(() => {
    updateBlocks(b => {
      return [null, ...b]
    })

    fetchMore({
      variables: {
        page: 1,
        per: 1,
      },
    })
  }, [fetchMore, updateBlocks])

  return {
    blocks,
    contentCount,
    getPage,
    hasQueriedPage,
    getPageFromIndex,
    moveBlock,
    removeBlock,
    addBlock,
  }
}
