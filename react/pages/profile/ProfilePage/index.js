import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import CenteringBox from 'react/components/UI/CenteringBox';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import ProfileMetadata from 'react/components/ProfileMetadata';
import ProfileContents from 'react/components/ProfileContents';
import ProfileChannels from 'react/components/ProfileChannels';
import ProfileChannelIndex from 'react/components/ProfileChannelIndex';
import ProfileFollows from 'react/components/ProfileFollows';
import EmptyMessageOrComponent from 'react/pages/profile/ProfilePage/components/EmptyMessageOrComponent';

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

    return (
      <Query query={profilePageQuery} variables={{ id }}>
        {({ loading, data, error }) => {
          if (loading) {
            return (
              <CenteringBox>
                <LoadingIndicator f={9} />
              </CenteringBox>
            );
          }

          if (error) return error.message;

          const { identity: { identifiable } } = data;

          // Falls back to a supported view when the current
          // one isn't supported for Groups (all, blocks).
          const typedView = identifiable.__typename === 'Group'
            ? { all: 'channels', blocks: 'channels' }[view] || view
            : view;

          return (
            <div>
              <ProfileMetadata
                identifiable={identifiable}
                mode={typedView}
                sort={sort}
                filter={filter}
              />

              {{
                all: () => (
                  <EmptyMessageOrComponent
                    identifiable={identifiable}
                    count={identifiable.counts.channels + identifiable.counts.blocks}
                  >
                    <ProfileContents id={id} sort={sort} />
                  </EmptyMessageOrComponent>
                ),
                blocks: () => (
                  <EmptyMessageOrComponent
                    identifiable={identifiable}
                    count={identifiable.counts.blocks}
                  >
                    <ProfileContents id={id} type="BLOCK" sort={sort} />
                  </EmptyMessageOrComponent>
                ),
                channels: () => (
                  <EmptyMessageOrComponent
                    identifiable={identifiable}
                    count={identifiable.counts.channels}
                  >
                    <ProfileChannels id={id} sort={sort} />
                  </EmptyMessageOrComponent>
                ),
                index: () => (
                  <EmptyMessageOrComponent
                    identifiable={identifiable}
                    count={identifiable.counts.channels}
                  >
                    <ProfileChannelIndex id={id} type={filter} />
                  </EmptyMessageOrComponent>
                ),
                followers: () => (
                  <ProfileFollows id={id} type="followers" />
                ),
                following: () => (
                  <ProfileFollows id={id} type="following" />
                ),
              }[typedView]()}
            </div>
          );
        }}
      </Query>
    );
  }
}
