import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'underscore';

import CollaboratorSearchField from './components/CollaboratorSearchField';
import CollaboratorSearchResults from './components/CollaboratorSearchResults';

export default class CollaboratorSearch extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onInvite: PropTypes.func.isRequired,
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

  add = ({ member_id, member_type }) => {
    this.resetQuery();

    return this.props.onAdd({
      member_id,
      member_type,
    });
  }

  invite = ({ email }) => {
    this.resetQuery();

    return this.props.onInvite({ email });
  }

  render() {
    const { query, debouncedQuery } = this.state;

    return (
      <div>
        <CollaboratorSearchField
          onChange={this.updateQuery}
          query={query}
        />

        {query !== '' &&
          <CollaboratorSearchResults
            query={debouncedQuery}
            onAdd={this.add}
            onInvite={this.invite}
          />
        }
      </div>
    );
  }
}
