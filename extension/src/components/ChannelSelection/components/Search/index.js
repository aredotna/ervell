import React, { PureComponent } from 'react';

import SearchInput from 'react/components/UI/SearchInput';

class Search extends PureComponent {
  render() {
    return (
      <SearchInput placeholder="Filter channels" />
    );
  }
}

export default Search;
