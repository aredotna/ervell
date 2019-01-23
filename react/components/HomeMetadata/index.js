import React, { Component } from 'react';

import WithStaticRouter from 'react/hocs/WithStaticRouter';

import HeaderMetadataContainer from 'react/components/UI/HeaderMetadata/HeaderMetadataContainer';
import HomeBreadcrumb from 'react/components/HomeMetadata/components/HomeBreadcrumb';

class HomeMetadata extends Component {
  render() {
    return (
      <HeaderMetadataContainer
        breadcrumb={<HomeBreadcrumb />}
      />
    );
  }
}

export default WithStaticRouter(HomeMetadata);
