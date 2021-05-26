import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import Pocket from 'v2/components/UI/Pocket'
import LinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'

import { ProfileMetadataFollowingType_User } from '__generated__/ProfileMetadataFollowingType'

interface Props {
  identifiable: ProfileMetadataFollowingType_User
  location: {
    pathname: string
  }
  followType: 'ALL' | 'CHANNEL' | 'GROUP' | 'USER'
}

class ProfileMetadataFollowingType extends Component<
  Props & RouteComponentProps
> {
  isFilterActive = followType => () => this.props.followType === followType

  render() {
    const {
      location: { pathname },
      identifiable: { counts },
    } = this.props

    return (
      <Pocket title="Type">
        <LinkUnlessCurrent
          name="filter"
          value="ALL"
          prefix="Profile"
          to={{ pathname }}
          isActive={this.isFilterActive('ALL')}
        >
          All
        </LinkUnlessCurrent>

        {counts.following_channels > 0 && (
          <LinkUnlessCurrent
            name="filter"
            value="CHANNEL"
            prefix="Profile"
            to={{
              pathname,
              search: '?followType=CHANNEL',
            }}
            isActive={this.isFilterActive('CHANNEL')}
          >
            Channels
          </LinkUnlessCurrent>
        )}

        {counts.following_users > 0 && (
          <LinkUnlessCurrent
            name="filter"
            value="USER"
            prefix="Profile"
            to={{
              pathname,
              search: '?followType=USER',
            }}
            isActive={this.isFilterActive('USER')}
          >
            People
          </LinkUnlessCurrent>
        )}

        {counts.following_groups > 0 && (
          <LinkUnlessCurrent
            name="filter"
            value="GROUPS"
            prefix="Profile"
            to={{
              pathname,
              search: '?followType=GROUP',
            }}
            isActive={this.isFilterActive('GROUP')}
          >
            Groups
          </LinkUnlessCurrent>
        )}
      </Pocket>
    )
  }
}

export default withRouter(ProfileMetadataFollowingType)
