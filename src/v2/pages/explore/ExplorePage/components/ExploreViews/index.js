import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ExploreContents from 'v2/components/ExploreContents'

const All = ({ sort, fetchPolicy, timestamp }) => (
  <ExploreContents
    type="ALL"
    sort={sort}
    fetchPolicy={fetchPolicy}
    timestamp={timestamp}
  />
)

All.propTypes = {
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  timestamp: PropTypes.string,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
}

const Blocks = ({ sort, fetchPolicy, blockFilter, timestamp }) => (
  <ExploreContents
    type="CONNECTABLE"
    sort={sort}
    fetchPolicy={fetchPolicy}
    blockFilter={blockFilter}
    timestamp={timestamp}
  />
)

Blocks.propTypes = {
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  timestamp: PropTypes.string,
  blockFilter: PropTypes.oneOf([
    'IMAGE',
    'EMBED',
    'TEXT',
    'ATTACHMENT',
    'LINK',
  ]),
}

const Channels = ({ sort, fetchPolicy, timestamp }) => (
  <ExploreContents
    type="CHANNEL"
    sort={sort}
    fetchPolicy={fetchPolicy}
    timestamp={timestamp}
  />
)

Channels.propTypes = {
  sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
  timestamp: PropTypes.string,
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
}

class ExploreViews extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Once the view changes switch into "network-only" mode
    if (nextProps.view !== prevState.renderedView) {
      return { fetchPolicy: 'network-only' }
    }
    return null
  }

  static propTypes = {
    sort: PropTypes.oneOf(['UPDATED_AT', 'RANDOM']).isRequired,
    block_filter: PropTypes.oneOf([
      'IMAGE',
      'EMBED',
      'TEXT',
      'ATTACHMENT',
      'LINK',
    ]),
  }

  static defaultProps = {
    block_filter: null,
  }

  state = {
    fetchPolicy: 'cache-first',
    // eslint-disable-next-line
    renderedView: this.props.view,
  }

  render() {
    const { fetchPolicy } = this.state
    const { view, sort, block_filter, timestamp } = this.props

    switch (view) {
      case 'all':
        return <All sort={sort} fetchPolicy={fetchPolicy} />
      case 'channels':
        return <Channels sort={sort} fetchPolicy={fetchPolicy} />
      case 'blocks':
        return (
          <Blocks
            sort={sort}
            fetchPolicy={fetchPolicy}
            blockFilter={block_filter}
            timestamp={timestamp}
          />
        )
      default:
        return null
    }
  }
}

export default ExploreViews
