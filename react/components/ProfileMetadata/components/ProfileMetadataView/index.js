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
    view: PropTypes.oneOf(['all', 'channels', 'blocks', 'index', 'following', 'followers']).isRequired,
  }

  isViewActive = view => () =>
    this.props.view === view;

  render() {
    const { identifiable: { __typename, href }, sort } = this.props;

    return (
      <Pocket title="View">
        {__typename === 'User' &&
          <ProfileLinkUnlessCurrent
            name="view"
            value="all"
            to={`${href}/all?sort=${sort}`}
            isActive={this.isViewActive('all')}
          >
            All
          </ProfileLinkUnlessCurrent>
        }

        <ProfileLinkUnlessCurrent
          name="view"
          value="channels"
          to={`${href}/channels?sort=${sort}`}
          isActive={this.isViewActive('channels')}
        >
          Channels
        </ProfileLinkUnlessCurrent>

        {__typename === 'User' &&
          <ProfileLinkUnlessCurrent
            name="view"
            value="blocks"
            to={`${href}/blocks?sort=${sort}`}
            isActive={this.isViewActive('blocks')}
          >
            Blocks
          </ProfileLinkUnlessCurrent>
        }

        <ProfileLinkUnlessCurrent
          name="view"
          value="index"
          to={`${href}/index`}
          isActive={this.isViewActive('index')}
        >
          Index
        </ProfileLinkUnlessCurrent>
      </Pocket>
    );
  }
}
