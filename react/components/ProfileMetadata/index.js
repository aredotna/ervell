import React, { Component } from 'react';
import styled from 'styled-components';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import { SORTS, MODES, SORTABLE_MODES } from 'react/components/Profile/config';

import profileMetadataFragment from 'react/components/ProfileMetadata/fragments/profileMetadata';

import ProfileBreadcrumb from 'react/components/ProfileMetadata/components/ProfileBreadcrumb';
import ProfileMetadataActions from 'react/components/ProfileMetadata/components/ProfileMetadataActions';
import ProfileMetadataInfo from 'react/components/ProfileMetadata/components/ProfileMetadataInfo';
import ProfileMetadataView from 'react/components/ProfileMetadata/components/ProfileMetadataView';
import ProfileMetadataSort from 'react/components/ProfileMetadata/components/ProfileMetadataSort';

const Container = styled.div`
  position: relative;
  margin: 100px auto 0 auto;
`;

// TODO: Remove the negative margins once block grid is re-done.
const Pockets = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;
`;

const Actions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
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

        <Pockets>
          <ProfileMetadataInfo user={user} mode={mode} />
          <ProfileMetadataView user={user} mode={mode} sort={sort} />
          {SORTABLE_MODES.includes(mode) &&
            <ProfileMetadataSort user={user} sort={sort} />
          }
        </Pockets>
      </Container>
    );
  }
}
