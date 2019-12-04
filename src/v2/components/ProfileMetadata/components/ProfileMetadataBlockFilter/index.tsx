import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { stringify } from 'qs'

import Pocket from 'v2/components/UI/Pocket'
import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'

import { ProfileMetadataProps } from 'v2/components/ProfileMetadata'

class ProfileMetadataBlockFilter extends Component<
  ProfileMetadataProps & RouteComponentProps
> {
  isFilterActive = filter => () => this.props.type === filter

  render() {
    const {
      location: { pathname },
      sort,
    } = this.props

    return (
      <Pocket title="Type">
        <CookieLinkUnlessCurrent
          name="type"
          value="BLOCK"
          prefix="Profile"
          to={{
            pathname,
            search: stringify({ sort, type: 'BLOCK' }),
          }}
          isActive={this.isFilterActive('BLOCK')}
        >
          All
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="type"
          value="LINK"
          prefix="Search"
          to={{
            pathname,
            search: stringify({ sort, type: 'LINK' }),
          }}
          isActive={this.isFilterActive('LINK')}
        >
          Link
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="type"
          value="ATTACHMENT"
          prefix="Search"
          to={{
            pathname,
            search: stringify({ sort, type: 'ATTACHMENT' }),
          }}
          isActive={this.isFilterActive('ATTACHMENT')}
        >
          Attachment
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="type"
          value="IMAGE"
          prefix="Search"
          to={{
            pathname,
            search: stringify({ sort, type: 'IMAGE' }),
          }}
          isActive={this.isFilterActive('IMAGE')}
        >
          Image
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="type"
          value="TEXT"
          prefix="Search"
          to={{
            pathname,
            search: stringify({ sort, type: 'TEXT' }),
          }}
          isActive={this.isFilterActive('TEXT')}
        >
          Text
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="type"
          value="EMBED"
          prefix="Search"
          to={{
            pathname,
            search: stringify({ sort, type: 'EMBED' }),
          }}
          isActive={this.isFilterActive('EMBED')}
        >
          Embed
        </CookieLinkUnlessCurrent>
      </Pocket>
    )
  }
}

export default withRouter(ProfileMetadataBlockFilter)
