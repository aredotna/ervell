import React from 'react'
import { Query } from '@apollo/client/react/components'
import { remove as removeDiacritics } from 'diacritics'

import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'

import SearchMetadata from 'v2/components/SearchMetadata'
import SearchViews from 'v2/pages/search/SearchPage/components/SearchViews'
import Title from 'v2/components/UI/Head/components/Title'
import Head from 'v2/components/UI/Head'

import ErrorBoundary from 'v2/components/UI/ErrorBoundary'

import searchUiStateQuery from 'v2/pages/search/SearchPage/queries/searchUiState'

interface SearchPageProps {
  view: 'all' | 'channels' | 'blocks' | 'groups' | 'users'
  term: string
  block_filter: 'IMAGE' | 'EMBED' | 'TEXT' | 'ATTACHMENT' | 'LINK' | null
}

const SearchPage: React.FC<SearchPageProps> = ({
  view,
  term,
  block_filter,
}) => {
  return (
    <ErrorBoundary>
      <Title>Search</Title>

      <TopBarLayout>
        <Head>
          <meta name="robots" content="none" />
        </Head>

        <Constrain>
          <SearchMetadata term={term} view={view} block_filter={block_filter} />

          <SearchViews term={term} view={view} block_filter={block_filter} />
        </Constrain>
      </TopBarLayout>
    </ErrorBoundary>
  )
}

const VALID_FILTERS = ['IMAGE', 'EMBED', 'TEXT', 'ATTACHMENT', 'LINK']

const setValid = (value, validValues, defaultValue) => {
  if (validValues.includes(value)) return value
  return defaultValue
}

export default ({ params, query }) => {
  return (
    <Query query={searchUiStateQuery}>
      {props => {
        if (props.error) return props.error.message

        const { cookies } = props.data || {}

        const view = params.view || (cookies && cookies.view) || 'all'
        const term = removeDiacritics(params.term)

        const filter = query.block_filter || (cookies && cookies.block_filter)
        const block_filter = setValid(filter, VALID_FILTERS, null)

        return (
          <SearchPage term={term} view={view} block_filter={block_filter} />
        )
      }}
    </Query>
  )
}
