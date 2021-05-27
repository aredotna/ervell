import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import profileMetadataFilterFragment from 'v2/components/ProfileMetadata/components/ProfileMetadataFilter/fragments/profileMetadataFilter'

import Pocket from 'v2/components/UI/Pocket'
import CookieLinkUnlessCurrent from 'v2/components/UI/CookieLinkUnlessCurrent'

class ProfileMetadataFilter extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    identifiable: propType(profileMetadataFilterFragment).isRequired,
    filter: PropTypes.oneOf(['OWN', 'COLLABORATION']).isRequired,
  }

  isFilterActive = filter => () => this.props.filter === filter

  render() {
    const {
      identifiable,
      location: { pathname },
    } = this.props

    return (
      <Pocket title="Owned by">
        <CookieLinkUnlessCurrent
          name="filter"
          value="OWN"
          prefix="Profile"
          to={{
            pathname,
            search: '?filter=OWN',
          }}
          isActive={this.isFilterActive('OWN')}
        >
          {identifiable.name}
        </CookieLinkUnlessCurrent>

        <CookieLinkUnlessCurrent
          name="filter"
          value="COLLABORATION"
          prefix="Profile"
          to={{
            pathname,
            search: '?filter=COLLABORATION',
          }}
          isActive={this.isFilterActive('COLLABORATION')}
        >
          Other
        </CookieLinkUnlessCurrent>
      </Pocket>
    )
  }
}

export default withRouter(ProfileMetadataFilter)
