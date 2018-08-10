import React from 'react';
import PropTypes from 'prop-types';

import SearchMetadata from 'react/components/SearchMetadata';

const Search = ({ search }) => (
  <SearchMetadata search={search} />
);

Search.propTypes = {
  search: PropTypes.string,
};

Search.defaultProps = {
  search: null,
};

export default Search;
