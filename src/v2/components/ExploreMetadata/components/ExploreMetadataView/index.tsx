import React, { Component } from 'react'

import Pocket from 'v2/components/UI/Pocket'
import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'
import { ExploreMetadataProps } from 'v2/components/ExploreMetadata'

export default class ExploreMetadataView extends Component<
  ExploreMetadataProps
> {
  isViewActive = view => () => this.props.view === view

  render() {
    const { sort } = this.props

    return (
      <Pocket title="View">
        <CookieLinkUnlessCurrent
          to={`/explore/all?sort=${sort}`}
          isActive={this.isViewActive('all')}
          prefix="Explore"
          name="view"
          value="all"
        >
          All
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          to={`/explore/channels?sort=${sort}`}
          isActive={this.isViewActive('channels')}
          prefix="Explore"
          name="view"
          value="channels"
        >
          Channels
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          to={`/explore/blocks?sort=${sort}`}
          isActive={this.isViewActive('blocks')}
          prefix="Explore"
          name="view"
          value="blocks"
        >
          Blocks
        </CookieLinkUnlessCurrent>
      </Pocket>
    )
  }
}
