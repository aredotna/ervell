import React, { useEffect, useState } from 'react'
import { Query } from '@apollo/client/react/components'

import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'

import ExploreViews from 'v2/pages/explore/ExplorePage/components/ExploreViews'

import ExploreMetadata from 'v2/components/ExploreMetadata'
import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import BottomBanner from 'v2/components/BottomBanner'
import { MobileOrChildren } from 'v2/components/MobileBanner'
import Title from 'v2/components/UI/Head/components/Title'

import exploreUiStateQuery from 'v2/pages/explore/ExplorePage/queries/exploreUiState'
import { BlockFilterEnum, SearchSorts } from '__generated__/globalTypes'

interface ExplorePageProps {
  view: 'all' | 'channels' | 'blocks'
  sort: SearchSorts
  block_filter: BlockFilterEnum
  seed?: number
  timestamp?: string
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  view,
  sort,
  block_filter,
  timestamp,
  seed,
}) => {
  return (
    <ErrorBoundary>
      <Title>Explore</Title>

      <TopBarLayout>
        <Constrain>
          <ExploreMetadata
            view={view}
            sort={sort}
            block_filter={block_filter}
          />

          <ExploreViews
            view={view}
            sort={sort}
            blockFilter={block_filter}
            seed={seed}
            timestamp={timestamp}
          />
          <MobileOrChildren>
            <BottomBanner banner="LOGGED_OUT_EXPLORE" />
          </MobileOrChildren>
        </Constrain>
      </TopBarLayout>
    </ErrorBoundary>
  )
}

const VALID_SORTS = ['UPDATED_AT', 'RANDOM']
const VALID_FILTERS = ['IMAGE', 'EMBED', 'TEXT', 'ATTACHMENT', 'LINK']

const setValid = (value, validValues, defaultValue) => {
  if (validValues.includes(value)) return value
  return defaultValue
}

export default ({ params, query }) => {
  const [timestamp, setTimestamp] = useState(null)
  const [seed, setSeed] = useState<number>(null)

  useEffect(() => {
    setTimestamp(new Date().toISOString())
    setSeed(Math.floor(Math.random() * 100000))
  }, [setTimestamp, setSeed])

  return (
    <Query query={exploreUiStateQuery} fetchPolicy="network-only">
      {props => {
        if (props.error) return props.error.message

        const { cookies } = props.data || {}

        const view = params.view || (cookies && cookies.view) || 'all'
        const sort = setValid(
          query.sort || (cookies && cookies.sort),
          VALID_SORTS,
          'UPDATED_AT'
        )

        const filter =
          query.block_filter || (cookies && cookies.block_filter) || null
        const block_filter = setValid(filter, VALID_FILTERS, null)

        const extraProps = timestamp ? { timestamp } : {}

        return (
          <ExplorePage
            view={view}
            sort={sort}
            block_filter={block_filter as BlockFilterEnum}
            seed={seed}
            {...extraProps}
          />
        )
      }}
    </Query>
  )
}
