import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import searchedChannelsQuery from 'v2/components/ConnectionSelectionList/components/SearchedChannels/queries/searchedChannels'

import Indicator from 'v2/components/ConnectionSelectionList/components/Indicator'
import { ChannelsList } from 'v2/components/ConnectionSelectionList/components/ChannelsList'
import { CreatePrivateChannelButton } from 'v2/components/ConnectionSelectionList/components/CreatePrivateChannelButton'

export default class SearchedChannels extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    onConnectionSelection: PropTypes.func.isRequired,
  }

  render() {
    const { query, onConnectionSelection } = this.props

    return (
      <div>
        <CreatePrivateChannelButton
          title={query}
          onConnectionCreation={onConnectionSelection}
        />
        <Query query={searchedChannelsQuery} variables={{ query }}>
          {({ data, error, loading }) => {
            if (error) return <Indicator label="Error" />
            if (loading) return <Indicator label="Searching..." />
            if (!data) return null

            const {
              me: { searched_channels },
            } = data

            return (
              <ChannelsList
                channels={searched_channels}
                onConnectionSelection={onConnectionSelection}
              />
            )
          }}
        </Query>
      </div>
    )
  }
}
