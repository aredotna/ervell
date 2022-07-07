import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router'

import { LoadingPage } from 'v2/components/LoadingPage'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'

import {
  ProfileSearchPageQuery,
  ProfileSearchPageQueryVariables,
} from '__generated__/ProfileSearchPageQuery'
import profileSearchPageQuery from './queries/profileSearchPageQuery'
import ProfileSearchMetadata from './components/ProfileSearchMetadata'
import { AdvancedSearchResultsGrid } from 'v2/components/AdvancedSearch/components/AdvancedSearchResultsGrid'

export const ProfileSearchPage: React.FC = () => {
  const { id } = useParams()

  const { data, error, loading } = useQuery<
    ProfileSearchPageQuery,
    ProfileSearchPageQueryVariables
  >(profileSearchPageQuery, {
    variables: { id },
  })

  if (loading) {
    return (
      <TopBarLayout>
        <Constrain>
          <LoadingPage />
        </Constrain>
      </TopBarLayout>
    )
  }

  if (error) {
    return <ErrorAlert isReloadable>{error.message}</ErrorAlert>
  }

  const {
    identity: { identifiable },
  } = data

  return (
    <TopBarLayout>
      <Constrain>
        <ProfileSearchMetadata identifiable={identifiable} />
        <AdvancedSearchResultsGrid />
      </Constrain>
    </TopBarLayout>
  )
}
