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

/*
 * Helper functions
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

  // Length of the new array
  const newDataLength = Math.max(
    Array.isArray(existing) ? existing.length : 0,
    page * per
  )

  // Index that the incoming data starts at in the newData array
  const incomingStartingIndex = (page - 1) * per

  for (let i = 0; i < newDataLength; i++) {
    const isInIncomingWindow = i >= incomingStartingIndex && i < page * per

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

  // Trim the end of the array of all sequential nulls until there is a
  // block with data
  let indexToBeginTrim = newData.length - 1
  while (indexToBeginTrim > existing.length - 1) {
    if (newData[indexToBeginTrim] !== null) {
      break
    }

    indexToBeginTrim--
  }

  const amountToTrim = newData.length - 1 - indexToBeginTrim

  return amountToTrim === 0 ? newData : newData.slice(0, -amountToTrim)
}

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

function getConnectableType(
  blockType: ChannelContentsConnectable['__typename']
): BaseConnectableTypeEnum {
  if (blockType === 'Channel') {
    return BaseConnectableTypeEnum.CHANNEL
  }

  return BaseConnectableTypeEnum.BLOCK
}

/*
 * usePaginatedBlocks
 */

export const usePaginatedBlocks = (argsObject: {
  channelId: string | number
  initialData: ChannelContentsConnectable[]
  initialBlockCount: number
}) => {
  const args = useRef(argsObject)

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

  const client = useApolloClient()

  const queriedPageNumbersRef = useRef(new Set<number>())

  const isMountedRef = useIsMountedRef()

  const getPage = useCallback(
    async (pageNumber: number) => {
      console.log('🐛getting page', pageNumber)
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

  const hasQueriedPage = useCallback((pageNember: number): boolean => {
    return queriedPageNumbersRef.current.has(pageNember)
  }, [])

  const getPageFromIndex = useCallback((index: number): number => {
    return Math.floor(index / channelBlokksPaginatedPerPage) + 1
  }, [])

  const clearQueriedPageNumbers = useCallback(() => {
    queriedPageNumbersRef.current = new Set()
  }, [])

  const removeBlock = useCallback(
    ({ id, type }: { id: number; type: string }) => {
      clearQueriedPageNumbers()

      setBlocks(b => {
        return b.filter(block => block.id !== id && block.__typename !== type)
      })
    },
    [clearQueriedPageNumbers]
  )

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
