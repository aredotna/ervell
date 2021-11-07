import React, { useCallback } from 'react'
import { usePaginatedBlocks } from 'v2/hooks/usePaginatedBlocks'

import {
  ChannelTableContentsSet,
  ChannelTableContentsSetVariables,
} from '__generated__/ChannelTableContentsSet'

import CHANNEL_TABLE_CONTENTS_QUERY from './queries/ChannelTableContents'
import { ChannelTableContents } from './components/ChannelTableContents'

interface ChannelTableQueryProps {
  id: string
}

const devSetSort = () => {}
const devSetDirection = () => {}

export const ChannelTableQuery: React.FC<ChannelTableQueryProps> = ({ id }) => {
  const {
    blocks,
    getPage,
    getPageFromIndex,
    hasQueriedPage,
  } = usePaginatedBlocks<
    ChannelTableContentsSet,
    ChannelTableContentsSetVariables
  >({
    channelQuery: CHANNEL_TABLE_CONTENTS_QUERY,
    channelId: id,
    per: 25,
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
      blocks={blocks}
      setSort={devSetSort}
      setDirection={devSetDirection}
      onItemIntersected={onItemIntersected}
    />
  )
}
