import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'underscore';

import CollaboratorSearchField from './components/CollaboratorSearchField';
import CollaboratorSearchResults from './components/CollaboratorSearchResults';

export default class CollaboratorSearch extends Component {
  static propTypes = {
    channel_id: PropTypes.number.isRequired,
  }

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
    const { channel_id } = this.props;
    const { query, debouncedQuery } = this.state;

    return (
      <div>
        <CollaboratorSearchField
          onChange={this.updateQuery}
          query={query}
        />

        {query !== '' &&
          <CollaboratorSearchResults
            channel_id={channel_id}
            query={debouncedQuery}
            onAdd={this.resetQuery}
          />
        }
      </div>
    );
  }
}
