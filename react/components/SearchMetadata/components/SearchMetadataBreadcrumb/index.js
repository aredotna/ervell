import React from 'react';
import PropTypes from 'prop-types';
import StickyBreadcrumbPath from 'react/components/UI/StickyBreadcrumbPath';

const SearchMetadataBreadcrumb = ({ term }) => (
  <StickyBreadcrumbPath>
    <StickyBreadcrumbPath.Crumb>
      <div>{`Search results for '${term}'`}</div>
    </StickyBreadcrumbPath.Crumb>
  </StickyBreadcrumbPath>
);

SearchMetadataBreadcrumb.propTypes = {
  term: PropTypes.string,
};

SearchMetadataBreadcrumb.defaultProps = {
  term: '',
};

export default SearchMetadataBreadcrumb;
