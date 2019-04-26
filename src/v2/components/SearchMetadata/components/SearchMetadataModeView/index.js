import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Pocket from 'v2/components/UI/Pocket'
import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'

export default class SearchMetadataView extends Component {
  static propTypes = {
    view: PropTypes.oneOf(['all', 'channels', 'blocks', 'users', 'groups'])
      .isRequired,
    search: PropTypes.string.isRequired,
  }

  isViewActive = view => () => this.props.view === view

  render() {
    const { search } = this.props

    return (
      <Pocket title="View">
        <CookieLinkUnlessCurrent
          to={`/search/${search}/all`}
          isActive={this.isViewActive('all')}
          prefix="Search"
          name="view"
          value="all"
        >
          All
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          to={`/search/${search}/channels`}
          isActive={this.isViewActive('channels')}
          prefix="Search"
          name="view"
          value="channels"
        >
          Channels
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          to={`/search/${search}/blocks`}
          isActive={this.isViewActive('blocks')}
          prefix="Search"
          name="view"
          value="blocks"
        >
          Blocks
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          to={`/search/${search}/users`}
          isActive={this.isViewActive('users')}
          prefix="Search"
          name="view"
          value="users"
        >
          Users
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          to={`/search/${search}/groups`}
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
