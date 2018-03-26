import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'underscore';

import CollaboratorSearchField from './components/CollaboratorSearchField';
import CollaboratorSearchResults from './components/CollaboratorSearchResults';

export default class CollaboratorSearch extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onInvite: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    types: ['USER', 'GROUP'],
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

  add = ({ member_id, member_type }) => this.props.onAdd({
    member_id,
    member_type,
  })
    .then(() => this.resetQuery())

  invite = ({ email }) => this.props.onInvite({ email })
    .then(() => this.resetQuery())

  render() {
    const { types } = this.props;
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
            types={types}
            onAdd={this.add}
            onInvite={this.invite}
          />
        }
      </div>
    );
  }
}
