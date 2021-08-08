import { ChannelContentsConnectable } from '__generated__/ChannelContentsConnectable'
import { useRef, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import {
  ChannelBlokksPaginated,
  ChannelBlokksPaginatedVariables,
  ChannelBlokksPaginated_channel_blokks,
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

/**
 * Move a block from one part of an array to another
 */
const reorderBlocks = ({
  blocks,
  startIndex,
  endIndex,
}: {
  blocks: ChannelContentsConnectable[]
  startIndex: number
  endIndex: number
}): ChannelContentsConnectable[] => {
  const newBlocks = [...blocks]
  const [removed] = newBlocks.splice(startIndex, 1)
  newBlocks.splice(endIndex, 0, removed)

  return newBlocks
}

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
export const usePaginatedBlocks = (argsObject: {
  channelId: number
  initialData: ChannelContentsConnectable[]
  initialBlockCount: number
}) => {
  /**
   * This hook doesn't support updating the intiially passed-in args in any way.
   * So to make that clear we are creating a ref of the initial argsObject and
   * only accessing the args this way. This will assert that the args won't
   * change from under us, while also making it so that we don't needs to pass
   * any of these values into dependency arrays for useCallback, useEffect, etc.
   */
  const args = useRef(argsObject)

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

  const updateBlocks = useCallback(
    (
      updateBlocksFn: (
        prev: ChannelBlokksPaginated_channel_blokks[]
      ) => ChannelBlokksPaginated_channel_blokks[]
    ) => {
      const data = client.readQuery<
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

      const newBlocks = updateBlocksFn(data?.channel?.blokks ?? [])

      if (newBlocks.length !== data?.channel?.blokks?.length) {
        client.writeFragment<ChannelContentsCount>({
          fragment: channelContentsCount,
          variables: {
            id: args.current.channelId,
          },
          data: {
            __typename: 'Channel',
            id: args.current.channelId,
            counts: {
              __typename: 'ChannelCounts',
              contents: newBlocks.length,
            },
          },
        })
      }

      client.writeQuery<
        ChannelBlokksPaginated,
        ChannelBlokksPaginatedVariables
      >({
        query: channelBlokksPaginatedQuery,
        variables: {
          id: args.current.channelId.toString(),
          page: 1,
          per: newBlocks.length,
        },
        overwrite: true,
        data: {
          channel: {
            ...data.channel,
            blokks: newBlocks,
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
   * Resets every hasQueriedPage return value to false. Useful for if
   * you have mutated the channel's blocks and want to trigger a
   * network request
   */
  const clearQueriedPageNumbers = useCallback(() => {
    queriedPageNumbersRef.current = new Set()
  }, [])

  /**
   * Removes a block from a channel ONLY on the frontend. Does not do any
   * actual mutation/network request.
   */
  const removeBlock = useCallback(
    ({ id, type }: { id: number; type: string }) => {
      updateBlocks(b => {
        const newBlocks = b.filter(
          block => !(block.id === id && block.__typename === type)
        )
        console.log('removeBlock', id, type, b, newBlocks)
        return newBlocks
      })

      // clearQueriedPageNumbers()
    },
    [clearQueriedPageNumbers, updateBlocks]
  )

  /**
   * Moves a block from an old index to a new index and triggers an
   * apollo mutation
   */
  const moveBlock = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      updateBlocks(b => {
        const startIndex = oldIndex
        let endIndex = newIndex

        if (newIndex === -1) {
          // Moving to the "bottom"
          endIndex = b.length - 1
        }

        const block = b[startIndex]

        if (!block) {
          return b
        }

        client
          .mutate<
            moveConnectableMutationData,
            moveConnectableMutationVariables
          >({
            mutation: moveConnectableMutation,
            variables: {
              channel_id: args.current.channelId.toString(),
              connectable: {
                id: block.id.toString(),
                type: getConnectableType(block.__typename),
              },
              insert_at: b.length - endIndex,
            },
          })
          .then(() => {
            clearQueriedPageNumbers()
          })

        return reorderBlocks({
          blocks: b,
          startIndex,
          endIndex,
        })
      })
    },
    [clearQueriedPageNumbers, client, updateBlocks]
  )

  const addBlock = useCallback(() => {
    clearQueriedPageNumbers()

    updateBlocks(b => {
      return [null, ...b]
    })
  }, [clearQueriedPageNumbers, updateBlocks])

  return {
    blocks,
    getPage,
    hasQueriedPage,
    getPageFromIndex,
    moveBlock,
    removeBlock,
    addBlock,
  }
}
