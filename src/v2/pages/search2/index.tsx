import React from 'react'
import { useParams } from 'react-router'

import { BlankTopBarLayout } from 'v2/components/UI/Layouts/BlankTopBarLayout'
import Constrain from 'v2/components/UI/Constrain'

import Title from 'v2/components/UI/Head/components/Title'
import Head from 'v2/components/UI/Head'

import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import AdvancedSearch from 'v2/components/AdvancedSearch'
import { AdvancedSearchResultsGrid } from 'v2/components/AdvancedSearch/components/AdvancedSearchResultsGrid'
import { AdvancedSearchContextProvider } from 'v2/components/AdvancedSearch/AdvancedSearchContext'
import Box from 'v2/components/UI/Box'
// import { useSearchParams } from 'react-router-dom'

export const Search2Page: React.FC = () => {
  const params = useParams()
  // const [query] = useSearchParams()

  return (
    <ErrorBoundary>
      <Title>Search2</Title>

      <BlankTopBarLayout>
        <Head>
          <meta name="robots" content="none" />
        </Head>

        <Constrain>
          <Box mt={9} />
          <AdvancedSearchContextProvider
            variables={{ term: { facet: params.term } }}
          >
            <AdvancedSearch />

            <Box mt={7}>
              <AdvancedSearchResultsGrid />
            </Box>
          </AdvancedSearchContextProvider>
        </Constrain>
      </BlankTopBarLayout>
    </ErrorBoundary>
  )
}
