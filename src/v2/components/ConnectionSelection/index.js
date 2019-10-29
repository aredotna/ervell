import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import styled from 'styled-components'

import ConnectionSelectionList from 'v2/components/ConnectionSelectionList'
import { ConnectCTA } from './components/ConnectCTA'

import createConnectionMutation from 'v2/components/ConnectionSelection/mutations/createConnection'
import removeConnectionMutation from 'v2/components/ConnectionSelection/mutations/removeConnection'

import recentConnectionsQuery from 'v2/components/ConnectionSelectionList/components/RecentChannels/queries/recentChannels'

const Container = styled.div`
  position: relative;
`

class ConnectionSelection extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.oneOf(['BLOCK', 'CHANNEL']).isRequired,
    createConnection: PropTypes.func.isRequired,
    removeConnection: PropTypes.func.isRequired,
    isOutlined: PropTypes.bool,
    refetchQueries: PropTypes.arrayOf(
      PropTypes.shape({
        query: PropTypes.object.isRequired,
        variables: PropTypes.object,
      })
    ),
  }

  static defaultProps = {
    isOutlined: true,
    refetchQueries: [],
  }

  handleConnectionSelection = (isSelected, channelId) => {
    const {
      id,
      type,
      createConnection,
      removeConnection,
      refetchQueries,
    } = this.props

    const refetchRecentConnections = {
      query: recentConnectionsQuery,
    }

    const _refetchQueries = [...refetchQueries, refetchRecentConnections]

    if (isSelected) {
      return createConnection({
        refetchQueries: _refetchQueries,
        variables: {
          channel_ids: [channelId],
          connectable_id: id,
          connectable_type: type,
        },
      })
    }

    return removeConnection({
      refetchQueries,
      variables: {
        channel_id: channelId,
        connectable_id: id,
        connectable_type: type,
      },
    })
  }

  render() {
    const { id, type, ...rest } = this.props

    return (
      <Container>
        <ConnectCTA id={id} type={type} />

        <ConnectionSelectionList
          id={id}
          type={type}
          onConnectionSelection={this.handleConnectionSelection}
          {...rest}
        />
      </Container>
    )
  }
}

export default compose(
  graphql(createConnectionMutation, { name: 'createConnection' }),
  graphql(removeConnectionMutation, { name: 'removeConnection' })
)(ConnectionSelection)
