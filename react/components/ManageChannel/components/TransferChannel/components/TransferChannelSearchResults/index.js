import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import SearchResult from 'react/components/UI/SearchResults/SearchResult';
import { Container as SearchResultContainer } from 'react/components/UI/SearchResults/UI';
import InitiateChannelTransferButton from 'react/components/ManageChannel/components/TransferChannel/components/TransferChannelSearchResults/components/InitiateChannelTransferButton';

import userSearchResultFragment from 'react/components/UI/SearchResults/User/fragments/userSearchResult';
import groupSearchResultFragment from 'react/components/UI/SearchResults/Group/fragments/groupSearchResult';
import transferChannelSearchResultsQuery from 'react/components/ManageChannel/components/TransferChannel/components/TransferChannelSearchResults/queries/transferChannelSearchResults';

const Container = styled(Box)`
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

class TransferChannelSearchResults extends PureComponent {
  static propTypes = {
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      results: PropTypes.shape({
        members: PropTypes.arrayOf(PropTypes.oneOfType([
          propType(userSearchResultFragment),
          propType(groupSearchResultFragment),
        ])).isRequired,
      }),
    }).isRequired,
  }

  render() {
    const { data: { loading }, channel_id } = this.props;

    if (loading) {
      return (
        <Container>
          <SearchResultContainer>
            <LoadingIndicator />
          </SearchResultContainer>
        </Container>
      );
    }

    const { data: { results: { members } } } = this.props;

    return (
      <Container>
        {members.map(member => (
          <SearchResult key={member.id} result={member}>
            <InitiateChannelTransferButton
              owner_id={member.id}
              owner_type={member.__typename}
              channel_id={channel_id}
            />
          </SearchResult>
        ))}
      </Container>
    );
  }
}

export default graphql(transferChannelSearchResultsQuery)(TransferChannelSearchResults);
