import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { parse } from 'qs'

import { AdvancedSearchContextProvider } from 'v2/components/AdvancedSearch/AdvancedSearchContext'

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
import { set } from 'lodash'

export const ProfileSearchPage: React.FC = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const variables = parse(searchParams.toString())
  const where = variables.where as any
  const page = variables.page as any
  const per = variables.per as any

  set(variables, 'where.id', parseInt(where.id))
  set(variables, 'page', parseInt(page))
  set(variables, 'per', parseInt(per))

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
      <AdvancedSearchContextProvider variables={variables}>
        <Constrain>
          <ProfileSearchMetadata identifiable={identifiable} />
          <AdvancedSearchResultsGrid />
        </Constrain>
      </AdvancedSearchContextProvider>
    </TopBarLayout>
  )
}
