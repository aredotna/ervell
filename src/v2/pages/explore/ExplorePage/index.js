import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'

import ExploreViews from 'v2/pages/explore/ExplorePage/components/ExploreViews'

import ExploreMetadata from 'v2/components/ExploreMetadata'
import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import BottomBanner from 'v2/components/BottomBanner'
import { MobileOrChildren } from 'v2/components/MobileBanner'
import Title from 'v2/components/UI/Head/components/Title'

export default class ExplorePage extends Component {
  static propTypes = {
    view: PropTypes.oneOf(['all', 'channels', 'blocks']).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
    block_filter: PropTypes.oneOf([
      'IMAGE',
      'EMBED',
      'TEXT',
      'ATTACHMENT',
      'LINK',
    ]),
  }

  render() {
    const { view, sort, block_filter } = this.props

    return (
      <ErrorBoundary>
        <Title>Explore</Title>

        <TopBarLayout>
          <Constrain>
            <ExploreMetadata
              view={view}
              sort={sort}
              block_filter={block_filter}
            />

            <ExploreViews view={view} sort={sort} block_filter={block_filter} />
            <MobileOrChildren route="explore">
              <BottomBanner banner="LOGGED_OUT_EXPLORE" />
            </MobileOrChildren>
          </Constrain>
        </TopBarLayout>
      </ErrorBoundary>
    )
  }
}
