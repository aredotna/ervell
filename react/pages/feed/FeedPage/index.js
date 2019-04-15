import React, { Component } from 'react';

import TopBarLayout from 'react/components/UI/Layouts/TopBarLayout';
import Constrain from 'react/components/UI/Constrain';

import ErrorBoundary from 'react/components/UI/ErrorBoundary';
import Head from 'react/components/UI/Head';

import FeedMetadata from 'react/components/FeedMetadata';
import NoFollowingMessage from 'react/components/Feed/components/NoFollowingMessage';
import Feed from 'react/components/Feed';

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
    );
  }
}
