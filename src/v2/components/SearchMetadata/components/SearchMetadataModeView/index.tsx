import React, { Component } from 'react'

import Pocket from 'v2/components/UI/Pocket'
import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'

import { SearchMetadataProps } from 'v2/components/SearchMetadata'

export default class SearchMetadataView extends Component<SearchMetadataProps> {
  isViewActive = view => () => this.props.view === view

  render() {
    const { term } = this.props

    return (
      <Pocket title="View">
        <CookieLinkUnlessCurrent
          to={`/search/${term}/all`}
          isActive={this.isViewActive('all')}
          prefix="Search"
          name="view"
          value="all"
        >
          All
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          to={`/search/${term}/channels`}
          isActive={this.isViewActive('channels')}
          prefix="Search"
          name="view"
          value="channels"
        >
          Channels
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          to={`/search/${term}/blocks`}
          isActive={this.isViewActive('blocks')}
          prefix="Search"
          name="view"
          value="blocks"
        >
          Blocks
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          to={`/search/${term}/users`}
          isActive={this.isViewActive('users')}
          prefix="Search"
          name="view"
          value="users"
        >
          People
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          to={`/search/${term}/groups`}
          isActive={this.isViewActive('groups')}
          prefix="Search"
          name="view"
          value="groups"
        >
          Groups
        </CookieLinkUnlessCurrent>
      </Pocket>
    )
  }
}
