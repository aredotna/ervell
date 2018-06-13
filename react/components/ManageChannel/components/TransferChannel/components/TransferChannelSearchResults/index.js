import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import SearchResult from 'react/components/UI/SearchResults/SearchResult';
import InitiateChannelTransferButton from 'react/components/ManageChannel/components/TransferChannel/components/TransferChannelSearchResults/components/InitiateChannelTransferButton';

import userSearchResultFragment from 'react/components/UI/SearchResults/User/fragments/userSearchResult';
import transferChannelSearchResultsQuery from 'react/components/ManageChannel/components/TransferChannel/components/TransferChannelSearchResults/queries/transferChannelSearchResults';

class TransferChannelSearchResults extends Component {
  static propTypes = {
    channel_id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      results: PropTypes.shape({
        users: PropTypes.arrayOf(propType(userSearchResultFragment)),
      }),
    }).isRequired,
  }

  render() {
    const { data: { loading }, channel_id } = this.props;

    if (loading) return <div />;

    const { data: { results: { users } } } = this.props;

    return users.map(user => (
      <SearchResult key={user.id} result={user}>
        <InitiateChannelTransferButton
          user_id={user.id}
          channel_id={channel_id}
        />
      </SearchResult>
    ));
  }
}

export default graphql(transferChannelSearchResultsQuery)(TransferChannelSearchResults);
