import React, { Component } from 'react';
import { debounce } from 'underscore';

import QuickSearchField from './components/QuickSearchField';
import QuickSearchResults from './components/QuickSearchResults';

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
      <div>
        <QuickSearchField
          query={query}
          onChange={this.updateQuery}
        />
        {query !== '' &&
          <QuickSearchResults
            query={debouncedQuery}
          />
        }
      </div>
    );
  }
}
