import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import WithStaticRouter from 'react/hocs/WithStaticRouter';
import Grid from 'react/components/UI/Grid';
import HeaderMetadataContainer from 'react/components/UI/HeaderMetadata/HeaderMetadataContainer';

import SearchMetadataBreadcrumb from 'react/components/SearchMetadata/components/SearchMetadataBreadcrumb';
import SearchMetadataModeView from 'react/components/SearchMetadata/components/SearchMetadataModeView';

const SearchMetadata = props => {
  const { search } = props;

  return (
    <HeaderMetadataContainer breadcrumb={<SearchMetadataBreadcrumb search={search}/>}>
      <Route
        path="/search"
        render={() => (
          <Grid>
            <SearchMetadataModeView search={search}/>
          </Grid>
        )}
      />
    </HeaderMetadataContainer>
  );
};

SearchMetadata.propTypes = {
  search: PropTypes.string
};

SearchMetadata.defaultProps = {
  search: null
};

export default WithStaticRouter(SearchMetadata);
