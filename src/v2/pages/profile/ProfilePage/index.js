import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'

import Title from 'v2/components/UI/Head/components/Title'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'
import ProfileMetadata from 'v2/components/ProfileMetadata'
import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import ErrorAlert from 'v2/components/UI/ErrorAlert'

import { MobileOrChildren } from 'v2/components/MobileBanner'
import BottomBanner from 'v2/components/BottomBanner'
import { LoadingPage } from 'v2/components/LoadingPage'

import ProfileViews from 'v2/pages/profile/ProfilePage/components/ProfileViews'
import ProfileMetaTags from 'v2/pages/profile/ProfilePage/components/ProfileMetaTags'
import profilePageQuery from 'v2/pages/profile/ProfilePage/queries/profilePage'
import profileUiStateQuery from 'v2/pages/profile/ProfilePage/queries/profileUiState'

class ProfilePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    view: PropTypes.oneOf([
      'all',
      'channels',
      'blocks',
      'index',
      'followers',
      'following',
      'feed',
    ]).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM', 'CREATED_AT']).isRequired,
    filter: PropTypes.oneOf(['OWN', 'COLLABORATION']).isRequired,
    type: PropTypes.oneOf([
      'BLOCK',
      'IMAGE',
      'TEXT',
      'EMBED',
      'ATTACHMENT',
      'LINK',
    ]).isRequired,
    followType: PropTypes.oneOf(['ALL', 'CHANNEL', 'GROUP', 'USER']).isRequired,
  }

  render() {
    const { id, view, sort, filter, followType, type } = this.props

    return (
      <ErrorBoundary>
        <Query query={profilePageQuery} variables={{ id }}>
          {({ loading, data, error }) => {
            if (error) {
              return (
                <ErrorAlert>
                  <Title>Error</Title>

                  {error.message}
                </ErrorAlert>
              )
            }

            if (loading) {
              return (
                <TopBarLayout>
                  <Constrain>
                    <LoadingPage />
                  </Constrain>
                </TopBarLayout>
              )
            }

            const {
              identity: { identifiable },
            } = data

            // Falls back to a supported view when the current
            // one isn't supported for Groups (all, blocks).
            const typedView =
              identifiable.__typename === 'Group'
                ? { all: 'channels', blocks: 'channels' }[view] || view
                : view

            const scheme =
              identifiable.__typename === 'Group' ? 'GROUP' : 'DEFAULT'

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
                      identifiable.__typename === 'Group'
                        ? 'groupProfile'
                        : 'profile'
                    }
                    id={identifiable.id}
                  >
                    <BottomBanner
                      banner="LOGGED_OUT_PROFILE"
                      name={identifiable.name}
                    />
                  </MobileOrChildren>
                </Constrain>
              </TopBarLayout>
            )
          }}
        </Query>
      </ErrorBoundary>
    )
  }
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

const isClientSide = typeof window !== 'undefined'

// Weird container extracted from router
export default ({ params, query }) => {
  return (
    <Query
      query={profileUiStateQuery}
      fetchPolicy={isClientSide ? 'no-cache' : 'network-only'}
    >
      {props => {
        if (props.error) return props.error.message

        const cookies = (props.data && props.data.cookies) || {
          view: 'channels',
          sort: 'UPDATED_AT',
        }

        const view = params.view || cookies.view || 'channels'
        const sort = setValid(
          query.sort || cookies.sort,
          VALID_SORTS,
          'UPDATED_AT'
        )
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
      }}
    </Query>
  )
}
