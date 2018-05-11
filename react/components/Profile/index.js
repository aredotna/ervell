import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import profileQuery from 'react/components/Profile/queries/profile';
import profileMetadataFragment from 'react/components/ProfileMetadata/fragments/profileMetadata';

import ProfileMetadata from 'react/components/ProfileMetadata';

class Profile extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      user: propType(profileMetadataFragment),
    }).isRequired,
  }

  render() {
    const { data: { loading } } = this.props;

    if (loading) return <div />;

    const { data: { user } } = this.props;

    return (
      <div>
        <ProfileMetadata user={user} />
      </div>
    );
  }
}

export default graphql(profileQuery)(Profile);
