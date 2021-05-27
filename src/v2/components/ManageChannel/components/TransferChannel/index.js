import React, { PureComponent } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import { debounce } from 'underscore'

import transferChannelFragment from 'v2/components/ManageChannel/components/TransferChannel/fragments/transferChannelFragment'

import Status from 'v2/components/UI/Status'
import SearchInput from 'v2/components/UI/SearchInput'
import Overlay from 'v2/components/UI/Overlay'
import TransferChannelSearchResults from 'v2/components/ManageChannel/components/TransferChannel/components/TransferChannelSearchResults'
import CancelTransferButton from 'v2/components/ManageChannel/components/TransferChannel/components/CancelTransferButton'

export default class TransferChannel extends PureComponent {
  static propTypes = {
    channel: propType(transferChannelFragment).isRequired,
  }

  constructor(props) {
    super(props)

    this.searchInput = React.createRef()
  }

  state = {
    query: '',
    debouncedQuery: '',
    mode: 'resting',
  }

  updateQuery = query => {
    this.setState({ query, mode: 'active' })
    this.debouceQuery(query)
  }

  focus = e => {
    e.preventDefault()
    this.setState({ mode: 'active' })
  }

  blur = e => {
    e.preventDefault()
    this.setState({ mode: 'resting' })
  }

  debouceQuery = debounce(debouncedQuery => {
    this.setState({ debouncedQuery })
  }, 250)

  render() {
    const { channel } = this.props
    const { query, debouncedQuery, mode } = this.state

    if (channel.is_pending_transfer) {
      return (
        <div>
          {channel.visibility === 'private' &&
            !channel.transfer_request.is_recipient_member && (
              <Status>
                Note: {channel.transfer_request.recipient.name} does not have
                access to this channel. Consider temporarily adding them as a
                collaborator so they can view the channel before they accept the
                transfer
              </Status>
            )}

          <Status>
            {channel.transfer_request.recipient.name} needs to confirm the
            transfer. After they confirm you will no longer own this channel.
            <CancelTransferButton channel_id={channel.id} />
          </Status>
        </div>
      )
    }

    return (
      <div>
        <SearchInput
          query={query}
          onFocus={this.focus}
          onQueryChange={this.updateQuery}
          placeholder="search person to transfer channel to"
          ref={this.searchInput}
        />

        {query !== '' && mode === 'active' && (
          <Overlay
            targetEl={() => this.searchInput.current}
            fullWidth
            onClose={this.blur}
          >
            <TransferChannelSearchResults
              channel_id={channel.id}
              query={debouncedQuery}
            />
          </Overlay>
        )}
      </div>
    )
  }
}
