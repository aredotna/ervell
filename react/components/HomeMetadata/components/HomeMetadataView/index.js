import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Pocket from 'react/components/UI/Pocket';
import HeaderMetadataLinkUnlessCurrent from 'react/components/UI/HeaderMetadata/HeaderMetadataLinkUnlessCurrent';

export default class HomeMetadataView extends Component {
  static propTypes = {
    sort: PropTypes.oneOf(['updated_at', 'random']).isRequired,
  }

  isCurrent = ({ targetHref, currentRoute }) =>
    currentRoute.pathname === targetHref.split('?')[0];

  render() {
    const { sort } = this.props;

    return (
      <Pocket title="View">
        <HeaderMetadataLinkUnlessCurrent
          href={`/explore?sort=${sort}`}
          predicate={this.isCurrent}
        >
          All
        </HeaderMetadataLinkUnlessCurrent>

        <HeaderMetadataLinkUnlessCurrent
          href={`/explore/channels?sort=${sort}`}
          predicate={this.isCurrent}
        >
          Channels
        </HeaderMetadataLinkUnlessCurrent>

        <HeaderMetadataLinkUnlessCurrent
          href={`/explore/blocks?sort=${sort}`}
          predicate={this.isCurrent}
        >
          Blocks
        </HeaderMetadataLinkUnlessCurrent>
      </Pocket>
    );
  }
}
