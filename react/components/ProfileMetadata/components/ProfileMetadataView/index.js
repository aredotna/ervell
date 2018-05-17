import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import { SORTS } from 'react/components/Profile/config';

import profileMetadataViewFragment from 'react/components/ProfileMetadata/components/ProfileMetadataView/fragments/profileMetadataView';

import Pocket from 'react/components/UI/Pocket';
import ProfileLinkUnlessCurrent from 'react/components/ProfileMetadata/components/ProfileLinkUnlessCurrent';

export default class ProfileMetadataView extends Component {
  static propTypes = {
    user: propType(profileMetadataViewFragment).isRequired,
    sort: PropTypes.oneOf(SORTS).isRequired,
  }

  isCurrent = ({ targetHref, currentRoute }) =>
    currentRoute.pathname === targetHref.split('?')[0];

  render() {
    const { user: { href }, sort } = this.props;

    return (
      <Pocket title="View">
        <ProfileLinkUnlessCurrent
          name="filter"
          value="all"
          href={`${href}?sort=${sort}`}
          predicate={this.isCurrent}
        >
          All
        </ProfileLinkUnlessCurrent>

        <ProfileLinkUnlessCurrent
          name="filter"
          value="channels"
          href={`${href}/channels?sort=${sort}`}
          predicate={this.isCurrent}
        >
          Channels
        </ProfileLinkUnlessCurrent>

        <ProfileLinkUnlessCurrent
          name="filter"
          value="blocks"
          href={`${href}/blocks?sort=${sort}`}
          predicate={this.isCurrent}
        >
          Blocks
        </ProfileLinkUnlessCurrent>

        <ProfileLinkUnlessCurrent
          name="filter"
          value="index"
          href={`${href}/index`}
          predicate={this.isCurrent}
        >
          Index
        </ProfileLinkUnlessCurrent>
      </Pocket>
    );
  }
}
