import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import { MODES } from 'react/components/Profile/config';

import profileMetadataFragment from 'react/components/ProfileMetadata/fragments/profileMetadata';

import Grid from 'react/components/UI/Grid';
import { ExpandableContext } from 'react/components/UI/ExpandableSet';
import HeaderMetadataContainer from 'react/components/UI/HeaderMetadata/HeaderMetadataContainer';
import ProfileBreadcrumb from 'react/components/ProfileMetadata/components/ProfileBreadcrumb';
import ProfileMetadataActions from 'react/components/ProfileMetadata/components/ProfileMetadataActions';
import ProfileMetadataInfo from 'react/components/ProfileMetadata/components/ProfileMetadataInfo';
import ProfileGroupUserList from 'react/components/ProfileMetadata/components/ProfileGroupUserList';
import ProfileMetadataView from 'react/components/ProfileMetadata/components/ProfileMetadataView';
import ProfileMetadataSort from 'react/components/ProfileMetadata/components/ProfileMetadataSort';
import ProfileMetadataFilter from 'react/components/ProfileMetadata/components/ProfileMetadataFilter';

export default class ProfileMetadata extends Component {
  static propTypes = {
    identifiable: propType(profileMetadataFragment).isRequired,
    // TODO: Rename to `view`
    mode: PropTypes.oneOf(MODES).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  }

  render() {
    const { identifiable, mode, sort } = this.props;

    return (
      <HeaderMetadataContainer
        breadcrumb={
          <ProfileBreadcrumb identifiable={identifiable} />
        }
        actions={
          <ProfileMetadataActions identifiable={identifiable} />
        }
      >
        <ExpandableContext>
          <Grid variableHeight>
            <ProfileMetadataInfo identifiable={identifiable} mode={mode} />

            {identifiable.__typename === 'Group' && identifiable.users.length > 0 &&
              <ProfileGroupUserList identifiable={identifiable} />
            }

            <ProfileMetadataView identifiable={identifiable} mode={mode} sort={sort} />

            {identifiable.__typename !== 'Group' && ['all', 'channels', 'blocks'].includes(mode) &&
              <ProfileMetadataSort sort={sort} />
            }

            {mode === 'index' &&
              <ProfileMetadataFilter identifiable={identifiable} />
            }
          </Grid>
        </ExpandableContext>
      </HeaderMetadataContainer>
    );
  }
}
