import sharify from 'sharify';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Styles from 'react/styles';

import MemberAvatar from 'react/components/MemberAvatar';

import managedMemberFragment from 'react/components/ManagedMembers/components/ManagedMember/fragments/managedMember';

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

export default class ManagedMembers extends Component {
  static propTypes = {
    confirmationWarning: PropTypes.string,
    confirmationSelfWarning: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
    member: propType(managedMemberFragment).isRequired,
  }

  static defaultProps = {
    confirmationWarning: 'Are you sure?',
    confirmationSelfWarning: null,
  }

  state = {
    mode: 'resting',
  }

  remove = () => {
    const { mode } = this.state;
    const { onRemove, member } = this.props;

    if (mode === 'clicked') {
      this.setState({ mode: 'removing' });

      return onRemove({
        member_id: member.id,
        member_type: member.__typename.toUpperCase(),
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
    const { member, confirmationWarning, confirmationSelfWarning } = this.props;

    return (
      <Container>
        <Representation>
          <MemberAvatar member={member} />

          <Information>
            <Name href={member.href}>
              {member.name}
            </Name>

            {mode === 'clicked' &&
              <Warning>
                {CURRENT_USER.id === member.id &&
                  confirmationSelfWarning
                }

                {`${confirmationWarning} `}

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
