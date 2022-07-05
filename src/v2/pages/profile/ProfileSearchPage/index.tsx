import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router'
import { AdvancedSearchContextProvider } from 'v2/components/AdvancedSearch/AdvancedSearchContext'

import { LoadingPage } from 'v2/components/LoadingPage'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'

import { WhereEnum } from '__generated__/globalTypes'
import {
  ProfileSearchPageQuery,
  ProfileSearchPageQueryVariables,
} from '__generated__/ProfileSearchPageQuery'
import profileSearchPageQuery from './queries/profileSearchPageQuery'
import ProfileSearchMetadata from './components/ProfileSearchMetadata'
import { AdvancedSearchResultsGrid } from 'v2/components/AdvancedSearch/components/AdvancedSearchResultsGrid'
import AdvancedSearchInput from 'v2/components/AdvancedSearch/components/AdvancedSearchInput'

export const ProfileSearchPage: React.FC = () => {
  const { id } = useParams()

  const { data, error, loading } = useQuery<
    ProfileSearchPageQuery,
    ProfileSearchPageQueryVariables
  >(profileSearchPageQuery, {
    variables: { id },
  })

  if (loading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorAlert isReloadable>{error.message}</ErrorAlert>
  }

  const {
    identity: { identifiable },
  } = data

  return (
    <TopBarLayout>
      <AdvancedSearchContextProvider
        variables={{
          where: { facets: [WhereEnum.USER], id: [identifiable.id] },
        }}
      >
        <Constrain>
          <ProfileSearchMetadata identifiable={identifiable} />
          <AdvancedSearchInput />

          <AdvancedSearchResultsGrid />
        </Constrain>
      </AdvancedSearchContextProvider>
    </TopBarLayout>
  )
}
