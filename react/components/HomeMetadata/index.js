import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import styles from 'react/styles';

import { MODES, SORTS } from 'react/components/Home/config';

import WithCurrentRoute from 'react/hocs/WithCurrentRoute';

import Grid from 'react/components/UI/Grid';
import HomeBreadcrumb from 'react/components/HomeMetadata/components/HomeBreadcrumb';
import HomeMetadataView from 'react/components/HomeMetadata/components/HomeMetadataView';
import HomeMetadataSort from 'react/components/HomeMetadata/components/HomeMetadataSort';

const Container = styled.div`
  position: relative;
  margin: ${styles.Constants.containerOffset} auto 0 auto;
`;

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
      <Container>
        <HomeBreadcrumb />

        {/^\/explore/.test(href) &&
          <Grid>
            <HomeMetadataView mode={mode} sort={sort} />
            <HomeMetadataSort mode={mode} sort={sort} />
          </Grid>
        }
      </Container>
    );
  }
}

export default WithCurrentRoute(HomeMetadata);
