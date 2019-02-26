import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import Title from 'react/components/UI/Head/components/Title';
import TopBarLayout from 'react/components/UI/Layouts/TopBarLayout';
import Constrain from 'react/components/UI/Constrain';
import CenteringBox from 'react/components/UI/CenteringBox';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import ProfileMetadata from 'react/components/ProfileMetadata';
import ErrorBoundary from 'react/components/UI/ErrorBoundary';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import BottomBanner from 'react/components/BottomBanner';

import ProfileViews from 'react/pages/profile/ProfilePage/components/ProfileViews';
import ProfileMetaTags from 'react/pages/profile/ProfilePage/components/ProfileMetaTags';
import profilePageQuery from 'react/pages/profile/ProfilePage/queries/profilePage';

export default class ProfilePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    view: PropTypes.oneOf(['all', 'channels', 'blocks', 'index', 'followers', 'following']).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
    filter: PropTypes.oneOf(['OWN', 'COLLABORATION']).isRequired,
    seed: PropTypes.number.isRequired,
  }

  render() {
    const {
      id, view, sort, filter, seed,
    } = this.props;

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
              );
            }

            if (loading) {
              return (
                <CenteringBox>
                  <Title>Loading...</Title>

                  <LoadingIndicator f={9} />
                </CenteringBox>
              );
            }

            const { identity: { identifiable } } = data;

            // Falls back to a supported view when the current
            // one isn't supported for Groups (all, blocks).
            const typedView = identifiable.__typename === 'Group'
              ? { all: 'channels', blocks: 'channels' }[view] || view
              : view;

            const scheme = identifiable.__typename === 'Group' ? 'GROUP' : 'DEFAULT';

            return (
              <TopBarLayout scheme={scheme}>
                <ProfileMetaTags
                  view={typedView}
                  identifiable={identifiable}
                />

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
                    seed={seed}
                  />

                  <BottomBanner banner="LOGGED_OUT_PROFILE" name={identifiable.name} />
                </Constrain>
              </TopBarLayout>
            );
          }}
        </Query>
      </ErrorBoundary>
    );
  }
}
