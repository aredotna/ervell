import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import Title from 'v2/components/UI/Head/components/Title'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'
import CenteringBox from 'v2/components/UI/CenteringBox'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import ProfileMetadata from 'v2/components/ProfileMetadata'
import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import BottomBanner from 'v2/components/BottomBanner'

import ProfileViews from 'v2/pages/profile/ProfilePage/components/ProfileViews'
import ProfileMetaTags from 'v2/pages/profile/ProfilePage/components/ProfileMetaTags'
import profilePageQuery from 'v2/pages/profile/ProfilePage/queries/profilePage'

export default class ProfilePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    view: PropTypes.oneOf([
      'all',
      'channels',
      'blocks',
      'index',
      'followers',
      'following',
    ]).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
    filter: PropTypes.oneOf(['OWN', 'COLLABORATION']).isRequired,
  }

  render() {
    const { id, view, sort, filter } = this.props

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
                <CenteringBox>
                  <Title>Loading...</Title>

                  <LoadingIndicator f={9} />
                </CenteringBox>
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
                  />

                  <ProfileViews
                    view={typedView}
                    id={id}
                    sort={sort}
                    filter={filter}
                    identifiable={identifiable}
                  />

                  <BottomBanner
                    banner="LOGGED_OUT_PROFILE"
                    name={identifiable.name}
                  />
                </Constrain>
              </TopBarLayout>
            )
          }}
        </Query>
      </ErrorBoundary>
    )
  }
}
