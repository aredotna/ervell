import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchInput from 'react/components/UI/SearchInput';

export default class CollaboratorSearch extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
  }

  render() {
    const { query, onChange } = this.props;

    return (
      <SearchInput
        className="Input"
        query={query}
        onQueryChange={onChange}
        placeholder="search users or enter an email address"
      />
    );
  }
}
