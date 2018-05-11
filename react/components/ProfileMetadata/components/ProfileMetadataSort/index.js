import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import profileMetadataSortFragment from 'react/components/ProfileMetadata/components/ProfileMetadataSort/fragments/profileMetadataSort';

import Pocket from 'react/components/UI/Pocket';
import ProfileLinkUnlessCurrent from 'react/components/ProfileMetadata/components/ProfileLinkUnlessCurrent';

export default class ProfileMetadataSort extends Component {
  static propTypes = {
    user: propType(profileMetadataSortFragment).isRequired,
  }

  render() {
    const { user: { href } } = this.props;

    return (
      <Pocket title="Sort">
        <ProfileLinkUnlessCurrent href={href}>
          Recently updated
        </ProfileLinkUnlessCurrent>

        <ProfileLinkUnlessCurrent href={`${href}?sort=random`}>
          Random
        </ProfileLinkUnlessCurrent>
      </Pocket>
    );
  }
}
