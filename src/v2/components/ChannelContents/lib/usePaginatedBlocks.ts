import { ChannelContentsConnectable } from '__generated__/ChannelContentsConnectable'
import { useRef, useLayoutEffect, useState, useCallback } from 'react'
import { useApolloClient } from '@apollo/client'
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

/**
 * A function that merges an incoming subsection of an array
 * into an existing array, based on the page and per values
 * passed in. Handles many edge cases such as
 * 1. Normalizing "undefined" incoming data to null
 * 2. Extending an array
 * 3. Assuring everything is immutably modified
 */
function mergePaginatedBlocks({
  incoming,
  existing,
  page,
  per,
}: {
  incoming: ChannelContentsConnectable[]
  existing: ChannelContentsConnectable[]
  page: number
  per: number
}): ChannelContentsConnectable[] {
  const newData: ChannelContentsConnectable[] = []

  // Index that the incoming data starts at in the newData array
  const incomingStartingIndex = (page - 1) * per

  const incomingEndingIndex =
    incomingStartingIndex +
    Math.min(Array.isArray(incoming) ? incoming.length : 0, per) -
    1

  // Length of the new array
  const newDataLength = Math.max(
    Array.isArray(existing) ? existing.length : 0,
    incomingEndingIndex + 1
  )

  for (let i = 0; i < newDataLength; i++) {
    const isInIncomingWindow =
      i >= incomingStartingIndex && i <= incomingEndingIndex

    if (isInIncomingWindow) {
      const incomingItem = incoming[i - incomingStartingIndex]

      // For some reason, are.na sometimes doesn't return the amount of items
      // from the per argument. Set to null instead of undefined so that
      // the undefined item doesn't get squashed.
      if (incomingItem === undefined) {
        newData[i] = null
      } else {
        newData[i] = incomingItem
      }
    } else if (Array.isArray(existing) && i < existing.length) {
      newData[i] = existing[i]
    } else {
      newData[i] = null
    }
  }

  return newData
}

/**
 * A hook that returns a ref that gives the mounted
 * state of a component
 */
const useIsMountedRef = () => {
  const isMounted = useRef(false)

  useLayoutEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return isMounted
}

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
  const start = blocks[startIndex]
  const end = blocks[endIndex]
  const newBlocks = [...blocks]

  newBlocks[startIndex] = end
  newBlocks[endIndex] = start

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
  channelId: string | number
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
  const [blocks, setBlocks] = useState<ChannelContentsConnectable[]>(() => {
    const initialBlocks = []
    for (let i = 0; i < args.current.initialBlockCount; i++) {
      let itemData: ChannelContentsConnectable | null = null
      if (args.current.initialData && i < args.current.initialData.length) {
        itemData = args.current.initialData[i] ?? null
      }

      initialBlocks.push(itemData)
    }

    return initialBlocks
  })

  /**
   * The apollo client ref that we will be using for IO
   */
  const client = useApolloClient()

  /**
   * A set that keeps track of which pages have already been queried for
   */
  const queriedPageNumbersRef = useRef(new Set<number>())

  /**
   * A ref object that keeps track of the mounted state of the component
   */
  const isMountedRef = useIsMountedRef()

  /**
   * Gets block data from a given page
   */
  const getPage = useCallback(
    async (pageNumber: number) => {
      if (queriedPageNumbersRef.current.has(pageNumber)) {
        return
      }

      queriedPageNumbersRef.current.add(pageNumber)

      const queryResult = await client.query<
        ChannelBlokksPaginated,
        ChannelBlokksPaginatedVariables
      >({
        query: channelBlokksPaginatedQuery,
        variables: {
          id: args.current.channelId.toString(),
          page: pageNumber,
          per: channelBlokksPaginatedPerPage,
        },
        fetchPolicy: 'no-cache',
      })

      const incomingBlocks = queryResult?.data?.channel?.blokks
      if (incomingBlocks.length && isMountedRef.current) {
        setBlocks(b => {
          return mergePaginatedBlocks({
            incoming: incomingBlocks,
            existing: b,
            page: pageNumber,
            per: channelBlokksPaginatedPerPage,
          })
        })
      }
    },
    [client, isMountedRef]
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
      clearQueriedPageNumbers()

      setBlocks(b => {
        return b.filter(block => block.id !== id && block.__typename !== type)
      })
    },
    [clearQueriedPageNumbers]
  )

  /**
   * Moves a block from an old index to a new index and triggers an
   * apollo mutation
   */
  const moveBlock = useCallback(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      clearQueriedPageNumbers()

      setBlocks(b => {
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

        client.mutate<
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

        return reorderBlocks({
          blocks: b,
          startIndex,
          endIndex,
        })
      })
    },
    [clearQueriedPageNumbers, client]
  )

  return {
    blocks,
    getPage,
    hasQueriedPage,
    getPageFromIndex,
    moveBlock,
    removeBlock,
  }
}
