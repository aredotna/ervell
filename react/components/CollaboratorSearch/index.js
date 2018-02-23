import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'underscore';

import CollaboratorSearchField from './components/CollaboratorSearchField';
import CollaboratorSearchResults from './components/CollaboratorSearchResults';

export default class CollaboratorSearch extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onInvite: PropTypes.func.isRequired,
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

  add = ({ member_id, member_type, channel_id }) => {
    this.resetQuery();

    return this.props.onAdd({
      member_id,
      member_type,
      channel_id,
    });
  }

  invite = ({ email, channel_id }) => {
    this.resetQuery();

    return this.props.onInvite({
      email,
      channel_id,
    });
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
            onAdd={this.add}
            onInvite={this.invite}
          />
        }
      </div>
    );
  }
}
