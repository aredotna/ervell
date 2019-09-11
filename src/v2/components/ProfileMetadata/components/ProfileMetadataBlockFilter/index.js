import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Pocket from 'v2/components/UI/Pocket'
import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'

class ProfileMetadataBlockFilter extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([
      'BLOCK',
      'IMAGE',
      'TEXT',
      'EMBED',
      'ATTACHMENT',
      'LINK',
    ]).isRequired,
  }

  isFilterActive = filter => () => this.props.type === filter

  render() {
    const {
      location: { pathname },
    } = this.props

    return (
      <Pocket title="Type">
        <CookieLinkUnlessCurrent
          name="type"
          value="BLOCK"
          prefix="Profile"
          to={{
            pathname,
            search: '?type=BLOCK',
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
            search: '?type=LINK',
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
            search: '?type=ATTACHMENT',
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
            search: '?type=IMAGE',
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
            search: '?type=TEXT',
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
            search: '?type=EMBED',
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
