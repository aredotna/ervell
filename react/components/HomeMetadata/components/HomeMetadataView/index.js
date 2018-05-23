import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SORTS } from 'react/components/Profile/config';

import Pocket from 'react/components/UI/Pocket';
import HomeMetadataLinkUnlessCurrent from 'react/components/HomeMetadata/components/HomeMetadataLinkUnlessCurrent';

export default class HomeMetadataView extends Component {
  static propTypes = {
    sort: PropTypes.oneOf(SORTS).isRequired,
  }

  isCurrent = ({ targetHref, currentRoute }) =>
    currentRoute.pathname === targetHref.split('?')[0];

  render() {
    const { sort } = this.props;

    return (
      <Pocket title="View">
        <HomeMetadataLinkUnlessCurrent
          href={`/explore?sort=${sort}`}
          predicate={this.isCurrent}
        >
          All
        </HomeMetadataLinkUnlessCurrent>

        <HomeMetadataLinkUnlessCurrent
          href={`/explore/channels?sort=${sort}`}
          predicate={this.isCurrent}
        >
          Channels
        </HomeMetadataLinkUnlessCurrent>

        <HomeMetadataLinkUnlessCurrent
          href={`/explore/blocks?sort=${sort}`}
          predicate={this.isCurrent}
        >
          Blocks
        </HomeMetadataLinkUnlessCurrent>
      </Pocket>
    );
  }
}
