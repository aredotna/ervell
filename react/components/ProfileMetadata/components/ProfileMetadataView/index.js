import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import profileMetadataViewFragment from 'react/components/ProfileMetadata/components/ProfileMetadataView/fragments/profileMetadataView';

import Pocket from 'react/components/UI/Pocket';
import CookieLinkUnlessCurrent from 'react/components/UI/CookieLinkUnlessCurrent';

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
        <CookieLinkUnlessCurrent
          name="view"
          value="channels"
          prefix="Profile"
          to={`${href}/channels?sort=${sort}`}
          isActive={this.isViewActive('channels')}
        >
          Channels
        </CookieLinkUnlessCurrent>

        {__typename === 'User' &&
          <CookieLinkUnlessCurrent
            name="view"
            prefix="Profile"
            value="blocks"
            to={`${href}/blocks?sort=${sort}`}
            isActive={this.isViewActive('blocks')}
          >
            Blocks
          </CookieLinkUnlessCurrent>
        }

        <CookieLinkUnlessCurrent
          name="view"
          value="index"
          prefix="Profile"
          to={`${href}/index`}
          isActive={this.isViewActive('index')}
        >
          Index
        </CookieLinkUnlessCurrent>

        {__typename === 'User' &&
          <CookieLinkUnlessCurrent
            name="view"
            value="all"
            prefix="Profile"
            to={`${href}/all?sort=${sort}`}
            isActive={this.isViewActive('all')}
          >
            All
          </CookieLinkUnlessCurrent>
        }
      </Pocket>
    );
  }
}
