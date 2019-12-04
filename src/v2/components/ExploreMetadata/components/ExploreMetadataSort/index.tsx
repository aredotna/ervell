import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { stringify } from 'qs'

import Pocket from 'v2/components/UI/Pocket'
import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'
import { ExploreMetadataProps } from 'v2/components/ExploreMetadata'

class ExploreMetadataSort extends Component<
  ExploreMetadataProps & RouteComponentProps
> {
  isSortActive = sort => () => this.props.sort === sort

  render() {
    const {
      location: { pathname },
      block_filter,
    } = this.props

    return (
      <Pocket title="Sort">
        <CookieLinkUnlessCurrent
          name="sort"
          value="UPDATED_AT"
          isActive={this.isSortActive('UPDATED_AT')}
          prefix="Explore"
          to={{
            pathname,
            search: stringify({ block_filter, sort: 'UPDATED_AT' }),
          }}
        >
          Recently updated
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="sort"
          value="RANDOM"
          isActive={this.isSortActive('RANDOM')}
          prefix="Explore"
          to={{
            pathname,
            search: stringify({ block_filter, sort: 'RANDOM' }),
          }}
          rel="nofollow"
        >
          Random
        </CookieLinkUnlessCurrent>
      </Pocket>
    )
  }
}

export default withRouter(ExploreMetadataSort)
