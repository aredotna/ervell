import React, { Component } from 'react';
import { debounce } from 'underscore';
import styled from 'styled-components';

import QuickSearchField from './components/QuickSearchField';
import QuickSearchResults from './components/QuickSearchResults';

const Container = styled.div`
  flex: 1;
`;

export default class QuickSearch extends Component {
  state = {
    query: '',
    debouncedQuery: '',
  }

  updateQuery = (query) => {
    this.setState({ query });
    this.debouceQuery(query);
  }

  debouceQuery = debounce((debouncedQuery) => {
    this.setState({ debouncedQuery });
  }, 250)

  resetQuery = () => {
    this.setState({ query: '' });
  }

  render() {
    const { query, debouncedQuery } = this.state;

    return (
      <Container>
        <QuickSearchField
          query={query}
          onChange={this.updateQuery}
        />
        {query !== '' &&
          <QuickSearchResults
            query={debouncedQuery}
          />
        }
      </Container>
    );
  }
}
