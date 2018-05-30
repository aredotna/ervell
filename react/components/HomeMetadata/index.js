import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MODES, SORTS } from 'react/components/Home/config';

import WithCurrentRoute from 'react/hocs/WithCurrentRoute';

import Grid from 'react/components/UI/Grid';
import HeaderMetadataContainer from 'react/components/UI/HeaderMetadataContainer';
import HomeBreadcrumb from 'react/components/HomeMetadata/components/HomeBreadcrumb';
import HomeMetadataView from 'react/components/HomeMetadata/components/HomeMetadataView';
import HomeMetadataSort from 'react/components/HomeMetadata/components/HomeMetadataSort';


class HomeMetadata extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(MODES),
    sort: PropTypes.oneOf(SORTS),
    currentRoute: PropTypes.shape({
      href: PropTypes.string.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    mode: null,
    sort: null,
  }

  render() {
    const { mode, sort, currentRoute: { href } } = this.props;

    return (
      <HeaderMetadataContainer
        breadcrumb={<HomeBreadcrumb />}
      >
        {/^\/explore/.test(href) &&
          <Grid>
            <HomeMetadataView mode={mode} sort={sort} />
            <HomeMetadataSort mode={mode} sort={sort} />
          </Grid>
        }
      </HeaderMetadataContainer>
    );
  }
}

export default WithCurrentRoute(HomeMetadata);
