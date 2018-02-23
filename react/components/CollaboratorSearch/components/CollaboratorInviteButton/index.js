import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import inviteCollaboratorMutation from 'react/components/CollaboratorSearch/components/CollaboratorInviteButton/mutations/inviteCollaborator';

import SearchResult from 'react/components/CollaboratorSearch/components/SearchResult';

const Button = styled(SearchResult)`
  justify-content: center;
  padding: 1.75em 1em;
  cursor: pointer;
  font-weight: bold;
`;

class CollaboratorInviteButton extends Component {
  static propTypes = {
    mutate: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    channel_id: PropTypes.number.isRequired,
  }

  state = {
    mode: 'resting',
  }

  invite = () => {
    const {
      email, channel_id, mutate, onAdd,
    } = this.props;

    this.setState({ mode: 'inviting' });

    return mutate({
      variables: {
        email,
        channel_id,
      },
    })
      .then(onAdd)
      .catch(() => this.setState({ mode: 'error' }));
  }

  render() {
    const { mode } = this.state;
    const { email } = this.props;

    return (
      <Button onClick={this.invite} role="button">
        {{
          resting: `Invite ${email}`,
          inviting: 'Sending invite',
          error: 'Error',
        }[mode]}
      </Button>
    );
  }
}

export default graphql(inviteCollaboratorMutation)(CollaboratorInviteButton);
