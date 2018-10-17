import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import profileMetadataViewFragment from 'react/components/ProfileMetadata/components/ProfileMetadataView/fragments/profileMetadataView';

import Pocket from 'react/components/UI/Pocket';
import ProfileLinkUnlessCurrent from 'react/components/ProfileMetadata/components/ProfileLinkUnlessCurrent';

export default class ProfileMetadataView extends Component {
  static propTypes = {
    identifiable: propType(profileMetadataViewFragment).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  }

  isCurrent = () =>
    false

  render() {
    const { identifiable: { __typename, href }, sort } = this.props;

    return (
      <Pocket title="View">
        {__typename === 'User' &&
          <ProfileLinkUnlessCurrent
            name="filter"
            value="all"
            to={`${href}?sort=${sort}`}
            isActive={this.isCurrent}
          >
            All
          </ProfileLinkUnlessCurrent>
        }

        <ProfileLinkUnlessCurrent
          name="filter"
          value="channels"
          to={`${href}/channels?sort=${sort}`}
          isActive={this.isCurrent}
        >
          Channels
        </ProfileLinkUnlessCurrent>

        {__typename === 'User' &&
          <ProfileLinkUnlessCurrent
            name="filter"
            value="blocks"
            to={`${href}/blocks?sort=${sort}`}
            isActive={this.isCurrent}
          >
            Blocks
          </ProfileLinkUnlessCurrent>
        }

        <ProfileLinkUnlessCurrent
          name="filter"
          value="index"
          to={`${href}/index`}
          isActive={this.isCurrent}
        >
          Index
        </ProfileLinkUnlessCurrent>
      </Pocket>
    );
  }
}
