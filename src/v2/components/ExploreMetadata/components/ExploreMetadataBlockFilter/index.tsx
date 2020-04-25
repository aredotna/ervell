import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { stringify } from 'qs'

import Pocket from 'v2/components/UI/Pocket'
import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'

import { ExploreMetadataProps } from 'v2/components/ExploreMetadata'

class ExploreMetadataFilter extends Component<
  ExploreMetadataProps & RouteComponentProps
> {
  isFilterActive = filter => () => this.props.block_filter === filter

  render() {
    const {
      location: { pathname },
      sort,
    } = this.props

    return (
      <Pocket title="Filter">
        <CookieLinkUnlessCurrent
          name="block_filter"
          value="ALL"
          prefix="Explore"
          to={{
            pathname,
            search: stringify({ block_filter: 'All', sort }),
          }}
          isActive={this.isFilterActive(null)}
        >
          All
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="block_filter"
          value="LINK"
          prefix="Explore"
          to={{
            pathname,
            search: stringify({ block_filter: 'LINK', sort }),
          }}
          isActive={this.isFilterActive('LINK')}
        >
          Link
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="block_filter"
          value="ATTACHMENT"
          prefix="Explore"
          to={{
            pathname,
            search: stringify({ block_filter: 'ATTACHMENT', sort }),
          }}
          isActive={this.isFilterActive('ATTACHMENT')}
        >
          Attachment
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="block_filter"
          value="IMAGE"
          prefix="Explore"
          to={{
            pathname,
            search: stringify({ block_filter: 'IMAGE', sort }),
          }}
          isActive={this.isFilterActive('IMAGE')}
        >
          Image
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="block_filter"
          value="TEXT"
          prefix="Explore"
          to={{
            pathname,
            search: stringify({ block_filter: 'TEXT', sort }),
          }}
          isActive={this.isFilterActive('TEXT')}
        >
          Text
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="block_filter"
          value="EMBED"
          prefix="Explore"
          to={{
            pathname,
            search: stringify({ block_filter: 'EMBED', sort }),
          }}
          isActive={this.isFilterActive('EMBED')}
        >
          Embed
        </CookieLinkUnlessCurrent>
      </Pocket>
    )
  }
}

export default withRouter(ExploreMetadataFilter)
