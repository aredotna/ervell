import { useQuery } from '@apollo/client'
import React from 'react'
import { useParams } from 'react-router'

import { LoadingPage } from 'v2/components/LoadingPage'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'

import ProfileSearchMetadata from './components/ProfileSearchMetadata'
import { AdvancedSearchResultsGrid } from 'v2/components/AdvancedSearch/components/AdvancedSearchResultsGrid'
import ProfileMetaTags from 'v2/pages/profile/ProfilePage/components/ProfileMetaTags'

import profileSearchPageQuery from './queries/profileSearchPageQuery'
import { WhereEnum } from '__generated__/globalTypes'
import {
  ProfileSearchPageQuery,
  ProfileSearchPageQueryVariables,
} from '__generated__/ProfileSearchPageQuery'
import useSerializedMe from 'v2/hooks/useSerializedMe'

export const ProfileSearchPage: React.FC = () => {
  const { id } = useParams()
  const { id: myId } = useSerializedMe()

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

  const isMe = identifiable.id === parseInt(myId)
  const where = isMe
    ? WhereEnum.MY
    : identifiable.__typename == 'Group'
    ? WhereEnum.GROUP
    : WhereEnum.USER
  const parsedId = isMe ? null : id

  return (
    <TopBarLayout>
      <ProfileMetaTags identifiable={identifiable} />
      <Constrain>
        <ProfileSearchMetadata identifiable={identifiable} />
        <AdvancedSearchResultsGrid initialScope={{ where, id: parsedId }} />
      </Constrain>
    </TopBarLayout>
  )
}
