import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import collaboratorSearchResultFragment from 'react/components/CollaboratorSearch/components/CollaboratorSearchResults/fragments/collaboratorSearchResult';

import Styles from 'react/styles';

import UserAvatar from 'react/components/UserAvatar';
import CollaboratorAddButton from 'react/components/CollaboratorSearch/components/CollaboratorAddButton';
import SearchResult from 'react/components/CollaboratorSearch/components/SearchResult';

const Information = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 1em;
`;

const Name = styled.a`
  display: block;
  font-weight: bold;
`;

const Email = styled.div`
  color: ${Styles.Colors.gray.medium};
`;

export default class CollaboratorSearchResult extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    channel_id: PropTypes.number.isRequired,
    result: propType(collaboratorSearchResultFragment).isRequired,
  }

  render() {
    const { channel_id, result, onAdd } = this.props;

    return (
      <SearchResult>
        <UserAvatar user={result} />

        <Information>
          <Name href={result.href}>{result.name}</Name>
          <Email>{result.hidden_email}</Email>
        </Information>

        <CollaboratorAddButton
          member_id={result.id}
          member_type="USER" // TODO
          channel_id={channel_id}
          onAdd={onAdd}
        />
      </SearchResult>
    );
  }
}
