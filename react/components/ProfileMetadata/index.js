import React, { Component } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import styles from 'react/styles';

import { SORTS, MODES, SORTABLE_MODES } from 'react/components/Profile/config';

import profileMetadataFragment from 'react/components/ProfileMetadata/fragments/profileMetadata';

import Grid from 'react/components/UI/Grid';
import ProfileBreadcrumb from 'react/components/ProfileMetadata/components/ProfileBreadcrumb';
import ProfileMetadataActions from 'react/components/ProfileMetadata/components/ProfileMetadataActions';
import ProfileMetadataInfo from 'react/components/ProfileMetadata/components/ProfileMetadataInfo';
import ProfileMetadataView from 'react/components/ProfileMetadata/components/ProfileMetadataView';
import ProfileMetadataSort from 'react/components/ProfileMetadata/components/ProfileMetadataSort';

const Container = styled.div`
  position: relative;
  margin: ${styles.Constants.containerOffset} auto 0 auto;
`;

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  ${styles.Constants.media.mobile`
    position: static;
    width: 100%;
    margin-bottom: 2em;
    margin-right: ${styles.Constants.blockGutter}; // TODO: Remove
    margin-left: ${styles.Constants.blockGutter}; // TODO: Remove
  `}
  }
`;

export default class ProfileMetadata extends Component {
  static propTypes = {
    user: propType(profileMetadataFragment).isRequired,
    mode: PropTypes.oneOf(MODES).isRequired,
    sort: PropTypes.oneOf(SORTS).isRequired,
  }

  render() {
    const { user, mode, sort } = this.props;

    return (
      <Container>
        <ProfileBreadcrumb user={user} />

        <Actions>
          <ProfileMetadataActions user={user} />
        </Actions>

        <Grid>
          <ProfileMetadataInfo user={user} mode={mode} />
          <ProfileMetadataView user={user} mode={mode} sort={sort} />
          {SORTABLE_MODES.includes(mode) &&
            <ProfileMetadataSort user={user} sort={sort} />
          }
        </Grid>
      </Container>
    );
  }
}
