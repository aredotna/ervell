import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StickyBreadcrumbPath from 'react/components/UI/StickyBreadcrumbPath';

const SearchMetadataBreadcrumb = (props) => {
  const { search } = props;

  return (
    <StickyBreadcrumbPath>
      <StickyBreadcrumbPath.Crumb>
        <div>{`Search results for '${search}'`}</div>
      </StickyBreadcrumbPath.Crumb>
    </StickyBreadcrumbPath>
  );
};

SearchMetadataBreadcrumb.propTypes = {
  search: PropTypes.string,
};

SearchMetadataBreadcrumb.defaultProps = {
  search: '',
};


export default SearchMetadataBreadcrumb;
