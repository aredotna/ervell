import React, { useEffect, useState } from 'react'

import ExploreContents from 'v2/components/ExploreContents'
import { FetchPolicy } from '@apollo/client'
import {
  BlockFilterEnum,
  SearchSorts,
  SearchType,
} from '__generated__/globalTypes'

interface ExploreAllProps {
  sort: SearchSorts
  timestamp: string
  fetchPolicy: FetchPolicy
  seed?: number
}

const All: React.FC<ExploreAllProps> = ({
  sort,
  fetchPolicy,
  timestamp,
  seed,
}) => (
  <ExploreContents
    type={SearchType.ALL}
    sort={sort}
    fetchPolicy={fetchPolicy}
    timestamp={timestamp}
    seed={seed}
  />
)

interface ExploreBlocksProps {
  sort: SearchSorts
  timestamp?: string
  fetchPolicy: FetchPolicy
  blockFilter?: BlockFilterEnum
  seed?: number
}

const Blocks: React.FC<ExploreBlocksProps> = ({
  sort,
  fetchPolicy,
  blockFilter,
  timestamp,
  seed,
}) => (
  <ExploreContents
    type={SearchType.CONNECTABLE}
    sort={sort}
    fetchPolicy={fetchPolicy}
    blockFilter={blockFilter}
    timestamp={timestamp}
    seed={seed}
  />
)

interface ExploreChannelsProps {
  sort?: SearchSorts
  fetchPolicy?: FetchPolicy
  timestamp?: string
  seed?: number
}

const Channels: React.FC<ExploreChannelsProps> = ({
  sort,
  fetchPolicy,
  timestamp,
  seed,
}) => (
  <ExploreContents
    type={SearchType.CHANNEL}
    sort={sort}
    fetchPolicy={fetchPolicy}
    timestamp={timestamp}
    seed={seed}
  />
)

interface ExploreViewsProps {
  view: 'all' | 'channels' | 'blocks'
  sort: SearchSorts
  blockFilter?: BlockFilterEnum
  timestamp?: string
  seed?: number
}

const ExploreViews: React.FC<ExploreViewsProps> = ({
  view,
  sort,
  blockFilter,
  timestamp,
  seed,
}) => {
  const [renderedView, setRenderedView] = useState(view)
  const [fetchPolicy, setFetchPolicy] = useState<FetchPolicy>('cache-first')

  useEffect(() => {
    if (view != renderedView) {
      setRenderedView(view)
      setFetchPolicy('network-only')
    }
  }, [view])

  switch (view) {
    case 'all':
      return (
        <All
          sort={sort}
          fetchPolicy={fetchPolicy}
          timestamp={timestamp}
          seed={seed}
        />
      )
    case 'channels':
      return (
        <Channels
          sort={sort}
          fetchPolicy={fetchPolicy}
          timestamp={timestamp}
          seed={seed}
        />
      )
    case 'blocks':
      return (
        <Blocks
          sort={sort}
          fetchPolicy={fetchPolicy}
          blockFilter={blockFilter}
          timestamp={timestamp}
          seed={seed}
        />
      )
    default:
      return null
  }
}

export default ExploreViews
