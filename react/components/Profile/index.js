import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import { SORTS, MODES } from 'react/components/Profile/config';

import profileQuery from 'react/components/Profile/queries/profile';
import profileMetadataFragment from 'react/components/ProfileMetadata/fragments/profileMetadata';

import ProfileMetadata from 'react/components/ProfileMetadata';

class Profile extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      user: propType(profileMetadataFragment),
    }).isRequired,
    mode: PropTypes.oneOf(MODES).isRequired,
    sort: PropTypes.oneOf(SORTS).isRequired,
  }

  render() {
    const { data: { loading } } = this.props;

    if (loading) return <div />;

    const { data: { user }, sort, mode } = this.props;

    return (
      <div>
        <ProfileMetadata user={user} mode={mode} sort={sort} />
      </div>
    );
  }
}

export default graphql(profileQuery)(Profile);
