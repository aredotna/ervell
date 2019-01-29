import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Pocket from 'react/components/UI/Pocket';
import CookieLinkUnlessCurrent from 'react/components/UI/CookieLinkUnlessCurrent';

class SearchMetadataFilter extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    block_filter: PropTypes.oneOf(['IMAGE', 'EMBED', 'TEXT', 'ATTACHMENT', 'LINK']),
  }

  static defaultProps = {
    block_filter: null,
  }

  isFilterActive = filter => () =>
    this.props.block_filter === filter;

  render() {
    const { location: { pathname } } = this.props;

    return (
      <Pocket title="Filter">
        <CookieLinkUnlessCurrent
          name="block_filter"
          value="ALL"
          prefix="Search"
          to={{
            pathname,
            search: '?block_filter=ALL',
          }}
          isActive={this.isFilterActive(null)}
        >
          All
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="block_filter"
          value="LINK"
          prefix="Search"
          to={{
            pathname,
            search: '?block_filter=LINK',
          }}
          isActive={this.isFilterActive('LINK')}
        >
          Link
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="block_filter"
          value="ATTACHMENT"
          prefix="Search"
          to={{
            pathname,
            search: '?block_filter=ATTACHMENT',
          }}
          isActive={this.isFilterActive('ATTACHMENT')}
        >
          Attachment
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="block_filter"
          value="IMAGE"
          prefix="Search"
          to={{
            pathname,
            search: '?block_filter=IMAGE',
          }}
          isActive={this.isFilterActive('IMAGE')}
        >
          Image
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="block_filter"
          value="TEXT"
          prefix="Search"
          to={{
            pathname,
            search: '?block_filter=TEXT',
          }}
          isActive={this.isFilterActive('TEXT')}
        >
          Text
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="block_filter"
          value="EMBED"
          prefix="Search"
          to={{
            pathname,
            search: '?block_filter=EMBED',
          }}
          isActive={this.isFilterActive('EMBED')}
        >
          Embed
        </CookieLinkUnlessCurrent>
      </Pocket>
    );
  }
}

export default withRouter(SearchMetadataFilter);
