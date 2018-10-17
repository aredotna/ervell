import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import ProfileMetadata from 'react/components/ProfileMetadata';
import ProfileContents from 'react/components/ProfileContents';
import ProfileChannels from 'react/components/ProfileChannels';
import ProfileChannelIndex from 'react/components/ProfileChannelIndex';

import profilePageQuery from 'react/pages/profile/ProfilePage/queries/profilePage';

export default class ProfilePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    view: PropTypes.oneOf(['all', 'channels', 'blocks', 'index']).isRequired,
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
          if (loading) return <div />;
          if (error) return error.message;

          const { identity: { identifiable } } = data;

          // TODO: Clean this up. This currently just falls back to a different view
          // when the current one isn't supported for Groups.
          const typedView = identifiable.__typename === 'Group'
            ? { all: 'channels', blocks: 'channels' }[view] || view
            : view;

          return (
            <div>
              <ProfileMetadata identifiable={identifiable} mode={typedView} sort={sort} />

              {{
                all: <ProfileContents id={id} sort={sort} />,
                blocks: <ProfileContents id={id} type="BLOCK" sort={sort} />,
                channels: <ProfileChannels id={id} sort={sort} />,
                index: <ProfileChannelIndex id={id} type={filter} />,
              }[typedView]}
            </div>
          );
        }}
      </Query>
    );
  }
}
