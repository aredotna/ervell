import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TopBarLayout from 'react/components/UI/Layouts/TopBarLayout';
import Constrain from 'react/components/UI/Constrain';

import SearchMetadata from 'react/components/SearchMetadata';
import SearchViews from 'react/pages/search/SearchPage/components/SearchViews';
import Title from 'react/components/UI/Head/components/Title';
import Head from 'react/components/UI/Head';

import ErrorBoundary from 'react/components/UI/ErrorBoundary';

export default class SearchPage extends Component {
  static propTypes = {
    view: PropTypes.oneOf(['all', 'channels', 'blocks', 'groups', 'users']).isRequired,
    term: PropTypes.string.isRequired,
    block_filter: PropTypes.oneOf(['IMAGE', 'EMBED', 'TEXT', 'ATTACHMENT', 'LINK']),
  }

  static defaultProps = {
    block_filter: null,
  }

  render() {
    const {
      view, term, block_filter,
    } = this.props;

    return (
      <ErrorBoundary>
        <Title>Search</Title>

        <TopBarLayout>
          <Head>
            <meta name="robots" content="none" />
          </Head>

          <Constrain>
            <SearchMetadata
              term={term}
              view={view}
              block_filter={block_filter}
            />

            <SearchViews
              term={term}
              view={view}
              block_filter={block_filter}
            />
          </Constrain>
        </TopBarLayout>
      </ErrorBoundary>
    );
  }
}
