import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GenericButton from 'react/components/UI/GenericButton';

const Button = styled(GenericButton).attrs({
  f: 1,
})`
  align-self: center;
`;

export default class CollaboratorAddButton extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    member_id: PropTypes.number.isRequired,
    member_type: PropTypes.string.isRequired,
  }

  state = {
    mode: 'resting',
  }

  addCollaborator = () => {
    const {
      member_id, member_type, onAdd,
    } = this.props;

    this.setState({ mode: 'adding' });

    return onAdd({ member_id, member_type })
      .catch(() => this.setState({ mode: 'error' }));
  }

  render() {
    const { mode } = this.state;

    return (
      <Button onClick={this.addCollaborator}>
        {{
          resting: 'Add',
          adding: 'Adding...',
          error: 'Error',
        }[mode]}
      </Button>
    );
  }
}
