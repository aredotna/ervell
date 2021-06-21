import React from 'react'
import { useQuery } from '@apollo/client'

import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'
import ProfileMetadata from 'v2/components/ProfileMetadata'
import ErrorAlert from 'v2/components/UI/ErrorAlert'

import { MobileOrChildren } from 'v2/components/MobileBanner'
import BottomBanner from 'v2/components/BottomBanner'
import { LoadingPage } from 'v2/components/LoadingPage'

import ProfileViews from 'v2/pages/profile/ProfilePage/components/ProfileViews'
import ProfileMetaTags from 'v2/pages/profile/ProfilePage/components/ProfileMetaTags'
import profilePageQuery from 'v2/pages/profile/ProfilePage/queries/profilePage'
import profileUiStateQuery from 'v2/pages/profile/ProfilePage/queries/profileUiState'
import {
  ProfilePage as ProfilePageType,
  ProfilePageVariables,
} from '__generated__/ProfilePage'

interface ProfilePageProps {
  id: string
  view: 'all' | 'channels' | 'blocks' | 'followers' | 'following' | 'feed'
  sort: 'UPDATED_AT' | 'RANDOM' | 'CREATED_AT'
  filter: 'OWN' | 'COLLABORATION'
  type: 'BLOCK' | 'IMAGE' | 'TEXT' | 'EMBED' | 'LINK'
  followType: 'ALL' | 'CHANNEL' | 'GROUP' | 'USER'
}

const isClientSide = typeof window !== 'undefined'

const ProfilePage: React.FC<ProfilePageProps> = ({
  id,
  view,
  sort,
  filter,
  type,
  followType,
}) => {
  const { data, loading, error } = useQuery<
    ProfilePageType,
    ProfilePageVariables
  >(profilePageQuery, { variables: { id } })

  if (error && !isClientSide) {
    throw error
  }

  if (error) {
    return (
      <TopBarLayout>
        <Constrain>
          <ErrorAlert isReloadable>{error.message}</ErrorAlert>
        </Constrain>
      </TopBarLayout>
    )
  }

  if (!data && loading) {
    return (
      <TopBarLayout>
        <Constrain>
          <LoadingPage />
        </Constrain>
      </TopBarLayout>
    )
  }

  if (!data) return null

  const {
    identity: { identifiable },
  } = data

  // Falls back to a supported view when the current
  // one isn't supported for Groups (all, blocks).
  const typedView =
    identifiable.__typename === 'Group'
      ? { all: 'channels', blocks: 'channels' }[view] || view
      : view

  const scheme = identifiable.__typename === 'Group' ? 'GROUP' : 'DEFAULT'

  return (
    <TopBarLayout scheme={scheme}>
      <ProfileMetaTags view={typedView} identifiable={identifiable} />

      <Constrain>
        <ProfileMetadata
          view={typedView}
          sort={sort}
          filter={filter}
          identifiable={identifiable}
          followType={followType}
          type={type}
        />

        <ProfileViews
          view={typedView}
          id={id}
          sort={sort}
          filter={filter}
          identifiable={identifiable}
          followType={followType}
          type={type}
        />

        <MobileOrChildren
          route={
            identifiable.__typename === 'Group' ? 'groupProfile' : 'profile'
          }
          id={identifiable.id}
        >
          <BottomBanner banner="LOGGED_OUT_PROFILE" name={identifiable.name} />
        </MobileOrChildren>
      </Constrain>
    </TopBarLayout>
  )
}

const VALID_SORTS = ['UPDATED_AT', 'RANDOM', 'CREATED_AT']
const VALID_INDEX_FILTERS = ['OWN', 'COLLABORATION']
const VALID_BLOCK_FILTERS = [
  'BLOCK',
  'IMAGE',
  'TEXT',
  'EMBED',
  'ATTACHMENT',
  'LINK',
]
const VALID_FOLLOW_TYPES = ['CHANNEL', 'USER', 'GROUP']

const setValid = (value, validValues, defaultValue) => {
  if (validValues.includes(value)) return value
  return defaultValue
}

// Weird container extracted from router
export default ({ params, query }) => {
  const { data } = useQuery(profileUiStateQuery, {
    fetchPolicy: isClientSide ? 'cache-only' : 'network-only',
  })

  const cookies = (data && data.cookies) || {
    view: 'channels',
    sort: 'UPDATED_AT',
  }

  const view = params.view || cookies.view || 'channels'
  const sort = setValid(query.sort || cookies.sort, VALID_SORTS, 'UPDATED_AT')
  const indexFilter = setValid(
    query.filter || cookies.filter,
    VALID_INDEX_FILTERS,
    'OWN'
  )

  const blockFilter = setValid(
    query.type || cookies.type,
    VALID_BLOCK_FILTERS,
    'BLOCK'
  )

  const followType = setValid(query.followType, VALID_FOLLOW_TYPES, 'ALL')

  return (
    <ProfilePage
      id={params.id}
      view={view}
      sort={sort}
      filter={indexFilter}
      type={blockFilter}
      followType={followType}
    />
  )
}
