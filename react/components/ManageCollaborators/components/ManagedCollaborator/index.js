import sharify from 'sharify';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import Styles from 'react/styles';

import MemberAvatar from 'react/components/MemberAvatar';

import managedCollaboratorFragment from 'react/components/ManageCollaborators/components/ManagedCollaborator/fragments/managedCollaborator';
import removeChannelMemberMutation from 'react/components/ManageCollaborators/components/ManagedCollaborator/mutations/removeChannelMember';

const { data: { CURRENT_USER } } = sharify;

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

const Warning = styled.div`
  color: ${Styles.Colors.state.alert};
`;

class ManagedCollaboratorsList extends Component {
  static propTypes = {
    channel_id: PropTypes.number.isRequired,
    mutate: PropTypes.func.isRequired,
    collaborator: propType(managedCollaboratorFragment).isRequired,
  }

  state = {
    mode: 'resting',
  }

  remove = () => {
    const { mode } = this.state;
    const { mutate, collaborator, channel_id } = this.props;

    if (mode === 'clicked') {
      this.setState({ mode: 'removing' });

      return mutate({
        variables: {
          member_id: collaborator.id,
          member_type: collaborator.__typename.toUpperCase(),
          channel_id,
        },
      })
        .catch(() => this.setState({ mode: 'error' }));
    }

    return this.setState({ mode: 'clicked' });
  }

  cancel = () => {
    this.setState({ mode: 'resting' });
  }

  render() {
    const { mode } = this.state;
    const { collaborator } = this.props;

    return (
      <Container>
        <Representation>
          <MemberAvatar member={collaborator} />

          <Information>
            <Name href={collaborator.href}>
              {collaborator.name}
            </Name>

            {mode === 'clicked' &&
              <Warning>
                {CURRENT_USER.id === collaborator.id &&
                  'You will lose access to this channel.'
                }

                Are you sure?{' '}

                <a onClick={this.cancel} role="button" tabIndex={0}>
                  Cancel
                </a>
              </Warning>
            }
          </Information>
        </Representation>

        <button
          className={`Button Button--size-xs ${mode === 'clicked' && 'Color--state-alert'}`}
          onClick={this.remove}
          type="button"
        >
          {{
            resting: 'Remove',
            clicked: 'Confirm',
            removing: 'Removing...',
            error: 'Error',
          }[mode]}
        </button>
      </Container>
    );
  }
}

export default graphql(removeChannelMemberMutation)(ManagedCollaboratorsList);
