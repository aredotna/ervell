import React, { Component } from 'react';

import WithStaticRouter from 'react/hocs/WithStaticRouter';

import HeaderMetadataContainer from 'react/components/UI/HeaderMetadata/HeaderMetadataContainer';
import FeedBreadcrumb from 'react/components/FeedMetadata/components/FeedBreadcrumb';

class FeedMetadata extends Component {
  render() {
    return (
      <HeaderMetadataContainer
        breadcrumb={<FeedBreadcrumb />}
      />
    );
  }
}

export default WithStaticRouter(FeedMetadata);
