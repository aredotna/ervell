import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import { debounce } from 'underscore';

import Status from 'react/components/UI/Status';
import SearchInput from 'react/components/UI/SearchInput';
import transferChannelFragment from 'react/components/ManageChannel/components/TransferChannel/fragments/transferChannelFragment';
import TransferChannelSearchResults from 'react/components/ManageChannel/components/TransferChannel/components/TransferChannelSearchResults';
import CancelTransferButton from 'react/components/ManageChannel/components/TransferChannel/components/CancelTransferButton';

export default class TransferChannel extends Component {
  static propTypes = {
    channel: propType(transferChannelFragment).isRequired,
  }

  state = {
    query: '',
    debouncedQuery: '',
  }

  updateQuery = (query) => {
    this.setState({ query });
    this.debouceQuery(query);
  }

  debouceQuery = debounce((debouncedQuery) => {
    this.setState({ debouncedQuery });
  }, 250)

  render() {
    const { channel } = this.props;
    const { query, debouncedQuery } = this.state;

    if (channel.is_pending_transfer) {
      return (
        <div>
          {!channel.transfer_request.is_user_to_member &&
            <Status>
              Note: {channel.transfer_request.user_to.name} does not have access to this channel.
              Consider temporarily adding them as a collaborator
              so they can view the channel before they accept the transfer
            </Status>
          }

          <Status>
            {channel.transfer_request.user_to.name} needs to confirm the transfer.
            After they confirm you will no longer own this channel.

            <CancelTransferButton channel_id={channel.id} />
          </Status>
        </div>
      );
    }

    return (
      <div>
        <SearchInput
          query={query}
          onQueryChange={this.updateQuery}
          placeholder="search user to transfer channel to"
        />

        {query !== '' &&
          <TransferChannelSearchResults
            channel_id={channel.id}
            query={debouncedQuery}
          />
        }
      </div>
    );
  }
}
