import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import CenteringBox from 'react/components/UI/CenteringBox';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import BlocksLoadingIndicator from 'react/components/UI/BlocksLoadingIndicator';
import ProfileMetadata from 'react/components/ProfileMetadata';
import ErrorBoundary from 'react/components/UI/ErrorBoundary';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import ProfileViews from 'react/pages/profile/ProfilePage/components/ProfileViews';

import profilePageQuery from 'react/pages/profile/ProfilePage/queries/profilePage';

export default class ProfilePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    view: PropTypes.oneOf(['all', 'channels', 'blocks', 'index', 'followers', 'following']).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
    filter: PropTypes.oneOf(['OWN', 'COLLABORATION']).isRequired,
  }

  render() {
    const {
      id, view, sort, filter,
    } = this.props;

    const isClientSide = typeof window !== 'undefined';

    return (
      <ErrorBoundary>
        <Query query={profilePageQuery} variables={{ id }}>
          {({ loading, data, error }) => {
            if (error) {
              return (
                <ErrorAlert>
                  {error.message}
                </ErrorAlert>
              );
            }

            if (loading) {
              return (
                <CenteringBox>
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

            return (
              <div>
                <ProfileMetadata
                  view={typedView}
                  sort={sort}
                  filter={filter}
                  identifiable={identifiable}
                />

                {isClientSide
                  ? (
                    <ProfileViews
                      view={typedView}
                      id={id}
                      sort={sort}
                      filter={filter}
                      identifiable={identifiable}
                    />
                  ) : <BlocksLoadingIndicator />
                }
              </div>
            );
          }}
        </Query>
      </ErrorBoundary>
    );
  }
}
