import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SearchInput from 'react/components/UI/SearchInput';

class Search extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { onChange } = this.props;

    return (
      <SearchInput
        onQueryChange={onChange}
        placeholder="Filter channels"
      />
    );
  }
}

export default Search;
