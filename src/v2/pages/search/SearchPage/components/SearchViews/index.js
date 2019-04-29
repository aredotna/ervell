import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SearchContents from 'v2/components/SearchContents'

const All = ({ fetchPolicy, term }) => (
  <SearchContents
    type={['USER', 'CHANNEL', 'BLOCK', 'GROUP', 'USER']}
    fetchPolicy={fetchPolicy}
    q={term}
  />
)

All.propTypes = {
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  term: PropTypes.string.isRequired,
}

const Blocks = ({ fetchPolicy, term, block_filter }) => (
  <SearchContents
    type="BLOCK"
    fetchPolicy={fetchPolicy}
    block_filter={block_filter}
    q={term}
  />
)

Blocks.propTypes = {
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  block_filter: PropTypes.oneOf([
    'IMAGE',
    'EMBED',
    'TEXT',
    'ATTACHMENT',
    'LINK',
  ]),
  term: PropTypes.string.isRequired,
}

Blocks.defaultProps = {
  block_filter: null,
}

const Channels = ({ fetchPolicy, term }) => (
  <SearchContents type="CHANNEL" fetchPolicy={fetchPolicy} q={term} />
)

Channels.propTypes = {
  fetchPolicy: PropTypes.oneOf(['cache-first', 'network-only']).isRequired,
  term: PropTypes.string.isRequired,
}

class SearchViews extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Once the view changes switch into "network-only" mode
    if (nextProps.view !== prevState.renderedView) {
      return { fetchPolicy: 'network-only' }
    }
    return null
  }

  static propTypes = {
    term: PropTypes.string.isRequired,
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
    const { view, term, block_filter } = this.props

    switch (view) {
      case 'all':
        return <All fetchPolicy={fetchPolicy} term={term} />
      case 'channels':
        return <Channels fetchPolicy={fetchPolicy} term={term} />
      case 'blocks':
        return (
          <Blocks
            fetchPolicy={fetchPolicy}
            term={term}
            block_filter={block_filter}
          />
        )
      case 'users':
        return <SearchContents type="USER" fetchPolicy={fetchPolicy} q={term} />
      case 'groups':
        return (
          <SearchContents type="GROUP" fetchPolicy={fetchPolicy} q={term} />
        )
      default:
        return null
    }
  }
}

export default SearchViews
