import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import { SORTS, MODES, SORTABLE_MODES } from 'react/components/Profile/config';

import profileMetadataFragment from 'react/components/ProfileMetadata/fragments/profileMetadata';

import Grid from 'react/components/UI/Grid';
import HeaderMetadataContainer from 'react/components/UI/HeaderMetadata/HeaderMetadataContainer';
import ProfileBreadcrumb from 'react/components/ProfileMetadata/components/ProfileBreadcrumb';
import ProfileMetadataActions from 'react/components/ProfileMetadata/components/ProfileMetadataActions';
import ProfileMetadataInfo from 'react/components/ProfileMetadata/components/ProfileMetadataInfo';
import ProfileMetadataView from 'react/components/ProfileMetadata/components/ProfileMetadataView';
import ProfileMetadataSort from 'react/components/ProfileMetadata/components/ProfileMetadataSort';

export default class ProfileMetadata extends Component {
  static propTypes = {
    user: propType(profileMetadataFragment).isRequired,
    mode: PropTypes.oneOf(MODES).isRequired,
    sort: PropTypes.oneOf(SORTS).isRequired,
  }

  render() {
    const { user, mode, sort } = this.props;

    return (
      <HeaderMetadataContainer
        breadcrumb={
          <ProfileBreadcrumb user={user} />
        }
        actions={
          <ProfileMetadataActions user={user} />
        }
      >
        <Grid>
          <ProfileMetadataInfo user={user} mode={mode} />

          <ProfileMetadataView user={user} mode={mode} sort={sort} />

          {SORTABLE_MODES.includes(mode) &&
            <ProfileMetadataSort user={user} sort={sort} />
          }
        </Grid>
      </HeaderMetadataContainer>
    );
  }
}
