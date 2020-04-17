import React, { Component } from 'react'

import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'

import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import Head from 'v2/components/UI/Head'

import { FeedMetadata } from 'v2/components/FeedMetadata'
import NoFollowingMessage from 'v2/components/Feed/components/NoFollowingMessage'
import Feed from 'v2/components/Feed'

export default class FeedPage extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Head>
          <title>Are.na</title>
        </Head>

        <TopBarLayout>
          <Constrain>
            <FeedMetadata />
            <NoFollowingMessage />
            <Feed />
          </Constrain>
        </TopBarLayout>
      </ErrorBoundary>
    )
  }
}
