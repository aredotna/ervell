import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SearchResult from 'react/components/CollaboratorSearch/components/SearchResult';

const Button = styled(SearchResult)`
  justify-content: center;
  padding: 1.75em 1em;
  cursor: pointer;
  font-weight: bold;
`;

export default class CollaboratorInviteButton extends Component {
  static propTypes = {
    onInvite: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
  }

  state = {
    mode: 'resting',
  }

  invite = () => {
    const { email, onInvite } = this.props;

    this.setState({ mode: 'inviting' });

    return onInvite({ email })
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
