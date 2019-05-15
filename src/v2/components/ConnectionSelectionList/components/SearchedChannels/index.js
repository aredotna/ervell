import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import mod from 'v2/util/mod'

import searchedChannelsQuery from 'v2/components/ConnectionSelectionList/components/SearchedChannels/queries/searchedChannels'

import Indicator from 'v2/components/ConnectionSelectionList/components/Indicator'
import ChannelsList from 'v2/components/ConnectionSelectionList/components/ChannelsList'
import CreatePrivateChannelButton from 'v2/components/ConnectionSelectionList/components/CreatePrivateChannelButton'

export default class SearchedChannels extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    onConnectionSelection: PropTypes.func.isRequired,
    cursor: PropTypes.number,
  }

  render() {
    const { query, onConnectionSelection, cursor } = this.props

    const highlighted = cursor && mod(cursor, 6)

    return (
      <div>
        <CreatePrivateChannelButton
          title={query}
          onConnectionCreation={onConnectionSelection}
          highlighted={highlighted === 0}
        />
        <Query query={searchedChannelsQuery} variables={{ query }}>
          {({ data, error, loading }) => {
            if (error) return <Indicator label="Error" />
            if (loading) return <Indicator label="Searching..." />

            const {
              me: { searched_channels },
            } = data

            return (
              <ChannelsList
                channels={searched_channels}
                cursor={cursor}
                cursorOffset={1}
                onConnectionSelection={onConnectionSelection}
              />
            )
          }}
        </Query>
      </div>
    )
  }
}
