import React, { PureComponent } from 'react';
import { debounce } from 'underscore';
import styled from 'styled-components';

import QuickSearchField from 'react/components/QuickSearch/components/QuickSearchField';
import QuickSearchResults from 'react/components/QuickSearch/components/QuickSearchResults';
import Overlay from 'react/components/UI/Overlay';

const Container = styled.div`
  flex: 1;
`;

export default class QuickSearch extends PureComponent {
  state = {
    query: '',
    debouncedQuery: '',
    mode: 'resting',
  }

  updateQuery = (query) => {
    this.setState({ query, mode: 'active' });
    this.debouceQuery(query);
  }

  focus = (e) => {
    e.preventDefault();
    this.setState({ mode: 'active' });
  }

  blur = (e) => {
    e.preventDefault();
    this.setState({ mode: 'resting' });
  }

  debouceQuery = debounce((debouncedQuery) => {
    this.setState({ debouncedQuery });
  }, 250)

  resetQuery = () => {
    this.setState({ query: '' });
  }

  render() {
    const { query, debouncedQuery, mode } = this.state;

    return (
      <Container>
        <QuickSearchField
          query={query}
          onChange={this.updateQuery}
          onFocus={this.focus}
          innerRef={(el) => { console.log('eld', el); this.searchInput = el; }}
        />
        {query !== '' && mode === 'active' &&
          <Overlay targetEl={() => this.searchInput} fullWidth onClose={this.blur}>
            <QuickSearchResults
              query={debouncedQuery}
            />
          </Overlay>
        }
      </Container>
    );
  }
}
