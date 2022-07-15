import React, { Component } from 'react'

import Grid from 'v2/components/UI/Grid'
import { ExpandableContext } from 'v2/components/UI/ExpandableSet'
import HeaderMetadataContainer from 'v2/components/UI/HeaderMetadata/HeaderMetadataContainer'
import ProfileAvatar from 'v2/components/ProfileMetadata/components/ProfileAvatar'
import ProfileBreadcrumb from 'v2/components/ProfileMetadata/components/ProfileBreadcrumb'
import ProfileMetadataActions from 'v2/components/ProfileMetadata/components/ProfileMetadataActions'
import ProfileMetadataInfo from 'v2/components/ProfileMetadata/components/ProfileMetadataInfo'
import ProfileGroupUserList from 'v2/components/ProfileMetadata/components/ProfileGroupUserList'
import ProfileMetadataView from 'v2/components/ProfileMetadata/components/ProfileMetadataView'
import ProfileMetadataSort from 'v2/components/ProfileMetadata/components/ProfileMetadataSort'
import ProfileMetadataFilter from 'v2/components/ProfileMetadata/components/ProfileMetadataFilter'
import ProfileMetadataFollowingType from 'v2/components/ProfileMetadata/components/ProfileMetadataFollowingType'
import ProfileMetadataBlockFilter from 'v2/components/ProfileMetadata/components/ProfileMetadataBlockFilter'
import { ProfileMetadata as ProfileMetadataType } from '__generated__/ProfileMetadata'
import {
  ChannelsSort,
  ConnectableTypeEnum,
  FollowingTypeEnum,
  IndexedChannelsTypes,
  SearchSorts,
} from '__generated__/globalTypes'
import { ProfileViewTypes } from 'v2/pages/profile/ProfilePage'

export interface ProfileMetadataProps {
  identifiable: ProfileMetadataType
  view: ProfileViewTypes
  sort: ChannelsSort | SearchSorts
  type?: ConnectableTypeEnum
  filter?: IndexedChannelsTypes
  followType?: FollowingTypeEnum
}

export default class ProfileMetadata extends Component<ProfileMetadataProps> {
  render() {
    const { identifiable, view, sort, filter, followType, type } = this.props

    return (
      <HeaderMetadataContainer
        pre={
          identifiable.__typename === 'Group' && (
            <ProfileAvatar identifiable={identifiable} />
          )
        }
        breadcrumb={<ProfileBreadcrumb identifiable={identifiable} />}
        actions={<ProfileMetadataActions identifiable={identifiable} />}
      >
        <ExpandableContext>
          <Grid gutterSpacing={2} variableHeight>
            <ProfileMetadataInfo identifiable={identifiable} view={view} />

            {identifiable.__typename === 'Group' &&
              identifiable.users.length > 0 && (
                <ProfileGroupUserList identifiable={identifiable} />
              )}

            {!['followers', 'following', 'groups'].includes(view) && (
              <ProfileMetadataView
                identifiable={identifiable}
                view={view}
                sort={sort}
              />
            )}

            {view === 'blocks' && (
              <ProfileMetadataBlockFilter
                type={type}
                identifiable={identifiable}
                view={view}
                sort={sort}
              />
            )}

            {identifiable.__typename !== 'Group' &&
              ['all', 'channels', 'blocks'].includes(view) && (
                <ProfileMetadataSort
                  type={type}
                  identifiable={identifiable}
                  view={view}
                  sort={sort}
                />
              )}

            {view === 'index' && (
              <ProfileMetadataFilter
                identifiable={identifiable}
                filter={filter}
              />
            )}

            {view === 'following' && identifiable.__typename === 'User' && (
              <ProfileMetadataFollowingType
                identifiable={identifiable}
                followType={followType}
              />
            )}
          </Grid>
        </ExpandableContext>
      </HeaderMetadataContainer>
    )
  }
}
