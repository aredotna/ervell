import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import ProfileMetadata from 'react/components/ProfileMetadata';
import ProfileContents from 'react/components/ProfileContents';
import ProfileChannels from 'react/components/ProfileChannels';

import profilePageQuery from 'react/pages/profile/ProfilePage/queries/profilePage';

export default class ProfilePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    view: PropTypes.oneOf(['all', 'channels', 'blocks', 'index']).isRequired,
  }

  render() {
    const { id, view } = this.props;

    return (
      <Query query={profilePageQuery} variables={{ id }}>
        {({ loading, data, error }) => {
          if (loading) return <div />;
          if (error) return error.message;

          const { identity: { identifiable } } = data;

          return (
            <div>
              <ProfileMetadata identifiable={identifiable} mode={view} sort="updated_at" />

              {{
                all: <ProfileContents id={id} />,
                blocks: <ProfileContents id={id} type="BLOCK" />,
                channels: <ProfileChannels id={id} />,
                index: <div>Index</div>,
              }[view]}
            </div>
          );
        }}
      </Query>
    );
  }
}
