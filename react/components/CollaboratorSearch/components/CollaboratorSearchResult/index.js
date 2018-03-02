import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import collaboratorSearchResultFragment from 'react/components/CollaboratorSearch/components/CollaboratorSearchResult/fragments/collaboratorSearchResult';

import Styles from 'react/styles';

import Count from 'react/components/UI/Count';
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

const Amount = styled.div`
  color: ${Styles.Colors.gray.medium};
`;

export default class CollaboratorSearchResult extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    result: propType(collaboratorSearchResultFragment).isRequired,
  }

  render() {
    const { result, onAdd } = this.props;

    return (
      <SearchResult>
        {result.__typename === 'User' &&
          <UserAvatar user={result} />
        }

        <Information>
          <Name href={result.href}>{result.name}</Name>

          {result.hidden_email &&
            <Email>{result.hidden_email}</Email>
          }

          {result.__typename === 'Group' &&
            <Amount>
              Group (<Count amount={result.counts.users} label="user" />)
            </Amount>
          }
        </Information>

        <CollaboratorAddButton
          member_id={result.id}
          member_type={result.__typename.toUpperCase()}
          onAdd={onAdd}
        />
      </SearchResult>
    );
  }
}
