import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'

import ChannelContentsSet from 'v2/components/ChannelContents/components/ChannelContentsSet'
import ChannelContentsPageSkeleton from 'v2/components/ChannelContents/components/ChannelContentsPageSkeleton'

export default class ChannelContentsPage extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    skeleton: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
    context: PropTypes.arrayOf(
      PropTypes.shape({
        __typename: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })
    ),
  }

  static defaultProps = {
    context: [],
  }

  state = {
    mode: 'resting',
  }

  handleEnter = () => this.setState({ mode: 'active' })

  render() {
    const { mode } = this.state
    const { id, skeleton, context } = this.props

    return (
      <React.Fragment>
        {mode === 'resting' && (
          <Waypoint
            onEnter={this.handleEnter}
            fireOnRapidScroll={false}
            topOffset="-100%"
            bottomOffset="-100%"
          />
        )}

        {mode === 'active' ? (
          <ChannelContentsSet id={id} skeleton={skeleton} context={context} />
        ) : (
          <ChannelContentsPageSkeleton skeleton={skeleton} mode="pending" />
        )}

        {mode === 'resting' && (
          <Waypoint
            onEnter={this.handleEnter}
            fireOnRapidScroll={false}
            topOffset="-100%"
            bottomOffset="-100%"
          />
        )}
      </React.Fragment>
    )
  }
}
