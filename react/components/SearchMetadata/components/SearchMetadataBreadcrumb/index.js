import React from 'react';
import PropTypes from 'prop-types';
import StickyBreadcrumbPath from 'react/components/UI/StickyBreadcrumbPath';

const SearchMetadataBreadcrumb = ({ search }) => (
  <StickyBreadcrumbPath>
    <StickyBreadcrumbPath.Crumb>
      <div>{`Search results for '${search}'`}</div>
    </StickyBreadcrumbPath.Crumb>
  </StickyBreadcrumbPath>
);

SearchMetadataBreadcrumb.propTypes = {
  search: PropTypes.string,
};

SearchMetadataBreadcrumb.defaultProps = {
  search: '',
};

export default SearchMetadataBreadcrumb;
