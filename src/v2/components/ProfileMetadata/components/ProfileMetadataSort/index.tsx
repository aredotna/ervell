import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { stringify } from 'qs'

import Pocket from 'v2/components/UI/Pocket'
import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'

import { ProfileMetadataProps } from 'v2/components/ProfileMetadata'

class ProfileMetadataSort extends Component<
  ProfileMetadataProps & RouteComponentProps
> {
  isSortActive = sort => () => this.props.sort === sort

  render() {
    const {
      location: { pathname },
      type,
    } = this.props

    return (
      <Pocket title="Sort">
        <CookieLinkUnlessCurrent
          name="sort"
          prefix="Profile"
          value="UPDATED_AT"
          to={{
            pathname,
            search: stringify({ type, sort: 'UPDATED_AT' }),
          }}
          isActive={this.isSortActive('UPDATED_AT')}
        >
          Recently updated
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="sort"
          prefix="Profile"
          value="CREATED_AT"
          to={{
            pathname,
            search: stringify({ type, sort: 'CREATED_AT' }),
          }}
          isActive={this.isSortActive('CREATED_AT')}
        >
          Recently created
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="sort"
          prefix="Profile"
          value="RANDOM"
          to={{
            pathname,
            search: stringify({ type, sort: 'RANDOM' }),
          }}
          isActive={this.isSortActive('RANDOM')}
          rel="nofollow"
        >
          Random
        </CookieLinkUnlessCurrent>
      </Pocket>
    )
  }
}

export default withRouter(ProfileMetadataSort)
