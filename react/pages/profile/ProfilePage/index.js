import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import ProfileMetadata from 'react/components/ProfileMetadata';

import profilePageQuery from 'react/pages/profile/ProfilePage/queries/profilePage';

export default class ProfilePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  render() {
    const { id } = this.props;

    return (
      <Query query={profilePageQuery} variables={{ id }}>
        {({ loading, data, error }) => {
          if (loading) return 'Loading...';
          if (error) return error.message;

          const { identity: { identifiable } } = data;

          return (
            <div>
              <ProfileMetadata identifiable={identifiable} mode="all" sort="updated_at" />
            </div>
          );
        }}
      </Query>
    );
  }
}
