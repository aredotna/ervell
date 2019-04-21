import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';


import profileMetadataFragment from 'v2/components/ProfileMetadata/fragments/profileMetadata';

import Grid from 'v2/components/UI/Grid';
import { ExpandableContext } from 'v2/components/UI/ExpandableSet';
import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer';
import ProfileAvatar from 'v2/components/ProfileMetadata/components/ProfileAvatar';
import ProfileBreadcrumb from 'v2/components/ProfileMetadata/components/ProfileBreadcrumb';
import ProfileMetadataActions from 'v2/components/ProfileMetadata/components/ProfileMetadataActions';
import ProfileMetadataInfo from 'v2/components/ProfileMetadata/components/ProfileMetadataInfo';
import ProfileGroupUserList from 'v2/components/ProfileMetadata/components/ProfileGroupUserList';
import ProfileMetadataView from 'v2/components/ProfileMetadata/components/ProfileMetadataView';
import ProfileMetadataSort from 'v2/components/ProfileMetadata/components/ProfileMetadataSort';
import ProfileMetadataFilter from 'v2/components/ProfileMetadata/components/ProfileMetadataFilter';

export default class ProfileMetadata extends Component {
  static propTypes = {
    identifiable: propType(profileMetadataFragment).isRequired,
    view: PropTypes.oneOf(['all', 'channels', 'blocks', 'index', 'following', 'followers']).isRequired,
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
    filter: PropTypes.oneOf(['OWN', 'COLLABORATION']).isRequired,
  }

  render() {
    const {
      identifiable, view, sort, filter,
    } = this.props;

    return (
      <HeaderMetadataContainer
        pre={identifiable.__typename === 'Group' && <ProfileAvatar identifiable={identifiable} />}
        breadcrumb={<ProfileBreadcrumb identifiable={identifiable} />}
        actions={<ProfileMetadataActions identifiable={identifiable} />}
      >
        <ExpandableContext>
          <Grid gutterSpacing={2} variableHeight>
            <ProfileMetadataInfo identifiable={identifiable} view={view} />

            {identifiable.__typename === 'Group' && identifiable.users.length > 0 &&
              <ProfileGroupUserList identifiable={identifiable} />
            }

            {!['followers', 'following', 'groups'].includes(view) &&
              <ProfileMetadataView identifiable={identifiable} view={view} sort={sort} />
            }

            {identifiable.__typename !== 'Group' && ['all', 'channels', 'blocks'].includes(view) &&
              <ProfileMetadataSort sort={sort} />
            }

            {view === 'index' &&
              <ProfileMetadataFilter identifiable={identifiable} filter={filter} />
            }
          </Grid>
        </ExpandableContext>
      </HeaderMetadataContainer>
    );
  }
}
