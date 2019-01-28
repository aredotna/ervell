import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'react/components/UI/Grid';
import HeaderMetadataContainer from 'react/components/UI/HeaderMetadata/HeaderMetadataContainer';
import SearchMetadataBreadcrumb from 'react/components/SearchMetadata/components/SearchMetadataBreadcrumb';
import SearchMetadataModeView from 'react/components/SearchMetadata/components/SearchMetadataModeView';

const SearchMetadata = ({ term, view }) => (
  <HeaderMetadataContainer
    breadcrumb={<SearchMetadataBreadcrumb term={term} />}
  >
    <Grid>
      <SearchMetadataModeView search={term} view={view} />
    </Grid>
  </HeaderMetadataContainer>
);

SearchMetadata.propTypes = {
  term: PropTypes.string,
  view: PropTypes.oneOf(['all', 'channels', 'blocks', 'users', 'groups']).isRequired,
};

SearchMetadata.defaultProps = {
  term: null,
};

export default SearchMetadata;
