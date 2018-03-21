import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';
import styled from 'styled-components';

import currentUserService from 'react/util/currentUserService';

import Styles from 'react/styles';

import Avatar from 'react/components/UI/Avatar';
import UserAvatar from 'react/components/UserAvatar';

import pendingGroupUserQuery from 'react/components/CreateGroup/components/PendingGroupUser/queries/pendingGroupUser';
import pendingGroupUserFragment from 'react/components/CreateGroup/components/PendingGroupUser/fragments/pendingGroupUser';

const Container = styled.div`
  display: flex;
  padding: 0.5em;
  border-top: 1px solid ${Styles.Colors.gray.light};
`;

const Representation = styled.div`
  display: flex;
  flex: 1;
`;

const Information = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 1em;
  font-size: ${Styles.Type.size.xs};
`;

const Name = styled.a`
  display: block;
  font-weight: bold;
`;

class PendingGroupUser extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      user: propType(pendingGroupUserFragment),
    }).isRequired,
    onRemove: PropTypes.func.isRequired,
  }

  remove = () => {
    const { data: { user: { id } }, onRemove } = this.props;
    return onRemove(id);
  }

  render() {
    const { data: { loading } } = this.props;

    if (loading) {
      return (
        <Container>
          <Representation>
            <Avatar />

            <Information>
              <Name>
                ...
              </Name>
            </Information>
          </Representation>
        </Container>
      );
    }

    const { data: { user } } = this.props;
    const isOwner = currentUserService().id === user.id;

    return (
      <Container>
        <Representation>
          <UserAvatar user={user} />

          <Information>
            <Name href={user.href}>
              {user.name}
            </Name>
          </Information>
        </Representation>

        <button
          className="Button Button--size-xs"
          onClick={this.remove}
          type="button"
          disabled={isOwner}
        >
          {isOwner ? 'Owner' : 'Remove'}
        </button>
      </Container>
    );
  }
}

export default graphql(pendingGroupUserQuery)(PendingGroupUser);
