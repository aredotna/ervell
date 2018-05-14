import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import profileMetadataViewFragment from 'react/components/ProfileMetadata/components/ProfileMetadataView/fragments/profileMetadataView';

import Pocket from 'react/components/UI/Pocket';
import ProfileLinkUnlessCurrent from 'react/components/ProfileMetadata/components/ProfileLinkUnlessCurrent';

export default class ProfileMetadataView extends Component {
  static propTypes = {
    user: propType(profileMetadataViewFragment).isRequired,
  }

  isCurrent = ({ targetHref, currentRoute }) =>
    currentRoute.pathname === targetHref.split('?')[0];

  render() {
    const { user: { href } } = this.props;

    return (
      <Pocket title="View">
        <ProfileLinkUnlessCurrent
          href={href}
          predicate={this.isCurrent}
        >
          All
        </ProfileLinkUnlessCurrent>

        <ProfileLinkUnlessCurrent
          href={`${href}/channels?sort=updated_at`}
          predicate={this.isCurrent}
        >
          Channels
        </ProfileLinkUnlessCurrent>

        <ProfileLinkUnlessCurrent
          href={`${href}/blocks?sort=updated_at`}
          predicate={this.isCurrent}
        >
          Blocks
        </ProfileLinkUnlessCurrent>

        <ProfileLinkUnlessCurrent
          href={`${href}/index`}
          predicate={this.isCurrent}
        >
          Index
        </ProfileLinkUnlessCurrent>
      </Pocket>
    );
  }
}
