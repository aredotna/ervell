import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { propType } from 'graphql-anywhere';

import profileMetadataFilterFragment from 'react/components/ProfileMetadata/components/ProfileMetadataFilter/fragments/profileMetadataFilter';

import Pocket from 'react/components/UI/Pocket';
import ProfileLinkUnlessCurrent from 'react/components/ProfileMetadata/components/ProfileLinkUnlessCurrent';

class ProfileMetadataFilter extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    identifiable: propType(profileMetadataFilterFragment).isRequired,
  }

  render() {
    const { identifiable, location: { pathname } } = this.props;

    return (
      <Pocket title="Owned by">
        <ProfileLinkUnlessCurrent
          name="filter"
          value="OWN"
          to={{
            pathname,
            search: '?filter=OWN',
          }}
        >
          {identifiable.name}
        </ProfileLinkUnlessCurrent>

        <ProfileLinkUnlessCurrent
          name="filter"
          value="COLLABORATION"
          to={{
            pathname,
            search: '?filter=COLLABORATION',
          }}
        >
          Other
        </ProfileLinkUnlessCurrent>
      </Pocket>
    );
  }
}

export default withRouter(ProfileMetadataFilter);
