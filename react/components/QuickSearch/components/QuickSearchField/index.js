import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchInput from 'react/components/UI/SearchInput';

export default class QuickSearchField extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
  }

  render() {
    const { query, onChange } = this.props;

    return (
      <SearchInput
        query={query}
        onQueryChange={onChange}
        placeholder="Search Are.na"
        borderColor="transparent"
        iconStates={{
          resting: 'ArenaMark',
          hover: 'MagnifyingGlass',
          focus: 'X',
          active: 'X',
        }}
      />
    );
  }
}
