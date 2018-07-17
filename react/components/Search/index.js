import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchMetadata from 'react/components/SearchMetadata';

const Search = props => {
  const { mode, search } = props;

  return (
    <SearchMetadata search={search}/>
  );
};


Search.propTypes = {
  search: PropTypes.string
};

Search.defaultProps = {
  search: null
};

export default Search;
